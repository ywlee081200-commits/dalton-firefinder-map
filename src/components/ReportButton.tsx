import { Button } from "@/components/ui/button";

export const ReportButton = () => {
  const handleReport = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSd2KCXwCCC1wVyOVeoOrsdmrHe-n_ktQvywJ69WCHXMns0PnQ/viewform?usp=dialog", "_blank");
  };

  return (
    <div>
      <Button 
        onClick={handleReport}
        className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        Report
      </Button>
    </div>
  );
};