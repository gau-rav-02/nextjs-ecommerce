
import { v2 as cloudinary } from "cloudinary";
import { catchError, response } from "@/lib/helperFunctions";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export async function POST(request) {
  try {
    const payload = await request.json();
    // Example logged in the video:
    // console.log("signature payload", payload);s

    const {paramsToSign} = payload;

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_SECRET_KEY
    );

    return NextResponse.json({
      success: true,
      signature,
      // Optionally echo params if needed by widget
      // params_to_sign,
    });
  } catch (error) {
    return catchError(error)
  }
}
