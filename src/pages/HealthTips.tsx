import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Apple,
  BarChart,
  Brain,
  Moon,
  Zap,
  ArrowRight,
  Bookmark,
  Filter,
  Search,
  X,
  Check
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/components/AuthContext";

const healthTips = [
  {
    id: 1,
    title: "The Benefits of Staying Hydrated",
    category: "nutrition",
    content: "Drinking adequate water daily helps maintain the balance of body fluids, energizes muscles, keeps skin looking good, and helps your kidneys and bowels function properly. Aim for 8 glasses per day and more during exercise or hot weather.",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    readTime: "3 min",
    date: "2023-08-15"
  },
  {
    id: 2,
    title: "Simple Stretches for Office Workers",
    category: "fitness",
    content: "Sitting at a desk all day can cause stiffness and pain. Take a 5-minute break every hour to perform simple stretches like neck rolls, shoulder shrugs, seated spinal twists, and wrist stretches to improve circulation and reduce tension.",
    image: "https://images.unsplash.com/photo-1599447292180-45fd84092ef4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    readTime: "4 min",
    date: "2023-09-02"
  },
  {
    id: 3,
    title: "Understanding Sleep Cycles for Better Rest",
    category: "sleep",
    content: "A complete sleep cycle takes about 90-110 minutes. To wake up feeling refreshed, try planning your sleep in multiples of this duration (e.g., 7.5 hours = 5 cycles). Consistency in sleep and wake times helps regulate your body's internal clock.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    readTime: "5 min",
    date: "2023-09-10"
  },
  {
    id: 4,
    title: "Mindfulness Meditation for Stress Reduction",
    category: "mental",
    content: "Regular mindfulness meditation has been shown to reduce stress, anxiety, and improve focus. Start with just 5 minutes daily, focusing on your breath. When your mind wanders, gently bring attention back to your breathing without judgment.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    readTime: "4 min",
    date: "2023-08-25"
  },
  {
    id: 5,
    title: "Heart-Healthy Eating Patterns",
    category: "nutrition",
    content: "A heart-healthy diet emphasizes fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit salt, sugar, and processed foods. The Mediterranean and DASH diets are particularly beneficial for cardiovascular health and have been well-studied.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    readTime: "6 min",
    date: "2023-09-18"
  },
  {
    id: 6,
    title: "The Importance of Regular Eye Breaks",
    category: "wellness",
    content: "Digital eye strain is common with prolonged screen time. Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for at least 20 seconds. This helps reduce eye fatigue and can prevent headaches associated with screen use.",
    image: "https://images.unsplash.com/photo-1494869042583-f6c911f04b4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    readTime: "3 min",
    date: "2023-08-30"
  },
  {
    id: 7,
    title: "Building a Sustainable Exercise Routine",
    category: "fitness",
    content: "The best exercise routine is one you can maintain consistently. Start with activities you enjoy, set realistic goals, and gradually increase intensity. Aim for at least 150 minutes of moderate activity weekly, spread throughout the week.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    readTime: "5 min",
    date: "2023-09-05"
  },
  {
    id: 8,
    title: "Managing Seasonal Allergies Naturally",
    category: "wellness",
    content: "Natural approaches to seasonal allergies include saline nasal irrigation, local honey consumption, HEPA air filters, and wearing sunglasses outdoors. Tracking pollen counts and keeping windows closed during peak times can also reduce exposure.",
    image: "https://images.unsplash.com/photo-1513315849661-27217d6dc73c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    readTime: "4 min",
    date: "2023-09-22"
  },
  {
    id: 9,
    title: "Improving Your Posture for Back Health",
    category: "fitness",
    content: "Good posture reduces strain on muscles and ligaments, prevents fatigue, and minimizes risk of injury. Keep your shoulders back, stand tall, and align your ears, shoulders, and hips. When sitting, keep feet flat and use appropriate back support.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    readTime: "4 min",
    date: "2023-09-15"
  },
  {
    id: 10,
    title: "Brain-Boosting Foods for Cognitive Health",
    category: "nutrition",
    content: "Foods that support brain health include fatty fish (omega-3s), blueberries (antioxidants), turmeric (curcumin), broccoli (antioxidants), pumpkin seeds (magnesium, zinc), dark chocolate (flavonoids), and nuts (vitamin E). Regular consumption may help maintain cognitive function.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    readTime: "5 min",
    date: "2023-08-20"
  },
  {
    id: 11,
    title: "The Science of Habit Formation",
    category: "mental",
    content: "Creating new habits typically takes 21-66 days, not just 21 days as commonly believed. To form a habit successfully, use implementation intentions (when-then planning), habit stacking (building on existing routines), and environmental design to reduce friction.",
    image: "https://images.unsplash.com/photo-1496449903003-11602a894bf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    readTime: "6 min",
    date: "2023-09-12"
  },
  {
    id: 12,
    title: "Breathing Techniques for Instant Calm",
    category: "mental",
    content: "Controlled breathing can activate the parasympathetic nervous system and reduce stress quickly. Try box breathing (inhale 4 counts, hold 4, exhale 4, hold 4) or 4-7-8 breathing (inhale 4 counts, hold 7, exhale 8) for immediate relaxation effects.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    readTime: "3 min",
    date: "2023-09-08"
  }
];

