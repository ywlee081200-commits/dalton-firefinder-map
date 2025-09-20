import { useState } from "react";
import { Navigation } from "./Navigation";
import { ReportButton } from "./ReportButton";
import { RoomInfoPanel } from "./RoomInfoPanel";
import { EditRoomDialog } from "./EditRoomDialog";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverRoomId, setPopoverRoomId] = useState<string | null>(null);
  const [isPositioningMode, setIsPositioningMode] = useState(false);
  const [isDevMode, setIsDevMode] = useState(true); // Set to false for published version
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState<{ roomId: string; handle: string } | null>(null);
  const [isDraggingUI, setIsDraggingUI] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [uiPositions, setUIPositions] = useState({
    navigation: { x: 25, y: 90 },    // Bottom left
    reportButton: { x: 50, y: 90 },  // Bottom center  
    backButton: { x: 75, y: 90 }     // Bottom right
  });

  const floorImages = {
    "1st": floor1Image,
    "2nd": floor2Image,
    "3rd": floor3Image,
    "4th": floor4Image
  };

  const [roomPositions, setRoomPositions] = useState({
    "2nd": [
      // Left column - rooms 211-215 (beautifully aligned)
      { id: "211", x: 15, y: 20, width: 12, height: 10 },
      { id: "212", x: 15, y: 32, width: 12, height: 10 },
      { id: "213", x: 15, y: 44, width: 12, height: 10 },
      { id: "214", x: 15, y: 56, width: 12, height: 10 },
      { id: "215", x: 15, y: 68, width: 12, height: 10 },
      
      // Middle column - rooms 216-218 (aligned with left column)
      { id: "216", x: 30, y: 68, width: 12, height: 10 },
      { id: "217", x: 30, y: 56, width: 12, height: 10 },
      { id: "218", x: 30, y: 44, width: 12, height: 10 },
      
      // Facilities (aligned grid)
      { id: "Bathroom", x: 30, y: 20, width: 12, height: 8 },
      { id: "Stairs", x: 30, y: 30, width: 12, height: 6 },
      { id: "Office", x: 30, y: 38, width: 12, height: 5 },
      
      // Lab rooms (right side)
      { id: "Lab1", x: 45, y: 20, width: 18, height: 12 },
      { id: "Lab2", x: 45, y: 34, width: 18, height: 12 },
      
      // Dalton Hall (top, spanning width)
      { id: "Dalton Hall", x: 15, y: 5, width: 50, height: 12 }
    ],
    "1st": [
      // Left column - rooms 111-115 (beautifully aligned)
      { id: "111", x: 15, y: 20, width: 12, height: 10 },
      { id: "112", x: 15, y: 32, width: 12, height: 10 },
      { id: "113", x: 15, y: 44, width: 12, height: 10 },
      { id: "114", x: 15, y: 56, width: 12, height: 10 },
      { id: "115", x: 15, y: 68, width: 12, height: 10 },
      
      // Middle column - rooms 116-118 (aligned with left column)
      { id: "116", x: 30, y: 68, width: 12, height: 10 },
      { id: "117", x: 30, y: 56, width: 12, height: 10 },
      { id: "118", x: 30, y: 44, width: 12, height: 10 },
      
      // Facilities (aligned grid)
      { id: "Bathroom", x: 30, y: 20, width: 12, height: 8 },
      { id: "Stairs", x: 30, y: 30, width: 12, height: 6 },
      { id: "Office", x: 30, y: 38, width: 12, height: 5 },
      
      // Kitchen (larger, right side)
      { id: "Kitchen", x: 45, y: 20, width: 20, height: 18 },
      
      // Dalton Hall (top, spanning width)
      { id: "Dalton Hall", x: 15, y: 5, width: 50, height: 12 }
    ],
    "3rd": [
      // Left column - rooms 311-315 (beautifully aligned)
      { id: "311", x: 15, y: 20, width: 12, height: 10 },
      { id: "312", x: 15, y: 32, width: 12, height: 10 },
      { id: "313", x: 15, y: 44, width: 12, height: 10 },
      { id: "314", x: 15, y: 56, width: 12, height: 10 },
      { id: "315", x: 15, y: 68, width: 12, height: 10 },
      
      // Middle column - rooms 316-318 (aligned with left column)
      { id: "316", x: 30, y: 68, width: 12, height: 10 },
      { id: "317", x: 30, y: 56, width: 12, height: 10 },
      { id: "318", x: 30, y: 44, width: 12, height: 10 },
      
      // Facilities (aligned grid)
      { id: "Bathroom", x: 30, y: 20, width: 12, height: 8 },
      { id: "Stairs", x: 30, y: 30, width: 12, height: 6 },
      { id: "Office", x: 30, y: 38, width: 12, height: 5 },
      
      // Dalton Hall (top, spanning width)
      { id: "Dalton Hall", x: 15, y: 5, width: 50, height: 12 }
    ],
    "4th": [
      // Left column - rooms 411-415 (beautifully aligned)
      { id: "411", x: 15, y: 20, width: 12, height: 10 },
      { id: "412", x: 15, y: 32, width: 12, height: 10 },
      { id: "413", x: 15, y: 44, width: 12, height: 10 },
      { id: "414", x: 15, y: 56, width: 12, height: 10 },
      { id: "415", x: 15, y: 68, width: 12, height: 10 },
      
      // Middle column - rooms 416-418 (aligned with left column)
      { id: "416", x: 30, y: 68, width: 12, height: 10 },
      { id: "417", x: 30, y: 56, width: 12, height: 10 },
      { id: "418", x: 30, y: 44, width: 12, height: 10 },
      
      // Facilities (aligned grid)
      { id: "Art Room", x: 45, y: 20, width: 18, height: 12 },
      { id: "Bathroom", x: 30, y: 20, width: 12, height: 8 },
      { id: "Stairs", x: 30, y: 30, width: 12, height: 6 },
      
      // ROOF areas (top sections)
      { id: "Roof 1", x: 15, y: 5, width: 30, height: 12 },
      { id: "Roof 2", x: 47, y: 5, width: 18, height: 12 }
    ]
  });

  const currentRooms = roomPositions[floor] || [];

  const handleRoomClick = (roomId: string) => {
    if (isPositioningMode) return;
    setPopoverRoomId(roomId);
    setPopoverOpen(true);
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
    if ((!isDragging && !isResizing && !isDraggingUI) || !isPositioningMode) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (isDraggingUI) {
      // Much more responsive UI dragging with better boundaries
      setUIPositions(prev => ({
        ...prev,
        [isDraggingUI]: { 
          x: Math.max(2, Math.min(98, x - dragOffset.x)), 
          y: Math.max(2, Math.min(98, y - dragOffset.y)) 
        }
      }));
    } else if (isDragging) {
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
    setIsDraggingUI(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleUIMouseDown = (e: React.MouseEvent, uiElement: string) => {
    if (isPositioningMode) {
      const rect = e.currentTarget.getBoundingClientRect();
      const parentRect = e.currentTarget.closest('.min-h-screen')?.getBoundingClientRect();
      
      if (parentRect) {
        const x = ((e.clientX - parentRect.left) / parentRect.width) * 100;
        const y = ((e.clientY - parentRect.top) / parentRect.height) * 100;
        const currentPos = uiPositions[uiElement as keyof typeof uiPositions];
        
        setDragOffset({
          x: x - currentPos.x,
          y: y - currentPos.y
        });
      }
      
      setIsDraggingUI(uiElement);
      e.preventDefault();
      e.stopPropagation();
    }
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
      <div className="flex items-center gap-0.5 ml-2">
        {Array.from({ length: Math.min(count, 6) }, (_, i) => (
          <div 
            key={i} 
            className="text-accent drop-shadow-lg"
            style={{ fontSize: '12px', lineHeight: '1' }}
          >
            🧯
          </div>
        ))}
        {count > 6 && (
          <div className="text-[8px] bg-accent text-accent-foreground rounded-full px-1 font-bold ml-1">
            +{count - 6}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen safety-gradient relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Navigation - movable */}
      <div 
        className={`absolute z-50 transition-all duration-200 ${
          isPositioningMode 
            ? `cursor-move border-2 border-accent/50 rounded p-1 ${isDraggingUI === 'navigation' ? 'scale-105 shadow-2xl border-accent' : ''}` 
            : ''
        }`}
        style={{ 
          left: `${uiPositions.navigation.x}%`, 
          top: `${uiPositions.navigation.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        onMouseDown={(e) => handleUIMouseDown(e, 'navigation')}
      >
        <Navigation onFloorSelect={onFloorSelect} currentFloor={floor} />
        {isPositioningMode && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded whitespace-nowrap">
            📐 Drag Navigation
          </div>
        )}
      </div>
      
      {/* Report Button - movable */}
      <div 
        className={`absolute z-50 transition-all duration-200 ${
          isPositioningMode 
            ? `cursor-move border-2 border-accent/50 rounded p-1 ${isDraggingUI === 'reportButton' ? 'scale-105 shadow-2xl border-accent' : ''}` 
            : ''
        }`}
        style={{ 
          left: `${uiPositions.reportButton.x}%`, 
          top: `${uiPositions.reportButton.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        onMouseDown={(e) => handleUIMouseDown(e, 'reportButton')}
      >
        <ReportButton />
        {isPositioningMode && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded whitespace-nowrap">
            📐 Drag Report
          </div>
        )}
      </div>
      
      {/* Positioning Mode Controls */}
      <div className="absolute top-4 left-4 z-50 space-y-2">
        {/* Dev Mode Toggle - Only show in dev environment */}
        <button
          onClick={() => setIsDevMode(!isDevMode)}
          className={`px-3 py-1 rounded text-xs font-medium transition-all duration-200 ${
            isDevMode 
              ? "bg-green-500 text-white hover:bg-green-600" 
              : "bg-gray-500 text-white hover:bg-gray-600"
          }`}
        >
          {isDevMode ? "🛠️ DEV MODE" : "👁️ VIEW MODE"}
        </button>

        {/* Development Mode Toggle */}
        {isDevMode && (
          <button
            onClick={() => setIsPositioningMode(!isPositioningMode)}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 ${
              isPositioningMode 
                ? "bg-accent text-accent-foreground shadow-lg" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {isPositioningMode ? "🔒 Exit Positioning" : "📐 Position Mode"}
          </button>
        )}
        
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
              <div>• Drag UI elements to reposition</div>
              <div>• Drag corners to resize rooms</div>
            </div>
          </div>
        )}
      </div>

      <main className="container mx-auto px-2 md:px-4 py-10 md:py-20 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-6xl relative">
          <div className="bg-card/90 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-2xl border border-primary/10 overflow-hidden relative">
            <div className="w-full relative">
              {/* Clean gradient background for all floors - Mobile portrait optimized */}
              <div className="w-full h-[85vh] sm:h-[80vh] md:h-[70vh] bg-gradient-to-br from-blue-50 to-blue-100 relative">
                <div className="absolute top-2 left-2 md:top-4 md:left-4 text-base sm:text-lg md:text-2xl font-bold text-primary">
                  {floor.toUpperCase()} FLOOR
                </div>
                {/* Mobile layout indicator */}
                <div className="absolute top-2 right-2 md:hidden bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                  📱 MOBILE
                </div>
              </div>
              
              {/* Clickable room overlays */}
              <div 
                className="absolute inset-0"
              >
                {currentRooms.map((room) => {
                  const roomData = roomsData[room.id];
                  const extinguisherCount = roomData?.fireExtinguishers?.count || 0;
                  
                  return (
                    <Popover 
                      key={room.id}
                      open={popoverOpen && popoverRoomId === room.id} 
                      onOpenChange={(open) => {
                        if (!open) {
                          setPopoverOpen(false);
                          setPopoverRoomId(null);
                        }
                      }}
                    >
                      <PopoverTrigger asChild>
                        <div
                          className={`absolute border-2 rounded transition-all duration-200 ${
                            isPositioningMode 
                              ? "border-accent bg-accent/20 cursor-move hover:bg-accent/30" 
                              : "cursor-pointer border-primary bg-background/90 hover:border-primary hover:bg-primary/20 hover:scale-105"
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
                          {/* Room label with fire extinguishers - replaces original image text */}
                          <div className={`absolute inset-0 flex items-center justify-center text-sm font-bold transition-opacity duration-200 ${
                            isPositioningMode 
                              ? "bg-accent/60 text-white" 
                              : "text-black"
                          }`}>
                            <div className="text-center pointer-events-none">
                              <div className="flex items-center justify-center">
                                {room.id}
                                {renderFireExtinguishers(room.id, extinguisherCount)}
                              </div>
                              {isPositioningMode && (
                                <div className="text-[10px] mt-1 bg-black/60 text-white px-1 rounded">
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
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Room {room.id}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {roomsData[room.id] ? (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-red-500">🧯</span>
                                  <span>{roomsData[room.id].fireExtinguishers.count} Fire Extinguisher(s)</span>
                                </div>
                                {roomsData[room.id].fireExtinguishers.type && (
                                  <div><strong>Type:</strong> {roomsData[room.id].fireExtinguishers.type}</div>
                                )}
                                {roomsData[room.id].fireExtinguishers.capacity && (
                                  <div><strong>Capacity:</strong> {roomsData[room.id].fireExtinguishers.capacity}</div>
                                )}
                                {roomsData[room.id].fireExtinguishers.maintenance && (
                                  <div><strong>Last Maintenance:</strong> {roomsData[room.id].fireExtinguishers.maintenance}</div>
                                )}
                                {isDevMode && (
                                  <Button 
                                    onClick={() => {
                                      setEditingRoom(room.id);
                                      setPopoverOpen(false);
                                      setPopoverRoomId(null);
                                    }}
                                    className="w-full mt-3"
                                    size="sm"
                                  >
                                    Edit Room Info
                                  </Button>
                                )}
                              </div>
                            ) : (
                              isDevMode ? (
                                <div className="text-center">
                                  <p className="text-muted-foreground mb-3">No information available for this room.</p>
                                  <Button 
                                    onClick={() => {
                                      setEditingRoom(room.id);
                                      setPopoverOpen(false);
                                      setPopoverRoomId(null);
                                    }}
                                    size="sm"
                                  >
                                    Add Room Info
                                  </Button>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <p className="text-muted-foreground">No safety information available for this room.</p>
                                </div>
                              )
                            )}
                          </CardContent>
                        </Card>
                      </PopoverContent>
                    </Popover>
                  );
                  })}
                </div>
              </div>
          </div>

          {/* Back to Main Map Button - movable */}
          <div 
            className={`absolute z-50 transition-all duration-200 ${
              isPositioningMode 
                ? `cursor-move border-2 border-accent/50 rounded p-1 ${isDraggingUI === 'backButton' ? 'scale-105 shadow-2xl border-accent' : ''}` 
                : ''
            }`}
            style={{ 
              left: `${uiPositions.backButton.x}%`, 
              top: `${uiPositions.backButton.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onMouseDown={(e) => handleUIMouseDown(e, 'backButton')}
          >
            <Button
              onClick={onBackToHome}
              variant="outline"
              className="bg-card/95 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground shadow-lg"
            >
              ← Back to Main Map
            </Button>
            {isPositioningMode && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded whitespace-nowrap">
                📐 Drag Back Button
              </div>
            )}
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

      {/* Edit Room Dialog - Only show in dev mode */}
      {isDevMode && editingRoom && (
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