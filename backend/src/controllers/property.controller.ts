import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Property from "@/models/property.model";
import { createHttpError, HttpStatusCode } from "@/middleware/error.middleware";
import { isValidObjectId, SortOrder } from "mongoose";
import { CreatePropertyType, UpdatePropertyType } from "@/types";
import { UploadedFile } from "express-fileupload";
import slugify from "slugify";
import { slugifyOptions } from "@/constants";
import {
  addProperty,
  findAllProperties,
  findPropertyByIdOrSlug,
  removeProperty,
  updateExistingProperty,
} from "@/services/property.service";

/**
  @desc    GET ALL PROPERTIES
  @route   /api/properties
  @method  GET
  @access  public
*/
export const getAllProperties = asyncHandler(
  async (
    req: Request<
      any,
      any,
      any,
      { page?: string; limit?: string; search?: string; sortBy: string }
    >,
    res: Response
  ) => {
    // url = /api/properties?sortBy=name:desc&search=kfc&limit=10&page=2
    const limit = parseInt(req.query.limit as string) || 20;
    const page = parseInt(req.query.page as string) || 1;
    const search = req.query.search as string;
    const sortBy = req.query.sortBy as string;

    // get sort key and value from sortBy
    let sortKey = "createdAt";
    let sortValue: SortOrder = "desc";
    if (sortBy) {
      sortKey = sortBy.split(":")[0];
      sortValue = sortBy.split(":")[1] as SortOrder;
    }

    // call find all properties service
    const properties = await findAllProperties(
      page,
      limit,
      search,
      sortKey,
      sortValue
    );

    // check if there are no properties
    if (properties.totalDocs === 0) {
      res.status(200).json({
        success: true,
        data: [],
        message: "No properties available",
      });
    }

    res.status(200).json({
      success: true,
      data: properties,
      message: "Properties retrieved successfully",
    });
  }
);

/**
  @desc    GET A SINGLE PROPERTY
  @route   /api/properties/:id
  @method  GET
  @access  public
*/
export const getSingleProperty = asyncHandler(
  async (req: Request, res: Response) => {
    // get id from url
    const id = req.params.id;

    // check if id is valid
    if (!id || !isValidObjectId(id)) {
      throw createHttpError("Invalid property id", HttpStatusCode.BadRequest);
    }

    // call find property by id or slug service
    const property = await findPropertyByIdOrSlug(id);

    // check if there are no properties
    if (!property) {
      throw createHttpError("Property not found", HttpStatusCode.NotFound);
    }

    res.status(200).json({
      success: true,
      data: property,
      message: "Property retrieved successfully",
    });
  }
);

/**
  @desc    CREATE A NEW PROPERTY
  @route   /api/properties
  @method  POST
  @access  private
*/
export const createProperty = asyncHandler(
  async (req: Request<any, any, CreatePropertyType>, res: Response) => {
    // get property data from request body
    const propertyData = req.body;

    // check if required fields are not empty
    if (
      !propertyData.name ||
      !propertyData.location ||
      !propertyData.ratePerNight ||
      !propertyData.minAvailableDate ||
      !propertyData.maxAvailableDate ||
      !propertyData.description
    ) {
      throw createHttpError(
        "Missing required fields (name, description, location, ratePerNight, minAvailableDate, maxAvailableDate)",
        HttpStatusCode.BadRequest
      );
    }

    // check if slug already exists
    const properyNameAndSlugExists = await findPropertyByIdOrSlug(
      "",
      slugify(propertyData.name, slugifyOptions),
      true
    );

    if (properyNameAndSlugExists) {
      throw createHttpError(
        "Property with this name already exists",
        HttpStatusCode.BadRequest
      );
    }

    // get images from request files and upload them if they exist
    const imagesFile = req.files?.images as UploadedFile[];
    const coverImageFile = req.files?.coverImage as UploadedFile;

    // check if cover image is provided
    if (!coverImageFile) {
      throw createHttpError(
        "Cover image is required",
        HttpStatusCode.BadRequest
      );
    }

    // call create property service
    const createdProperty = await addProperty(
      propertyData,
      imagesFile,
      coverImageFile,
      req.user._id
    );

    res.status(201).json({
      success: true,
      data: createdProperty,
      message: "Property created successfully",
    });
  }
);

/**
  @desc    UPDATE AN EXISTING PROPERTY
  @route   /api/properties/:id
  @method  PATCH
  @access  public
*/
export const updateProperty = asyncHandler(
  async (
    req: Request<{ id: string }, any, UpdatePropertyType>,
    res: Response
  ) => {
    // get id from url
    const id = req.params.id;

    // check if id is valid
    if (!id || !isValidObjectId(id)) {
      throw createHttpError("Invalid property id", HttpStatusCode.BadRequest);
    }

    // get property data from request body
    const propertyData = req.body;

    // get images from request files and upload them if they exist
    const imagesFile = req.files?.images as UploadedFile[];
    const coverImageFile = req.files?.coverImage as UploadedFile;

    // call update property service
    const updatedProperty = await updateExistingProperty(
      id,
      propertyData,
      imagesFile,
      coverImageFile,
      req.user._id
    );

    res.status(200).json({
      success: true,
      data: updatedProperty,
      message: "Property updated successfully",
    });
  }
);

/**
  @desc    DELETE A SINGLE PROPERTY
  @route   /api/properties/:id
  @method  DELETE
  @access  public
*/
export const deleteProperty = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    // get id from url
    const id = req.params.id;

    // check if id is valid
    if (!id || !isValidObjectId(id)) {
      throw createHttpError("Invalid property id", HttpStatusCode.BadRequest);
    }

    // call delete property service
    await removeProperty(id, req.user._id);

    res.status(200).json({
      success: true,
      data: null,
      message: "Property deleted successfully",
    });
  }
);
