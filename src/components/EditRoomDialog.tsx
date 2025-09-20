import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { RoomData } from "@/types/SafetyMap";

interface EditRoomDialogProps {
  roomId: string;
  room?: RoomData;
  onSave: (data: RoomData) => void;
  onClose: () => void;
}

export const EditRoomDialog = ({ roomId, room, onSave, onClose }: EditRoomDialogProps) => {
  const [formData, setFormData] = useState({
    count: room?.fireExtinguishers?.count || 0,
    type: room?.fireExtinguishers?.type || "",
    capacity: room?.fireExtinguishers?.capacity || "",
    maintenance: room?.fireExtinguishers?.maintenance || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: roomId,
      name: roomId,
      fireExtinguishers: {
        count: formData.count,
        type: formData.type,
        capacity: formData.capacity,
        maintenance: formData.maintenance
      }
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm border-primary/20 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">
            Edit Room {roomId}
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
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="count">Number of Fire Extinguishers</Label>
              <Input
                id="count"
                type="number"
                min="0"
                value={formData.count}
                onChange={(e) => handleInputChange("count", parseInt(e.target.value) || 0)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                placeholder="e.g., ABC Dry Chemical"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                value={formData.capacity}
                onChange={(e) => handleInputChange("capacity", e.target.value)}
                placeholder="e.g., 5 lbs"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maintenance">Last Maintenance</Label>
              <Input
                id="maintenance"
                value={formData.maintenance}
                onChange={(e) => handleInputChange("maintenance", e.target.value)}
                placeholder="e.g., 2024-01-15"
                className="w-full"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" className="flex-1">
                Save
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};