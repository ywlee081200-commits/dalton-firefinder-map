import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FireExtinguisherIcon } from "./FireExtinguisherIcon";
import { RoomData } from "@/types/SafetyMap";

interface RoomInfoPanelProps {
  room: RoomData;
  onClose: () => void;
}

export const RoomInfoPanel = ({ room, onClose }: RoomInfoPanelProps) => {
  const { fireExtinguishers } = room;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm border-primary/20 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">
            Room {room.name}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: fireExtinguishers.count }, (_, i) => (
                <FireExtinguisherIcon key={i} size="md" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {fireExtinguishers.count} Fire Extinguisher{fireExtinguishers.count !== 1 ? 's' : ''}
            </span>
          </div>

          {fireExtinguishers.type && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Type:</label>
              <p className="text-sm">{fireExtinguishers.type}</p>
            </div>
          )}

          {fireExtinguishers.capacity && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Capacity:</label>
              <p className="text-sm">{fireExtinguishers.capacity}</p>
            </div>
          )}

          {fireExtinguishers.maintenance && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Maintenance:</label>
              <p className="text-sm">{fireExtinguishers.maintenance}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};