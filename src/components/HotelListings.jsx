import { useState } from "react";
import { useSelector } from "react-redux";
import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
import { useGetHotelsQuery, useGetHotelsForSearchQueryQuery } from "@/lib/api";
import PriceFilter from "./Sheet";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function HotelListings() {
  const searchValue = useSelector((state) => state.search.query); 
  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  
  const locations = ["ALL", "France", "Italy", "Australia", "Japan"];

  const { data: allHotels, isLoading: allHotelsLoading, isError: allHotelsError } = useGetHotelsQuery();
  const { data: searchResults, isLoading: searchLoading, isError: searchError } = useGetHotelsForSearchQueryQuery(
    { query: searchValue }, 
    { skip: !searchValue } 
  );

  const handleSelectedLocation = (location) => {
    setSelectedLocation(location);
  };

  const isAISearchActive = !!searchValue;
  const hotelsData = isAISearchActive ? searchResults : allHotels;
  const isLoading = isAISearchActive ? searchLoading : allHotelsLoading;
  const isError = isAISearchActive ? searchError : allHotelsError;

  const handleApplyFilters = () => {
    setIsSheetOpen(false);
  };

  if (isLoading) {
    return (
      <section className="px-8 py-8 lg:py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top trending hotels worldwide</h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable experience.
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          {locations.map((location, i) => (
            <LocationTab key={i} selectedLocation={selectedLocation} name={location} onClick={handleSelectedLocation} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-8 py-8 lg:py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top trending hotels worldwide</h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable experience.
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          {locations.map((location, i) => (
            <LocationTab key={i} selectedLocation={selectedLocation} name={location} onClick={handleSelectedLocation} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <p className="text-red-500">Error loading hotels</p>
        </div>
      </section>
    );
  }

  const filteredHotels = hotelsData?.filter((item) => {
    const hotel = isAISearchActive ? item.hotel : item;
    return (
      (selectedLocation === "ALL" || hotel.location.toLowerCase().includes(selectedLocation.toLowerCase())) &&
      hotel.price >= minPrice &&
      hotel.price <= maxPrice
    );
  }) || [];

  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Top trending hotels worldwide</h2>
        <p className="text-lg text-muted-foreground">
          Discover the most trending hotels worldwide for an unforgettable experience.
        </p>
      </div>
      <div className="flex items-center gap-x-4">
        {locations.map((location, i) => (
          <LocationTab key={i} selectedLocation={selectedLocation} name={location} onClick={handleSelectedLocation} />
        ))}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-auto">Filters</button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <PriceFilter
              minValue={minPrice}
              maxValue={maxPrice}
              onMinChange={setMinPrice}
              onMaxChange={setMaxPrice}
              onApply={handleApplyFilters}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((item) => {
            const hotel = isAISearchActive ? item.hotel : item;
            return <HotelCard key={hotel._id} hotel={hotel} />;
          })
        ) : (
          <p>No hotels found matching your criteria.</p>
        )}
      </div>
    </section>
  );
}
