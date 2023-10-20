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
            
         
          ]
        },
      ]);
      return (
        <div className="App">
          <RouterProvider router={router}/>
        </div>
      )
}