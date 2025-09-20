import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReportButton = () => {
  const handleReport = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSd2KCXwCCC1wVyOVeoOrsdmrHe-n_ktQvywJ69WCHXMns0PnQ/viewform?usp=dialog", "_blank");
  };

  return (
    <div className="absolute bottom-4 left-4 z-50">
      <Button 
        onClick={handleReport}
        className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        size="lg"
      >
        <AlertTriangle className="h-5 w-5 mr-2" />
        Report
      </Button>
    </div>
  );
};