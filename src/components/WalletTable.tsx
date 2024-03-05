import React, { useState, useEffect, ReactNode } from 'react';
import Qr from './Qr';

interface WalletTableProps {
  email: string;
}

interface RowData {
  txs: any;
  name: string;
  address: string;
  final_balance: number;
}

const WalletTable: React.FC<WalletTableProps> = ({ email }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [data, setData] = useState<RowData[]>([]);

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/user/get_wallet_info/?email=${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const responseData = await response.json();
        setData(responseData);
        console.log(responseData)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [email]);

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (satoshis)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QR</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleRow(index)} className="cursor-pointer hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.final_balance}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Qr myStringProp={row.address} />
                </td>
              </tr>
              {expandedRow === index && (
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td colSpan={5} className="px-6 py-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Additional Information:</p>
                        <table className="min-w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recieved on</th>
                                {/* Add more table headers as needed */}
                                </tr>
                            </thead>
                            <tbody>
                                {row.txs.map((transaction: {
                                    received: string; hash: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; block_height: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; 
}, index: React.Key | null | undefined) => (
                                <tr key={index} className="cursor-pointer hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">{transaction.hash}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(transaction.received).toLocaleString("en-US", {
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                      second: "numeric",
                                      timeZone: "UTC"
                                    })}</td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                      </div>
                      <button
                        className="text-xs text-gray-500 uppercase focus:outline-none focus:text-gray-700 hover:text-gray-700"
                        onClick={() => toggleRow(index)}
                      >
                        {expandedRow === index ? 'Collapse' : 'Expand'}
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletTable;
