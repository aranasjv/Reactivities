import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { ActivityContext } from "./ActivityContext";
import type { Activity } from "../../../lib/types";
import { type SelectChangeEvent } from "@mui/material";
import { useActivities } from "../../../lib/types/hooks/useActivities";

type Props = {
  children: ReactNode;
};

export const ActivityProvider = ({ children }: Props) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const { activities, isPendingSelectAll, updateActivity, isPendingUpdate, createActivity, isPendingCreate, deleteActivity, isPendingDelete } = useActivities();

  // Handle selecting an activity
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(activity => activity.id === id));
  }

  // Handle canceling activity selection
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  // Open form for editing or creating a new activity
  const handleOpenForm = (id?: string) => {
    if (editMode) {
      return; // Prevent opening form if already in edit mode
    }
    setCategory(""); // Reset category when opening form
    if (id) {
      handleSelectActivity(id);
      const activity = activities!.find(activity => activity.id === id);
      setCategory(activity?.category || "");
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  // Handle form submission
  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    data["category"] = category;
    data["date"] = new Date(data["date"] as string).toISOString();

    if (selectedActivity) {
      data.id = selectedActivity.id;
      await updateActivity(data as unknown as Activity); 
      handleCloseForm();
    }
    else{
      await createActivity(data as unknown as Activity);
      handleCloseForm();
    }
  };



  // State for category dropdown
  const categories = [
    "drinks",
    "culture",
    "music",
    "film",
    "food",
    "travel",
    "sports",
    "games"
  ];

  // State for selected category
  const [category, setCategory] = useState(selectedActivity?.category || "");

  // Handle category change
  const handleCategoryChange = (event: SelectChangeEvent) => {
    console.log("Category changed:", event.target.value);
    setCategory(event.target.value);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteActivity(id);
      if (selectedActivity?.id === id) {
        handleCancelSelectActivity();
      }
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  }

  return (
    <ActivityContext.Provider value={{
      activities: activities || [],
      selectedActivity,
      isPendingSelectAll,
      isPendingUpdate,
      isPendingCreate,
      isPendingDelete,
      editMode,
      handleSelectActivity,
      handleCancelSelectActivity,
      handleOpenForm,
      handleCloseForm,
      handleSubmitForm,
      categories,
      category,
      handleCategoryChange,
      handleDelete
    }}>
      {children}
    </ActivityContext.Provider>
  );
}