import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, 'dist');

// 경로별 메타데이터 설정
const ROUTE_META = {
  'item': {
    title: "헌트로얄 장비세팅 가이드",
    description: "3.24.0 버전 기준 장비세팅 가이드 (공사 중)"
  },
  'support': {
    title: '계정 복구 양식',
    description: '게임 계정 연동 오류 및 복구를 위한 영문 문의 양식입니다.'
  },
  '404': {
    title: '페이지를 찾을 수 없습니다',
    description: '요청하신 페이지를 찾을 수 없습니다.'
  }
};

const ROUTES = ['item', 'support'];

function injectMeta(html, meta) {
  if (!meta) return html;

  let content = html;

  // 1. <title> 태그 교체
  content = content.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);

  // 2. description 메타 태그 교체 또는 삽입
  if (content.includes('name="description"')) {
    content = content.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${meta.description}" />`);
  } else {
    content = content.replace('</head>', `    <meta name="description" content="${meta.description}" />\n  </head>`);
  }

  // 3. OpenGraph 태그 삽입 (기존에 없으면 </head> 직전에 추가)
  const ogTags = `
    <meta property="og:title" content="${meta.title}">
    <meta property="og:description" content="${meta.description}">`;

  // 기존 og:title, og:description이 있으면 교체, 없으면 추가
  if (content.includes('property="og:title"')) {
    content = content.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${meta.title}">`);
  } else {
    content = content.replace('</head>', `    <meta property="og:title" content="${meta.title}">\n  </head>`);
  }

  if (content.includes('property="og:description"')) {
    content = content.replace(/<meta property="og:description" content=".*?">/, `<meta property="og:description" content="${meta.description}">`);
  } else {
    content = content.replace('</head>', `    <meta property="og:description" content="${meta.description}">\n  </head>`);
  }

  return content;
}

function postBuild() {
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html not found!');
    process.exit(1);
  }

  const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

  ROUTES.forEach((route) => {
    const routeDir = path.join(DIST_DIR, route);
    const meta = ROUTE_META[route];
    const customizedContent = injectMeta(indexContent, meta);

    // Create directory if it doesn't exist
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, {recursive: true});
    }

    // Write index.html to the route directory
    const outputPath = path.join(routeDir, 'index.html');
    fs.writeFileSync(outputPath, customizedContent);
    console.log(`Generated: ${outputPath} with custom OG tags`);

    // Also create route.html at root if preferred
    const rootOutputPath = path.join(DIST_DIR, `${route}.html`);
    fs.writeFileSync(rootOutputPath, customizedContent);
    console.log(`Generated: ${rootOutputPath} with custom OG tags`);
  });

  // Create 404.html for GitHub Pages to handle SPA routing
  const path404 = path.join(DIST_DIR, '404.html');
  const customized404 = injectMeta(indexContent, ROUTE_META['404']);
  fs.writeFileSync(path404, customized404);
  console.log(`Generated: ${path404} (for SPA routing)`);
}

postBuild();
