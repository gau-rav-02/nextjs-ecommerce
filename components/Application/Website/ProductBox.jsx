import Image from "next/image"
import Link from "next/link"
import ImgPlaceholder from "@/public/assets/images/img-placeholder.webp"

const ProductBox = ({ product }) =>{
  return (
    <Link href="#" className="block border rounded-lg hover:shadow-lg transition-all overflow-hidden">
      <Image
        src={product?.media?.[0]?.secure_url || ImgPlaceholder}
        width={400}
        height={400}
        alt={product?.media?.[0]?.alt || product?.name}
        title={product?.media?.[0]?.title || product?.name}
        className="w-full lg:h-[300px] md:h-[200px] h-[150px] object-fit object-top"
      />
      
      <div className="p-3 border-t">
        <h4 className="font-semibold mb-2">{product?.name}</h4>
        
        <p className="flex gap-2 text-sm">
          <span className="line-through text-gray-400">
            {product?.mrp?.toLocaleString('en-IN', {
              style: 'currency',
              currency: 'INR'
            })}
          </span>
          <span className="font-semibold">
            {product?.sellingPrice?.toLocaleString('en-IN', {
              style: 'currency', 
              currency: 'INR'
            })}
          </span>
        </p>
      </div>
    </Link>
  )
}

export default ProductBox