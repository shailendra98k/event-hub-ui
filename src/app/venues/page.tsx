'use client';
import React, {useEffect, useState} from 'react';
const VenuesListPage: React.FC = () => {
    const [city, setCity] = useState('');
    const [capacity, setCapacity] = useState<number | ''>('');
    const [filteredVenues, setFilteredVenues] = useState<[{name: string, id:number, image: string, rate: number,capacity: number, description: string, city: string}]>();
    const fetchVenues = async () => {
        const res = await fetch(`/api/proxy/v1/venues?minCapacity=${capacity}&city=${city}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });

        if (res.ok) {
            const data = await res.json();
            console.log('data', data);
            setFilteredVenues(data);
        }

    };
    useEffect(() => {

        fetchVenues();
    }, []);

    const handleFilter = () => {
        fetchVenues();
    }

	return (
		<main style={{ padding: '2rem' }}>
			<h1 style={{ marginBottom: '2rem' }}>Venues</h1>
			<div
				className="venue-filter-bar"
				style={{
					display: 'flex',
					flexDirection: 'row',
					gap: 12,
					marginBottom: '2rem',
					maxWidth: 600,
					width: '100%',
				}}
			>
				<input
					aria-label="City name"
					type="text"
					placeholder="Enter city name..."
					value={city}
					onChange={e => setCity(e.target.value)}
					style={{
						flex: 2,
						padding: '0.75rem 1rem',
						borderRadius: 8,
						border: '1px solid #ccc',
						fontSize: 18,
						minWidth: 0,
					}}
				/>
				<input
					aria-label="Guest capacity"
					type="number"
					min={1}
					placeholder="Guest capacity required..."
					value={capacity}
					onChange={e =>
						setCapacity(
							e.target.value === '' ? '' : Number(e.target.value)
						)
					}
					style={{
						flex: 1,
						padding: '0.75rem 1rem',
						borderRadius: 8,
						border: '1px solid #ccc',
						fontSize: 18,
						minWidth: 0,
					}}
				/>
				<button
					onClick={handleFilter}
					style={{
						flex: 1,
						padding: '0.75rem 1rem',
						borderRadius: 8,
						background: '#222',
						color: '#fff',
						fontSize: 18,
						border: 'none',
						cursor: 'pointer',
						minWidth: 0,
					}}
				>
					Filter
				</button>
			</div>
			<ul
				style={{
					listStyle: 'none',
					padding: 0,
					display: 'flex',
					flexDirection: 'column',
					gap: '2rem',
					width: '100%', // Ensure ul takes full width of parent
					boxSizing: 'border-box',
					overflowX: 'hidden', // Prevent horizontal scroll
				}}
			>
				{filteredVenues?.map(venue => (
					<li
						key={venue.id}
						style={{
							display: 'flex',
							gap: '2rem',
							alignItems: 'center',
							background: '#222',
							color: '#fff',
							borderRadius: 12,
							boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
							padding: '1.5rem',
							width: '100%', // Make li take full width
							boxSizing: 'border-box',
							overflow: 'hidden', // Prevent content overflow
						}}
					>
						<img
							src={venue?.image}
							alt={venue.name}
							style={{
								width: 120,
								height: 80,
								objectFit: 'cover',
								borderRadius: 8,
								background: '#444',
								maxWidth: '100%',
							}}
						/>
						<div style={{ flex: 1, minWidth: 0 }}>
							<h2 style={{ margin: 0 }}>{venue.name}</h2>
							<p style={{ margin: '0.5rem 0' }}>{venue.description}</p>
							<div
								style={{
									display: 'flex',
									gap: '2rem',
									marginTop: '0.5rem',
								}}
							>
								<span>
									<strong>Rate:</strong> {venue.rate}
								</span>
                                <span>
									<strong>Capacity:</strong> {venue.capacity}
								</span>
                                <span>
									<strong>City:</strong> {venue.city}
								</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <style jsx>{`
                @media (max-width: 700px) {
                    .venue-filter-bar {
                        flex-direction: column !important;
                        gap: 8px !important;
                        max-width: 100% !important;
                    }

                    .venue-filter-bar input,
                    .venue-filter-bar button {
                        font-size: 16px !important;
                        padding: 0.75rem 0.5rem !important;
                        width: 100% !important;
                        min-width: 0 !important;
                    }
                }
            `}</style>
        </main>
    );
};

export default VenuesListPage;
