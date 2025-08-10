"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import UploadMedia from "@/components/application/admin/UploadMedia";
import Media from "@/components/application/admin/Media";
import { useSearchParams } from "next/navigation";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import { ADMIN_MEDIA_SHOW } from "@/routes/AdminPanelRoute";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useDeleteMutation from "@/hooks/useDeleteMutation";
import { showToast } from "@/lib/toast";
import ButtonLoading from "@/components/Application/ButtonLoading";

const MediaPage = () => {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [deleteType, setDeleteType] = useState('SD'); // sd | rsd | pd
  const searchParams = useSearchParams();
  const queryClient = useQueryClient()

  const breadcrumbData = [
    { href: "/admin/dashboard", label: "Home" },
    { href: "/admin/media", label: "Media" },
  ];

  useEffect(() => {
    if (!searchParams) return;
    const trashOf = searchParams.get("trashof");
    setSelectedMedia([]);
    setSelectAll(false);
    if (trashOf) {
      setDeleteType('PD');
    } else {
      setDeleteType('SD');
    }
    
  }, [searchParams]);

  const fetchMedia = async (page, deleteType) => {
    const {data: response} = await axios.get(`/api/media?page=${page}&&limit=10&&deleteType=${deleteType}`);
    return response
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ["media-data", deleteType],
    queryFn: async ({ pageParam }) => await fetchMedia(pageParam, deleteType),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return lastPage.hasMore? nextPage : undefined;
    },
    // keepPreviousData: true,
  });

  // Select-all toggle
  useEffect(() => {
    if (selectAll) {
      const ids =
        data?.pages?.flatMap((p) => p?.mediaData)?.map((m) => m?._id);
      setSelectedMedia(ids);
    } else {
      setSelectedMedia([]);
    }
  }, [selectAll, data]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  // Delete/Restore mutation
  const deleteMutation = useDeleteMutation("media-data", "/api/media/delete");

  const handleDelete = (ids, deleteType) => {
    let c = true;
    if (deleteType === 'PD') {
      c = confirm("Are you sure you want to delete the data permanently?");
    } 

    if(c){
      deleteMutation.mutate({ids, deleteType})
    }  

    setSelectAll(false);
    setSelectedMedia([]);
  }
    

  return (
    <>
      <BreadCrumb data={breadcrumbData} />
      <Card className="rounded shadow-sm py-0">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <div className="flex items-center justify-between">
            <h4 className="uppercase font-semibold text-xl">
              {deleteType === 'PD' ? "Media Trash" : "Media"}
            </h4>
            <div className="flex items-center gap-5">
              {deleteType === 'SD' ? <>
                <Link href={`${ADMIN_MEDIA_SHOW}?trashof=media`}>
                  <Button variant="destructive" type="button" className="cursor-pointer">Trash</Button>
                </Link>
              </> : <>
                <Link href={`${ADMIN_MEDIA_SHOW}`}>
                  <Button className="cursor-pointer">Back to Media</Button>
                </Link>
              </>
              }
              {deleteType === 'SD' && <UploadMedia isMultiple={true} queryClient={queryClient} />}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-5">
          {selectedMedia.length > 0 && (
            <div className="mb-2 py-2 px-3 bg-violet-200 rounded flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                  className="border-primary cursor-pointer"
                />
                <span>Select all</span>
              </Label>
              <div className="flex gap-2">
                {deleteType === 'SD' ? (
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(selectedMedia, deleteType)}
                    className="cursor-pointer"
                  >
                    Move into Trash
                  </Button>
                ) : (
                  <>
                    <Button
                      className="bg-green-500 hover:bg-green-600 cursor-pointer"
                      onClick={() => handleDelete(selectedMedia, 'RSD')}
                    >
                      Restore
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(selectedMedia, deleteType)}
                      className="cursor-pointer"
                    >
                      Delete Permanently
                    </Button>
                  </>
                )}
              </div>
            </div>
          )} 

          {status === "pending" ? 
            <div className="w-full h-full flex items-center justify-center">
              Loading...
            </div>
           : status === "error" ? 
              <div className="w-full h-full flex items-center justify-center text-red-500">
                {error.message}
              </div>
            : 
              <>

                {data?.pages?.flatMap((p) => p?.mediaData)?.map((m) => m?._id).length === 0 && <div>Data not found</div>}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-5">
                  {data.pages.map((page, pIdx) => (
                    <React.Fragment key={pIdx}>
                      {page?.mediaData?.map((media) => (
                        <Media
                          key={media?._id}
                          media={media}
                          deleteType={deleteType}
                          selectedMedia={selectedMedia}
                          setSelectedMedia={setSelectedMedia}
                          handleDelete={(ids, dType) =>
                            handleDelete(ids, dType)
                          }
                        />
                        
                      ))}
                    </React.Fragment>
                  ))}
                </div>

              </>     

          }

          {hasNextPage && (
            <div className="flex justify-center">
              <ButtonLoading
                type="button"
                onClick={() => fetchNextPage()}
                loading={isFetching}
                className="cursor-pointer"
                text="Load More"
              />

            </div>
          )} 
        </CardContent>
      </Card>
    </>
  );
}

export default MediaPage