"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FiMoreVertical } from "react-icons/fi";
import {MdOutlineEdit} from 'react-icons/md'
import {IoIosLink} from 'react-icons/io'
import {LuTrash} from 'react-icons/lu'
import { ADMIN_MEDIA_EDIT } from "@/routes/AdminPanelRoute";
import { showToast } from "@/lib/toast";

const Media = ({
    media,
    deleteType, // "sd" | "pd"
    selectedMedia,
    setSelectedMedia,
    handleDelete,
}) => {
    // const isChecked = Array.isArray(selectedMedia)
    //     ? selectedMedia.includes(media?._id)
    //     : false;

    

    const handleCheck = () => {
        let next = [];
        
        if (selectedMedia.includes(media?._id)) {
            next = selectedMedia.filter((mId) => mId !== media?._id);
        } else {
            next = [...selectedMedia, media?._id];
        }
        
        setSelectedMedia(next);
        
    };

    const handleCopyLink = async (url) => {
        await navigator.clipboard.writeText(url);
        showToast("success", "Link copied");
        
    };

    return (
        <div className="relative group border border-gray-200 dark:border-gray-800 rounded overflow-hidden">
            <div className="absolute top-2 left-2 z-20">
                <Checkbox checked={selectedMedia.includes(media?._id)} onCheckedChange={handleCheck} className="border-primary cursor-pointer" />
            </div>

            <div className="absolute top-2 right-2 z-20">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white cursor-pointer">
                            <FiMoreVertical size={18} />
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {deleteType === 'SD' && 
                            <>
                                {/* <DropdownMenuItem asChild>
                                    <Link href={ADMIN_MEDIA_EDIT(media?._id)} className="cursor-pointer">
                                        <MdOutlineEdit/>
                                        Edit
                                        
                                    </Link>
                                </DropdownMenuItem> */}
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => handleCopyLink(media?.secure_url)}
                                >
                                    <IoIosLink/>
                                    Copy Link
                                </DropdownMenuItem>
                                
                            </>
                        }

                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => handleDelete([media?._id], deleteType)}
                        >
                            <LuTrash color="red"/>
                            {deleteType === 'SD'? 'Move into Trash' : 'Delete permanently'}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="absolute inset-0 z-10 hidden group-hover:block transition-all duration-150 ease-in bg-black/30"></div>

            <div className="w-full relative">
                <Image
                    src={media?.secure_url}
                    alt={media?.alt || "image"}
                    width={300}
                    height={300}
                    className="w-full object-cover h-[150px] sm:h-[200px]"
                />
            </div>
        </div>
    );
};

export default Media;
