import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ProductModel from "@/models/Product.model";
import MediaModel from "@/models/Media.model";
import { isValidObjectId } from "mongoose";

export async function GET(request, { params }) {
    try {
        // Admin-only access
        const auth = await isAuthenticated("admin");
        if (!auth?.isAuth) {
            return response(false, 403, "Unauthorized");
        }

        await connectDB();

        const getParams = await params;
        const {id} = getParams;

        const filter = {
            deleted_at: null
        };

        if(!isValidObjectId(id)) {
            return response(false, 400, "Invalid Object ID");
        }

        filter._id = id;

        const getProduct = await ProductModel.findOne(filter).populate('media', '_id secure_url').lean();

        if (!getProduct) {
            return response(false, 404, "Product not found");
        }

        return response(true, 200, "Product found", getProduct);
    } catch (error) {
        return catchError(error);
    }
}