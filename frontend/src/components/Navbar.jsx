import { Link, useLocation } from "react-router-dom";
import { BookOpen } from "lucide-react";

function Navbar() {
  const location = useLocation();

  return (
    // 1. Navbar Base: Slightly lighter dark background (gray-800), increased padding for more breathing room (py-4), and added a subtle border for separation.
    <nav className="bg-gray-800 text-white px-4 md:px-8 py-4 shadow-xl border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition duration-300 transform hover:scale-[1.02]">
          {/* 2. Logo Icon: Slightly larger (w-8 h-8), using a primary blue (blue-500) for better contrast. */}
          <BookOpen className="w-8 h-8 text-blue-500" />
          {/* 3. Logo Text: Stronger font-weight (font-bold) and slightly larger text (text-3xl) for branding emphasis. */}
          <span className="text-3xl font-bold text-blue-500 tracking-tight hidden sm:block">
            NoteTaker
          </span>
        </Link>

        {/* Links */}
        {/* 4. Link Container: Increased space-x for better visual separation. */}
        <div className="flex space-x-6 md:space-x-8">
          <Link
            to="/"
            className={`
              text-lg font-medium tracking-wide
              hover:text-blue-400 hover:scale-105 transition-all duration-300
              ${
                // 5. Active Link Styling: Using 'font-extrabold' and 'border-b-2' for a strong, clear active state.
                location.pathname === "/"
                  ? "text-blue-400 font-extrabold border-b-2 border-blue-400 pb-1"
                  : "text-gray-300"
              }
            `}
          >
            Home
          </Link>
          <Link
            to="/create"
            className={`
              text-lg font-medium tracking-wide
              hover:text-blue-400 hover:scale-105 transition-all duration-300
              ${
                location.pathname === "/create"
                  ? "text-blue-400 font-extrabold border-b-2 border-blue-400 pb-1"
                  : "text-gray-300"
              }
            `}
          >
            Create Note
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;