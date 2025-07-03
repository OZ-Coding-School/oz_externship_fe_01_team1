export interface SelectOption {
    id: number;  // 필수로 변경
    label: string;
    value: string;
}

export const mainCategories: SelectOption[] = [
    { id: 1, label: '프론트엔드', value: 'frontend' },
    { id: 2, label: '백엔드', value: 'backend' },
];

export const subCategories: SelectOption[] = [
    { id: 3, label: '프로그래밍 언어', value: 'lang' },
    { id: 4, label: '인프라', value: 'infra' },
];

export const detailCategories: SelectOption[] = [
    { id: 5, label: 'Python', value: 'python' },
    { id: 6, label: 'React', value: 'react' },
];