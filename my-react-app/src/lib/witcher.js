const getWitchers = async () => {
  try {
    const url = `http://localhost:3000/api/witchers`;

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
    console.error("Error fetching witchers:", err);
    throw new Error(`Failed to fetch witchers: ${err.message}`);
  }
};

export { getWitchers };
