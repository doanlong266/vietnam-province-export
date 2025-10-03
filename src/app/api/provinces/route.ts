import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];

        const apiUrl = process.env.NEXT_PUBLIC_VIETNAM_API_URL;
        if (!apiUrl) {
            return NextResponse.json({ error: 'API URL is not configured' }, { status: 500 });
        }

        const fullApiUrl = `${apiUrl}address-kit/${date}/provinces`;
        console.log(fullApiUrl)
        const response = await fetch(fullApiUrl);
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch provinces' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
