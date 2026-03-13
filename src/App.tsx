import {useState} from 'react';
import {type Character, characterDB, type Tier} from './data';
// 티어 순서 정의 (가져온 Tier 타입 사용)
const TIER_ORDER: Tier[] = ['SSS', 'SS', 'S', 'A', 'B', 'C', 'D'];

// 모든 데이터에서 중복 없는 태그 목록 추출
const allTags: string[] = Array.from(new Set(characterDB.flatMap((char) => char.tags)));

export default function TierListApp() {
  // 3. State 타입 지정하기
  // selectedTags는 문자열 배열(string[])이라는 것을 알려줍니다.
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 태그 클릭 시 선택/해제 로직
  // 매개변수 tag가 문자열(string)임을 지정합니다.
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 캐릭터 필터링 로직
  const filteredCharacters: Character[] = characterDB.filter((char) => {
    if (selectedTags.length === 0) return true;
    return selectedTags.every((tag) => char.tags.includes(tag));
  });

  return (
    <div style={{padding: '20px', fontFamily: 'sans-serif'}}>
      <h1>Hunt Royale Character Tier List</h1>

      {/* 태그 필터 영역 */}
      <div style={{marginBottom: '20px'}}>
        <h3>필터 (태그 선택):</h3>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            style={{
              margin: '5px',
              padding: '8px 12px',
              backgroundColor: selectedTags.includes(tag) ? '#007bff' : '#f0f0f0',
              color: selectedTags.includes(tag) ? '#fff' : '#000',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 티어표 표시 영역 */}
      <div>
        {TIER_ORDER.map((tier) => {
          const charsInTier = filteredCharacters.filter((char) => char.tier === tier);

          if (charsInTier.length === 0) return null;

          return (
            <div key={tier} style={{
              display: 'flex',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '80px',
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

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                padding: '10px',
                gap: '10px',
                backgroundColor: '#fff',
                flex: 1
              }}>
                {charsInTier.map((char) => (
                  <div key={char.id} style={{textAlign: 'center'}}>
                    <img
                      src={char.image}
                      alt={char.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      fontSize: '12px',
                      marginTop: '4px',
                      fontWeight: 'bold'
                    }}>{char.name}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredCharacters.length === 0 && (
          <div style={{textAlign: 'center', padding: '40px', color: '#888'}}>
            해당 조건에 맞는 캐릭터가 없습니다.
          </div>
        )}
      </div>
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