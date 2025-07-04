export interface SelectOption {
    id: number;  // 필수로 변경
    label: string;
    value: string;
}
// const categories = ['전체','프론트엔드','백엔드','프로그래밍 언어','인프라','Python','React'];
export const mainCategories: SelectOption[] = [
    { id: 1, label: '프론트엔드', value: '프론트엔드' },
    { id: 2, label: '백엔드', value: '백엔드' },
    { id: 3, label: '프로그래밍 언어', value: '프로그래밍 언어' },
    { id: 4, label: '인프라', value: '인프라' },
    { id: 5, label: 'Python', value: 'Python' },
    { id: 6, label: 'React', value: 'React' },
    { id: 7, label: '구인/협업', value: '구인/협업' },
];
