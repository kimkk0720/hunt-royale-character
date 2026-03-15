// src/components/SEO.tsx
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
}

export default function SEO({ title, description }: SEOProps) {
  return (
    <Helmet>
      {/* 탭 브라우저 제목 */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* 오픈그래프 (카카오톡, 페이스북, 디스코드 등 공유용) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* 필요하다면 og:image 도 추가할 수 있습니다 */}
    </Helmet>
  );
}