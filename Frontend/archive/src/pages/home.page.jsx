import ExploreGrid from "@/components/ExploreGrid";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HotelListings from "@/components/HotelListings";

function HomePage() {
  return (
    <main>
      <div className="relative min-h-screen">
        <Hero />
        <img
          src="/assets/hero/hero_1.jpg"
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
      </div>
      <HotelListings />
      <ExploreGrid />
    </main>
  );
}

export default HomePage;
