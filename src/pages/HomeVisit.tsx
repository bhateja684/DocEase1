
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Star, 
  IndianRupee, 
  Heart,
  Check
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/AuthContext";

declare global {
  interface Window {
    google: any;
  }
}

const doctors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialty: "General Physician",
    rating: 4.9,
    reviews: 124,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    availability: ["Monday", "Wednesday", "Friday"],
    price: 1200,
    address: "Lajpat Nagar Medical Center",
    distance: 2.5,
    bio: "Dr. Sharma has over 15 years of experience in family medicine and provides comprehensive care for patients of all ages. She specializes in preventive care, chronic disease management, and women's health."
  },
  {
    id: 2,
    name: "Dr. Vikram Mehta",
    specialty: "Pediatrician",
    rating: 4.8,
    reviews: 98,
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    availability: ["Tuesday", "Thursday", "Saturday"],
    price: 1500,
    address: "Children's Wellness Clinic, Dwarka",
    distance: 3.1,
    bio: "Dr. Mehta is a board-certified pediatrician with a special interest in childhood development, asthma management, and newborn care. He strives to create a comfortable environment for children and their families."
  },
  {
    id: 3,
    name: "Dr. Ananya Patel",
    specialty: "Internal Medicine",
    rating: 4.7,
    reviews: 156,
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    availability: ["Monday", "Tuesday", "Thursday"],
    price: 1300,
    address: "South Delhi Medical Group",
    distance: 1.8,
    bio: "Dr. Patel focuses on adult medicine and provides comprehensive care for complex medical conditions. She emphasizes a holistic approach to healthcare and works closely with patients to develop personalized treatment plans."
  },
  {
    id: 4,
    name: "Dr. Rajiv Singh",
    specialty: "Geriatrician",
    rating: 4.9,
    reviews: 87,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    availability: ["Wednesday", "Friday", "Saturday"],
    price: 1600,
    address: "Senior Care Specialists, Vasant Kunj",
    distance: 4.2,
    bio: "Dr. Singh specializes in the care of elderly patients, with expertise in managing multiple chronic conditions, memory disorders, and maintaining quality of life for seniors. He provides compassionate and comprehensive care."
  },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM"
];

