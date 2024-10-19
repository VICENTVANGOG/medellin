import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <Image src="/logo.png" alt="DIM Logo" width={60} height={60} className="mr-3" />
              <span className="text-2xl font-bold">DIM 1913</span>
            </div>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <Link key={index} href="#" className="hover:text-red-500 transition-colors">
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full md:w-2/4 mb-6 md:mb-0">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Actualidad</h3>
                <ul className="space-y-1">
                  <li><Link href="#" className="hover:text-red-500 transition-colors">Noticias</Link></li>
                  <li><Link href="#" className="hover:text-red-500 transition-colors">Videos</Link></li>
                  <li><Link href="#" className="hover:text-red-500 transition-colors">DIM Revista</Link></li>
                  <li><Link href="#" className="hover:text-red-500 transition-colors">DIM Radio</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Información</h3>
                <ul className="space-y-1">
                  <li><Link href="#" className="hover:text-red-500 transition-colors">Masculino</Link></li>
                  <li><Link href="#" className="hover:text-red-500 transition-colors">Cantera DIM</Link></li>
                  <li><Link href="#" className="hover:text-red-500 transition-colors">Academias</Link></li>
                  <li><Link href="#" className="hover:text-red-500 transition-colors">TiendaDIM.com</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-2">Contacto</h3>
            <p className="mb-2">Cra. 58 #37b-22, Barrio Pilsen, Itagüí (Ant)</p>
            <p className="mb-2">Teléfono: (604) 5906934</p>
            <Link href="mailto:info@dimoficial.com" className="hover:text-red-500 transition-colors">
              info@dimoficial.com
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-blue-800 mt-8 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>El Equipo del Pueblo S.A. © 2024 Todos los derechos reservados</p>
          <div className="mt-2 md:mt-0 space-x-4">
            <Link href="#" className="hover:text-red-500 transition-colors">Política de Privacidad</Link>
            <Link href="#" className="hover:text-red-500 transition-colors">Términos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
