
// import { useState, useRef } from "react";
// import { 
//   FileUp, 
//   FileText, 
//   Check, 
//   Loader2, 
//   Camera, 
//   FileImage,
//   Globe
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { toast } from "@/hooks/use-toast";
// import { useAuth } from "@/components/AuthContext";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const ReportAnalysis = () => {
//   const { isAuthenticated, user } = useAuth();
//   const [currentTab, setCurrentTab] = useState("upload");
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [analysisResult, setAnalysisResult] = useState<any>(null);
//   const [language, setLanguage] = useState("en");
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const cameraInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Check file type (PDF or image)
//     const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/heic'];
//     if (!validTypes.includes(file.type)) {
//       toast({
//         title: "Invalid file type",
//         description: "Please upload a PDF or an image file (JPEG, PNG, WEBP, HEIC)",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Check file size (max 10MB)
//     if (file.size > 10 * 1024 * 1024) {
//       toast({
//         title: "File too large",
//         description: "File size must be less than 10MB",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Process the file
//     processFile(file);
//   };

//   const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     processFile(file);
//   };

//   const processFile = async (file: File) => {
//     // Reset previous results
//     setAnalysisResult(null);
//     setIsAnalyzing(true);
//     setProgress(0);

//     // Simulate processing
//     const timer = setInterval(() => {
//       setProgress((oldProgress) => {
//         if (oldProgress >= 100) {
//           clearInterval(timer);
//           return 100;
//         }
//         return oldProgress + 5;
//       });
//     }, 300);

//     // Simulate OCR and AI analysis (in a real app, this would call APIs)
//     try {
//       // Simulate the time it takes to process the file
//       await new Promise(resolve => setTimeout(resolve, 6000));
      
//       let reportType = "";
//       if (file.name.toLowerCase().includes("blood") || Math.random() > 0.7) {
//         reportType = "blood";
//       } else if (file.name.toLowerCase().includes("xray") || Math.random() > 0.5) {
//         reportType = "xray";
//       } else if (file.name.toLowerCase().includes("mri") || Math.random() > 0.3) {
//         reportType = "mri";
//       } else {
//         reportType = "general";
//       }

