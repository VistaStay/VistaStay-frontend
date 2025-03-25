import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PriceFilter({ minValue, maxValue, onMinChange, onMaxChange, onApply }) {
  const [localMin, setLocalMin] = useState(minValue);
  const [localMax, setLocalMax] = useState(maxValue);

  useEffect(() => {
    setLocalMin(minValue);
    setLocalMax(maxValue);
  }, [minValue, maxValue]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-4 text-black rounded-lg shadow-md w-72">
        <h3 className="text-lg font-semibold text-center mb-3">Price Range</h3>

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col items-center">
            <label className="text-xs">Min</label>
            <Input
              type="number"
              value={localMin}
              onChange={(e) => {
                setLocalMin(e.target.value);
                onMinChange(Number(e.target.value));
              }}
              className="w-16 text-black text-center px-2 py-1 text-sm mt-3"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-xs">Max</label>
            <Input
              type="number"
              value={localMax}
              onChange={(e) => {
                setLocalMax(e.target.value);
                onMaxChange(Number(e.target.value));
              }}
              className="w-16 text-black text-center px-2 py-1 text-sm mt-3"
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button 
            onClick={onApply} 
            className="bg-purple-700 text-white hover:bg-purple-800 font-bold text-sm py-2 px-6"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
