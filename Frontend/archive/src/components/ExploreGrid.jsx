import { Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExploreGrid() {
  return (
    <div className="px-8 py-8 lg:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Top Card */}
          <div className="relative rounded-3xl p-8 h-[300px] flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Explore more to get your comfort zone
                </h2>
                <p className="text-gray-300">Book your perfect stay with us.</p>
              </div>
              <Button
                asChild
                className="bg-white text-black hover:bg-white/90 rounded-full"
              >
                <a href="/booking">
                  Booking Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
            <img
              src="/assets/grid/308797093.jpg"
              alt=""
              className="absolute top-0 left-0 rounded-3xl w-full h-full object-cover -z-10"
            />
          </div>

          {/* Bottom Card */}
          <div className="relative rounded-3xl p-8 h-[300px] flex flex-col justify-end">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                Hotels Available
              </h3>
              <p className="text-5xl font-bold text-white">1,764,980</p>
            </div>
            <img
              src="/assets/grid/215355701.jpg"
              alt=""
              className="absolute top-0 left-0 rounded-3xl w-full h-full object-cover -z-10"
            />
          </div>
        </div>

        {/* Right Column - Large Card */}
        <div className="relative rounded-3xl p-8 min-h-[620px] flex items-center justify-center">
          <div className="max-w-md text-center">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Beyond accommodation, creating memories of a lifetime
            </h2>
          </div>
          <img
            src="/assets/grid/489672294.jpg"
            alt=""
            className="absolute top-0 left-0 rounded-3xl w-full h-full object-cover -z-10"
          />
        </div>
      </div>
    </div>
  );
}
