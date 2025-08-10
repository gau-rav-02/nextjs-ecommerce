'use client'

import { ThemeProvider } from "@mui/material"
import DataTable from "./DataTable"
import { useTheme } from "next-themes"
import { darkTheme, lightTheme } from "@/lib/materialTheme"
import { useEffect, useState } from "react"

const DataTableWrapper = (
  {
    queryKey,
  fetchUrl,
  columnsConfig,
  initialPageSize = 10,
  exportEndpoint,
  deleteEndpoint,
  deleteType,
  trashView,
  createAction,
  }
) => {

    const {resolvedTheme} = useTheme()
    const [mounted, seMounted] = useState(false)

    useEffect(() => {
        seMounted(true)
    }, [])

    if (!mounted) return null

  return (
    <ThemeProvider theme={resolvedTheme === 'dark'? darkTheme : lightTheme}>
        <DataTable
          queryKey={queryKey}
          fetchUrl={fetchUrl}
          columnsConfig={columnsConfig}
          initialPageSize={initialPageSize}
          exportEndpoint={exportEndpoint}
          deleteEndpoint={deleteEndpoint}
          deleteType={deleteType}
          trashView={trashView}
          createAction={createAction}
        />
    </ThemeProvider>
  )
}

export default DataTableWrapper