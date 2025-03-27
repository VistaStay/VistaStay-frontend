// Filter.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Filter() {
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  return (
    <div className="flex flex-col items-center w-full h-full">
      <h2 className="text-3xl font-bold mb-4">Filters</h2>

      {/* Filters Container */}
      <div className="w-[500px] h-[500px]">
        {/* Location Card */}
        <div className="p-12 border-2 border-blue-800 rounded-lg shadow-md bg-white">
          <h3 className="text-lg font-semibold mb-4">Location</h3>
          <div className="flex justify-between">
            <Button className="bg-white text-black border border-black hover:bg-blue-800 hover:text-white">
              Italy
            </Button>
            <Button className="bg-white text-black border border-black hover:bg-blue-800 hover:text-white">
              Japan
            </Button>
            <Button className="bg-white text-black border border-black hover:bg-blue-800 hover:text-white">
              France
            </Button>
          </div>
        </div>

        {/* Price Range Card */}
        <div className="p-12 border-2 border-blue-800 rounded-lg shadow-md bg-white mt-4">
          <h3 className="text-lg font-semibold mb-4">Price Range</h3>
          <div className="flex justify-between">
            <Input
              type="number"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              placeholder="Min"
              className="w-28 text-center border border-gray-400 px-3 py-2"
            />
            <Input
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              placeholder="Max"
              className="w-28 text-center border border-gray-400 px-3 py-2"
            />
          </div>
        </div>

        {/* Amenities Card */}
        <div className="p-12 border-2 border-blue-800 rounded-lg shadow-md bg-white mt-4">
          <h3 className="text-lg font-semibold mb-4">Amenities</h3>
          <div className="flex justify-between">
            <Button className="bg-white text-black border border-black hover:bg-blue-800 hover:text-white">
              TV
            </Button>
            <Button className="bg-white text-black border border-black hover:bg-blue-800 hover:text-white">
              Fridge
            </Button>
            <Button className="bg-white text-black border border-black hover:bg-blue-800 hover:text-white">
              AC
            </Button>
          </div>
        </div>
      </div>

      {/* Submit & Clear All Buttons */}
      <div className="flex w-[300px] mt-32">
        <Button className="w-full mx-1 bg-white text-black border border-black hover:bg-blue-800 hover:text-white">
          Submit
        </Button>
        <Button className="w-full mx-1 bg-white text-black border border-black hover:bg-blue-800 hover:text-white">
          Clear All
        </Button>
      </div>
    </div>
  );
}