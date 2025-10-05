import { useState } from "react";
import { Navigation } from "./Navigation.tsx";
import { ReportButton } from "./ReportButton.tsx";
import { DonationButton } from "./DonationButton.tsx";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FloorNumber, RoomData } from "@/types/SafetyMap";

interface FloorMapProps {
  floor: FloorNumber;
  onFloorSelect: (floor: string) => void;
  onBackToHome: () => void;
}

// here is change fire extinguisher information
const allRoomData = {
  "1st": {
    "111": {
      "id": "111",
      "name": "111",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "112": {
      "id": "112",
      "name": "112",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "113": {
      "id": "113",
      "name": "113",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "114": {
      "id": "114",
      "name": "114",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "115": {
      "id": "115",
      "name": "115",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "116": {
      "id": "116",
      "name": "116",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "117": {
      "id": "117",
      "name": "117",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "118": {
      "id": "118",
      "name": "118",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "119": {
      "id": "119",
      "name": "119",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "Stairs": {
      "id": "Stairs",
      "name": "Stairs",
      "fireExtinguishers": {
        "count": 3,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "Kitchen": {
      "id": "Kitchen",
      "name": "Kitchen",
      "fireExtinguishers": {
        "count": 5,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    }
  },

  "2nd": {
    "211": {
      "id": "211",
      "name": "211",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "212": {
      "id": "212",
      "name": "212",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "213": {
      "id": "213",
      "name": "213",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "214": {
      "id": "214",
      "name": "214",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "215": {
      "id": "215",
      "name": "215",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "216": {
      "id": "216",
      "name": "216",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "217": {
      "id": "217",
      "name": "217",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "218": {
      "id": "218",
      "name": "218",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "Office": {
      "id": "Office",
      "name": "Office",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "Stairs": {
      "id": "Stairs",
      "name": "Stairs",
      "fireExtinguishers": {
        "count": 3,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "Dalton Hall": {
      "id": "Dalton Hall",
      "name": "Dalton Hall",
      "fireExtinguishers": {
        "count": 3,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "Lab1": {
      "id": "Lab1",
      "name": "Lab1",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "Lab2": {
      "id": "Lab2",
      "name": "Lab2",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    }
  },

  "3rd": {
    "311": {
      "id": "311",
      "name": "311",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "312": {
      "id": "312",
      "name": "312",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "313": {
      "id": "313",
      "name": "313",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "314": {
      "id": "314",
      "name": "314",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "315": {
      "id": "315",
      "name": "315",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "316": {
      "id": "316",
      "name": "316",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "317": {
      "id": "317",
      "name": "317",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "318": {
      "id": "318",
      "name": "318",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "Office": {
      "id": "Office",
      "name": "Office",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "Stairs": {
      "id": "Stairs",
      "name": "Stairs",
      "fireExtinguishers": {
        "count": 3,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "Dalton Hall": {
      "id": "Dalton Hall",
      "name": "Dalton Hall",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    }
  },

  "4th": {
    "411": {
      "id": "411",
      "name": "411",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "412": {
      "id": "412",
      "name": "412",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "413": {
      "id": "413",
      "name": "413",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "414": {
      "id": "414",
      "name": "414",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "415": {
      "id": "415",
      "name": "415",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "416": {
      "id": "416",
      "name": "416",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "417": {
      "id": "417",
      "name": "417",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "418": {
      "id": "418",
      "name": "418",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "Art Room": {
      "id": "Art Room",
      "name": "Art Room",
      "fireExtinguishers": {
        "count": 1,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    },
    "Stairs": {
      "id": "Stairs",
      "name": "Stairs",
      "fireExtinguishers": {
        "count": 3,
        "type": "ABC Dry Chemical",
        "capacity": "3.3kg",
        "maintenance": "2023-07"
      },
      "dateChecked": "2025-09-29"
    }
  }
};


export const FloorMap = ({ floor, onFloorSelect, onBackToHome }: FloorMapProps) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [roomsData, setRoomsData] = useState<Record<string, RoomData>>(allRoomData[floor]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverRoomId, setPopoverRoomId] = useState<string | null>(null);
  const [isPositioningMode, setIsPositioningMode] = useState(false);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState<{ roomId: string; handle: string } | null>(null);
  const [isDraggingUI, setIsDraggingUI] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const beforOnFloorSelect = (floorIn: string) =>{
    setRoomsData(allRoomData[floorIn])
    onFloorSelect(floorIn);
  }

  const [roomPositions, setRoomPositions] = useState({  
    "1st": [
      { id: "-", x: 20, y: 40, width: 60, height: 4 },
      { id: "111", x: 20, y: 44, width: 25, height: 15 },
      { id: "112", x: 20, y: 59, width: 25, height: 15 },
      { id: "-", x: 20, y: 74, width: 25, height: 12 },
      { id: "113", x: 20, y: 86, width: 25, height: 15 },
      { id: "114", x: 20, y: 101, width: 25, height: 15 },
      { id: "115", x: 20, y: 116, width: 25, height: 15 },
      
      { id: "Bathroom", x: 55, y: 44, width: 25, height: 15 },
      { id: "Stairs", x: 55, y: 59, width: 25, height: 7 },
      { id: "Office", x: 55, y: 66, width: 25, height: 24 },
      { id: "116", x: 55, y: 90, width: 25, height: 10 },
      { id: "117", x: 55, y: 100, width: 25, height: 14 },
      { id: "118", x: 55, y: 114, width: 25, height: 16 },
  
      { id: "Kitchen", x: 53, y: 25, width: 35, height: 15 },
      { id: "-", x: 3, y: 25, width: 50, height: 15 },
      { id: "Dalton Hall", x: 10, y: 5, width: 80, height: 20 }
    ],
    "2nd": [
      { id: "-", x: 20, y: 40, width: 60, height: 4 },
      { id: "-", x: 3, y: 25, width: 50, height: 15 },
      // Left column - rooms 211–215
      { id: "211", x: 20, y: 44, width: 25, height: 15 },
      { id: "212", x: 20, y: 59, width: 25, height: 15 },
      { id: "-", x: 20, y: 74, width: 25, height: 12 },
      { id: "213", x: 20, y: 86, width: 25, height: 15 },
      { id: "214", x: 20, y: 101, width: 25, height: 15 },
      { id: "215", x: 20, y: 116, width: 25, height: 15 },

      // Right column - 216~218 + Facilities
      { id: "Bathroom", x: 55, y: 44, width: 25, height: 15 },
      { id: "Stairs", x: 55, y: 59, width: 25, height: 7 },
      { id: "Office", x: 55, y: 66, width: 25, height: 24 },
      { id: "218", x: 55, y: 90, width: 25, height: 10 },
      { id: "217", x: 55, y: 100, width: 25, height: 14 },
      { id: "216", x: 55, y: 114, width: 25, height: 16 },

      // Labs
      { id: "Lab1", x: 53, y: 25, width: 35, height: 7.5 },
      { id: "Lab2", x: 53, y: 32.5, width: 35, height: 7.5 },

      // Dalton Hall
      { id: "Dalton Hall", x: 10, y: 5, width: 80, height: 20 }
    ],
    "3rd": [
      { id: "-", x: 53, y: 25, width: 35, height: 15 },
      { id: "-", x: 3, y: 25, width: 50, height: 15 },
      { id: "-", x: 20, y: 40, width: 60, height: 4 },

      { id: "311", x: 20, y: 44, width: 25, height: 15 },
      { id: "312", x: 20, y: 59, width: 25, height: 15 },
      { id: "-", x: 20, y: 74, width: 25, height: 12 },
      { id: "313", x: 20, y: 86, width: 25, height: 15 },
      { id: "314", x: 20, y: 101, width: 25, height: 15 },
      { id: "315", x: 20, y: 116, width: 25, height: 15 },

      { id: "Bathroom", x: 55, y: 44, width: 25, height: 15 },
      { id: "Stairs", x: 55, y: 59, width: 25, height: 7 },
      { id: "Office", x: 55, y: 66, width: 25, height: 24 },
      { id: "318", x: 55, y: 90, width: 25, height: 10 },
      { id: "317", x: 55, y: 100, width: 25, height: 14 },
      { id: "316", x: 55, y: 114, width: 25, height: 16 },

      { id: "Dalton Hall", x: 10, y: 5, width: 80, height: 20 }
    ],
    "4th": [
      { id: "-", x: 20, y: 40, width: 60, height: 4 },

      { id: "411", x: 20, y: 44, width: 25, height: 15 },
      { id: "412", x: 20, y: 59, width: 25, height: 15 },
      { id: "-", x: 20, y: 74, width: 25, height: 12 },
      { id: "413", x: 20, y: 86, width: 25, height: 15 },
      { id: "414", x: 20, y: 101, width: 25, height: 15 },
      { id: "415", x: 20, y: 116, width: 25, height: 15 },

      { id: "Bathroom", x: 55, y: 44, width: 25, height: 15 },
      { id: "Stairs", x: 55, y: 59, width: 25, height: 7 },
      { id: "Art Room", x: 55, y: 66, width: 25, height: 24 },
      { id: "416", x: 55, y: 90, width: 25, height: 10 },
      { id: "417", x: 55, y: 100, width: 25, height: 14 },
      { id: "418", x: 55, y: 114, width: 25, height: 16 },

      { id: "Roof1", x: 10, y: 5, width: 80, height: 20 },
      { id: "Roof2", x: 3, y: 25, width: 85, height: 15 }
    ]
  });

  const currentRooms = roomPositions[floor] || [];

  const handleRoomClick = (roomId: string) => {
    if (isPositioningMode && roomId == '-' ) return;
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

  const exportPositions = () => {
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
      {/* Positioning Mode Controls */}
      <div className="absolute top-1 left-4 z-50 space-y-2">
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

      <main className="container mx-auto px-0 md:px-0 py-0 md:py-1 flex items-center justify-center min-h-screen">
        <div  className="w-full max-w-sm sm:max-w-sm md:max-w-6xl relative">
          <div  className="bg-card/90 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-2xl border border-primary/10 overflow-hidden relative">
            <div className="w-full relative">
              {/* Clean gradient background for all floors - Mobile portrait optimized */}
              <div className="w-full h-[90vh] sm:h-[80vh] md:h-[90vh] bg-gradient-to-br from-blue-50 to-blue-100 relative ">
                <div className="absolute top-2 left-2 md:top-4 md:left-4 text-base sm:text-lg md:text-2xl font-bold text-primary z-20  w-full bg-gradient-to-br"  >
                  {floor.toUpperCase()} FLOOR
                </div>
              </div>
              
              {/* Clickable room overlays */}
              <div 
                className="absolute inset-0"
                style={{overflowY: "auto", margin :"10px"}} 
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
                              <div className="items-center justify-center">
                                <div>{room.id}</div>
                                <div>{renderFireExtinguishers(room.id, extinguisherCount)}</div>
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
                               
                              </div>
                            ) : (                        
                              <div className="text-center">
                                <p className="text-muted-foreground">No safety information available for this room.</p>
                              </div>
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
        </div>
      </main>
      <div className="gp">
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            onClick={onBackToHome}
            variant="outline"
            className="bg-card/95 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground shadow-lg"
          > Main
          </Button>
          <ReportButton />
          <DonationButton />
          <Navigation onFloorSelect={beforOnFloorSelect} />                
        </div>
      </div>            
    </div>
  );
};