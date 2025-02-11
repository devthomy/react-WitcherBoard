import { useEffect, useState } from "react";
import getContract from "../lib/contract";

export const Contract = () => {
  const [contracts, setContracts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await getContract();
        setContracts(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching contracts:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContracts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center gap-4">
        <div className="text-red-500 text-xl font-semibold">Error: {error}</div>
      </div>
    );
  }

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
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-slate-800 sm:text-5xl md:text-6xl text-center mb-12">
          Available Contracts
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contracts?.map((contract) => (
            <div
              key={contract.id}
              className={`rounded-xl border p-6 transition-all duration-300 hover:shadow-lg ${getStatusStyles(
                contract.status
              )}`}
            >
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
              <p className="text-slate-600 mb-4 line-clamp-3">
                {contract.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contract;
