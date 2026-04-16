import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Address } from '../types';

const zones = [
  { id: 'z1', name: 'Zone A - Downtown', area: 'Central Business District, Market St, Financial District' },
  { id: 'z2', name: 'Zone B - Midtown', area: 'Union Square, Tenderloin, Civic Center' },
  { id: 'z3', name: 'Zone C - Uptown', area: 'Pacific Heights, Marina, Nob Hill' },
  { id: 'z4', name: 'Zone D - Suburbs', area: 'Sunset, Richmond, Parkside' },
];

export default function LocationScreen() {
  const [selectedZone, setSelectedZone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const { setLocation } = useAuthStore();

  const handleContinue = () => {
    if (!selectedZone) return;
    const zone = zones.find((z) => z.id === selectedZone);
    const locationAddress: Address = {
      street: address || '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      zone: zone?.name || 'Zone A',
    };
    setLocation(locationAddress);
    navigate('/home', { replace: true });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 px-6 pt-12 pb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-primary">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-dark text-center mb-1">Select Your Location</h2>
        <p className="text-grey text-sm text-center">
          Choose your delivery zone to see available products
        </p>
      </div>

      <div className="flex-1 px-6 pt-6">
        <label htmlFor="zone" className="block text-sm font-medium text-grey-dark mb-2">
          Your Zone
        </label>
        <div className="space-y-3 mb-6">
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(zone.id)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                selectedZone === zone.id
                  ? 'border-primary bg-primary/5'
                  : 'border-grey-border hover:border-grey'
              }`}
            >
              <p className="font-semibold text-dark text-sm">{zone.name}</p>
              <p className="text-grey text-xs mt-0.5">{zone.area}</p>
            </button>
          ))}
        </div>

        <label htmlFor="address" className="block text-sm font-medium text-grey-dark mb-2">
          Your Address (Optional)
        </label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-3.5 rounded-2xl border border-grey-border text-dark text-sm
                     focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
          placeholder="Enter your street address"
        />
      </div>

      <div className="px-6 pb-8 pt-4">
        <button
          onClick={handleContinue}
          disabled={!selectedZone}
          className="w-full bg-primary text-white py-4 rounded-2xl font-semibold text-base
                     hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
