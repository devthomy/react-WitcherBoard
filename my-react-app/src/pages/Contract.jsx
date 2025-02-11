import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getContract } from "../lib/contract";

export const Contract = () => {
  const [contracts, setContracts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [titleFilter, setTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (titleFilter) queryParams.append("title", titleFilter);
        if (statusFilter) queryParams.append("status", statusFilter);

        const data = await getContract(queryParams);
        setContracts(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching contracts:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContracts();
  }, [titleFilter, statusFilter]);

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

        <div className="mb-8 flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Titre
            </label>
            <div className="relative">
              <input
                type="text"
                id="title"
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-4 pr-10 shadow-sm placeholder:text-slate-400 text-slate-800 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                placeholder="Rechercher un contrat..."
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex-1">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Statut
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 py-2.5 px-4 shadow-sm text-slate-800 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none appearance-none bg-white cursor-pointer"
            >
              <option value="">Tous les statuts</option>
              <option value="Available">Disponible</option>
              <option value="Assigned">Assigné</option>
              <option value="Completed">Terminé</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contracts?.map((contract) => (
            <div
              key={contract.id}
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
              <Link
                to={`/contract/${contract.id}`}
                className="block w-full mt-auto"
              >
                <button className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Voir le contrat
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contract;
