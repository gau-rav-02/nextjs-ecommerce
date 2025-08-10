"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  ShoppingBag, 
  Package, 
  DollarSign,
  TrendingUp,
  Eye,
  Activity,
  AlertCircle
} from "lucide-react";

import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";
import CountOverview from "./CountOverview";
import { useRouter } from "next/navigation";
// import RecentOrders from "@/components/application/admin/dashboard/RecentOrders";
// import TopProducts from "@/components/application/admin/dashboard/TopProducts";
// import SalesChart from "@/components/application/admin/dashboard/SalesChart";

const AdminDashboard = () => {
  const breadcrumbData = [
    { href:   ADMIN_DASHBOARD, label: "Dashboard" },
  ];

  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <BreadCrumb data={breadcrumbData} />

      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening on store.</p>
        </div>
        {/* <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Activity className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
          <Button size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div> */}
      </div>

      <CountOverview />

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </CardHeader>
        <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-auto py-4 flex-col space-y-2 cursor-pointer"
            onClick={() => router.push("/admin/product")}
          >
            <Package className="w-6 h-6" />
            <span className="text-sm">Add Product</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 flex-col space-y-2 cursor-pointer"
            onClick={() => router.push("/admin/customers")}
          >
            <Users className="w-6 h-6" />
            <span className="text-sm">Manage Users</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 flex-col space-y-2 cursor-pointer"
            onClick={() => router.push("#")}
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="text-sm">View Orders</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 flex-col space-y-2 cursor-pointer"
            onClick={() => router.push("/admin/media")}
          >
            <Eye className="w-6 h-6" />
            <span className="text-sm">Media Library</span>
          </Button>
        </div>
      </CardContent>
      </Card>

      
      

      
    </div>
  );
};

export default AdminDashboard;
