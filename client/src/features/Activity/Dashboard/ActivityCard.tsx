import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
Typography,
} from "@mui/material";
import type { Activity } from "../../../lib/types";
import { useActivities } from "../../../lib/types/hooks/useActivities";
import { Link } from "react-router";


type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  const {
    deleteActivity,
    isPendingDelete
  } = useActivities(); // Access directly

  return (
    <Card sx={{ borderRadius: 3, padding: 2, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography sx={{ color: "text.secondary", mb: 1 }}>
          {activity.date}
        </Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1">{activity.city}</Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Chip label={activity.category} variant="outlined" />
        <Box display={"flex"} gap={2}>
          <Button component={Link} to={`/activity/${activity.id}`} variant="outlined" color="primary" size="medium" loading={isPendingDelete}>
            View
          </Button>
          <Button loading={isPendingDelete} variant="outlined" color="error" size="medium" onClick={() => deleteActivity(activity.id)}> Delete </Button>
        </Box>
      </CardActions>
    </Card>
  );
}