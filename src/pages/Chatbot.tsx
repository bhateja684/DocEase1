
import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, ArrowUp, PlusCircle, Trash, Clock, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmergencyButton from "@/components/EmergencyButton";
import axios from 'axios'
// // #js groq
// const fetchAnswerFromGroq = async (question) => {
//   try {
//     const response = await axios.post(
//       "https://api.groq.com/v1/chat/completions",
//       {
//         model: "groq-llama3-8b-8192", // Choose your model
//         messages: [{ role: "user", content: question }],
//         max_tokens: 200,
//       },
//       {
//         headers: {
//           Authorization: `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`, // Replace with your API key
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error("Error fetching response:", error);
//     return "Sorry, I couldn't fetch a response.";
//   }
// };

// //second addition
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!question.trim()) return;

//   setMessages([...messages, { text: question, sender: "user" }]);
//   setQuestion(""); // Clear input

//   const answer = await fetchAnswerFromGroq(question);

//   setMessages((prevMessages) => [
//     ...prevMessages,
//     { text: answer, sender: "bot" },
//   ]);
// };

// const [messages, setMessages] = useState([]);




interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const suggestedQuestions = [
  "What are the symptoms of the flu?",
  "How can I treat a minor burn at home?",
  "What are the side effects of ibuprofen?",
  "How much water should I drink daily?",
  "What causes headaches?",
  "How to lower high blood pressure naturally?",
  "What vaccines do adults need?",
  "How to manage stress and anxiety?",
];