//       // Mock result based on type
//       const mockResults = {
//         blood: {
//           findings: [
//             { name: "Hemoglobin", value: "13.5 g/dL", status: "normal", description: "Hemoglobin is within the normal range, indicating good oxygen-carrying capacity in your blood." },
//             { name: "White Blood Cells", value: "10.8 K/uL", status: "elevated", description: "White blood cell count is slightly elevated, which may indicate your body is fighting an infection." },
//             { name: "Platelets", value: "250 K/uL", status: "normal", description: "Platelet count is normal, indicating good blood clotting ability." },
//             { name: "Cholesterol", value: "220 mg/dL", status: "elevated", description: "Total cholesterol is slightly elevated. Consider dietary changes and regular exercise." },
//           ],
//           summary: "Your blood work shows generally good health with slight elevations in white blood cell count and cholesterol. The elevated white blood cell count may indicate your body is fighting an infection, but is not at a concerning level. Your cholesterol is slightly above the recommended range.",
//           recommendations: [
//             "Follow up with your doctor in 3 months for another blood test",
//             "Consider reducing saturated fat intake to lower cholesterol",
//             "Stay hydrated and get adequate rest",
//             "Continue regular exercise"
//           ]
//         },
//         xray: {
//           findings: [
//             { name: "Lung Fields", value: "Clear", status: "normal", description: "Your lung fields appear clear, with no visible abnormalities or infiltrates." },
//             { name: "Heart Size", value: "Normal", status: "normal", description: "Heart size is within normal limits with no signs of enlargement." },
//             { name: "Bone Structure", value: "Normal", status: "normal", description: "Bone structure appears normal with no fractures or abnormalities." }
//           ],
//           summary: "Your chest X-ray shows normal, healthy lungs and heart. There are no signs of infection, fluid, or abnormal masses. Bone structures appear normal and healthy.",
//           recommendations: [
//             "No follow-up imaging needed at this time",
//             "Continue routine health maintenance",
//             "Report any new chest pain or breathing difficulties promptly"
//           ]
//         },
//         mri: {
//           findings: [
//             { name: "Brain Tissue", value: "Small lesion detected", status: "abnormal", description: "A small lesion measuring approximately 5mm was detected in the right frontal lobe." },
//             { name: "Ventricles", value: "Normal size", status: "normal", description: "Ventricles are of normal size with no signs of enlargement." },
//             { name: "Blood Vessels", value: "Normal", status: "normal", description: "Blood vessels appear normal with no evidence of aneurysm or malformation." }
//           ],
//           summary: "Your brain MRI shows a small 5mm lesion in the right frontal lobe. While such findings are often incidental and benign, further evaluation is recommended to determine its nature. The remainder of the brain appears normal.",
//           recommendations: [
//             "Follow up with a neurologist within 2 weeks",
//             "Consider a follow-up MRI in 3-6 months",
//             "Monitor for any neurological symptoms such as headaches, vision changes, or coordination issues",
//             "No immediate cause for concern, but proper follow-up is important"
//           ]
//         },
//         general: {
//           findings: [
//             { name: "Key Measurements", value: "Within range", status: "normal", description: "Most values are within normal laboratory ranges." },
//             { name: "Vitamin D", value: "22 ng/mL", status: "low", description: "Vitamin D levels are below recommended values. Supplementation may be beneficial." },
//             { name: "Liver Function", value: "Normal", status: "normal", description: "Liver function tests indicate normal liver health." }
//           ],
//           summary: "Your general health assessment shows good overall health with vitamin D deficiency being the main area of concern. Vitamin D is important for bone health, immune function, and mood regulation.",
//           recommendations: [
//             "Consider taking a vitamin D supplement (consult with doctor for dosage)",
//             "Increase sun exposure (10-15 minutes daily when possible)",
//             "Include more vitamin D rich foods in your diet (fatty fish, egg yolks, fortified foods)",
//             "Retest vitamin D levels in 3 months after supplementation"
//           ]
//         }
//       };

//       // Simulate the result
//       const result = {
//         reportType,
//         analysisDate: new Date().toISOString(),
//         fileName: file.name,
//         fileSize: file.size,
//         result: mockResults[reportType as keyof typeof mockResults],
//         ocrText: "Sample extracted text from your medical report...",
//       };

//       setAnalysisResult(result);
      
//       toast({
//         title: "Analysis Completed",
//         description: "Your medical report has been successfully analyzed.",
//       });
//     } catch (error) {
//       console.error("Error analyzing report:", error);
//       toast({
//         title: "Analysis Failed",
//         description: "There was an error processing your medical report. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsAnalyzing(false);
//       clearInterval(timer);
//       setProgress(100);
//     }
//   };

//   const translateLanguage = (text: string, targetLang: string) => {
//     // In a real app, this would call a translation API
//     if (targetLang === "en") return text;
    
//     // Mock translations for demo purposes
//     const translations: Record<string, Record<string, string>> = {
//       "fr": {
//         "Your blood work shows generally good health": "Votre analyse de sang montre une bonne santé générale",
//         "Consider reducing saturated fat intake": "Envisagez de réduire votre consommation de graisses saturées",
//         "Follow up with your doctor": "Faites un suivi avec votre médecin",
//       },
//       "es": {
//         "Your blood work shows generally good health": "Su análisis de sangre muestra una buena salud general",
//         "Consider reducing saturated fat intake": "Considere reducir la ingesta de grasas saturadas",
//         "Follow up with your doctor": "Haga un seguimiento con su médico",
//       },
//       "de": {
//         "Your blood work shows generally good health": "Ihre Blutuntersuchung zeigt allgemein gute Gesundheit",
//         "Consider reducing saturated fat intake": "Erwägen Sie, die Aufnahme von gesättigten Fetten zu reduzieren",
//         "Follow up with your doctor": "Vereinbaren Sie einen Folgetermin mit Ihrem Arzt",
//       }
//     };
    
