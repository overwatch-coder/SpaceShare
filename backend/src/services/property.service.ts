import slugify from "slugify";
import { slugifyOptions } from "@/constants";
import { uploadMultipleImages, uploadSingleImage } from "@/lib/image-upload";
import { UploadedFile } from "express-fileupload";
import Property from "@/models/property.model";
import { createHttpError, HttpStatusCode } from "@/middleware/error.middleware";
import { SortOrder } from "mongoose";
import { CreatePropertyType, UpdatePropertyType } from "@/types";

// find all properties
export const findAllProperties = async (
  page: number,
  limit: number,
  search: string,
  sortKey: string,
  sortValue: SortOrder
) => {
  try {
    const properties = await Property.paginate(
      search
        ? {
            $or: [
              { name: new RegExp(search, "i") },
              { location: new RegExp(search, "i") },
              { description: new RegExp(search, "i") },
              { amenities: new RegExp(search, "i") },
            ],
          }
        : {},
      {
        page,
        limit,
        sort: { [sortKey]: sortValue },
        populate: [{ path: "owner", select: "name username _id email" }],
      }
    );

    return properties;
  } catch (error: any) {
    console.log("Error while finding properties: ", error.message);
    throw createHttpError(
      error.message || "Internal Server Error",
      error.statusCode || HttpStatusCode.InternalServerError
    );
  }
};

// find property by user id
export const findPropertiesByUserId = async (userId: string) => {
  try {
    const properties = await Property.find({ owner: userId }).lean().exec();

    if (!properties.length || properties.length === 0) {
      throw createHttpError("Property not found", HttpStatusCode.NotFound);
    }

    return properties;
  } catch (error: any) {
    console.log("Error while finding property: ", error.message);
    throw createHttpError(
      error.message || "Internal Server Error",
      error.statusCode || HttpStatusCode.InternalServerError
    );
  }
};

// find a single property by id or slug
export const findPropertyByIdOrSlug = async (
  id?: string,
  slug?: string,
  findBySlug: boolean = false
) => {
  try {
    if (findBySlug) {
      const property = await Property.findOne({ slug })
        .populate({
          path: "owner",
          select: "name username _id email",
        })
        .lean()
        .exec();

      return property;
    } else {
      const property = await Property.findById(id)
        .populate({
          path: "owner",
          select: "name username _id email",
        })
        .lean()
        .exec();
      return property;
    }
  } catch (error: any) {
    console.log("Error while finding property: ", error.message);
    throw createHttpError(
      error.message || "Internal Server Error",
      error.statusCode || HttpStatusCode.InternalServerError
    );
  }
};

// create a new property
export const addProperty = async (
  propertyData: CreatePropertyType,
  imagesFile: UploadedFile[],
  coverImageFile: UploadedFile,
  owner: string
) => {
  try {
    let images: string[] = [];
    let coverImage: string = "";
    let imagesFileArray: UploadedFile[] = imagesFile || [];
    let amenitiesArray: { name: string; slug: string }[] = [];

    // check images file exist and is an array
    if (imagesFileArray && !Array.isArray(imagesFileArray)) {
      imagesFileArray = [imagesFileArray];
    }

    if (imagesFile) {
      images = await uploadMultipleImages(imagesFileArray, "properties");
    }

    if (coverImageFile) {
      coverImage = await uploadSingleImage(coverImageFile, "properties");
    }

    // check if amenities is provided and format it
    if (propertyData.amenities) {
      propertyData.amenities.split(",").forEach((amenity) => {
        amenitiesArray.push({
          name: amenity,
          slug: slugify(amenity, slugifyOptions),
        });
      });
    }

    // create new property
    const createdProperty = await Property.create({
      ...propertyData,
      minAvailableDate: new Date(propertyData.minAvailableDate).toISOString(),
      maxAvailableDate: new Date(propertyData.maxAvailableDate).toISOString(),
      images,
      coverImage,
      slug: slugify(propertyData.name, slugifyOptions),
      amenities: amenitiesArray,
      owner,
    });

    // check if an error occurred
    if (!createdProperty) {
      throw createHttpError(
        "An error occurred while creating the property",
        HttpStatusCode.InternalServerError
      );
    }

    return createdProperty;
  } catch (error: any) {
    console.log("Error while creating property: ", error.message);
    throw createHttpError(
      error.message || "Internal Server Error",
      error.statusCode || HttpStatusCode.InternalServerError
    );
  }
};

