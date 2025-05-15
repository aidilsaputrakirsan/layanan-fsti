// Define the structure of our translations
export interface TranslationObject {
    [key: string]: string | TranslationObject;
  }
  
  interface Translations {
    en: TranslationObject;
    id: TranslationObject;
  }
  
  export const translations: Translations = {
    en: {
      // Common
      common: {
        siteTitle: 'Faculty of Science and Information Technology',
        university: 'Kalimantan Institute of Technology',
        email: 'Email Us',
        contact: 'Contact Us',
        backToHome: 'Back to Home',
        backToPrevious: 'Back to Previous Page',
        viewAll: 'View All',
        learnMore: 'Learn More',
        accessService: 'Access Service',
        needHelp: 'Need Help?',
        copyright: '© Faculty of Science and Information Technology - ITK. All Rights Reserved.',
        developedBy: 'Developed by',
      },
      
      // Navigation
      nav: {
        home: 'Home',
        adminServices: 'Administrative Services',
        docTracking: 'Document Tracking',
        contact: 'Contact',
        language: 'Language',
        survey: 'Satisfaction Survey',
      },
      
     // MaklumatPelayanan
      maklumatPelayanan: {
        title: "Service Commitment",
        commitment: "WE HEREBY PROMISE TO PROVIDE EXCELLENT SERVICE IN ACCORDANCE WITH ESTABLISHED STANDARDS, AND IF WE FAIL TO KEEP THIS PROMISE, WE ARE PREPARED TO ACCEPT SANCTIONS IN ACCORDANCE WITH APPLICABLE LAWS AND REGULATIONS"
      },
 
      // Homepage
      home: {
        hero: {
          title: 'Faculty of Science and Information Technology',
          subtitle: 'Kalimantan Institute of Technology',
          description: 'Serving the academic community\'s administrative needs quickly, efficiently, and transparently to support academic excellence.',
          viewServices: 'View Services',
          trackDocuments: 'Track Documents',
        },
        popularServices: {
          title: 'Popular Services',
          description: 'Access the most frequently used administrative services by FSTI ITK students and faculty',
          coverLetterTitle: 'Cover Letters & General Documents',
          coverLetterDesc: 'Request for cover letters and general administrative documents for student needs',
          internshipTitle: 'Internship & Final Project',
          internshipDesc: 'Services for documents related to Student Internships, Apprenticeships and Final Projects',
          legalizationTitle: 'Document Legalization',
          legalizationDesc: 'Legalization services for official faculty academic documents such as transcripts and diplomas',
        },
        academicCenter: {
          title: 'Academic Excellence Center',
          description: 'Producing competent, adaptive, and globally competitive graduates',
        },
      },
      
      // Administrative Services
      services: {
        title: 'Administrative Services',
        description: 'Below is a list of administrative services available at the Faculty of Science and Information Technology. Please select the service you need.',
        search: 'Search services...',
        all: 'All',
        students: 'Students',
        lecturers: 'Lecturers',
        servicesList: 'Services List',
        searchResultsFor: 'Search results for',
        notFound: 'Not Found',
        noServicesMatch: 'No services match your search.',
        resetSearch: 'Reset Search',
        workflow: {
          title: 'Administrative Workflow',
          steps: {
            submission: 'Submission',
            verification: 'Verification',
            processing: 'Processing',
            approval: 'Approval',
            distribution: 'Distribution',
            archiving: 'Archiving',
          },
        },
        needHelp: {
          title: 'Need Help?',
          description: 'If you have questions or need assistance with the administrative process, don\'t hesitate to contact us.',
        },
        requirements: 'Requirements',
        steps: 'Steps',
        estimatedTime: 'Estimated Processing Time:',
      },
      
      // Document Tracking
      tracking: {
        title: 'Document Tracking',
        description: 'Track the status of your FSTI administrative documents. Please select your user category to track relevant documents.',
        lecturerStaff: 'Lecturers & Staff',
        students: 'Students',
        lecturerDesc: 'Track your documents such as Assignment Letters, Dean\'s Signatures, and Facility Loans.',
        studentDesc: 'Track student documents such as Active Student Letters, Research Permits, Transcripts, and others.',
        faq: {
          title: 'Frequently Asked Questions',
          whatIs: {
            question: 'What is the Document Tracking System?',
            answer: 'The Document Tracking System is FSTI ITK\'s digital service that allows you to track the status of documents being processed. With this system, you can know the position of your document in the processing flow in real-time.'
          },
          howToUse: {
            question: 'How to use this system?',
            answer: 'Choose the user type (Lecturer/Staff or Student), then enter your name or NIP/NIM in the search form. The system will display all documents related to the data you entered.'
          },
          processingTime: {
            question: 'How long is the document submission process?',
            answer: 'Processing times vary depending on the type of document. It generally ranges from 1-5 working days. Detailed processing times for each type of document can be seen on the Administrative Services page.'
          },
          statusNotChanging: {
            question: 'What should I do if the document status doesn\'t change?',
            answer: 'If your document status hasn\'t changed for more than 3 working days, please contact us via email fsti@itk.ac.id or come directly to the FSTI Administration office.'
          },
        },
      },
      
      // Lecturer Tracking
      lecturerTracking: {
        title: 'Lecturer Document Tracking',
        description: 'Track the status of your administrative documents by entering your name or NIP. Monitor your document submission progress in real-time.',
        backToMain: 'Back to main page',
        trackStatus: 'Track Document Status',
        searchInfo: 'Search Information',
        nameLabel: 'Applicant Name',
        nipLabel: 'NIP/NIPPPK/NIPH',
        searchByName: 'Search by Name',
        searchByNip: 'Search by NIP',
        nameExample: 'Example: Adi Mahmud Jaya Marindra',
        nipExample: 'Example: 19860708',
        tracking: 'Track Document',
        searching: 'Searching...',
        loadingData: 'Loading Data...',
        searchResults: 'Search Results',
        documents: 'documents',
        detail: 'Detail View',
        submissionStatus: 'Submission Status',
        timeline: 'Timeline information not available',
        docTypes: {
          assignmentLetter: 'Assignment Letter',
          deanSigning: 'Dean\'s Signing Approval',
          facilityLoan: 'Facility Loan',
        },
        status: {
          reference: 'Reference Number',
          applicant: 'Applicant',
          submissionDate: 'Submission Date',
          organizer: 'Organizer',
          venue: 'Event Venue',
          attendance: 'Attendance As',
          supportingDoc: 'Supporting Document',
          viewDoc: 'View Document',
          docType: 'Document Type',
          resultDoc: 'Result Document',
          facility: 'Facility',
          usageDate: 'Usage Date',
          status: 'Status',
          completed: 'Completed',
          inProgress: 'In Progress',
          pending: 'Waiting',
          rejected: 'Rejected',
        },
        faq: {
          title: 'Frequently Asked Questions',
          whatTypes: {
            question: 'What types of documents can be tracked?',
            answer: 'This system can track three types of documents: Assignment Letters, Dean\'s Signing Approvals, and Facility Loans. Each document type has a different tracking process.'
          },
          howToFind: {
            question: 'How do I find my document?',
            answer: 'You can search for documents by applicant name or NIP/NIPPPK/NIPH. The system will display all documents associated with that name or NIP.'
          },
          processingTime: {
            question: 'How long is the document submission process?',
            answer: 'Processing times vary depending on the type of document. It generally ranges from 1-5 working days. Detailed processing times for each type of document can be seen on the Administrative Services page.'
          },
          statusNotChanging: {
            question: 'What should I do if the document status doesn\'t change?',
            answer: 'If your document status hasn\'t changed for more than 3 working days, please contact us via email fsti@itk.ac.id or come directly to the FSTI Administration office.'
          },
        },
      },
      
      // Student Tracking
      studentTracking: {
        title: 'Student Document Tracking',
        description: 'Track the status of your administrative documents by entering your NIM. Monitor your document submission progress in real-time.',
        backToMain: 'Back to main page',
        trackStatus: 'Track Document Status',
        searchInfo: 'Search Information',
        nimLabel: 'Student ID Number (NIM)',
        nimExample: 'Example: 11220001',
        tracking: 'Track Document',
        searching: 'Searching...',
        loadingData: 'Loading Data...',
        searchResults: 'Search Results',
        documents: 'documents',
        detail: 'Detail View',
        submissionStatus: 'Submission Status',
        timeline: 'Timeline information not available',
        uploadedFiles: "Uploaded Documents",
        adminDocuments: "Documents from Admin",
        docTypes: {
          academicLetter: 'Academic Letter',
          internship: 'Internship',
          postInternship: 'Post-Internship',
          recommendationLetter: 'Recommendation Letter',
          legalization: 'Legalization',
          classDeferral: 'Class Deferral',
          certificateNumber: 'Certificate Number',
          scheduleChange: 'Schedule Change',
          assignmentLetter: 'Assignment Letter',
          deanSigning: 'Dean\'s Signing',
          finalProjectSubmission: 'Final Project Submission',
        },
        status: {
          reference: 'Reference Number',
          student: 'Student Name',
          nim: 'NIM',
          program: 'Study Program',
          date: 'Submission Date',
          partner: 'Partner',
          purpose: 'Purpose',
          startDate: 'Start Date',
          endDate: 'End Date',
          researchLocation: 'Research Location',
          approvalFile: 'Approval File',
          letterFile: 'Letter File',
          notes: 'Notes',
          signature: 'Signature',
          academicYear: 'Academic Year',
          reason: 'Reason',
          certificateCount: 'Certificate Count',
          activity: 'Activity',
          form: 'Form',
          status: 'Status',
          completed: 'Completed',
          inProgress: 'In Progress',
          pending: 'Waiting',
          rejected: 'Rejected',
        },
        fields: {
          letterType: "Letter Type",
          letterPurpose: "Letter Purpose",
          description: "Description",
          partner: "Partner",
          partnerAddress: "Partner Address",
          startDate: "Start Date",
          endDate: "End Date",
          reason: "Reason",
          reportTitle: "Report Title"
        },
        faq: {
          title: 'Frequently Asked Questions',
          whatTypes: {
            question: 'What types of documents can be tracked?',
            answer: 'This system can track various student documents such as Academic Letters, Internship Letters, Recommendation Letters, and others. Each document type has a different tracking process.'
          },
          howToFind: {
            question: 'How do I find my document?',
            answer: 'You can search for documents by NIM. The system will display all documents associated with the NIM you entered.'
          },
          processingTime: {
            question: 'How long is the document submission process?',
            answer: 'Processing times vary depending on the type of document. It generally ranges from 1-5 working days. Detailed processing times for each type of document can be seen on the Administrative Services page.'
          },
          statusNotChanging: {
            question: 'What should I do if the document status doesn\'t change?',
            answer: 'If your document status hasn\'t changed for more than 3 working days, please contact us via email fsti@itk.ac.id or come directly to the FSTI Administration office.'
          },
        },
      },
      
      // Footer
      footer: {
        about: 'FSTI ITK',
        contact: 'Contact',
        organization: 'Organization Structure',
        dean: 'Dean:',
        vdAcademic: 'Vice Dean I (Academic and Student Affairs):',
        vdFinance: 'Vice Dean II (Finance and General Affairs):',
        headScienceData: 'Head of Science and Data Analytics Department:',
        headTEIB: 'Head of Electrical Engineering, Informatics, and Business Department:',
        email: 'Email:',
        phone: 'Phone:',
        finance: 'Finance:',
        academic: 'Academic:',
        operationalHours: 'Operational Hours:',
        operationalTime: 'Monday - Friday, 08.00 - 16.00 WITA',
        quickLinks: 'Quick Links',
        home: 'Home',
        services: 'Administrative Services',
        tracking: 'Document Tracking',
        itkWebsite: 'ITK Website',
      }
    },
    id: {
      // Common
      common: {
        siteTitle: 'Fakultas Sains dan Teknologi Informasi',
        university: 'Institut Teknologi Kalimantan',
        email: 'Email Kami',
        contact: 'Kontak Kami',
        backToHome: 'Kembali ke Beranda',
        backToPrevious: 'Kembali ke Halaman Sebelumnya',
        viewAll: 'Lihat Semua',
        learnMore: 'Pelajari Lebih Lanjut',
        accessService: 'Akses Layanan',
        needHelp: 'Butuh Bantuan?',
        copyright: '© Fakultas Sains dan Teknologi Informasi - ITK. Hak Cipta Dilindungi.',
        developedBy: 'Dikembangkan oleh',
      },
      
      // Navigation
      nav: {
        home: 'Beranda',
        adminServices: 'Layanan Administrasi',
        docTracking: 'Tracking Dokumen',
        contact: 'Kontak',
        language: 'Bahasa',
        survey: 'Survey Kepuasan',
      },

      // Maklumat Pelayanan
      maklumatPelayanan: {
        title: "Maklumat Pelayanan",
        commitment: "DENGAN INI KAMI BERJANJI AKAN MEMBERIKAN PELAYANAN PRIMA SESUAI DENGAN STANDAR YANG DITETAPKAN, DAN APABILA TIDAK MENEPATI JANJI, KAMI SIAP MENERIMA SANKSI SESUAI DENGAN PERATURAN PERUNDANG-UNDANGAN YANG BERLAKU"
      },
            
      // Homepage
      home: {
        hero: {
          title: 'Fakultas Sains dan Teknologi Informasi',
          subtitle: 'Institut Teknologi Kalimantan',
          description: 'Melayani kebutuhan administrasi civitas akademika dengan cepat, efisien, dan transparan untuk mendukung keunggulan akademik.',
          viewServices: 'Lihat Layanan',
          trackDocuments: 'Tracking Dokumen',
        },
        popularServices: {
          title: 'Layanan Populer',
          description: 'Akses layanan administrasi paling sering digunakan oleh mahasiswa dan dosen FSTI ITK',
          coverLetterTitle: 'Surat Pengantar & Dokumen Umum',
          coverLetterDesc: 'Permintaan surat pengantar dan dokumen administratif umum untuk keperluan mahasiswa',
          internshipTitle: 'KP & Tugas Akhir',
          internshipDesc: 'Layanan dokumen terkait Kerja Praktek, Magang dan Tugas Akhir mahasiswa',
          legalizationTitle: 'Legalisasi Dokumen',
          legalizationDesc: 'Layanan legalisasi dokumen akademik resmi fakultas seperti transkrip dan ijazah',
        },
        academicCenter: {
          title: 'Pusat Keunggulan Akademik',
          description: 'Menghasilkan lulusan yang kompeten, adaptif, dan berdaya saing global',
        },
      },
      
      // Administrative Services
      services: {
        title: 'Layanan Administrasi',
        description: 'Berikut adalah daftar layanan administrasi yang tersedia di Fakultas Sains dan Teknologi Informasi. Silakan pilih layanan yang Anda butuhkan.',
        search: 'Cari layanan...',
        all: 'Semua',
        students: 'Mahasiswa',
        lecturers: 'Dosen',
        servicesList: 'Daftar Layanan',
        searchResultsFor: 'Hasil pencarian untuk',
        notFound: 'Tidak Ditemukan',
        noServicesMatch: 'Tidak ada layanan yang sesuai dengan pencarian Anda.',
        resetSearch: 'Reset Pencarian',
        workflow: {
          title: 'Alur Kerja Administrasi',
          steps: {
            submission: 'Pengajuan',
            verification: 'Verifikasi',
            processing: 'Proses',
            approval: 'Pengesahan',
            distribution: 'Distribusi',
            archiving: 'Arsip',
          },
        },
        needHelp: {
          title: 'Butuh Bantuan?',
          description: 'Jika Anda memiliki pertanyaan atau membutuhkan bantuan dalam proses administrasi, jangan ragu untuk menghubungi kami.',
        },
        requirements: 'Persyaratan',
        steps: 'Langkah-langkah',
        estimatedTime: 'Estimasi Waktu Proses:',
      },
      
      // Document Tracking
      tracking: {
        title: 'Tracking Dokumen',
        description: 'Lacak status dokumen administrasi FSTI. Silakan pilih kategori pengguna Anda untuk melacak dokumen yang relevan.',
        lecturerStaff: 'Dosen & Tenaga Kependidikan',
        students: 'Mahasiswa',
        lecturerDesc: 'Lacak dokumen-dokumen Anda seperti Surat Tugas, Pengesahan TTD Dekanat, dan Peminjaman Sarana Prasarana.',
        studentDesc: 'Lacak dokumen-dokumen mahasiswa seperti Surat Keterangan Aktif, Surat Izin Penelitian, Transkrip, dan lainnya.',
        faq: {
          title: 'Pertanyaan Umum',
          whatIs: {
            question: 'Apa itu Sistem Tracking Dokumen?',
            answer: 'Sistem Tracking Dokumen adalah layanan digital FSTI ITK yang memungkinkan Anda melacak status dokumen yang sedang diproses. Dengan sistem ini, Anda dapat mengetahui posisi dokumen Anda dalam alur pemrosesan secara real-time.'
          },
          howToUse: {
            question: 'Bagaimana cara menggunakan sistem ini?',
            answer: 'Pilih jenis pengguna (Dosen/Tendik atau Mahasiswa), kemudian masukkan nama atau NIP/NIM Anda pada form pencarian. Sistem akan menampilkan semua dokumen terkait dengan data yang Anda masukkan.'
          },
          processingTime: {
            question: 'Berapa lama proses pengajuan dokumen?',
            answer: 'Waktu pemrosesan bervariasi tergantung jenis dokumen. Umumnya berkisar antara 1-5 hari kerja. Detail waktu pemrosesan untuk setiap jenis dokumen dapat dilihat pada halaman Layanan Administrasi.'
          },
          statusNotChanging: {
            question: 'Apa yang harus dilakukan jika status dokumen tidak berubah?',
            answer: 'Jika status dokumen Anda tidak berubah selama lebih dari 3 hari kerja, silakan hubungi kami melalui email fsti@itk.ac.id atau datang langsung ke kantor Administrasi FSTI.'
          },
        },
      },
      
      // Lecturer Tracking
      lecturerTracking: {
        title: 'Tracking Dokumen Dosen',
        description: 'Lacak status dokumen administrasi Anda dengan memasukkan nama atau NIP. Pantau progres pengajuan dokumen Anda secara real-time.',
        backToMain: 'Kembali ke halaman utama',
        trackStatus: 'Lacak Status Dokumen',
        searchInfo: 'Informasi Pencarian',
        nameLabel: 'Nama Pemohon',
        nipLabel: 'NIP/NIPPPK/NIPH',
        searchByName: 'Cari berdasarkan Nama',
        searchByNip: 'Cari berdasarkan NIP',
        nameExample: 'Contoh: Adi Mahmud Jaya Marindra',
        nipExample: 'Contoh: 19860708',
        tracking: 'Lacak Dokumen',
        searching: 'Mencari...',
        loadingData: 'Memuat Data...',
        searchResults: 'Hasil Pencarian',
        documents: 'Dokumen Terkait',
        detail: 'Detail',
        submissionStatus: 'Status Pengajuan',
        timeline: 'Informasi timeline tidak tersedia',
        docTypes: {
          assignmentLetter: 'Surat Tugas',
          deanSigning: 'Pengesahan TTD Dekanat',
          facilityLoan: 'Peminjaman Sarana Prasarana',
        },
        status: {
          reference: 'Nomor Referensi',
          applicant: 'Pemohon',
          submissionDate: 'Tanggal Pengajuan',
          organizer: 'Penyelenggara',
          venue: 'Tempat Kegiatan',
          attendance: 'Kehadiran Sebagai',
          supportingDoc: 'Dokumen Pendukung',
          viewDoc: 'Lihat Dokumen',
          docType: 'Jenis Dokumen',
          resultDoc: 'Dokumen Hasil',
          facility: 'Sarana/Prasarana',
          usageDate: 'Tanggal Penggunaan',
          status: 'Status',
          completed: 'Selesai',
          inProgress: 'Dalam Proses',
          pending: 'Menunggu',
          rejected: 'Ditolak',
        },
        faq: {
          title: 'Pertanyaan Umum',
          whatTypes: {
            question: 'Apa saja jenis dokumen yang dapat dilacak?',
            answer: 'Sistem ini dapat melacak tiga jenis dokumen: Surat Tugas, Pengesahan TTD Dekanat, dan Peminjaman Sarana Prasarana. Setiap jenis dokumen memiliki proses tracking yang berbeda.'
          },
          howToFind: {
            question: 'Bagaimana cara mencari dokumen saya?',
            answer: 'Anda dapat mencari dokumen berdasarkan nama pemohon atau NIP/NIPPPK/NIPH. Sistem akan menampilkan semua dokumen yang terkait dengan nama atau NIP tersebut.'
          },
          processingTime: {
            question: 'Berapa lama proses pengajuan dokumen?',
            answer: 'Waktu pemrosesan bervariasi tergantung jenis dokumen. Umumnya berkisar antara 1-5 hari kerja. Detail waktu pemrosesan untuk setiap jenis dokumen dapat dilihat pada halaman Layanan Administrasi.'
          },
          statusNotChanging: {
            question: 'Apa yang harus dilakukan jika status dokumen tidak berubah?',
            answer: 'Jika status dokumen Anda tidak berubah selama lebih dari 3 hari kerja, silakan hubungi kami melalui email fsti@itk.ac.id atau datang langsung ke kantor Administrasi FSTI.'
          },
        },
      },
      
      // Student Tracking
      studentTracking: {
        title: 'Tracking Dokumen Mahasiswa',
        description: 'Lacak status dokumen administrasi Anda dengan memasukkan NIM. Pantau progres pengajuan dokumen Anda secara real-time.',
        backToMain: 'Kembali ke halaman utama',
        trackStatus: 'Lacak Status Dokumen',
        searchInfo: 'Informasi Pencarian',
        nimLabel: 'Nomor Induk Mahasiswa (NIM)',
        nimExample: 'Contoh: 11220001',
        tracking: 'Lacak Dokumen',
        searching: 'Mencari...',
        loadingData: 'Memuat Data...',
        searchResults: 'Hasil Pencarian',
        documents: 'Dokumen Terkait',
        detail: 'Detail',
        submissionStatus: 'Status Pengajuan',
        timeline: 'Informasi timeline tidak tersedia',
        uploadedFiles: "Dokumen yang Diupload",
        adminDocuments: "Dokumen dari Admin",
        docTypes: {
          academicLetter: 'Surat Akademik',
          internship: 'Kerja Praktik',
          postInternship: 'Setelah KP',
          recommendationLetter: 'Surat Rekomendasi',
          legalization: 'Legalisasi',
          classDeferral: 'Dispensasi Perkuliahan',
          certificateNumber: 'Nomor Sertifikat',
          scheduleChange: 'Perubahan FRS',
          assignmentLetter: 'Surat Tugas',
          deanSigning: 'TTD Dekanat',
          finalProjectSubmission: 'Tanda Terima Berkas TA',
        },
        status: {
          reference: 'Nomor Referensi',
          student: 'Nama Mahasiswa',
          nim: 'NIM',
          program: 'Program Studi',
          date: 'Tanggal Pengajuan',
          partner: 'Mitra',
          purpose: 'Tujuan',
          startDate: 'Tanggal Mulai',
          endDate: 'Tanggal Selesai',
          researchLocation: 'Tempat Penelitian',
          approvalFile: 'File Persetujuan',
          letterFile: 'File Surat',
          notes: 'Keterangan',
          signature: 'Tanda Tangan',
          academicYear: 'Tahun Akademik',
          reason: 'Alasan',
          certificateCount: 'Jumlah Sertifikat',
          activity: 'Kegiatan',
          form: 'Formulir',
          status: 'Status',
          completed: 'Selesai',
          inProgress: 'Dalam Proses',
          pending: 'Menunggu',
          rejected: 'Ditolak',
        },
        fields: {
          letterType: "Jenis Surat",
          letterPurpose: "Tujuan Surat",
          description: "Keterangan",
          partner: "Mitra",
          partnerAddress: "Alamat Mitra",
          startDate: "Tanggal Mulai",
          endDate: "Tanggal Selesai",
          reason: "Alasan",
          reportTitle: "Judul Laporan"
        },
        faq: {
          title: 'Pertanyaan Umum',
          whatTypes: {
            question: 'Apa saja jenis dokumen yang dapat dilacak?',
            answer: 'Sistem ini dapat melacak berbagai jenis dokumen mahasiswa seperti Surat Akademik, Surat Kerja Praktik, Surat Rekomendasi, dan lainnya. Setiap jenis dokumen memiliki proses tracking yang berbeda.'
          },
          howToFind: {
            question: 'Bagaimana cara mencari dokumen saya?',
            answer: 'Anda dapat mencari dokumen berdasarkan NIM. Sistem akan menampilkan semua dokumen yang terkait dengan NIM yang Anda masukkan.'
          },
          processingTime: {
            question: 'Berapa lama proses pengajuan dokumen?',
            answer: 'Waktu pemrosesan bervariasi tergantung jenis dokumen. Umumnya berkisar antara 1-5 hari kerja. Detail waktu pemrosesan untuk setiap jenis dokumen dapat dilihat pada halaman Layanan Administrasi.'
          },
          statusNotChanging: {
            question: 'Apa yang harus dilakukan jika status dokumen tidak berubah?',
            answer: 'Jika status dokumen Anda tidak berubah selama lebih dari 3 hari kerja, silakan hubungi kami melalui email fsti@itk.ac.id atau datang langsung ke kantor Administrasi FSTI.'
          },
        },
      },
      
      // Footer
      footer: {
        about: 'FSTI ITK',
        contact: 'Kontak',
        organization: 'Struktur Organisasi',
        dean: 'Dekan:',
        vdAcademic: 'Wakil Dekan I (Akademik dan Kemahasiswaan):',
        vdFinance: 'Wakil Dekan II (Keuangan dan Umum):',
        headScienceData: 'Ketua Jurusan Sains dan Analitika Data:',
        headTEIB: 'Ketua Jurusan Teknik Elektro, Informatika, dan Bisnis:',
        email: 'Email:',
        phone: 'Telepon:',
        finance: 'Keuangan:',
        academic: 'Akademik:',
        operationalHours: 'Jam Operasional:',
        operationalTime: 'Senin - Jumat, 08.00 - 16.00 WITA',
        quickLinks: 'Link Cepat',
        home: 'Beranda',
        services: 'Layanan Administrasi',
        tracking: 'Tracking Dokumen',
        itkWebsite: 'Website ITK',
      }
    }
  };