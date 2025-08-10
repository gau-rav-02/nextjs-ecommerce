
import { catchError, response } from "@/lib/helperFunctions";
import { connectDB } from "@/lib/databaseConnection";
import { isAuthenticated } from "@/lib/authentication";
import ProductModel from "@/models/Product.model";


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

    const data = await ProductModel.find(
      { _id: { $in: ids } },
    ).lean();

    if(!data.length){
        return response(false, 400, "Product not found");
    }

    // let updateData = {};
    // let message = "";

    if(!['SD', 'RSD'].includes(deleteType)){
        return response(false, 400, "Invalid delete operation. Delete type should be SD or RSD for this route");
    }



    if (deleteType === 'SD') {
        await ProductModel.updateMany(
        { _id: { $in: ids } },
        {$set: {deleted_at: new Date().toISOString()}}
        );
    
    } else{
        await ProductModel.updateMany(
        { _id: { $in: ids } },
        {$set: {deleted_at: null}}
        );
    }
    

    return response(true, 200, deleteType === 'SD'? 'Product moved into trash' : 'Product restored');
  } catch (error) {
    return catchError(error)
  }
}

// DELETE method for permanent deletion
export async function DELETE(request) {
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

    const data = await ProductModel.find(
      { _id: { $in: ids } },
    ).lean();

    if(!data.length){
        return response(false, 400, "Product not found");
    }

    if(!deleteType === 'PD'){
        return response(false, 400, "Invalid delete operation. Delete type should be PD for this route");
    }

    await ProductModel.deleteMany(
        { _id: { $in: ids } },
        )


    return response(true, 200, "Product deleted permanently");
  } catch (error) {
    return catchError(error)
  }
}
