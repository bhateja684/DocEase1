
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Check, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳" },
  { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "fa", name: "Persian", nativeName: "فارسی", flag: "🇮🇷" },
];

const LanguageSelector = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    
    // In a real app, we would update the app's language context
    // For this demo, we'll just show a toast
    const language = languages.find(lang => lang.code === langCode);
    
    toast({
      title: "Language Updated",
      description: `Interface language changed to ${language?.name}`,
    });
    
    // In a production environment, this would trigger language changes in the UI
  };

  const handleSave = () => {
    // Save language preference (would be stored in context/localStorage in real app)
    // Navigate back to previous page
    navigate(-1);
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-24"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <div className="inline-flex items-center justify-center p-2 bg-docease-100 rounded-full text-docease-600 mb-4">
              <Globe className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">Select Your Language</h1>
            <p className="text-gray-600 mt-2">
              Choose your preferred language for the application interface
            </p>
          </motion.div>

          <Card>
            <CardContent className="pt-6">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search languages..."
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-docease-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-1">
                  {filteredLanguages.map((language) => (
                    <button
                      key={language.code}
                      className={`w-full flex items-center justify-between p-3 rounded-md transition-colors ${
                        selectedLanguage === language.code
                          ? "bg-docease-50 text-docease-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleLanguageChange(language.code)}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{language.flag}</span>
                        <div className="text-left">
                          <p className="font-medium">{language.name}</p>
                          <p className="text-sm text-gray-500">{language.nativeName}</p>
                        </div>
                      </div>
                      {selectedLanguage === language.code && (
                        <Check className="h-5 w-5 text-docease-600" />
                      )}
                    </button>
                  ))}

                  {filteredLanguages.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No languages found matching "{searchTerm}"
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="mt-6">
                <Button
                  className="w-full bg-docease-600 hover:bg-docease-700"
                  onClick={handleSave}
                >
                  Save Language Preference
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6 text-sm text-gray-500">
            <p>
              Note: This is a demo implementation. In a production environment,
              the full application would be translated based on your selection.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LanguageSelector;
