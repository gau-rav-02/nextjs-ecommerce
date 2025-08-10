import { connectDB } from "@/lib/databaseConnection"
import { catchError, response } from "@/lib/helperFunctions"
import CategoryModel from "@/models/Category.model"


export async function GET() {
  try {
    await connectDB()

    console.log("category")
    
    const getCategory = await CategoryModel.find({
      deleted_at: null
    }).lean()

    console.log("category" + getCategory)
    
    if (!getCategory ) {
      return response(false, 404, "Category not found"  )
    }
    
    return response(true, 200, "Category fetched successfully", getCategory)
    
  } catch (error) {
    return catchError(error)
  }
}
