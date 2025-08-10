"use client";

import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";

import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useFetch from "@/hooks/useFetch";
import { showToast } from "@/lib/toast";
import { ADMIN_DASHBOARD, ADMIN_MEDIA_EDIT, ADMIN_MEDIA_SHOW } from "@/routes/AdminPanelRoute";
import { zSchema } from "@/lib/zodSchema";
import imgPlaceholder from '@/public/assets/images/img-placeholder.webp'
import ButtonLoading from "@/components/Application/ButtonLoading";



const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: "Home" },
    { href: ADMIN_MEDIA_SHOW, label: "Media" },
    { href: '', label: "Edit Media" },
  ];

const EditMedia = ({params}) => {

  const {id} = use(params);
  const { mediaData } = useFetch(`/api/media/get/${id}`);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = zSchema.pick({
    _id: true,
    alt: true,
    title: true
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: "",
      alt: "",
      title: "",
    },
  });

  

  // useEffect(() => {
  //   if (mediaDataResp?.success) {
  //     const d = mediaDataResp?.data;
  //     form.reset({
  //       _id: d?._id || "",
  //       alt: d?.alt || "",
  //       title: d?.title || "",
  //     });
  //   }
  // }, [mediaDataResp, form]);

  const onSubmit = async (values) => {
    // try {
    //   setIsSubmitting(true);
    //   const { data: response } = await axios({
    //     url: "/api/media/update",
    //     method: "PUT",
    //     data: values,
    //   });

    //   if (!response?.success) {
    //     throw new Error(response?.message || "Update failed");
    //   }

    //   showToast("success", response?.message || "Media updated successfully");
    //   refetch && refetch();
    // } catch (err) {
    //   showToast("error", err?.message || "Something went wrong");
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <>
      <BreadCrumb data={breadcrumbData} />
      <Card className="py-0 rounded shadow-sm">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <h4 className="uppercase font-semibold text-xl">Edit Media</h4>
        </CardHeader>

        <CardContent className="pb-5">
          {/* {loading ? (
            <div className="py-10 text-center">Loading...</div>
          ) : error ? (
            <div className="py-10 text-center text-red-500">
              {error?.message || "Failed to load"}
            </div>
          ) : (
            <> */}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                  <div className="mb-5">
                    <Image
                      src={
                        mediaData?.data?.secure_url ||
                        imgPlaceholder
                      }
                      alt={mediaData?.data?.alt || "image"}
                      width={150}
                      height={150}
                      className="rounded border"
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="_id"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Media ID</Label>
                        <FormControl>
                          <Input placeholder="Media ID" {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="alt"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Alt Text</Label>
                        <FormControl>
                          <Input type="text" placeholder="Enter Alt Text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Title</Label>
                        <FormControl>
                          <Input type="text" placeholder="Enter Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <ButtonLoading
                    type="submit"
                    loading={isSubmitting}
                    text="Update Media"
                  />
                </form>
              </Form>
            {/* </>
          )} */}
        </CardContent>
      </Card>
    </>
  );
};

export default EditMedia;
