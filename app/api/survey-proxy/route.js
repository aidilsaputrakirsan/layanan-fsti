// app/api/survey-proxy/route.js
import { NextResponse } from 'next/server';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw4oaqO977tdo8-04B28UlQtUnkqwN1_ZVjrPH9XMoP3IURcvxkDx1Buu1hAe6wojTpVg/exec';

export async function POST(request) {
  try {
    // Baca JSON body yang dikirim frontend
    const body = await request.json();

    // Teruskan ke Google Apps Script
    const resp = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    // Baca respons GAS
    const data = await resp.json();
    // Kirim balik ke frontend, status sesuai GAS
    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Proxy error: ' + err.message },
      { status: 500 }
    );
  }
}
