import React from 'react';
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

interface QrProps {
  myStringProp: string;
}

const Qr: React.FC<QrProps> = ({ myStringProp }) => {
  return (
    <div style={{ background: 'white', padding: '16px' }}>
      <QRCode size={256} style={{ height: "20%", width: "20%" }} value={myStringProp} viewBox={`0 0 256 256`}/>
    </div>
  );
};

export default Qr;
