import { useState } from "react";
import { Navigation } from "./Navigation";
import { ReportButton } from "./ReportButton";
import { RoomInfoPanel } from "./RoomInfoPanel";
import { EditRoomDialog } from "./EditRoomDialog";
import { FloorNumber, RoomData } from "@/types/SafetyMap";
import floor1Image from "@/assets/1.jpg";
import floor2Image from "@/assets/2.jpg";
import floor3Image from "@/assets/3.jpg";
import floor4Image from "@/assets/4.jpg";

interface FloorMapProps {
  floor: FloorNumber;
  onFloorSelect: (floor: string) => void;
  onBackToHome: () => void;
}

export const FloorMap = ({ floor, onFloorSelect, onBackToHome }: FloorMapProps) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [roomsData, setRoomsData] = useState<Record<string, RoomData>>({});

  const floorImages = {
    "1st": floor1Image,
    "2nd": floor2Image,
    "3rd": floor3Image,
    "4th": floor4Image
  };

  // Room positions based on original image coordinates (percentage-based for responsiveness)
  const roomPositions = {
    "2nd": [
      { id: "211", x: 8, y: 45, width: 8, height: 12 },
      { id: "212", x: 8, y: 57, width: 8, height: 12 },
      { id: "213", x: 8, y: 69, width: 8, height: 12 },
      { id: "214", x: 8, y: 81, width: 8, height: 12 },
      { id: "215", x: 8, y: 93, width: 8, height: 12 },
      { id: "216", x: 16, y: 93, width: 8, height: 12 },
      { id: "217", x: 16, y: 81, width: 8, height: 12 },
      { id: "218", x: 16, y: 69, width: 8, height: 12 },
      { id: "Lab1", x: 24, y: 45, width: 12, height: 8 },
      { id: "Lab2", x: 24, y: 53, width: 12, height: 8 },
      { id: "Dalton Hall", x: 16, y: 15, width: 45, height: 28 },
      { id: "Bath", x: 16, y: 45, width: 6, height: 10 },
      { id: "stairs", x: 16, y: 55, width: 6, height: 6 },
      { id: "Office", x: 16, y: 61, width: 6, height: 8 }
    ],
    "1st": [
      { id: "111", x: 8, y: 45, width: 8, height: 12 },
      { id: "112", x: 8, y: 57, width: 8, height: 12 },
      { id: "113", x: 8, y: 69, width: 8, height: 12 },
      { id: "114", x: 8, y: 81, width: 8, height: 12 },
      { id: "115", x: 8, y: 93, width: 8, height: 12 },
      { id: "116", x: 16, y: 93, width: 8, height: 12 },
      { id: "117", x: 16, y: 81, width: 8, height: 12 },
      { id: "118", x: 16, y: 69, width: 8, height: 12 },
      { id: "Kitchen", x: 24, y: 45, width: 15, height: 20 },
      { id: "Dalton Hall", x: 16, y: 15, width: 45, height: 28 },
      { id: "Bath", x: 16, y: 45, width: 6, height: 10 },
      { id: "stairs", x: 16, y: 55, width: 6, height: 6 },
      { id: "Office", x: 16, y: 61, width: 6, height: 8 }
    ],
    "3rd": [
      { id: "311", x: 8, y: 45, width: 8, height: 12 },
      { id: "312", x: 8, y: 57, width: 8, height: 12 },
      { id: "313", x: 8, y: 69, width: 8, height: 12 },
      { id: "314", x: 8, y: 81, width: 8, height: 12 },
      { id: "315", x: 8, y: 93, width: 8, height: 12 },
      { id: "316", x: 16, y: 93, width: 8, height: 12 },
      { id: "317", x: 16, y: 81, width: 8, height: 12 },
      { id: "318", x: 16, y: 69, width: 8, height: 12 },
      { id: "Dalton Hall", x: 16, y: 15, width: 45, height: 28 },
      { id: "Bath", x: 16, y: 45, width: 6, height: 10 },
      { id: "stairs", x: 16, y: 55, width: 6, height: 6 },
      { id: "Office", x: 16, y: 61, width: 6, height: 8 }
    ],
    "4th": [
      { id: "411", x: 8, y: 50, width: 8, height: 12 },
      { id: "412", x: 8, y: 62, width: 8, height: 12 },
      { id: "413", x: 8, y: 74, width: 8, height: 12 },
      { id: "414", x: 8, y: 86, width: 8, height: 12 },
      { id: "415", x: 8, y: 98, width: 8, height: 12 },
      { id: "416", x: 16, y: 98, width: 8, height: 12 },
      { id: "417", x: 16, y: 86, width: 8, height: 12 },
      { id: "418", x: 16, y: 74, width: 8, height: 12 },
      { id: "art room", x: 16, y: 62, width: 8, height: 10 },
      { id: "Bath", x: 16, y: 50, width: 6, height: 10 },
      { id: "stairs", x: 16, y: 35, width: 6, height: 13 },
      { id: "ROOF", x: 16, y: 15, width: 45, height: 18 },
      { id: "ROOF2", x: 16, y: 35, width: 20, height: 13 }
    ]
  };

  const currentRooms = roomPositions[floor] || [];

  const handleRoomClick = (roomId: string) => {
    setEditingRoom(roomId);
    setSelectedRoom(null);
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
      <div className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full min-w-5 h-5 flex items-center justify-center font-bold shadow-md">
        {count}
      </div>
    );
  };

  return (
    <div className="min-h-screen safety-gradient relative overflow-hidden">
      <Navigation onFloorSelect={onFloorSelect} currentFloor={floor} />
      <ReportButton />

      <main className="container mx-auto px-4 py-20 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl relative">
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-primary/10 overflow-hidden relative">
            <div className="w-full relative">
              <img 
                src={floorImages[floor]}
                alt={`${floor} Floor Plan`}
                className="w-full h-auto object-contain max-h-[85vh] select-none"
                style={{ 
                  imageRendering: 'crisp-edges'
                }}
                loading="eager"
                decoding="sync"
              />
              
              {/* Clickable room overlays */}
              <div className="absolute inset-0">
                {currentRooms.map((room) => {
                  const roomData = roomsData[room.id];
                  const extinguisherCount = roomData?.fireExtinguishers?.count || 0;
                  
                  return (
                    <div
                      key={room.id}
                      className="absolute cursor-pointer border-2 border-transparent hover:border-primary/70 hover:bg-primary/10 rounded transition-all duration-200"
                      style={{
                        left: `${room.x}%`,
                        top: `${room.y}%`,
                        width: `${room.width}%`,
                        height: `${room.height}%`
                      }}
                      onClick={() => handleRoomClick(room.id)}
                      title={`Click to edit ${room.id} fire extinguisher data`}
                    >
                      {renderFireExtinguishers(room.id, extinguisherCount)}
                      
                      {/* Room label on hover */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-xs font-bold rounded opacity-0 hover:opacity-100 transition-opacity duration-200">
                        {room.id}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

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

      {/* Room Info Panel */}
      {selectedRoom && roomsData[selectedRoom] && (
        <RoomInfoPanel
          room={roomsData[selectedRoom]}
          onClose={() => setSelectedRoom(null)}
        />
      )}

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