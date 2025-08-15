import { CardContent, CardMedia, Typography, Card, CardActions, Button } from "@mui/material";
import { useActivityContext } from "../Context/useActivityContext";
import { useActivities } from "../../../lib/types/hooks/useActivities";

export default function ActivityDetails() {
        const {
            selectedActivity,
            handleCancelSelectActivity,
            handleOpenForm
        } = useActivityContext();

          const { activities } = useActivities(); 
          const activity = activities?.find(activity => activity.id === selectedActivity?.id);

        if (!selectedActivity || !activity) {
            return <Typography>Loading...</Typography>
        }
    
    return (
        <Card sx={{ borderRadius: 3, padding: 2, marginBottom: 2 }}>
            <CardMedia component='img' src={`/images/categoryImages/${activity?.category}.jpg`} />
            <CardContent>
                <Typography variant="h5">{activity?.title}</Typography>
                <Typography variant="subtitle1" fontWeight="light">{activity?.date}</Typography>
                <Typography variant="body1">{activity?.description}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button color="primary" variant="contained" onClick={() => {
                    handleOpenForm(activity?.id)}}> Edit</Button>
                <Button onClick={handleCancelSelectActivity} color="inherit" variant="outlined">Cancel</Button>
            </CardActions>
        </Card>
    )
}

