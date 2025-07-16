export interface SelectOption {
    id: number;  // 필수로 변경
    label: string;
    value: string;
}

export const mainCategories: SelectOption[] = [
    { id: 1, label: 'test9900', value: 'test9900' },
    { id: 2, label: '프론트엔드', value: '프론트엔드' },
    { id: 3, label: '백엔드', value: '백엔드' },
    { id: 4, label: '프로그래밍 언어', value: '프로그래밍 언어' },
    { id: 5, label: '인프라', value: '인프라' },
    { id: 6, label: 'Python', value: 'Python' },
    { id: 7, label: 'React', value: 'React' },
    { id: 8, label: '구인/협업', value: '구인/협업' },
    { id: 9, label: '카테고리1', value: '카테고리1' },
];
