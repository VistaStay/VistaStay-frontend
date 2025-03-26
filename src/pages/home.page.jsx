import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HotelListings from "@/components/HotelListings";
import Footer from "@/components/Footer";

const HomePage = () => {

  return (
    <>
      <div className="relative min-h-screen">
      <Hero />
        <img
          src="/assets/hero/hero_1.jpg"
          alt=""
          className="absolute top-0 left-0 w-full h-[800px] object-cover -z-10 brightness-50"
         />
        </div>
      <HotelListings />
      <Footer/>
    </>
  );
};

export default HomePage;
