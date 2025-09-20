import { Shield } from "lucide-react";

interface FireExtinguisherIconProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const FireExtinguisherIcon = ({ size = "md", className = "" }: FireExtinguisherIconProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <Shield 
      className={`fire-extinguisher-icon ${sizeClasses[size]} ${className}`}
      fill="currentColor"
    />
  );
};