import { useState, useEffect } from "react";
import type { FormEvent, ReactNode } from "react";
import axios from "axios";
import { ActivityContext } from "./ActivityContext";
import type { Activity } from "../../lib/types";

type Props = {
  children: ReactNode;
};

export const ActivityProvider = ({ children }: Props) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

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

  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    // You can now use `data` as needed
    console.log(data);
  };


  return (
    <ActivityContext.Provider value={{
      activities, setActivities, selectedActivity, editMode, handleSelectActivity, handleCancelSelectActivity,
      handleOpenForm, handleCloseForm, handleSubmitForm
    }}>
      {children}
    </ActivityContext.Provider>
  );
};
