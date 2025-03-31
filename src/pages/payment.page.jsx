import CheckoutForm from "@/components/CheckoutForm";
import { useSearchParams } from "react-router";
import { useGetBookingByIdQuery } from "@/lib/api";

function PaymentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const { data: booking, isLoading: isBookingLoading } =
    useGetBookingByIdQuery(bookingId);

  if (isBookingLoading && !booking) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <h2 className="text-4xl font-bold">Review Your Booking</h2>
      <div className="mt-4">
        <CheckoutForm bookingId={booking._id} />
      </div>
    </main>
  );
}

export default PaymentPage;