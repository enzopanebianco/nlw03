import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo,  } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';
import mapMarkerImg from '../images/Local.svg';
import '../styles/pages/orphanage.css';
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { useParams } from "react-router-dom";
import 'leaflet/dist/leaflet.css';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface Orphanage{
  id:number;
  latitude:number;
  longitude:number;
  name:string;
  instructions:string;
  about:string;
  opening_hours:string;
  open_on_weekends:boolean;
  images:Array<{
    id:number;
    url:string;
  }>;
}
interface OrphanageParams{
  id:string;
}
export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  const [orphanage,setOrphanage] = useState<Orphanage>();
  const [activeImage,setActiveImage] = useState(0);
  useEffect(()=>{
      api.get(`/orphanages/${params.id}`).then(res=>{
          console.log(res)
          setOrphanage(res.data);
      })
  },[params.id]);
  if(!orphanage){
    return <p>Carregando...</p>
  }
  return (
    <div id="page-orphanage">
     <Sidebar />
      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImage].url} alt={orphanage.name} />

          <div className="images">
          {
            orphanage.images.map((image,index)=>{
              return(
                <button 
                onClick={()=>{
                  setActiveImage(index)
                }}
                key={image.id} className={activeImage===index?'active':''} type="button">
                  <img src={image.url} alt={orphanage.name}/>
                </button>
              )
            })
          }
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude,orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude,orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>{orphanage.instructions}</h2>
            <p>Venha como se sentir mais à vontade e traga muito amor para dar.</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {
                orphanage.open_on_weekends ?(
                  <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
                ) :
                (
                  <div className="open-on-weekends dont">
                <FiInfo size={32} color="#ff6690" />
              Não atendemos <br />
                fim de semana
              </div>
                )
              }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}