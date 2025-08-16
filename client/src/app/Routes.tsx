import { createBrowserRouter } from "react-router";
import App from "./layout/App";
import Homepage from "../features/Home/Homepage";
import ActivityForm from "../features/Activity/Form/ActivityForm";
import ActivityDashboard from "../features/Activity/Dashboard/ActivityDashboard";
import ActivityDetails from "../features/Activity/Details/ActivityDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: '', element: <Homepage /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activity/:id', element: <ActivityDetails /> },
            { path: 'createActivity', element: <ActivityForm key={'create'} /> },
            { path: 'updateActivity/:id', element: <ActivityForm /> }
        ]
    }
])