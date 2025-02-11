import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Contract } from "./pages/Contract";
import { Home } from "./pages/Home";
export const App = () => {
  return (
    <div className="flex flex-col bg-primary">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contract" element={<Contract />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </div>
  );
};

export default App;
