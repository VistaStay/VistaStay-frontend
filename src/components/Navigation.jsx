import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Link } from "react-router";
function Navigation(p) {

  return (
    <nav className="z-10 bg-blue-900 flex  items-center justify-between px-8 text-white py-4">
      <div className="flex items-center space-x-8">
        <a href="/" className="text-2xl font-bold italic font-serif ">
        VistaStay
        </a>
        <div className="hidden md:flex space-x-6">
          <Link to={`/`} className="transition-colors">
            Home
          </Link>
          <Link to={`/hotels/4567`} className="transition-colors">
            Hotels
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="">
          <Globe className="h-5 w-5 mr-2" />
          EN
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/sign-in">Log In</Link>
        </Button>
        <Button asChild>
          <Link to="/sign-up">Sign Up</Link>
        </Button>
        <div>
           <p>{p.name}</p> 
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
