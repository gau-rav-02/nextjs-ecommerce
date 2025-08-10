"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  ShoppingBag, 
  Package, 
  LayoutGrid
} from "lucide-react";
import useFetch from "@/hooks/useFetch";
// import { formatCurrency } from "@/lib/utils";

const CountOverview = () => {
  // Fetch dashboard statistics
  const { data: count } = useFetch("/api/dashboard/admin/count");
  

  const overviewCards = [
    {
      title: "Total Categories",
      value: count?.data?.category,
      icon: LayoutGrid,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Products",
      value: count?.data?.product,
      icon: ShoppingBag,
      color: "text-green-600", 
      bgColor: "bg-green-100",
    },
    {
      title: "Total Orders",
      value: count?.data?.order || 0,
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-100", 
    },
    {
      title: "Total Customers",
      value: count?.data?.customer,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100", 
    },
    
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {overviewCards.map((card, index) => {
    const IconComponent = card.icon;
    
    return (
      <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {card.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {card.value}
              </p>
            </div>
            <div className={`w-8 h-8 ${card.bgColor} rounded-lg flex items-center justify-center`}>
              <IconComponent className={`w-6 h-6 ${card.color}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  })}
</div>

  );
};

export default CountOverview;
