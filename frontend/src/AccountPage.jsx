import React from 'react';
import { ArrowLeft } from 'lucide-react';

const AccountPage = ({ menuItems, isDarkTheme, onBack }) => {
  return (
    <div className={`h-screen ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-gray-900'} flex flex-col`}>
      {/* Header */}
      <header className={`flex items-center px-4 py-3 border-b ${isDarkTheme ? 'border-gray-800' : 'border-gray-200'}`}>
        <button 
          onClick={onBack}
          className={`p-2 rounded-lg transition-colors mr-2 ${isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">Account</h1>
      </header>

      {/* User Profile Section */}
      <div className={`px-4 py-6 border-b ${isDarkTheme ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <p className="font-medium text-lg">User Name</p>
            <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Premium</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <main className="flex-1 overflow-y-auto">
        <nav className="py-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.action();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-base">{item.label}</span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
};

export default AccountPage;

