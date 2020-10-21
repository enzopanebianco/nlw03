import React from 'react';
import '../styles/pages/landing.css';
import logo from '../images/Logo.svg';
import {FiArrowRight} from 'react-icons/fi'
import {Link} from 'react-router-dom';

const Landing: React.FC = () => {
  return (
      <>
       <div id="page-landing">
    <div className="content-wrapper">
      <img src={logo} alt="logo do app"/>
      <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia das crianças.</p>
      </main>
      <div className="location">
        <strong>São Paulo</strong>
        <span>São Paulo</span>
      </div>
      <Link to="/map" className="enter-app"> 
      <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
      </Link>
    </div>
    </div>
      </>
  );
}

export default Landing;