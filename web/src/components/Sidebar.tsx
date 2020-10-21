import React from 'react';
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import mapMarkerImg from '../images/Local.svg';
import { useHistory } from "react-router-dom";
import '../styles/pages/orphanage.css';

// import { Container } from './styles';

const Sidebar: React.FC = () => {
    const { goBack } = useHistory();

  return (
      <>
        <aside className="sidebar">
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
      </>
  );
}

export default Sidebar;