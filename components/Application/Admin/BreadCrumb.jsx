"use client";

import React from "react";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadCrumb = ({ data = [] }) => {
    return (
        <Breadcrumb className="mb-5">
            <BreadcrumbList>
                {Array.isArray(data) &&
                    data.length > 0 &&
                    data.map((item, index) => {
                        const isLast = index === data.length - 1;
                        if (!isLast) {
                            return (
                                <div key={index} className="flex items-center">
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={item?.href || "#"}>
                                            {item?.label}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="ms-1 mt-1"/>
                                </div>
                            );
                        }

                        return (
                            <div key={index} className="flex items-center">
                                <BreadcrumbItem>
                                    <BreadcrumbLink className="font-semibold" href={item?.href || "#"}>
                                        {item?.label}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </div>
                        );
                    })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadCrumb;