import {useState} from 'react';
import {TAG_GROUPS, characterDB, type Tier} from './data';
import Footer from './Footer';

// 티어 순서 정의 (가져온 Tier 타입 사용)
const TIER_ORDER: Tier[] = ['SSS', 'SS', 'S', 'A', 'B', 'C', 'D'];

export default function App() {
  // 선택된 태그 상태 관리
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // 현재 언어 상태 관리 ('ko' 또는 'en')
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  // 필터 열림/닫힘
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);

  // 태그 클릭 시 선택/해제 로직
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 캐릭터 필터링 로직
  const filteredCharacters = characterDB.filter((char) => {
    if (selectedTags.length === 0) return true;
    return selectedTags.some((tag) => char.tags.includes(tag));
  });

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>

      {/* 상단 헤더 영역 */}
      <div style={{
        position: 'relative', // 버튼을 우측에 띄우기 위한 기준점
        display: 'flex',
        justifyContent: 'center', // 제목 완벽한 중앙 정렬
        alignItems: 'center',
        marginBottom: '20px',
        minHeight: '40px' // 버튼 때문에 높이가 찌그러지지 않게 최소 높이 지정
      }}>
        <h1 style={{
          margin: 0,
          // 모바일 제목 겹침 방지 1: 화면 크기에 따라 폰트 크기 자동 조절 (최소 24px, 최대 36px)
          fontSize: 'clamp(24px, 5vw, 36px)',
          // 모바일 제목 겹침 방지 2: 단어 단위로 줄바꿈 허용
          wordBreak: 'keep-all'
        }}>
          헌트로얄 캐릭터 티어표
        </h1>

        {/* 우측 상단 언어 전환 버튼 */}
        <button
          onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
          style={{
            right: 0,
            position: 'absolute',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            cursor: 'pointer',
            fontWeight: 'bold',
            whiteSpace: 'nowrap' // 버튼 텍스트는 무조건 한 줄로 유지
          }}
        >
          {lang === 'ko' ? '영어' : '한글'}
        </button>
      </div>

      {/* 2️⃣ 태그 필터 영역 (접기/펴기 기능 추가) */}
      <div style={{ marginBottom: '20px', padding: '5px 15px 5px 15px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>

        {/* 필터 제목 (클릭 시 접고 펴기) */}
        <div
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer', // 마우스를 올리면 손가락 모양으로 바뀜
            userSelect: 'none' // 더블클릭 시 글자 드래그 방지
          }}
        >
          <h3 style={{ margin: 0, color: '#333' }}>
            필터 (태그 선택)
          </h3>
          {/* 열림/닫힘 상태에 따라 화살표 모양 변경 */}
          <span style={{fontSize: '18px', color: '#888'}}>
            {isFilterOpen ? '▼' : '▲'}
          </span>
        </div>

        {/* 🌟 isFilterOpen이 true일 때만 아래 내용(태그들)을 보여줍니다 */}
        {isFilterOpen && (
          <div style={{ marginTop: '20px' }}>
            {TAG_GROUPS.map((group, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#666', marginBottom: '8px' }}>
                  ▪ {group.title}
                </div>

                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {group.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: '1px solid #ddd',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        backgroundColor: selectedTags.includes(tag) ? '#007bff' : '#fff',
                        color: selectedTags.includes(tag) ? 'white' : '#333',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3️⃣ 티어표 표시 영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {TIER_ORDER.map((tier) => {
          const charsInTier = filteredCharacters.filter((char) => char.tier === tier);

          if (charsInTier.length === 0) return null;

          return (
            <div key={tier} style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff' }}>
              {/* 티어 라벨 (S, A, B ...) */}
              <div style={{
                width: '80px',
                minWidth: '80px', // 모바일에서 티어 라벨이 찌그러지는 것 방지
                backgroundColor: getTierColor(tier),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                {tier}
              </div>

              {/* 해당 티어의 캐릭터 목록 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px', gap: '12px', flex: 1 }}>
                {charsInTier.map((char) => (
                  <div key={char.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70px' }}>
                    <img
                      src={char.image}
                      alt={char.name}
                      style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #eee' }}
                    />
                    <div style={{
                      fontSize: '12px',
                      marginTop: '6px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      wordBreak: 'keep-all' // 캐릭터 이름 줄바꿈 방지
                    }}>
                      {/* 🌟 현재 선택된 언어(lang)에 따라 한국어/영어 이름을 다르게 보여줍니다 */}
                      {lang === 'ko' ? char.name_kor : char.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* 필터 결과가 아예 없을 때 */}
        {filteredCharacters.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#888', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            {lang === 'ko' ? '해당 조건에 맞는 캐릭터가 없습니다.' : 'No characters match the selected filters.'}
          </div>
        )}
      </div>

      {/* 4️⃣ 하단 Footer 영역 (별도 파일로 분리된 컴포넌트) */}
      <Footer />

    </div>
  );
}

// 티어별 배경색 함수도 늘어난 티어에 맞게 추가해 줍니다.
function getTierColor(tier: Tier): string {
  switch (tier) {
    case 'SSS': return '#FF5555'; // 진한 빨강
    case 'SS': return '#FF7F7F'; // 빨강
    case 'S': return '#FFAA55'; // 주황
    case 'A': return '#FFFF7F'; // 노랑
    case 'B': return '#AAFF7F'; // 연두
    case 'C': return '#7FFF7F'; // 초록
    case 'D': return '#7FFFFF'; // 하늘색 (추가)
    default: return '#eee';
  }
}