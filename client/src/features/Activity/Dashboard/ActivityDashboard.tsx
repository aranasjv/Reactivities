// src/features/Activity/Dashboard/ActivityDashboard.tsx
import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../Details/ActivityDetails";
import { useActivityContext } from "../useActivityContext";


export default function ActivityDashboard() {
    const {
        selectedActivity
    } = useActivityContext();

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList />
            </Grid2>
            <Grid2 size={5}>
                {selectedActivity &&
                    <ActivityDetails />
                }
            </Grid2>
        </Grid2>
    );
}
