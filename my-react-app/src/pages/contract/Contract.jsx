import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/Card";
import { Error } from "../../components/Error";
import { Loading } from "../../components/Loading";
import { getContract } from "../../lib/contract";

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
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row gap-6 mt-10">
          <div className="flex-1">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Title
            </label>
            <div className="relative">
              <input
                type="text"
                id="title"
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-4 pr-10 shadow-sm placeholder:text-slate-400 text-slate-800 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                placeholder="Search a contract..."
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
              Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 py-2.5 px-4 shadow-sm text-slate-800 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none appearance-none  cursor-pointer"
            >
              <option value="">All statuses</option>
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/contract/create" className="block">
            <div className="rounded-xl border border-dashed border-slate-300 p-6 transition-all duration-300 hover:shadow-lg flex flex-col h-full justify-center items-center bg-slate-50 hover:bg-slate-100 cursor-pointer min-h-[250px]">
              <div className="text-slate-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <p className="text-slate-600 font-medium text-lg">
                Add a contract
              </p>
            </div>
          </Link>

          {contracts?.map((contract) => (
            <Card key={contract.id} contract={contract} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contract;
