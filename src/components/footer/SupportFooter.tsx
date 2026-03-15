// src/components/footer/SupportFooter.tsx
export default function SupportFooter() {
  return (
    <footer style={{
      marginTop: '40px',
      padding: '20px',
      textAlign: 'center',
      borderTop: '1px solid #ddd',
      color: '#888',
      fontSize: '14px',
      wordBreak: 'keep-all' // 모바일 줄바꿈 방지
    }}>
      <p>잘 모르시겠다면 아래 채팅방 들어오셔서 물어보셔도 됩니다.</p>
      <p><a href={"https://open.kakao.com/o/gsoRc9Id"}>헌트로얄 던전 모임방</a></p>
    </footer>
  );
}