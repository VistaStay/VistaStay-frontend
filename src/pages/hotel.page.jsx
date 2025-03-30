import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetHotelByIdQuery, useCreateBookingMutation } from "@/lib/api";
import { Coffee, MapPin, MenuIcon as Restaurant, Star, Tv, Wifi, Refrigerator, Fan, Utensils } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import { BookingDialog } from "@/components/BookingDailog";

const personnelOptions = [
  { value: "wifi", label: "Free Wi-Fi" },
  { value: "restaurant", label: "Restaurant" },
  { value: "tv", label: "Flat-screen TV" },
  { value: "coffee_maker", label: "Coffee maker" },
  { value: "fridge", label: "Fridge" },
  { value: "oven", label: "Oven" },
  { value: "AC", label: "AC" },
];

export default function HotelPage() {
  const { id } = useParams();
  const { data: hotel, isLoading, isError, error } = useGetHotelByIdQuery(id);
  const { user } = useUser();
  const [createBooking, { isLoading: isCreateBookingLoading }] = useCreateBookingMutation();
  const navigate = useNavigate();

  const handleBook = async (bookingData) => {
    try {
      const response = await createBooking(bookingData).unwrap();
      console.log("Booking created successfully!", response);
      const bookingId = response._id; // Ensure backend returns _id
      navigate(`/booking/payment?bookingId=${bookingId}`);
    } catch (err) {
      console.error("Failed to create booking:", err);
      // Optionally, add user feedback here (e.g., toast notification)
    }
  };

  const amenityIcons = {
    wifi: <Wifi className="h-5 w-5 text-muted-foreground mr-2" />,
    restaurant: <Restaurant className="h-5 w-5 text-muted-foreground mr-2" />,
    tv: <Tv className="h-5 w-5 text-muted-foreground mr-2" />,
    coffee_maker: <Coffee className="h-5 w-5 text-muted-foreground mr-2" />,
    fridge: <Refrigerator className="h-5 w-5 text-muted-foreground mr-2" />,
    oven: <Utensils className="h-5 w-5 text-muted-foreground mr-2" />,
    AC: <Fan className="h-5 w-5 text-muted-foreground mr-2" />,
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <Skeleton className="w-full h-[400px] rounded-lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{hotel.name}</h1>
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
            <span className="font-bold">{hotel.rating ?? "N/A"}</span>
            <span className="text-muted-foreground">
              ({hotel.reviews?.toLocaleString() ?? 0} reviews)
            </span>
          </div>
          <p className="text-muted-foreground">{hotel.description}</p>

          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                {hotel.amenities?.map((amenity, index) => {
                  const label = personnelOptions.find((opt) => opt.value === amenity)?.label || amenity;
                  return (
                    <div key={index} className="flex items-center">
                      {amenityIcons[amenity] || <span className="h-5 w-5 mr-2" />}
                      <span>{label}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">${hotel.price}/night</p>
              <p className="text-sm text-muted-foreground">Excluding taxes</p>
            </div>
            <BookingDialog
              hotelName={hotel.name}
              hotelId={hotel._id}
              onSubmit={handleBook}
              isLoading={isCreateBookingLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}