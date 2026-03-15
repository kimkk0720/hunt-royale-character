// src/components/Layout.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  // 메뉴의 열림/닫힘 상태를 관리하는 state
  const[isMenuOpen, setIsMenuOpen] = useState(false);

  // 햄버거 버튼 클릭 시 상태를 반전시키는 함수
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 링크 클릭 시 메뉴를 닫아주는 함수
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      {/* 상단 헤더 영역 */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between', // 좌측 타이틀, 우측 햄버거 버튼 배치
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
        position: 'relative' // 드롭다운 메뉴의 절대 위치(absolute) 기준점
      }}>
        {/* 좌측 타이틀/로고 영역 (원하시는 대로 수정하세요) */}
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>헌트로얄 가이드</Link>
        </div>

        {/* 우측 상단 햄버거 버튼 */}
        <button
          onClick={toggleMenu}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '5px'
          }}
        >
          {/* CSS로 구현한 햄버거 아이콘 선 3개 */}
          <span style={{ display: 'block', width: '25px', height: '3px', backgroundColor: '#fff', borderRadius: '2px' }}></span>
          <span style={{ display: 'block', width: '25px', height: '3px', backgroundColor: '#fff', borderRadius: '2px' }}></span>
          <span style={{ display: 'block', width: '25px', height: '3px', backgroundColor: '#fff', borderRadius: '2px' }}></span>
        </button>

        {/* isMenuOpen이 true일 때만 보여지는 드롭다운 메뉴 */}
        {isMenuOpen && (
          <nav style={{
            position: 'absolute',
            top: '55px', // 헤더 바로 아래에 위치
            right: '20px',
            backgroundColor: '#444',
            display: 'flex',
            flexDirection: 'column',
            padding: '15px 25px',
            borderRadius: '8px',
            gap: '15px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
            zIndex: 1000 // 다른 화면 요소들보다 위에 표시되도록 설정
          }}>
            <Link to="/" onClick={closeMenu} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>티어표</Link>
            <Link to="/item" onClick={closeMenu} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>템세팅</Link>
            <Link to="/support" onClick={closeMenu} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>복구문의</Link>
          </nav>
        )}
      </header>

      {/* 본문 영역 */}
      <main>
        {children}
      </main>
    </div>
  );
}