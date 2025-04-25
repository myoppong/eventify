import React from "react";

const TicketQRCode = ({ qrCodeUrl, label }) => {
  if (!qrCodeUrl) return null;

  return (
    <div className="flex flex-col items-center space-y-2">
      <img
        src={qrCodeUrl}
        alt="Ticket QR Code"
        className="w-32 h-32 object-contain"
      />
      {label && <p className="text-sm text-gray-500">{label}</p>}
    </div>
  );
};

export default TicketQRCode;
