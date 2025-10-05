import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationProps {
  onFloorSelect: (floor: string) => void;
  currentFloor?: string;
}

export const Navigation = ({ onFloorSelect, currentFloor }: NavigationProps) => {
  const handleExternalLink = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSd2KCXwCCC1wVyOVeoOrsdmrHe-n_ktQvywJ69WCHXMns0PnQ/viewform?usp=dialog", "_blank");
  };

  return (
    <nav>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-card/95 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground shadow-lg"
          >
            <Menu className="h-4 w-4 mr-2" />
            {currentFloor ? `${currentFloor} Floor` : "Menu"}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-48 bg-card/95 backdrop-blur-sm border-primary/20 shadow-xl"
        >
          <DropdownMenuItem 
            onClick={() => onFloorSelect("1st")}
            className="cursor-pointer hover:bg-room-hover focus:bg-room-hover"
          >
            1st Floor Map
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFloorSelect("2nd")}
            className="cursor-pointer hover:bg-room-hover focus:bg-room-hover"
          >
            2nd Floor Map
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFloorSelect("3rd")}
            className="cursor-pointer hover:bg-room-hover focus:bg-room-hover"
          >
            3rd Floor Map
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFloorSelect("4th")}
            className="cursor-pointer hover:bg-room-hover focus:bg-room-hover"
          >
            4th Floor Map
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={handleExternalLink}
            className="cursor-pointer hover:bg-accent/10 focus:bg-accent/10 text-accent font-medium"
          >
            Donate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};