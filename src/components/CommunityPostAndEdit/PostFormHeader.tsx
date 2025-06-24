import { useEffect } from 'react';
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

export default function PostFormHeader({
    title,
    setTitle,
    mainCat,
    setMainCat,
    subCat,
    setSubCat,
    detailCat,
    setDetailCat,
}: Props) {
    // Reset subCat and detailCat when mainCat changes
    useEffect(() => {
        setSubCat('');
        setDetailCat('');
    }, [mainCat]);
    // Reset detailCat when subCat changes
    useEffect(() => {
        setDetailCat('');
    }, [subCat]);
    return (
        <>
            <div className="max-w-5xl mx-auto bg-white border-b border-gray-200 pt-10 gap-14">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">커뮤니티 게시글 작성</h1>
            </div>

            <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl border border-gray-200 mt-6 gap-2.5">
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div>
                    <select
                      value={mainCat}
                      onChange={(e) => setMainCat(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="">대분류</option>
                      <option value="frontend">프론트엔드</option>
                      <option value="backend">백엔드</option>
                    </select>
                  </div>
                  <div>
                    <select
                      value={subCat}
                      onChange={(e) => setSubCat(e.target.value)}
                      disabled={!mainCat}
                      className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 ${
                        !mainCat ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'
                      }`}
                    >
                      <option value="">중분류</option>
                      {mainCat === 'frontend' && (
                        <>
                          <option value="lang">프로그래밍 언어</option>
                          <option value="infra">인프라</option>
                        </>
                      )}
                      {mainCat === 'backend' && (
                        <>
                          <option value="db">데이터베이스</option>
                          <option value="infra">인프라</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div>
                    <select
                      value={detailCat}
                      onChange={(e) => setDetailCat(e.target.value)}
                      disabled={!mainCat || !subCat}
                      className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 ${
                        !mainCat || !subCat ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'
                      }`}
                    >
                      <option value="">소분류</option>
                      {subCat === 'lang' && (
                        <>
                          <option value="python">Python</option>
                          <option value="javascript">JavaScript</option>
                        </>
                      )}
                      {subCat === 'infra' && (
                        <>
                          <option value="aws">AWS</option>
                          <option value="docker">Docker</option>
                        </>
                      )}
                      {subCat === 'db' && (
                        <>
                          <option value="mysql">MySQL</option>
                          <option value="mongodb">MongoDB</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="border border-purple-300 bg-purple-50 rounded-md px-4 py-3 shadow-sm">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력해 주세요"
                        className="w-full bg-transparent focus:outline-none text-gray-900"
                    />
                </div>
            </div>
        </>
    )
}