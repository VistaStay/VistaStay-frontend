import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
<<<<<<< HEAD

function Navigation(p) {

=======
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { SignedIn, SignedOut, SignOutButton, UserButton, useUser } from "@clerk/clerk-react";

function Navigation() {
  //const userSlice =useSelector((state)=>state.user);
  //console.log(userSlice);
  const {user} = useUser();
>>>>>>> test7
  return (
    <nav className="z-10 bg-blue-900 flex  items-center justify-between px-8 text-white py-4">
      <div className="flex items-center space-x-8">
        <a href="/" className="text-2xl font-bold italic font-serif ">
        VistaStay
        </a>
        <div className="hidden md:flex space-x-6">
<<<<<<< HEAD
          <a href={`/`} className="transition-colors">
            Home
          </a>
=======
          <Link to={`/`} className="transition-colors">
            Home
          </Link>
          {/* <Link to={`/hotels/4567`} className="transition-colors">
            Hotels
          </Link> */}
          {user?.publicMetadata?.role === "admin" && <Link to={`/hotels/create`} className="transition-colors">
            Create Hotel
          </Link>}
>>>>>>> test7
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="">
          <Globe className="h-5 w-5 mr-2" />
          EN
        </Button>
<<<<<<< HEAD
        <Button variant="ghost" asChild>
          <a href="/sign-in">Log In</a>
        </Button>
        <Button asChild>
          <a href="/sign-up">Sign Up</a>
        </Button>
        <div>
           <p>{p.name}</p> 
        </div>
=======
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
        {/* <div>
           <p>{userSlice.user.name}</p>
        </div> */}
>>>>>>> test7
      </div>
    </nav>
  );
}

export default Navigation;
