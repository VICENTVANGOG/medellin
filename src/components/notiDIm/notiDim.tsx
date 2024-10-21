"use client";
import React, { useState } from 'react';
import './App.css';

interface CardData {
  title: string;
  content: string;
  date: string;
  image: string; 
}

const cards: CardData[] = [
  {
    title: 'Descuento en la nueva camiseta con tarjeta dale! Medellín',
    content: 'El Poderoso de la montaña estrena la tercera camiseta de esta temporada que combina la tradición del club con un',
    date: '18 de octubre de 2024',
    image: 'https://dimoficial.com/wp-content/uploads/2024/10/BannerDDale-1.jpg' 
  },
  {
    title: 'adidas e Independiente Medellín presentan su nueva tercera camiseta',
    content: 'adidas e Independiente Medellín presentan su nueva tercera camiseta con un diseño innovador y colores emblemáticos Medellín, 18 de octubre',
    date: '18 de octubre de 2024',
    image: 'https://dimoficial.com/wp-content/uploads/2024/10/BANNER-3RD-KIT-768x265.jpg' 
  },
  {
    title: 'Itinerario Poderoso',
    content: 'Itinerario Poderoso en Bogotá y Tunja. El Medallo viaja al centro del país para disputar sus juegos de Liga y Copa.',
    date: '17 de octubre de 2024',
    image: 'https://dimoficial.com/wp-content/uploads/2024/08/Banner-Itinerario.jpg' 
  },{
    title: 'Convocatoria a Prueba en la Academia DIM',
    content: 'La Academia DIM abre sus puertas a nuevos talentos. Si eres un joven futbolista apasionado, no pierdas la oportunidad de formar parte de nuestro equipo.',
    date: '9 de octubre de 2024',
    image: 'https://dimoficial.com/wp-content/uploads/2024/10/Banner-FFBB-2-768x265.jpg'
  },
  {
    title: 'Agenda Deportiva DIM',
    content: 'Consulta la agenda deportiva del Deportivo Independiente Medellín. Entérate de los próximos partidos y eventos que tendrán lugar en las próximas semanas.',
    date: '8 de octubre de 2024',
    image: 'https://dimoficial.com/wp-content/uploads/2024/08/Banner-Itinerario.jpg'
  }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => (prevPage === 0 ? Math.floor(cards.length / itemsPerPage) : prevPage - 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => (prevPage === Math.floor(cards.length / itemsPerPage) ? 0 : prevPage + 1));
  };

  const startIndex = currentPage * itemsPerPage;
  const paginatedCards = cards.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">ACTUALIDAD DIM</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCards.map((card, index) => (
          <div key={index} className="card bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={card.image} alt={card.title} className="card-image w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="card-title text-lg font-semibold">{card.title}</h2>
              <p className="card-content text-gray-700">{card.content}</p>
              <p className="card-date text-gray-500 text-sm">{card.date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination flex justify-between mt-6">
        <button className="btn bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500" onClick={handlePrevClick}>Anterior</button>
        <button className="btn bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500" onClick={handleNextClick}>Siguiente</button>
      </div>
    </div>
  );
};

export default App;
