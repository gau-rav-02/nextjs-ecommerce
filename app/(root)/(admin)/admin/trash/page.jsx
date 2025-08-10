'use client'

import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import DataTableWrapper from "@/components/Application/Admin/DataTableWrapper";
import DeleteAction from "@/components/Application/Admin/DeleteAction";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DT_CATEGORY_COLUMN, DT_CUSTOMERS_COLUMN, DT_PRODUCT_COLUMN, DT_REVIEW_COLUMN } from "@/lib/column";
import { columnConfig } from "@/lib/helperFunctions";
import {  ADMIN_DASHBOARD,  } from "@/routes/AdminPanelRoute";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: "Home" },
    { href: '', label: "Trash" },
  ];

  const TRASH_CONFIG = {
    category: {
      title: "Category Trash",
      columns: DT_CATEGORY_COLUMN,
      fetchUrl: '/api/category',
      exportUrl: '/api/category/export',
      deleteUrl: '/api/category/delete',
    },
    product: {
      title: "Product Trash",
      columns: DT_PRODUCT_COLUMN,
      fetchUrl: '/api/product',
      exportUrl: '/api/product/export',
      deleteUrl: '/api/product/delete',
    },
    customers: {
      title: "Customers Trash",
      columns: DT_CUSTOMERS_COLUMN,
      fetchUrl: '/api/customers',
      exportUrl: '/api/customers/export',
      deleteUrl: '/api/customers/delete',
    },
    review: {
      title: "Review Trash",
      columns: DT_REVIEW_COLUMN,
      fetchUrl: '/api/review',
      exportUrl: '/api/review/export',
      deleteUrl: '/api/review/delete',
    },

  }
  

const Trash = () => {

  const searchParams = useSearchParams();
  const trashOf = searchParams.get("trashof");
  const config = TRASH_CONFIG[trashOf];

  const columns = useMemo(() => {
    return columnConfig(config.columns, false, false, true);
  }, [])

  
  const action = useCallback((row, deleteType, handleDelete) => {
    return [<DeleteAction key="delete" handleDelete={handleDelete} row={row} deleteType={deleteType}/>]
  },[])

  return (
    <div>
    
    <BreadCrumb data={breadcrumbData} />
      <Card className="rounded shadow-sm">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <div className="flex justify-between items-center">
            <h4 className="uppercase font-semibold text-xl">{config.title}</h4>
          </div>
        </CardHeader>

        <CardContent className="pb-5">
          <DataTableWrapper
            queryKey={`${trashOf}-data-deleted`}
            fetchUrl={config.fetchUrl}
            initialPageSize={10}
            columnsConfig={columns}
            exportEndpoint={config.exportUrl}
            deleteEndpoint={config.deleteUrl}
            deleteType="PD"
            createAction={action}
          />
        </CardContent>
      </Card>
      
      </div>
  )
}

export default Trash