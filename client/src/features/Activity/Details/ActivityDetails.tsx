import { CardContent, CardMedia, Typography, Card, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/types/hooks/useActivities";

export default function ActivityDetails() {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();

    const {activity, isLoadingActivityById} = useActivities(id);

    if (isLoadingActivityById) {
        return <Typography>Loading...</Typography>
    }
    
    if (!activity) {
        return <Typography>Activity Not Found</Typography>
    }

    return (
        <Card sx={{ borderRadius: 3, padding: 2, marginBottom: 2 }}>
            <CardMedia component='img' src={`/images/categoryImages/${activity?.category}.jpg`} />
            <CardContent>
                <Typography variant="h5">{activity?.title}</Typography>
                <Typography variant="subtitle1" fontWeight="light">{activity?.date}</Typography>
                <Typography variant="body1">{activity?.description}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex' }}>
                <Button component={Link} to={`/updateActivity/${activity.id}`} color="primary" variant="contained" > Edit</Button>
                <Button onClick={() => navigate('/activities')} color="inherit" variant="outlined">Cancel</Button>
            </CardActions>
        </Card>
    )
}

