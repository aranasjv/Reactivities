// src/features/Activity/Dashboard/ActivityList.tsx
import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivityContext } from "../useActivityContext";



export default function ActivityList() {
     const {
            activities,
            handleSelectActivity,
        } = useActivityContext();
        
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} selectActivity={handleSelectActivity}/>
      ))}
    </Box>
  );
}

