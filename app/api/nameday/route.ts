import { NextResponse } from 'next/server';

export async function GET() {
  const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

  try {
    const now = new Date();
    const months = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];
    const monthName = months[now.getMonth()];
    const day = now.getDate();
    
    // User-provided Heroku API - expects month name as string
    const url = `https://name-day-backend-0d74dcea0ed2.herokuapp.com/api/v1/namedays/${monthName}/${day}/hu`;
    
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      next: { revalidate: 3600 }
    });
    
    if (res.ok) {
      const data = await res.json();
      // The API structure from the screenshot suggests it returns name day data
      // We'll normalize it for our widget
      return NextResponse.json(data);
    }
    
    throw new Error('Heroku API failed');
  } catch (error) {
    console.error('Nameday proxy error:', error);
    return NextResponse.json({ error: 'Nincs adat' }, { status: 500 });
  }
}
