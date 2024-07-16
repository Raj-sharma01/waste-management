// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const OfficerList = () => {
//   const [officers, setOfficers] = useState([]);

//   const getOfficers = async () => {
//     try {
//       const res = await axios.get('/api/admin/getAllOfficers');
//       console.log(res.data.officers);
//       setOfficers(res.data.officers);
//     } catch (error) {
//       console.error('Error fetching officers:', error);
//     }
//   };

//   useEffect(() => {
//     getOfficers();
//   }, []);

//   return (
//     <div className="bg-gray-100 min-h-screen py-8">
//       <div className="text-center font-bold text-3xl text-gray-800 mb-8">
//         {officers.length === 0 ? <h1>No officers to show</h1> : <h1>Officers List</h1>}
//       </div>
//       <div className="container mx-auto px-4">
//         <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
//           {officers.map(officer => (
//             <div key={officer._id} className="bg-white rounded-lg shadow-md p-6">
//               <div className="border-b border-gray-200 pb-4 mb-4">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-1">{officer.name} {officer.username}</h2>
//                 <p className="text-gray-600"><strong>Email:</strong> {officer.email}</p>
//                 <p className="text-gray-600"><strong>Id:</strong> {officer._id}</p>

//               </div>
//               <p className="text-gray-600 mb-4"><strong>Assigned Complaints:</strong> {officer.assignedComplaints.length}</p>
//               {/* <button className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
//                 Assign to
//               </button> */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OfficerList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OfficerList = () => {
  const [officers, setOfficers] = useState([]);

  const getOfficers = async () => {
    try {
      const res = await axios.get('/api/admin/getAllOfficers');
      setOfficers(res.data.officers);
    } catch (error) {
      console.error('Error fetching officers:', error);
    }
  };

  useEffect(() => {
    getOfficers();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="text-center font-bold text-3xl text-gray-800 mb-8">
        {officers.length === 0 ? <h1>No officers to show</h1> : <h1>Officers List</h1>}
      </div>
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {officers.map(officer => (
            <div key={officer._id} className="rounded-lg overflow-hidden shadow-md bg-white">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{officer.name} {officer.username}</h2>
                <p className="text-gray-600"><strong>Email:</strong> {officer.email}</p>
                <p className="text-gray-600"><strong>Id:</strong> {officer._id}</p>
              </div>
              <div className="bg-gray-100 px-6 py-4">
                <p className="text-gray-600"><strong>Assigned Complaints:</strong> {officer.assignedComplaints.length}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficerList;
