import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

// Change this to your backend URL
const BACKEND_URL = 'http://localhost:8080/api';

export async function GET(req: NextRequest) {
    console.log('req.nextUrl: ',req.nextUrl);
    const proxyUrl = req.nextUrl.pathname.split('/api/proxy')[1] + req.nextUrl.search;
    if (!proxyUrl) {
        return NextResponse.json({error: 'Missing url parameter'}, {status: 400});
    }
    try {
        let token = '';
        const cookieHeader = req.headers.get('cookie');
        if (cookieHeader) {
            const match = cookieHeader.match(/jwtToken=([^;]+)/);
            if (match) {
                token = match[1];
            }
        }

        console.log("Proxy url : ", proxyUrl)


        const res = await fetch(`${BACKEND_URL}${proxyUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({error: 'Proxy error', details: String(error)}, {status: 500});
    }
}

export async function POST(req: NextRequest) {
    const proxyUrl = req.nextUrl.pathname.split('/api/proxy')[1]
    if (!proxyUrl) {
        return NextResponse.json({error: 'Missing url parameter'}, {status: 400});
    }

    let token = '';
    const cookieHeader = req.headers.get('cookie');
    if (cookieHeader) {
        const match = cookieHeader.match(/jwtToken=([^;]+)/);
        if (match) {
            token = match[1];
        }
    }
    const body = await req.json();
    try {
        const res = await fetch(`${BACKEND_URL}${proxyUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return NextResponse.json(data, {status: res.status});
    } catch (error) {
        return NextResponse.json({error: error, details: String(error)}, {status: 500});
    }
}
