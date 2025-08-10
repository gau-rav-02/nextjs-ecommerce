import { catchError, response } from "@/lib/helperFunctions";
import { isValidObjectId } from "mongoose";
import MediaModel from "@/models/Media.model";
import { connectDB } from "@/lib/databaseConnection";
import { isAuthenticated } from "@/lib/authentication";

export async function GET(request, { params }) {
  try {
    // Admin-only access
    const auth = await isAuthenticated("admin");
    if (!auth?.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    const getParams = await params
    const id = getParams.id;


    const filter = {
        deleted_at: null
    }

    if (!isValidObjectId(id)) {
      return response(false, 400, "Invalid object id");
    }

    filter._id = id

    const getMedia = await MediaModel.findOne(filter).lean();

    if (!getMedia) {
      return response(false, 404, "Media not found");
    }

    return response(true, 200, "Media fetched successfully", getMedia);
  } catch (error) {
    return catchError(error)
  }
}
