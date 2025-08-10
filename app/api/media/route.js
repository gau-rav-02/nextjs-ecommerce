

import MediaModel from "@/models/Media.model";
import { catchError, response } from "@/lib/helperFunctions";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/databaseConnection";
import { isAuthenticated } from "@/lib/authentication";

export async function GET(request) {
  try {

    const auth = await isAuthenticated("admin");
    if (!auth?.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") , 10) || 0
    const limit = parseInt(searchParams.get("limit") , 10) || 10
    const deleteType = searchParams.get("deleteType"); // "sd" = softdelete | "pd" = permanent delete | srd = rerstore soft delete


    let filter = {};
    if (deleteType === 'SD') {
      filter = { deleted_at: null };
    } else if (deleteType === 'PD') {
      filter = { deleted_at: { $ne: null } };
    }


    const mediaData = await MediaModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit)
      .lean();

    const totalMedia = await MediaModel.countDocuments(filter);

    const hasMore = ((page + 1) * limit) < totalMedia;

    return NextResponse.json({
      success: true,
      mediaData,
      hasMore,
    });
  } catch (error) {
    return catchError(error)
  }
}
