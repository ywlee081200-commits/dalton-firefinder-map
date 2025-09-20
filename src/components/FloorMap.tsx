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
      // Left column - rooms 211-215 (precisely positioned)
      { id: "211", x: 8, y: 35, width: 10, height: 8 },
      { id: "212", x: 8, y: 44, width: 10, height: 8 },
      { id: "213", x: 8, y: 53, width: 10, height: 8 },
      { id: "214", x: 8, y: 62, width: 10, height: 8 },
      { id: "215", x: 8, y: 71, width: 10, height: 8 },
      
      // Middle column - rooms 216-218 
      { id: "216", x: 19, y: 71, width: 10, height: 8 },
      { id: "217", x: 19, y: 62, width: 10, height: 8 },
      { id: "218", x: 19, y: 53, width: 10, height: 8 },
      
      // Middle facilities
      { id: "Bath", x: 19, y: 35, width: 8, height: 6 },
      { id: "stairs", x: 19, y: 42, width: 8, height: 4 },
      { id: "Office", x: 19, y: 47, width: 8, height: 5 },
      
      // Lab rooms (right side)
      { id: "Lab1", x: 30, y: 28, width: 14, height: 7 },
      { id: "Lab2", x: 30, y: 36, width: 14, height: 7 },
      
      // Large Dalton Hall at top
      { id: "Dalton Hall", x: 19, y: 8, width: 50, height: 18 }
    ],
    "1st": [
      // Left column - rooms 111-115
      { id: "111", x: 8, y: 35, width: 10, height: 8 },
      { id: "112", x: 8, y: 44, width: 10, height: 8 },
      { id: "113", x: 8, y: 53, width: 10, height: 8 },
      { id: "114", x: 8, y: 62, width: 10, height: 8 },
      { id: "115", x: 8, y: 71, width: 10, height: 8 },
      
      // Middle column - rooms 116-118
      { id: "116", x: 19, y: 71, width: 10, height: 8 },
      { id: "117", x: 19, y: 62, width: 10, height: 8 },
      { id: "118", x: 19, y: 53, width: 10, height: 8 },
      
      // Middle facilities
      { id: "Bath", x: 19, y: 35, width: 8, height: 6 },
      { id: "stairs", x: 19, y: 42, width: 8, height: 4 },
      { id: "Office", x: 19, y: 47, width: 8, height: 5 },
      
      // Kitchen (right side)
      { id: "Kitchen", x: 30, y: 28, width: 18, height: 15 },
      
      // Large Dalton Hall at top
      { id: "Dalton Hall", x: 19, y: 8, width: 50, height: 18 }
    ],
    "3rd": [
      // Left column - rooms 311-315
      { id: "311", x: 8, y: 35, width: 10, height: 8 },
      { id: "312", x: 8, y: 44, width: 10, height: 8 },
      { id: "313", x: 8, y: 53, width: 10, height: 8 },
      { id: "314", x: 8, y: 62, width: 10, height: 8 },
      { id: "315", x: 8, y: 71, width: 10, height: 8 },
      
      // Middle column - rooms 316-318
      { id: "316", x: 19, y: 71, width: 10, height: 8 },
      { id: "317", x: 19, y: 62, width: 10, height: 8 },
      { id: "318", x: 19, y: 53, width: 10, height: 8 },
      
      // Middle facilities
      { id: "Bath", x: 19, y: 35, width: 8, height: 6 },
      { id: "stairs", x: 19, y: 42, width: 8, height: 4 },
      { id: "Office", x: 19, y: 47, width: 8, height: 5 },
      
      // Large Dalton Hall at top
      { id: "Dalton Hall", x: 19, y: 8, width: 50, height: 18 }
    ],
    "4th": [
      // Left column - rooms 411-415
      { id: "411", x: 8, y: 40, width: 10, height: 8 },
      { id: "412", x: 8, y: 49, width: 10, height: 8 },
      { id: "413", x: 8, y: 58, width: 10, height: 8 },
      { id: "414", x: 8, y: 67, width: 10, height: 8 },
      { id: "415", x: 8, y: 76, width: 10, height: 8 },
      
      // Middle column - rooms 416-418
      { id: "416", x: 19, y: 76, width: 10, height: 8 },
      { id: "417", x: 19, y: 67, width: 10, height: 8 },
      { id: "418", x: 19, y: 58, width: 10, height: 8 },
      
      // Middle facilities
      { id: "art room", x: 19, y: 49, width: 10, height: 8 },
      { id: "Bath", x: 19, y: 40, width: 8, height: 8 },
      { id: "stairs", x: 19, y: 30, width: 8, height: 9 },
      
      // ROOF areas
      { id: "ROOF", x: 19, y: 8, width: 50, height: 15 },
      { id: "ROOF2", x: 19, y: 24, width: 25, height: 12 }
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
                      className="absolute cursor-pointer border-2 border-primary/30 hover:border-primary hover:bg-primary/20 rounded transition-all duration-200 hover:scale-105"
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
                      
                      {/* Room label - always visible now */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xs font-bold rounded opacity-80 hover:opacity-100 transition-opacity duration-200">
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