
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CalendarClock, 
  MapPin, 
  MessageCircle,
  Phone,
  ArrowRight,
  ChevronRight,
  Hospital,
  Pill,
  Heart,
  UserPlus,
  AlertCircle,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import EmergencyButton from "@/components/EmergencyButton";

const services = [
  {
    icon: <CalendarClock className="h-6 w-6" />,
    title: "Book Appointments",
    description: "Schedule appointments with doctors, specialists, and healthcare providers.",
    delay: 0
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Find Medical Services",
    description: "Locate nearby hospitals, clinics, pharmacies, and healthcare facilities.",
    delay: 1
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "AI Health Assistant",
    description: "Get instant medical guidance and answers to your health questions.",
    delay: 2
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Emergency Services",
    description: "Quick access to emergency medical services when you need them most.",
    delay: 3
  },
  {
    icon: <Hospital className="h-6 w-6" />,
    title: "Hospital Information",
    description: "Detailed information about hospitals, their specialties, and services.",
    delay: 4
  },
  {
    icon: <Pill className="h-6 w-6" />,
    title: "Medication Management",
    description: "Track, manage, and get reminders for your medications.",
    delay: 5
  }
];

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-white to-docease-50/50 py-16 md:py-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <svg className="absolute right-0 top-0 opacity-10" width="800" height="800" viewBox="0 0 800 800">
              <path d="M769.2,384C777.6,384,784,390.4,784,398.8C784,407.2,777.6,413.6,769.2,413.6L30.8,413.6C22.4,413.6,16,407.2,16,398.8C16,390.4,22.4,384,30.8,384L769.2,384Z" fill="currentColor" className="text-docease-500" />
              <path d="M400,30.8C408.4,30.8,414.8,37.2,414.8,45.6L414.8,784C414.8,792.4,408.4,798.8,400,798.8C391.6,798.8,385.2,792.4,385.2,784L385.2,45.6C385.2,37.2,391.6,30.8,400,30.8Z" fill="currentColor" className="text-docease-600" />
              <circle cx="398.8" cy="398.8" r="193.2" fill="none" stroke="currentColor" strokeWidth="24" className="text-docease-400" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-docease-600 to-docease-400 bg-clip-text text-transparent">
                  Healthcare Made Simple
                </h1>
                <p className="text-lg text-gray-600 mb-8 md:text-xl max-w-2xl mx-auto">
                  DocEase connects you with healthcare services, doctors, and emergency care—all in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-docease-600 hover:bg-docease-700">
                    <Link to="/appointment">
                      Book Appointment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/chatbot">
                      Talk to AI Assistant
                      <MessageCircle className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-xl max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border border-white/30"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-docease-100 to-docease-50 flex items-center justify-center">
                  <div className="text-center p-8">
                    <svg className="w-24 h-24 mx-auto mb-6 text-docease-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <h2 className="text-2xl md:text-3xl font-semibold text-docease-900">
                      Your Health, Our Priority
                    </h2>
                    <p className="mt-4 text-docease-700">
                      Discover a new way to manage your healthcare needs
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-gray-600">
                Comprehensive healthcare solutions designed for your needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  delay={service.delay}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-docease-50/30 to-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose DocEase?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 flex-shrink-0 bg-docease-100 rounded-full p-1">
                      <Heart className="h-5 w-5 text-docease-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Patient-Centered Care</h3>
                      <p className="text-gray-600 mt-1">
                        Our platform is designed with patients' needs at the forefront, making healthcare accessible and user-friendly.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 flex-shrink-0 bg-docease-100 rounded-full p-1">
                      <UserPlus className="h-5 w-5 text-docease-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Wide Network of Professionals</h3>
                      <p className="text-gray-600 mt-1">
                        Access a vast network of qualified healthcare professionals and specialists in various fields.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 flex-shrink-0 bg-docease-100 rounded-full p-1">
                      <AlertCircle className="h-5 w-5 text-docease-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Emergency Response</h3>
                      <p className="text-gray-600 mt-1">
                        Quick access to emergency services when you need them the most, with just a tap.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 flex-shrink-0 bg-docease-100 rounded-full p-1">
                      <Shield className="h-5 w-5 text-docease-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Data Security & Privacy</h3>
                      <p className="text-gray-600 mt-1">
                        Your health data is secure with end-to-end encryption and strict privacy policies.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-xl bg-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-docease-100 to-docease-50 opacity-30"></div>
                  <div className="relative p-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-full bg-docease-100 flex items-center justify-center">
                          <CalendarClock className="h-6 w-6 text-docease-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold">Upcoming Appointment</h4>
                          <p className="text-gray-500 text-sm">Dr. Sarah Johnson</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">Tomorrow, 10:30 AM</p>
                            <p className="text-xs text-gray-500">General Check-up</p>
                          </div>
                          <Button size="sm" variant="outline">Reschedule</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h4 className="font-semibold mb-4 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-docease-600" />
                        Nearby Facilities
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center py-2 border-b border-gray-100">
                          <div>
                            <p className="font-medium">City Memorial Hospital</p>
                            <p className="text-gray-500 text-sm">1.2 miles away</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </li>
                        <li className="flex justify-between items-center py-2 border-b border-gray-100">
                          <div>
                            <p className="font-medium">MedExpress Pharmacy</p>
                            <p className="text-gray-500 text-sm">0.8 miles away</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </li>
                        <li className="flex justify-between items-center py-2">
                          <div>
                            <p className="font-medium">Family Care Clinic</p>
                            <p className="text-gray-500 text-sm">1.5 miles away</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-docease-100 rounded-full blur-3xl opacity-30 z-0"></div>
                <div className="absolute -top-6 -left-6 h-32 w-32 bg-docease-200 rounded-full blur-3xl opacity-30 z-0"></div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-docease-600 to-docease-700 text-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to take control of your health?</h2>
              <p className="text-docease-100 mb-8 text-lg">
                Join thousands of users who trust DocEase for their healthcare needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="default" className="bg-white text-docease-600 hover:bg-gray-100">
                  <Link to="/signin">
                    Create Free Account
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/doctors">
                    Find Doctors
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <EmergencyButton />
      <Footer />
    </>
  );
};

export default Index;
