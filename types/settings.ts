import { Timestamp } from "firebase/firestore";

export interface Settings {
  id: string;
  theme: "light" | "dark" | "system";
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
