// app/api/media/delete/route.js
import cloudinary from "@/lib/cloudinary";
import { catchError, response } from "@/lib/helperFunctions";
import { connectDB } from "@/lib/databaseConnection";
import MediaModel from "@/models/Media.model";
import mongoose from "mongoose";
import { isAuthenticated } from "@/lib/authentication";

// PUT method for soft delete/restore
export async function PUT(request) {
  try {

    const auth = await isAuthenticated("admin");
    if (!auth?.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    const payload = await request.json();
    const ids = payload.ids || [];
    const deleteType = payload.deleteType

    if (!Array.isArray(ids) || ids.length === 0) {
      return response(false, 400, "Invalid or Empty Id List");
    }

    const media = await MediaModel.find(
      { _id: { $in: ids } },
    ).lean();

    if(!media.length){
        return response(false, 400, "Data not found");
    }

    // let updateData = {};
    // let message = "";

    if(!['SD', 'RSD'].includes(deleteType)){
        return response(false, 400, "Invalid delete operation. Delete type should be SD or RSD for this route");
    }



    if (deleteType === 'SD') {
        await MediaModel.updateMany(
        { _id: { $in: ids } },
        {$set: {deleted_at: new Date().toISOString()}}
        );
    
    } else{
        await MediaModel.updateMany(
        { _id: { $in: ids } },
        {$set: {deleted_at: null}}
        );
    }
    

    return response(true, 200, deleteType === 'SD'? 'Data moved into trash' : 'Data restored');
  } catch (error) {
    return catchError(error)
  }
}

// DELETE method for permanent deletion
export async function DELETE(request) {

    const session = await mongoose.startSession()
    session.startTransaction()
  try {
    // Admin-only access
    const auth = await isAuthenticated("admin");
    if (!auth?.isAuth) {
      return response(false, 403, "Unauthorized");
    }


    await connectDB();

    const payload = await request.json();
    const { ids, deleteType } = payload;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return response(false, 400, "Invalid or Empty Id List");
    }

    const media = await MediaModel.find(
      { _id: { $in: ids } },
    ).session(session).lean();

    if(!media.length){
        return response(false, 400, "Data not found");
    }

    if(!deleteType === 'PD'){
        return response(false, 400, "Invalid delete operation. Delete type should be PD for this route");
    }

    await MediaModel.deleteMany(
        { _id: { $in: ids } },
        ).session(session)

    // also delete all media from cloudinary 
    const publicIds = media.map(m => m.public_id);

    try {
        await cloudinary.api.delete_resources(publicIds);
      } catch (error) {
        await session.abortTransaction()
        session.endSession()
      }

    await session.commitTransaction()
    session.endSession()

    return response(true, 200, "Data deleted permanently");
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    return catchError(error)
  }
}
