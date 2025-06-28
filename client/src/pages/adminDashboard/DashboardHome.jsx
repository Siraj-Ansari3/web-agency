import React from 'react';

const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Card {item}</h3>
            <p className="text-gray-600">Dashboard content goes here</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;