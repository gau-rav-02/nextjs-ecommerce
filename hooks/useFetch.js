import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { showToast } from "@/lib/toast";

const useFetch = (url, method = "GET", options = {} ) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const optionsString = JSON.stringify(options)
  const requestOptions = useMemo(() => {
    const opts =  {...options}
    if(method === 'POST' && !opts.data){
        opts.data = {}
    }
    return opts
  }, [method, optionsString])

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const config = {
//         url,
//         method,
//         ...(data && { data }),
//       };

//       const response = await axios(config);
//       setData(response.data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

  useEffect(() => {
    const apiCall = async () => {
        setLoading(true)
        setError(null)
        try {
            const {data: response} = await axios({
                url,
                method,
                ...(requestOptions)
            })

            if(!response.success){
                throw new Error(response.message)
            }
    
            setData(response)
        } catch (error) {
            showToast("error", error.message);
        } finally{
            setLoading(false)
        }
    }

    apiCall()
  }, [url, refreshIndex, requestOptions]);

  const refetch = () => {
    setRefreshIndex(prev => prev+1)
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export default useFetch;
