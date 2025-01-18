// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://aidf-4-back-end-pre.onrender.com/api" }),
  endpoints: (builder) => ({
    // GET request to fetch all hotels
    getHotels: builder.query({
      query: () => `hotels`,
    }),
    getHotelsForQuery: builder.query({
      query: ({ query }) => `hotels/search/retrieve?query=${query}`,
    }),
    getHotelById: builder.query({
      query: ({ id }) => `hotels/${id}`,
    }),
  }),
});

// Export hooks for the endpoints
export const { useGetHotelsQuery, useGetHotelsForQueryQuery, useGetHotelByIdQuery } = hotelApi;
