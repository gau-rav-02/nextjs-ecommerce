"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "@/lib/toast";
import { ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { zSchema } from "@/lib/zodSchema";
import slugify from "slugify";



const AddCategory = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: "Home" },
    { href: ADMIN_CATEGORY_SHOW, label: "Category" },
    { href: "", label: "Add Category" },
  ];

  const schema = zSchema.pick({
    name: true,
    slug: true
})

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  useEffect(() => {
    const name = form.getValues('name')
    if(name){
        form.setValue('slug', slugify(name).toLowerCase())
    }
  }, [form.watch('name')])

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const { data: response } = await axios.post("/api/category/create", values);

      if (!response?.success) {
        throw new Error(response?.message);
      }

      form.reset()
      showToast("success", response?.message);
      router.push(ADMIN_CATEGORY_SHOW);
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <BreadCrumb data={breadcrumbData} />
      <Card className="rounded shadow-sm">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <h4 className="uppercase font-semibold text-xl">Add New Category</h4>
        </CardHeader>

        <CardContent className="pb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label>Category Name</Label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter category name"
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
                    <Label>Slug</Label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="category-slug"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label>Description (Optional)</Label>
                    <FormControl>
                      <Textarea
                        placeholder="Enter category description"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <Label>Status</Label>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <ButtonLoading
                type="submit"
                loading={isSubmitting}
                text="Create Category"
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddCategory;
