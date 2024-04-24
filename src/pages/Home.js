import React, { useEffect } from "react";
import Header from "../components/layouts/Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken, navigate]);

  return (
    <>
      <Header />
      This is home
    </>
  );
};

export default Home;
