// lib/googleSheetsApi.js

const SPREADSHEET_ID = '1ROQyqEn-CxBN6KTKZ6Yrt1iOU1YkmKIY5XhYZ1v_3-A';
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

/**
 * Fetches all sheets from the specified Google Spreadsheet
 * @returns {Promise<Array>} List of sheet objects with id and title
 */
export async function fetchSheetsList() {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch spreadsheet information');
    }
    
    const data = await response.json();
    return data.sheets.map(sheet => ({
      id: sheet.properties.sheetId,
      title: sheet.properties.title
    }));
  } catch (error) {
    console.error('Error fetching sheets list:', error);
    throw error;
  }
}

/**
 * Fetches data from a specific sheet in the Google Spreadsheet
 * @param {string} sheetTitle - The title of the sheet to fetch
 * @returns {Promise<Array>} Array of document objects
 */
export async function fetchSheetData(sheetTitle) {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetTitle)}?key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data from sheet ${sheetTitle}`);
    }
    
    const data = await response.json();
    
    if (!data.values || data.values.length <= 1) {
      return []; // No data or only headers
    }
    
    // First row contains headers
    const headers = data.values[0];
    
    // Transform the data into objects
    return data.values.slice(1).map((row, index) => {
      // Map spreadsheet columns to document object
      const document = {
        sheetName: sheetTitle,
        id: findValueByHeader(row, headers, 'Nomor Referensi') || `${sheetTitle}-${index + 1}`,
        type: sheetTitle,
        title: findValueByHeader(row, headers, 'Judul') || 'No Title',
        requestor: findValueByHeader(row, headers, 'Nama Pemohon') || 'N/A',
        date: findValueByHeader(row, headers, 'Tanggal Pengajuan') || 'N/A',
        status: mapStatusToSystem(findValueByHeader(row, headers, 'Status') || 'Menunggu'),
        currentStep: findValueByHeader(row, headers, 'Tahap Saat Ini') || '1',
        totalSteps: 4, // Default number of steps
        lastUpdate: findValueByHeader(row, headers, 'Terakhir Diperbarui') || 'N/A',
      };
      
      // Build timeline based on document data
      document.timeline = buildTimelineFromStatus(document);
      
      return document;
    });
  } catch (error) {
    console.error(`Error fetching ${sheetTitle} data:`, error);
    return [];
  }
}

/**
 * Helper function to find a value in a row by header name
 * @param {Array} row - The data row
 * @param {Array} headers - The headers row
 * @param {string} headerName - The header name to look for
 * @returns {string|null} The value or null if not found
 */
function findValueByHeader(row, headers, headerName) {
  const index = headers.findIndex(header => 
    header.toLowerCase().includes(headerName.toLowerCase())
  );
  
  if (index === -1 || index >= row.length) {
    return null;
  }
  
  return row[index];
}

/**
 * Maps status strings from spreadsheet to system status values
 * @param {string} status - Status from spreadsheet
 * @returns {string} System status value
 */
function mapStatusToSystem(status) {
  const statusMapping = {
    'Menunggu': 'pending',
    'Diproses': 'in-progress',
    'Selesai': 'completed',
  };
  
  return statusMapping[status] || 'pending';
}

/**
 * Builds timeline steps based on document status
 * @param {Object} document - The document object
 * @returns {Array} Array of timeline step objects
 */
function buildTimelineFromStatus(document) {
  const currentStep = parseInt(document.currentStep);
  
  const timeline = [
    {
      title: "Pengajuan Diterima",
      description: "Dokumen telah diterima dan sedang diverifikasi",
      date: document.date,
      status: "completed"
    },
    {
      title: "Verifikasi Dokumen",
      description: "Dokumen sedang dalam proses verifikasi",
      date: currentStep >= 2 ? document.lastUpdate : "-",
      status: currentStep >= 2 ? "completed" : 
             (document.status === "in-progress" && currentStep === 1) ? "active" : "pending"
    },
    {
      title: "Dalam Proses Pengesahan",
      description: "Dokumen sedang dalam proses pengesahan oleh pejabat terkait",
      date: currentStep >= 3 ? document.lastUpdate : "-",
      status: currentStep >= 3 ? "completed" : 
             (document.status === "in-progress" && currentStep === 2) ? "active" : "pending"
    },
    {
      title: "Selesai",
      description: "Dokumen siap untuk diambil atau dikirim",
      date: document.status === "completed" ? document.lastUpdate : "-",
      status: document.status === "completed" ? "completed" : "pending"
    }
  ];
  
  return timeline;
}

/**
 * Fetches all documents from all sheets
 * @returns {Promise<Array>} Array of all document objects
 */
export async function fetchAllDocuments() {
  try {
    // First get all sheets
    const sheets = await fetchSheetsList();
    
    // Then fetch data from each sheet
    const allDocsPromises = sheets.map(sheet => 
      fetchSheetData(sheet.title)
    );
    
    // Wait for all data to be fetched
    const allSheetsData = await Promise.all(allDocsPromises);
    
    // Merge data from all sheets
    return allSheetsData.flat();
  } catch (error) {
    console.error('Error fetching all documents:', error);
    return [];
  }
}

/**
 * Find a document by its tracking number
 * @param {string} trackingNumber - The document's tracking number
 * @returns {Promise<Object|null>} The document object or null if not found
 */
export async function findDocumentByTrackingNumber(trackingNumber) {
  try {
    const allDocuments = await fetchAllDocuments();
    return allDocuments.find(doc => doc.id === trackingNumber) || null;
  } catch (error) {
    console.error('Error finding document:', error);
    return null;
  }
}