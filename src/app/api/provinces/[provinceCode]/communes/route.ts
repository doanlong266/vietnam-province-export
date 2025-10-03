import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ provinceCode: string }> }) {
    try {
        const { provinceCode } = await params;

        const date = new URL(req.url).searchParams.get('date') || new Date().toISOString().split('T')[0];

        if (!provinceCode) {
            return NextResponse.json({ error: 'Province code is required' }, { status: 400 });
        }

        const apiUrl = process.env.NEXT_PUBLIC_VIETNAM_API_URL;
        if (!apiUrl) {
            return NextResponse.json({ error: 'API URL is not configured' }, { status: 500 });
        }

        const fullApiUrl = `${apiUrl}address-kit/${date}/provinces/${provinceCode}/communes`;

        const response = await fetch(fullApiUrl);
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch communes' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
