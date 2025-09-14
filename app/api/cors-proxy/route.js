import { NextResponse } from 'next/server';

/**
 * CORS Proxy dengan timeout handling untuk GAS
 * Updated untuk handle semua parameters termasuk sheet selector
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    
    // Ambil semua parameter yang mungkin diperlukan
    const id = searchParams.get('id');
    const nama = searchParams.get('nama');
    const nip = searchParams.get('nip');
    const nim = searchParams.get('nim');
    const types = searchParams.get('types');
    const force_sync = searchParams.get('force_sync');
    const sheet = searchParams.get('sheet'); // NEW: Sheet selector parameter
    
    if (!url) {
      return NextResponse.json(
        { success: false, message: 'Parameter URL diperlukan' },
        { status: 400 }
      );
    }
    
    // Construct target URL dengan semua parameters
    let targetUrl = url;
    const params = [];
    
    if (id) params.push(`id=${encodeURIComponent(id)}`);
    if (nama) params.push(`nama=${encodeURIComponent(nama)}`);
    if (nip) params.push(`nip=${encodeURIComponent(nip)}`);
    if (nim) params.push(`nim=${encodeURIComponent(nim)}`);
    if (types) params.push(`types=${encodeURIComponent(types)}`);
    if (force_sync) params.push(`force_sync=${encodeURIComponent(force_sync)}`);
    if (sheet) params.push(`sheet=${encodeURIComponent(sheet)}`); // NEW
    
    if (params.length > 0) {
      targetUrl += `?${params.join('&')}`;
    }
    
    console.log("Fetching from:", targetUrl);
    
    // TIMEOUT CONTROLLER - 30 detik untuk single sheet search
    const timeoutDuration = sheet ? 30000 : 90000; // 30s for single sheet, 90s for all sheets
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);
    
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Vercel)',
        'Accept': 'application/json',
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.error("Error from GAS:", response.status);
      return NextResponse.json(
        { success: false, message: `GAS Error: ${response.status}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('CORS Proxy error:', error);
    
    // Handle timeout specifically
    if (error.name === 'AbortError') {
      return NextResponse.json(
        {
          success: false,
          message: 'Request timeout. Please try selecting a specific document type to speed up search.',
          error: 'TIMEOUT'
        },
        { status: 408 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Proxy error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    
    if (!url) {
      return NextResponse.json(
        { success: false, message: 'Parameter URL diperlukan' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // Timeout controller untuk POST juga
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; Vercel)',
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: `GAS Error: ${response.status}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { success: false, message: 'Request timeout', error: 'TIMEOUT' },
        { status: 408 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Proxy error: ' + error.message },
      { status: 500 }
    );
  }
}