import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BACKEND_URL = "http://localhost:8083";
//import.meta.env.VITE_BACKEND_URL;
//http://localhost:8080/api
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:  `${BACKEND_URL}/api/`,
    prepareHeaders: async (headers, { getState }) => {
      const clerk = window.Clerk;
      if (clerk) {
        const token = await clerk.session?.getToken();
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => 'hotels'
    }),
    getHotelsForSearchQuery: builder.query({
        query: ({ query }) => `hotels/search/retrive?query=${query}`
      }),
    getHotelById: builder.query({
      query: (id) => `hotels/${id}`
    }),
    createHotel: builder.mutation({
      query: (hotel) => ({
        url: 'hotels',
        method: 'POST',
        body: hotel
      })
    }),
    createBooking: builder.mutation({
      query: (booking) => ({
        url: 'bookings',
        method: 'POST',
        body: booking
      })
    }),
    getBookingById: builder.query({
      query: (id) => `bookings/${id}`
    }),
    getFilteredHotels: builder.query({
      query: (filters) => ({
        url: 'hotels/filter',
        params: filters
      })
    }),
    createCheckoutSession: builder.mutation({
      query: () => ({
        url: 'payments/create-checkout-session',
        method: 'POST'
      })
    }),
    getCheckoutSessionStatus: builder.query({
      query: (sessionId) => `payments/session-status?session_id=${sessionId}`
    })
  })
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
  useGetCheckoutSessionStatusQuery
} = api;