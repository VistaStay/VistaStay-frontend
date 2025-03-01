import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//import { getHotels } from "./api/hotels";

const BACKEND_URL = "http://localhost:8080";

export const api = createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({ baseUrl : `${BACKEND_URL}/api/`}),
    endpoints:(builder) => ({
        getHotels:builder.query({
            query: () => "hotels",
        }),
        getHotelById: builder.query({
            query: (id) => `hotels/${id}`,
        }),
        createHotel:builder.mutation({
            query:(hotel) => ({
                url:"hotels",
                method:"POST",
                body:hotel,
            })
        })
    }),
});

export const { useGetHotelsQuery , useGetHotelByIdQuery , useCreateHotelMutation} = api;