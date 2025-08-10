"use client";

import React, { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { showToast } from '@/lib/toast';

const UploadMedia = ({ isMultiple, queryClient }) => {
    // const { showToast } = useToast();

    const handleOnError = (error) => {
        try {
            const msg = error?.statusText || error?.message;
            showToast("error", msg );
        } catch {
            showToast({ type: "error", message: "Upload failed" });
        }
    }

    const handleOnQueuesEnd = async (results) => {
        try {
            const files = results.info.files;

            const uploadedFiles = files
                .filter((f) => f.uploadInfo)
                .map((f) => {
                    const info = f.uploadInfo;
                    return {
                        asset_id: info.asset_id,
                        public_id: info.public_id,
                        path: info.path,
                        thumbnail_url: info.thumbnail_url,
                        secure_url: info.secure_url,
                    };
                });

            if (uploadedFiles.length > 0) {
                const {data: mediaUploadResponse} = await axios.post("/api/media/create", uploadedFiles);
                if(!mediaUploadResponse.success){
                    throw new Error(mediaUploadResponse.message)
                }

                queryClient.invalidateQueries(['media-data'])
                showToast('success', mediaUploadResponse.message)
            }
        } catch (e) {
            showToast("error", e.message);
        }
    }

    return (
        <CldUploadWidget
            signatureEndpoint="/api/cloudinary-signature"
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPDATE_PRESET}
            onError={handleOnError}
            onQueuesEnd={handleOnQueuesEnd}
            config={{
                cloud: {
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
                }
            }}
            options={{
                multiple: isMultiple,
                sources: ["local", "url", "unsplash", "google_drive"],
                maxFiles: 100,
            }}
        >
            {({ open }) => {
                return (
                    <Button type="button" onClick={() => open?.()} className="flex items-center gap-2 cursor-pointer">
                        <FiPlus size={18} />
                        Upload Media
                    </Button>
                );
            }}
        </CldUploadWidget>
    );
};

export default UploadMedia;