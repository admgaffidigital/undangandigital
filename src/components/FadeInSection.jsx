import { useState, useEffect, useRef } from 'react';

const FadeInSection = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { 
        setVisible(true); 
        observer.unobserve(domRef.current); 
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    }
  }, []);

  const translateMap = { 
    'up': 'translate-y-12', 
    'down': '-translate-y-12', 
    'left': 'translate-x-12', 
    'right': '-translate-x-12', 
    'none': 'translate-y-0 scale-95' 
  };
  
  return (
    <div 
      ref={domRef} 
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : `opacity-0 ${translateMap[direction]}`} ${className}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
