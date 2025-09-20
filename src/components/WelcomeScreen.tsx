import { Navigation } from "./Navigation";
import { ReportButton } from "./ReportButton";
import csmImage from "@/assets/CSM.jpg";

interface WelcomeScreenProps {
  onFloorSelect: (floor: string) => void;
}

export const WelcomeScreen = ({ onFloorSelect }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen safety-gradient relative overflow-hidden">
      <Navigation onFloorSelect={onFloorSelect} />
      <ReportButton />
      
      <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl w-full">
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-primary/10 overflow-hidden">
            <div className="aspect-[4/3] w-full">
              <img 
                src={csmImage}
                alt="Cheongna Dalton High School Safety Map"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="mt-8 text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Dalton Safety Map
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your comprehensive guide to fire extinguisher locations throughout Cheongna Dalton School. 
              Stay safe and be prepared.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              {["1st", "2nd", "3rd", "4th"].map((floor) => (
                <button
                  key={floor}
                  onClick={() => onFloorSelect(floor)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
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