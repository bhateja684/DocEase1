
import { useState, useEffect } from "react";
import { MapPin, Search, Filter, X, Phone, Star, Clock, ChevronDown, ChevronUp, IndianRupee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmergencyButton from "@/components/EmergencyButton";

declare global {
  interface Window {
    google: any;
  }
}

// Mock data for doctors
const doctors = [
  {
    id: 1,
    name: "Dr. Anita Sharma",
    specialty: "Cardiologist",
    location: "Apollo Hospital",
    address: "Sarita Vihar, Delhi",
    distance: "1.2 km",
    rating: 4.8,
    reviews: 127,
    availableToday: true,
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    phone: "011-2345-6789",
    fee: 1200
  },
  {
    id: 2,
    name: "Dr. Rahul Verma",
    specialty: "General Practitioner",
    location: "City Health Clinic",
    address: "Connaught Place, Delhi",
    distance: "0.8 km",
    rating: 4.6,
    reviews: 84,
    availableToday: true,
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    phone: "011-3456-7890",
    fee: 800
  },
  {
    id: 3,
    name: "Dr. Preeti Singh",
    specialty: "Dermatologist",
    location: "Skin & Wellness Center",
    address: "Vasant Kunj, Delhi",
    distance: "2.1 km",
    rating: 4.9,
    reviews: 156,
    availableToday: false,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    phone: "011-4567-8901",
    fee: 1500
  },
  {
    id: 4,
    name: "Dr. Amit Patel",
    specialty: "Neurologist",
    location: "Brain & Spine Institute",
    address: "South Extension, Delhi",
    distance: "1.5 km",
    rating: 4.7,
    reviews: 93,
    availableToday: true,
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    phone: "011-5678-9012",
    fee: 1800
  },
  {
    id: 5,
    name: "Dr. Sanya Kapoor",
    specialty: "Pediatrician",
    location: "Children's Health Center",
    address: "Rajouri Garden, Delhi",
    distance: "1.7 km",
    rating: 4.9,
    reviews: 215,
    availableToday: true,
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    phone: "011-6789-0123",
    fee: 1000
  },
];

// Mock data for facilities
const facilities = [
  {
    id: 1,
    name: "AIIMS Delhi",
    type: "Hospital",
    address: "Ansari Nagar, Delhi",
    distance: "1.2 km",
    rating: 4.4,
    reviews: 327,
    openNow: true,
    services: ["Emergency", "Surgery", "Radiology", "Laboratory"],
    phone: "011-2658-8500",
  },
  {
    id: 2,
    name: "Apollo Pharmacy",
    type: "Pharmacy",
    address: "Lajpat Nagar, Delhi",
    distance: "0.8 km",
    rating: 4.3,
    reviews: 142,
    openNow: true,
    services: ["Prescription Fills", "Vaccinations", "Health Consultations"],
    phone: "011-4321-8765",
  },
  {
    id: 3,
    name: "Max Healthcare",
    type: "Clinic",
    address: "Saket, Delhi",
    distance: "1.5 km",
    rating: 4.6,
    reviews: 89,
    openNow: false,
    services: ["General Medicine", "Vaccinations", "Physical Therapy"],
    phone: "011-2658-7890",
  },
  {
    id: 4,
    name: "Fortis Healthcare",
    type: "Clinic",
    address: "Vasant Kunj, Delhi",
    distance: "2.1 km",
    rating: 4.5,
    reviews: 76,
    openNow: true,
    services: ["Family Medicine", "Pediatrics", "Women's Health"],
    phone: "011-2345-6780",
  },
  {
    id: 5,
    name: "Delhi Urgent Care",
    type: "Urgent Care",
    address: "Karol Bagh, Delhi",
    distance: "0.6 km",
    rating: 4.2,
    reviews: 118,
    openNow: true,
    services: ["Urgent Care", "X-Rays", "Minor Surgeries"],
    phone: "011-8765-4321",
  },
];

const DoctorLocator = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("doctors");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Load Google Maps API
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
      const mapElement = document.getElementById("facility-map");
      if (mapElement && activeTab === "facilities") {
        // Center on Delhi by default
        const map = new window.google.maps.Map(mapElement, {
          center: { lat: 28.6139, lng: 77.2090 }, // Delhi coordinates
          zoom: 12,
        });

        facilities.forEach(facility => {
          // Generate random coordinates around Delhi
          const lat = 28.6139 + (Math.random() - 0.5) * 0.05;
          const lng = 77.2090 + (Math.random() - 0.5) * 0.05;
          
          const marker = new window.google.maps.Marker({
            position: { lat, lng },
            map,
            title: facility.name,
          });
          
          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div style="padding: 8px;">
              <h3 style="margin: 0; font-size: 14px;">${facility.name}</h3>
              <p style="margin: 4px 0; font-size: 12px;">${facility.type}</p>
              <p style="margin: 4px 0; font-size: 12px;">⭐ ${facility.rating}</p>
            </div>`
          });
          
          marker.addListener("click", () => {
            infoWindow.open(map, marker);
            setSelectedFacility(facility);
          });
        });
      }
      
      const docMapElement = document.getElementById("doctor-map");
      if (docMapElement && activeTab === "doctors") {
        // Center on Delhi by default
        const map = new window.google.maps.Map(docMapElement, {
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
            setSelectedDoctor(doctor);
          });
        });
      }
    }
  };
  
  // Refresh map when tab changes
  useEffect(() => {
    if (mapLoaded) {
      setTimeout(() => {
        initializeMap();
      }, 100);
    }
  }, [activeTab, mapLoaded]);

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter facilities based on search term
  const filteredFacilities = facilities.filter(
    (facility) =>
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call
  };

  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Find Medical Services in Delhi</h1>
            <p className="text-gray-600">
              Locate doctors, hospitals, pharmacies, and clinics near you
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search doctors, hospitals, clinics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" type="button" onClick={() => setFiltersVisible(!filtersVisible)} className="whitespace-nowrap">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                    {filtersVisible ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                  </Button>
                  <Button type="submit" className="bg-docease-600 hover:bg-docease-700">
                    Search
                  </Button>
                </div>
              </form>
              
              {filtersVisible && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 animate-fade-in">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="general">General Practitioner</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Facility Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Facilities</SelectItem>
                      <SelectItem value="hospital">Hospital</SelectItem>
                      <SelectItem value="clinic">Clinic</SelectItem>
                      <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="urgent">Urgent Care</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Within 1 km</SelectItem>
                      <SelectItem value="5">Within 5 km</SelectItem>
                      <SelectItem value="10">Within 10 km</SelectItem>
                      <SelectItem value="20">Within 20 km</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Time</SelectItem>
                      <SelectItem value="today">Available Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <Tabs defaultValue="doctors" onValueChange={setActiveTab}>
              <div className="border-b border-gray-200">
                <div className="container mx-auto">
                  <TabsList className="h-auto p-0 bg-transparent">
                    <TabsTrigger
                      value="doctors"
                      className={`py-3 px-6 rounded-none border-b-2 font-medium transition-colors ${
                        activeTab === "doctors"
                          ? "border-docease-600 text-docease-600"
                          : "border-transparent text-gray-600 hover:text-docease-600"
                      }`}
                    >
                      Doctors
                    </TabsTrigger>
                    <TabsTrigger
                      value="facilities"
                      className={`py-3 px-6 rounded-none border-b-2 font-medium transition-colors ${
                        activeTab === "facilities"
                          ? "border-docease-600 text-docease-600"
                          : "border-transparent text-gray-600 hover:text-docease-600"
                      }`}
                    >
                      Facilities
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="doctors" className="mt-0">
                <div className="grid md:grid-cols-[1fr_2fr] h-[600px]">
                  <div className="overflow-y-auto border-r border-gray-200">
                    {filteredDoctors.length > 0 ? (
                      filteredDoctors.map((doctor) => (
                        <div
                          key={doctor.id}
                          className={`p-4 border-b border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 ${
                            selectedDoctor?.id === doctor.id ? "bg-gray-50" : ""
                          }`}
                          onClick={() => setSelectedDoctor(doctor)}
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                            <div className="flex-grow">
                              <h3 className="font-medium">{doctor.name}</h3>
                              <p className="text-sm text-gray-600">{doctor.specialty}</p>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span>{doctor.rating}</span>
                                <span className="mx-1">•</span>
                                <span>{doctor.reviews} reviews</span>
                              </div>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{doctor.distance}</span>
                                {doctor.availableToday && (
                                  <>
                                    <span className="mx-1">•</span>
                                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs">
                                      Available Today
                                    </Badge>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <IndianRupee className="h-4 w-4 mr-1" />
                                <span>₹{doctor.fee}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <p>No doctors found matching your search.</p>
                        <p className="mt-2">Try adjusting your filters or search terms.</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 overflow-y-auto">
                    {selectedDoctor ? (
                      <div className="bg-white rounded-lg border border-gray-200 p-6 m-4">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                          <img
                            src={selectedDoctor.image}
                            alt={selectedDoctor.name}
                            className="h-24 w-24 rounded-full object-cover mx-auto md:mx-0"
                          />
                          <div className="flex-grow text-center md:text-left">
                            <h2 className="text-2xl font-bold mb-1">{selectedDoctor.name}</h2>
                            <p className="text-gray-600 mb-2">{selectedDoctor.specialty}</p>
                            <div className="flex justify-center md:justify-start items-center mb-4">
                              <Star className="h-5 w-5 text-yellow-500 mr-1" />
                              <span className="font-medium">{selectedDoctor.rating}</span>
                              <span className="mx-1 text-gray-400">•</span>
                              <span className="text-gray-600">{selectedDoctor.reviews} reviews</span>
                            </div>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                              <Badge variant="secondary" className="bg-docease-50 text-docease-700 hover:bg-docease-100">
                                Top Rated
                              </Badge>
                              {selectedDoctor.availableToday && (
                                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                  Available Today
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center mt-3 justify-center md:justify-start">
                              <IndianRupee className="h-4 w-4 text-docease-600 mr-1" />
                              <span className="font-medium">₹{selectedDoctor.fee} consultation fee</span>
                            </div>
                          </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Contact & Location</h3>
                            <div className="space-y-3 text-gray-600">
                              <div className="flex items-start gap-2">
                                <MapPin className="h-5 w-5 text-docease-600 mt-0.5" />
                                <div>
                                  <p className="font-medium">{selectedDoctor.location}</p>
                                  <p>{selectedDoctor.address}</p>
                                  <p className="text-sm">{selectedDoctor.distance} away</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-5 w-5 text-docease-600" />
                                <span>{selectedDoctor.phone}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Availability</h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="h-5 w-5 text-docease-600" />
                                <span>Next available: Today, 2:30 PM</span>
                              </div>
                              <div className="grid grid-cols-3 gap-2 mt-2">
                                <Button variant="outline" size="sm" className="text-docease-600">
                                  Today
                                </Button>
                                <Button variant="outline" size="sm">Tomorrow</Button>
                                <Button variant="outline" size="sm">Wed, Jul 14</Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="flex justify-center md:justify-end gap-4">
                          <Button variant="outline" asChild>
                            <a href={`tel:${selectedDoctor.phone}`}>
                              <Phone className="mr-2 h-4 w-4" />
                              Call
                            </a>
                          </Button>
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button className="bg-docease-600 hover:bg-docease-700">
                                Book Appointment
                              </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:max-w-lg">
                              <SheetHeader>
                                <SheetTitle>Book an Appointment</SheetTitle>
                                <SheetDescription>
                                  Select a date and time to schedule your appointment with {selectedDoctor.name}.
                                </SheetDescription>
                              </SheetHeader>
                              
                              {/* Quick appointment booking form would go here */}
                              <div className="py-6">
                                <div className="space-y-4">
                                  <div className="grid grid-cols-3 gap-2">
                                    <Button variant="outline" size="sm" className="text-docease-600 border-docease-200 bg-docease-50">
                                      Today
                                    </Button>
                                    <Button variant="outline" size="sm">Tomorrow</Button>
                                    <Button variant="outline" size="sm">Wed, Jul 14</Button>
                                  </div>
                                  
                                  <div className="border rounded-md p-4">
                                    <h4 className="font-medium mb-3">Available Times</h4>
                                    <div className="grid grid-cols-3 gap-2">
                                      <Button variant="outline" size="sm">9:00 AM</Button>
                                      <Button variant="outline" size="sm" className="text-docease-600 border-docease-200 bg-docease-50">
                                        2:30 PM
                                      </Button>
                                      <Button variant="outline" size="sm">4:15 PM</Button>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium mb-2">Reason for Visit</label>
                                    <Input placeholder="Briefly describe your symptoms or reason" />
                                  </div>
                                  
                                  <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>Consultation Fee:</span>
                                    <span className="font-medium">₹{selectedDoctor.fee}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <SheetFooter>
                                <SheetClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </SheetClose>
                                <Button className="bg-docease-600 hover:bg-docease-700">
                                  Confirm Appointment
                                </Button>
                              </SheetFooter>
                            </SheetContent>
                          </Sheet>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full">
                        <div id="doctor-map" className="h-1/2 w-full"></div>
                        <div className="h-1/2 flex flex-col items-center justify-center text-gray-500 p-6">
                          <MapPin className="h-16 w-16 text-gray-300 mb-4" />
                          <h3 className="text-xl font-medium mb-2">Select a Doctor</h3>
                          <p className="text-center">
                            Click on a doctor from the list or on the map to view their details and book an appointment.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="facilities" className="mt-0">
                <div className="grid md:grid-cols-[1fr_2fr] h-[600px]">
                  <div className="overflow-y-auto border-r border-gray-200">
                    {filteredFacilities.length > 0 ? (
                      filteredFacilities.map((facility) => (
                        <div
                          key={facility.id}
                          className={`p-4 border-b border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 ${
                            selectedFacility?.id === facility.id ? "bg-gray-50" : ""
                          }`}
                          onClick={() => setSelectedFacility(facility)}
                        >
                          <div>
                            <h3 className="font-medium">{facility.name}</h3>
                            <p className="text-sm text-gray-600">{facility.type}</p>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span>{facility.rating}</span>
                              <span className="mx-1">•</span>
                              <span>{facility.reviews} reviews</span>
                            </div>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{facility.distance}</span>
                              {facility.openNow && (
                                <>
                                  <span className="mx-1">•</span>
                                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs">
                                    Open Now
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <p>No facilities found matching your search.</p>
                        <p className="mt-2">Try adjusting your filters or search terms.</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 overflow-y-auto">
                    {selectedFacility ? (
                      <div className="bg-white rounded-lg border border-gray-200 p-6 m-4">
                        <div>
                          <h2 className="text-2xl font-bold mb-1">{selectedFacility.name}</h2>
                          <p className="text-gray-600 mb-2">{selectedFacility.type}</p>
                          <div className="flex items-center mb-4">
                            <Star className="h-5 w-5 text-yellow-500 mr-1" />
                            <span className="font-medium">{selectedFacility.rating}</span>
                            <span className="mx-1 text-gray-400">•</span>
                            <span className="text-gray-600">{selectedFacility.reviews} reviews</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {selectedFacility.openNow ? (
                              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                Open Now
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                Closed
                              </Badge>
                            )}
                            <Badge variant="secondary" className="bg-docease-50 text-docease-700 hover:bg-docease-100">
                              {selectedFacility.type}
                            </Badge>
                          </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Contact & Location</h3>
                            <div className="space-y-3 text-gray-600">
                              <div className="flex items-start gap-2">
                                <MapPin className="h-5 w-5 text-docease-600 mt-0.5" />
                                <div>
                                  <p>{selectedFacility.address}</p>
                                  <p className="text-sm">{selectedFacility.distance} away</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-5 w-5 text-docease-600" />
                                <span>{selectedFacility.phone}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Services</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedFacility.services.map((service, index) => (
                                <Badge key={index} variant="outline" className="bg-gray-50">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="flex justify-center md:justify-end gap-4">
                          <Button variant="outline" asChild>
                            <a href={`tel:${selectedFacility.phone}`}>
                              <Phone className="mr-2 h-4 w-4" />
                              Call
                            </a>
                          </Button>
                          <Button className="bg-docease-600 hover:bg-docease-700">
                            Get Directions
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full">
                        <div id="facility-map" className="h-1/2 w-full"></div>
                        <div className="h-1/2 flex flex-col items-center justify-center text-gray-500 p-6">
                          <MapPin className="h-16 w-16 text-gray-300 mb-4" />
                          <h3 className="text-xl font-medium mb-2">Select a Facility</h3>
                          <p className="text-center">
                            Click on a hospital, clinic, or pharmacy from the list or on the map to view details and services offered.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <EmergencyButton />
      <Footer />
    </>
  );
};

export default DoctorLocator;
