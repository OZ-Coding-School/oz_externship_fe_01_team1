export interface SelectOption {
    label: string;
    value: string;
}

export const mainCategories: SelectOption[] = [
    {label: '프론트엔드', value: 'frontend'},
    {label: '백엔드', value: 'backend'},
];

export const subCategories: SelectOption[] = [
    {label: '프로그래밍 언어', value: 'lang'},
    {label: '인프라', value: 'infra'},
];

export const detailCategories: SelectOption[] = [
    {label: 'Python', value: 'python'},
    {label: 'React', value: 'react'},
];