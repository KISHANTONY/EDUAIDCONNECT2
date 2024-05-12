import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { request as Request } from "../models/Reqschema.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary";
import fs from "fs";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "marklists", // Specify the folder name in Cloudinary
      resource_type: "auto",
    });
    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary");
  } finally {
    // Remove the temporary file from the server
    fs.unlinkSync(file.tempFilePath);
  }
};
export const getAllReqs = catchAsyncErrors(async (req, res, next) => {
  const Reqs = await Request.find({ expired: false });
  res.status(200).json({
    success: true,
    Reqs,
  });
});


export const Postreq = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Sponsor") {
    return next(
      new ErrorHandler("not allowed to access this resource.", 400)
    );
  }

  const {
    title,
    description,
    Gender,
    UPI,
    city,
    location,
    fixedAmount,
    AmountFrom,
    AmountTo,
  } = req.body;

  if (!title || !description || !Gender || !UPI || !city || !location) {
    return next(new ErrorHandler("Please provide full details.", 400));
  }

  const postedBy = req.user._id;

  let marklistUrl, marklistPublicId, certificateUrl, certificatePublicId;
  if (req.files && req.files.marklist) {
    const { marklist } = req.files;
    const marklistUpload = await uploadToCloudinary(marklist);
    marklistUrl = marklistUpload.url;
    marklistPublicId = marklistUpload.public_id;
  }
  if (req.files && req.files.certificate) {
    const { certificate } = req.files;
    const certificateUpload = await uploadToCloudinary(certificate);
    certificateUrl = certificateUpload.url;
    certificatePublicId = certificateUpload.public_id;
  }
  const request = await Request.create({
    title,
    description,
    Gender,
    UPI,
    city,
    location,
    fixedAmount,
    AmountFrom,
    AmountTo,
    postedBy,
    marklist: {
      url: marklistUrl || "",
      public_id: marklistPublicId || "",
    },
    certificate: {
      url: certificateUrl || "",
      public_id: certificatePublicId || "",
    },
  });

  res.status(200).json({
    success: true,
    message: " Request Posted Successfully!",
    request,
  });
});

export const getMyReqs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Sponsor") {
    return next(
      new ErrorHandler("not allowed to access this resource.", 400)
    );
  }
  const myReqs = await Request.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myReqs,
  });
});

export const updaterequest = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Sponsor") {
    return next(
      new ErrorHandler("Sponsor not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let requestData = await Request.findById(id);
  if (!requestData) {
    return next(new ErrorHandler("OOPS! not found.", 404));
  }
  requestData = await Request.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Updated!",
  });
});

export const deleterequest = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Sponsor") {
    return next(
      new ErrorHandler("not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const request = await Request.findById(id);
  if (!request) {
    return next(new ErrorHandler("OOPS!not found.", 404));
  }
  await request.deleteOne();
  res.status(200).json({
    success: true,
    message: " Deleted!",
  });
});

export const getSinglerequest = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const request = await Request.findById(id);
    if (!request) {
      return next(new ErrorHandler("not found.", 404));
    }
    res.status(200).json({
      success: true,
      request,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});
