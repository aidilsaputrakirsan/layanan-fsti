import SpreadsheetTrackingPage from '@/components/tracking/SpreadsheetTrackingPage';

export default function MahasiswaTrackingPage() {
  return (
    <SpreadsheetTrackingPage
      spreadsheetId="1uwN4SH1h_qnMLtX2O1BIpBpI9FoodUw3MgQ4dTWvtHc"
      i18nPrefix="studentTracking"
      sheetTitle={{ id: 'Tracking Permohonan Surat Mahasiswa — FSTI', en: 'Student Letter Request Tracking — FSTI' }}
      searchHint={{
        id: 'Klik tabel, lalu tekan Ctrl+F (Cmd+F di Mac) dan ketik NIM Anda.',
        en: 'Click the table, then press Ctrl+F (Cmd+F on Mac) and type your NIM.',
      }}
    />
  );
}
