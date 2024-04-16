import React from 'react';
import { FaHome, FaInfoCircle, FaWrench, FaEnvelope } from 'react-icons/fa';

const Navigation = () => {
  return (
    <ul className="nav-links">
        <li><FaHome size={30} /></li>
        <li><FaInfoCircle size={30}/></li>
        <li><FaWrench size={30}/></li>
        <li><FaEnvelope size={30}/></li>
      </ul>
  );
};

export default Navigation;
