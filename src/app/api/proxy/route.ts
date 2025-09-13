import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

// Change this to your backend URL
const BACKEND_URL = 'http://localhost:8080';

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url');
    if (!url) {
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


        const res = await fetch(`${BACKEND_URL}${url}`, {
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
    const url = req.nextUrl.searchParams.get('url');
    if (!url) {
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
        const res = await fetch(`${BACKEND_URL}${url}`, {
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
