import { Link } from "react-router-dom";
import { useWitcher } from "../context/WitcherContext";
import Wizard from "../assets/wizard.webp";
export const Navbar = () => {
  const { currentWitcher, setCurrentWitcher } = useWitcher();

  const handleLogout = () => {
    setCurrentWitcher(null);
  };

  return (
    <nav className="bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/contract"
              className="flex items-center px-2 py-2 text-slate-700 hover:text-indigo-600"
            >
              <img src={Wizard} alt="logo" className="w-12 h-12" />
            </Link>
          </div>

          <div className="flex items-center">
            <Link
              to="/contract"
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-800 hover:text-indigo-600"
            >
              <span className="text-slate-800">Contracts</span>
            </Link>

            {currentWitcher ? (
              <div className="flex items-center ml-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full mr-4">
                  <Link to="/login" className="flex items-center gap-2">
                    <img
                      src={currentWitcher.avatar}
                      alt={currentWitcher.name}
                      className="w-6 h-6 rounded-full object-cover ring-2 ring-indigo-600"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      {currentWitcher.name}
                    </span>
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-4 bg-slate-800 text-white px-4 py-2 rounded-lg  transition-colors text-sm font-medium"
              >
                <span className="text-white">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
