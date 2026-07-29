import React, { useState } from 'react';
import FileDropzone from './FileDropzone';
import { Save, RefreshCw, Eye, Share2, LogOut, Trash2, Plus, Image as ImageIcon, Music, Heart, Calendar, Grid } from 'lucide-react';
import { copyToClipboard } from '../utils';

const AdminDashboard = ({ data, setData, onLogout, saveToFirebase, isSaving, lastSaved, rsvps, setAppAlert }) => {
  const [activeTab, setActiveTab] = useState('konten');

  const updateContent = (field, value) => {
    setData(prev => ({ ...prev, content: { ...prev.content, [field]: value } }));
  };

  const updateLayout = (id, field, value) => {
    setData(prev => ({
      ...prev,
      layout: prev.layout.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addBank = () => {
    setData(prev => ({
      ...prev,
      content: { ...prev.content, banks: [...prev.content.banks, { id: Date.now().toString(), bankName: '', accountNumber: '', accountName: '' }] }
    }));
  };

  const updateBank = (id, field, value) => {
    setData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        banks: prev.content.banks.map(bank => bank.id === id ? { ...bank, [field]: value } : bank)
      }
    }));
  };

  const removeBank = (id) => {
    setData(prev => ({
      ...prev,
      content: { ...prev.content, banks: prev.content.banks.filter(b => b.id !== id) }
    }));
  };

  const TABS = [
    { id: 'konten', label: 'Teks & Data', icon: <Heart className="w-4 h-4" /> },
    { id: 'media', label: 'Gambar & Musik', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'tata-letak', label: 'Tata Letak', icon: <Grid className="w-4 h-4" /> },
    { id: 'rsvp', label: 'Kehadiran', icon: <Calendar className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-24">
      {/* Header Admin */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Admin Dasbor</h1>
            <p className="text-xs text-gray-500 mt-1">{lastSaved ? `Terakhir disimpan: ${lastSaved.toLocaleString('id-ID')}` : 'Belum disimpan'}</p>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button onClick={() => { saveToFirebase(); setAppAlert('Data berhasil disimpan ke server!'); }} disabled={isSaving} className={`flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium text-sm transition-all shadow-sm ${isSaving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-all text-sm font-medium">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-4 overflow-x-auto custom-scrollbar">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'konten' && (
          <div className="space-y-8 animate-fade-in">
            {/* Info Umum */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">📝 Info Umum & Pasangan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Panggilan Mempelai Pria</label>
                  <input type="text" value={data.content.groom} onChange={(e) => updateContent('groom', e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm" placeholder="Romeo" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Panggilan Mempelai Wanita</label>
                  <input type="text" value={data.content.bride} onChange={(e) => updateContent('bride', e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm" placeholder="Juliet" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Nama Orang Tua (Pria)</label>
                  <input type="text" value={data.content.groomParents} onChange={(e) => updateContent('groomParents', e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm" placeholder="Putra dari Bapak X & Ibu Y" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Nama Orang Tua (Wanita)</label>
                  <input type="text" value={data.content.brideParents} onChange={(e) => updateContent('brideParents', e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm" placeholder="Putri dari Bapak A & Ibu B" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Ayat / Kutipan Suci</label>
                  <textarea value={data.content.ayat} onChange={(e) => updateContent('ayat', e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm h-24" placeholder="Kutipan ayat atau kalimat pembuka yang indah..." />
                </div>
              </div>
            </div>

            {/* Waktu & Lokasi Acara */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">📅 Waktu & Lokasi Acara</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Tanggal Acara Utama (ISO Format)</label>
                   <input type="datetime-local" value={data.content.dateIso} onChange={(e) => updateContent('dateIso', e.target.value)} className="w-full p-3 border border-gray-300 rounded-md text-sm" />
                   <p className="text-[10px] text-gray-500 mt-1">Digunakan untuk fitur hitung mundur (Countdown).</p>
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Tanggal Tampil (Teks)</label>
                   <input type="text" value={data.content.dateDisplay} onChange={(e) => updateContent('dateDisplay', e.target.value)} className="w-full p-3 border border-gray-300 rounded-md text-sm" placeholder="Senin, 1 Januari 2025" />
                </div>
                <div className="md:col-span-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                   <h3 className="text-sm font-bold mb-4">Acara 1 (Akad/Pemberkatan)</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                       <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nama Acara</label>
                       <input type="text" value={data.content.event1Name} onChange={(e) => updateContent('event1Name', e.target.value)} className="w-full p-2 border rounded-md text-sm" />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Waktu</label>
                       <input type="text" value={data.content.event1Time} onChange={(e) => updateContent('event1Time', e.target.value)} className="w-full p-2 border rounded-md text-sm" />
                     </div>
                   </div>
                </div>
                <div className="md:col-span-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                   <h3 className="text-sm font-bold mb-4">Acara 2 (Resepsi)</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                       <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nama Acara</label>
                       <input type="text" value={data.content.event2Name} onChange={(e) => updateContent('event2Name', e.target.value)} className="w-full p-2 border rounded-md text-sm" />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Waktu</label>
                       <input type="text" value={data.content.event2Time} onChange={(e) => updateContent('event2Time', e.target.value)} className="w-full p-2 border rounded-md text-sm" />
                     </div>
                   </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Alamat / Lokasi Lengkap</label>
                  <textarea value={data.content.location} onChange={(e) => updateContent('location', e.target.value)} className="w-full p-3 border border-gray-300 rounded-md text-sm h-20" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Link Google Maps</label>
                  <input type="url" value={data.content.mapUrl} onChange={(e) => updateContent('mapUrl', e.target.value)} className="w-full p-3 border border-gray-300 rounded-md text-sm" placeholder="https://maps.google.com/..." />
                </div>
              </div>
            </div>

            {/* Rekening & Hadiah */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">💳 Tanda Kasih (Rekening)</h2>
                 <button onClick={addBank} className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition"><Plus className="w-3 h-3"/> Tambah Rekening</button>
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Judul Seksi Tanda Kasih</label>
                  <input type="text" value={data.content.giftTitle} onChange={(e) => updateContent('giftTitle', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Deskripsi Tanda Kasih</label>
                  <textarea value={data.content.giftDescription} onChange={(e) => updateContent('giftDescription', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm h-16" />
                </div>
              </div>
              
              <div className="space-y-4">
                {data.content.banks.map((bank, index) => (
                  <div key={bank.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative group">
                    <button onClick={() => removeBank(bank.id)} className="absolute top-2 right-2 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4" /></button>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Nama Bank / E-Wallet</label>
                        <input type="text" value={bank.bankName} onChange={(e) => updateBank(bank.id, 'bankName', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm" placeholder="BCA / Mandiri / DANA" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">No. Rekening</label>
                        <input type="text" value={bank.accountNumber} onChange={(e) => updateBank(bank.id, 'accountNumber', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm font-mono" placeholder="1234567890" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Atas Nama</label>
                        <input type="text" value={bank.accountName} onChange={(e) => updateBank(bank.id, 'accountName', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Nama Lengkap" />
                      </div>
                    </div>
                  </div>
                ))}
                {data.content.banks.length === 0 && <p className="text-sm text-gray-500 text-center py-4 border-2 border-dashed rounded-lg">Belum ada data rekening. Klik tambah untuk menambahkan.</p>}
              </div>
            </div>
            
            {/* Teks Penutup */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">📝 Teks Penutup</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Kalimat Penutup</label>
                  <textarea value={data.content.closing} onChange={(e) => updateContent('closing', e.target.value)} className="w-full p-3 border border-gray-300 rounded-md text-sm h-24" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Judul Penutup</label>
                    <input type="text" value={data.content.closingTitle} onChange={(e) => updateContent('closingTitle', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Salam Penutup</label>
                    <input type="text" value={data.content.closingGreeting} onChange={(e) => updateContent('closingGreeting', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">🖼️ Pengaturan Media Utama</h2>
                <div className="bg-yellow-50 text-yellow-800 text-xs px-3 py-2 rounded-md border border-yellow-200 max-w-sm">
                  ⚠️ Untuk keamanan dan kemudahan, file sebaiknya menggunakan URL publik yang di-host di luar (contoh: Google Drive, Imgur, Dropbox). Upload lokal mungkin terbatas pada versi demo.
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FileDropzone label="Foto Latar Utama (Hero)" value={data.content.heroImg} onFileRead={(val)=>updateContent('heroImg', val)} onError={setAppAlert} />
                <FileDropzone label="Foto Mempelai Pria" value={data.content.groomImg} onFileRead={(val)=>updateContent('groomImg', val)} onError={setAppAlert} />
                <FileDropzone label="Foto Mempelai Wanita" value={data.content.brideImg} onFileRead={(val)=>updateContent('brideImg', val)} onError={setAppAlert} />
                <FileDropzone label="Lagu / Backsound (URL MP3)" value={data.content.musicUrl} onFileRead={(val)=>updateContent('musicUrl', val)} accept="audio/*" typeDesc="Lagu (MP3)" onError={setAppAlert} />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">✨ Ornamen (Khusus Tema Keraton)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FileDropzone label="Sudut (Corner)" value={data.content.cornerUrl} onFileRead={(val)=>updateContent('cornerUrl', val)} accept="image/png,image/svg+xml" typeDesc="PNG Transparan" isOrnament={true} onError={setAppAlert} />
                <FileDropzone label="Gunungan (Center)" value={data.content.gununganUrl} onFileRead={(val)=>updateContent('gununganUrl', val)} accept="image/png,image/svg+xml" typeDesc="PNG Transparan" isOrnament={true} onError={setAppAlert} />
                <FileDropzone label="Bingkai Foto (Frame)" value={data.content.frameUrl} onFileRead={(val)=>updateContent('frameUrl', val)} accept="image/png,image/svg+xml" typeDesc="PNG Transparan" isOrnament={true} onError={setAppAlert} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">📸 Galeri Foto</h2>
                <button onClick={() => updateContent('gallery', [...(data.content.gallery || []), ''])} className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition"><Plus className="w-3 h-3"/> Tambah Foto</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.content.gallery && data.content.gallery.map((img, i) => (
                  <div key={i} className="relative group p-4 border rounded-lg bg-gray-50">
                    <button onClick={() => updateContent('gallery', data.content.gallery.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded opacity-0 group-hover:opacity-100 transition z-10 hover:bg-red-200"><Trash2 className="w-4 h-4"/></button>
                    <FileDropzone label={`Foto Galeri ${i+1}`} value={img} onFileRead={(val) => { const newGallery = [...data.content.gallery]; newGallery[i] = val; updateContent('gallery', newGallery); }} onError={setAppAlert} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tata-letak' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">🛠️ Pengaturan Tata Letak (Bagian Aktif)</h2>
            <p className="text-sm text-gray-500 mb-8">Nyalakan/matikan bagian yang ingin ditampilkan di undangan Anda. Anda bisa mematikan bagian tertentu jika dirasa tidak perlu.</p>
            
            <div className="space-y-3">
              {data.layout.map(item => (
                <div key={item.id} className={`flex items-center justify-between p-4 rounded-lg border transition-all ${item.active ? 'bg-indigo-50/50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={`font-semibold ${item.active ? 'text-indigo-900' : 'text-gray-500'}`}>{item.label}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={item.active} onChange={(e) => updateLayout(item.id, 'active', e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              ))}
            </div>
            
            <div className="mt-10 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-4">
              <Share2 className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-blue-900 mb-1">Cara Bagikan Undangan</h4>
                <p className="text-xs text-blue-800 mb-3">Copy link utama website ini dan kirim ke tamu Anda. Untuk personalisasi nama tamu, gunakan format berikut di akhir URL:</p>
                <code className="block bg-white p-2 rounded border border-blue-100 text-xs font-mono text-blue-600">
                  ?to=Nama+Tamu+Disini
                </code>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rsvp' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">✉️ Daftar Kehadiran (RSVP) & Ucapan</h2>
                <p className="text-sm text-gray-500 mt-1">Total: {rsvps.length} tanggapan | Hadir: {rsvps.filter(r=>r.attendance==='hadir').length} | Tidak Hadir: {rsvps.filter(r=>r.attendance!=='hadir').length}</p>
              </div>
              <button onClick={() => {
                const text = rsvps.map(r => `${r.name} (${r.attendance}) - ${r.text}`).join('\n');
                copyToClipboard(text, setAppAlert);
              }} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition flex items-center gap-2">
                Copy Semua Text
              </button>
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamu</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pesan / Doa</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rsvps.length === 0 ? (
                    <tr><td colSpan="4" className="px-6 py-10 text-center text-sm text-gray-500">Belum ada RSVP masuk</td></tr>
                  ) : (
                    rsvps.map((rsvp) => (
                      <tr key={rsvp.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{rsvp.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${rsvp.attendance === 'hadir' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {rsvp.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700 line-clamp-3">{rsvp.text}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {rsvp.date}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