const Chatbot = () => {
  const { isAuthenticated, user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm your DocEase AI Health Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [conversationHistory, setConversationHistory] = useState<{ title: string; date: Date }[]>([
    { title: "Headache and dizziness", date: new Date(Date.now() - 86400000 * 2) },
    { title: "Allergic reaction symptoms", date: new Date(Date.now() - 86400000 * 5) },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (content?: string) => {
    const messageToSend = content || inputMessage;
    if (!messageToSend.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: messageToSend,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setShowSuggestions(false);
    setIsTyping(true);

    // Simulate API call to AI service
    try {
      // In a real app, we would call the Groq API here
      setTimeout(() => {
        // Generate a response based on the input
        let botResponse = "";
        const lowerCaseMessage = messageToSend.toLowerCase();
        
        if (lowerCaseMessage.includes("headache") || lowerCaseMessage.includes("head pain")) {
          botResponse = "Headaches can be caused by various factors including stress, dehydration, lack of sleep, or eye strain. For mild headaches, you can try rest, hydration, and over-the-counter pain relievers like acetaminophen or ibuprofen. If headaches are severe, persistent, or accompanied by other symptoms, it's best to consult a healthcare professional.";
        } else if (lowerCaseMessage.includes("fever") || lowerCaseMessage.includes("temperature")) {
          botResponse = "A fever is often a sign that your body is fighting an infection. For adults, a temperature above 100.4°F (38°C) is considered a fever. You can manage mild fevers with rest, hydration, and medications like acetaminophen or ibuprofen. If the fever is high (above 103°F or 39.4°C), lasts more than three days, or is accompanied by severe symptoms, seek medical attention.";
        } else if (lowerCaseMessage.includes("cold") || lowerCaseMessage.includes("flu") || lowerCaseMessage.includes("cough")) {
          botResponse = "Common colds and flu are viral infections that affect the respiratory system. Symptoms include coughing, sneezing, sore throat, and sometimes fever. Rest, hydration, and over-the-counter medications can help manage symptoms. Most colds resolve within 7-10 days. If symptoms are severe or persist longer, consider consulting a healthcare provider.";
        } else if (lowerCaseMessage.includes("blood pressure") || lowerCaseMessage.includes("hypertension")) {
          botResponse = "High blood pressure (hypertension) can be managed through lifestyle changes such as maintaining a healthy diet low in sodium, regular exercise, limiting alcohol, not smoking, and stress reduction. Medications may also be prescribed by your doctor. It's important to monitor your blood pressure regularly and follow your healthcare provider's recommendations.";
        } else if (lowerCaseMessage.includes("water") || lowerCaseMessage.includes("hydration")) {
          botResponse = "Adequate hydration is important for overall health. The general recommendation is to drink about 8 cups (64 ounces) of water per day, but individual needs vary based on factors like activity level, climate, and overall health. Signs of dehydration include thirst, dark urine, dry mouth, and fatigue. Listen to your body and drink water throughout the day.";
        } else if (lowerCaseMessage.includes("burn") || lowerCaseMessage.includes("burned")) {
          botResponse = "For minor burns, cool the burn with cool (not cold) running water for 10-15 minutes. Do not apply ice directly to a burn. After cooling, apply a gentle moisturizer or aloe vera gel and cover loosely with a sterile gauze bandage. For severe burns that affect large areas, cause deep tissue damage, or occur on the face, hands, feet, genitals, or major joints, seek immediate medical attention.";
        } else if (lowerCaseMessage.includes("vaccine") || lowerCaseMessage.includes("vaccination")) {
          botResponse = "Adults should stay up-to-date with vaccines including annual flu shots, Td or Tdap boosters every 10 years, and others based on age, health conditions, and lifestyle factors. The CDC provides detailed recommendations for adult vaccination schedules. Consult with your healthcare provider to determine which vaccines are appropriate for you based on your medical history and risk factors.";
        } else if (lowerCaseMessage.includes("stress") || lowerCaseMessage.includes("anxiety")) {
          botResponse = "Managing stress and anxiety can involve various techniques such as regular exercise, adequate sleep, deep breathing exercises, meditation, and mindfulness. Limiting caffeine and alcohol, maintaining a healthy diet, and staying connected with supportive friends and family can also help. If stress or anxiety significantly impacts your daily life, consider seeking help from a mental health professional.";
        } else if (lowerCaseMessage.includes("ibuprofen") || lowerCaseMessage.includes("pain reliever")) {
          botResponse = "Common side effects of ibuprofen include stomach pain, heartburn, nausea, vomiting, headache, dizziness, and mild rash. More serious side effects, which require immediate medical attention, may include allergic reactions, stomach bleeding, kidney problems, or cardiovascular issues. Always take ibuprofen as directed and consult with a healthcare provider if you need to use it for an extended period.";
        } else {
          botResponse = "I understand your question about " + messageToSend.substring(0, 30) + "... While I aim to provide helpful health information, I recommend consulting with a healthcare professional for personalized medical advice. They can provide guidance specific to your individual health situation. Is there anything else I can help you with today?";
        }

        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          content: botResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      const errorMessage: Message = {
        id: `bot-error-${Date.now()}`,
        content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
      
      toast({
        title: "Error",
        description: "Failed to get a response from the AI. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-new",
        content: "Chat cleared. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setShowSuggestions(true);
  };

  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">AI Health Assistant</h1>
            <p className="text-gray-600">
              Ask health-related questions and get instant guidance
            </p>
          </div>

          <div className="grid md:grid-cols-[280px_1fr] gap-6">
            <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold">Conversations</h2>
              </div>
              
              <div className="p-3">
                <Button 
                  variant="outline" 
                  className="w-full mb-3 justify-start text-gray-700" 
                  onClick={clearChat}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Conversation
                </Button>
                
                {conversationHistory.length > 0 ? (
                  <div className="space-y-2">
                    {conversationHistory.map((chat, index) => (
                      <div 
                        key={index}
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors text-sm group"
                      >
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="flex-grow truncate">
                          <div className="font-medium truncate">{chat.title}</div>
                          <div className="text-xs text-gray-500">
                            {chat.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No previous conversations
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="p-4">
                <h3 className="text-sm font-medium mb-2">Disclaimer</h3>
                <p className="text-xs text-gray-500">
                  The AI Health Assistant provides general information only and is not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
              <div className="p-4 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center">
                  <div className="bg-docease-100 p-2 rounded-full mr-3">
                    <Bot className="h-5 w-5 text-docease-600" />
                  </div>
                  <div>
                    <h2 className="font-semibold">DocEase Health Assistant</h2>
                    <p className="text-xs text-gray-500">Powered by GROQ</p>
                  </div>
                  
                  <div className="ml-auto flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 text-gray-500" 
                      onClick={clearChat}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  </div>
                </div>
              </div>
              
              <ScrollArea className="flex-grow p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-docease-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <div className="flex items-start mb-1">
                          {message.sender === "bot" && (
                            <div className="bg-white p-1 rounded-full mr-2">
                              <Bot className="h-4 w-4 text-docease-600" />
                            </div>
                          )}
                          {message.sender === "user" && (
                            <div className="bg-white p-1 rounded-full mr-2 ml-auto">
                              <User className="h-4 w-4 text-docease-600" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <div
                          className={`text-xs mt-1 ${
                            message.sender === "user" ? "text-docease-100" : "text-gray-500"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 rounded-lg p-3 max-w-[80%]">
                        <div className="flex items-center space-x-2">
                          <div className="bg-white p-1 rounded-full">
                            <Bot className="h-4 w-4 text-docease-600" />
                          </div>
                          <div className="flex space-x-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {showSuggestions && messages.length < 3 && (
                <div className="px-4 py-3 border-t border-gray-200">
                  <h3 className="text-sm font-medium mb-2">Suggested Questions</h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors py-1.5"
                        onClick={() => handleSendMessage(question)}
                      >
                        {question}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="p-4 border-t border-gray-200 flex-shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-end gap-2"
                >
                  <div className="relative flex-grow">
                    <Textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your health question..."
                      className="min-h-[60px] resize-none pr-10"
                    />
                    {inputMessage && (
                      <Button
                        type="submit"
                        size="icon"
                        className="absolute bottom-2 right-2 h-6 w-6 rounded-full bg-docease-600 hover:bg-docease-700"
                      >
                        <ArrowUp className="h-3 w-3 text-white" />
                      </Button>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="bg-docease-600 hover:bg-docease-700 h-10"
                    disabled={!inputMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 mt-2">
                  Note: This is a simulated AI assistant for demo purposes. In a production app, this would connect to the GROQ AI API.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <EmergencyButton />
      <Footer />
    </>
  );
};

export default Chatbot;
