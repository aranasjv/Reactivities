import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/Activity/Dashboard/ActivityDashboard";
import { ActivityProvider } from "../../features/Activity/Context/ActivityProvider";

function App() {
  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <ActivityProvider>
        <NavBar />
        <Container maxWidth="xl" sx={{ marginTop: 1 }}>
          <ActivityDashboard />
        </Container>
      </ActivityProvider>
    </Box>
  );
}

export default App;
