import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Toaster } from "sonner"; 

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster richColors position="top-center" />
      <main className="flex-grow bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 mt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default App;
