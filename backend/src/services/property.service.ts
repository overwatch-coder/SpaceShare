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

    // check if amenities is provided and is an array
    if (propertyData.amenities && !Array.isArray(propertyData.amenities)) {
      propertyData.amenities = [propertyData.amenities];
    }

    // create new property
    const createdProperty = await Property.create({
      ...propertyData,
      minAvailableDate: new Date(propertyData.minAvailableDate).toISOString(),
      maxAvailableDate: new Date(propertyData.maxAvailableDate).toISOString(),
      images,
      coverImage,
      slug: slugify(propertyData.name, slugifyOptions),
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
  coverImageFile: UploadedFile
) => {
  try {
    // check if property exists
    const existingProperty = await findPropertyByIdOrSlug(id);
    if (!existingProperty) {
      throw createHttpError("Property not found", HttpStatusCode.NotFound);
    }

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
      { _id: id },
      { ...propertyData, images, coverImage },
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
