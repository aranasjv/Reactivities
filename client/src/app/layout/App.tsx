import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/Activity/Dashboard/ActivityDashboard";
import { ActivityProvider } from "../../features/Activity/ActivityProvider";

function App() {
  return (
    <ActivityProvider>
      <Box sx={{ bgcolor: '#eeeeee' }}>
        <CssBaseline />
        <NavBar />
        <Container maxWidth="xl" sx={{ marginTop: 1 }}>
          <ActivityDashboard />
        </Container>
      </Box>
    </ActivityProvider>
  );
}

export default App;
