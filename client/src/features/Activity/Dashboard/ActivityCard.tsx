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
import { useActivityContext } from "../useActivityContext";

type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  const {
    handleSelectActivity,
    handleCloseForm,
    handleDelete
  } = useActivityContext(); // Access directly

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
          <Button variant="outlined" color="primary" size="medium" 
          onClick={() => {
            handleCloseForm();
            handleSelectActivity(activity.id); }}> View </Button>
          <Button variant="outlined" color="error" size="medium" onClick={() => handleDelete(activity.id)}> Delete </Button>
        </Box>
      </CardActions>
    </Card>
  );
}