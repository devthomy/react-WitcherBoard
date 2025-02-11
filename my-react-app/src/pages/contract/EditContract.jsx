import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateContract, getContractById } from "../../lib/contract";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";

export const EditContract = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState({
    title: "",
    description: "",
    reward: "",
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reward: "",
  });

  useEffect(() => {
    const fetchContract = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const contract = await getContractById(id);
        console.log(contract);
        if (!contract) {
          throw new Error("Contract not found");
        }

        const contractData = {
          title: contract.title || "",
          description: contract.description || "",
          reward: contract.reward || "",
        };

        setInitialData(contractData);
        setFormData(contractData);
      } catch (error) {
        console.error("Error fetching contract:", error);
        setError(error.message || "Failed to fetch contract details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContract();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateContract(id, formData);
      toast.success("Contract updated successfully!");
      navigate(`/contract/${id}`);
    } catch (error) {
      console.error(`Error updating contract:`, error);
      toast.error(
        error.message || `Failed to update contract. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          Edit Contract
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Title
            </label>
            <div className="text-sm text-slate-500 mb-1">
              Original: {initialData.title}
            </div>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 py-2.5 px-4 shadow-sm placeholder:text-slate-400 text-slate-800 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter contract title"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Description
            </label>
            <div className="text-sm text-slate-500 mb-1">
              Original: {initialData.description}
            </div>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 py-2.5 px-4 shadow-sm placeholder:text-slate-400 text-slate-800 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none h-32 resize-none"
              placeholder="Enter contract description"
              required
            />
          </div>

          <div>
            <label
              htmlFor="reward"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Reward
            </label>
            <div className="text-sm text-slate-500 mb-1">
              Original: ${initialData.reward}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                $
              </span>
              <input
                type="text"
                id="reward"
                name="reward"
                value={formData.reward}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-8 pr-4 shadow-sm placeholder:text-slate-400 text-slate-800 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                placeholder="Enter reward amount"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/contract")}
              className="flex-1 py-2.5 px-4 rounded-lg border border-slate-300 bg-red-500 text-white hover:bg-red-600 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Updating..." : "Update Contract"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
