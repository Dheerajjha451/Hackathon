import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import MainLayout from "./Pages/More/MainLayout";

export default function App(){
    const router = createBrowserRouter([
        {
          path:"/",
          element:<MainLayout/>,
          children:[
            {
              path: "/",
              element: <Home/>,
            },
            
            
        //       path:"/Resources",
        //       children:[
        //         {
                  
        //           path:"/Resources/:Slugs",
        //           element:<Resources/>
        //         }
        //       ]
        //     },
        //     {
        //       path:"/Skills",
        //       children:[
        //         {
                  
        //           path:"/Skills/:Slugs",
        //           element:<Skill/>
        //         }
        //       ]
        //     }
        //   ]
        // }
          
        // {
        //   path: "/events",
        //   children: [
        //     {
        //       path: '/Case_Study',
        //       element: <CaseStudies/>,
        //     },
        //     {
        //       path: '/Case_Dtudy/:Case_Slug',
        //       element: <SingleCase/>,
        //     }
          ]
        },
      ]);
      return (
        <div className="App">
          <RouterProvider router={router}/>
        </div>
      )
}