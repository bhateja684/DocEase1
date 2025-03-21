
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  MessageCircle, 
  MapPin, 
  Calendar, 
  Phone 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-docease-600 to-docease-400 bg-clip-text text-transparent">
                DocEase
              </span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-xs">
              Connecting you with the healthcare services you need, whenever you need them.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-docease-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-docease-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-docease-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-docease-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/appointment" className="text-gray-600 hover:text-docease-500 transition-colors flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Book Appointments</span>
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-600 hover:text-docease-500 transition-colors flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>Find Doctors</span>
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-gray-600 hover:text-docease-500 transition-colors flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>AI Health Assistant</span>
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-gray-600 hover:text-docease-500 transition-colors flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>Emergency Services</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-docease-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-docease-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-docease-500 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-docease-500 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-docease-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-docease-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="text-gray-600 hover:text-docease-500 transition-colors">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} DocEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
