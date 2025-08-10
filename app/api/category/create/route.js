import { NextResponse } from "next/server";
import { catchError, response } from "@/lib/helperFunctions";
import { connectDB } from "@/lib/databaseConnection";
import { zSchema } from "@/lib/zodSchema";
import CategoryModel from "@/models/Category.model";
import { isAuthenticated } from "@/lib/authentication";

// export async function GET(request) {
//   try {
//     const auth = await isAuthenticated("admin");
//     if (!auth?.isAuth) {
//       return response(false, 403, "Unauthorized");
//     }

//     await connectDB();

//     const searchParams = request.nextUrl.searchParams;
//     const page = parseInt(searchParams.get("page") || "0", 10);
//     const limit = parseInt(searchParams.get("limit") || "10", 10);
//     const deleteType = searchParams.get("deleteType"); // "SD" = soft delete | "PD" = permanent delete
//     const search = searchParams.get("search") || "";

//     let filter = {};
    
//     // Apply delete type filter
//     if (deleteType === "SD") {
//       filter = { deletedAt: null };
//     } else if (deleteType === "PD") {
//       filter = { deletedAt: { $ne: null } };
//     }

//     // Apply search filter if provided
//     if (search) {
//       filter.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { description: { $regex: search, $options: "i" } },
//         { slug: { $regex: search, $options: "i" } }
//       ];
//     }

//     const categoryData = await CategoryModel.find(filter)
//       .sort({ createdAt: -1 })
//       .skip(page * limit)
//       .limit(limit)
//       .lean();

//     const totalCategories = await CategoryModel.countDocuments(filter);
//     const hasMore = ((page + 1) * limit) < totalCategories;

//     return NextResponse.json({
//       success: true,
//       categoryData,
//       hasMore,
//       totalCategories,
//       currentPage: page,
//     });
//   } catch (error) {
//     return catchError(error);
//   }
// }

export async function POST(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth?.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    const payload = await request.json();

    const schema = zSchema.pick({
        name: true,
        slug: true
    })

    const validate = schema.safeParse(payload)

    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields", validate.error);
    }

    const {name,slug} = validate.data

    // Check if slug already exists
    const existingCategory = await CategoryModel.findOne({ 
      slug, 
      deletedAt: null 
    }).lean();

    if (existingCategory) {
      return response(false, 400, "Category with this slug already exists");
    }

    const newCategory = new CategoryModel({
      name,
      slug,
    });

    await newCategory.save();

    return response(true, 200, "Category created successfully");
  } catch (error) {
    return catchError(error);
  }
}
