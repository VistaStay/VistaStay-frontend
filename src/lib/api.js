import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = "http://localhost:8085";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${BACKEND_URL}/api/`,
    prepareHeaders: async (headers, { getState }) => {
      const token = await window?.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ['Bookings'],
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => "hotels",
    }),
    getHotelsForSearchQuery: builder.query({
      query: ({ query }) => `hotels/search/retrive?query=${query}`,
    }),
    getHotelById: builder.query({
      query: (id) => `hotels/${id}`,
    }),
    createHotel: builder.mutation({
      query: (hotel) => ({
        url: "hotels",
        method: "POST",
        body: hotel,
      }),
    }),
    createBooking: builder.mutation({
      query: (booking) => ({
        url: "bookings",
        method: "POST",
        body: booking,
      }),
      invalidatesTags: ['Bookings'],
    }),
    getBookings: builder.query({
      query: () => "bookings",
      providesTags: ['Bookings'],
    }),
    getFilteredHotels: builder.query({
      query: (filters) => ({
        url: "hotels/filter",
        params: filters,
      }),
    }),
    deleteBooking: builder.mutation({
      query: (bookingId) => ({
        url: `bookings/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Bookings'],
    }),
  }),
});

export const { 
  useGetHotelsQuery, 
  useGetHotelByIdQuery, 
  useCreateHotelMutation,
  useCreateBookingMutation, 
  useGetHotelsForSearchQueryQuery,
  useGetFilteredHotelsQuery,
  useGetBookingsQuery,
  useDeleteBookingMutation
} = api;