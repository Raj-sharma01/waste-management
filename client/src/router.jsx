import { createBrowserRouter } from "react-router-dom";
import Guide from "./user/Guide.jsx";
import Dashboard from "./user/Dashboard.jsx";
import Events from "./user/Events.jsx";
import Complaints from "./user/Complaints.jsx";
import UserLayout from "./user/UserLayout.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminDasboard from "./admin/AdminDasboard.jsx";
import ComplaintList from "./admin/ComplaintList.jsx";
import OfficerList from "./admin/OfficerList.jsx";
import Info from "./admin/Info.jsx";
import CreateOfficer from "./admin/CreateOfficer.jsx";

const router = createBrowserRouter([
    {
        path: "/user",
        element: <UserLayout />,
        children: [
            {
                path: "/user",
                element: <Dashboard />
            },
            {
                path: 'guide',
                element: <Guide />
            },
            {
                path: 'complaints',
                element: <Complaints />
            },
            {
                path: 'events',
                element: <Events />
            }
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "/admin",
                element: <AdminDasboard />
            },
            {
                path: 'complaints',
                element: <ComplaintList />
            },
            {
                path: 'events',
                element: <Events />
            },
            {
                path: 'officers',
                element: <OfficerList />
            },
            {
                path: 'info',
                element: <Info />
            },
            {
                path: 'createofficer',
                element: <CreateOfficer />
            },
        ],
    },

])

export default router;