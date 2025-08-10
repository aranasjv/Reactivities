// Updated ActivityContext.ts
import { createContext, type FormEvent } from "react";
import type { Activity } from "../../lib/types";

export type ActivityContextType = {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  selectedActivity: Activity | undefined;
  editMode: boolean;
  handleSelectActivity: (id: string) => void;
  handleCancelSelectActivity: ()  => void;
  handleOpenForm: (id?: string) => void;
  handleCloseForm: () => void;
  handleSubmitForm: (event: FormEvent<HTMLFormElement>) => void;
};

export const ActivityContext = createContext<ActivityContextType | undefined>(undefined);
