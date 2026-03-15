// src/pages/SupportPage.tsx
import {useState} from 'react';
import SEO from '../components/SEO'; // ★ 만든 SEO 컴포넌트 불러오기
import SupportFooter from "../components/footer/SupportFooter.tsx";

export default function SupportPage() {
  // 화면에 띄울 텍스트를 변수로 저장합니다. (백틱 ` 을 사용하면 줄바꿈이 그대로 유지됩니다)
  const templateText = `2026년 계정복구 문의글 양식
(설정 ㅡ 계정 ㅡ 계정연동 안 됐을 때
당황하지 마시고 문의 넣으세요.) 
━━━━━━━━━━━━━━━━━━━━
Subject: Unexpected Account Loss and Sync Issue 

Dear Boombit Support,
I hope this email finds you well. I am reaching out to seek urgent assistance regarding an issue I encountered in your game. 

Below are my in-game details:
Game Version: 3.24.0 (현재 게임 버전)
Old Player ID:
New Player ID: 

Google Account:
(아이폰은 App store: )
Email Address: 

Device: 

I am writing to report an issue that occurred a few hours ago and has persisted until now. 

A few hours ago, I tried to return to the game, but my old account was unexpectedly missing, and my Google account could not be synced. 

Initially, I assumed it might be a temporary glitch that would resolve itself automatically. However, despite waiting patiently, the issue persists.
I am reaching out to you via this email for assistance. 

I would greatly appreciate it if you could investigate this matter promptly and help resolve the issue. 

Best regards, 

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 

For your reference, I have attached the following evidence: 

A screenshot displaying the message received upon logging into the game.
(게임 접속시 뜨는 문구)
(자기 자신이 어떤 상태인지 알려주는 증거물)
(구글 연동 안되고 있음을 보여주는 스샷도 첨부) 

A screenshot of my in-game profile.
(게임 프로필)
(게임 접속해서 프로필 공유하기 ㅡ 카톡 ㅡ 다운로드) 

A screenshot of the recent payment made in Hunt Royale. 
(결제영수증 최대한 많이)`;

  const [copied, setCopied] = useState(false);

  // 텍스트 복사 기능
  const handleCopy = () => {
    navigator.clipboard.writeText(templateText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2초 뒤에 원래 버튼 텍스트로 복구
      alert('양식이 클립보드에 복사되었습니다.');
    });
  };

  return (
    <>
      <SEO
        title="계정 복구 양식"
        description="게임 계정 연동 오류 및 복구를 위한 영문 문의 양식입니다."
      />

      <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>

        {/* 헤더 및 복사 버튼 영역 */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h2 style={{margin: 0}}>계정 복구 문의 양식</h2>
          <button
            onClick={handleCopy}
            style={{
              padding: '8px 16px',
              backgroundColor: copied ? '#28a745' : '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s'
            }}
          >
            {copied ? '복사 완료!' : '양식 복사하기'}
          </button>
        </div>

        {/* 문의처 주소 영역 (클릭할 수 있도록 별도 분리) */}
        <div style={{margin: '20px 0px 20px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '8px'}}>
          <p style={{margin: '0 0 10px 0', fontWeight: 'bold'}}>문의처 주소</p>
          <a
            href="https://boombit.zendesk.com/hc/ko/requests/new"
            target="_blank"
            rel="noopener noreferrer"
            style={{color: '#0056b3', textDecoration: 'underline', wordBreak: 'break-all'}}
          >
            https://boombit.zendesk.com/hc/ko/requests/new
          </a>
        </div>

        {/* 텍스트가 출력되는 본문 영역 */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '25px',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          whiteSpace: 'pre-wrap', // ★ 이 속성이 줄바꿈을 그대로 유지해줍니다.
          wordBreak: 'break-word',
          lineHeight: '1.6',
          color: '#333',
          fontSize: '15px'
        }}>
          {templateText}
        </div>

        <SupportFooter/>
      </div>
    </>
  );
}