// update a property
export const updateExistingProperty = async (
  id: string,
  propertyData: UpdatePropertyType,
  imagesFile: UploadedFile[],
  coverImageFile: UploadedFile,
  userId: string
) => {
  try {
    // check if property exists
    const existingProperty = await findPropertyByIdOrSlug(id);
    if (!existingProperty) {
      throw createHttpError("Property not found", HttpStatusCode.NotFound);
    }

    // check if currently logged in user is the owner of the property
    if (existingProperty.owner._id.toString() !== userId) {
      throw createHttpError("Unauthorized", HttpStatusCode.Unauthorized);
    }

    // get amenities from request body and format it
    let amenitiesArray: { name: string; slug: string }[] = [];

    // check if amenities is provided and format it
    if (propertyData.amenities) {
      amenitiesArray = existingProperty.amenities
        ? [...existingProperty.amenities]
        : [];

      propertyData.amenities.split(",").forEach((amenity) => {
        const slug = slugify(amenity, slugifyOptions);

        // Check if the amenity already exists in the array
        if (amenitiesArray.length === 0) {
          amenitiesArray.push({ name: amenity, slug });
        } else {
          const existingAmenity = amenitiesArray.find(
            (item) => item.slug === slug
          );

          if (!existingAmenity) {
            amenitiesArray.push({ name: amenity, slug });
          }
        }
      });
    }

    // get images from request files and upload them if they exist
    let images = existingProperty.images;
    let coverImage = existingProperty.coverImage;

    if (imagesFile) {
      images = await uploadMultipleImages(imagesFile, "properties");
    }

    if (coverImageFile) {
      coverImage = await uploadSingleImage(coverImageFile, "properties");
    }

    if (propertyData.name && propertyData.name !== existingProperty.name) {
      propertyData.slug = slugify(propertyData.name, slugifyOptions);
    }

    const updatedProperty = await Property.findOneAndUpdate(
      { _id: existingProperty._id },
      {
        ...propertyData,
        images,
        coverImage,
        amenities:
          amenitiesArray.length > 0
            ? amenitiesArray
            : existingProperty.amenities,
      },
      { new: true }
    )
      .populate({ path: "owner", select: "name username _id email" })
      .lean()
      .exec();

    // check if there are no properties
    if (!updatedProperty) {
      throw createHttpError(
        "An error occurred while updating the property",
        HttpStatusCode.InternalServerError
      );
    }

    return updatedProperty;
  } catch (error: any) {
    console.log("Error while updating property: ", error.message);
    throw createHttpError(
      error.message || "Internal Server Error",
      error.statusCode || HttpStatusCode.InternalServerError
    );
  }
};

// delete a property
export const removeProperty = async (id: string, userId: string) => {
  try {
    // check if property exists
    const existingProperty = await findPropertyByIdOrSlug(id);
    if (!existingProperty) {
      throw createHttpError("Property not found", HttpStatusCode.NotFound);
    }

    // check if currently logged in user is the owner of the property
    if (existingProperty.owner._id.toString() !== userId) {
      throw createHttpError("Unauthorized", HttpStatusCode.Unauthorized);
    }

    // delete property
    await Property.deleteOne({ _id: existingProperty._id });
  } catch (error: any) {
    console.log("Error while deleting property: ", error.message);
    throw createHttpError(
      error.message || "Internal Server Error",
      error.statusCode || HttpStatusCode.InternalServerError
    );
  }
};
