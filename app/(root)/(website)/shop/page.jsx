'use client'
import ButtonLoading from "@/components/Application/ButtonLoading"
import Filter from "@/components/Application/Website/Filter"
import ProductBox from "@/components/Application/Website/ProductBox"
import Sorting from "@/components/Application/Website/Sorting"
import WebsiteBreadcrumb from "@/components/Application/Website/WebsiteBreadcrumb"
import { WEBSITE_SHOP } from "@/routes/WebsiteRoute"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

const breadcrumb = {
    title: "Shop",
    links: [
      {
        label: "Shop",
        href: {WEBSITE_SHOP}
      }
    ]
  }

const Shop = () => {
    const searchParams = useSearchParams().toString()
    const [limit, setLimit] = useState(9)
    const [sorting, setSorting] = useState('default_sorting')

    const fetchProduct = async (pageParam) => {
        const {data: getProduct} = await axios.get(`/api/shop?page=${pageParam}&limit=${limit}&sort=${sorting}&${searchParams}`)
        
        if(!getProduct.success){
            return
        }

        return getProduct.data
    }

    const {error, data, isFetching, fetchNextPage, hasNextPage} = useInfiniteQuery({
        queryKey: ['products', limit, sorting, searchParams  ],
        queryFn: async ({ pageParam }) => await fetchProduct(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.nextPage
        }
  
    })


  return (
    <>
      <WebsiteBreadcrumb props={breadcrumb} />
      
      <section className="lg:flex lg:px-32 px-4 my-20">
        {/* Filter Section */}
        <div className="w-72 me-4">
          <div className="sticky top-0 bg-gray-50 p-4 rounded">
            <Filter />
          </div>
        </div>

        <div className="lg:w-[calc(100%-18rem)]">
            <Sorting limit={limit} setLimit={setLimit}
                sorting={sorting} setSorting={setSorting}
            />
            {isFetching && <div className="p-3 font-semibold text-center">Loading...</div>}
        {error && <div className="p-3 font-semibold text-center">{error.message}</div>}

        <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-10 gap-5">
            {data && data.pages.map((page) => (
                page.products.map((product) => (
                    <ProductBox key={product._id} product={product} />
                ))
            ))}
        </div>

        <div className="flex justify-center mt-10">
            {hasNextPage?
                <ButtonLoading type="button" loading={isFetching} text="Load More" onClick={fetchNextPage}/>
                :
                <>
                    {!isFetching && <span>No more data to load</span>}
                </>
            }
        </div>
        </div>

        
      </section>
    </>
  )
}

export default Shop;
