'use client'

import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import DataTableWrapper from "@/components/Application/Admin/DataTableWrapper";
import DeleteAction from "@/components/Application/Admin/DeleteAction";
import EditAction from "@/components/Application/Admin/EditAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {  DT_PRODUCT_COLUMN } from "@/lib/column";
import { columnConfig } from "@/lib/helperFunctions";
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_ADD, ADMIN_PRODUCT_EDIT, ADMIN_PRODUCT_SHOW, ADMIN_TRASH } from "@/routes/AdminPanelRoute";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { FiPlus } from "react-icons/fi";

const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: "Home" },
    { href: ADMIN_PRODUCT_SHOW, label: "Product" },
  ];

  

const ShowProduct = () => {

  const columns = useMemo(() => {
    return columnConfig(DT_PRODUCT_COLUMN);
  })
  
  const action = useCallback((row, deleteType, handleDelete) => {
    let actionMenu = [];
    actionMenu.push(<EditAction key="edit" href={ADMIN_PRODUCT_EDIT(row.original._id)} />);
    actionMenu.push(<DeleteAction key="delete" handleDelete={handleDelete} row={row} deleteType={deleteType}/>);
    return actionMenu;
  },[])

  return (
    <div>
    
    <BreadCrumb data={breadcrumbData} />
      <Card className="rounded shadow-sm">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <div className="flex justify-between items-center">
            <h4 className="uppercase font-semibold text-xl">Show Product</h4>
            <Link href={ADMIN_PRODUCT_ADD}>
            <Button className="cursor-pointer">
              <FiPlus/> 
               New Product 
            </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="pb-5">
          <DataTableWrapper
            queryKey="product-data"
            fetchUrl="/api/product"
            initialPageSize={10}
            columnsConfig={columns}
            exportEndpoint="/api/product/export"
            deleteEndpoint="/api/product/delete"
            deleteType="SD"
            trashView={`${ADMIN_TRASH}?trashof=product`}
            createAction={action}
          />
        </CardContent>
      </Card>
      
      </div>
  )
}

export default ShowProduct