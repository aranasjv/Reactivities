import { createBrowserRouter, Navigate } from "react-router";
import App from "./layout/App";
import Homepage from "../features/Home/Homepage";
import ActivityForm from "../features/activities/Form/ActivityForm";
import ActivityDashboard from "../features/activities/Dashboard/ActivityDashboard";
import ActivityDetailsPage from "../features/activities/Details/ActivityDetailsPage";
import Counter from "../features/counter/Counter";
import TestErrors from "../features/error/TestError";
import NotFound from "../features/error/NotFound";
import ServerError from "../features/error/ServerError";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: '', element: <Homepage /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activity/:id', element: <ActivityDetailsPage /> },
            { path: 'createActivity', element: <ActivityForm key={'create'} /> },
            { path: 'updateActivity/:id', element: <ActivityForm /> },
            { path: 'counter', element: <Counter /> },
            { path: 'error', element: <TestErrors /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    }
])