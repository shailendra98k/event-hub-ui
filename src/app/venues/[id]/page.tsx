'use client';
import React, {useEffect, useState} from 'react';
import { useParams } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const QuoteRequestModal = ({ venueId, onClose }: { venueId: any, onClose: () => void }) => {
    const [eventDate, setEventDate] = useState('');
    const [headcount, setHeadcount] = useState<number | ''>('');
    const [budgetMin, setBudgetMin] = useState<number | ''>('');
    const [budgetMax, setBudgetMax] = useState<number | ''>('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const res = await fetch('/api/proxy/v1/rfps', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    venueId,
                    eventDate: eventDate+"T00:00:00Z",
                    headcount,
                    budgetMin,
                    budgetMax,
                    notes,
                }),
            });
            if (res.ok) {
                setSuccess(true);
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to request quote');
            }
        } catch (e) {
            setError('Failed to request quote');
        }
        setLoading(false);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
        }}
            onClick={onClose}
        >
            <form
                onClick={e => e.stopPropagation()}
                onSubmit={handleSubmit}
                style={{
                    background: '#fff',
                    color: '#222',
                    borderRadius: 12,
                    padding: '2rem',
                    minWidth: 320,
                    maxWidth: 400,
                    boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
                    position: 'relative',
                }}
            >
                <h2 style={{ marginBottom: '1rem' }}>Request Quote</h2>
                <label style={{ display: 'block', marginBottom: 8 }}>Event Date</label>
                <input
                    type="date"
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #ccc' }}
                />
                <label style={{ display: 'block', marginBottom: 8 }}>Headcount</label>
                <input
                    type="number"
                    min={1}
                    value={headcount}
                    onChange={e => setHeadcount(e.target.value === '' ? '' : Number(e.target.value))}
                    required
                    style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #ccc' }}
                />
                <div style={{ display: 'flex', gap: 12, marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: 8 }}>Budget Min</label>
                        <input
                            type="number"
                            min={0}
                            value={budgetMin}
                            onChange={e => setBudgetMin(e.target.value === '' ? '' : Number(e.target.value))}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: 8 }}>Budget Max</label>
                        <input
                            type="number"
                            min={0}
                            value={budgetMax}
                            onChange={e => setBudgetMax(e.target.value === '' ? '' : Number(e.target.value))}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #ccc' }}
                        />
                    </div>
                </div>
                <label style={{ display: 'block', marginBottom: 8 }}>Notes</label>
                <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    rows={3}
                    style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #ccc' }}
                />
                {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                {success && <div style={{ color: 'green', marginBottom: '1rem' }}>Quote request sent successfully!</div>}
                <button
                    type="submit"
                    disabled={loading}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 8, background: '#222', color: '#fff', fontSize: 18, border: 'none', cursor: 'pointer', marginBottom: 8 }}
                >
                    {loading ? 'Requesting...' : 'Submit Request'}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 8, background: '#888', color: '#fff', fontSize: 16, border: 'none', cursor: 'pointer' }}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

const VenueProfilePage: React.FC = () => {

    const [venue, setVenue] = React.useState<any>(null);
    const { userInfo } = useUser();
    const [showTooltip, setShowTooltip] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

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
    }, [userInfo]);

    const handleOpenModal = () => {
        if (userInfo?.email) {
            setModalOpen(true);
        } else {
            setShowTooltip(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setShowTooltip(false);
    };

    if (!venue) {
        return <main style={{padding: '2rem', minHeight:'65vh'}}><h1>Venue not found</h1></main>;
    }

    // @ts-ignore
    // @ts-ignore
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
            <div style={{ marginTop: '2rem', position: 'relative', height: 60, display: 'flex', alignItems: 'center' }}>
                <button
                    style={{
                        padding: '0.75rem 2rem',
                        borderRadius: 8,
                        background: userInfo?.email ? '#222' : '#888',
                        color: '#fff',
                        fontSize: 18,
                        border: 'none',
                        cursor: userInfo?.email ? 'pointer' : 'not-allowed',
                        opacity: userInfo?.email ? 1 : 0.7,
                        position: 'relative',
                    }}
                    onMouseEnter={() => { userInfo?.email  && setShowTooltip(false) }}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={handleOpenModal}
                >
                    Request Quote
                </button>
                {showTooltip && (
                    <div style={{
                        position: 'absolute',
                        left: '25%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: '#222',
                        color: '#fff',
                        padding: '0.5rem 1rem',
                        borderRadius: 8,
                        fontSize: 15,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        zIndex: 10,
                        whiteSpace: 'nowrap',
                        marginLeft: 12,
                    }}>
                        Please login to request a quote
                    </div>
                )}
            </div>
            {modalOpen && <QuoteRequestModal venueId={venueId} onClose={handleCloseModal} />}
        </main>
    );
};

export default VenueProfilePage;
