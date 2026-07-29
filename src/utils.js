export const formatDriveUrl = (url, acceptType) => {
  if (!url) return url;
  if (url.includes('dropbox.com')) return url.replace('dl=0', 'raw=1');
  if (url.includes('drive.google.com')) {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      if (acceptType && acceptType.includes('audio')) return `https://docs.google.com/uc?export=download&id=${match[1]}`;
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }
  return url;
};

export const copyToClipboard = async (text, setAlertMsg) => {
  try {
    await navigator.clipboard.writeText(text);
    setAlertMsg('Nomor rekening berhasil disalin!');
  } catch (err) {
    // Fallback for older browsers
    try {
      const el = document.createElement('textarea'); 
      el.value = text; 
      document.body.appendChild(el); 
      el.select(); 
      document.execCommand('copy'); 
      document.body.removeChild(el);
      setAlertMsg('Nomor rekening berhasil disalin!'); 
    } catch (fallbackErr) {
      setAlertMsg('Gagal menyalin.');
    }
  }
};

export const getDirectAudioUrl = (url) => {
  if (!url) return '';
  if (url.includes('dropbox.com')) return url.replace('dl=0', 'raw=1');
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  if (url.includes('drive.google.com') && match) return `https://docs.google.com/uc?export=download&id=${match[1]}`;
  return url;
};