const personalizedTips = {
  hypertension: [
    "Monitor your blood pressure regularly at home",
    "Limit sodium intake to less than 2,300mg daily",
    "Practice stress reduction techniques daily",
    "Maintain a DASH diet rich in fruits, vegetables, and low-fat dairy"
  ],
  diabetes: [
    "Check blood glucose levels as recommended by your doctor",
    "Time meals consistently throughout the day",
    "Include protein with each meal to stabilize blood sugar",
    "Aim for 30 minutes of activity daily"
  ],
  arthritis: [
    "Apply hot or cold packs before and after activity",
    "Practice range-of-motion exercises daily",
    "Consider aquatic exercises for low-impact movement",
    "Maintain a healthy weight to reduce joint stress"
  ],
  anxiety: [
    "Practice deep breathing for 5 minutes, three times daily",
    "Limit caffeine and alcohol consumption",
    "Maintain a consistent sleep schedule",
    "Try progressive muscle relaxation before bed"
  ],
  general: [
    "Stay hydrated with at least 8 glasses of water daily",
    "Aim for 7-9 hours of quality sleep each night",
    "Include 30 minutes of physical activity most days",
    "Practice mindfulness or meditation regularly"
  ]
};

const HealthTips = () => {
  const { isAuthenticated, user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTips, setFilteredTips] = useState(healthTips);
  const [currentUserCondition, setCurrentUserCondition] = useState("general");
  const [bookmarkedTips, setBookmarkedTips] = useState<number[]>([]);

  useEffect(() => {
    let filtered = [...healthTips];
    
    if (activeCategory !== "all") {
      filtered = filtered.filter(tip => tip.category === activeCategory);
    }
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tip => 
        tip.title.toLowerCase().includes(query) || 
        tip.content.toLowerCase().includes(query)
      );
    }
    
    setFilteredTips(filtered);
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    if (isAuthenticated && user?.healthProfile?.conditions) {
      const conditions = user.healthProfile.conditions;
      if (conditions.includes("Hypertension")) {
        setCurrentUserCondition("hypertension");
      } else if (conditions.includes("Diabetes")) {
        setCurrentUserCondition("diabetes");
      } else if (conditions.includes("Arthritis")) {
        setCurrentUserCondition("arthritis");
      } else if (conditions.includes("Depression/Anxiety")) {
        setCurrentUserCondition("anxiety");
      } else {
        setCurrentUserCondition("general");
      }
    }
  }, [isAuthenticated, user]);

  const toggleBookmark = (tipId: number) => {
    if (bookmarkedTips.includes(tipId)) {
      setBookmarkedTips(bookmarkedTips.filter(id => id !== tipId));
    } else {
      setBookmarkedTips([...bookmarkedTips, tipId]);
    }
  };

  const categoryIcons = {
    nutrition: <Apple className="h-5 w-5" />,
    fitness: <BarChart className="h-5 w-5" />,
    mental: <Brain className="h-5 w-5" />,
    sleep: <Moon className="h-5 w-5" />,
    wellness: <Heart className="h-5 w-5" />,
    all: <Zap className="h-5 w-5" />
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
            <h1 className="text-3xl font-bold mb-2">Health Tips & Wellness Guides</h1>
            <p className="text-gray-600 mb-8">
              Discover expert advice, practical tips, and personalized recommendations for a healthier lifestyle
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <Button
                      variant={activeCategory === "all" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeCategory === "all" ? "bg-docease-600 hover:bg-docease-700" : ""}`}
                      onClick={() => setActiveCategory("all")}
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      All Tips
                    </Button>
                    <Button
                      variant={activeCategory === "nutrition" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeCategory === "nutrition" ? "bg-docease-600 hover:bg-docease-700" : ""}`}
                      onClick={() => setActiveCategory("nutrition")}
                    >
                      <Apple className="mr-2 h-4 w-4" />
                      Nutrition
                    </Button>
                    <Button
                      variant={activeCategory === "fitness" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeCategory === "fitness" ? "bg-docease-600 hover:bg-docease-700" : ""}`}
                      onClick={() => setActiveCategory("fitness")}
                    >
                      <BarChart className="mr-2 h-4 w-4" />
                      Fitness
                    </Button>
                    <Button
                      variant={activeCategory === "mental" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeCategory === "mental" ? "bg-docease-600 hover:bg-docease-700" : ""}`}
                      onClick={() => setActiveCategory("mental")}
                    >
                      <Brain className="mr-2 h-4 w-4" />
                      Mental Health
                    </Button>
                    <Button
                      variant={activeCategory === "sleep" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeCategory === "sleep" ? "bg-docease-600 hover:bg-docease-700" : ""}`}
                      onClick={() => setActiveCategory("sleep")}
                    >
                      <Moon className="mr-2 h-4 w-4" />
                      Sleep
                    </Button>
                    <Button
                      variant={activeCategory === "wellness" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeCategory === "wellness" ? "bg-docease-600 hover:bg-docease-700" : ""}`}
                      onClick={() => setActiveCategory("wellness")}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      General Wellness
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search health tips..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full md:w-64"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Filtered by:</span>
                  <Badge variant="secondary">
                    {activeCategory === "all" ? "All Categories" : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
                  </Badge>
                  {searchQuery && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      "{searchQuery}"
                      <button onClick={() => setSearchQuery("")} className="h-4 w-4 rounded-full inline-flex items-center justify-center hover:bg-gray-200">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              </div>

              {isAuthenticated && (
                <Card className="border-docease-100 bg-docease-50/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Your Personal Health Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Based on your health profile, we recommend focusing on these daily habits:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {personalizedTips[currentUserCondition as keyof typeof personalizedTips].map((tip, index) => (
                        <div key={index} className="flex items-start space-x-2 bg-white p-3 rounded-lg border border-docease-100">
                          <div className="flex-shrink-0 mt-0.5 text-docease-600">
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="text-sm">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Tabs defaultValue="cards" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="cards">Card View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>

                <TabsContent value="cards" className="space-y-0">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTips.map((tip) => (
                      <motion.div
                        key={tip.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: tip.id * 0.05 }}
                      >
                        <Card className="h-full flex flex-col overflow-hidden">
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={tip.image} 
                              alt={tip.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute top-2 right-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className={`rounded-full bg-white/80 backdrop-blur-sm hover:bg-white ${
                                  bookmarkedTips.includes(tip.id) ? "text-docease-600" : "text-gray-600"
                                }`}
                                onClick={() => toggleBookmark(tip.id)}
                              >
                                <Bookmark className={`h-4 w-4 ${bookmarkedTips.includes(tip.id) ? "fill-docease-600" : ""}`} />
                              </Button>
                            </div>
                            <Badge className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white/90">
                              <div className="flex items-center space-x-1">
                                {categoryIcons[tip.category as keyof typeof categoryIcons]}
                                <span className="capitalize">{tip.category}</span>
                              </div>
                            </Badge>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg leading-tight">{tip.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-gray-600 line-clamp-3 text-sm">
                              {tip.content}
                            </p>
                          </CardContent>
                          <CardFooter className="flex justify-between pt-0">
                            <div className="text-xs text-gray-500">
                              {new Date(tip.date).toLocaleDateString()} · {tip.readTime} read
                            </div>
                            <Button variant="ghost" size="sm" className="text-docease-600 p-0 h-auto">
                              Read more
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="list">
                  <Card>
                    <ScrollArea className="h-[800px]">
                      <div className="p-4 space-y-4">
                        {filteredTips.map((tip) => (
                          <motion.div
                            key={tip.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-100">
                              <div className="sm:w-1/4 flex-shrink-0">
                                <img 
                                  src={tip.image} 
                                  alt={tip.title}
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                              </div>
                              <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <Badge className="mb-2">
                                      <div className="flex items-center space-x-1">
                                        {categoryIcons[tip.category as keyof typeof categoryIcons]}
                                        <span className="capitalize">{tip.category}</span>
                                      </div>
                                    </Badge>
                                    <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className={bookmarkedTips.includes(tip.id) ? "text-docease-600" : "text-gray-400"}
                                    onClick={() => toggleBookmark(tip.id)}
                                  >
                                    <Bookmark className={`h-4 w-4 ${bookmarkedTips.includes(tip.id) ? "fill-docease-600" : ""}`} />
                                  </Button>
                                </div>
                                <p className="text-gray-600 line-clamp-2 mb-2 text-sm">
                                  {tip.content}
                                </p>
                                <div className="flex justify-between items-center mt-2">
                                  <div className="text-xs text-gray-500">
                                    {new Date(tip.date).toLocaleDateString()} · {tip.readTime} read
                                  </div>
                                  <Button variant="ghost" size="sm" className="text-docease-600 p-0 h-auto">
                                    Read more
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </Card>
                </TabsContent>
              </Tabs>

              {filteredTips.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No health tips found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HealthTips;