//     // Return original text if no translation is available
//     const translationDict = translations[targetLang] || {};
//     for (const [original, translated] of Object.entries(translationDict)) {
//       if (text.includes(original)) {
//         return text.replace(original, translated);
//       }
//     }
    
//     return text;
//   };

//   return (
//     <>
//       <Header />
//       <main className="pt-24 pb-16">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8">
//           <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold mb-2">Medical Report Analysis</h1>
//               <p className="text-gray-600">
//                 Upload your medical reports for AI-powered analysis and easy-to-understand results
//               </p>
//             </div>
            
//             {/* Language Selector */}
//             <div className="mt-4 md:mt-0 flex items-center space-x-2">
//               <Globe className="h-4 w-4 text-gray-500" />
//               <Select value={language} onValueChange={setLanguage}>
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select Language" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="en">English</SelectItem>
//                   <SelectItem value="es">Español</SelectItem>
//                   <SelectItem value="fr">Français</SelectItem>
//                   <SelectItem value="de">Deutsch</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="grid lg:grid-cols-[1fr_400px] gap-8">
//             <div className="order-2 lg:order-1">
//               <Card className="border border-gray-200 shadow-sm overflow-hidden">
//                 <CardHeader>
//                   <CardTitle>Upload Your Medical Report</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
//                     <TabsList className="grid w-full grid-cols-3">
//                       <TabsTrigger value="upload">File Upload</TabsTrigger>
//                       <TabsTrigger value="camera">Camera</TabsTrigger>
//                       <TabsTrigger value="samples">Sample Reports</TabsTrigger>
//                     </TabsList>
//                     <TabsContent value="upload" className="mt-6">
//                       <input
//                         type="file"
//                         ref={fileInputRef}
//                         onChange={handleFileUpload}
//                         className="hidden"
//                         accept=".pdf,.jpg,.jpeg,.png,.webp,.heic"
//                       />
//                       <div 
//                         className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
//                         onClick={() => fileInputRef.current?.click()}
//                       >
//                         <FileUp className="mx-auto h-12 w-12 text-gray-400" />
//                         <h3 className="mt-2 text-sm font-medium text-gray-900">Upload your medical report</h3>
//                         <p className="mt-1 text-xs text-gray-500">
//                           PDF, JPG, PNG, WEBP or HEIC up to 10MB
//                         </p>
//                         <Button 
//                           className="mt-4 bg-docease-600 hover:bg-docease-700"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             fileInputRef.current?.click();
//                           }}
//                         >
//                           Select File
//                         </Button>
//                       </div>
//                     </TabsContent>
//                     <TabsContent value="camera" className="mt-6">
//                       <input
//                         type="file"
//                         ref={cameraInputRef}
//                         onChange={handleCameraCapture}
//                         className="hidden"
//                         accept="image/*"
//                         capture="environment"
//                       />
//                       <div 
//                         className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
//                         onClick={() => cameraInputRef.current?.click()}
//                       >
//                         <Camera className="mx-auto h-12 w-12 text-gray-400" />
//                         <h3 className="mt-2 text-sm font-medium text-gray-900">Take a photo of your report</h3>
//                         <p className="mt-1 text-xs text-gray-500">
//                           Use your device's camera to capture your report
//                         </p>
//                         <Button 
//                           className="mt-4 bg-docease-600 hover:bg-docease-700"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             cameraInputRef.current?.click();
//                           }}
//                         >
//                           Open Camera
//                         </Button>
//                       </div>
//                     </TabsContent>
//                     <TabsContent value="samples" className="mt-6">
//                       <div className="grid grid-cols-2 gap-4">
//                         <div 
//                           className="border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer"
//                           onClick={() => {
//                             // Simulate processing a sample blood test
//                             processFile(new File([""], "sample_blood_test.pdf", { type: "application/pdf" }));
//                           }}
//                         >
//                           <FileText className="mx-auto h-8 w-8 text-docease-600" />
//                           <h3 className="mt-2 text-sm font-medium text-gray-900">Blood Test Sample</h3>
//                         </div>
//                         <div 
//                           className="border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer"
//                           onClick={() => {
//                             // Simulate processing a sample X-ray report
//                             processFile(new File([""], "sample_xray_report.pdf", { type: "application/pdf" }));
//                           }}
//                         >
//                           <FileImage className="mx-auto h-8 w-8 text-docease-600" />
//                           <h3 className="mt-2 text-sm font-medium text-gray-900">X-Ray Report Sample</h3>
//                         </div>
//                         <div 
//                           className="border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer"
//                           onClick={() => {
//                             // Simulate processing a sample MRI report
//                             processFile(new File([""], "sample_mri_report.pdf", { type: "application/pdf" }));
//                           }}
//                         >
//                           <FileImage className="mx-auto h-8 w-8 text-docease-600" />
//                           <h3 className="mt-2 text-sm font-medium text-gray-900">MRI Report Sample</h3>
//                         </div>
//                         <div 
//                           className="border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer"
//                           onClick={() => {
//                             // Simulate processing a sample general report
//                             processFile(new File([""], "sample_general_report.pdf", { type: "application/pdf" }));
//                           }}
//                         >
//                           <FileText className="mx-auto h-8 w-8 text-docease-600" />
//                           <h3 className="mt-2 text-sm font-medium text-gray-900">General Health Report</h3>
//                         </div>
//                       </div>
//                     </TabsContent>
//                   </Tabs>

