// src/pages/HomePage.tsx
import {useState} from 'react';
import {characterDB, TAG_GROUPS} from '../data';
import {type Tier} from '../types/character.ts';
import TierListFooter from '../components/footer/TierListFooter.tsx';

const TIER_ORDER: Tier[] = ['SSS', 'SS', 'S', 'A', 'B', 'C', 'D'];

export default function HomePage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredCharacters = characterDB.filter((char) => {
    if (selectedTags.length === 0) return true;
    return selectedTags.some((tag) => char.tags.includes(tag));
  });

  return (
    <div style={{fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        minHeight: '40px'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: 'clamp(24px, 5vw, 36px)',
          wordBreak: 'keep-all'
        }}>
          헌트로얄 캐릭터 티어표
        </h1>

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
            whiteSpace: 'nowrap'
          }}
        >
          {lang === 'ko' ? '영어' : '한글'}
        </button>
      </div>

      <div style={{
        marginBottom: '20px',
        padding: '6px 8px 6px 8px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #eee'
      }}>
        <div
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <h3 style={{margin: 0, color: '#333'}}>
            필터 (태그 선택)
          </h3>
          <span style={{fontSize: '18px', color: '#888'}}>
            {isFilterOpen ? '▼' : '▲'}
          </span>
        </div>

        {isFilterOpen && (
          <div style={{marginTop: '20px'}}>
            {TAG_GROUPS.map((group, index) => (
              <div key={index} style={{marginBottom: '5px'}}>
                <div style={{fontSize: '14px', fontWeight: 'bold', color: '#666', marginBottom: '8px'}}>
                  ▪ {group.title}
                </div>

                <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap'}}>
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

      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        {TIER_ORDER.map((tier) => {
          const charsInTier = filteredCharacters.filter((char) => char.tier === tier);
          if (charsInTier.length === 0) return null;

          return (
            <div key={tier} style={{
              display: 'flex',
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#fff'
            }}>
              <div style={{
                width: '80px',
                minWidth: '80px',
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

              <div style={{display: 'flex', flexWrap: 'wrap', padding: '10px', gap: '12px', flex: 1}}>
                {charsInTier.map((char) => (
                  <div key={char.id}
                       style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70px'}}>
                    <img
                      src={char.image}
                      alt={char.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        border: '1px solid #eee'
                      }}
                    />
                    <div style={{
                      fontSize: '12px',
                      marginTop: '6px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      wordBreak: 'keep-all'
                    }}>
                      {lang === 'ko' ? char.name_kor : char.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredCharacters.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#888',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px'
          }}>
            {lang === 'ko' ? '해당 조건에 맞는 캐릭터가 없습니다.' : 'No characters match the selected filters.'}
          </div>
        )}
      </div>

      <TierListFooter/>
    </div>
  );
}

function getTierColor(tier: Tier): string {
  switch (tier) {
    case 'SSS': return '#FF5555';
    case 'SS': return '#FF7F7F';
    case 'S': return '#FFAA55';
    case 'A': return '#FFFF7F';
    case 'B': return '#AAFF7F';
    case 'C': return '#7FFF7F';
    case 'D': return '#7FFFFF';
    default: return '#eee';
  }
}
