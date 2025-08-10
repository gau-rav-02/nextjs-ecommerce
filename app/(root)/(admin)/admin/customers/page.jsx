'use client'

import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import DataTableWrapper from "@/components/Application/Admin/DataTableWrapper";
import DeleteAction from "@/components/Application/Admin/DeleteAction";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {  DT_CUSTOMERS_COLUMN} from "@/lib/column";
import { columnConfig } from "@/lib/helperFunctions";
import { ADMIN_CUSTOMERS_SHOW, ADMIN_DASHBOARD, ADMIN_TRASH } from "@/routes/AdminPanelRoute";
import { useCallback, useMemo } from "react";

const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: "Home" },
    { href: ADMIN_CUSTOMERS_SHOW, label: "Customers" },
  ];

  

const ShowCustomers = () => {

  const columns = useMemo(() => {
    return columnConfig(DT_CUSTOMERS_COLUMN);
  })
  
  const action = useCallback((row, deleteType, handleDelete) => {
    let actionMenu = [];
    actionMenu.push(<DeleteAction key="delete" handleDelete={handleDelete} row={row} deleteType={deleteType}/>);
    return actionMenu;
  },[])

  return (
    <div>
    
    <BreadCrumb data={breadcrumbData} />
      <Card className="rounded shadow-sm">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <div className="flex justify-between items-center">
            <h4 className="uppercase font-semibold text-xl">Customers</h4>
          </div>
        </CardHeader>

        <CardContent className="pb-5">
          <DataTableWrapper
            queryKey="customers-data"
            fetchUrl="/api/customers"
            initialPageSize={10}
            columnsConfig={columns}
            exportEndpoint="/api/customers/export"
            deleteEndpoint="/api/customers/delete"
            deleteType="SD"
            trashView={`${ADMIN_TRASH}?trashof=customers`}
            createAction={action}
          />
        </CardContent>
      </Card>
      
      </div>
  )
}

export default ShowCustomers