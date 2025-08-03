import { useState, useEffect } from "react";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch('https://localhost:5001/api/Activities')
      .then(response => response.json())
      .then(data => setActivities(data))

    return () => { }
  }, [])

  const title = 'Welcome to Reactivities';
  return (
    <div>
      <h3 className="app" style={{ color: 'red' }}>{title}</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
