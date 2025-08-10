
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import CategoryModel from "@/models/Category.model";
import ProductModel from "@/models/Product.model";



export async function GET(request) {
    try {

        await connectDB();

        const searchParams = request.nextUrl.searchParams;

        // get filters from params
        const minPrice = parseInt(searchParams.get('minPrice') ) || 0
        const maxPrice = parseInt(searchParams.get('maxPrice') ) || 0
        const categorySlug = searchParams.get('category')
        const search = searchParams.get('q')

        // pagination
        const limit = parseInt(searchParams.get('limit')) || 9
        const page = parseInt(searchParams.get('page')) || 0
        const skip = page * limit

        const sortOption = searchParams.get('sort') || 'default_sorting'
        let sortquery = {}
        if (sortOption === 'default_sorting') sortquery = {createdAt: -1}
        if (sortOption === 'asc') sortquery = {name: 1}
        if (sortOption === 'desc') sortquery = {name: -1}
        if (sortOption === 'price_low_high') sortquery = {sellingPrice: 1}
        if (sortOption === 'price_high_low') sortquery = {sellingPrice: -1}


        let categoryId = []
        if (categorySlug) {
            const slugs = categorySlug.split(',')
            const categoryData = await CategoryModel.find({ deleted_at: null, slug: {$in: slugs} }).select('_id').lean()
            categoryId = categoryData.map(c => c._id)
        }

        // match stage
        let matchStage = {}
        if (categoryId.length > 0) matchStage.category = {$in: categoryId}
        if(search){
            matchStage.name = { $regex: search, $options: 'i' }
        }
        if (minPrice > 0 || maxPrice > 0) {
            matchStage.sellingPrice = {}
            if (minPrice > 0) matchStage.sellingPrice.$gte = minPrice
            if (maxPrice > 0) matchStage.sellingPrice.$lte = maxPrice
        }

        // aggregation pipeline
        const products = await ProductModel.aggregate([
            { $match: matchStage },
            { $sort: sortquery },
            { $skip: skip },
            { $limit: limit + 1 },
            {
                $lookup: {
                    from: "medias",
                    localField: "media",
                    foreignField: "_id",
                    as: "media"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    slug: 1,
                    mrp: 1,
                    sellingPrice: 1,
                    discountPercentage: 1,
                    media: {
                        _id: 1,
                        secure_url: 1,
                        alt: 1
                    },
                }
            }
        ])

        // check if there are more products
        let nextPage = null
        if(products.length > limit){
            nextPage = page + 1
            products.pop()
        }

        return response(true, 200, "Product data found", {products, nextPage  });
    } catch (error) {
        return catchError(error);
    }
}
