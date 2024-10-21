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
    }, 500); 
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  const renderSubmenu = (items: SubMenuItem[]) => (
    <ul 
      className="absolute left-0 mt-1 bg-white rounded shadow-lg z-50 w-full"
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
    <nav className="w-full flex items-center justify-between bg-red-600 h-16 z-50 px-4 md:px-8 absolute">
      <Image 
        src="/logo.png" 
        alt="logo" 
        width={100} 
        height={100} 
      />

      <div className="md:hidden text-white text-3xl cursor-pointer" onClick={toggleMenu}>
        {isOpen ? "✖" : "☰"}
      </div>

      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } md:flex md:gap-8 md:text-lg md:text-white md:justify-center absolute md:static top-16 left-0 w-full bg-red-600 transition-transform duration-300 md:translate-y-0`}
      >
        {[
          { title: "inicio", href: "/" },
          { title: "club", submenu: [{ title: "historia", href: "#historia" }, { title: "palmares", href: "#palmares" }] },
          { title: "noticias", submenu: [{ title: "plantel profesional", href: "#plantel-profesional" }] },
          { title: "futbol", submenu: [
            { title: "equipo", href: "#equipo-profesional" },
            { title: "formativa", href: "#formativa" }
          ] },
          { title: "boleteria", submenu: [{ title: "comprar entradas", href: "#comprar-entradas" }, { title: "terminos y condiciones", href: "#terminos-y-condiciones" }] },
          { title: "medios", submenu: [{ title: "dim radio", href: "#dim-radio" }, { title: "dim tv", href: "#dim-tv" }, { title: "dim revista", href: "#dim-revista" }] },
          { title: "bonos", submenu: [{ title: "beneficios", href: "#beneficios" }] }
        ].map((menuItem) => (
          <li 
            key={menuItem.title} 
            className={`relative p-4 md:p-0`} 
            onMouseEnter={() => handleMouseEnter(menuItem.title as MenuItem)} 
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center justify-between">
              <span className="cursor-pointer hover:text-blue-300 transition-colors duration-300">
                {menuItem.title.charAt(0).toUpperCase() + menuItem.title.slice(1)}
              </span>
              {menuItem.submenu && (
                <span className="cursor-pointer text-sm" onClick={() => {
                  if (hoveredItem === menuItem.title) {
                    setHoveredItem(null); // Close the submenu
                  } else {
                    setHoveredItem(menuItem.title as MenuItem); // Open the submenu
                  }
                }}>
                  {hoveredItem === menuItem.title ? "▲" : "▼"}
                </span>
              )}
            </div>
            {isOpen && hoveredItem === menuItem.title && menuItem.submenu && renderSubmenu(menuItem.submenu as SubMenuItem[])}
          </li>
        ))}
      </ul>
    </nav>
  );
}
