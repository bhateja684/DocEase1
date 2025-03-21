
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
//xwmchmvwhxwc
// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./components/auth/SignIn";
import Appointment from "./pages/Appointment";
import DoctorLocator from "./pages/DoctorLocator";
import Chatbot from "./pages/Chatbot";
import HealthProfile from "./pages/HealthProfile";
import ReportAnalysis from "./pages/ReportAnalysis";
import HomeVisit from "./pages/HomeVisit";
import Insurance from "./pages/Insurance";
import HealthTips from "./pages/HealthTips";
import LanguageSelector from "./pages/LanguageSelector";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/doctors" element={<DoctorLocator />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/health-profile" element={<HealthProfile />} />
              <Route path="/report-analysis" element={<ReportAnalysis />} />
              <Route path="/home-visit" element={<HomeVisit />} />
              <Route path="/insurance" element={<Insurance />} />
              <Route path="/health-tips" element={<HealthTips />} />
              <Route path="/language-selector" element={<LanguageSelector />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
