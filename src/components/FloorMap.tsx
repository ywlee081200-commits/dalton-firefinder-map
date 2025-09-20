import { useState } from "react";
import { Navigation } from "./Navigation";
import { ReportButton } from "./ReportButton";
import { RoomInfoPanel } from "./RoomInfoPanel";
import { EditRoomDialog } from "./EditRoomDialog";
import { InteractiveFloorPlan } from "./InteractiveFloorPlan";
import { FloorNumber, RoomData } from "@/types/SafetyMap";

interface FloorMapProps {
  floor: FloorNumber;
  onFloorSelect: (floor: string) => void;
  onBackToHome: () => void;
}

export const FloorMap = ({ floor, onFloorSelect, onBackToHome }: FloorMapProps) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [roomsData, setRoomsData] = useState<Record<string, RoomData>>({});
  const [isDevMode, setIsDevMode] = useState(false);

  const floorRooms = {
    "1st": ["111", "112", "113", "114", "115", "116", "117", "118", "Dalton Hall", "Kitchen", "Bath", "Office"],
    "2nd": ["211", "212", "213", "214", "215", "216", "217", "218", "Dalton Hall", "Lab1", "Lab2", "Bath", "Office"],
    "3rd": ["311", "312", "313", "314", "315", "316", "317", "318", "Dalton Hall", "Bath", "Office"],
    "4th": ["411", "412", "413", "414", "415", "416", "417", "418", "ROOF", "Bath", "Office"]
  };

  const handleRoomClick = (roomId: string) => {
    if (isDevMode) {
      setEditingRoom(roomId);
    } else {
      setSelectedRoom(selectedRoom === roomId ? null : roomId);
    }
  };

  const handleRoomUpdate = (roomId: string, data: RoomData) => {
    setRoomsData(prev => ({
      ...prev,
      [roomId]: data
    }));
    setEditingRoom(null);
  };

  const renderFireExtinguishers = (roomId: string, count: number) => {
    if (count === 0) return null;
    
    return (
      <div className="absolute -top-2 -right-2 flex flex-wrap gap-1 pointer-events-none">
        {Array.from({ length: Math.min(count, 4) }, (_, i) => (
          <div key={i} className="w-4 h-4 bg-accent rounded-full text-accent-foreground text-xs flex items-center justify-center">
            🧯
          </div>
        ))}
        {count > 4 && (
          <span className="text-xs bg-accent text-accent-foreground rounded-full px-1 font-bold">
            +{count - 4}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen safety-gradient relative overflow-hidden">
      <Navigation onFloorSelect={onFloorSelect} currentFloor={floor} />
      <ReportButton />
      
      {/* Dev Mode Toggle - Hidden in production */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => setIsDevMode(!isDevMode)}
          className={`px-3 py-1 text-xs rounded transition-all duration-300 ${
            isDevMode 
              ? "bg-accent text-accent-foreground" 
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {isDevMode ? "Exit Dev Mode" : "Dev Mode"}
        </button>
      </div>

      <main className="container mx-auto px-4 py-20 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl relative">
          <InteractiveFloorPlan
            floor={floor}
            roomsData={roomsData}
            onRoomClick={handleRoomClick}
            isDevMode={isDevMode}
          />

          <div className="mt-6 text-center">
            <button
              onClick={onBackToHome}
              className="text-primary hover:text-primary/80 underline font-medium"
            >
              ← Back to Main Map
            </button>
          </div>
        </div>
      </main>

      {/* Room Info Panel - now handled by InteractiveFloorPlan */}

      {/* Edit Room Dialog */}
      {editingRoom && (
        <EditRoomDialog
          roomId={editingRoom}
          room={roomsData[editingRoom]}
          onSave={(data) => handleRoomUpdate(editingRoom, data)}
          onClose={() => setEditingRoom(null)}
        />
      )}
    </div>
  );
};