import { List, ListItem, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/Activities')
      .then(response => setActivities(response.data))

    return () => { }
  }, [])

  const title = 'Welcome to Reactivities';
  return (
    <>
      <Typography variant='h3'>{title}</Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>{activity.title}</ListItem>
        ))}
      </List>
    </>
  )
}

export default App
