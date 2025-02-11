import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getContractById } from "../../lib/contract";
import { Error } from "../../components/Error";
import { Loading } from "../../components/Loading";

export const DetailContract = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const data = await getContractById(id);
        setContract(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching contract:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContract();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

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
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                {contract?.title}
              </h1>
              <p className="text-2xl font-semibold text-indigo-600 mt-2">
                ${contract?.reward}
              </p>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${getStatusBadgeStyles(
                contract?.status
              )}`}
            >
              {contract?.status}
            </span>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 leading-relaxed">
              {contract?.description}
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Contract details
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-slate-500">
                  Creation date
                </dt>
                <dd className="text-base text-slate-900">
                  {new Date(contract?.createdAt).toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">
                  Last modification
                </dt>
                <dd className="text-base text-slate-900">
                  {new Date(contract?.updatedAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link to="/contract">
            <button className="bg-indigo-600 text-white py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              Back to contracts
            </button>
          </Link>

          {contract?.status === "Available" && (
            <div className="flex justify-end">
              <button className="bg-indigo-600 text-white py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                Apply for this contract
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailContract;
