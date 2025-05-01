import { NextResponse } from 'next/server';
/**
 * CORS Proxy for Google Apps Script
 * Membantu mengatasi masalah CORS ketika memanggil Google Apps Script dari browser
 * Supports both faculty and student tracking systems
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
   
    // Get all possible search parameters
    const id = searchParams.get('id');
    const nama = searchParams.get('nama');
    const nip = searchParams.get('nip');
    const nim = searchParams.get('nim'); // Added for student tracking
   
    if (!url) {
      return NextResponse.json(
        { success: false, message: 'Parameter URL diperlukan' },
        { status: 400 }
      );
    }
   
    // Construct the target URL with optional parameters
    let targetUrl = url;
    const params = [];
    if (id) {
      params.push(`id=${encodeURIComponent(id)}`);
    }
    if (nama) {
      params.push(`nama=${encodeURIComponent(nama)}`);
    }
    if (nip) {
      params.push(`nip=${encodeURIComponent(nip)}`);
    }
    if (nim) {
      params.push(`nim=${encodeURIComponent(nim)}`);
    }
    if (params.length > 0) {
      targetUrl += `?${params.join('&')}`;
    }
   
    console.log("Fetching from URL:", targetUrl);
   
    // Fetch data from the Google Apps Script
    const response = await fetch(targetUrl);
   
    if (!response.ok) {
      console.error("Error response from target:", response.status, response.statusText);
      return NextResponse.json(
        { success: false, message: `Error dari target: ${response.statusText}` },
        { status: response.status }
      );
    }
   
    // Get the response as JSON
    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      return NextResponse.json(
        { success: false, message: 'Error parsing response: ' + error.message },
        { status: 500 }
      );
    }
   
    // Return the data
    return NextResponse.json(data);
  } catch (error) {
    console.error('CORS Proxy error:', error);
    return NextResponse.json(
      { success: false, message: 'Error in CORS proxy: ' + error.message },
      { status: 500 }
    );
  }
}

/**
 * Add POST method to handle survey form submissions and other POST requests
 */
export async function POST(request) {
  try {
    // Extract the URL parameter from the query string
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    
    if (!url) {
      return NextResponse.json(
        { success: false, message: 'Parameter URL diperlukan' },
        { status: 400 }
      );
    }
    
    // Get the JSON body
    const body = await request.json();
    
    console.log("Sending data to URL:", url);
    console.log("Request data:", body);
    
    // Forward the request to Google Apps Script
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      console.error("Error response from target:", response.status, response.statusText);
      return NextResponse.json(
        { success: false, message: `Error dari target: ${response.statusText}` },
        { status: response.status }
      );
    }
    
    // Get the response as JSON
    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      return NextResponse.json(
        { success: false, message: 'Error parsing response: ' + error.message },
        { status: 500 }
      );
    }
    
    // Return the data
    return NextResponse.json(data);
  } catch (error) {
    console.error('CORS Proxy error:', error);
    return NextResponse.json(
      { success: false, message: 'Error in CORS proxy: ' + error.message },
      { status: 500 }
    );
  }
}