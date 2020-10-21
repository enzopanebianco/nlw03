import React, { useEffect, useState } from 'react';
import mapMarker from '../images/Local.svg'
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight,FiMapPin } from 'react-icons/fi';
import '../styles/pages/orphanages-map.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet';
import api from '../services/api';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarker,
    iconAnchor: [19, 48],
    iconSize: [38, 48],
    popupAnchor: [178, 2]
})

interface Orphanage{
    id:number;
    latitude:number;
    longitude:number;
    name:string;
}

const OrphanatesMap: React.FC = () => {
    const [orphanages,setOrphanages] = useState<Orphanage[]>([]);

    useEffect(()=>{
        api.get('/orphanages').then(res=>{
            console.log(res)
            setOrphanages(res.data);
        })
    },[])

    return (
        <>
            <div id="page-map">
                <aside>
                    <header>
                        <img src={mapMarker} alt="Happy" />
                        <h2>Escolha um orfanato no mapa</h2>
                        <p>Muitas crianças estão esperando a sua visita :)</p>
                    </header>
                    <footer>
                    <FiMapPin size={25} color="#fff"/>
                        <strong>São Paulo</strong>
                        <span>São Paulo</span>
                    </footer>
                </aside>
                <Map
                    center={[-23.5525101, -46.5644216]}
                    zoom={15}
                    
                    style={{ width: '100%', height: '100%' }}>

                    <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {orphanages.map(orphanage=>{
                        return(
                            <Marker key={orphanage.id} icon={mapIcon} position={[orphanage.latitude,orphanage.longitude]} >
                        <Popup closeButton={false}
                            minWidth={240} maxWidth={240}
                            className='map-popup'>
                                {orphanage.name}
                    <Link to={`/orphanages/${orphanage.id}`}><a><FiArrowRight size={20} color="#fff" /></a></Link>
                        </Popup>
                    </Marker>
                        )
                    })}

                </Map>
                <Link to="/orphanages/create" className="create-orphanage">
                    <FiPlus size={32} color="#fff" />
                </Link>
            </div>
        </>
    );
}

export default OrphanatesMap;