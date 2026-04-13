// src/pages/ItemPage.tsx
import TierListFooter from '../components/footer/TierListFooter.tsx';
import SEO from "../components/SEO.tsx";

export default function ItemPage() {
  return (
    <>
      <SEO
        title="헌트로얄 장비세팅 가이드"
        description="3.25.0 버전 기준 장비세팅 가이드 (공사 중)"
      />
      <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>공사중</h1>

        <div style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#fff',
          minHeight: '300px'
        }}>
        </div>

        <TierListFooter />
      </div>
    </>
  );
}
