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
    maintenance: room?.fireExtinguishers?.maintenance || "",
    dateChecked: new Date().toISOString().split('T')[0] // Today's date in YYYY-MM-DD format
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
      },
      dateChecked: formData.dateChecked
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
      <Card className="w-full max-w-lg bg-card/95 backdrop-blur-sm border-primary/20 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            🧯 Fire Extinguisher Checklist - Room {roomId}
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
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-emergency-bg p-4 rounded-lg space-y-4">
              <h3 className="font-medium text-sm text-accent mb-3">Fire Extinguisher Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="count" className="text-sm font-medium">Number of Fire Extinguishers *</Label>
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
                <Label htmlFor="type" className="text-sm font-medium">Type</Label>
              <Input
                id="type"
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                placeholder="e.g., ABC Dry Chemical"
                className="w-full"
              />
            </div>

              <div className="space-y-2">
                <Label htmlFor="capacity" className="text-sm font-medium">Capacity</Label>
              <Input
                id="capacity"
                value={formData.capacity}
                onChange={(e) => handleInputChange("capacity", e.target.value)}
                placeholder="e.g., 5 lbs"
                className="w-full"
              />
            </div>

              <div className="space-y-2">
                <Label htmlFor="maintenance" className="text-sm font-medium">Last Maintenance Date</Label>
                <Input
                  id="maintenance"
                  type="date"
                  value={formData.maintenance}
                  onChange={(e) => handleInputChange("maintenance", e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateChecked" className="text-sm font-medium">Date Checked *</Label>
                <Input
                  id="dateChecked"
                  type="date"
                  value={formData.dateChecked}
                  onChange={(e) => handleInputChange("dateChecked", e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90">
                ✓ Save Checklist
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