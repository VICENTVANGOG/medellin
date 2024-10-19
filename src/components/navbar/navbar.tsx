"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';

type MenuItem = 
  | "inicio" 
  | "club" 
  | "noticias" 
  | "futbol" 
  | "boleteria" 
  | "medios" 
  | "bonos"
  | "historia"
  | "palmares"
  | "plantel profesional"
  | "equipo"
  | "formativa"
  | "academias"
  | "canteria"
  | "comprar entradas"
  | "terminos y condiciones"
  | "dim radio"
  | "dim tv"
  | "dim revista"
  | "beneficios";

interface SubMenuItem {
  title: MenuItem;
  href: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hoveredSubItem, setHoveredSubItem] = useState<MenuItem | null>(null);


  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleMouseEnter = (item: MenuItem) => {
    clearTimeout(timeoutRef.current!);
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
      setHoveredSubItem(null);
    }, 100);
  };

  const handleSubMenuMouseEnter = () => {
    clearTimeout(timeoutRef.current!);
  };

  const handleSubMenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredSubItem(null);
    }, 500); // Temporizador de 500 ms para "Formativa"
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  const renderSubmenu = (items: SubMenuItem[]) => (
    <ul 
      className="absolute left-0 mt-2 bg-white rounded shadow-lg"
      onMouseEnter={handleSubMenuMouseEnter}
      onMouseLeave={handleSubMenuMouseLeave}
    >
      {items.map((item) => (
        <li
          key={item.href}
          className={`p-2 transition-colors duration-300 ${
            hoveredSubItem === item.title ? "bg-red-800 text-white" : "text-black"
          }`}
          onMouseEnter={() => setHoveredSubItem(item.title)}
        >
          <Link href={item.href} className="whitespace-nowrap">
            {item.title.trim()}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="w-full flex items-center justify-between bg-red-600 h-16 z-40 px-8">
      <Image 
        src="/logo.png" 
        alt="logo" 
        width={100} 
        height={100} 
      />

      <div className="md:hidden text-white text-3xl cursor-pointer" onClick={toggleMenu}>
        ☰
      </div>

      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } md:flex md:gap-8 md:text-lg md:text-white md:justify-center absolute md:static top-16 left-0 w-full bg-red-600 transition-transform duration-300 md:translate-y-0`}
      >
        <li 
          className={`cursor-pointer p-4 md:p-0 ${
            hoveredItem === "inicio" ? "bg-red-800 text-white" : ""
          }`}
          onMouseEnter={() => handleMouseEnter("inicio")}
          onMouseLeave={handleMouseLeave}
        >
          <Link href="/" className="transition-colors duration-300">
            Inicio
          </Link>
        </li>
        <li 
          className="relative p-4 md:p-0" 
          onMouseEnter={() => handleMouseEnter("club")} 
          onMouseLeave={handleMouseLeave}
        >
          <span className="cursor-pointer hover:text-blue-300 transition-colors duration-300">
            Club <span className="text-sm">&#x25BC;</span>
          </span>
          {hoveredItem === "club" && renderSubmenu([
            { title: "historia", href: "#historia" },
            { title: "palmares", href: "#palmares" }
          ])}
        </li>
        <li 
          className="relative p-4 md:p-0" 
          onMouseEnter={() => handleMouseEnter("noticias")} 
          onMouseLeave={handleMouseLeave}
        >
          <span className="cursor-pointer hover:text-blue-300 transition-colors duration-300">
            Noticias <span className="text-sm">&#x25BC;</span>
          </span>
          {hoveredItem === "noticias" && renderSubmenu([
            { title: "plantel profesional", href: "#plantel-profesional" }
          ])}
        </li>
        <li 
          className="relative p-4 md:p-0" 
          onMouseEnter={() => handleMouseEnter("futbol")} 
          onMouseLeave={handleMouseLeave}
        >
          <span className="cursor-pointer hover:text-blue-300 transition-colors duration-300">
            Fútbol <span className="text-sm">&#x25BC;</span>
          </span>
          {hoveredItem === "futbol" && (
            <ul className="absolute left-0 mt-2 bg-white rounded shadow-lg">
              <li 
                className={`p-2 ${hoveredSubItem === "equipo" ? "bg-red-800 text-white" : "text-black"}`}
                onMouseEnter={() => setHoveredSubItem("equipo")}
                onMouseLeave={handleSubMenuMouseLeave}
              >
                <Link href="#equipo-profesional" className="whitespace-nowrap">
                  Equipo Profesional
                </Link>
              </li>
              <li 
                className={`relative p-2 ${hoveredSubItem === "formativa" ? "bg-red-800 text-white" : "text-black"}`}
                onMouseEnter={() => {
                  setHoveredSubItem("formativa");
                  handleMouseEnter("futbol"); 
                }}
                onMouseLeave={handleSubMenuMouseLeave}
              >
                <span className="cursor-pointer whitespace-nowrap">
                  Formativa <span className="text-sm">&#x25B6;</span>
                </span>
                {hoveredSubItem === "formativa" && (
                  <ul className="absolute left-full top-0 mt-0 bg-white rounded shadow-lg">
                    <li 
                      className={`p-2 ${hoveredSubItem === "academias" ? "bg-red-800 text-white" : "text-black"}`}
                      onMouseEnter={() => setHoveredSubItem("academias")}
                      onMouseLeave={handleSubMenuMouseLeave}
                    >
                      <Link href="#academias-dim" className="whitespace-nowrap">Academias DIM</Link>
                    </li>
                    <li 
                      className={`p-2 ${hoveredSubItem === "canteria" ? "bg-red-800 text-white" : "text-black"}`}
                      onMouseEnter={() => setHoveredSubItem("canteria")}
                      onMouseLeave={handleSubMenuMouseLeave}
                    >
                      <Link href="#canteria-dim" className="whitespace-nowrap">Cantería DIM</Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
        <li 
          className="relative p-4 md:p-0" 
          onMouseEnter={() => handleMouseEnter("boleteria")} 
          onMouseLeave={handleMouseLeave}
        >
          <span className="cursor-pointer hover:text-blue-300 transition-colors duration-300">
            Boletería <span className="text-sm">&#x25BC;</span>
          </span>
          {hoveredItem === "boleteria" && renderSubmenu([
            { title: "comprar entradas", href: "#comprar-entradas" },
            { title: "terminos y condiciones", href: "#terminos-y-condiciones" }
          ])}
        </li>
        <li 
          className="relative p-4 md:p-0" 
          onMouseEnter={() => handleMouseEnter("medios")} 
          onMouseLeave={handleMouseLeave}
        >
          <span className="cursor-pointer hover:text-blue-300 transition-colors duration-300">
            Medios <span className="text-sm">&#x25BC;</span>
          </span>
          {hoveredItem === "medios" && renderSubmenu([
            { title: "dim radio", href: "#dim-radio" },
            { title: "dim tv", href: "#dim-tv" },
            { title: "dim revista", href: "#dim-revista" }
          ])}
        </li>
        <li 
          className="relative p-4 md:p-0" 
          onMouseEnter={() => handleMouseEnter("bonos")} 
          onMouseLeave={handleMouseLeave}
        >
          <span className="cursor-pointer hover:text-blue-300 transition-colors duration-300">
            DIM Bonos <span className="text-sm">&#x25BC;</span>
          </span>
          {hoveredItem === "bonos" && renderSubmenu([
            { title: "beneficios", href: "#beneficios" }
          ])}
        </li>
      </ul>
    </nav>
  );
}
