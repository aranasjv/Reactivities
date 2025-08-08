import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { ActivityContext } from "./ActivityContext";
import type { Activity } from "../../lib/types";

type Props = {
  children: ReactNode;
};

export const ActivityProvider = ({ children }: Props) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/Activities")
      .then(response => setActivities(response.data))
      .catch(error => console.error("Failed to fetch activities:", error));
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(activity => activity.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  return (
    <ActivityContext.Provider value={{ activities, setActivities, selectedActivity, handleSelectActivity, handleCancelSelectActivity  }}>
      {children}
    </ActivityContext.Provider>
  );
};
