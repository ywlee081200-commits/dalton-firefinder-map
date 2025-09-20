import { Navigation } from "./Navigation";
import { ReportButton } from "./ReportButton";

interface WelcomeScreenProps {
  onFloorSelect: (floor: string) => void;
}

export const WelcomeScreen = ({ onFloorSelect }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen safety-gradient relative overflow-hidden">
      <Navigation onFloorSelect={onFloorSelect} />
      <ReportButton />
      
      <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl w-full text-center">
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-primary/10 p-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Dalton Safety Map
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Your comprehensive guide to fire extinguisher locations throughout Cheongna Dalton School. 
              Stay safe and be prepared.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {["1st", "2nd", "3rd", "4th"].map((floor) => (
                <button
                  key={floor}
                  onClick={() => onFloorSelect(floor)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {floor} Floor
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};