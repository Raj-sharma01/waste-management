import React from 'react';
import PaperImage from '../assets/paper.jpg';
import MetalImage from '../assets/metal.jpg';
import PlasticImage from '../assets/plastic.jpg';
import RecyclingImage from '../assets/recycling.jpg';
import WasteManagementImage from '../assets/waste-management.jpg';

const Guide = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-center text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 pb-4">
        Waste Management Guide
      </h1>
      <p className="mb-8 text-xl text-center text-gray-700">
        Effective waste management is crucial for environmental sustainability. Here's how you can manage your waste properly:
      </p>
      <hr className="my-8 border-t-2 border-gray-300" />

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
          Recycling Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src={PaperImage} alt="Paper Recycling" className="w-full h-48 object-cover mb-6 rounded-t-lg" />
            <h3 className="text-2xl font-semibold mb-4 text-green-600">Paper Recycling</h3>
            <p className="mb-4 text-gray-600">Paper, cardboard, and paper products can be recycled to reduce waste.</p>
            <p className="mb-2"><strong>Bin Color:</strong> <span className='text-blue-500 font-medium'>Blue</span></p>
            <p className="text-gray-600"><strong>Usage:</strong> Dispose of clean and dry paper products into the blue recycling bin.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src={MetalImage} alt="Metal Recycling" className="w-full h-48 object-cover mb-6 rounded-t-lg" />
            <h3 className="text-2xl font-semibold mb-4 text-gray-600">Metal Recycling</h3>
            <p className="mb-4 text-gray-600">Metal items like aluminum cans and steel containers can be recycled indefinitely.</p>
            <p className="mb-2"><strong>Bin Color:</strong> <span className='text-gray-500 font-medium'>Gray</span></p>
            <p className="text-gray-600"><strong>Usage:</strong> Recycle aluminum cans, steel cans, and other metal containers.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src={PlasticImage} alt="Plastic Recycling" className="w-full h-48 object-cover mb-6 rounded-t-lg" />
            <h3 className="text-2xl font-semibold mb-4 text-green-500">Plastic Recycling</h3>
            <p className="mb-4 text-gray-600">Plastic bottles, containers, and packaging can be recycled to reduce plastic pollution.</p>
            <p className="mb-2"><strong>Bin Color:</strong> <span className='text-green-500 font-medium'>Green</span></p>
            <p className="text-gray-600"><strong>Usage:</strong> Place clean and dry plastic items into the green recycling bin.</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
          Why Careful Waste Management is Necessary?
        </h2>
        {/* <div className="flex items-center justify-center mb-6"> */}
          <p className="text-lg leading-relaxed text-gray-700">Proper waste management is essential for several reasons:</p>
        {/* </div> */}
        <ul className="list-disc pl-8 mt-4 text-lg leading-relaxed text-gray-700">
          <li className="mb-2">Reduces pollution and environmental degradation.</li>
          <li className="mb-2">Conserves natural resources and energy.</li>
          <li className="mb-2">Prevents the spread of diseases and protects public health.</li>
          <li className="mb-2">Promotes recycling and sustainable practices.</li>
          <li className="mb-2">Helps mitigate climate change and global warming.</li>
        </ul>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
          Recycling Process
        </h2>
        
        <div className="flex items-center justify-center mb-6">
          <img src={RecyclingImage} alt="Recycling Process" className="w-28 h-28 mr-6 rounded-full shadow-lg" />
          <p className="text-lg leading-relaxed text-gray-700">The recycling process involves collecting, sorting, processing, and manufacturing recyclable materials into new products.</p>
        </div>
        <p className="text-lg leading-relaxed text-gray-700">By following recycling guidelines and practicing responsible waste management, we can contribute to a cleaner and healthier environment for future generations.</p>
      </div>
    </div>
  );
};

export default Guide;
