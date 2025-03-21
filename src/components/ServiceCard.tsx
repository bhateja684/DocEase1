
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

const ServiceCard = ({ icon, title, description, className, delay = 0 }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300",
        className
      )}
    >
      <div className="flex flex-col space-y-4">
        <div className="bg-docease-50 p-3 rounded-xl w-fit">
          <div className="text-docease-600">{icon}</div>
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full text-docease-500 transform scale-150">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
