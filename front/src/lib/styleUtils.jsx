import { css, keyframes } from 'styled-components';

export const transitions = {
    shake: keyframes`
        0% {
            transform: translate(-30px);
        }
        25% {
            transform: translate(15px);
        }
        50% {
            transform: translate(-10px);
        }
        75% {
            transform: translate(5px);
        }
        100% {
            transform: translate(0px);
        }
    `
};

// 미디어 쿼리 헬퍼: https://www.styled-components.com/docs/advanced#media-templates 참조
export const sizes = {
    wide: '1200px',
    desktop: '992px',
    tablet: '768px',
    phone: '376px'
};

export const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (max-width: ${sizes[label]}) {
            ${css(...args)}
        }
    `;
    return acc;
}, {});

// 그림자 효과: https://codepen.io/sdthornton/pen/wBZdXq 기반
export const shadow = (weight) => {
    const shadows = [
        css`box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);`,
        css`box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);`,
        css`box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);`,
        css`box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);`,
        css`box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);`
    ];

    return shadows[weight];
};