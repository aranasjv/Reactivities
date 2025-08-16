import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography, type SelectChangeEvent } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useState, type FormEvent } from "react";
import { useActivities } from "../../../lib/types/hooks/useActivities";
import { Link, useNavigate, useParams } from "react-router";
import type { Activity } from "../../../lib/types";

export default function ActivityForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { activity, isLoadingActivityById, updateActivity, createActivity } = useActivities(id);

    // manage category and date with state
    const [category, setCategory] = useState(activity?.category || "");
    const [date, setDate] = useState<Dayjs | null>(activity?.date ? dayjs(activity.date) : null);

    // Handle form submission
    const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data: { [key: string]: FormDataEntryValue } = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        data["category"] = category;
        data["date"] = date ? date.toISOString() : "";

        if (activity) {
            data.id = activity.id;
            await updateActivity(data as unknown as Activity);
            navigate(`/activity/${activity.id}`);
        }
        else {
            await createActivity(data as unknown as Activity, {
                onSuccess: (id) => {
                    navigate(`/activity/${id}`);
                }
            });
        }
    };

    // Handle category change
    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };

    if (isLoadingActivityById) {
        return <Typography>Loading activity...</Typography>;
    }

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
               {activity ? 'Edit Activity' : 'Create Activity'} 
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmitForm}
                display="flex"
                flexDirection="column"
                gap={3}
            >
                <TextField name="title" label="Title" defaultValue={activity?.title} />
                <TextField name="description" label="Description" multiline rows={3} defaultValue={activity?.description} />

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
                        {["drinks","culture","music","film","food","travel","sports","games"].map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                        
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Date"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                variant: 'outlined',
                            },
                        }}
                    />
                </LocalizationProvider>

                <TextField name="city" label="City" defaultValue={activity?.city} />
                <TextField name="venue" label="Venue" defaultValue={activity?.venue} />

                <Box display="flex" justifyContent="end" gap={3} marginTop={3}>
                    <Button
                        color="inherit"
                        component={Link}
                        to={activity?.id ? `/activity/${activity.id}` : "/activities"}
                    >
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
