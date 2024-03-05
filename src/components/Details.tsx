import React from 'react';



interface DetailsProps {
  data: any ;
}

const Details: React.FC<DetailsProps> = ({ data }) => {
  console.log(data)
    if (!data || Object.keys(data).length === 0) {
        return <div></div>;
      }

    console.log(data)
  return (
    <div>
      <h2>Transaction Information</h2>
      <ul>
        <li>Address: {data.address}</li>
        <li>Balance: {data.balance}</li>
        <li>Final Balance: {data.final_balance}</li>
        <li>Final Number of Transactions: {data.final_n_tx}</li>
        <li>Number of Transactions: {data.n_tx}</li>
        <li>Total Received: {data.total_received}</li>
        <li>Total Sent: {data.total_sent}</li>
      </ul>
    </div>
  );
};

export default Details;
