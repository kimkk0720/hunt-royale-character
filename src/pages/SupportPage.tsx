// src/pages/SupportPage.tsx

export default function SupportPage() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>게시판</h1>
      <p>여기에 게시판 목록이나 내용을 구현할 수 있습니다.</p>

      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#fff',
        minHeight: '300px'
      }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>공지사항: 게시판이 생성되었습니다.</li>
          <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>팁: 고르곤은 SSS급입니다.</li>
          <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>질문: 협동 모드 파티 구합니다.</li>
        </ul>
      </div>
    </div>
  );
}
