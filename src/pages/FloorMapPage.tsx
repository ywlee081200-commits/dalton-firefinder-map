import { useParams, useNavigate } from "react-router-dom";
import { FloorMap } from "@/components/FloorMap";
import { FloorNumber } from "@/types/SafetyMap";

const FloorMapPage = () => {
  const { floorNumber } = useParams<{ floorNumber: string }>();
  const navigate = useNavigate();

  const handleFloorSelect = (floor: string) => {
    navigate(`/floor/${floor}`);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleDonationPage = () => {
    navigate("/");
  };

  // Validate floor number
  const validFloors: FloorNumber[] = ["1st", "2nd", "3rd", "4th"];
  const currentFloor = floorNumber as FloorNumber;
  
  if (!floorNumber || !validFloors.includes(currentFloor)) {
    navigate("/");
    return null;
  }

  return (
    <FloorMap 
      floor={currentFloor}
      onFloorSelect={handleFloorSelect}
      onBackToHome={handleBackToHome}
    />
  );
};

export default FloorMapPage;