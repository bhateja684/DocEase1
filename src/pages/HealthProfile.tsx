
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const healthProfileSchema = z.object({
  conditions: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  fitnessLevel: z.string().optional(),
  dietaryRestrictions: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

type HealthProfileFormValues = z.infer<typeof healthProfileSchema>;

const commonConditions = [
  "Hypertension",
  "Diabetes",
  "Asthma",
  "Heart Disease",
  "Arthritis",
  "Depression/Anxiety",
  "Cancer",
  "Thyroid Disorder",
  "Obesity",
  "Other",
];

const dietaryRestrictions = [
  "Vegan",
  "Vegetarian",
  "Gluten-Free",
  "Dairy-Free",
  "Nut Allergy",
  "Low-Carb",
  "Low-Sodium",
  "Halal",
  "Kosher",
  "Other",
];

const HealthProfile = () => {
  const { user, updateHealthProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [customCondition, setCustomCondition] = useState("");
  const [customAllergy, setCustomAllergy] = useState("");
  const [customMedication, setCustomMedication] = useState("");

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/signin");
    return null;
  }

  const form = useForm<HealthProfileFormValues>({
    resolver: zodResolver(healthProfileSchema),
    defaultValues: {
      conditions: user?.healthProfile?.conditions || [],
      allergies: user?.healthProfile?.allergies || [],
      medications: user?.healthProfile?.medications || [],
      fitnessLevel: user?.healthProfile?.preferences?.fitnessLevel || "moderate",
      dietaryRestrictions: user?.healthProfile?.preferences?.dietaryRestrictions || [],
      notes: "",
    },
  });

  const onSubmit = async (data: HealthProfileFormValues) => {
    try {
      await updateHealthProfile({
        conditions: data.conditions,
        allergies: data.allergies,
        medications: data.medications,
        preferences: {
          dietaryRestrictions: data.dietaryRestrictions,
          fitnessLevel: data.fitnessLevel,
        },
        notes: data.notes,
      });
      
      toast({
        title: "Profile Updated",
        description: "Your health profile has been saved successfully.",
      });
      
      // Redirect to home or dashboard
      navigate("/");
    } catch (error) {
      console.error("Error saving health profile:", error);
      toast({
        title: "Error",
        description: "Failed to save your health profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addCustomCondition = () => {
    if (!customCondition.trim()) return;
    
    const currentConditions = form.getValues("conditions") || [];
    if (!currentConditions.includes(customCondition)) {
      form.setValue("conditions", [...currentConditions, customCondition]);
    }
    setCustomCondition("");
  };

  const addCustomAllergy = () => {
    if (!customAllergy.trim()) return;
    
    const currentAllergies = form.getValues("allergies") || [];
    if (!currentAllergies.includes(customAllergy)) {
      form.setValue("allergies", [...currentAllergies, customAllergy]);
    }
    setCustomAllergy("");
  };

  const addCustomMedication = () => {
    if (!customMedication.trim()) return;
    
    const currentMedications = form.getValues("medications") || [];
    if (!currentMedications.includes(customMedication)) {
      form.setValue("medications", [...currentMedications, customMedication]);
    }
    setCustomMedication("");
  };

  const removeCondition = (condition: string) => {
    const currentConditions = form.getValues("conditions") || [];
    form.setValue(
      "conditions",
      currentConditions.filter((c) => c !== condition)
    );
  };

  const removeAllergy = (allergy: string) => {
    const currentAllergies = form.getValues("allergies") || [];
    form.setValue(
      "allergies",
      currentAllergies.filter((a) => a !== allergy)
    );
  };

  const removeMedication = (medication: string) => {
    const currentMedications = form.getValues("medications") || [];
    form.setValue(
      "medications",
      currentMedications.filter((m) => m !== medication)
    );
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container max-w-3xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">Health Profile</h1>
            <p className="text-gray-600 mb-8">
              Complete your health profile to get personalized recommendations and care
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                  {/* Health Conditions */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Health Conditions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      {commonConditions.map((condition) => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox
                            id={`condition-${condition}`}
                            checked={form.getValues("conditions")?.includes(condition)}
                            onCheckedChange={(checked) => {
                              const currentConditions = form.getValues("conditions") || [];
                              if (checked) {
                                form.setValue("conditions", [...currentConditions, condition]);
                              } else {
                                form.setValue(
                                  "conditions",
                                  currentConditions.filter((c) => c !== condition)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor={`condition-${condition}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {condition}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {form.getValues("conditions")?.map((condition) => (
                        !commonConditions.includes(condition) && (
                          <Badge key={condition} variant="secondary" className="pl-2 pr-1 py-1">
                            {condition}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 ml-1"
                              onClick={() => removeCondition(condition)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        )
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Add another condition"
                        value={customCondition}
                        onChange={(e) => setCustomCondition(e.target.value)}
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addCustomCondition}
                        disabled={!customCondition.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Allergies */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Allergies</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {form.getValues("allergies")?.map((allergy) => (
                        <Badge key={allergy} variant="secondary" className="pl-2 pr-1 py-1">
                          {allergy}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1"
                            onClick={() => removeAllergy(allergy)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Add an allergy"
                        value={customAllergy}
                        onChange={(e) => setCustomAllergy(e.target.value)}
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addCustomAllergy}
                        disabled={!customAllergy.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Medications */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Current Medications</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {form.getValues("medications")?.map((medication) => (
                        <Badge key={medication} variant="secondary" className="pl-2 pr-1 py-1">
                          {medication}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1"
                            onClick={() => removeMedication(medication)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Add a medication"
                        value={customMedication}
                        onChange={(e) => setCustomMedication(e.target.value)}
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addCustomMedication}
                        disabled={!customMedication.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Fitness Level */}
                  <FormField
                    control={form.control}
                    name="fitnessLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fitness Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select fitness level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sedentary">Sedentary</SelectItem>
                            <SelectItem value="light">Light Activity</SelectItem>
                            <SelectItem value="moderate">Moderately Active</SelectItem>
                            <SelectItem value="active">Very Active</SelectItem>
                            <SelectItem value="athletic">Athletic</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This helps us recommend appropriate exercise routines.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Dietary Restrictions */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Dietary Restrictions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {dietaryRestrictions.map((restriction) => (
                        <div key={restriction} className="flex items-center space-x-2">
                          <Checkbox
                            id={`diet-${restriction}`}
                            checked={form.getValues("dietaryRestrictions")?.includes(restriction)}
                            onCheckedChange={(checked) => {
                              const currentRestrictions = form.getValues("dietaryRestrictions") || [];
                              if (checked) {
                                form.setValue("dietaryRestrictions", [...currentRestrictions, restriction]);
                              } else {
                                form.setValue(
                                  "dietaryRestrictions",
                                  currentRestrictions.filter((r) => r !== restriction)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor={`diet-${restriction}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {restriction}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any other health information you would like to share..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is optional. You can add any other relevant health information.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => navigate("/")}>
                    Skip for Now
                  </Button>
                  <Button type="submit" className="bg-docease-600 hover:bg-docease-700">
                    Save Profile
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HealthProfile;
