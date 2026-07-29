import React, { useState, useEffect } from 'react';
import FadeInSection from './FadeInSection';
import MagicalBackground from './MagicalBackground';
import { copyToClipboard } from '../utils';

const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(targetDate).getTime() - new Date().getTime();
      if (diff > 0) setTimeLeft({ d: Math.floor(diff / (1000 * 60 * 60 * 24)), h: Math.floor((diff / (1000 * 60 * 60)) % 24), m: Math.floor((diff / 1000 / 60) % 60), s: Math.floor((diff / 1000) % 60) });
      else clearInterval(interval);
    }, 1000); 
    return () => clearInterval(interval);
  }, [targetDate]); 
  return timeLeft;
};

const PublicInvitation = ({ data, onAdminClick, onWishSubmit, isPlaying, toggleMusic, setAppAlert }) => {
  return (
    <div className="theme-wrapper theme-keraton min-h-screen relative font-sans">
      <div className="batik-overlay"></div>
      <MagicalBackground />
      
      <main className="overflow-hidden relative z-10">
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-8 overflow-hidden border-b-2 border-[#D4AF37]/20">
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#1A0B0B]">
            <img src={data.content.heroImg} alt="Hero" className="w-full h-full object-cover animate-slow-zoom mix-blend-luminosity opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A0B0B] via-transparent to-[#120808]"></div>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {data.content.cornerUrl && (
            <>
              <img src={data.content.cornerUrl} className="absolute top-4 left-4 sm:top-6 sm:left-6 w-20 sm:w-24 md:w-36 h-20 sm:h-24 md:h-36 object-contain z-10 opacity-80 drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]" alt="corner-left" />
              <img src={data.content.cornerUrl} className="absolute top-4 right-4 sm:top-6 sm:right-6 w-20 sm:w-24 md:w-36 h-20 sm:h-24 md:h-36 object-contain z-10 opacity-80 drop-shadow-[0_0_12px_rgba(212,175,55,0.4)] transform scale-x-[-1]" alt="corner-right" />
            </>
          )}

          <div className="relative z-10 w-full flex flex-col items-center mt-12 md:mt-0 px-2 sm:px-4 mx-auto">
            <FadeInSection delay={100} className="w-full flex flex-col items-center text-center">
              {data.content.gununganUrl && <img src={data.content.gununganUrl} className="w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 object-contain mb-6 sm:mb-8 mx-auto opacity-90 drop-shadow-[0_5px_15px_rgba(212,175,55,0.5)] block" alt="gunungan" />}
              <h3 className="text-[9px] sm:text-[10px] md:text-xs mb-4 sm:mb-6 tracking-[0.3em] sm:tracking-[0.4em] uppercase font-bold text-[#D4AF37] text-center mx-auto block drop-shadow-md">{data.content.titlePrefix || 'Pawiwahan Ageng'}</h3>
            </FadeInSection>
            
            <FadeInSection delay={300} className="w-full flex flex-col items-center text-center">
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl heading-font gold-text-gradient leading-none text-center mx-auto block px-2 drop-shadow-lg mb-4">{data.content.groom}</h1>
              <span className="text-3xl md:text-5xl font-sans text-[#D4AF37] font-light block my-2">&</span>
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl heading-font gold-text-gradient leading-none text-center mx-auto block px-2 drop-shadow-lg mt-4 mb-8">{data.content.bride}</h1>
            </FadeInSection>

            <FadeInSection delay={500} className="w-full flex flex-col items-center text-center">
              <div className="floral-divider mb-6 sm:mb-8 scale-75 sm:scale-100"></div>
              <p className="text-xs sm:text-sm md:text-lg font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#FDFBF7] subheading-font drop-shadow-md text-center mx-auto block px-4">{data.content.dateDisplay}</p>
            </FadeInSection>

            {data.layout.find(l=>l.id==='hero')?.active && (
               <FadeInSection delay={700}>
                 <div className="flex justify-center gap-2 sm:gap-4 md:gap-8 mx-auto w-full max-w-lg mt-10 sm:mt-14">
                   {(() => {
                     const cd = useCountdown(data.content.dateIso);
                     return [ {l:'Hari', v:cd.d}, {l:'Jam', v:cd.h}, {l:'Menit', v:cd.m}, {l:'Detik', v:cd.s} ].map((t, i) => (
                       <div key={i} className="flex flex-col items-center">
                         <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 glass-card rounded-md flex items-center justify-center text-xl sm:text-2xl md:text-4xl font-serif text-[#FDFBF7]">{t.v}</div>
                         <span className="text-[8px] sm:text-[9px] md:text-xs mt-3 sm:mt-4 tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">{t.l}</span>
                       </div>
                     ));
                   })()}
                 </div>
               </FadeInSection>
            )}
          </div>
        </section>

        {data.layout.map(item => {
          if (!item.active || item.id === 'hero') return null;

          if (item.id === 'couple') return (
            <section key={item.id} className="py-20 sm:py-28 px-4 sm:px-6 max-w-5xl mx-auto relative border-b border-[#D4AF37]/10 flex flex-col items-center overflow-hidden">
              <FadeInSection delay={0} className="w-full flex flex-col items-center">
                <div className="text-center mb-16 sm:mb-24 md:mb-32 relative px-4 w-full">
                  <p className="opacity-80 max-w-2xl mx-auto leading-loose text-xs sm:text-sm md:text-base italic subheading-font text-gray-300 drop-shadow block text-center">"{data.content.ayat}"</p>
                </div>
              </FadeInSection>
              <div className="flex flex-col md:flex-row justify-center items-center gap-12 sm:gap-16 lg:gap-24 relative w-full">
                <FadeInSection direction="right" delay={100} className="w-full flex flex-col items-center">
                  <div className="text-center flex flex-col items-center w-full group">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 mb-6 sm:mb-8 flex items-center justify-center mx-auto transition-transform duration-700 group-hover:-translate-y-2">
                      {data.content.frameUrl && <img src={data.content.frameUrl} className="absolute inset-0 w-full h-full object-contain z-20 scale-[1.08] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] pointer-events-none" alt="frame" />}
                      <div className="w-[85%] h-[85%] rounded-full z-10 border border-[#D4AF37]/30 bg-black shadow-2xl overflow-hidden">
                        <img src={data.content.groomImg} className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" alt={data.content.groom} />
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl heading-font mb-2 sm:mb-3 tracking-widest gold-text-gradient block mx-auto">{data.content.groom}</h3>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.2em] font-medium mt-1 sm:mt-2 block mx-auto leading-relaxed px-4">{data.content.groomParents}</p>
                  </div>
                </FadeInSection>
                
                <FadeInSection delay={300} className="flex items-center justify-center"><div className="text-4xl sm:text-5xl md:text-6xl heading-font opacity-40 accent-text animate-float my-4 sm:my-8 md:my-0 block text-center">∞</div></FadeInSection>
                
                <FadeInSection direction="left" delay={100} className="w-full flex flex-col items-center">
                  <div className="text-center flex flex-col items-center w-full group">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 mb-6 sm:mb-8 flex items-center justify-center mx-auto transition-transform duration-700 group-hover:-translate-y-2">
                      {data.content.frameUrl && <img src={data.content.frameUrl} className="absolute inset-0 w-full h-full object-contain z-20 scale-[1.08] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] pointer-events-none" alt="frame" />}
                      <div className="w-[85%] h-[85%] rounded-full z-10 border border-[#D4AF37]/30 bg-black shadow-2xl overflow-hidden">
                        <img src={data.content.brideImg} className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" alt={data.content.bride} />
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl heading-font mb-2 sm:mb-3 tracking-widest gold-text-gradient block mx-auto">{data.content.bride}</h3>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.2em] font-medium mt-1 sm:mt-2 block mx-auto leading-relaxed px-4">{data.content.brideParents}</p>
                  </div>
                </FadeInSection>
              </div>
            </section>
          );

          if (item.id === 'event') return (
            <section key={item.id} className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto relative border-b border-[#D4AF37]/10 flex flex-col items-center">
              <FadeInSection className="w-full"><h2 className="text-3xl sm:text-4xl md:text-5xl heading-font text-center mb-12 sm:mb-20 tracking-[0.1em] sm:tracking-[0.15em] mx-auto block gold-text-gradient px-4">{data.content.eventTitle}</h2></FadeInSection>
              <div className="grid md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 w-full px-2 sm:px-0">
                <FadeInSection direction="up" delay={100} className="w-full flex flex-col items-center">
                  <div className="glass-card p-8 sm:p-10 md:p-12 text-center flex flex-col items-center relative overflow-hidden group w-full rounded-2xl md:rounded-[3rem]">
                    {data.content.gununganUrl && <img src={data.content.gununganUrl} className="w-20 sm:w-28 h-20 sm:h-28 object-contain mb-4 opacity-10 absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 block pointer-events-none" alt="bg-ornament" />}
                    <h3 className="text-xl sm:text-2xl md:text-3xl heading-font mb-4 sm:mb-6 relative z-10 pt-2 sm:pt-4 tracking-wider text-[#FDFBF7]">{data.content.event1Name}</h3>
                    <div className="floral-divider mb-4 sm:mb-6 opacity-80 w-24 sm:w-32 scale-75 sm:scale-100"></div>
                    <p className="text-base sm:text-lg mb-2 font-bold accent-text tracking-widest block mx-auto">{data.content.event1Time}</p>
                    <p className="mb-6 sm:mb-8 opacity-70 text-[10px] sm:text-xs font-light uppercase tracking-[0.2em] block mx-auto">{data.content.dateDisplay}</p>
                    <p className="opacity-90 max-w-xs text-xs sm:text-sm leading-relaxed sm:leading-loose mb-8 sm:mb-10 subheading-font mx-auto block text-gray-300">"{data.content.location}"</p>
                    <a href={data.content.mapUrl} target="_blank" className="mt-auto w-full sm:w-auto px-6 sm:px-8 py-3 btn-outline-gold text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] rounded-sm shadow-md transition-all">Lihat Lokasi</a>
                  </div>
                </FadeInSection>
                <FadeInSection direction="up" delay={200} className="w-full flex flex-col items-center">
                  <div className="glass-card p-8 sm:p-10 md:p-12 text-center flex flex-col items-center relative overflow-hidden group w-full rounded-2xl md:rounded-[3rem]">
                    {data.content.gununganUrl && <img src={data.content.gununganUrl} className="w-20 sm:w-28 h-20 sm:h-28 object-contain mb-4 opacity-10 absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4 block pointer-events-none" alt="bg-ornament" />}
                    <h3 className="text-xl sm:text-2xl md:text-3xl heading-font mb-4 sm:mb-6 relative z-10 pt-2 sm:pt-4 tracking-wider text-[#FDFBF7]">{data.content.event2Name}</h3>
                    <div className="floral-divider mb-4 sm:mb-6 opacity-80 w-24 sm:w-32 scale-75 sm:scale-100"></div>
                    <p className="text-base sm:text-lg mb-2 font-bold accent-text tracking-widest block mx-auto">{data.content.event2Time}</p>
                    <p className="mb-6 sm:mb-8 opacity-70 text-[10px] sm:text-xs font-light uppercase tracking-[0.2em] block mx-auto">{data.content.dateDisplay}</p>
                    <p className="opacity-90 max-w-xs text-xs sm:text-sm leading-relaxed sm:leading-loose mb-8 sm:mb-10 subheading-font mx-auto block text-gray-300">"{data.content.location}"</p>
                    <a href={data.content.mapUrl} target="_blank" className="mt-auto w-full sm:w-auto px-6 sm:px-8 py-3 btn-outline-gold text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] rounded-sm shadow-md transition-all">Lihat Lokasi</a>
                  </div>
                </FadeInSection>
              </div>
            </section>
          );

          if (item.id === 'gallery') {
            const activeGallery = data.content.gallery || [];
            return (
              <section key={item.id} className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto text-center border-b border-[#D4AF37]/10 flex flex-col items-center">
                <FadeInSection className="w-full"><h2 className="text-3xl sm:text-4xl md:text-5xl heading-font mb-12 sm:mb-16 tracking-[0.1em] sm:tracking-[0.15em] block mx-auto gold-text-gradient px-4">{data.content.galleryTitle}</h2></FadeInSection>
                <div className={`grid gap-2 sm:gap-4 md:gap-6 w-full mx-auto ${activeGallery.length === 1 ? 'grid-cols-1 max-w-sm' : activeGallery.length === 2 ? 'grid-cols-2 max-w-3xl' : 'grid-cols-2 md:grid-cols-3'}`}>
                  {activeGallery.map((imgUrl, i) => (
                    <FadeInSection key={i} delay={i * 100} direction="up" className="w-full flex">
                      <div className="aspect-[4/5] w-full overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.5)] md:shadow-[0_10px_30px_rgba(0,0,0,0.8)] group relative cursor-pointer border border-[#D4AF37]/20 rounded-sm bg-[#1A0B0B]">
                        <img src={imgUrl} alt={`Gallery ${i}`} className="w-full h-full object-cover gallery-img opacity-80 md:opacity-70" />
                        <div className="absolute inset-0 border-[4px] md:border-[6px] border-transparent group-hover:border-[#D4AF37]/40 transition-all duration-500 z-10"></div>
                        <div className="absolute inset-0 bg-black/20 md:bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                      </div>
                    </FadeInSection>
                  ))}
                  {activeGallery.length === 0 && <p className="col-span-full text-gray-500 italic text-sm text-center mx-auto">Belum ada foto galeri.</p>}
                </div>
              </section>
            );
          }

          if (item.id === 'gifts') {
            const activeBanks = data.content.banks.filter(b => b.accountNumber && b.accountNumber.trim() !== '');
            return (
              <section key={item.id} className="py-20 sm:py-28 px-4 sm:px-6 max-w-4xl mx-auto text-center border-b border-[#D4AF37]/10 flex flex-col items-center">
                <FadeInSection className="w-full">
                  <h2 className="text-3xl sm:text-4xl heading-font mb-6 sm:mb-8 tracking-[0.1em] sm:tracking-[0.15em] block mx-auto gold-text-gradient px-4">{data.content.giftTitle}</h2>
                  <p className="mb-12 sm:mb-16 opacity-70 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed sm:leading-loose font-light block text-center px-2">"{data.content.giftDescription}"</p>
                </FadeInSection>
                <div className={`grid gap-6 sm:gap-10 w-full mx-auto ${activeBanks.length === 1 ? 'grid-cols-1 max-w-md' : 'md:grid-cols-2'}`}>
                  {activeBanks.map((bank, i) => (
                    <FadeInSection key={bank.id} delay={i * 150} className="w-full flex">
                      <div className="glass-card w-full p-8 sm:p-10 flex flex-col items-center justify-center relative hover:-translate-y-2 transition-transform duration-500 rounded-lg md:rounded-md">
                        <span className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 tracking-[0.15em] sm:tracking-[0.2em] text-[#D4AF37] uppercase block mx-auto">{bank.bankName}</span>
                        <span className="text-xl sm:text-2xl md:text-3xl font-mono mb-2 sm:mb-3 text-white tracking-widest block mx-auto drop-shadow-md break-all px-2">{bank.accountNumber}</span>
                        <span className="text-[10px] sm:text-xs opacity-60 mb-8 sm:mb-10 uppercase font-medium tracking-widest block mx-auto text-center">a.n. {bank.accountName}</span>
                        <button onClick={() => copyToClipboard(bank.accountNumber, setAppAlert)} className="btn-gold w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3 text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] flex items-center justify-center gap-2 sm:gap-3 shadow-lg mx-auto rounded-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                          Salin Rekening
                        </button>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </section>
            );
          }

          if (item.id === 'wishes') return (
            <section key={item.id} className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto border-b border-[#D4AF37]/10 flex flex-col items-center">
              <FadeInSection className="w-full"><h2 className="text-3xl sm:text-4xl md:text-5xl heading-font text-center mb-12 sm:mb-16 tracking-[0.1em] sm:tracking-[0.15em] mx-auto block gold-text-gradient px-4">{data.content.wishesTitle}</h2></FadeInSection>
              <div className="grid md:grid-cols-5 gap-10 sm:gap-12 md:gap-16 w-full">
                <FadeInSection direction="right" delay={100} className="md:col-span-2 w-full">
                  {(() => {
                    const [form, setForm] = useState({ name: '', text: '', attendance: 'hadir' });
                    const [submitting, setSubmitting] = useState(false);
                    const handleSubmit = async (e) => {
                      e.preventDefault(); 
                      if(!form.name || !form.text) return; 
                      setSubmitting(true);
                      
                      const formatOptions = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
                      const newWish = { ...form, id: Date.now(), date: new Date().toLocaleString('id-ID', formatOptions) };
                      
                      try {
                        await onWishSubmit(newWish);
                        setForm({ name: '', text: '', attendance: 'hadir' }); 
                        setAppAlert('Konfirmasi kehadiran berhasil terkirim. Matur nuwun!');
                      } catch (err) {
                        setAppAlert('Gagal mengirim pesan.');
                      } finally {
                        setSubmitting(false);
                      }
                    };
                    return (
                      <div className="glass-card p-6 sm:p-8 md:p-10 h-fit rounded-lg md:rounded-md border-t-4 border-t-[#D4AF37] w-full">
                        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 text-left">
                          <div>
                            <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest block text-[#D4AF37] mb-1">Nama Lengkap</label>
                            <input type="text" value={form.name} onChange={e=>setForm(p=>({...p, name: e.target.value}))} className="w-full input-elegant text-xs sm:text-sm" placeholder="Ketik nama Anda..." required />
                          </div>
                          <div>
                            <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest block text-[#D4AF37] mb-1">Kehadiran</label>
                            <select value={form.attendance} onChange={e=>setForm(p=>({...p, attendance: e.target.value}))} className="w-full input-elegant text-xs sm:text-sm bg-transparent appearance-none">
                              <option value="hadir" className="text-black">Hadir</option>
                              <option value="tidak" className="text-black">Maaf, Tidak Hadir</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest block text-[#D4AF37] mb-1">Pesan / Doa</label>
                            <textarea value={form.text} onChange={e=>setForm(p=>({...p, text: e.target.value}))} className="w-full input-elegant text-xs sm:text-sm h-20 sm:h-24 resize-none" placeholder="Tuliskan doa restu Anda..." required></textarea>
                          </div>
                          <button disabled={submitting} className="w-full btn-gold py-3 sm:py-4 rounded-sm text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] disabled:opacity-50 transition shadow-lg mt-2 sm:mt-4 text-center block">{submitting ? 'MENGIRIM...' : 'KIRIM PESAN'}</button>
                        </form>
                      </div>
                    )
                  })()}
                </FadeInSection>
                <FadeInSection direction="left" delay={200} className="md:col-span-3 w-full">
                  <div className="space-y-4 sm:space-y-5 max-h-[500px] sm:max-h-[600px] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar w-full">
                    {data.content.wishes.map(wish => (
                      <div key={wish.id} className="glass-card p-5 sm:p-6 text-left border-l-2 shadow-md w-full rounded-sm" style={{borderLeftColor: wish.attendance === 'hadir' ? '#D4AF37' : '#7f1d1d'}}>
                        <div className="flex justify-between items-start mb-2 sm:mb-3">
                          <h4 className="font-bold text-sm sm:text-base text-[#FDFBF7] truncate pr-2">{wish.name}</h4>
                          <span className={`text-[7px] sm:text-[8px] uppercase font-bold py-1 px-2 sm:px-3 rounded flex items-center tracking-widest border shrink-0 ${wish.attendance==='hadir' ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30' : 'bg-red-900/20 text-red-400 border-red-800/50'}`}>{wish.attendance === 'hadir' ? 'Hadir' : 'Absen'}</span>
                        </div>
                        <p className="text-xs sm:text-sm opacity-80 leading-relaxed mb-3 sm:mb-4 italic text-gray-200 font-light subheading-font tracking-wide break-words">"{wish.text}"</p>
                        <span className="text-[8px] sm:text-[9px] opacity-40 tracking-[0.15em] sm:tracking-[0.2em] font-medium text-white block">{wish.date}</span>
                      </div>
                    ))}
                  </div>
                </FadeInSection>
              </div>
            </section>
          );

          if (item.id === 'closing') return (
            <section key={item.id} className="py-24 sm:py-36 px-4 sm:px-6 max-w-3xl mx-auto text-center flex flex-col items-center">
              <FadeInSection className="w-full flex flex-col items-center text-center">
                {data.content.gununganUrl && <img src={data.content.gununganUrl} className="w-20 sm:w-24 h-20 sm:h-24 object-contain mx-auto mb-8 sm:mb-12 opacity-80 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] block" alt="closing-ornament" />}
                <p className="text-xs sm:text-sm md:text-base font-light leading-loose mb-12 sm:mb-16 opacity-70 text-gray-200 block mx-auto text-center px-4">"{data.content.closing}"</p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl heading-font mb-6 sm:mb-8 tracking-[0.1em] gold-text-gradient block mx-auto text-center px-2">{data.content.closingTitle}</h2>
                <p className="opacity-50 tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[8px] sm:text-[9px] md:text-[10px] font-bold block mx-auto text-center px-4">{data.content.closingGreeting}</p>
                <div className="mt-16 sm:mt-20 text-2xl sm:text-3xl md:text-4xl heading-font opacity-90 text-white block mx-auto text-center">{data.content.groom} <span className="accent-text text-xl sm:text-2xl mx-2 sm:mx-3 font-sans">&</span> {data.content.bride}</div>
              </FadeInSection>
            </section>
          );

          return null;
        })}
      </main>

      <div className="py-10 sm:py-12 border-t border-[#D4AF37]/10 text-center bg-[#0a0404] flex flex-col items-center relative z-20">
        <p className="opacity-40 text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.2em] sm:tracking-[0.3em] uppercase font-bold text-[#D4AF37] block mx-auto text-center px-4 leading-loose">© {new Date().getFullYear()} {data.content.footerText}</p>
      </div>

      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-40">
        <button onClick={toggleMusic} className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center bg-[#1A0B0B] border border-[#D4AF37] text-[#D4AF37] hover:scale-110 hover:bg-[#D4AF37] hover:text-[#1A0B0B] transition-all duration-300 ${isPlaying ? 'animate-spin' : ''}`}>
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
        </button>
      </div>
      <button onClick={onAdminClick} title="Login Dasboard" className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 btn-gold p-3 sm:p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform z-40">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-[22px] sm:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
      </button>
    </div>
  );
};

export default PublicInvitation;
