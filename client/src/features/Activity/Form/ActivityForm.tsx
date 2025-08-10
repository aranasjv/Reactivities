import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivityContext } from "../useActivityContext";


export default function ActivityForm() {
    const {
        selectedActivity,
        handleCloseForm,
        handleSubmitForm
    } = useActivityContext();

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                Activity Form
            </Typography>
            <Box component="form" onSubmit={handleSubmitForm} display="flex" flexDirection="column" gap={3}>
                <TextField name="Title" label="Title" defaultValue={selectedActivity?.title} />
                <TextField
                    name="Description"
                    label="Description"
                    multiline
                    rows={3}
                    defaultValue={selectedActivity?.description}
                />
                <TextField name="Category" label="Category" defaultValue={selectedActivity?.category} />
                <TextField name="Date" label="Date" type="date" defaultValue={selectedActivity?.date} />
                <TextField name="City" label="City" defaultValue={selectedActivity?.city} />
                <TextField name="Venue" label="Venue" defaultValue={selectedActivity?.venue} />
                <Box display="flex" justifyContent="end" gap={3} marginTop={3}>
                    <Button color="inherit" onClick={handleCloseForm}>
                        Cancel
                    </Button>
                    <Button color="success" type="submit" variant="contained">
                        Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}