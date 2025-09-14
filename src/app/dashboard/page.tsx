'use client';
import React, {useContext, useEffect, useState} from 'react';
import {useUser} from '@/context/UserContext';

const Dashboard = () => {
    const {userInfo} = useUser();
    const [rfps, setRfps] = useState<any>([]);

    useEffect(() => {
        const getRfps = async () => {
            try {
                const res = await fetch('/api/proxy/v1/rfps', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });
                if (res.ok) {
                    const data = await res.json();
                    setRfps(data.content);
                } else {
                    setRfps([]);
                }
            } catch (e) {
                setRfps([]);
            }
        }
        getRfps();
    }, [userInfo]);




    return (
        <div>
            {userInfo?.role === 'BUYER' && (
                <div>
                    <ul style={{padding: 0, margin: 0}}>
                        <h2 style={{
                            color: '#fff',
                            padding: '1rem 2rem',
                            borderRadius: '4px',
                            fontWeight: 600,
                            fontSize: '1.35rem',
                            letterSpacing: '0.5px'
                        }}>Your RFPs</h2>
                        {rfps.map((rfp: any) => (
                            <li
                                key={rfp.id}
                                style={{
                                    listStyle: 'none',
                                    background: '#222',
                                    color: '#fff',
                                    borderRadius: '4px',
                                    margin: '0.75rem auto',
                                    padding: '1rem 2rem',
                                    // maxWidth: '800px',
                                    width: '95%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: '2rem',
                                    flexWrap: 'wrap',
                                }}
                            >
                                <div style={{
                                    minWidth: '120px',
                                    fontWeight: 'bold',
                                    fontSize: '1.05rem'
                                }}>{rfp.venue.name || 'Venue N/A'}</div>
                                <div>
                                    <strong>Date:</strong> {rfp.eventDate ? new Date(rfp.eventDate).toLocaleDateString() : 'N/A'}
                                </div>
                                <div><strong>Guests:</strong> {rfp.headcount ?? 'N/A'}</div>
                                <div><strong>Budget:</strong> ₹{rfp.budgetMin ?? 'N/A'} - ₹{rfp.budgetMax ?? 'N/A'}
                                </div>
                                <div style={{flex: 3}}><strong>Notes:</strong> {rfp.notes ?? 'N/A'}</div>
                                <div><strong>Status:</strong> {rfp.status ?? 'N/A'}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {userInfo?.role === 'VENUE_OWNER' && (
                <div>
                    <ul style={{padding: 0, margin: 0}}>
                        <h2 style={{
                            color: '#fff',
                            padding: '1rem 2rem',
                            borderRadius: '4px',
                            fontWeight: 600,
                            fontSize: '1.35rem',
                            letterSpacing: '0.5px'
                        }}>Your RFPs</h2>
                        {rfps.map((rfp: any) => (
                            <li
                                key={rfp.id}
                                style={{
                                    listStyle: 'none',
                                    background: '#222',
                                    color: '#fff',
                                    borderRadius: '4px',
                                    margin: '0.75rem auto',
                                    padding: '1rem 2rem',
                                    // maxWidth: '800px',
                                    width: '95%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: '2rem',
                                    flexWrap: 'wrap',
                                }}
                            >
                                <div style={{
                                    minWidth: '120px',
                                    fontWeight: 'bold',
                                    fontSize: '1.05rem'
                                }}>{rfp.buyer.firstName}</div>
                                <div>
                                    <strong>Date:</strong> {rfp.eventDate ? new Date(rfp.eventDate).toLocaleDateString() : 'N/A'}
                                </div>
                                <div><strong>Guests:</strong> {rfp.headcount ?? 'N/A'}</div>
                                <div><strong>Budget:</strong> ₹{rfp.budgetMin ?? 'N/A'} - ₹{rfp.budgetMax ?? 'N/A'}
                                </div>
                                <div style={{flex: 3}}><strong>Notes:</strong> {rfp.notes ?? 'N/A'}</div>
                                <div><strong>Status:</strong> {rfp.status === "SUBMITTED" ? "RECEIVED" : rfp.status}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
