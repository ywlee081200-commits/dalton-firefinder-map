export interface FireExtinguisherData {
  count: number;
  type?: string;
  capacity?: string;
  maintenance?: string;
}

export interface RoomData {
  id: string;
  name: string;
  fireExtinguishers: FireExtinguisherData;
  dateChecked?: string;
}

export interface FloorData {
  floor: string;
  rooms: Record<string, RoomData>;
}

export type FloorNumber = "1st" | "2nd" | "3rd" | "4th";