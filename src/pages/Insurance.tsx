
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Heart,
  Users,
  Home,
  DollarSign,
  Stethoscope,
  ArrowRight,
  Check,
  Leaf,
  Smile,
  Search,
  AlertCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthContext";

// Sample insurance plans
const insurancePlans = [
  {
    id: 1,
    name: "Essential Care",
    provider: "HealthGuard",
    monthlyPremium: 175,
    coverage: "Basic",
    deductible: 2500,
    outOfPocketMax: 8000,
    features: [
      "Primary care visits covered at 70% after deductible",
      "Generic prescription coverage",
      "Emergency care at in-network facilities",
      "Preventive care 100% covered"
    ],
    bestFor: ["Healthy individuals", "Budget-conscious", "Young adults"],
    logo: "https://placehold.co/80x40/4299e1/white?text=HealthGuard"
  },
  {
    id: 2,
    name: "Comprehensive Plus",
    provider: "MediCare Partners",
    monthlyPremium: 285,
    coverage: "Comprehensive",
    deductible: 1500,
    outOfPocketMax: 5000,
    features: [
      "Primary and specialty care covered at 80% after deductible",
      "Generic and brand-name prescription coverage",
      "Emergency care at all facilities",
      "Preventive care 100% covered",
      "Mental health services included",
      "Maternity care covered"
    ],
    bestFor: ["Families", "Individuals with ongoing health needs", "Planning for pregnancy"],
    logo: "https://placehold.co/80x40/38b2ac/white?text=MediCare"
  },
  {
    id: 3,
    name: "Premium Health",
    provider: "Elite Care",
    monthlyPremium: 420,
    coverage: "Premium",
    deductible: 750,
    outOfPocketMax: 3000,
    features: [
      "Primary and specialty care covered at 90% after deductible",
      "Comprehensive prescription coverage",
      "Emergency care at all facilities",
      "Preventive care 100% covered",
      "Mental health services included",
      "Maternity care covered",
      "Alternative therapies partially covered",
      "Worldwide coverage for emergencies"
    ],
    bestFor: ["Comprehensive coverage seekers", "Chronic condition management", "Frequent travelers"],
    logo: "https://placehold.co/80x40/ed64a6/white?text=EliteCare"
  },
  {
    id: 4,
    name: "Senior Advantage",
    provider: "GoldenLife Insurance",
    monthlyPremium: 250,
    coverage: "Senior-Focused",
    deductible: 1200,
    outOfPocketMax: 4000,
    features: [
      "Primary and specialty care with low copays",
      "Comprehensive prescription coverage with senior discounts",
      "Emergency care at all facilities",
      "Preventive care 100% covered",
      "Vision and dental included",
      "Hearing aids coverage",
      "Home healthcare services"
    ],
    bestFor: ["Seniors over 60", "Medicare supplement", "Retirement planning"],
    logo: "https://placehold.co/80x40/ecc94b/white?text=GoldenLife"
  },
  {
    id: 5,
    name: "Family First",
    provider: "FamilyCare Health",
    monthlyPremium: 340,
    coverage: "Family-Oriented",
    deductible: 1800,
    outOfPocketMax: 6000,
    features: [
      "Primary care with low copays",
      "Pediatric specialists covered at 85%",
      "Comprehensive prescription coverage",
      "Emergency care at all facilities",
      "Preventive care 100% covered",
      "Maternity and newborn care",
      "Pediatric dental and vision included"
    ],
    bestFor: ["Families with children", "Expecting parents", "Multiple dependents"],
    logo: "https://placehold.co/80x40/48bb78/white?text=FamilyCare"
  }
];

