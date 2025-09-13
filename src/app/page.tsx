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
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Search Hotels</h1>
      <div style={{ position: 'relative', width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'row', gap: 12 }}>
        <input
          aria-label="City name"
          type="text"
          placeholder="City"
          value={city}
          onChange={e => setCity(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={handleBlur}
          style={{ flex: 2, padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #ccc', fontSize: 18 }}
        />
        <input
          aria-label="Guest capacity"
          type="number"
          min={1}
          placeholder="Guest count"
          value={capacity}
          onChange={e => setCapacity(e.target.value === '' ? '' : Number(e.target.value))}
          onFocus={() => setShowDropdown(true)}
          onBlur={handleBlur}
          style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #ccc', fontSize: 18 }}
        />
        <button
          onClick={handleSearch}
          style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: 8, background: '#222', color: '#fff', fontSize: 18, border: 'none', cursor: 'pointer' }}
        >
          Search
        </button>
        {showDropdown && (
          <ul
            role="listbox"
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
              zIndex: 10,
              maxHeight: 200,
              overflowY: 'auto',
              margin: 0,
              padding: 0,
              listStyle: 'none',
            }}
          >
            {loading && <li style={{ padding: '1rem' }}>Loading...</li>}
            {error && <li style={{ padding: '1rem', color: 'red' }}>{error}</li>}
            {!loading && results.length === 0 && (city || capacity) && (
              <li style={{ padding: '1rem', color: '#888' }}>No hotels found</li>
            )}
            {!loading && results.map(hotel => (
              <li
                key={hotel.id}
                role="option"
                tabIndex={0}
                style={{ padding: '1rem', cursor: 'pointer', borderBottom: '1px solid #333' }}
                onMouseDown={() => handleSelect(hotel)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSelect(hotel);
                }}
                aria-selected={false}
              >
                {hotel.name} - {hotel.city} (Capacity: {hotel.capacity})
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
