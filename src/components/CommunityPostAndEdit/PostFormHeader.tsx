import {getCategoryConfigs} from '@utils/getCategoryConfigs.ts';
import {
    mainCategories,
    subCategories,
    detailCategories,
} from './data/categoryOptions';

interface Props {
    title: string;
    setTitle: (val: string) => void;
    mainCat: string;
    setMainCat: (val: string) => void;
    subCat: string;
    setSubCat: (val: string) => void;
    detailCat: string;
    setDetailCat: (val: string) => void;
}

export default function PostFormHeader(props: Props) {
    const categories = getCategoryConfigs({
        ...props,
        mainOptions: mainCategories,
        subOptions: subCategories,
        detailOptions: detailCategories,
    });

    return (
        <header>
            <div className="max-w-5xl mx-auto bg-white border-b border-gray-200 pt-10 gap-5">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">커뮤니티 게시글 작성</h1>
            </div>

            <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl border border-gray-200 mt-6 gap-2.5">
                <div className="grid grid-cols-3 gap-6 mb-6">
                    {categories.map((cat) => (
                        <div key={cat.key}>
                            <select
                                value={cat.value}
                                onChange={(e) => cat.setValue(e.target.value)}
                                disabled={cat.disabled}
                                className={`w-full px-3 py-2 border border-gray-300 rounded ${
                                    cat.disabled ? 'bg-gray-100 text-gray-400' : ''
                                }`}
                            >
                                <option value="">{cat.label}</option>
                                {cat.options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                <div className="border border-purple-300 bg-purple-50 rounded-md px-4 py-3 shadow-sm">
                    <input
                        type="text"
                        value={props.title}
                        onChange={(e) => props.setTitle(e.target.value)}
                        placeholder="제목을 입력해 주세요"
                        className="w-full bg-transparent focus:outline-none text-gray-900"
                    />
                </div>
            </div>
        </header>
    );
}
