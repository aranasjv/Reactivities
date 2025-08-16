import { Container, Typography } from "@mui/material"

export default function Homepage() {
  return (
    <Container maxWidth="xl" sx={{ marginTop: 1 }}>
        <Typography variant="h3" component="h1">
            Welcome to the Homepage
        </Typography>
        <Typography variant="body1">
            This is the homepage of our application. You can navigate to different sections using the menu.
        </Typography>
    </Container>
  )
}
