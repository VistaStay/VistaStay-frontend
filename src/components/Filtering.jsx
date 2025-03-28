import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Filter() {
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [selectedButtons, setSelectedButtons] = useState({});

  const toggleButton = (label) => {
    setSelectedButtons((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <h2 className="text-3xl font-bold mb-4">Filters</h2>

      {/* Filters Container */}
      <div className="flex flex-col space-y-4 w-[600px]"> 
        {/* Location Card */}
        <div className="p-8 border-2 border-blue-800 rounded-lg shadow-md bg-white w-full">
          <h3 className="text-lg font-semibold mb-4">Location</h3>
          <div className="grid grid-cols-4 gap-2">
            {["France", "Italy", "Australia", "Japan"].map((location) => (
              <Button
                key={location}
                className={`bg-white text-black border border-black hover:bg-blue-800 hover:text-white ${selectedButtons[location] ? 'bg-blue-300' : ''}`}
                onClick={() => toggleButton(location)}
              >
                {location}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Range Card */}
        <div className="p-8 border-2 border-blue-800 rounded-lg shadow-md bg-white w-full">
          <h3 className="text-lg font-semibold mb-4">Price Range</h3>
          <div className="flex justify-between items-center space-x-4">
            <label className="text-sm font-medium">Min</label>
            <Input
              type="number"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              placeholder="Min"
              className="w-1/2 text-center border border-gray-400 px-3 py-2"
            />
            <label className="text-sm font-medium">Max</label>
            <Input
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              placeholder="Max"
              className="w-1/2 text-center border border-gray-400 px-3 py-2"
            />
          </div>
          {/* Ascending & Descending Buttons */}
          <div className="flex justify-between mt-4 space-x-2">
            <Button className="w-1/4 text-sm mx-1 bg-blue-500 text-white border border-blue-500 hover:bg-blue-800 hover:text-white">Ascending</Button>
            <Button className="w-1/4 text-sm mx-1 bg-blue-500 text-white border border-blue-500 hover:bg-blue-800 hover:text-white">Descending</Button>
          </div>
        </div>

        {/* Amenities Card */}
        <div className="p-8 border-2 border-blue-800 rounded-lg shadow-md bg-white w-full">
          <h3 className="text-lg font-semibold mb-4">Amenities</h3>
          <div className="grid grid-cols-3 gap-2">
            {["Free Wi-Fi", "Restaurant", "TV", "Coffee Maker", "Fridge", "Oven", "AC"].map((amenity, index) => (
              <Button
                key={amenity}
                className={`bg-white text-black border border-black hover:bg-blue-800 hover:text-white ${selectedButtons[amenity] ? 'bg-blue-300' : ''}`}
                onClick={() => toggleButton(amenity)}
              >
                {amenity}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit & Clear All Buttons */}
      <div className="flex w-[600px] mt-10 space-x-6">
        <Button className="w-1/2 text-sm bg-blue-700 text-white border border-black hover:bg-blue-800">
          Submit
        </Button>
        <Button className="w-1/2 text-sm bg-blue-700 text-white border border-black hover:bg-blue-800">
          Clear All
        </Button>
      </div>
    </div>
  );
}
