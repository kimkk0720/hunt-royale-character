// src/pages/ItemPage.tsx
import TierListFooter from '../components/footer/TierListFooter.tsx';

export default function ItemPage() {
  return (
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
  );
}
