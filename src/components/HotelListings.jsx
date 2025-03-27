import { useGetHotelsForSearchQueryQuery, useGetHotelsQuery } from "@/lib/api";
import { useState } from "react";
import HotelCard from "./HotelCard";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Filtering from "./Filtering";


export default function HotelListings() {
  const searchValue = useSelector((state) => state.search.query);
  const [filterQuery, setFilterQuery] = useState("");

  const { 
    data: allHotels, 
    isLoading: allHotelsLoading, 
    isError: allHotelsError 
  } = useGetHotelsQuery();

  const { 
    data: searchResults, 
    isLoading: searchLoading, 
    isError: searchError 
  } = useGetHotelsForSearchQueryQuery(
    { query: searchValue },
    { skip: !searchValue }
  );

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <p className="text-red-500">Error loading hotels</p>
        </div>
      </section>
    );
  }

  return (
   <>
    <section className="px-8 py-8 lg:py-16">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Top trending hotels worldwide
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover the most trending hotels worldwide for an unforgettable experience.
        </p>
      </div>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {hotelsData && hotelsData.length > 0 ? (
          hotelsData.map((item) => {
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
          <p>No hotels found.</p>
        )}
      </div>
    </section>

    <section className="px-8 py-8 lg:py-16">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Filtering the Hotels
          </h2>
          <p className="text-lg text-muted-foreground">
            Search hotel with filters
          </p>
        </div>
        <div className="flex gap-4">
        <Sheet>
        <SheetTrigger className="bg-black text-white hover:bg-gray-800 font-bold py-2 px-6 rounded">
        Apply Filter
      </SheetTrigger>
        <SheetContent className="w-full max-w-[1000px] sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1200px]">
        <Filtering />
        </SheetContent>
        </Sheet>
      </div>
      </div>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {allHotels && allHotels.length > 0 ? (
          allHotels.map((hotel) => (
            <HotelCard
              key={hotel._id}
              hotel={hotel}
            />
          ))
        ) : (
          <p>No hotels found.</p>
        )}
      </div>
    </section>
  </>
  );
}