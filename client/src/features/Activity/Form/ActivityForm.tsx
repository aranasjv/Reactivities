import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useActivityContext } from "../useActivityContext";
import dayjs from 'dayjs';
import React from "react";

export default function ActivityForm() {
    const {
        selectedActivity,
        handleCloseForm,
        handleSubmitForm,
        categories,
        category,
        handleCategoryChange
    } = useActivityContext();

      const [dateValue, setValue] = React.useState(
    selectedActivity?.date ? dayjs(selectedActivity.date) : null
  );


    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                Activity Form
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmitForm}
                display="flex"
                flexDirection="column"
                gap={3}
            >
                <TextField name="title" label="Title" defaultValue={selectedActivity?.title} />
                <TextField name="description" label="Description" multiline rows={3} defaultValue={selectedActivity?.description} />

                {/* Dropdown for Category */}
                <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        name="category"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Date"
                    name="date"
                    value={dateValue}
                    onChange={(newValue) => setValue(newValue)}
                    slotProps={{
                    textField: {
                        fullWidth: true,
                        variant: 'outlined',
                    },
                    }}
                />
                </LocalizationProvider>

                <TextField name="city" label="City" defaultValue={selectedActivity?.city} />
                <TextField name="venue" label="Venue" defaultValue={selectedActivity?.venue} />

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
