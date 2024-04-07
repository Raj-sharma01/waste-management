import { createBrowserRouter } from "react-router-dom";
import Guide from "./user/Guide.jsx";
import Dashboard from "./user/Dashboard.jsx";
import AppLayout from "./AppLayout.jsx";
import Report from "./user/Report.jsx";
import Events from "./user/Events.jsx";

const router=createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        children:[
            {
                path:"/",
                element:<Dashboard/>
            },
            {
                path:'guide',
                element:<Guide/>
            },
            {
                path:'report',
                element:<Report/>
            },
            {
                path:'events',
                element:<Events/>
            }
        ],
    },
   
])

export default router;