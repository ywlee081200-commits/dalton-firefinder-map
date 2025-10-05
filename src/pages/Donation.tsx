import { useNavigate } from "react-router-dom";
import { DonationScreen } from "@/components/DonationScreen";

const Index = () => {
  const navigate = useNavigate();

  const handleFloorSelect = (floor: string) => {
    navigate(`/floor/${floor}`);
  };


  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <DonationScreen onFloorSelect={handleFloorSelect} onBackToHome={handleBackToHome}/>
  );
};

export default Index;
