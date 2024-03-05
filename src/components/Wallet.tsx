import React, { useState } from 'react';
import WalletTable from './WalletTable';

interface WalletProps {
  email: string;
}

const Wallet: React.FC<WalletProps> = ({ email }) => {
  // State variables to manage form data
  const [address, setAddress] = useState('');
  const [walletName, setWalletName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTransactionSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const requestData = {
      private_key: formData.get('senderPrivateKey'),
      recipient_address: formData.get('receiverAddress'),
      amount: formData.get('amount'),
      coin_symbol: formData.get('coinType')
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/user/make_payment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Add any other required headers here
        },
        body: JSON.stringify(requestData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit transaction.');
      }
  
      // Optionally handle success response here
  
      closeModal(); // Close the modal upon successful submission
    } catch (error) {
      console.error('Error:', error);
      alert("Something Went Wrong! Please Check the form.")
    }
  };
  

  // Event handler function for form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Prepare data to be sent to the API
    const formData = {
      address,
      walletName,
      email,
    };

    try {
      // Send a POST request to the API with form data
      const response = await fetch('http://127.0.0.1:8000/user/create_wallet/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful response
        console.log('Wallet added successfully!');
        // Optionally, you can reset the form fields here
        setAddress('');
        setWalletName('');
      } else {
        // Handle error response
        console.error('Failed to add wallet:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form className="flex space-x-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter wallet name"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Add Wallet
        </button>
      </form>

      <hr />
      <WalletTable email={email}/>

      <button
        onClick={() => openModal()} // Pass row.address to openModal
        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        DO Transaction
      </button>

      {/* Modal form */}
{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-8 max-w-md w-full rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Transfer Money</h2>
      <form onSubmit={handleTransactionSubmit}>
        <div className="mb-4">
          <label htmlFor="senderPrivateKey" className="block text-sm font-medium text-gray-700">Sender's Private Key</label>
          <input type="text" id="senderPrivateKey" name="senderPrivateKey" className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="receiverAddress" className="block text-sm font-medium text-gray-700">Receiver's Address</label>
          <input type="text" id="receiverAddress" name="receiverAddress" className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (Satoshis)</label>
          <input type="number" id="amount" name="amount" className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="coinType" className="block text-sm font-medium text-gray-700">Type of Coin</label>
          <select id="coinType" name="coinType" className="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
            <option value="btc">Bitcoin</option>
            <option value="btc-testnet">Bitcoin Testnet</option>
            <option value="dash">Dash</option>
            <option value="doge">Dogecoin</option>
            <option value="ltc">Litecoin</option>
            <option value="bcy">BlockCypher Test</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button type="button" onClick={closeModal} className="mr-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">Transfer</button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Wallet;
