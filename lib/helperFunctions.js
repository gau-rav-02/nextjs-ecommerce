
import { NextResponse } from "next/server"


export const response = (success, statusCode, message, data = {}) =>{
    return NextResponse.json({
        success, statusCode, message, data
    })
}

export const catchError = (error, customMessage) =>{
    // Handling duplicate key error
    if (error.code === 11000) {
        const keys = Object.keys(error.keyPattern).join(",");
        error.message = `Duplicate fields: ${keys}. This fields value must be unique`;
    }

    // Error object creation
    let errorObj = {}

    // Check environment - development vs production
    if (process.env.NODE_ENV === "development") {
        errorObj = {
            message: error.message,
            error
        };
    } else {
        errorObj = {
            message: customMessage || "Internal server error"
        };
    }

    return NextResponse.json({
        success: false,
        statusCode: error.code,
        ...errorObj,
    })
}

export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    return otp
}


export const columnConfig = (column, isCreatedAt = false, isUpdatedAt = false, isDeleted_at = false) => {

    const newColumn = [...column]

    if(isCreatedAt){
        newColumn.push({
            accessorKey: 'createdAt',
            header: 'Created At',
            Cell: ({renderedCellValue}) => (new Date(renderedCellValue).toLocaleString())
        })
    }
    if(isUpdatedAt){
        newColumn.push({
            accessorKey: 'updatedAt',
            header: 'Updated At',
            Cell: ({renderedCellValue}) => (new Date(renderedCellValue).toLocaleString())
        })
    }
    if(isDeleted_at){
        newColumn.push({
            accessorKey: 'Deleted_at',
            header: 'Deleted At',
            Cell: ({renderedCellValue}) => (new Date(renderedCellValue).toLocaleString())
        })
    }

    return newColumn
}