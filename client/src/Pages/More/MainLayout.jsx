import { Outlet } from "react-router-dom";
import Footer from "../../assets/Component/Footer";
import Navbar from "../../assets/Component/Navbar";

const MainLayout = () => {

  return (
    <div className="">
      <Navbar/>
      <div className="py-0">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;