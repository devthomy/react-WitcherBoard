import { toast } from "react-toastify";

const getContract = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/contracts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    toast.success("Contracts fetched successfully");

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching contracts:", err);
    throw new Error(`Failed to fetch contracts: ${err.message}`);
  }
};

export default getContract;
