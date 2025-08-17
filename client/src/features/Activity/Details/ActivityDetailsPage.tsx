import { Typography, Grid } from "@mui/material";
import { useParams } from "react-router";
import { useActivities } from "../../../lib/types/hooks/useActivities";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

export default function ActivityDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const { activity, isLoadingActivityById } = useActivities(id);

    if (isLoadingActivityById) {
        return <Typography>Loading...</Typography>
    }

    if (!activity) {
        return <Typography>Activity Not Found</Typography>
    }

    return (
        <Grid container spacing={3}>
            <Grid size={8}>
                <ActivityDetailsHeader activity={activity} />
                <ActivityDetailsInfo activity={activity} />
                <ActivityDetailsChat />
            </Grid>
            <Grid size={4}>
                <ActivityDetailsSidebar />
            </Grid>
        </Grid>
    )
}