const HomeVisit = () => {
  const { isAuthenticated, user } = useAuth();
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("find-doctor");
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [address, setAddress] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [specialty, setSpecialty] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapLoaded) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBfZ_zvs3SgHfQWOvW2IiUYw4AHif4ivJI&libraries=places`;
      script.defer = true;
      script.async = true;
      script.onload = () => {
        setMapLoaded(true);
        initializeMap();
      };
      document.head.appendChild(script);
    }
  }, [mapLoaded]);

  const initializeMap = () => {
    if (typeof window.google !== 'undefined') {
      const mapElement = document.getElementById("doctor-map");
      if (mapElement) {
        // Center on Delhi, India by default
        const map = new window.google.maps.Map(mapElement, {
          center: { lat: 28.6139, lng: 77.2090 }, // Delhi coordinates
          zoom: 12,
        });

        doctors.forEach(doctor => {
          // Generate random coordinates around Delhi
          const lat = 28.6139 + (Math.random() - 0.5) * 0.05;
          const lng = 77.2090 + (Math.random() - 0.5) * 0.05;
          
          const marker = new window.google.maps.Marker({
            position: { lat, lng },
            map,
            title: doctor.name,
          });
          
          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div style="padding: 8px;">
              <h3 style="margin: 0; font-size: 14px;">${doctor.name}</h3>
              <p style="margin: 4px 0; font-size: 12px;">${doctor.specialty}</p>
              <p style="margin: 4px 0; font-size: 12px;">⭐ ${doctor.rating}</p>
            </div>`
          });
          
          marker.addListener("click", () => {
            infoWindow.open(map, marker);
            setSelectedDoctor(doctor.id);
          });
        });
      }
    }
  };

  const handleSpecialtyChange = (value: string) => {
    setSpecialty(value);
    if (value === "") {
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors(doctors.filter(doctor => doctor.specialty === value));
    }
  };

  const handleDoctorSelect = (doctorId: number) => {
    setSelectedDoctor(doctorId);
    setActiveTab("booking");
    setCurrentStep(1);
  };
  
  const handleContinue = () => {
    if (currentStep === 1) {
      if (!bookingDate || !bookingTime) {
        toast({
          title: "Missing Information",
          description: "Please select both date and time for your appointment.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!address) {
        toast({
          title: "Missing Information",
          description: "Please provide your address for the home visit.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      toast({
        title: "Appointment Confirmed!",
        description: "Your home visit has been scheduled successfully.",
      });
      setCurrentStep(1);
      setSelectedDoctor(null);
      setBookingDate("");
      setBookingTime("");
      setAddress("");
      setSymptoms("");
      setActiveTab("find-doctor");
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">Doctor Home Visits</h1>
            <p className="text-gray-600 mb-8">
              Get medical care at your doorstep with our network of qualified healthcare professionals
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="find-doctor">Find a Doctor</TabsTrigger>
              <TabsTrigger value="booking" disabled={selectedDoctor === null}>
                Book Appointment
              </TabsTrigger>
            </TabsList>
            <TabsContent value="find-doctor">
              <div className="grid md:grid-cols-[1fr_380px] gap-8">
                <div>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Available Doctors for Home Visit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Filter by Specialty
                        </label>
                        <Select value={specialty} onValueChange={handleSpecialtyChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Specialties" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Specialties</SelectItem>
                            <SelectItem value="General Physician">General Physician</SelectItem>
                            <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                            <SelectItem value="Internal Medicine">Internal Medicine</SelectItem>
                            <SelectItem value="Geriatrician">Geriatrician</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        {filteredDoctors.map((doctor) => (
                          <div
                            key={doctor.id}
                            className={`border rounded-lg p-4 transition-colors ${
                              selectedDoctor === doctor.id
                                ? "border-docease-500 bg-docease-50/30"
                                : "border-gray-200 hover:border-docease-200 hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0">
                                <img
                                  src={doctor.image}
                                  alt={doctor.name}
                                  className="h-16 w-16 rounded-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <h3 className="font-semibold text-lg">{doctor.name}</h3>
                                <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                                <div className="flex items-center mt-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                  <span className="text-sm ml-1">
                                    {doctor.rating} ({doctor.reviews} reviews)
                                  </span>
                                </div>
                                <div className="flex items-center mt-1 text-sm text-gray-600">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{doctor.address} ({doctor.distance} km away)</span>
                                </div>
                                <div className="flex items-center mt-1 text-sm text-gray-600">
                                  <IndianRupee className="h-3 w-3 mr-1" />
                                  <span>₹{doctor.price} per visit</span>
                                </div>
                              </div>
                              <div>
                                <Button
                                  className="bg-docease-600 hover:bg-docease-700"
                                  onClick={() => handleDoctorSelect(doctor.id)}
                                >
                                  Select
                                </Button>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-sm text-gray-600">{doctor.bio}</p>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {doctor.availability.map((day) => (
                                <Badge key={day} variant="secondary">
                                  {day}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Doctor Locations in Delhi</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div id="doctor-map" className="h-96 rounded-md bg-gray-100"></div>
                      <div className="mt-4 text-xs text-gray-500">
                        <p>Map shows approximate locations of available doctors in Delhi.</p>
                        <p>Click on a marker to select a doctor.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="booking">
              {selectedDoctor !== null && (
                <div className="max-w-3xl mx-auto">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <img
                          src={doctors.find(d => d.id === selectedDoctor)?.image}
                          alt={doctors.find(d => d.id === selectedDoctor)?.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div>
                          <CardTitle>{doctors.find(d => d.id === selectedDoctor)?.name}</CardTitle>
                          <p className="text-gray-600 text-sm">
                            {doctors.find(d => d.id === selectedDoctor)?.specialty}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <div className="relative mb-8">
                          <div className="flex items-center justify-between mb-4">
                            {[1, 2, 3].map((step) => (
                              <div
                                key={step}
                                className={`flex flex-col items-center relative z-10 ${
                                  step < currentStep
                                    ? "text-docease-600"
                                    : step === currentStep
                                    ? "text-docease-600"
                                    : "text-gray-300"
                                }`}
                              >
                                <div
                                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                                    step < currentStep
                                      ? "bg-docease-600 text-white"
                                      : step === currentStep
                                      ? "bg-white border-2 border-docease-600 text-docease-600"
                                      : "bg-white border-2 border-gray-300 text-gray-300"
                                  }`}
                                >
                                  {step < currentStep ? (
                                    <Check className="h-4 w-4" />
                                  ) : (
                                    step
                                  )}
                                </div>
                                <span
                                  className={`mt-2 text-xs font-medium ${
                                    step <= currentStep ? "text-gray-700" : "text-gray-400"
                                  }`}
                                >
                                  {step === 1
                                    ? "Schedule"
                                    : step === 2
                                    ? "Location"
                                    : "Confirmation"}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="absolute w-full top-4 h-0.5 bg-gray-200">
                            <div
                              className="absolute top-0 h-0.5 bg-docease-600 transition-all duration-300"
                              style={{
                                width: `${((currentStep - 1) / 2) * 100}%`,
                              }}
                            />
                          </div>
                        </div>

                        {currentStep === 1 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                          >
                            <div>
                              <h3 className="text-lg font-medium mb-4">Select Date & Time</h3>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Calendar className="h-4 w-4 inline-block mr-2" />
                                    Preferred Date
                                  </label>
                                  <Input
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    className="w-full"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Clock className="h-4 w-4 inline-block mr-2" />
                                    Preferred Time
                                  </label>
                                  <Select value={bookingTime} onValueChange={setBookingTime}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a time slot" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                          {time}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {currentStep === 2 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                          >
                            <div>
                              <h3 className="text-lg font-medium mb-4">Your Location</h3>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <MapPin className="h-4 w-4 inline-block mr-2" />
                                    Your Address
                                  </label>
                                  <Textarea
                                    placeholder="Enter your complete address for the home visit"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    rows={3}
                                    className="w-full"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Heart className="h-4 w-4 inline-block mr-2" />
                                    Symptoms or Reason for Visit (Optional)
                                  </label>
                                  <Textarea
                                    placeholder="Briefly describe your symptoms or reason for the visit"
                                    value={symptoms}
                                    onChange={(e) => setSymptoms(e.target.value)}
                                    rows={3}
                                    className="w-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {currentStep === 3 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                          >
                            <div>
                              <h3 className="text-lg font-medium mb-4">Appointment Summary</h3>
                              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Doctor</p>
                                    <p className="text-gray-900">
                                      {doctors.find(d => d.id === selectedDoctor)?.name}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Specialty</p>
                                    <p className="text-gray-900">
                                      {doctors.find(d => d.id === selectedDoctor)?.specialty}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Date</p>
                                    <p className="text-gray-900">{new Date(bookingDate).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Time</p>
                                    <p className="text-gray-900">{bookingTime}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-sm font-medium text-gray-500">Location</p>
                                    <p className="text-gray-900">{address}</p>
                                  </div>
                                  {symptoms && (
                                    <div className="col-span-2">
                                      <p className="text-sm font-medium text-gray-500">Symptoms</p>
                                      <p className="text-gray-900">{symptoms}</p>
                                    </div>
                                  )}
                                  <div className="col-span-2">
                                    <p className="text-sm font-medium text-gray-500">Fee</p>
                                    <p className="text-gray-900">
                                      ₹{doctors.find(d => d.id === selectedDoctor)?.price}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-6">
                                <p className="text-sm text-gray-600">
                                  By confirming this appointment, you agree to pay the consultation fee
                                  at the time of the visit. You can cancel or reschedule up to 6 hours
                                  before the appointment without any charges.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <div className="flex justify-between pt-4 border-t">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            if (currentStep > 1) {
                              setCurrentStep(currentStep - 1);
                            } else {
                              setActiveTab("find-doctor");
                            }
                          }}
                        >
                          {currentStep > 1 ? "Back" : "Change Doctor"}
                        </Button>
                        <Button
                          type="button"
                          className="bg-docease-600 hover:bg-docease-700"
                          onClick={handleContinue}
                        >
                          {currentStep < 3 ? "Continue" : "Confirm Appointment"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomeVisit;
