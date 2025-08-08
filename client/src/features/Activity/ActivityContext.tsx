// Updated ActivityContext.ts
import { createContext } from "react";
import type { Activity } from "../../lib/types";

export type ActivityContextType = {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  selectedActivity: Activity | undefined;
  handleSelectActivity: (id: string) => void;
  handleCancelSelectActivity: ()  => void;
};

export const ActivityContext = createContext<ActivityContextType | undefined>(undefined);
