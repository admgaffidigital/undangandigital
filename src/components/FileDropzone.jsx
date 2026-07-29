import React, { useState, useRef } from 'react';
import { formatDriveUrl } from '../utils';
import { UploadCloud, CheckCircle, XCircle } from 'lucide-react';

const GAS_URL = import.meta.env.VITE_GAS_URL || 'YOUR_GAS_WEB_APP_URL';

const FileDropzone = ({ label, value, onFileRead, accept = "image/*", typeDesc = "Gambar (JPG/PNG)", isOrnament = false, onError }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; processFile(file); };
  const handleFileSelect = (e) => { const file = e.target.files[0]; processFile(file); };

  const showError = (msg) => {
     if (onError) { onError(msg); }
  };

  const processFile = (file) => {
    if (file && file.type.match(accept.replace('*', '.*'))) {
      setIsUploading(true);
      const reader = new FileReader(); 
      reader.onload = async (event) => {
         const base64Data = event.target.result;
         
         if (GAS_URL && GAS_URL !== 'YOUR_GAS_WEB_APP_URL') {
            try {
               const response = await fetch(GAS_URL, {
                 method: 'POST',
                 body: JSON.stringify({
                   action: 'uploadImage',
                   data: base64Data,
                   name: file.name
                 }),
                 headers: {
                   'Content-Type': 'text/plain;charset=utf-8',
                 }
               });
               
               const result = await response.json();
               setIsUploading(false);
               
               if (result.error) {
                 showError("Gagal Upload ke Drive: " + result.error);
               } else if (result.url) {
                 onFileRead(result.url);
               } else {
                 showError("Format response dari server tidak sesuai.");
               }
            } catch (err) {
               setIsUploading(false);
               showError("Koneksi upload gagal. Coba lagi.");
            }
         } else {
            // Fallback for development if GAS URL is missing (simulating successful upload locally)
            setTimeout(() => { 
              setIsUploading(false); 
              onFileRead(base64Data); 
              showError("Catatan: Upload lokal aktif (GAS_URL belum diset).");
            }, 800);
         }
      }; 
      reader.readAsDataURL(file);
    } else if(file) {
      showError(`Mohon masukkan format file yang benar: ${typeDesc}`);
    }
  };

  return (
    <div className="mb-4">
      <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">{label}</label>
      <div 
        onClick={() => !isUploading && fileInputRef.current.click()} 
        onDragOver={handleDragOver} 
        onDragLeave={handleDragLeave} 
        onDrop={handleDrop} 
        className={`drop-zone p-4 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group ${isDragging ? 'active border-[#D4AF37] bg-[rgba(212,175,55,0.1)]' : 'border-dashed border-[rgba(212,175,55,0.5)] bg-[#fafafa]'} ${value && accept==='image/*' ? 'h-32' : 'h-24'} ${isOrnament ? 'bg-slate-800' : ''}`}
      >
        <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept={accept} className="hidden" />
        {isUploading ? (
          <div className="flex flex-col items-center justify-center text-[#D4AF37]">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current mb-2"></div>
             <span className="text-xs font-bold tracking-widest">MENGUNGGAH...</span>
          </div>
        ) : value && accept === 'image/*' ? (
          <>
            <img src={value} onError={(e) => { e.target.onerror = null; e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 100"><rect width="200" height="100" fill="%23f87171"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="10" font-family="sans-serif">GAMBAR GAGAL DIMUAT</text><text x="50%" y="70%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="8" font-family="sans-serif">(Ubah file Drive jadi Public/Anyone)</text></svg>'; }} className={`absolute inset-0 w-full h-full object-contain ${isOrnament ? 'p-4 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]' : 'opacity-50 group-hover:opacity-30 object-cover'} transition`} alt="preview" />
            <div className="relative z-10 bg-white/90 px-3 py-1 rounded text-xs font-bold shadow text-black">Klik / Ubah Aset</div>
          </>
        ) : (
          <>
            <UploadCloud className={`w-8 h-8 mb-2 ${isDragging ? 'text-[#D4AF37]' : 'text-gray-400'}`} />
            <p className="text-xs text-gray-600 font-medium">Klik atau Tarik {typeDesc}</p>
          </>
        )}
      </div>
      <input type="text" value={value || ''} onChange={(e)=>onFileRead(formatDriveUrl(e.target.value, accept))} placeholder="Atau paste link (Drive / Dropbox dll)..." className="w-full mt-2 p-2 border rounded text-xs bg-white outline-none focus:border-[#D4AF37]"/>
    </div>
  );
};

export default FileDropzone;
