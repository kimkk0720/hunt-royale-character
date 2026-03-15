// src/Footer.tsx
export default function TierListFooter() {
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
      <p>© 2026 Hunt Royale Tier List. All rights reserved.</p>
      <p>
        This is an unofficial fan-made project.
        Game assets and data belong to their respective owners.
      </p>
      <p>ver. 3.24.0</p>
      <p><a href={"https://open.kakao.com/o/gtJzDIXd"}>밸런스 및 문의하러 가기</a></p>
    </footer>
  );
}