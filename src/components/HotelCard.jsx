import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router";

function HotelCard(props) {
  return (
    <Link
      to={`/hotels/${props.hotel._id}`}
      key={props.hotel._id}
      className="block group relative"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <img
          src={props.hotel.image}
          alt={props.hotel.name}
          className="object-cover w-full h-full absolute transition-transform group-hover:scale-105"
        />
      </div>

      <div className="mt-3 space-y-2">
        <h3 className="font-semibold text-lg">{props.hotel.name}</h3>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{props.hotel.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="font-medium">{props.hotel?.rating ?? "No rating"}</span>
          <span className="text-muted-foreground">
            ({props.hotel.reviews?.toLocaleString() ?? "No"} Reviews)
          </span>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-xl font-bold">${props.hotel.price}</span>
        </div>
        <p className="text-muted-foreground">
          Similarity: {(props.confidence * 100).toFixed(2)}%
        </p>
      </div>
    </Link>
  );
}

export default HotelCard;