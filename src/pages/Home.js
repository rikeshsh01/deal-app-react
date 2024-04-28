import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Header from "../components/layouts/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layouts/Footer";

const Home = () => {
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!authToken) {
  //     navigate('/login');
  //   }
  // }, [authToken, navigate]);

  return (
    <>
      <Header />
      
      <div className='search-container'>
        <input className='search-input' type='text' placeholder='Enter Search Title' />
        <button className='search-btn'>
          <FaSearch />
        {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
        </button>
    </div>
    
      <Footer />
    </>
  );
};

export default Home;
