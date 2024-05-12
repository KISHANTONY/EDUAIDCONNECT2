import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Payment } from "../models/paymentSchema.js";
import { request } from "../models/Reqschema.js";
import cloudinary from "cloudinary";

export const postPayment = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Student") {
    return next(
      new ErrorHandler("Not allowed to access this resource.", 400)
    );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("File Required!", 400));
  }

  const { proof } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(proof.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    proof.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload to Cloudinary", 500));
  }
  const { name, email, coverLetter, phone, address, requestId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Sponsor",
  };
  if (!requestId) {
    return next(new ErrorHandler("request not found!", 404));
  }
  const ReqDetails = await request.findById(requestId);
  if (!ReqDetails) {
    return next(new ErrorHandler("request not found!", 404));
  }

  const StudentID = {
    user: ReqDetails.postedBy,
    role: "Student",
  };
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantID ||
    !StudentID ||
    !proof
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }
  const payment = await Payment.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    StudentID,
    proof: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Submitted!",
    payment,
  });
});

export const StudentGetAllPayments = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Sponsor") {
      return next(
        new ErrorHandler("Sponsor not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const payments = await Payment.find({ "StudentID.user": _id });
    res.status(200).json({
      success: true,
      payments,
    });
  }
);

export const ReqseekerGetAllPayments = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Student") {
      return next(
        new ErrorHandler("Student not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const payments = await Payment.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      payments,
    });
  }
);

export const ReqseekerDeletePayment = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Student") {
      return next(
        new ErrorHandler("Student not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const payment = await Payment.findById(id);
    if (!payment) {
      return next(new ErrorHandler(" not found!", 404));
    }
    await payment.deleteOne();
    res.status(200).json({
      success: true,
      message: "Deleted!",
    });
  }
);