//                   {isAnalyzing && (
//                     <div className="mt-8 text-center">
//                       <div className="mb-4 flex flex-col items-center">
//                         <Loader2 className="h-8 w-8 animate-spin text-docease-600" />
//                         <p className="mt-2 text-sm text-gray-600">Analyzing your report...</p>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//                         <div 
//                           className="bg-docease-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
//                           style={{ width: `${progress}%` }}
//                         />
//                       </div>
//                       <p className="text-xs text-gray-500">
//                         {progress < 30 && "Extracting text from document..."}
//                         {progress >= 30 && progress < 60 && "Processing medical terminology..."}
//                         {progress >= 60 && progress < 90 && "Analyzing results..."}
//                         {progress >= 90 && "Generating simplified explanation..."}
//                       </p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="order-1 lg:order-2">
//               <AnimatePresence mode="wait">
//                 {!analysisResult && !isAnalyzing && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="bg-docease-50/50 rounded-xl p-6"
//                   >
//                     <div className="text-center">
//                       <FileText className="mx-auto h-12 w-12 text-docease-600/50" />
//                       <h3 className="mt-2 text-lg font-medium text-gray-800">No Report Analyzed Yet</h3>
//                       <p className="mt-1 text-sm text-gray-600">
//                         Upload a medical report or select one of our sample reports to see an analysis
//                       </p>
//                     </div>
//                   </motion.div>
//                 )}

//                 {analysisResult && (
//                   <motion.div
//                     key="results"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Card className="border border-gray-200 shadow-sm overflow-hidden">
//                       <CardHeader className="bg-docease-50/50">
//                         <div className="flex justify-between items-center">
//                           <CardTitle>Analysis Results</CardTitle>
//                           <Badge className="bg-docease-600">
//                             {analysisResult.reportType === "blood" && "Blood Test"}
//                             {analysisResult.reportType === "xray" && "X-Ray Report"}
//                             {analysisResult.reportType === "mri" && "MRI Report"}
//                             {analysisResult.reportType === "general" && "General Report"}
//                           </Badge>
//                         </div>
//                       </CardHeader>
//                       <CardContent className="pt-6">
//                         <div className="space-y-6">
//                           <div>
//                             <h3 className="text-lg font-medium mb-3">Key Findings</h3>
//                             <div className="space-y-3">
//                               {analysisResult.result.findings.map((finding: any, index: number) => (
//                                 <div key={index} className="flex items-start space-x-2 p-3 rounded-lg bg-gray-50">
//                                   <div className={`flex-shrink-0 mt-0.5 rounded-full p-1 ${
//                                     finding.status === 'normal' ? 'bg-green-100 text-green-600' : 
//                                     finding.status === 'elevated' ? 'bg-yellow-100 text-yellow-600' : 
//                                     'bg-red-100 text-red-600'
//                                   }`}>
//                                     {finding.status === 'normal' ? (
//                                       <Check className="h-4 w-4" />
//                                     ) : (
//                                       <span className="block h-4 w-4 text-xs font-bold flex items-center justify-center">!</span>
//                                     )}
//                                   </div>
//                                   <div>
//                                     <div className="flex items-center">
//                                       <h4 className="font-medium text-gray-900">{finding.name}</h4>
//                                       <span className="ml-2 text-sm text-gray-600">{finding.value}</span>
//                                     </div>
//                                     <p className="text-sm text-gray-600 mt-1">
//                                       {translateLanguage(finding.description, language)}
//                                     </p>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>

