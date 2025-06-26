import MDEditor from '@uiw/react-md-editor';

export default function Content() {
    const [markdown, setMarkdown] = useState('');

    return (
        <>
            <div className="max-w-5xl mx-auto bg-white   rounded-xl border border-gray-200 mt-10">
                <div className="bg-white rotate-md" data-color-mode="light">
                    <MDEditor
                        value={markdown}
                        onChange={(val = '') => setMarkdown(val)}
                        height={400}
                        preview="live"
                        style={{backgroundColor: 'white', color: 'black'}}
                        previewOptions={{className: 'bg-white', style: {color: 'black'}}}
                    />
                </div>
            </div>
        </>
    )
}