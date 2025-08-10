"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import useFetch from "@/hooks/useFetch"
import { WEBSITE_SHOP } from "@/routes/WebsiteRoute"

const Filter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // State for filter data
//   const [categoryData, setCategoryData] = useState(null)
  
  // State for selected filters
  const [selectedCategory, setSelectedCategory] = useState([])
  const [priceFilter, setPriceFilter] = useState({
    minPrice: 0,
    maxPrice: 5000
  })

    const { data: categoryData } = useFetch('/api/category/get-category')
  const urlSearchParams = new URLSearchParams(searchParams.toString())

  // Initialize filters from URL parameters
  useEffect(() => {
    
    searchParams.get('category') ? setSelectedCategory(searchParams.get('category').split(',')) : setSelectedCategory([])
    

    // Get price range from URL
    const minPriceParam = urlSearchParams.get('minPrice')
    const maxPriceParam = urlSearchParams.get('maxPrice')
    if (minPriceParam || maxPriceParam) {
      setPriceFilter({
        minPrice: minPriceParam ? parseInt(minPriceParam) : 0,
        maxPrice: maxPriceParam ? parseInt(maxPriceParam) : 3000
      })
    }
  }, [searchParams])

  // Category filter handler
  const handleCategoryFilter = (categorySlug) => {
    let newSelectedCategory = [...selectedCategory]
    
    if (newSelectedCategory.includes(categorySlug)) {
      newSelectedCategory = newSelectedCategory.filter(cat => cat !== categorySlug)
    } else {
      newSelectedCategory.push(categorySlug)
    }
    
    setSelectedCategory(newSelectedCategory)
    
    // Update URL
    
    if (newSelectedCategory.length > 0) {
      urlSearchParams.set('category', newSelectedCategory.join(','))
    } else {
      urlSearchParams.delete('category')
    }
    
    router.push(`${WEBSITE_SHOP}?${urlSearchParams}`)
  }


  // Price filter handler
  const handlePriceFilter = () => {

    urlSearchParams.set('minPrice', priceFilter.minPrice.toString())
    urlSearchParams.set('maxPrice', priceFilter.maxPrice.toString())
    
    router.push(`${WEBSITE_SHOP}?${urlSearchParams}`)
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory([])
    setPriceFilter({ minPrice: 0, maxPrice: 5000 })
    
    // refresh page
    router.push(`${WEBSITE_SHOP}`)

  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearAllFilters}
          className="text-xs"
        >
          Clear All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["category", "color", "size", "price"]}>
        {/* Category Filter */}
        <AccordionItem value="1">
          <AccordionTrigger className="text-sm font-medium">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <ul>
                    {categoryData?.success && categoryData?.data?.map((category) => (
                    <li key={category._id} className="mb-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                        // id={`category-${category.slug}`}
                        checked={selectedCategory.includes(category.slug)}
                        onCheckedChange={() => handleCategoryFilter(category.slug)}
                    />
                        <span>{category.name}</span>
                    </label>
                    </li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter */}
        <AccordionItem value="2">
          <AccordionTrigger className="text-sm font-medium">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="px-2">
                <Slider
                  defaultValue={[priceFilter.minPrice, priceFilter.maxPrice]}
                  max={5000}
                  step={50}
                  value={[priceFilter.minPrice, priceFilter.maxPrice]}
                  onValueChange={(value) => {
                    setPriceFilter({
                      minPrice: value[0],
                      maxPrice: value[1]
                    })
                  }}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>₹{priceFilter.minPrice}</span>
                <span>₹{priceFilter.maxPrice}</span>
              </div>
              <Button 
                onClick={handlePriceFilter}
                className="w-full"
                size="sm"
              >
                Apply Price Filter
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}



export default Filter