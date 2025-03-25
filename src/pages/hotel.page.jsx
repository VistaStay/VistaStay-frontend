import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateBookingMutation, useGetHotelByIdQuery } from "@/lib/api";
import { Coffee, MapPin, MenuIcon as Restaurant, Star, Tv, Wifi } from "lucide-react";
import { useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
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

export default function HotelPage() {
  const { id } = useParams();
  const { data: hotel, isLoading, isError, error } = useGetHotelByIdQuery(id);
  const [createBooking, { isLoading: isCreateBookingLoading }] = useCreateBookingMutation();
  const { user } = useUser();

  const [open, setOpen] = useState(false);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [roomNumber, setRoomNumber] = useState(200);
  const [calendarOpen, setCalendarOpen] = useState(null);

  const handleBook = async () => {
    try {
      const bookingData = {
        hotelId: id,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        roomNumber,
      };
      const response = await createBooking(bookingData).unwrap();
      console.log("Booking response:", response);
      setOpen(false);
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <Skeleton className="w-full h-[400px] rounded-lg" />
        {/* You can add more skeleton components to show loading state */}
      </div>
    );

  if (isError)
    return (
      <p className="text-red">
        Error: {error.message}
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative w-full h-[400px]">
            <img src={hotel.image} alt={hotel.name} className="absolute object-cover rounded-lg" />
          </div>
          <div className="flex space-x-2">
            <Badge variant="secondary">Rooftop View</Badge>
            <Badge variant="secondary">French Cuisine</Badge>
            <Badge variant="secondary">City Center</Badge>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{hotel.name}</h1>
              <h1 className="text-2xl">{hotel._id}</h1>
              <h1 className="text-2xl">{user?.id || "No user ID"}</h1>
              <div className="flex items-center mt-2">
                <MapPin className="h-5 w-5 text-muted-foreground mr-1" />
                <p className="text-muted-foreground">{hotel.location}</p>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Star className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="font-bold">{hotel.rating ?? "No rating"}</span>
            <span className="text-muted-foreground">
              ({hotel.reviews ? hotel.reviews.toLocaleString() : "No"} reviews)
            </span>
          </div>
          <p className="text-muted-foreground">{hotel.description}</p>
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Wifi className="h-5 w-5 mr-2" />
                  <span>Free Wi-Fi</span>
                </div>
                <div className="flex items-center">
                  <Restaurant className="h-5 w-5 mr-2" />
                  <span>Restaurant</span>
                </div>
                <div className="flex items-center">
                  <Tv className="h-5 w-5 mr-2" />
                  <span>Flat-screen TV</span>
                </div>
                <div className="flex items-center">
                  <Coffee className="h-5 w-5 mr-2" />
                  <span>Coffee maker</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">${hotel.price}</p>
              <p className="text-sm text-muted-foreground">per night</p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg">Book Now</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Book Your Stay</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="checkIn">Check-in Date</Label>
                    <Dialog open={calendarOpen === 'checkIn'} onOpenChange={(isOpen) => setCalendarOpen(isOpen ? 'checkIn' : null)}>
                      <DialogTrigger asChild>
                        <Button variant="outline">{checkIn.toLocaleDateString()}</Button>
                      </DialogTrigger>
                      <DialogContent className="w-auto">
                        <DialogHeader>
                          <DialogTitle>Select Check-in Date</DialogTitle>
                        </DialogHeader>
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={(date) => {
                            setCheckIn(date);
                            setCalendarOpen(null);
                          }}
                          className="rounded-md border"
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="checkOut">Check-out Date</Label>
                    <Dialog open={calendarOpen === 'checkOut'} onOpenChange={(isOpen) => setCalendarOpen(isOpen ? 'checkOut' : null)}>
                      <DialogTrigger asChild>
                        <Button variant="outline">{checkOut.toLocaleDateString()}</Button>
                      </DialogTrigger>
                      <DialogContent className="w-auto">
                        <DialogHeader>
                          <DialogTitle>Select Check-out Date</DialogTitle>
                        </DialogHeader>
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={(date) => {
                            setCheckOut(date);
                            setCalendarOpen(null);
                          }}
                          className="rounded-md border"
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="roomNumber">Room Number</Label>
                    <Input
                      id="roomNumber"
                      type="number"
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(Number(e.target.value))}
                    />
                  </div>
                </div>
                <Button
                  onClick={handleBook}
                  disabled={isCreateBookingLoading}
                  className="w-full mt-4"
                >
                  {isCreateBookingLoading ? "Booking..." : "Confirm Booking"}
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
