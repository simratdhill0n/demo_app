import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  email:string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, email}) => {
  const navigate= useNavigate()

  const navigateToDashboard = () => {
    navigate("/dashboard", { state: { email: email } });
  };
  const navigateToWallet = () => {
    navigate("/dashboard/wallet", { state: { email: email } });
  };
  return (
    <div
      className={`fixed top-0 left-0 z-40 w-64 h-screen bg-purple-800 text-white transition-transform ${
        isOpen ? "" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
      <button
          onClick={navigateToDashboard}
          className="py-2 px-20 hover:bg-purple-700"
        >
          Search
        </button>
        <button
          onClick={navigateToWallet}
          className="py-2 px-20 hover:bg-purple-700"
        >
          Wallet
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
