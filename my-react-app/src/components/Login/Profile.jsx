import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const Profile = ({ currentWitcher, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-10 border border-slate-100">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Welcome back
            </h1>
            <p className="text-slate-600">You are logged in as a Witcher</p>
          </div>

          <div className="flex flex-col items-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-lg opacity-20"></div>
              <img
                src={currentWitcher.avatar}
                alt={currentWitcher.name}
                className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800">
                {currentWitcher.name}
              </h2>
              <p className="text-slate-500 mt-1">Professional Monster Hunter</p>
            </div>

            <div className="flex gap-4 w-full mt-8">
              <button
                onClick={() => navigate("/contract")}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                View Contracts
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 py-3 px-6 rounded-xl hover:from-slate-200 hover:to-slate-300 transition-all duration-200 font-medium border border-slate-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  currentWitcher: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};
