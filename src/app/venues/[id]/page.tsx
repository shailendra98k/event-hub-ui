'use client';
import React, {useEffect} from 'react';
import { useParams } from 'next/navigation';




const VenueProfilePage: React.FC = () => {

    const [venue, setVenue] = React.useState<any>(null);


    const params = useParams();
    const venueId = params.id;


    useEffect(() => {
        const getVenue = async () => {
            const res = await fetch(`/api/proxy/v1/venues/${venueId}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
            if (res.ok) {
                const data = await res.json();
                setVenue(data)
            } else {
                setVenue(null)
            }
        }
        getVenue();
    }, []);


    if (!venue) {
        return <main style={{padding: '2rem', minHeight:'65vh'}}><h1>Venue not found</h1></main>;
    }

    return (
        <main style={{padding: '2rem', maxWidth: 800, minHeight: '65vh', margin: '0 auto'}}>
            <h1 style={{marginBottom: '1rem'}}>{venue?.name}</h1>
            <div style={{display: 'flex', gap: '2rem', marginBottom: '2rem'}}>
                {venue?.images?.map((img: any, idx: any) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`${venue?.name} image ${idx + 1}`}
                        style={{width: 240, height: 160, objectFit: 'cover', borderRadius: 12, background: '#444'}}
                    />
                ))}
            </div>
            <p style={{marginBottom: '1rem'}}>{venue?.description}</p>
            <div style={{display: 'flex', gap: '2rem', marginBottom: '1rem'}}>
                <span><strong>Rate:</strong> {venue?.rate}</span>
                <span><strong>Capacity:</strong> {venue?.capacityMax}</span>
                <span><strong>City:</strong> {venue?.city}</span>
            </div>
        </main>
    );
};

export default VenueProfilePage;

