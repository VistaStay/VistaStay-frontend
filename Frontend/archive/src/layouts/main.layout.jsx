import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
