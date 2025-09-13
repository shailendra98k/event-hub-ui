import React from 'react';

const venues = [
  {
    id: 1,
    name: 'Venue A',
    images: ['/venue-a.jpg', '/venue-a2.jpg'],
    description: 'A beautiful venue in the heart of the city.',
    rate: '$200/night',
    capacity: 100,
    city: 'New York',
  },
  {
    id: 2,
    name: 'Venue B',
    images: ['/venue-b.jpg'],
    description: 'Spacious and modern venue for all occasions.',
    rate: '$350/night',
    capacity: 200,
    city: 'London',
  },
  {
    id: 3,
    name: 'Venue C',
    images: ['/venue-c.jpg'],
    description: 'Cozy venue with excellent amenities.',
    rate: '$150/night',
    capacity: 50,
    city: 'Paris',
  },
];

interface VenueProfileProps {
  params: { id: string };
}

const VenueProfilePage: React.FC<VenueProfileProps> = ({ params }) => {
  const venue = venues.find(v => v.id === Number(params.id));

  if (!venue) {
    return <main style={{ padding: '2rem' }}><h1>Venue not found</h1></main>;
  }

  return (
    <main style={{ padding: '2rem', maxWidth: 800, minHeight:'65vh', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>{venue.name}</h1>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        {venue.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${venue.name} image ${idx + 1}`}
            style={{ width: 240, height: 160, objectFit: 'cover', borderRadius: 12, background: '#444' }}
          />
        ))}
      </div>
      <p style={{ marginBottom: '1rem' }}>{venue.description}</p>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
        <span><strong>Rate:</strong> {venue.rate}</span>
        <span><strong>Capacity:</strong> {venue.capacity}</span>
        <span><strong>City:</strong> {venue.city}</span>
      </div>
    </main>
  );
};

export default VenueProfilePage;

