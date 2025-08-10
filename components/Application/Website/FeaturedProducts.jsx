"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"
import ProductBox from "./ProductBox"
import axios from "axios"

export default function FeaturedProducts() {
  const [productData, setProductData] = useState(null)

  
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-featured-product`)
        setProductData(response.data)
      } catch (error) {
        console.error("Error fetching featured products:", error)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (!productData) {
    return null
  }

  if (!productData.success) {
    return (
      <div className="text-center py-5">
        Data Not Found
      </div>
    )
  }

  return (
    <section className="lg:px-32 px-4 sm:py-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="sm:text-4xl text-2xl font-semibold">
          Featured Products
        </h2>
        <Link 
          href="#" 
          className="flex items-center gap-2 underline underline-offset-4 hover:text-primary"
        >
          View All
          <FaArrowRight />
        </Link>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-2 sm:gap-10 gap-2">
        {productData.success && productData.data.map((product) => (
          <ProductBox 
            key={product._id} 
            product={product} 
          />
        ))}
      </div>
    </section>
  )
}
