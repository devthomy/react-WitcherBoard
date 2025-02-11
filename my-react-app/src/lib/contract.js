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

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching contract:", err);
    throw new Error(`Failed to fetch contract: ${err.message}`);
  }
};

const createContract = async (contractData) => {
  try {
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

const assignContract = async (contractId, witcherId) => {
  try {
    if (!contractId || !witcherId) {
      throw new Error("Contract ID and Witcher ID are required");
    }

    const response = await fetch(
      `http://localhost:3000/api/contracts/${contractId}/assignedTo`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(witcherId),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 400) {
        if (errorData.message === "Contract already completed.") {
          throw new Error("Contract already completed");
        } else if (
          errorData.message === "Contract already assigned to another Witcher."
        ) {
          throw new Error("Contract already assigned to another Witcher");
        } else if (errorData.message === "Unknown witcher.") {
          throw new Error("Unknown witcher");
        } else {
          throw new Error("Contract with bad status");
        }
      }

      if (response.status === 404) {
        throw new Error("Contract not found");
      }

      throw new Error(
        errorData.message || `Failed to assign contract: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error assigning contract:", error);
    throw error;
  }
};

const completeContract = async (contractId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/contracts/${contractId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify("Completed"),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to complete contract");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error completing contract:", error);
    throw error;
  }
};

export {
  getContract,
  getContractById,
  createContract,
  updateContract,
  assignContract,
  completeContract,
};
