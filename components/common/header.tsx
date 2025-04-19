import NavLink from "./nav-link";
import { FileText }  from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  const isLoggedIn = false;

  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-3  mx-auto">
      <div className="flex lg:flex-1">
        <NavLink className="flex items-center gap-1 lg:gap-2 shrink-0" href="/">
          <FileText className="h-5 w-5 lg:w-7 lg:h-7 hover:rotate-12 transform transition duration-300 ease-in-out" />
          <span className="font-extrabold lg:text-2xl text-gray-900">
            Ray Vibe
          </span>
        </NavLink>
      </div>

      <div className="flex justify-center gap-4 lg:gap-12">
        <NavLink href="/#pricing">Pricing</NavLink>
         { isLoggedIn &&  <NavLink href="/#dashboard">Your Summaries</NavLink>}
      </div>

      <div className="flex justify-end lg:flex-1 ">
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <NavLink href="/#upload">Upload a PDF</NavLink>
            <div>Pro</div>
            <Button>Sign Out</Button>
          </div>
        ) : (
          <div>
            <NavLink href="/signin">Sign In</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
