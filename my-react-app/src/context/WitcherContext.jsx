import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const WitcherContext = createContext();

export const useWitcher = () => useContext(WitcherContext);

export const WitcherProvider = ({ children }) => {
  const [currentWitcher, setCurrentWitcher] = useState(() => {
    const saved = sessionStorage.getItem("currentWitcher");
    return saved ? JSON.parse(saved) : null;
  });

  const handleSetWitcher = (witcher) => {
    if (!witcher) {
      setCurrentWitcher(null);
      sessionStorage.removeItem("currentWitcher");
      return;
    }

    const data = { id: witcher.id, name: witcher.name, avatar: witcher.avatar };
    setCurrentWitcher(data);
    sessionStorage.setItem("currentWitcher", JSON.stringify(data));
  };

  return (
    <WitcherContext.Provider
      value={{ currentWitcher, setCurrentWitcher: handleSetWitcher }}
    >
      {children}
    </WitcherContext.Provider>
  );
};

WitcherProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
