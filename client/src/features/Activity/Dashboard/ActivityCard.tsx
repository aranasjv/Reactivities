import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import type { Activity } from "../../../lib/types"

type Props = {
    activity: Activity
     selectActivity: (id: string) => void;
     cancelSelectActivity?: (id: string) => void;
}

export default function ActivityCard({ activity, selectActivity }: Props) {
    return (
        <Card sx={{ borderRadius: 3, padding: 2, marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5">{activity.title}</Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1 }}>{activity.date}</Typography>
                <Typography variant="body2">{activity.description}</Typography>
                <Typography variant="subtitle1">{activity.city}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Chip label={activity.category} variant="outlined" />
                <Button onClick={() => selectActivity(activity.id)} size="medium" variant="contained">View</Button>
            </CardActions>
        </Card>
    )
}