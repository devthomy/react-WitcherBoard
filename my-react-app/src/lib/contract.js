import { toast } from "react-toastify";

const getContract = async (queryParams) => {
  try {
    const url = `http://localhost:3000/api/contracts${
      queryParams ? `?${queryParams}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    toast.success("Contracts fetched successfully" + queryParams);

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching contracts:", err);
    throw new Error(`Failed to fetch contracts: ${err.message}`);
  }
};

const getContractById = async (id) => {
  try {
    const url = `http://localhost:3000/api/contracts/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    toast.success("Contract fetched successfully");

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching contract:", err);
    throw new Error(`Failed to fetch contract: ${err.message}`);
  }
};

export { getContract, getContractById };
