import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, 
  MapPin, 
  MessageCircle, 
  Menu, 
  X, 
  User,
  LogOut,
  FileText,
  Heart,
  Globe,
  Home,
  Shield,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when location changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Navigation items with icons and tooltips
  const navItems = [
    { path: "/", icon: <Home className="w-5 h-5" />, label: "Home" },
    { path: "/appointment", icon: <Calendar className="w-5 h-5" />, label: "Appointments" },
    { path: "/doctors", icon: <MapPin className="w-5 h-5" />, label: "Find Doctors" },
    { path: "/report-analysis", icon: <FileText className="w-5 h-5" />, label: "Medical Reports" },
    { path: "/insurance", icon: <Shield className="w-5 h-5" />, label: "Insurance" },
    { path: "/health-tips", icon: <Heart className="w-5 h-5" />, label: "Health Tips" },
    { path: "/chatbot", icon: <MessageCircle className="w-5 h-5" />, label: "AI Health Assistant" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-docease-600 to-docease-400 bg-clip-text text-transparent">
              DocEase
            </span>
            {/* <span className="text-xs font-light text-gray-600 hidden sm:inline">Because Every Second Counts</span> */}
          </Link>

          {/* Desktop Navigation - Icons Only with Hover Labels */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`p-2 rounded-md transition-colors relative group ${
                  isActive(item.path)
                    ? "text-docease-600 bg-docease-50"
                    : "text-gray-700 hover:text-docease-600 hover:bg-docease-50"
                }`}
              >
                {item.icon}
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-docease-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-docease-600" />
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={signOut}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
                <Link to="/language-selector">
                  <Button variant="ghost" size="icon" className="text-gray-600">
                    <Globe className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/signin">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/language-selector">
                  <Button variant="ghost" size="icon" className="text-gray-600">
                    <Globe className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-docease-600 hover:bg-docease-50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
                  isActive(item.path)
                    ? "text-docease-600 bg-docease-50"
                    : "text-gray-700 hover:text-docease-600 hover:bg-docease-50"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            
            <div className="flex items-center space-x-2 px-3 py-2">
              <Globe className="w-4 h-4 text-gray-600" />
              <Link to="/language-selector" className="text-gray-700 hover:text-docease-600">
                Change Language
              </Link>
            </div>
            
            <div className="pt-2 border-t border-gray-100">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-docease-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-docease-600" />
                    </div>
                    <span className="text-sm font-medium">{user?.name}</span>
                  </div>
                  <button
                    onClick={signOut}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="block px-3 py-2 rounded-md text-base font-medium text-docease-600 hover:bg-docease-50 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
