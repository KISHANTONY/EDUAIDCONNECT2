import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/Reqschema.js";
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
  const Reqs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    Reqs,
  });
});

export const Postreq = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
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

  let marklistUrl, marklistPublicId;
  if (req.files && req.files.marklist) {
    const { marklist } = req.files;
    const marklistUpload = await uploadToCloudinary(marklist);
    marklistUrl = marklistUpload.url;
    marklistPublicId = marklistUpload.public_id;
  }

  const job = await Job.create({
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
      url: marklistUrl || "", // Use an empty string if no marklist file is provided
      public_id: marklistPublicId || "", // Use an empty string if no marklist file is provided
    },
  });

  res.status(200).json({
    success: true,
    message: " Request Posted Successfully!",
    job,
  });
});

export const getMyReqs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("not allowed to access this resource.", 400)
    );
  }
  const myReqs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myReqs,
  });
});

export const updateJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! not found.", 404));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Updated!",
  });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS!not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: " Deleted!",
  });
});

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("not found.", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});
