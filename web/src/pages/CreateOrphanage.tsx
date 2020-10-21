import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';
import { useHistory } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import { FiArrowLeft, FiPlus } from "react-icons/fi";

import mapMarkerImg from '../images/Local.svg';

import '../styles/pages/create-orphanage.css';
import api from "../services/api";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default function CreateOrphanage() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const history = useHistory();
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images,setImages] = useState<File[]>([]);
  const [previewImages,setPreviewImages] = useState<string[]>([]);
  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    setPosition({
      latitude: lat,
      longitude: lng
    });
  }
 async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { latitude, longitude } = position;

    const data = new FormData();

      data.append('about',about);
      data.append('name',name);
      data.append('instructions',instructions);
      data.append('opening_hours',opening_hours);
      data.append('open_on_weekends',String(open_on_weekends));
      data.append('latitude',String(latitude));
      data.append('longitude',String(longitude));
      images.forEach(img=>{
        data.append('images',img)
      });

      await api.post('/orphanages',data)

      alert("FOI");
      history.push('/map');

    }
function handleSelectImages(event:ChangeEvent<HTMLInputElement>) {
  if (!event.target.files) {
    return
  }
  const selectedImages = Array.from(event.target.files)
  setImages(selectedImages);

  const selectedImagesPreview = selectedImages.map(img=>{
    return URL.createObjectURL(img);
  }) 
  setPreviewImages(selectedImagesPreview);
}

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.2092052, -49.6401092]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
              />
              {position.latitude !== 0 &&
                <Marker interactive={false} icon={happyMapIcon}
                  position={[position.latitude, position.longitude]} />
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name"
                value={about} onChange={e => setAbout(e.target.value)}
                maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image=>{
                  return(
                    <img key={image} src={image}  alt={name}/>
                  )

                })}
                <label htmlFor='image[]' className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
                <input multiple onChange={handleSelectImages} type="file" id="image[]"/>


            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                value={instructions} onChange={e => setInstructions(e.target.value)}
                id="instructions" />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input
                value={opening_hours} onChange={e => setOpeningHours(e.target.value)}
                id="opening_hours" />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  onClick={() => setOpenOnWeekends(true)}
                  type="button" className={open_on_weekends ? 'active' : ''}>Sim</button>
                <button
                  onClick={() => setOpenOnWeekends(false)}

                  type="button">Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
