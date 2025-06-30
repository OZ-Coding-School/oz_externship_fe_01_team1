import type {SelectOption} from '../components/CommunityPostAndEdit/data/categoryOptions';

interface GetCategoryConfigProps {
    mainCat: string;
    setMainCat: (val: string) => void;
    subCat: string;
    setSubCat: (val: string) => void;
    detailCat: string;
    setDetailCat: (val: string) => void;
    mainOptions: SelectOption[];
    subOptions: SelectOption[];
    detailOptions: SelectOption[];
}

export interface CategoryConfig {
    key: 'mainCat' | 'subCat' | 'detailCat';
    label: string;
    value: string;
    setValue: (val: string) => void;
    options: SelectOption[];
    disabled?: boolean;
}

export function getCategoryConfigs({
                                       mainCat,
                                       setMainCat,
                                       subCat,
                                       setSubCat,
                                       detailCat,
                                       setDetailCat,
                                       mainOptions,
                                       subOptions,
                                       detailOptions,
                                   }: GetCategoryConfigProps): CategoryConfig[] {
    return [
        {
            key: 'mainCat',
            label: '대분류',
            value: mainCat,
            setValue: (val) => {
                setMainCat(val);
                setSubCat('');
                setDetailCat('');
            },
            options: mainOptions,
        },
        {
            key: 'subCat',
            label: '중분류',
            value: subCat,
            setValue: (val) => {
                setSubCat(val);
                setDetailCat('');
            },
            disabled: !mainCat,
            options: subOptions,
        },
        {
            key: 'detailCat',
            label: '소분류',
            value: detailCat,
            setValue: setDetailCat,
            disabled: !subCat,
            options: detailOptions,
        },
    ];
}
