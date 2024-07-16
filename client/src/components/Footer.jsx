import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
      <h1 className=" text-2xl md:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 inline-block pb-4" style={{ fontFamily: 'Pacifico, cursive' }}>
          CleanCampus<span className="text-white inline-block"> 🌱</span>
        </h1>
        <p className="text-lg mb-6">Making your campus cleaner, one complaint at a time.</p>
        
        <div className="mt-6">
          <p className="text-sm">© {new Date().getFullYear()} CleanCampus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