// FAQ data
const faqs = [
  {
    question: "What is health insurance and why do I need it?",
    answer: "Health insurance is a contract that requires an insurer to pay some or all of your healthcare costs in exchange for a premium. It's essential because healthcare costs can be extremely high for serious injuries or illnesses, potentially leading to significant financial burden without insurance coverage."
  },
  {
    question: "What's the difference between a premium, deductible, and out-of-pocket maximum?",
    answer: "A premium is the amount you pay for your health insurance every month. A deductible is the amount you pay for covered health care services before your insurance plan starts to pay. An out-of-pocket maximum is the most you have to pay for covered services in a plan year, after which your insurance covers 100% of allowed costs."
  },
  {
    question: "How do I know which health insurance plan is right for me?",
    answer: "The right plan depends on your healthcare needs, budget, and preferences. Consider your expected medical needs, preferred doctors, prescription medications, and budget constraints. Our recommendation tool can help suggest plans based on your specific situation."
  },
  {
    question: "Can I keep my current doctor with a new insurance plan?",
    answer: "It depends on whether your doctor participates in the new insurance plan's network. Before switching plans, check if your preferred healthcare providers are in-network to ensure continued coverage at the highest benefit level."
  },
  {
    question: "What should I do if my insurance claim is denied?",
    answer: "If your claim is denied, first review the explanation of benefits to understand why. Contact your insurance company for clarification, and if you believe the denial was incorrect, you can file an appeal. Most insurance companies have an appeals process outlined in your policy documents."
  }
];

