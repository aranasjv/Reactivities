import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router";
import "./style.css";
import Homepage from "../../features/Home/Homepage";

function App() {
  const location = useLocation();
  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      {location.pathname === '/' ? <Homepage /> : (
        <>
          <NavBar />
          <Container maxWidth="xl" sx={{ marginTop: 3 }}>
            <Outlet />
          </Container>
        </>
      )}

    </Box>
  );
}

export default App;
