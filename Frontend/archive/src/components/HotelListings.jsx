import { useGetHotelsForQueryQuery } from "@/lib/services/api";

import { MapPin, Star } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardFooter } from "./ui/card";

export default function HotelListings() {
  const search = useSelector((state) => state.search);

  const { data, isFetching, isError, error } = useGetHotelsForQueryQuery({
    query: search.value,
  });

  if (isFetching) {
    return (
      <section className="px-8 py-8 lg:py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {search.value === ""
              ? "Top trending hotels worldwide"
              : "Your experience is loading"}
          </h2>
          <Skeleton className="h-6 w-full max-w-2xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="aspect-[4/3] rounded-t-xl" />
              <CardContent className="mt-3 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-6 w-1/4" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-8 py-8 lg:py-16">
        <p className="text-lg text-red-500">{error.message}</p>
      </section>
    );
  }

  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {search.value === ""
            ? "Top trending hotels worldwide"
            : "Top hotels that matches your vibe"}
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover the most trending hotels worldwide for an unforgettable
          experience.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.map(({ hotel }) => (
          <Link
            to={`/hotel/${hotel._id}`}
            key={hotel._id}
            className="block group relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="object-cover w-full h-full absolute transition-transform group-hover:scale-105"
              />
            </div>

            <div className="mt-3 space-y-2">
              <h3 className="font-semibold text-lg">{hotel.name}</h3>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{hotel.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium">{hotel.rating}</span>
                <span className="text-muted-foreground">
                  ({hotel.reviews.toLocaleString()} Reviews)
                </span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold">${hotel.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
