import CreateBookingForm from "@/components/CreateBookingform";


export default function CreateBookingPage() {
  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Create a Booking</h2>
      <CreateBookingForm/>
    </main>
  );
}