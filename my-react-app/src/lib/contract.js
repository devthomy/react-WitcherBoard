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

const createContract = async (contractData) => {
  try {
    // Validate form data
    if (!contractData.title?.trim()) {
      throw new Error("Title is required");
    }
    if (!contractData.description?.trim()) {
      throw new Error("Description is required");
    }
    if (!contractData.reward?.trim()) {
      throw new Error("Reward is required");
    }

    const response = await fetch("http://localhost:3000/api/contracts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...contractData,
        status: "Available",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create contract");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating contract:", error);
    throw error;
  }
};

const updateContract = async (id, contractData) => {
  try {
    const response = await fetch(`http://localhost:3000/api/contracts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...contractData,
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update contract");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating contract:", error);
    throw error;
  }
};

export { getContract, getContractById, createContract, updateContract };
