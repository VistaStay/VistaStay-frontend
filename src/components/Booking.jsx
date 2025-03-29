import { Button } from "@/components/ui/button";
import { useCreateBookingMutation } from "@/lib/api";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";

export default function Booking({ price }) {
  const { id } = useParams();
  const [createBooking, { isLoading: isCreateBookingLoading }] = useCreateBookingMutation();
  const { user } = useUser();

  // State management
  const [open, setOpen] = useState(false);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [calendarOpen, setCalendarOpen] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total price whenever number of rooms or price changes
  useEffect(() => {
    setTotalPrice((numberOfRooms * price).toFixed(2));
  }, [numberOfRooms, price]);

  const handleBook = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      // Correct payload keys: remove userId and rename fields to match backend DTO
      const bookingData = {
        hotelId: id,
        checkIn: checkIn.toISOString().split('T')[0],
        checkOut: checkOut.toISOString().split('T')[0],
        roomNumber: numberOfRooms, // Use roomNumber instead of numberOfRooms
        totalprice: parseFloat(totalPrice), // Use totalprice instead of totalPrice
      };

      console.log("Sending Booking Data:", bookingData);
      const response = await createBooking(bookingData).unwrap();
      console.log("Booking successful:", response);
      setOpen(false);
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full md:w-auto">
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Book Your Stay</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Date Selection */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="grid gap-2 flex-1">
              <Label htmlFor="check-in-date">Check In</Label>
              <Dialog 
                open={calendarOpen === 'checkIn'} 
                onOpenChange={(isOpen) => setCalendarOpen(isOpen ? 'checkIn' : null)}
              >
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    id="check-in-date"
                    className="w-full justify-start text-left font-normal"
                  >
                    {checkIn.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={(date) => {
                      if (date) {
                        setCheckIn(date);
                        // Auto-set checkout to next day
                        const nextDay = new Date(date);
                        nextDay.setDate(nextDay.getDate() + 1);
                        if (nextDay <= checkOut) setCheckOut(nextDay);
                      }
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-2 flex-1">
              <Label htmlFor="check-out-date">Check Out</Label>
              <Dialog 
                open={calendarOpen === 'checkOut'} 
                onOpenChange={(isOpen) => setCalendarOpen(isOpen ? 'checkOut' : null)}
              >
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    id="check-out-date"
                    className="w-full justify-start text-left font-normal"
                  >
                    {checkOut.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={(date) => date && setCheckOut(date)}
                    disabled={(date) => date <= checkIn}
                    initialFocus
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Room Selection */}
          <div className="grid gap-2">
            <Label htmlFor="room-count">Number of Rooms</Label>
            <Input
              id="room-count"
              type="number"
              min="1"
              max="10"
              value={numberOfRooms}
              onChange={(e) => {
                const value = Math.max(1, Math.min(10, Number(e.target.value) || 1));
                setNumberOfRooms(value);
              }}
            />
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Price per room:</span>
              <span className="font-medium">${price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold">${totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleBook}
          disabled={isCreateBookingLoading}
          className="w-full mt-2"
          size="lg"
        >
          {isCreateBookingLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Confirm Booking"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
