import { useState, useEffect } from "react";
import type { FormEvent, ReactNode } from "react";
import axios from "axios";
import { ActivityContext } from "./ActivityContext";
import type { Activity } from "../../lib/types";
import type { SelectChangeEvent } from "@mui/material";

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

  // Handle selecting an activity
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(activity => activity.id === id));
  }

  // Handle canceling activity selection
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  // Open form for editing or creating a new activity
  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectActivity(id);
      const activity = activities.find(activity => activity.id === id);
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
    let fullActivity: Activity;

    if (selectedActivity) {
      fullActivity = { ...selectedActivity, ...data }; // Merge old + new
    } else {
      fullActivity = data as unknown as Activity; // New activity
    }

    await SubmitForm(fullActivity);
  };

  // Function to submit the form data
  const SubmitForm = async (activity: Activity) => {
    try {
      if (activity.id) {
        console.log("Updating activity:", activity);
        await axios.put("https://localhost:5001/api/activities", activity)
          .then(() => {
            setActivities(activities.map(a => a.id === activity.id ? activity : a));
            handleCloseForm();
          })
          .catch(error => console.error("Failed to update activity:", error));
      }
      else {
        console.log("Creating new activity:", activity);
        const newActivity = { ...activity, id: crypto.randomUUID() }; // Generate a new ID
        await axios.post("https://localhost:5001/api/activities", newActivity)
        setActivities([...activities, newActivity]);
        handleCloseForm();
      }
    } catch (error) {
      console.error("Failed to submit activity:", error);
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
      await axios.delete(`https://localhost:5001/api/activities/${id}`);
      setActivities(activities.filter(activity => activity.id !== id));
      if (selectedActivity?.id === id) {
        handleCancelSelectActivity();
      }
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  }

  return (
    <ActivityContext.Provider value={{
      activities, setActivities, selectedActivity, editMode, handleSelectActivity, handleCancelSelectActivity,
      handleOpenForm, handleCloseForm, handleSubmitForm, categories, category, handleCategoryChange, handleDelete
    }}>
      {children}
    </ActivityContext.Provider>
  );
};
