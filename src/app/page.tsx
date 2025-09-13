'use client';
import React, { useState, useRef } from 'react';

const hotelsData = [
  { id: 1, name: 'Hotel Alpha', city: 'New York', capacity: 2 },
  { id: 2, name: 'Hotel Beta', city: 'London', capacity: 4 },
  { id: 3, name: 'Hotel Gamma', city: 'Paris', capacity: 3 },
  { id: 4, name: 'Hotel Delta', city: 'Tokyo', capacity: 5 },
];

const SearchPage: React.FC = () => {
  const [city, setCity] = useState('');
  const [capacity, setCapacity] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const cityOptions = [
    'New York',
    'London',
    'Paris',
    'Tokyo',
    'Berlin',
    'Sydney',
  ];
  const [cityDropdown, setCityDropdown] = useState<string[]>([]);

  const handleCityInput = (value: string) => {
    setCity(value);
    if (value.trim() === '') {
      setCityDropdown([]);
      return;
    }
    const filtered = cityOptions.filter(c =>
      c.toLowerCase().includes(value.toLowerCase())
    );
    setCityDropdown(filtered);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setShowDropdown(true);
    try {
      setTimeout(() => {
        const filtered = hotelsData.filter(h =>
          h.city.toLowerCase().includes(city.toLowerCase()) &&
          (capacity === '' || h.capacity >= Number(capacity))
        );
        setResults(filtered);
        setLoading(false);
      }, 500);
      window.location.href='/venues/?capacity=' + capacity + '&city=' + city;
    } catch (e) {
      setError('Failed to fetch results');
      setLoading(false);
    }
  };

  const handleSelect = (hotel: any) => {
    window.location.href = `/venues/${hotel.id}`;
    setShowDropdown(false);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 150);
  };

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem', width: '100%' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '2rem' }}>Search Hotels</h1>
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 600,
          display: 'flex',
          flexDirection: 'row',
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div style={{ position: 'relative', flex: 2 }}>
          <input
            aria-label="City name"
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={e => handleCityInput(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onBlur={handleBlur}
            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #ccc', fontSize: 18, minWidth: 0 }}
          />
          {cityDropdown.length > 0 && (
            <ul
              style={{
                position: 'absolute',
                top: '110%',
                left: 0,
                right: 0,
                background: '#222',
                color: '#fff',
                border: '1px solid #333',
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                zIndex: 20,
                maxHeight: 180,
                overflowY: 'auto',
                margin: 0,
                padding: 0,
                listStyle: 'none',
              }}
            >
              {cityDropdown.map(cityName => (
                <li
                  key={cityName}
                  style={{ padding: '0.75rem 1rem', cursor: 'pointer', borderBottom: '1px solid #333' }}
                  onMouseDown={() => {
                    setCity(cityName);
                    setCityDropdown([]);
                  }}
                >
                  {cityName}
                </li>
              ))}
            </ul>
          )}
        </div>
        <input
          aria-label="Guest capacity"
          type="number"
          min={1}
          placeholder="Guest capacity required..."
          value={capacity}
          onChange={e => setCapacity(e.target.value === '' ? '' : Number(e.target.value))}
          onFocus={() => setShowDropdown(true)}
          onBlur={handleBlur}
          style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #ccc', fontSize: 18, minWidth: 0 }}
        />
        <button
          onClick={handleSearch}
          style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: 8, background: '#222', color: '#fff', fontSize: 18, border: 'none', cursor: 'pointer', minWidth: 0 }}
        >
          Search
        </button>
      </div>
      <style jsx>{`
        @media (max-width: 700px) {
          div[style*='display: flex'][style*='flexDirection: row'] {
            flex-direction: column !important;
            gap: 8px !important;
          }
          input, button {
            font-size: 16px !important;
            padding: 0.75rem 0.5rem !important;
          }
        }
      `}</style>
    </main>
  );
};

export default SearchPage;
