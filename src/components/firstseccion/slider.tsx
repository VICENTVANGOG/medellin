"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, PlayCircle, CreditCard, Newspaper, ChevronLeft } from 'lucide-react';

const sliderImages = [
  { src: "/1.jpg", alt: "DIM Team", title: "ITINERARIO PODEROSO", description: "Sigue el camino del Poderoso de la Montaña" },
  { 
    src: "/visitante.jpg", 
    alt: "Stadium", 
    title: "EL PODEROSO Y ADIDAS ", 
    description: "Colaboración única entre DIM y Adidas 24/25",
    logoSrc: "/adidas-logo.png", 
    logoAlt: "Adidas Logo",
  },
  { src: "/3.jpg", alt: "Fans", title: "LA MEJOR HINCHADA", description: "La pasión de nuestra hinchada" },
  { src: "/4.jpg", alt: "Trophy", title: "NUESTROS LOGROS", description: "Celebrando nuestros éxitos" },
];

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <section className="relative">
      <div className="relative h-[70vh] overflow-hidden">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 to-blue-900/80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">{image.title}</h1>
                <p className="text-xl mb-8">{image.description}</p>
                <Link 
                  href="/itinerario" 
                  className="bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-red-600 hover:text-white transition duration-300"
                >
                  Ver Itinerario
                </Link>
              </div>
           
              {index === 1 && (
                <div className="absolute bottom-4 right-4 flex items-center">
                  <Image 
                    src="/adidas-logo.png" 
                    alt="Adidas Logo"
                    width={50} 
                    height={50}
                    className="mr-2"
                  />
                  <Image 
                    src="/logo.png"
                    alt="Medellín Logo"
                    width={50}
                    height={50}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full">
          <ChevronLeft size={24} className="text-red-600" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full">
          <ChevronRight size={24} className="text-red-600" />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PromoBanner
            icon={<PlayCircle size={24} />}
            title="DIM Plus"
            description="Descarga nuestra app oficial"
            link="/dim-plus"
            color="bg-red-600"
          />
          <PromoBanner
            icon={<CreditCard size={24} />}
            title="Nueva Tarjeta DIM"
            description="Celebremos juntos con beneficios exclusivos"
            link="/tarjeta-dim"
            color="bg-blue-700"
          />
          <PromoBanner
            icon={<Newspaper size={24} />}
            title="Medios DIM"
            description="Mantente informado con nuestros canales oficiales"
            link="/medios"
            color="bg-gray-800"
          />
        </div>
      </div>
    </section>
  );
};

interface PromoBannerProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  color: string;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ icon, title, description, link, color }) => (
  <Link href={link} className={`group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${color}`}>
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div className="mr-4 text-white bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="font-semibold text-xl text-white">{title}</h3>
      </div>
      <p className="text-white/80 mb-4 flex-grow">{description}</p>
      <div className="flex items-center text-white group-hover:translate-x-2 transition-transform duration-300">
        <span className="mr-2">Saber más</span>
        <ChevronRight size={20} />
      </div>
    </div>
  </Link>
);

export default HeroSection;
