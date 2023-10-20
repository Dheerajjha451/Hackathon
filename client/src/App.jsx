import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import MainLayout from "./Pages/More/MainLayout";
import SearchPage from "./Pages/Search/SearchPage";
import About from "./Pages/About/About";

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
            {
              path: "/Search",
              element: <SearchPage/>,
            },
            {
              path: "/about",
              element: <About/>,
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