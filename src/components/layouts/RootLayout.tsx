import { Outlet } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <>
      <div className={"font-inter mx-auto"}>
        <Outlet />
      </div>
      <ToastContainer limit={4} position={"top-center"} />
    </>
  );
};

export default RootLayout;
