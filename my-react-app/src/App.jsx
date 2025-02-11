import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Contract } from "./pages/contract/Contract";
import { CreateContract } from "./pages/contract/CreateContract";
import { DetailContract } from "./pages/contract/DetailContract";
import { EditContract } from "./pages/contract/EditContract";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { WitcherProvider } from "./context/WitcherContext";
import { Navbar } from "./components/Navbar";

export const App = () => {
  return (
    <WitcherProvider>
      <div className="flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/contract/:id" element={<DetailContract />} />
            <Route path="/contract/create" element={<CreateContract />} />
            <Route path="/contract/edit/:id" element={<EditContract />} />
            <Route path="/login" element={<Login />} />
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
            theme="dark"
          />
        </Router>
      </div>
    </WitcherProvider>
  );
};

export default App;
