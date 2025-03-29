import { SignedIn, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { useGetBookingsQuery, useDeleteBookingMutation } from "@/lib/api";

const AccountPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  const { data: bookings, error, isLoading, refetch } = useGetBookingsQuery();
  const [deleteBooking] = useDeleteBookingMutation();

  const userBookings = bookings ? bookings.filter(b => b.userId === user.id) : [];

  const handleDeleteBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId).unwrap();
      console.log(`Booking ${bookingId} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold">My Account</h1>

      <section className="mt-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Personal Information</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-muted-foreground">Name: {user?.fullName}</p>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Email: {user?.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">My Bookings</h2>

        {isLoading && <p>Loading bookings...</p>}
        {error && <p>Error loading bookings.</p>}
        {userBookings && userBookings.length === 0 && <p>No bookings found.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {userBookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
            >
              <p className="font-semibold">Booking ID: {booking._id}</p>
              <p>
                <span className="font-medium">Hotel ID:</span> {booking.hotelId}
              </p>
              <p>
                <span className="font-medium">Check In:</span> {new Date(booking.checkIn).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Check Out:</span> {new Date(booking.checkOut).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Rooms:</span> {booking.roomNumber}
              </p>
              <p>
                <span className="font-medium">Total Price:</span> ${booking.totalprice}
              </p>

              <div className="mt-auto text-right">
                <button
                  onClick={() => handleDeleteBooking(booking._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AccountPage;
