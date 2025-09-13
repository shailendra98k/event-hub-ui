'use client';
import React, { useState } from 'react';

const venues = [
  {
    id: 1,
    name: 'Venue A',
    image: '/venue-a.jpg',
    description: 'A beautiful venue in the heart of the city.',
    rate: '$200/night',
    capacity: 100,
    city: 'New York',
  },
  {
    id: 2,
    name: 'Venue B',
    image: '/venue-b.jpg',
    description: 'Spacious and modern venue for all occasions.',
    rate: '$350/night',
    capacity: 200,
    city: 'London',
  },
  {
    id: 3,
    name: 'Venue C',
    image: '/venue-c.jpg',
    description: 'Cozy venue with excellent amenities.',
    rate: '$150/night',
    capacity: 50,
    city: 'Paris',
  },
];

const VenuesListPage: React.FC = () => {
  const [city, setCity] = useState('');
  const [capacity, setCapacity] = useState<number | ''>('');
  const [filteredVenues, setFilteredVenues] = useState(venues);

  const handleFilter = () => {
    const filtered = venues.filter(v =>
      v.city.toLowerCase().includes(city.toLowerCase()) &&
      (capacity === '' || v.capacity >= Number(capacity))
    );
    setFilteredVenues(filtered);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Venues</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 12, marginBottom: '2rem', maxWidth: 600 }}>
        <input
          aria-label="City name"
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={e => setCity(e.target.value)}
          style={{ flex: 2, padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #ccc', fontSize: 18 }}
        />
        <input
          aria-label="Guest capacity"
          type="number"
          min={1}
          placeholder="Guest capacity required..."
          value={capacity}
          onChange={e => setCapacity(e.target.value === '' ? '' : Number(e.target.value))}
          style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #ccc', fontSize: 18 }}
        />
        <button
          onClick={handleFilter}
          style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: 8, background: '#222', color: '#fff', fontSize: 18, border: 'none', cursor: 'pointer' }}
        >
          Filter
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {filteredVenues.map(venue => (
          <li key={venue.id} style={{ display: 'flex', gap: '2rem', alignItems: 'center', background: '#222', color: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '1.5rem' }}>
            <img
              src={venue.image}
              alt={venue.name}
              style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8, background: '#444' }}
            />
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0 }}>{venue.name}</h2>
              <p style={{ margin: '0.5rem 0' }}>{venue.description}</p>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                <span><strong>Rate:</strong> {venue.rate}</span>
                <span><strong>Capacity:</strong> {venue.capacity}</span>
                <span><strong>City:</strong> {venue.city}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default VenuesListPage;