const Insurance = () => {
  const { isAuthenticated, user } = useAuth();
  const [age, setAge] = useState("30-45");
  const [householdSize, setHouseholdSize] = useState("1");
  const [coverageLevel, setCoverageLevel] = useState("standard");
  const [monthlyBudget, setMonthlyBudget] = useState([300]);
  const [healthConditions, setHealthConditions] = useState("none");
  const [filteredPlans, setFilteredPlans] = useState(insurancePlans);
  const [recommendationsGenerated, setRecommendationsGenerated] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const handleGenerateRecommendations = () => {
    // In a real application, this would use more sophisticated criteria
    // For this demo, we'll filter based on the budget slider
    const maxBudget = monthlyBudget[0];
    
    let filtered = insurancePlans.filter(plan => plan.monthlyPremium <= maxBudget);
    
    // Additional filtering logic based on other inputs
    if (age === "60+") {
      // Prioritize senior plans
      filtered = filtered.sort((a, b) => 
        a.name.includes("Senior") ? -1 : b.name.includes("Senior") ? 1 : 0
      );
    }
    
    if (householdSize !== "1") {
      // Prioritize family plans
      filtered = filtered.sort((a, b) => 
        a.name.includes("Family") ? -1 : b.name.includes("Family") ? 1 : 0
      );
    }
    
    if (healthConditions !== "none") {
      // Prioritize comprehensive coverage
      filtered = filtered.sort((a, b) => 
        a.coverage === "Premium" ? -1 : b.coverage === "Premium" ? 1 : 0
      );
    }
    
    if (coverageLevel === "comprehensive") {
      // Filter out basic plans
      filtered = filtered.filter(plan => plan.coverage !== "Basic");
    } else if (coverageLevel === "premium") {
      // Only show premium plans
      filtered = filtered.filter(plan => plan.coverage === "Premium");
    }
    
    setFilteredPlans(filtered.length > 0 ? filtered : insurancePlans);
    setRecommendationsGenerated(true);
    
    toast({
      title: "Recommendations Generated",
      description: `Found ${filtered.length} plans matching your criteria.`,
    });
  };

  const handlePlanSelect = (planId: number) => {
    setSelectedPlan(planId);
    
    toast({
      title: "Plan Selected",
      description: "A representative will contact you to discuss this plan.",
    });
  };

  const handleContactRequest = () => {
    toast({
      title: "Request Submitted",
      description: "Our insurance specialist will contact you soon to discuss options.",
    });
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
            <h1 className="text-3xl font-bold mb-2">Health Insurance Recommendations</h1>
            <p className="text-gray-600 mb-8">
              Find the right health insurance plan for you and your family with personalized recommendations
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Find Your Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Age Range
                    </label>
                    <Select value={age} onValueChange={setAge}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18-29">18-29 years</SelectItem>
                        <SelectItem value="30-45">30-45 years</SelectItem>
                        <SelectItem value="46-59">46-59 years</SelectItem>
                        <SelectItem value="60+">60+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Household Size
                    </label>
                    <Select value={householdSize} onValueChange={setHouseholdSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select household size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Just me</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="3-4">3-4 people</SelectItem>
                        <SelectItem value="5+">5+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Coverage Level
                    </label>
                    <Select value={coverageLevel} onValueChange={setCoverageLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select coverage level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic Coverage</SelectItem>
                        <SelectItem value="standard">Standard Coverage</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive Coverage</SelectItem>
                        <SelectItem value="premium">Premium Coverage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Budget (Up to ${monthlyBudget[0]})
                    </label>
                    <Slider
                      value={monthlyBudget}
                      onValueChange={setMonthlyBudget}
                      max={600}
                      step={10}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>$100</span>
                      <span>$300</span>
                      <span>$600</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Health Conditions
                    </label>
                    <Select value={healthConditions} onValueChange={setHealthConditions}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select health status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No chronic conditions</SelectItem>
                        <SelectItem value="managed">Managed conditions</SelectItem>
                        <SelectItem value="chronic">Chronic conditions requiring regular care</SelectItem>
                        <SelectItem value="complex">Complex health needs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    className="w-full bg-docease-600 hover:bg-docease-700 mt-4"
                    onClick={handleGenerateRecommendations}
                  >
                    Generate Recommendations
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Our insurance specialists can help you navigate your options and find the best plan for your needs.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleContactRequest}
                  >
                    Request a Consultation
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {!recommendationsGenerated ? (
                <div className="bg-gray-50 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center">
                  <Search className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-800 mb-2">Find Your Perfect Health Insurance Plan</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Complete your preferences on the left to get personalized insurance recommendations tailored to your needs.
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Recommended Plans for You</h2>
                  <div className="space-y-6">
                    {filteredPlans.length > 0 ? (
                      filteredPlans.map((plan) => (
                        <motion.div
                          key={plan.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: plan.id * 0.1 }}
                        >
                          <Card className={`border overflow-hidden ${selectedPlan === plan.id ? 'border-docease-500 ring-1 ring-docease-500' : 'border-gray-200'}`}>
                            <div className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                  <img src={plan.logo} alt={plan.provider} className="h-10 w-20 object-contain" />
                                  <div>
                                    <h3 className="font-semibold text-lg">{plan.name}</h3>
                                    <p className="text-gray-600 text-sm">{plan.provider}</p>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <div className="text-right">
                                    <p className="text-lg font-bold text-docease-600">${plan.monthlyPremium}/mo</p>
                                    <p className="text-xs text-gray-500">Deductible: ${plan.deductible}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-700 mb-2">Plan Features</h4>
                                  <ul className="space-y-1">
                                    {plan.features.slice(0, 4).map((feature, idx) => (
                                      <li key={idx} className="flex items-start text-sm">
                                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                                        <span className="text-gray-600">{feature}</span>
                                      </li>
                                    ))}
                                    {plan.features.length > 4 && (
                                      <li className="text-sm text-docease-600 pl-6">
                                        +{plan.features.length - 4} more features
                                      </li>
                                    )}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-700 mb-2">Best For</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {plan.bestFor.map((item, idx) => (
                                      <Badge key={idx} variant="secondary" className="font-normal">
                                        {item}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-6 flex justify-between items-center">
                                <p className="text-sm text-gray-600">
                                  Out-of-pocket max: <span className="font-medium">${plan.outOfPocketMax}</span>
                                </p>
                                <Button 
                                  className={selectedPlan === plan.id ? "bg-green-600 hover:bg-green-700" : "bg-docease-600 hover:bg-docease-700"}
                                  onClick={() => handlePlanSelect(plan.id)}
                                >
                                  {selectedPlan === plan.id ? "Selected" : "Choose This Plan"}
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                          <h3 className="font-medium text-yellow-800">No matching plans</h3>
                          <p className="text-sm text-yellow-700 mt-1">
                            We couldn't find plans that match your exact criteria. Try adjusting your preferences or budget.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Insurance FAQ</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Insurance;
