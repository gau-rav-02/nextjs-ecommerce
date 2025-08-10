'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { IoMdClose, IoMdStarOutline } from 'react-icons/io';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { IoShirtOutline, IoChevronForward } from 'react-icons/io5';
import { RiCoupon2Line } from 'react-icons/ri';
import { LuUserRound } from "react-icons/lu";
import { MdOutlineShoppingBag, MdOutlinePermMedia } from 'react-icons/md';
import { useSidebar } from '@/components/ui/sidebar';
import logoBlack from '@/public/assets/images/logo-black.png';
import logoWhite from '@/public/assets/images/logo-black.png';
import { ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_SHOW, ADMIN_CUSTOMERS_SHOW, ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW, ADMIN_PRODUCT_ADD, ADMIN_PRODUCT_SHOW, ADMIN_REVIEW_SHOW } from '@/routes/AdminPanelRoute';

const adminAppSidebarMenu = [
    {
        title: 'Dashboard',
        url: ADMIN_DASHBOARD,
        icon: AiOutlineDashboard,
    },
    {
        title: 'Categories',
        URL: '#',
        icon: BiCategory,
        subMenu: [
            { title: 'Add Category', url: ADMIN_CATEGORY_ADD },
            { title: 'All Categories', url: ADMIN_CATEGORY_SHOW },
        ],
    },
    {
        title: 'Products',
        icon: IoShirtOutline,
        subMenu: [
            { title: 'Add Product', url: ADMIN_PRODUCT_ADD },
            // { title: 'Add Variant', url: '#' },
            { title: 'All Products', url: ADMIN_PRODUCT_SHOW },
            // { title: 'Product Variants', url: '#' },
        ],
    },
    // {
    //     title: 'Coupons',
    //     icon: RiCoupon2Line,
    //     subMenu: [
    //         { title: 'Add Coupon', url: '#' },
    //         { title: 'All Coupons', url: '#' },
    //     ],
    // },
    {
        title: 'Orders',
        url: '#',
        icon: MdOutlineShoppingBag,
    },
    {
        title: 'Customers',
        url: ADMIN_CUSTOMERS_SHOW,
        icon: LuUserRound,
    },
    // {
    //     title: 'Reviews',
    //     url: ADMIN_REVIEW_SHOW,
    //     icon: IoMdStarOutline,
    // },
    {
        title: 'Media',
        url: ADMIN_MEDIA_SHOW,
        icon: MdOutlinePermMedia,
    },
];

const AppSidebar = () => {
    const { toggleSidebar } = useSidebar();

    return (
        <Sidebar className="z-5">
            <SidebarHeader className="border-b h-14 p-0">
                <div className="flex items-center justify-between px-4 h-full">
                    <div className="flex items-center">
                        <Image src={logoBlack} alt="Logo Light" height={50} width={logoBlack.width} className="h-[50px] w-auto block dark:hidden" />
                        <Image src={logoWhite} alt="Logo Dark" height={50} width={logoWhite.width} className="h-[50px] w-auto hidden dark:block" />
                    </div>
                    <button type="button" onClick={toggleSidebar} className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-muted" >
                        <IoMdClose size={20} />
                    </button>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-3">
                <SidebarGroup>
                    <SidebarGroupLabel className="sr-only">Main</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {adminAppSidebarMenu.map((menu, idx) => {
                                const Icon = menu.icon;
                                const hasSub = Array.isArray(menu.subMenu) && menu.subMenu.length > 0;

                                if (!hasSub) {
                                    return (
                                        <SidebarMenuItem key={idx}>
                                            <SidebarMenuButton asChild className="py-5 font-semibold">
                                                <Link href={menu?.url || '#'}>
                                                    {Icon ? <Icon /> : null}
                                                    <span>{menu.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                }

                                return (
                                    <Collapsible key={idx} className="group/collapsible">
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton className="py-5">
                                                    {Icon ? <Icon /> : null}
                                                    <span className="font-semibold">{menu.title}</span>
                                                    <IoChevronForward
                                                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                                        size={16}
                                                    />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenu className="pl-2">
                                                    {menu.subMenu.map((sub, sidx) => (
                                                        <SidebarMenuItem key={sidx}>
                                                            <SidebarMenuButton asChild className="py-3">
                                                                <Link href={sub.url || '#'}>{sub.title}</Link>
                                                            </SidebarMenuButton>
                                                        </SidebarMenuItem>
                                                    ))}
                                                </SidebarMenu>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
