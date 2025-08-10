import { CardContent, CardMedia, Typography, Card, CardActions, Button } from "@mui/material";
import { useActivityContext } from "../useActivityContext";

export default function ActivityDetails() {
        const {
            selectedActivity,
            handleCancelSelectActivity,
            handleOpenForm
        } = useActivityContext();
    
    return (
        <Card sx={{ borderRadius: 3, padding: 2, marginBottom: 2 }}>
            <CardMedia component='img' src={`/images/categoryImages/${selectedActivity?.category}.jpg`} />
            <CardContent>
                <Typography variant="h5">{selectedActivity?.title}</Typography>
                <Typography variant="subtitle1" fontWeight="light">{selectedActivity?.date}</Typography>
                <Typography variant="body1">{selectedActivity?.description}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button color="primary" variant="contained" onClick={() => {
                    handleOpenForm(selectedActivity?.id)}}> Edit</Button>
                <Button onClick={handleCancelSelectActivity} color="inherit" variant="outlined">Cancel</Button>
            </CardActions>
        </Card>
    )
}

