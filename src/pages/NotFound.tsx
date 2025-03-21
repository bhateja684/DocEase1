
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="relative mb-8">
            <div className="font-bold text-9xl text-docease-100 opacity-80">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl font-semibold text-docease-700">Page Not Found</div>
            </div>
          </div>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Button asChild className="inline-flex items-center bg-docease-600 hover:bg-docease-700">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Homepage
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
