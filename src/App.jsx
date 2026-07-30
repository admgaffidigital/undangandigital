import React, { useState, useEffect, useRef } from 'react';
import CoverScreen from './components/CoverScreen';
import PublicInvitation from './components/PublicInvitation';
import AdminDashboard from './components/AdminDashboard';
import CustomAlert from './components/CustomAlert';
import AdminLogin from './components/AdminLogin';
import { db } from './firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const INITIAL_DATA = {
  content: {
    groom: "Agus",
    bride: "Rina",
    groomParents: "Putra Bpk. Supardi & Ibu Wati",
    brideParents: "Putri Bpk. Harjo & Ibu Ningsih",
    dateDisplay: "Minggu, 15 September 2025",
    dateIso: "2025-09-15T09:00:00",
    event1Name: "AKAD NIKAH",
    event1Time: "08:00 - 10:00 WIB",
    event2Name: "RESEPSI",
    event2Time: "11:00 - 14:00 WIB",
    location: "Gedung Pandan Sari, Taman Bunga Wiladatika, Cibubur, Jakarta Timur",
    mapUrl: "https://goo.gl/maps/example",
    ayat: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya...",
    giftTitle: "Tanda Kasih",
    giftDescription: "Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun, jika Anda bermaksud memberikan tanda kasih, kami menyediakan fitur di bawah ini:",
    wishesTitle: "Doa & Restu",
    closingTitle: "Terima Kasih",
    closingGreeting: "Wassalamu'alaikum Warahmatullahi Wabarakatuh",
    closing: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.",
    footerText: "Undangan Digital - Dibuat dengan ❤️",
    titlePrefix: "Pawiwahan Ageng",
    coverGreeting: "Kepada Yth. Bapak/Ibu/Saudara/i",
    coverButtonText: "Buka Undangan",
    heroImg: "",
    groomImg: "",
    brideImg: "",
    musicUrl: "",
    cornerUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhqfU91Zg3b-o3r_x9Q3_b5x8b7z12z3u5-hX7/s1600/corner.png",
    gununganUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjq3X2Z1h9y4mR1/s1600/gunungan.png",
    frameUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj7b3x2z1X9/s1600/frame.png",
    eventTitle: "Rangkaian Acara",
    galleryTitle: "Momen Bahagia",
    banks: [],
    gallery: [],
    wishes: []
  },
  layout: [
    { id: 'hero', label: 'Bagian Utama (Hero)', active: true },
    { id: 'couple', label: 'Profil Pasangan', active: true },
    { id: 'event', label: 'Waktu & Lokasi', active: true },
    { id: 'gallery', label: 'Galeri Foto', active: true },
    { id: 'gifts', label: 'Kirim Hadiah/Angpao', active: true },
    { id: 'wishes', label: 'Buku Tamu & Ucapan', active: true },
    { id: 'closing', label: 'Penutup', active: true }
  ]
};

function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(true);
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [appAlert, setAppAlert] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Parse URL params for Guest Name
    const params = new URLSearchParams(window.location.search);
    const guestName = params.get('to');
    if(guestName) {
      setData(prev => ({
        ...prev, 
        content: { ...prev.content, coverGreeting: `Kepada Yth. Bapak/Ibu/Saudara/i\n${guestName}` }
      }));
    }

    // Load from Firestore
    try {
      const docRef = doc(db, 'invitations', 'main');
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const savedData = docSnap.data();
          // Merge with initial data to prevent missing fields
          setData(prev => ({
            content: { ...prev.content, ...savedData.content },
            layout: savedData.layout || prev.layout
          }));
        } else {
          setDoc(docRef, INITIAL_DATA).catch(err => {
            console.error("App.jsx: Error setting initial data:", err);
          });
        }
        setLoading(false);
      }, (error) => {
        console.error("App.jsx: Error in onSnapshot:", error);
        setAppAlert("Gagal memuat data dari server.");
        setLoading(false);
      });

      return () => {
        unsubscribe();
      };
    } catch (err) {
      console.error("App.jsx: Synchronous error in useEffect setup:", err);
    }
  }, []);

  useEffect(() => {
    if(data.content.musicUrl && audioRef.current) {
      audioRef.current.src = data.content.musicUrl;
      audioRef.current.load();
      if(isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
      }
    }
  }, [data.content.musicUrl]);

  const toggleMusic = () => {
    if(!audioRef.current) return;
    if(isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => {
        console.log("Audio play prevented:", e);
        setAppAlert("Browser memblokir pemutaran otomatis.");
      });
    }
    setIsPlaying(!isPlaying);
  };

  const playMusic = () => {
    if(audioRef.current && data.content.musicUrl) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Audio play prevented:", e));
    }
  };

  const saveToFirebase = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'invitations', 'main'), data);
      setLastSaved(new Date());
      setAppAlert('Data berhasil disimpan ke server!');
    } catch (error) {
      console.error("Error saving data:", error);
      setAppAlert('Gagal menyimpan data.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleWishSubmit = async (newWish) => {
    const updatedData = {
      ...data,
      content: {
        ...data.content,
        wishes: [newWish, ...(data.content.wishes || [])]
      }
    };
    try {
      await setDoc(doc(db, 'invitations', 'main'), updatedData);
      // Let snapshot handler update the local state to avoid race conditions
    } catch (error) {
      throw error;
    }
  };

  const handleAdminLogin = () => {
    setIsLoginOpen(true);
  };

  const handleAdminLoginSubmit = (pass) => {
    if (pass === 'admin123') {
      setIsAdmin(true);
      setIsLoginOpen(false);
      setIsCoverOpen(false); // Close cover if open
      if (isPlaying) toggleMusic(); // Stop music when editing
      return { success: true };
    } else {
      return { success: false, message: 'Password salah!' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#120808] flex flex-col items-center justify-center text-[#D4AF37]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37] mb-4"></div>
        <p className="tracking-widest text-sm uppercase">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <CustomAlert message={appAlert} onClose={() => setAppAlert('')} />
      
      {/* Audio Element Hidden */}
      <audio ref={audioRef} loop preload="auto" />

      {/* Admin Login Modal */}
      <AdminLogin 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleAdminLoginSubmit} 
      />

      {isAdmin ? (
        <AdminDashboard 
          data={data} 
          setData={setData} 
          onLogout={() => setIsAdmin(false)} 
          saveToFirebase={saveToFirebase}
          isSaving={isSaving}
          lastSaved={lastSaved}
          rsvps={data.content.wishes || []}
          setAppAlert={setAppAlert}
        />
      ) : (
        <>
          {isCoverOpen ? (
            <CoverScreen 
              data={data} 
              onOpen={() => setIsCoverOpen(false)} 
              onPlayMusic={playMusic}
            />
          ) : (
            <PublicInvitation 
              data={data}
              onAdminClick={handleAdminLogin}
              onWishSubmit={handleWishSubmit}
              isPlaying={isPlaying}
              toggleMusic={toggleMusic}
              setAppAlert={setAppAlert}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
