import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:3001/"}),
    reducerPath: "adminApi",
    tagTypes: ["Products","ProductDetails","User"],
    endpoints: (build)=>({
        getProducts: build.query({
            query: ({ page, pageSize, sort, search }) => ({
              url: "client/products",
              method: "GET",
              params: { page, pageSize, sort, search },
            }),
            providesTags: ["Products"],
          }),
      
        getProductDetails: build.query({
          query: ({ page, pageSize, sort, search,itemName}) => ({ 
            
            url: `client/products/${itemName}`,
            method: "GET",
            params: { page, pageSize, sort, search,itemName },
          }),
          providesTags: ["ProductDetails"],
        }),
        getUser: build.query({
          query: (username) => `general/user/${username}`,
          providesTags: ["User"],
        }),
      })
    })

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useGetUserQuery,
}  =api;