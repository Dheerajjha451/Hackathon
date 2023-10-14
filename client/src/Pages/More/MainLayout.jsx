import { Outlet } from "react-router-dom";
import Footer from "../../assets/Component/Footer";
import Navbar from "../../assets/Component/Navbar";

const MainLayout = () => {

  return (
    <div className="">
      <Navbar/>
      <div className="">
        <Outlet />
        <Footer/>
      </div>
    </div>
  );
};

export default MainLayout;