import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const DonationButton = () => {
  const navigate = useNavigate();
  
  const handleReport = () => {
    navigate("/donation");
  };

  return (
    <div >
      <Button 
        onClick={handleReport}
        className="bg-primary backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground shadow-lg"
      >
        Donate
      </Button>
    </div>
  );
};