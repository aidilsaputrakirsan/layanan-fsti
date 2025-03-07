// app/api/tracking/route.js

import { NextResponse } from 'next/server';
import { fetchAllDocuments, findDocumentByTrackingNumber } from '@/lib/googleSheetsApi';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const trackingNumber = searchParams.get('id');
    
    if (trackingNumber) {
      // Search for a specific document
      const document = await findDocumentByTrackingNumber(trackingNumber);
      
      if (document) {
        return NextResponse.json({ success: true, document });
      } else {
        return NextResponse.json(
          { success: false, message: 'Document not found' },
          { status: 404 }
        );
      }
    } else {
      // Return all documents
      const documents = await fetchAllDocuments();
      return NextResponse.json({ success: true, documents });
    }
  } catch (error) {
    console.error('Error in tracking API:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tracking data' },
      { status: 500 }
    );
  }
}