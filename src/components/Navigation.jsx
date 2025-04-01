import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Link } from "react-router";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

function Navigation() {
  const {user} = useUser();
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
          {user?.publicMetadata?.role === "admin" && <Link to={`/hotels/create`} className="transition-colors">
            Create Hotel
          </Link>}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <SignedOut>
        <Button variant="ghost" asChild>
          <Link to="/sign-in">Log In</Link>
        </Button>
        <Button asChild>
          <Link to="/sign-up">Sign Up</Link>
        </Button>
        </SignedOut>
        <SignedIn>
          <UserButton/>
          <Button asChild>
            <Link to="/account">My Account</Link>
          </Button>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navigation;
