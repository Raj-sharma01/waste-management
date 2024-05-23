import React from 'react';
import PaperImage from '../assets/paper.jpg';
import MetalImage from '../assets/metal.jpg';
import PlasticImage from '../assets/plastic.jpg';
import RecyclingImage from '../assets/recycling.jpg';
import WasteManagementImage from '../assets/waste-management.jpg';

const Guide = () => {
  return (
    <div className="mx-auto max-w-4xl px-4">
      <h1 className="text-center text-4xl font-bold mb-4">Waste Management Guide</h1>
      <p className="mb-6 text-lg">Effective waste management is crucial for environmental sustainability. Here's how you can manage your waste properly:</p>
      <hr className="my-6" />

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Recycling Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src={PaperImage} alt="Paper Recycling" className="w-full h-40 object-cover mb-4" />
            <h4 className="text-xl font-semibold mb-2">Paper Recycling</h4>
            <p>Paper, cardboard, and paper products can be recycled to reduce waste.</p>
            <p><strong>Bin Color:</strong> <span className='text-blue-500 font-medium'>Blue</span></p>
            <p><strong>Usage:</strong> Dispose of clean and dry paper products into the blue recycling bin.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src={MetalImage} alt="Metal Recycling" className="w-full h-40 object-cover mb-4" />
            <h4 className="text-xl font-semibold mb-2">Metal Recycling</h4>
            <p>Metal items like aluminum cans and steel containers can be recycled indefinitely.</p>
            <p><strong>Bin Color:</strong> <span className='text-gray-500 font-medium'>Gray</span></p>
            <p><strong>Usage:</strong> Recycle aluminum cans, steel cans, and other metal containers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src={PlasticImage} alt="Plastic Recycling" className="w-full h-40 object-cover mb-4" />
            <h4 className="text-xl font-semibold mb-2">Plastic Recycling</h4>
            <p>Plastic bottles, containers, and packaging can be recycled to reduce plastic pollution.</p>
            <p><strong>Bin Color:</strong> <span className='text-green-500 font-medium'>Green</span></p>
            <p><strong>Usage:</strong> Place clean and dry plastic items into the green recycling bin.</p>
          </div>
        </div>
      </div>


      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Why Careful Waste Management is Necessary?</h3>
        <div className="flex items-center justify-center mb-4">
          <img src={WasteManagementImage} alt="Waste Management" className="w-24 h-24 mr-4" />
          <p className="text-lg">Proper waste management is essential for several reasons:</p>
        </div>
        <ul className="list-disc pl-6 mt-4 text-lg">
          <li>Reduces pollution and environmental degradation.</li>
          <li>Conserves natural resources and energy.</li>
          <li>Prevents the spread of diseases and protects public health.</li>
          <li>Promotes recycling and sustainable practices.</li>
          <li>Helps mitigate climate change and global warming.</li>
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Recycling Process</h3>
        <div className="flex items-center justify-center mb-4">
          <img src={RecyclingImage} alt="Recycling Process" className="w-24 h-24 mr-4" />
          <p className="text-lg">The recycling process involves collecting, sorting, processing, and manufacturing recyclable materials into new products.</p>
        </div>
        <p className="text-lg">By following recycling guidelines and practicing responsible waste management, we can contribute to a cleaner and healthier environment for future generations.</p>
      </div>
    </div>
  );
};

export default Guide;
