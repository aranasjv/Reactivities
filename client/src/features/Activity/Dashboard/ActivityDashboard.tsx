// src/features/Activity/Dashboard/ActivityDashboard.tsx
import { Grid2, Typography } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../Details/ActivityDetails";
import { useActivityContext } from "../Context/useActivityContext";
import ActivityForm from "../Form/ActivityForm";

export default function ActivityDashboard() {
    const {
        selectedActivity,
        isPendingSelectAll,
        editMode
    } = useActivityContext();

    return (
        isPendingSelectAll ? (
            <Grid2 container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
                <Typography>Loading...</Typography>
            </Grid2>
        ) : (
            <Grid2 container spacing={3}>
                <Grid2 size={7}>
                    <ActivityList />
                </Grid2>
                <Grid2 size={5}>
                    {selectedActivity && !editMode && <ActivityDetails />}
                    {editMode && <ActivityForm />}
                </Grid2>
            </Grid2>
        )
    );
}
