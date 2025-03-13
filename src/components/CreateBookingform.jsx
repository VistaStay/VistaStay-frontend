import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCreateBookingMutation } from "@/lib/api";

const formSchema = z.object({
    hotelId: z.string().min(1, { message: "Hotel ID is required" }),
    checkIn: z.string().min(1, { message: "Check-in date is required" }),
    checkOut: z.string().min(1, { message: "Check-out date is required" }),
});
  
const CreateBookingForm = () => {
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values) => {
    const { hotelId, checkIn, checkOut } = values;
  
    try {
      toast.loading("Creating booking...");
      const response = await createBooking({
        hotelId,
        checkIn,
        checkOut,
      }).unwrap();

      if (response.bookingId) {
        toast.success(`Booking created successfully! Booking ID: ${response.bookingId}`);
      } else {
        throw new Error("Booking creation failed");
      }
    } catch (error) {
      toast.error("Booking creation failed. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form className="w-1/2" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="hotelId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check-In Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="checkOut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check-Out Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Booking"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateBookingForm;
