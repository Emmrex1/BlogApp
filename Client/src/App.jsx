import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "./components/ui/sonner";


function App() {

  return (
    <>
      <div className="bg-white min-h-screen flex flex-col">
        <nav>
          <Navbar />
        </nav>
        <Toaster richColors position="top-center" />
        <div className=" flex-grow">
          <Outlet />
        </div>
        <footer className="mt-auto">Footer</footer>
      </div>
    </>
  );
}

export default App
