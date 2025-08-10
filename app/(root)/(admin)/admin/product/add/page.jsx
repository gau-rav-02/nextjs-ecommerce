"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW } from "@/routes/AdminPanelRoute";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import { showToast } from "@/lib/toast";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { zSchema } from "@/lib/zodSchema";
import useFetch from "@/hooks/useFetch";
import { get } from "mongoose";
import { compareSync } from "bcryptjs";
import Select from "@/components/Application/Select";
import slugify from "slugify";
import MediaModal from "@/components/Application/Admin/MediaModal";
import Image from "next/image";

const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: "Home" },
    { href: ADMIN_PRODUCT_SHOW, label: "Products" },
    { href: "", label: "Add Product" },
  ];


const AddProduct = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categoryOption, setCategoryOption] = useState([]);
  
  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);


  const {data: getCategory } = useFetch("/api/category?deleteType=SD&&size=10000");

  useEffect(() => {
    if(getCategory && getCategory.success) {
        const data = getCategory.data
        const options = data.map((cat) => ({label: cat.name, value: cat._id  }));
        setCategoryOption(options)
    }
  }, [getCategory]);

  const schema = zSchema.pick({
    name: true,
    slug: true,
    category: true,
    mrp: true,
    description: true,
    sellingPrice: true,
    discountPercentage: true,
})

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      mrp: 0,
      sellingPrice: 0,
      category: "",
      discountPercentage: 0,
    },
  });
  

  useEffect(() => {
      const name = form.getValues('name')
      if(name){
          form.setValue('slug', slugify(name).toLowerCase())
      }
    }, [form.watch('name')])

    useEffect(() => {
        const mrp = form.getValues('mrp') || 0
        const sellingPrice = form.getValues('sellingPrice') || 0

        if(mrp > 0 && sellingPrice > 0){
            const discountPercentage = Math.round(((mrp - sellingPrice) / mrp) * 100)
            form.setValue('discountPercentage', discountPercentage)
        }
        
    }, [form.watch('mrp'), form.watch('sellingPrice')])

  
    const onSubmit = async (values) => {
      try {
        setLoading(true);
        if(selectedMedia.length <= 0){
            return showToast("error", "Please select media")
        }

        const mediaIds = selectedMedia.map((media) => media._id)
        values.media = mediaIds

        const { data: response } = await axios.post("/api/product/create", values);
  
        if (!response?.success) {
          throw new Error(response?.message);
        }
  
        form.reset()
        showToast("success", response?.message);
        router.push(ADMIN_PRODUCT_SHOW);
      } catch (err) {
        showToast("error", err?.message);
      } finally {
        setLoading(false);
      }
    };


  return (
    <>
      <BreadCrumb data={breadcrumbData} />
      
      <Card className="rounded shadow-sm">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <div className="flex justify-between items-center">
            <h4 className="uppercase font-semibold text-xl">Add New Product</h4>
            <Link href={ADMIN_PRODUCT_SHOW}>
              <Button variant="outline" size="sm">
                Back to Products
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="pb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Product Name <span className="text-red-500">*</span></Label>
                        <FormControl>
                          <Input 
                            placeholder="Enter product name" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Slug <span className="text-red-500">*</span></Label>
                        <FormControl>
                          <Input 
                            placeholder="product-slug" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Category <span className="text-red-500">*</span></Label>
                        <FormControl>
                          <Select
                            options={categoryOption}
                            selected={field.value}
                            setSelected={field.onChange}
                            isMulti={false}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="mrp"
                      render={({ field }) => (
                        <FormItem>
                          <Label>MRP <span className="text-red-500">*</span></Label>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1"
                              placeholder="Enter MRP"  
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sellingPrice"
                      render={({ field }) => (
                        <FormItem>
                          <Label>Selling Price <span className="text-red-500">*</span></Label>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1"
                              placeholder="Enter selling price"   
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Discount Percentage <span className="text-red-500">*</span></Label>
                        <FormControl>
                          <Input 
                            type="number" 
                            readOnly
                            placeholder="Enter discount percentage"   
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

        
                </div>
              </div>

              <div className="space-y-4">
            

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Description</Label>
                      <FormControl>
                        <Textarea 
                          placeholder="Detailed product description..." 
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-2 border border-dashed rounded p-5 text-center">
                <MediaModal
                    open={open}
                    setOpen={setOpen}
                    selectedMedia={selectedMedia}
                    setSelectedMedia={setSelectedMedia}
                    isMultiple={true}
                />

                {selectedMedia.length > 0 && 
                    <div className="flex justify-center items-center flex-wrap mb-3 gap-2">
                        {selectedMedia.map(media => (
                            <div key={media._id} className="h-24 w-24 border">
                                <Image
                                    src={media.url}
                                    height={100}
                                    width={100}
                                    alt=""
                                    className="size-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                }
                <div onClick={()=> setOpen(true) } className="bg-gray-50 dark:bg-card border w-[200px] mx-auto p-5 cursor-pointer">
                    <span>Select Media</span>
                </div>
              </div>

              

              {/* Submit Button */}
              <div className="flex justify-end">
                <ButtonLoading
                  type="submit"
                  loading={loading}
                  text="Create Product"
                  className="px-8 cursor-pointer"
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddProduct;
