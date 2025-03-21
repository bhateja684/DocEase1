
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const EmergencyButton = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [calling, setCalling] = useState(false);
  const [callSuccess, setCallSuccess] = useState(false);

  const handleEmergencyCall = () => {
    // Simulate emergency call process
    setCalling(true);
    setTimeout(() => {
      setCalling(false);
      setCallSuccess(true);
      setTimeout(() => {
        setShowDialog(false);
        setCallSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <motion.div
        className="fixed right-6 bottom-24 z-40"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          className="bg-red-500 hover:bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-300"
          onClick={() => setShowDialog(true)}
          whileHover={{ scale: 1.1, backgroundColor: "#dc2626" }} 
          whileTap={{ scale: 0.95 }}
        >
          <PhoneCall className="h-6 w-6" />
        </motion.button>
      </motion.div>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">Emergency Assistance</AlertDialogTitle>
            <AlertDialogDescription>
              Warning: An ambulance will be called to your location. Emergency medical services will be notified. This should only be used in genuine emergencies.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <AnimatePresence>
            {calling && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="my-4 p-4 bg-red-50 rounded-md"
              >
                <div className="flex items-center justify-center space-x-3">
                  <svg className="animate-spin h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-red-600 font-medium">
                    Contacting emergency services...
                  </span>
                </div>
              </motion.div>
            )}
            
            {callSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="my-4 p-4 bg-green-50 rounded-md"
              >
                <div className="flex items-center justify-center space-x-3">
                  <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-600 font-medium">
                    Emergency services notified. Help is on the way!
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={calling || callSuccess}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleEmergencyCall}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              disabled={calling || callSuccess}
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Proceed with Emergency Call
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EmergencyButton;
