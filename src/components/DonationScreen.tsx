import { Navigation } from "./Navigation.tsx";
import { ReportButton } from "./ReportButton.tsx";
import daltonEntrance from "@/assets/dalton-entrance.jpg";
import { Button } from "@/components/ui/button";

interface DonationScreenProps {
  onFloorSelect: (floor: string) => void;
  onBackToHome: () => void;
}



export const DonationScreen = ({ onFloorSelect, onBackToHome }: DonationScreenProps) => {
  const openPage = () =>{
    window.open("https://incheon.chest.or.kr/bridgelink.do?pBranchCd=005&bhfCode=005&_mid=00_00_00&_murl=L2NhL3NwZWNsbXlzL2luaXRTcGVjbG15c0RldGFpbC5kbz9teXNzcGVjbGVTbj05", "_blank");    
  };


  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${daltonEntrance})` }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10">
        <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl w-full text-center">
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-primary/10 p-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Support 119
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              
            </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div>
                  <p>
                    The Incheon Firefighting Department accepts donations via the program "Miracle of 119". The department aids individuals who suffer from conflagrations, burn victims who lack finantial support, and neighbors in poor situations confronted while missions. ]
                    They accept 119 Korean won daily, summing to a total of 3570 won a month from each donor. You can start supporting through the link below.
                  </p>
                </div> 

                <button
                  onClick={() => openPage()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Donate
                </button>
              
              </div>
           
          </div>


          <div className="gp">
            <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  onClick={onBackToHome}
                  variant="outline"
                  className="bg-card/95 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground shadow-lg"
                > Main
                </Button>
              <ReportButton />              
              <Navigation onFloorSelect={onFloorSelect} />
            </div>
          </div>
        </div>  
        </main>
      </div>
    </div>
  );
};
