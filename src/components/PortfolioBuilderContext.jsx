import React, { createContext, useContext, useState } from "react";

const PortfolioBuilderContext = createContext();

export const PortfolioBuilderProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    description: "",
    profilePic: null,
    portfolioImage1: null,
    portfolioLink: "",
  });

  const [gradientColors, setGradientColors] = useState({
    from: "",
    to: "",
  });

  return (
    <PortfolioBuilderContext.Provider
      value={{
        formData,
        setFormData,
        gradientColors,
        setGradientColors,
      }}
    >
      {children}
    </PortfolioBuilderContext.Provider>
  );
};

export const usePortfolioBuilder = () => useContext(PortfolioBuilderContext);
