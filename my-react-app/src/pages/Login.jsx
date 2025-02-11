import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { useWitcher } from "../context/WitcherContext";
import { getWitchers } from "../lib/witcher";
import { Profile } from "../components/Login/Profile";
import { LoginForm } from "../components/Login/LoginForm";

export const Login = () => {
  const [witchers, setWitchers] = useState([]);
  const [selectedWitcher, setSelectedWitcher] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentWitcher, setCurrentWitcher } = useWitcher();

  useEffect(() => {
    const fetchWitchers = async () => {
      try {
        const data = await getWitchers();
        setWitchers(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching witchers:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWitchers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedWitcher) return;

    const selectedWitcherData = witchers.find(
      (witcher) => witcher.id === parseInt(selectedWitcher)
    );

    if (!selectedWitcherData) {
      setError("Selected witcher not found");
      return;
    }

    setCurrentWitcher(selectedWitcherData);
    navigate("/contract");
  };

  const handleLogout = () => {
    setCurrentWitcher(null);
    setSelectedWitcher("");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (currentWitcher) {
    return (
      <Profile currentWitcher={currentWitcher} handleLogout={handleLogout} />
    );
  }

  return (
    <LoginForm
      witchers={witchers}
      selectedWitcher={selectedWitcher}
      setSelectedWitcher={setSelectedWitcher}
      handleSubmit={handleSubmit}
    />
  );
};