//                           <div>
//                             <h3 className="text-lg font-medium mb-3">Summary</h3>
//                             <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
//                               {translateLanguage(analysisResult.result.summary, language)}
//                             </p>
//                           </div>

//                           <div>
//                             <h3 className="text-lg font-medium mb-3">Recommendations</h3>
//                             <ul className="space-y-2">
//                               {analysisResult.result.recommendations.map((rec: string, index: number) => (
//                                 <li key={index} className="flex items-start space-x-2">
//                                   <div className="flex-shrink-0 rounded-full mt-0.5 bg-docease-100 p-1">
//                                     <Check className="h-3 w-3 text-docease-600" />
//                                   </div>
//                                   <span className="text-gray-700">
//                                     {translateLanguage(rec, language)}
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>

//                           <div className="text-center pt-2">
//                             <p className="text-xs text-gray-500">
//                               Analysis completed on {new Date(analysisResult.analysisDate).toLocaleString()}
//                             </p>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="mt-4"
//                               onClick={() => setAnalysisResult(null)}
//                             >
//                               Analyze Another Report
//                             </Button>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default ReportAnalysis;



//new 

import React, { useState, useRef } from "react";
import {
    FileUp,
    FileText,
    Check,
    Loader2,
    Camera,
    FileImage,
    Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from 'axios'; // Import axios

const ReportAnalysis = () => {
    const { isAuthenticated, user } = useAuth();
    const [currentTab, setCurrentTab] = useState("upload");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [language, setLanguage] = useState("en");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file type (PDF or image)
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/heic'];
        if (!validTypes.includes(file.type)) {
            toast({
                title: "Invalid file type",
                description: "Please upload a PDF or an image file (JPEG, PNG, WEBP, HEIC)",
                variant: "destructive",
            });
            return;
        }

        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            toast({
                title: "File too large",
                description: "File size must be less than 10MB",
                variant: "destructive",
            });
            return;
        }

        // Process the file
        processFile(file);
    };

    const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        processFile(file);
    };

    const processFile = async (file: File) => {
        // Reset previous results
        setAnalysisResult(null);
        setIsAnalyzing(true);
        setProgress(0);

        // Simulate processing
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return oldProgress + 5;
            });
        }, 300);

        try {
            // Extract text from the file
            let reportText = "";
            if (file.type === 'application/pdf') {
                const pdfData = new Uint8Array(await file.arrayBuffer()); // Correct way to read ArrayBuffer
                const pdfjsLib = await import('pdfjs-dist'); // Dynamically import pdfjs-dist
                
              
                

                pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

                const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
                let fullText = "";
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    
                    fullText += textContent.items.map(item => item.str).join(" ");

                }
                reportText = fullText;

            } else {
                // Implement OCR for image files here (using Tesseract.js or an API)
                reportText = "OCR for images not implemented yet";
            }

            // Call the Flask API to analyze the report
            const response = await axios.post('http://localhost:5000/analyze', { reportText: reportText });
            const result = response.data.result;
            setAnalysisResult(result);
            toast({
                title: "Analysis Completed",
                description: "Your medical report has been successfully analyzed.",
            });
        } catch (error) {
            console.error("Error analyzing report:", error);
            toast({
                title: "Analysis Failed",
                description: "There was an error processing your medical report. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsAnalyzing(false);
            clearInterval(timer);
            setProgress(100);
        }
    };


    const translateLanguage = (text: string, targetLang: string) => {
        // In a real app, this would call a translation API
        if (targetLang === "en") return text;

        // Mock translations for demo purposes
        const translations: Record<string, Record<string, string>> = {
            "fr": {
                "Your blood work shows generally good health": "Votre analyse de sang montre une bonne santé générale",
                "Consider reducing saturated fat intake": "Envisagez de réduire votre consommation de graisses saturées",
                "Follow up with your doctor": "Faites un suivi avec votre médecin",
            },
            "es": {
                "Your blood work shows generally good health": "Su análisis de sangre muestra una buena salud general",
                "Consider reducing saturated fat intake": "Considere reducir la ingesta de grasas saturadas",
                "Follow up with your doctor": "Haga un seguimiento con su médico",
            },
            "de": {
                "Your blood work shows generally good health": "Ihre Blutuntersuchung zeigt allgemein gute Gesundheit",
                "Consider reducing saturated fat intake": "Erwägen Sie, die Aufnahme von gesättigten Fetten zu reduzieren",
                "Follow up with your doctor": "Vereinbaren Sie einen Folgetermin mit Ihrem Arzt",
            }
        };

        // Return original text if no translation is available
        const translationDict = translations[targetLang] || {};
        for (const [original, translated] of Object.entries(translationDict)) {
            if (text.includes(original)) {
                return text.replace(original, translated);
            }
        }

        return text;
    };

    return (
        <>
            <Header />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Medical Report Analysis</h1>
                            <p className="text-gray-600">
                                Upload your medical reports for AI-powered analysis and easy-to-understand results
                            </p>
                        </div>

                        {/* Language Selector */}
                        <div className="mt-4 md:mt-0 flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-gray-500" />
                            <Select value={language} onValueChange={setLanguage}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Español</SelectItem>
                                    <SelectItem value="fr">Français</SelectItem>
                                    <SelectItem value="de">Deutsch</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-[1fr_400px] gap-8">
                        <div className="order-2 lg:order-1">
                            <Card className="border border-gray-200 shadow-sm overflow-hidden">
                                <CardHeader>
                                    <CardTitle>Upload Your Medical Report</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                                        <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="upload">File Upload</TabsTrigger>
                                            <TabsTrigger value="camera">Camera</TabsTrigger>
                                            <TabsTrigger value="samples">Sample Reports</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="upload" className="mt-6">
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileUpload}
                                                className="hidden"
                                                accept=".pdf,.jpg,.jpeg,.png,.webp,.heic"
                                            />
                                            <div
                                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                                                <h3 className="mt-2 text-sm font-medium text-gray-900">Upload your medical report</h3>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    PDF, JPG, PNG, WEBP or HEIC up to 10MB
                                                </p>
                                                <Button
                                                    className="mt-4 bg-docease-600 hover:bg-docease-700"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        fileInputRef.current?.click();
                                                    }}
                                                >
                                                    Select File
                                                </Button>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="camera" className="mt-6">
                                            <input
                                                type="file"
                                                ref={cameraInputRef}
                                                onChange={handleCameraCapture}
                                                className="hidden"
                                                accept="image/*"
                                                capture="environment"
                                            />
                                            <div
                                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                                                onClick={() => cameraInputRef.current?.click()}
                                            >
                                                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                                                <h3 className="mt-2 text-sm font-medium text-gray-900">Take a photo of your report</h3>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Use your device's camera to capture your report
                                                </p>
                                                <Button
                                                    className="mt-4 bg-docease-600 hover:bg-docease-700"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        cameraInputRef.current?.click();
                                                    }}
                                                >
                                                    Open Camera
                                                </Button>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="samples" className="mt-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div
                                                    className="border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                                                    onClick={() => {
                                                        // Simulate processing a sample blood test
                                                        processFile(new File([""], "sample_blood_test.pdf", { type: "application/pdf" }));
                                                    }}
                                                >
                                                    <FileText className="mx-auto h-8 w-8 text-docease-600" />
                                                    <h3 className="mt-2 text-sm font-medium text-gray-900">Blood Test Sample</h3>
                                                </div>
                                                <div
                                                    className="border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                                                    onClick={() => {
                                                        // Simulate processing a sample X-ray report
                                                        processFile(new File([""], "sample_xray_report.pdf", { type: "application/pdf" }));
                                                    }}
                                                >
                                                    <FileImage className="mx-auto h-8 w-8 text-docease-600" />
                                                    <h3 className="mt-2 text-sm font-medium text-gray-900">X-Ray Report Sample</h3>
                                                </div>
                                                <div
                                                    className="border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                                                    onClick={() => {
                                                        // Simulate processing a sample MRI report
                                                        processFile(new File([""], "sample_mri_report.pdf", { type: "application/pdf" }));
                                                    }}
                                                >
                                                    <FileImage className="mx-auto h-8 w-8 text-docease-600" />
                                                    <h3 className="mt-2 text-sm font-medium text-gray-900">MRI Report Sample</h3>
                                                </div>
                                                <div
                                                    className="border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                                                    onClick={() => {
                                                        // Simulate processing a sample general report
                                                        processFile(new File([""], "sample_general_report.pdf", { type: "application/pdf" }));
                                                    }}
                                                >
                                                    <FileText className="mx-auto h-8 w-8 text-docease-600" />
                                                    <h3 className="mt-2 text-sm font-medium text-gray-900">General Health Report</h3>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>

                                    {isAnalyzing && (
                                        <div className="mt-8 text-center">
                                            <div className="mb-4 flex flex-col items-center">
                                                <Loader2 className="h-8 w-8 animate-spin text-docease-600" />
                                                <p className="mt-2 text-sm text-gray-600">Analyzing your report...</p>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                                <div
                                                    className="bg-docease-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {progress < 30 && "Extracting text from document..."}
                                                {progress >= 30 && progress < 60 && "Processing medical terminology..."}
                                                {progress >= 60 && progress < 90 && "Analyzing results..."}
                                                {progress >= 90 && "Generating simplified explanation..."}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div className="order-1 lg:order-2">
                            <AnimatePresence mode="wait">
                                {!analysisResult && !isAnalyzing && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-docease-50/50 rounded-xl p-6"
                                    >
                                        <div className="text-center">
                                            <FileText className="mx-auto h-12 w-12 text-docease-600/50" />
                                            <h3 className="mt-2 text-lg font-medium text-gray-800">No Report Analyzed Yet</h3>
                                            <p className="mt-1 text-sm text-gray-600">
                                                Upload a medical report or select one of our sample reports to see an analysis
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {analysisResult && (
                                    <motion.div
                                        key="results"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card className="border border-gray-200 shadow-sm overflow-hidden">
                                            <CardHeader className="bg-docease-50/50">
                                                <div className="flex justify-between items-center">
                                                    <CardTitle>Analysis Results</CardTitle>
                                                    <Badge className="bg-docease-600">
                                                        {analysisResult.reportType === "blood" && "Blood Test"}
                                                        {analysisResult.reportType === "xray" && "X-Ray Report"}
                                                        {analysisResult.reportType === "mri" && "MRI Report"}
                                                        {analysisResult.reportType === "general" && "General Report"}
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-6">
                                                <div className="space-y-6">
                                                    <div>
                                                        <h3 className="text-lg font-medium mb-3">Key Findings</h3>
                                                        <div className="space-y-3">
                                                            {analysisResult.findings.map((finding: any, index: number) => (
                                                                <div key={index} className="flex items-start space-x-2 p-3 rounded-lg bg-gray-50">
                                                                    <div className={`flex-shrink-0 mt-0.5 rounded-full p-1 ${finding.status === 'normal' ? 'bg-green-100 text-green-600' : finding.status === 'elevated' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                                                                        }`}>
                                                                        {finding.status === 'normal' ? (
                                                                            <Check className="h-4 w-4" />
                                                                        ) : (
                                                                            <span className="block h-4 w-4 text-xs font-bold flex items-center justify-center">!</span>
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <div className="flex items-center">
                                                                            <h4 className="font-medium text-gray-900">{finding.name}</h4>
                                                                            <span className="ml-2 text-sm text-gray-600">{finding.value}</span>
                                                                        </div>
                                                                        <p className="text-sm text-gray-600 mt-1">
                                                                            {translateLanguage(finding.description, language)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-medium mb-3">Summary</h3>
                                                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                                                            {translateLanguage(analysisResult.summary, language)}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-medium mb-3">Recommendations</h3>
                                                        <ul className="space-y-2">
                                                            {analysisResult.recommendations.map((rec: string, index: number) => (
                                                                <li key={index} className="flex items-start space-x-2">
                                                                    <div className="flex-shrink-0 rounded-full mt-0.5 bg-docease-100 p-1">
                                                                        <Check className="h-3 w-3 text-docease-600" />
                                                                    </div>
                                                                    <span className="text-gray-700">
                                                                        {translateLanguage(rec, language)}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div className="text-center pt-2">
                                                        <p className="text-xs text-gray-500">
                                                            Analysis completed on {new Date(analysisResult.analysisDate).toLocaleString()}
                                                        </p>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="mt-4"
                                                            onClick={() => setAnalysisResult(null)}
                                                        >
                                                            Analyze Another Report
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ReportAnalysis;



































// // In your React component (ReportAnalysis.tsx)

// const processFile = async (file: File) => {
//   // ... existing code ...

//   try {
//       // 1. Extract text from the file (PDF or image)
//       const reader = new FileReader();
//       reader.onload = async (event) => {
//           const fileContent = event.target?.result;
//           let reportText = '';

//           if (file.type === 'application/pdf') {
//               const pdfData = new Uint8Array(fileContent as ArrayBuffer);
//               const pdf = await pdfjsLib.getDocument(pdfData).promise;
//               let text = '';
//               for (let i = 1; i <= pdf.numPages; i++) {
//                   const page = await pdf.getPage(i);
//                   const pageText = await page.getTextContent();
//                   text += pageText.items.map(s => s.str).join(' ');
//               }
//               reportText = text;
//           } else {
//               // For images, you'd need to use OCR (Optical Character Recognition)
//               // Implement OCR here using a library like Tesseract.js or an API
//               // (This is a significant undertaking and beyond the scope of this example)
//               reportText = "OCR not implemented in this example.";
//           }

//           // 2. Send the extracted text to the API
//           const response = await axios.post('http://localhost:5000/analyze', { reportText });
//           const prediction = response.data.result;

//           // 3. Use the prediction to generate mock results (for now)
//           let reportType = prediction; // Use the predicted medical condition
//           // ... rest of your code to generate mock results based on reportType ...
//       };

//       if (file.type === 'application/pdf') {
//           reader.readAsArrayBuffer(file);
//       } else {
//           reader.readAsDataURL(file); // Or other appropriate method for images
//       }

//   } catch (error) {
//       console.error("Error analyzing report:", error);
//       toast({
//           title: "Analysis Failed",
//           description: "There was an error processing your medical report. Please try again.",
//           variant: "destructive",
//       });
//   } finally {
//       setIsAnalyzing(false);
//       clearInterval(timer);
//       setProgress(100);
//   }
// };





// import { useState, useRef } from "react";
// import { toast } from "@/hooks/use-toast";
// import axios from "axios";

// const ReportAnalysis1 = () => {
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setIsAnalyzing(true);
//       const response = await axios.post("http://localhost:5000/analyze", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setAnalysisResult(response.data);
//       toast({ title: "Analysis Completed", description: "Your report has been analyzed." });
//     } catch (error) {
//       toast({ title: "Analysis Failed", description: "Error processing the report.", variant: "destructive" });
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Medical Report Analysis</h1>
//       <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf,.jpg,.jpeg,.png" />
//       {isAnalyzing && <p>Analyzing...</p>}
//       {analysisResult && <pre>{JSON.stringify(analysisResult, null, 2)}</pre>}
//     </div>
//   );
// };

// export default ReportAnalysis1;

