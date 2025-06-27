import React from 'react';

const WriteButton: React.FC = () => (
  <button
    className="flex items-center gap-2 px-4 py-2 rounded"
    style={{
      borderRadius: '4px',
      background: 'rgb(98, 1, 224)',
      marginLeft: '227px',
    }}
  >
    <span
      className="flex items-center justify-center"
      style={{
        width: '28px',
        height: '28px',
        marginRight: '4px',
      }}
    >
      <svg width="18.75" height="18.75" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M17.5 0.85C17.12 0.69 16.73 0.62 16.33 0.62C15.93 0.62 15.53 0.7 15.16 0.86C14.79 1.02 14.46 1.25 14.18 1.53L2.1 13.62L0.62 19.37L6.37 17.89L18.46 5.81C18.74 5.53 18.97 5.2 19.13 4.83C19.29 4.46 19.37 4.06 19.37 3.66C19.37 3.26 19.3 2.87 19.14 2.5C18.99 2.12 18.77 1.79 18.49 1.5C18.2 1.22 17.87 1 17.5 0.85Z" stroke="#FAFAFA" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M13.83 1.88L18.11 6.16" stroke="#FAFAFA" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M12.09 3.62L16.37 7.9" stroke="#FAFAFA" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M2.1 13.62L6.38 17.89" stroke="#FAFAFA" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
        </g>
      </svg>
    </span>
    <span
      className="font-bold"
      style={{
        color: 'rgb(255,255,255)',
        fontFamily: 'Pretendard',
        fontSize: '16px',
        lineHeight: '140%',
        letterSpacing: '-0.03em',
        textAlign: 'left',
      }}
    >
      글쓰기
    </span>
  </button>
);

export default WriteButton;