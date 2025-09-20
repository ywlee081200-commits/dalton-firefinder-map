import { useNavigate } from "react-router-dom";
import { WelcomeScreen } from "@/components/WelcomeScreen";

const Index = () => {
  const navigate = useNavigate();

  const handleFloorSelect = (floor: string) => {
    navigate(`/floor/${floor}`);
  };

  return (
    <WelcomeScreen onFloorSelect={handleFloorSelect} />
  );
};

export default Index;
