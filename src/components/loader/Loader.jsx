import { useState, useEffect } from 'react';

function Loader() {
  const [currentSubject, setCurrentSubject] = useState(0);
  const subjects = ['رياضيات', 'علوم', 'تاريخ', 'لغة عربية', 'جغرافيا'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubject((prev) => (prev + 1) % subjects.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [subjects.length]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      zIndex: 9999,
      flexDirection: 'column',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Book Stack Animation */}
      <div style={{
        position: 'relative',
        height: '110px',
        width: '160px',
        marginBottom: '40px'
      }}>
        {/* Top Book (Fixed) */}
        <div style={{
          position: 'absolute',
          bottom: '50px',
          left: '40px',
          width: '80px',
          height: '30px',
          backgroundColor: '#FFD700',
          borderRadius: '2px 6px 6px 2px',
          transformOrigin: 'bottom left',
          animation: 'book-tilt-1 2s infinite ease-in-out',
          boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '14px',
          borderRight: '3px solid rgba(255,255,255,0.3)',
          zIndex: 3
        }}>
          تعليم
        </div>

        {/* Middle Book (Changing Subjects) */}
        <div style={{
          position: 'absolute',
          bottom: '25px',
          left: '20px',
          width: '80px',
          height: '35px',
          backgroundColor: 'var(--color-primary)',
          borderRadius: '2px 6px 6px 2px',
          transformOrigin: 'bottom left',
          animation: 'book-tilt-2 2.2s infinite ease-in-out',
          boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '14px',
          borderRight: '3px solid rgba(255,255,255,0.3)',
          zIndex: 2,
          transition: 'all 0.3s ease'
        }}>
          {subjects[currentSubject]}
        </div>

        {/* Bottom Book (Fixed) */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '80px',
          height: '40px',
          backgroundColor: 'var(--color-secondary)',
          borderRadius: '2px 6px 6px 2px',
          transformOrigin: 'bottom left',
          animation: 'book-tilt-3 2.4s infinite ease-in-out',
          boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '14px',
          borderRight: '3px solid rgba(255,255,255,0.3)',
          zIndex: 1
        }}>
          مواد
        </div>
      </div>

      {/* Spinner Animation */}
      <div style={{
        width: '50px',
        height: '50px',
        border: '5px solid rgba(var(--primary), 0.2)',
        borderTop: '5px solid var(--color-primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '20px 0'
      }}></div>

      {/* Loading Text */}
      <p style={{
        marginTop: '20px',
        color: 'var(--color-primary)',
        fontSize: '20px',
        fontWeight: 'bold',
        animation: 'text-pulse 2s infinite ease-in-out'
      }}>
        جاري تحميل ...
      </p>

      {/* Inline keyframes */}
      <style>{`
        @keyframes book-tilt-1 {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(-3deg) translateY(-3px); }
        }
        @keyframes book-tilt-2 {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(2deg) translateY(-5px); }
        }
        @keyframes book-tilt-3 {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(-2deg) translateY(-2px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes text-pulse {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}

export default Loader;