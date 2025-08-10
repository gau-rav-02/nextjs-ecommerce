
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ProductModel from "@/models/Product.model";
import MediaModel from "@/models/Media.model";

export async function GET() {
    try {
        
        await connectDB();

        const getProduct = await ProductModel.find({deleteType: null}).populate('media', '_id secure_url').limit(8).lean();

        if (!getProduct) {
            return response(false, 404, "Product not found");
        }

        return response(true, 200, "Product found", getProduct);
    } catch (error) {
        return catchError(error);
    }
}