// Pastikan file MainLayout.tsx ada di path:
// components/layout/MainLayout.tsx

// 1. Coba path relatif:
import MainLayout from '../components/layout/MainLayout';

// 2. Atau jika @/ alias dikonfigurasi dengan benar di tsconfig.json,
//    Anda bisa menggunakan:
import MainLayout from '@/components/layout/MainLayout';

// 3. Cek apakah file MainLayout di-export dengan benar:
//    File MainLayout seharusnya memiliki default export seperti:
export default MainLayout;