import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userIcon from "@/public/assets/images/user.png";
import { Chip } from "@mui/material";


export const DT_CATEGORY_COLUMN = [
  {
    accessorKey: "name",
    header: "Category Name",

  },
  {
    accessorKey: "slug",
    header: "Slug",

  },
];

export const DT_PRODUCT_COLUMN = [
  {
    accessorKey: "name",
    header: "Product Name",

  },
  {
    accessorKey: "slug",
    header: "Slug",

  },
  {
    accessorKey: "category",
    header: "Category",

  },
  {
    accessorKey: "mrp",
    header: "MRP",

  },
  {
    accessorKey: "sellingPrice",
    header: "Selling Price",

  },
  {
    accessorKey: "discountPercentage",
    header: "Discount Percentage",

  },
];


export const DT_CUSTOMERS_COLUMN = [
  {
    accessorKey: "avatar",
    header: "Avatar",
    Cell: ({renderedCellValue}) => (
      <Avatar>
        <AvatarImage src={renderedCellValue?.url || userIcon.src}/>
      </Avatar>
    )
  },
  {
    accessorKey: "name",
    header: "Name",

  },
  {
    accessorKey: "email",
    header: "Email",

  },
  {
    accessorKey: "phone",
    header: "Phone",

  },
  {
    accessorKey: "address",
    header: "Address",

  },
  {
    accessorKey: "isEmailVerified",
    header: "Is Email Verified",
    Cell: ({renderedCellValue}) => (
      renderedCellValue ? <Chip color="success" label="Verified"/> : <Chip color="error" label="Not Verified"/>
    )
  },
];

export const DT_REVIEW_COLUMN = [
  {
    accessorKey: "product",
    header: "Product",

  },
  {
    accessorKey: "user",
    header: "User",

  },
  {
    accessorKey: "title",
    header: "Title",

  },
  {
    accessorKey: "rating",
    header: "Rating",

  },
  {
    accessorKey: "review",
    header: "Review",

  },
];
