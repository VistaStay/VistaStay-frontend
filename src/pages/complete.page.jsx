import { Button } from "@/components/ui/button";
import {
  useGetCheckoutSessionStatusQuery,
  useGetBookingByIdQuery,
} from "@/lib/api";
import { Link, useSearchParams, Navigate } from "react-router";
import { format } from "date-fns";

function CompletePage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isLoading, isError } =
    useGetCheckoutSessionStatusQuery(sessionId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          Something went wrong
        </h2>
        <p className="mb-4">
          We couldn't process your payment information. Please try again or
          contact support.
        </p>
        <Button asChild className="mt-6">
          <Link to={`/booking/payment?bookingId=${data?.bookingId || ""}`}>
            Return to Payment Page
          </Link>
        </Button>
      </div>
    );
  }

  if (data?.status === "open") {
    return <Navigate to={`/booking/payment?bookingId=${data?.bookingId}`} />;
  }

  if (data?.status === "complete") {
    // Format dates
    const checkInDate = new Date(data.booking.checkIn);
    const checkOutDate = new Date(data.booking.checkOut);
    const formattedCheckIn = format(checkInDate, "MMM dd, yyyy");
    const formattedCheckOut = format(checkOutDate, "MMM dd, yyyy");

    // Calculate number of nights
    const nights = Math.round(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    return (
      <section
        id="success"
        className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md my-8"
      >
        <div className="flex justify-center mb-4 text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Booking Confirmed!
        </h2>
        {/* <p className="text-center mb-4">
          Your payment has been processed successfully. A confirmation email
          will be sent to{" "}
          <span className="font-semibold">{data.customer_email}</span>.
        </p>
         */}
        <p className="text-center mb-4">
          Your payment has been processed successfully.
        </p>
        {/* Hotel Info Card */}
        <div className="mt-6 border rounded-lg overflow-hidden">
          <div className="relative h-48">
            {data.hotel.image && (
              <img
                src={data.hotel.image}
                alt={data.hotel.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="p-4 bg-gray-50">
            <h3 className="text-xl font-bold">{data.hotel.name}</h3>
            <p className="text-gray-600 mb-2">{data.hotel.location}</p>
            {data.hotel.rating && (
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{data.hotel.rating}</span>
                {data.hotel.reviews && (
                  <span className="text-gray-500 text-sm ml-1">
                    ({data.hotel.reviews} reviews)
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Booking Details */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Booking Details:</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Booking ID</p>
                <p className="font-medium">
                  {data.booking._id || data.bookingId}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Room Number</p>
                <p className="font-medium">{data.booking.roomNumber}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Check-in Date</p>
                <p className="font-medium">{formattedCheckIn}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Check-out Date</p>
                <p className="font-medium">{formattedCheckOut}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Duration</p>
                <p className="font-medium">
                  {nights} {nights === 1 ? "night" : "nights"}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Price</p>
                <p className="font-medium">${data.hotel.price} per night</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Payment Method</p>
                <p className="font-medium capitalize">
                  {data.booking.paymentMethod.replace("_", " ").toLowerCase()}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Payment Status</p>
                <p className="font-medium text-green-600">
                  {data.booking.paymentStatus}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">What happens next?</h3>
          <ul className="list-disc pl-5 space-y-1">
            {/* <li>
              You'll receive a confirmation email with your booking details
            </li> */}
            <li>Present your booking ID upon arrival at the hotel</li>
            <li>Check-in time starts at 2:00 PM on {formattedCheckIn}</li>
            <li>Check-out time is before 12:00 PM on {formattedCheckOut}</li>
          </ul>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            If you have any questions, please contact{" "}
            <a
              href="mailto:bookings@example.com"
              className="text-blue-600 hover:underline"
            >
              bookings@example.com
            </a>
          </p>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          {/* <Button asChild>
            <Link to="/bookings">View My Bookings</Link>
          </Button> */}
          <Button asChild variant="outline">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Payment Status Unknown</h2>
      <p className="mb-4">
        We couldn't determine the status of your payment. If you completed a
        booking, please check your email for confirmation.
      </p>
      <Button asChild className="mt-6">
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  );
}

export default CompletePage;