import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const Card = ({ contract }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case "Available":
        return "bg-emerald-50 border-emerald-200 shadow-emerald-100 hover:shadow-emerald-200";
      case "Assigned":
        return "bg-amber-50 border-amber-200 shadow-amber-100 hover:shadow-amber-200";
      case "Completed":
        return "bg-blue-50 border-blue-200 shadow-blue-100 hover:shadow-blue-200";
      default:
        return "bg-slate-50 border-slate-200 shadow-slate-100 hover:shadow-slate-200";
    }
  };

  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case "Available":
        return "bg-emerald-100 text-emerald-800 ring-emerald-600/20";
      case "Assigned":
        return "bg-amber-100 text-amber-800 ring-amber-600/20";
      case "Completed":
        return "bg-blue-100 text-blue-800 ring-blue-600/20";
      default:
        return "bg-slate-100 text-slate-800 ring-slate-600/20";
    }
  };

  return (
    <div
      className={`rounded-xl border p-6 transition-all duration-300 hover:shadow-lg flex flex-col h-full justify-between ${getStatusStyles(
        contract.status
      )}`}
    >
      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-slate-800">
            {contract.title}
          </h2>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${getStatusBadgeStyles(
              contract.status
            )}`}
          >
            {contract.status}
          </span>
        </div>
        <p className="text-slate-600 mb-6 line-clamp-3">
          {contract.description}
        </p>
      </div>
      <div className="flex flex-col justify-between items-center gap-2">
        <Link to={`/contract/${contract.id}`} className="block w-full mt-auto">
          <button className="w-full text-white py-2.5 px-4 rounded-lg  transition-colors font-medium">
            View Contract
          </button>
        </Link>
        <Link
          to={`/contract/edit/${contract.id}`}
          className="block w-full mt-auto"
        >
          <button className="w-full text-white py-2.5 px-4 rounded-lg transition-colors font-medium">
            Edit{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

Card.propTypes = {
  contract: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["Available", "Assigned", "Completed"]).isRequired,
  }).isRequired,
};
