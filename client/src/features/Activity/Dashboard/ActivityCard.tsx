import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import type { Activity } from "../../../lib/types";
import { Link } from "react-router";
import { AccessTime, Place } from "@mui/icons-material";
import { formatDate } from "../../../lib/util/util";


type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  const isHost = false;
  const isGoing = false;
  const label = isHost ? 'You are hosting' : 'You are going';
  const isCancelled = false;
  const colorIsHost = isHost ? 'secondary' : isGoing ? 'Warning' : 'default';

  return (
    <Card elevation={3} sx={{ borderRadius: 3, padding: 2, marginBottom: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <CardHeader
          avatar={<Avatar sx={{ height: 80, width: 80 }} />}
          title={activity.title}
          slotProps={{
            fontWeight: 'bold',
            fontSize: 20
          }}
          subheader={
            <>
              Hosted by{' '} <Link to={`/profile/bob`}>Bob</Link>
            </>
          }
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mr: 2 }}>
          {(isHost || isGoing) && <Chip label={label} sx={{ borderRadius: 2, color: { colorIsHost } }} />}
          {(isCancelled) && <Chip label={label} sx={{ borderRadius: 2, color: 'error' }} />}
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, px: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 0,
              flexWrap: 'nowrap',
              alignItems: 'center'
            }}
          >
            <AccessTime sx={{ mr: 1 }} />
            <Typography variant="body2" flexWrap={'nowrap'}>
              {formatDate(activity.date)}
            </Typography>
          </Box>
          <Place sx={{ ml: 3, mr: 1 }} />
          <Typography variant="body2">{activity.venue}</Typography>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', gap: 2, backgroundColor: 'grey.200', py: 3, pl: 3 }}>
          Attendees go here
        </Box>
      </CardContent>
      <CardActions sx={{ pb: 2 }}>
        <Typography variant="body2">{activity.description}</Typography>
      </CardActions>
      <Button component={Link} to={`/activity/${activity.id}`} variant="contained" size="medium" sx={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3 }}>
        View
      </Button>
    </Card>
  );
}