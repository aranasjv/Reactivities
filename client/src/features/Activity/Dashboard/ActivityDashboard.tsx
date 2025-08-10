// src/features/Activity/Dashboard/ActivityDashboard.tsx
import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../Details/ActivityDetails";
import { useActivityContext } from "../useActivityContext";
import ActivityForm from "../Form/ActivityForm";


export default function ActivityDashboard() {
    const {
        selectedActivity,
        editMode
    } = useActivityContext();

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList />
            </Grid2>
            <Grid2 size={5}>
                {selectedActivity && !editMode &&
                    <ActivityDetails />
                }
                 {editMode &&
                    <ActivityForm />}
            </Grid2>
        </Grid2>
    );
}
