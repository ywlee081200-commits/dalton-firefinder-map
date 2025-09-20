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
  const [isPositioningMode, setIsPositioningMode] = useState(false);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState<{ roomId: string; handle: string } | null>(null);

  const floorImages = {
    "1st": floor1Image,
    "2nd": floor2Image,
    "3rd": floor3Image,
    "4th": floor4Image
  };

  const [roomPositions, setRoomPositions] = useState({
    "2nd": [
      { id: "211", x: 8, y: 35, width: 10, height: 8 },
      { id: "212", x: 8, y: 44, width: 10, height: 8 },
      { id: "213", x: 8, y: 53, width: 10, height: 8 },
      { id: "214", x: 8, y: 62, width: 10, height: 8 },
      { id: "215", x: 8, y: 71, width: 10, height: 8 },
      { id: "216", x: 19, y: 71, width: 10, height: 8 },
      { id: "217", x: 19, y: 62, width: 10, height: 8 },
      { id: "218", x: 19, y: 53, width: 10, height: 8 },
      { id: "Bath", x: 19, y: 35, width: 8, height: 6 },
      { id: "stairs", x: 19, y: 42, width: 8, height: 4 },
      { id: "Office", x: 19, y: 47, width: 8, height: 5 },
      { id: "Lab1", x: 30, y: 28, width: 14, height: 7 },
      { id: "Lab2", x: 30, y: 36, width: 14, height: 7 },
      { id: "Dalton Hall", x: 19, y: 8, width: 50, height: 18 }
    ],
    "1st": [
      { id: "111", x: 8, y: 35, width: 10, height: 8 },
      { id: "112", x: 8, y: 44, width: 10, height: 8 },
      { id: "113", x: 8, y: 53, width: 10, height: 8 },
      { id: "114", x: 8, y: 62, width: 10, height: 8 },
      { id: "115", x: 8, y: 71, width: 10, height: 8 },
      { id: "116", x: 19, y: 71, width: 10, height: 8 },
      { id: "117", x: 19, y: 62, width: 10, height: 8 },
      { id: "118", x: 19, y: 53, width: 10, height: 8 },
      { id: "Bath", x: 19, y: 35, width: 8, height: 6 },
      { id: "stairs", x: 19, y: 42, width: 8, height: 4 },
      { id: "Office", x: 19, y: 47, width: 8, height: 5 },
      { id: "Kitchen", x: 30, y: 28, width: 18, height: 15 },
      { id: "Dalton Hall", x: 19, y: 8, width: 50, height: 18 }
    ],
    "3rd": [
      { id: "311", x: 8, y: 35, width: 10, height: 8 },
      { id: "312", x: 8, y: 44, width: 10, height: 8 },
      { id: "313", x: 8, y: 53, width: 10, height: 8 },
      { id: "314", x: 8, y: 62, width: 10, height: 8 },
      { id: "315", x: 8, y: 71, width: 10, height: 8 },
      { id: "316", x: 19, y: 71, width: 10, height: 8 },
      { id: "317", x: 19, y: 62, width: 10, height: 8 },
      { id: "318", x: 19, y: 53, width: 10, height: 8 },
      { id: "Bath", x: 19, y: 35, width: 8, height: 6 },
      { id: "stairs", x: 19, y: 42, width: 8, height: 4 },
      { id: "Office", x: 19, y: 47, width: 8, height: 5 },
      { id: "Dalton Hall", x: 19, y: 8, width: 50, height: 18 }
    ],
    "4th": [
      { id: "411", x: 8, y: 40, width: 10, height: 8 },
      { id: "412", x: 8, y: 49, width: 10, height: 8 },
      { id: "413", x: 8, y: 58, width: 10, height: 8 },
      { id: "414", x: 8, y: 67, width: 10, height: 8 },
      { id: "415", x: 8, y: 76, width: 10, height: 8 },
      { id: "416", x: 19, y: 76, width: 10, height: 8 },
      { id: "417", x: 19, y: 67, width: 10, height: 8 },
      { id: "418", x: 19, y: 58, width: 10, height: 8 },
      { id: "art room", x: 19, y: 49, width: 10, height: 8 },
      { id: "Bath", x: 19, y: 40, width: 8, height: 8 },
      { id: "stairs", x: 19, y: 30, width: 8, height: 9 },
      { id: "ROOF", x: 19, y: 8, width: 50, height: 15 },
      { id: "ROOF2", x: 19, y: 24, width: 25, height: 12 }
    ]
  });

  const currentRooms = roomPositions[floor] || [];

  const handleRoomClick = (roomId: string) => {
    if (isPositioningMode) return;
    setEditingRoom(roomId);
    setSelectedRoom(null);
  };

  const handleMouseDown = (e: React.MouseEvent, roomId: string, action: 'move' | 'resize' = 'move', handle?: string) => {
    if (isPositioningMode) {
      if (action === 'resize' && handle) {
        setIsResizing({ roomId, handle });
      } else {
        setIsDragging(roomId);
      }
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((!isDragging && !isResizing) || !isPositioningMode) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (isDragging) {
      setRoomPositions(prev => ({
        ...prev,
        [floor]: prev[floor].map(room => 
          room.id === isDragging 
            ? { ...room, x: Math.max(0, Math.min(100 - room.width, x - room.width/2)), y: Math.max(0, Math.min(100 - room.height, y - room.height/2)) }
            : room
        )
      }));
    } else if (isResizing) {
      setRoomPositions(prev => ({
        ...prev,
        [floor]: prev[floor].map(room => {
          if (room.id !== isResizing.roomId) return room;
          
          const newRoom = { ...room };
          const handle = isResizing.handle;
          
          if (handle === 'bottom-right') {
            newRoom.width = Math.max(5, Math.min(100 - room.x, x - room.x));
            newRoom.height = Math.max(3, Math.min(100 - room.y, y - room.y));
          } else if (handle === 'bottom-left') {
            const newWidth = Math.max(5, room.x + room.width - x);
            const newX = Math.max(0, x);
            if (newWidth >= 5) {
              newRoom.x = newX;
              newRoom.width = newWidth;
            }
            newRoom.height = Math.max(3, Math.min(100 - room.y, y - room.y));
          } else if (handle === 'top-right') {
            const newHeight = Math.max(3, room.y + room.height - y);
            const newY = Math.max(0, y);
            if (newHeight >= 3) {
              newRoom.y = newY;
              newRoom.height = newHeight;
            }
            newRoom.width = Math.max(5, Math.min(100 - room.x, x - room.x));
          } else if (handle === 'top-left') {
            const newWidth = Math.max(5, room.x + room.width - x);
            const newHeight = Math.max(3, room.y + room.height - y);
            const newX = Math.max(0, x);
            const newY = Math.max(0, y);
            if (newWidth >= 5 && newHeight >= 3) {
              newRoom.x = newX;
              newRoom.y = newY;
              newRoom.width = newWidth;
              newRoom.height = newHeight;
            }
          }
          
          return newRoom;
        })
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
    setIsResizing(null);
  };

  const handleRoomUpdate = (roomId: string, data: RoomData) => {
    setRoomsData(prev => ({
      ...prev,
      [roomId]: data
    }));
    setEditingRoom(null);
  };

  const exportPositions = () => {
    console.log(`Room positions for ${floor} floor:`, JSON.stringify(currentRooms, null, 2));
    alert(`Room positions logged to console! Check developer tools.`);
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
      
      {/* Positioning Mode Controls */}
      <div className="absolute top-4 left-4 z-50 space-y-2">
        <button
          onClick={() => setIsPositioningMode(!isPositioningMode)}
          className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 ${
            isPositioningMode 
              ? "bg-accent text-accent-foreground shadow-lg" 
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {isPositioningMode ? "🔒 Exit Positioning" : "📐 Position Rooms"}
        </button>
        
        {isPositioningMode && (
          <div className="space-y-1">
            <button
              onClick={exportPositions}
              className="block w-full px-3 py-1 text-xs bg-primary text-primary-foreground rounded"
            >
              Export Positions
            </button>
            <div className="text-xs text-white bg-black/60 p-2 rounded max-w-48">
              <div>• Drag rooms to move</div>
              <div>• Drag corners to resize</div>
            </div>
          </div>
        )}
      </div>

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
              <div 
                className="absolute inset-0"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {currentRooms.map((room) => {
                  const roomData = roomsData[room.id];
                  const extinguisherCount = roomData?.fireExtinguishers?.count || 0;
                  
                  return (
                    <div
                      key={room.id}
                      className={`absolute border-2 rounded transition-all duration-200 ${
                        isPositioningMode 
                          ? "border-accent bg-accent/20 cursor-move hover:bg-accent/30" 
                          : "cursor-pointer border-primary/30 hover:border-primary hover:bg-primary/20 hover:scale-105"
                      } ${isDragging === room.id || isResizing?.roomId === room.id ? "ring-2 ring-accent ring-opacity-50" : ""}`}
                      style={{
                        left: `${room.x}%`,
                        top: `${room.y}%`,
                        width: `${room.width}%`,
                        height: `${room.height}%`
                      }}
                      onClick={() => handleRoomClick(room.id)}
                      onMouseDown={(e) => handleMouseDown(e, room.id, 'move')}
                    >
                      {renderFireExtinguishers(room.id, extinguisherCount)}
                      
                      {/* Room label */}
                      <div className={`absolute inset-0 flex items-center justify-center text-xs font-bold rounded transition-opacity duration-200 ${
                        isPositioningMode 
                          ? "bg-accent/60 text-white" 
                          : "bg-black/40 text-white opacity-80 hover:opacity-100"
                      }`}>
                        <div className="text-center pointer-events-none">
                          <div>{room.id}</div>
                          {isPositioningMode && (
                            <div className="text-[10px] mt-1">
                              {Math.round(room.x)},{Math.round(room.y)} | {Math.round(room.width)}×{Math.round(room.height)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Resize handles - only show in positioning mode */}
                      {isPositioningMode && (
                        <>
                          {/* Top-left resize handle */}
                          <div
                            className="absolute -top-1 -left-1 w-3 h-3 bg-accent border border-white rounded-full cursor-nw-resize hover:scale-125 transition-transform"
                            onMouseDown={(e) => handleMouseDown(e, room.id, 'resize', 'top-left')}
                          />
                          
                          {/* Top-right resize handle */}
                          <div
                            className="absolute -top-1 -right-1 w-3 h-3 bg-accent border border-white rounded-full cursor-ne-resize hover:scale-125 transition-transform"
                            onMouseDown={(e) => handleMouseDown(e, room.id, 'resize', 'top-right')}
                          />
                          
                          {/* Bottom-left resize handle */}
                          <div
                            className="absolute -bottom-1 -left-1 w-3 h-3 bg-accent border border-white rounded-full cursor-sw-resize hover:scale-125 transition-transform"
                            onMouseDown={(e) => handleMouseDown(e, room.id, 'resize', 'bottom-left')}
                          />
                          
                          {/* Bottom-right resize handle */}
                          <div
                            className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent border border-white rounded-full cursor-se-resize hover:scale-125 transition-transform"
                            onMouseDown={(e) => handleMouseDown(e, room.id, 'resize', 'bottom-right')}
                          />
                        </>
                      )}
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