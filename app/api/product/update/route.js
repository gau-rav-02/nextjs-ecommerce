import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import { zSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/Product.model";

export async function PUT(request) {
    try {
        const auth = await isAuthenticated("admin");
        if (!auth?.isAuth) {
            return response(false, 403, "Unauthorized");
        }

        await connectDB();
        const payload = await request.json();

        const schema = zSchema.pick({
            _id: true,
            name: true,
            slug: true,
            category: true,
            mrp: true,
            description: true,
            sellingPrice: true,
            discountPercentage: true,
            media: true,
        })

        const validate = schema.safeParse(payload)
        if (!validate.success) {
            return response(false, 400, "Invalid or missing fields", validate.error);
        }

        const validatedData = validate.data

        const getProduct = await ProductModel.findOne({deleted_at: null, _id: validatedData._id})

        if (!getProduct) {
            return response(false, 404, "Product not found");
        }

        getProduct.name = validatedData.name;
        getProduct.slug = validatedData.slug;
        getProduct.category = validatedData.category;
        getProduct.mrp = validatedData.mrp;
        getProduct.description = validatedData.description;
        getProduct.sellingPrice = validatedData.sellingPrice;
        getProduct.discountPercentage = validatedData.discountPercentage;
        getProduct.media = validatedData.media;

        await getProduct.save();

        return response(true, 200, "Product updated successfully", getProduct);
    } catch (error) {
        catchError(error)
    }
}