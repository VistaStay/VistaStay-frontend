import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = "http://localhost:8085";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/`,
    prepareHeaders: async (headers, { getState }) => {
      return new Promise((resolve) => {
        async function checkToken() {
          const clerk = window.Clerk;
          if (clerk) {
            const token = await clerk.session?.getToken();
            headers.set("Authorization", `Bearer ${token}`);
            resolve(headers);
          } else {
            setTimeout(checkToken, 500); // try again in 500ms
          }
        }
        checkToken();
      });
    },
  }),
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
    }),
    getBookingById: builder.query({
      query: (id) => `bookings/${id}`,
    }),
    getFilteredHotels: builder.query({
      query: (filters) => ({
        url: "hotels/filter",
        params: filters,
      }),
    }), // 🛑 FIXED: Closed the getFilteredHotels object properly
    createCheckoutSession: builder.mutation({
      query: () => ({
        url: `payments/create-checkout-session`,
        method: "POST",
      }),
    }), // 🛑 FIXED: This was incorrectly inside getFilteredHotels
    getCheckoutSessionStatus: builder.query({
      query: (sessionId) => `payments/session-status?session_id=${sessionId}`,
    }), // 🛑 FIXED: This was incorrectly inside getFilteredHotels
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  useCreateHotelMutation,
  useCreateBookingMutation,
  useGetHotelsForSearchQueryQuery,
  useGetFilteredHotelsQuery,
  useGetBookingByIdQuery,
  useCreateCheckoutSessionMutation,
  useGetCheckoutSessionStatusQuery,
} = api;
