import { useGetHotelsForSearchQueryQuery, useGetHotelsQuery } from "@/lib/api";
import { useState } from "react";
import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
import { useSelector } from "react-redux";

export default function HotelListings() {
  const searchValue = useSelector((state) => state.search.query); // Changed from .value to .query
  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const locations = ["ALL", "France", "Italy", "Australia", "Japan"];

  // Fetch all hotels for initial load and location filtering
  const { 
    data: allHotels, 
    isLoading: allHotelsLoading, 
    isError: allHotelsError 
  } = useGetHotelsQuery();

  // Fetch AI search results only when searchValue exists
  const { 
    data: searchResults, 
    isLoading: searchLoading, 
    isError: searchError 
  } = useGetHotelsForSearchQueryQuery(
    { query: searchValue },
    { skip: !searchValue } // Skip this query if no search value
  );

  const handleSelectedLocation = (location) => {
    setSelectedLocation(location);
  };

  // Determine which data to use
  const isAISearchActive = !!searchValue;
  const hotelsData = isAISearchActive ? searchResults : allHotels;
  const isLoading = isAISearchActive ? searchLoading : allHotelsLoading;
  const isError = isAISearchActive ? searchError : allHotelsError;

  if (isLoading) {
    return (
      <section className="px-8 py-8 lg:py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top trending hotels worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable experience.
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          {locations.map((location, i) => (
            <LocationTab
              key={i}
              selectedLocation={selectedLocation}
              name={location}
              onClick={handleSelectedLocation}
            />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top trending hotels worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable experience.
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          {locations.map((location, i) => (
            <LocationTab
              key={i}
              selectedLocation={selectedLocation}
              name={location}
              onClick={handleSelectedLocation}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <p className="text-red-500">Error loading hotels</p>
        </div>
      </section>
    );
  }

  // Filter hotels by location (works for both all hotels and search results)
  const filteredHotels = hotelsData && hotelsData.length > 0
    ? (selectedLocation === "ALL"
        ? hotelsData
        : hotelsData.filter((item) => {
            const hotel = isAISearchActive ? item.hotel : item;
            return hotel.location.toLowerCase().includes(selectedLocation.toLowerCase());
          }))
    : [];

  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Top trending hotels worldwide
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover the most trending hotels worldwide for an unforgettable experience.
        </p>
      </div>
      <div className="flex items-center gap-x-4">
        {locations.map((location, i) => (
          <LocationTab
            key={i}
            selectedLocation={selectedLocation}
            name={location}
            onClick={handleSelectedLocation}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((item) => {
            const hotel = isAISearchActive ? item.hotel : item;
            const confidence = isAISearchActive ? item.confidence : null;
            return (
              <HotelCard
                key={hotel._id}
                hotel={hotel}
                confidence={confidence}
              />
            );
          })
        ) : (
          <p>No hotels found for this location.</p>
        )}
      </div>
    </section>
  );
}