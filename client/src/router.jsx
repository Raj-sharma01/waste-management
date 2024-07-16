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
import OfficerLayout from "./officer/OfficerLayout.jsx";
import OfficerDasboard from "./officer/OfficerDashboard.jsx";
import OfficerComplaintsList from "./officer/OfficerComplaintsList.jsx";
import LoginForm from "./pages/Login.jsx";
import SignupForm from "./pages/Signup.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import RoleProtection from "./routes/RoleProtention.jsx";
import AdminEvents from "./admin/AdminEvents.jsx";
import OfficerFacilityManagement from "./officer/OfficerFacilityManagement.jsx";

const router = createBrowserRouter([
    {
       path:'/login',
       element:<LoginForm/>
    },
    {
        path:'/signup',
        element:<SignupForm/>
    },
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                path: "/",
                element: <Dashboard />
            },
            {
                path: 'guide',
                element: <Guide />
            },
            {
                path: 'complaints',
                element:<ProtectedRoute><Complaints /></ProtectedRoute>
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
                element:<RoleProtection><AdminDasboard /></RoleProtection> 
            },
            {
                path: 'complaints',
                element:<RoleProtection><ComplaintList /></RoleProtection> 
            },
            {
                path: 'events',
                element:<RoleProtection> <AdminEvents/> </RoleProtection>
            },
            {
                path: 'officers',
                element: <RoleProtection><OfficerList /></RoleProtection>
            },
            {
                path: 'info',
                element:<RoleProtection> <Info /></RoleProtection>
            },
            {
                path: 'createofficer',
                element:<RoleProtection><CreateOfficer /></RoleProtection> 
            },
        ],
    },
    {
        path:'/officer',
        element:<RoleProtection><OfficerLayout/></RoleProtection>,
        children:[
            {
                path:'/officer',
                element:<RoleProtection><OfficerDasboard/></RoleProtection>
            },
            {
                path:'complaints',
                element:<RoleProtection><OfficerComplaintsList/></RoleProtection>
            },
            {
                path:'events',
                element:<RoleProtection><Events/></RoleProtection>
            },
            {
                path:'facitities',
                element:<RoleProtection><OfficerFacilityManagement/></RoleProtection>
            }
        ]
    },
    {
     path:'*',
     element:<PageNotFound/>
    }

])

export default router;