// src/components/TicketCard.jsx
import React, { useRef } from 'react';

export default function TicketCard({ ticket }) {
  const printRef = useRef();

  const handlePrint = () => {
    const el = printRef.current;
    if (!el) return;

    // mark this card as the only thing to show
    el.classList.add('only-print');
    window.print();
    el.classList.remove('only-print');
  };

  return (
    <div className="border rounded shadow bg-white p-4">
      {/* wrap the ENTIRE card contents you want printed */}
      <div ref={printRef} className="ticket-to-print">

        {/* <-- This is your full ticket image (overlaid) */}
        <img
          src={ticket.qrCodeImage}
          alt={`Ticket for ${ticket.ticketNumber}`}
          className="w-full mt-3 border rounded"
        />
      </div>

      <button
        onClick={handlePrint}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        🖨️ Print Ticket
      </button>
    </div>
  );
}
