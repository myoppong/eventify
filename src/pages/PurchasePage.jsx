import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function PurchasePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const ticket = location.state?.ticket;

  // 👇 Hooks always run first
  const [quantity, setQuantity] = useState(1);
  const [responses, setResponses] = useState(
    ticket?.customFields?.map(() => '') || []
  );
  const [loading, setLoading] = useState(false);

  // If someone lands here directly
  if (!ticket) {
    return (
      <div className="p-6">
        <p className="text-red-600">No ticket selected.</p>
        <button
          onClick={() => navigate('/events')}
          className="mt-4 bg-gray-200 px-4 py-2 rounded"
        >
          Back to Events
        </button>
      </div>
    );
  }

  const handleResponseChange = (i, v) => {
    const copy = [...responses];
    copy[i] = v;
    setResponses(copy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/purchase/initiate', {
        ticketId: ticket.id,
        quantity,
        type: ticket.type,
        customFieldResponses: responses,
      });
      window.location.href = data.url; // redirect to Paystack
    } catch (err) {
      console.error('Payment init failed:', err);
      setLoading(false);
      alert('Could not initiate payment.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Buy {ticket.type} Ticket</h1>
      <p className="mb-2">Price: ₵{ticket.price}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            max={ticket.quantityAvailable}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {ticket.customFields?.map((label, idx) => (
          <div key={idx}>
            <label className="block mb-1">{label}</label>
            <input
              type="text"
              value={responses[idx] || ''}
              onChange={(e) => handleResponseChange(idx, e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Processing…' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}
