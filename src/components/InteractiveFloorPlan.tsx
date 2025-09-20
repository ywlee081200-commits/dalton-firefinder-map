import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Rect, Text, Group } from "fabric";
import { RoomData } from "@/types/SafetyMap";
import { FireExtinguisherIcon } from "./FireExtinguisherIcon";
import { Card, CardContent } from "@/components/ui/card";

interface InteractiveFloorPlanProps {
  floor: string;
  roomsData: Record<string, RoomData>;
  onRoomClick: (roomId: string) => void;
  isDevMode: boolean;
}

export const InteractiveFloorPlan = ({ 
  floor, 
  roomsData, 
  onRoomClick, 
  isDevMode 
}: InteractiveFloorPlanProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const floorConfigs = {
    "2nd": {
      rooms: [
        // Left column - rooms 211-215
        { id: "211", name: "211", x: 50, y: 250, width: 50, height: 60 },
        { id: "212", name: "212", x: 50, y: 320, width: 50, height: 60 },
        { id: "213", name: "213", x: 50, y: 390, width: 50, height: 60 },
        { id: "214", name: "214", x: 50, y: 460, width: 50, height: 60 },
        { id: "215", name: "215", x: 50, y: 530, width: 50, height: 60 },
        
        // Right column - rooms 216-218  
        { id: "216", name: "216", x: 110, y: 530, width: 50, height: 60 },
        { id: "217", name: "217", x: 110, y: 460, width: 50, height: 60 },
        { id: "218", name: "218", x: 110, y: 390, width: 50, height: 60 },
        
        // Middle section
        { id: "Bathroom", name: "Bathroom", x: 110, y: 250, width: 40, height: 50 },
        { id: "Office", name: "Office", x: 110, y: 310, width: 40, height: 70 },
        
        // Lab rooms
        { id: "Lab1", name: "Lab1", x: 170, y: 200, width: 60, height: 50 },
        { id: "Lab2", name: "Lab2", x: 170, y: 260, width: 60, height: 50 },
        
        // Large Dalton Hall at top
        { id: "Dalton Hall", name: "Dalton Hall", x: 160, y: 60, width: 280, height: 130 }
      ]
    },
    "1st": {
      rooms: [
        // Left column - rooms 111-115
        { id: "111", name: "111", x: 50, y: 250, width: 50, height: 60 },
        { id: "112", name: "112", x: 50, y: 320, width: 50, height: 60 },
        { id: "113", name: "113", x: 50, y: 390, width: 50, height: 60 },
        { id: "114", name: "114", x: 50, y: 460, width: 50, height: 60 },
        { id: "115", name: "115", x: 50, y: 530, width: 50, height: 60 },
        
        // Right column - rooms 116-118
        { id: "116", name: "116", x: 110, y: 530, width: 50, height: 60 },
        { id: "117", name: "117", x: 110, y: 460, width: 50, height: 60 },
        { id: "118", name: "118", x: 110, y: 390, width: 50, height: 60 },
        
        // Middle section
        { id: "Bathroom", name: "Bathroom", x: 110, y: 250, width: 40, height: 50 },
        { id: "Office", name: "Office", x: 110, y: 310, width: 40, height: 70 },
        
        // Kitchen (replaces labs on 1st floor)
        { id: "Kitchen", name: "Kitchen", x: 170, y: 220, width: 80, height: 80 },
        
        // Large Dalton Hall at top
        { id: "Dalton Hall", name: "Dalton Hall", x: 160, y: 60, width: 280, height: 130 }
      ]
    },
    "3rd": {
      rooms: [
        // Left column - rooms 311-315
        { id: "311", name: "311", x: 50, y: 250, width: 50, height: 60 },
        { id: "312", name: "312", x: 50, y: 320, width: 50, height: 60 },
        { id: "313", name: "313", x: 50, y: 390, width: 50, height: 60 },
        { id: "314", name: "314", x: 50, y: 460, width: 50, height: 60 },
        { id: "315", name: "315", x: 50, y: 530, width: 50, height: 60 },
        
        // Right column - rooms 316-318
        { id: "316", name: "316", x: 110, y: 530, width: 50, height: 60 },
        { id: "317", name: "317", x: 110, y: 460, width: 50, height: 60 },
        { id: "318", name: "318", x: 110, y: 390, width: 50, height: 60 },
        
        // Middle section
        { id: "Bathroom", name: "Bathroom", x: 110, y: 250, width: 40, height: 50 },
        { id: "Office", name: "Office", x: 110, y: 310, width: 40, height: 70 },
        
        // Large Dalton Hall at top
        { id: "Dalton Hall", name: "Dalton Hall", x: 160, y: 60, width: 280, height: 130 }
      ]
    },
    "4th": {
      rooms: [
        // Left column - rooms 411-415
        { id: "411", name: "411", x: 50, y: 300, width: 50, height: 60 },
        { id: "412", name: "412", x: 50, y: 370, width: 50, height: 60 },
        { id: "413", name: "413", x: 50, y: 440, width: 50, height: 60 },
        { id: "414", name: "414", x: 50, y: 510, width: 50, height: 60 },
        { id: "415", name: "415", x: 50, y: 580, width: 50, height: 60 },
        
        // Right column - rooms 416-418
        { id: "416", name: "416", x: 110, y: 580, width: 50, height: 60 },
        { id: "417", name: "417", x: 110, y: 510, width: 50, height: 60 },
        { id: "418", name: "418", x: 110, y: 440, width: 50, height: 60 },
        
        // Art room and bathroom
        { id: "art room", name: "Art Room", x: 110, y: 370, width: 50, height: 60 },
        { id: "Bathroom", name: "Bathroom", x: 110, y: 300, width: 40, height: 60 },
        
        // Large ROOF areas at top
        { id: "ROOF", name: "ROOF", x: 160, y: 60, width: 280, height: 130 },
        { id: "ROOF2", name: "ROOF", x: 160, y: 200, width: 120, height: 80 }
      ]
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 800,
      backgroundColor: "#f8fafc",
    });

    setFabricCanvas(canvas);

    // Draw the floor plan
    drawFloorPlan(canvas);

    return () => {
      canvas.dispose();
    };
  }, [floor]);

  const drawFloorPlan = (canvas: FabricCanvas) => {
    const config = floorConfigs[floor as keyof typeof floorConfigs];
    if (!config) return;

    // Clear canvas
    canvas.clear();
    canvas.backgroundColor = "#f8fafc";

    // Draw floor number
    const floorNumber = new Text(`${floor.toUpperCase()}F`, {
      left: 30,
      top: 30,
      fontSize: 32,
      fontWeight: "bold",
      fill: "#1e40af"
    });
    canvas.add(floorNumber);

    // Draw decorative staircase pattern (matching original design)
    const staircase = new Rect({
      left: 500,
      top: 300,
      width: 180,
      height: 400,
      fill: "linear-gradient(45deg, #f59e0b, #d97706, #92400e)",
      rx: 15,
      ry: 15
    });
    canvas.add(staircase);

    // Draw main building outline (matching proportions)
    const buildingOutline = new Rect({
      left: 40,
      top: 40,
      width: 450,
      height: 650,
      fill: "transparent",
      stroke: "#374151",
      strokeWidth: 3,
      rx: 8,
      ry: 8
    });
    canvas.add(buildingOutline);

    // Draw rooms
    config.rooms.forEach(room => {
      drawRoom(canvas, room);
    });

    canvas.renderAll();
  };

  const drawRoom = (canvas: FabricCanvas, room: any) => {
    const roomData = roomsData[room.id];
    const extinguisherCount = roomData?.fireExtinguishers?.count || 0;
    
    // Room rectangle
    const roomRect = new Rect({
      left: room.x,
      top: room.y,
      width: room.width,
      height: room.height,
      fill: selectedRoom === room.id ? "#dbeafe" : "#ffffff",
      stroke: "#d1d5db",
      strokeWidth: 2,
      rx: 4,
      ry: 4
    });

    // Room label
    const roomLabel = new Text(room.name, {
      left: room.x + room.width / 2,
      top: room.y + room.height / 2 - 10,
      fontSize: 12,
      fontWeight: "600",
      fill: "#374151",
      textAlign: "center",
      originX: "center",
      originY: "center"
    });

    // Extinguisher count if any
    let extinguisherText = null;
    if (extinguisherCount > 0) {
      extinguisherText = new Text(`🧯 ${extinguisherCount}`, {
        left: room.x + room.width / 2,
        top: room.y + room.height / 2 + 8,
        fontSize: 10,
        fill: "#dc2626",
        textAlign: "center",
        originX: "center",
        originY: "center"
      });
    }

    // Create room group
    const roomGroup = new Group([roomRect, roomLabel, ...(extinguisherText ? [extinguisherText] : [])], {
      selectable: true,
      hoverCursor: "pointer"
    });

    // Add click handler
    roomGroup.on("mousedown", () => {
      setSelectedRoom(room.id);
      onRoomClick(room.id);
    });

    canvas.add(roomGroup);
  };

  return (
    <div className="relative w-full">
      <canvas ref={canvasRef} className="border border-primary/20 rounded-lg shadow-lg" />
      
      {/* Room Info Panel */}
      {selectedRoom && roomsData[selectedRoom] && (
        <Card className="absolute top-4 right-4 w-80 bg-card/95 backdrop-blur-sm border-primary/20 shadow-xl">
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-3">Room {selectedRoom}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FireExtinguisherIcon size="sm" />
                <span className="text-sm">
                  {roomsData[selectedRoom].fireExtinguishers.count} Fire Extinguisher(s)
                </span>
              </div>
              
              {roomsData[selectedRoom].fireExtinguishers.type && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Type:</label>
                  <p className="text-sm">{roomsData[selectedRoom].fireExtinguishers.type}</p>
                </div>
              )}
              
              {roomsData[selectedRoom].fireExtinguishers.capacity && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Capacity:</label>
                  <p className="text-sm">{roomsData[selectedRoom].fireExtinguishers.capacity}</p>
                </div>
              )}
              
              {roomsData[selectedRoom].fireExtinguishers.maintenance && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Last Maintenance:</label>
                  <p className="text-sm">{roomsData[selectedRoom].fireExtinguishers.maintenance}</p>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setSelectedRoom(null)}
              className="mt-3 text-xs text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};