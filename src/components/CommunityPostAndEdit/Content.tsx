import MDEditor from '@uiw/react-md-editor';

interface Props {
    markdown: string;
    setMarkdown: (val: string) => void;
}

export default function Content({ markdown, setMarkdown }: Props) {
    return (
        <div className="max-w-5xl mx-auto bg-white   rounded-xl border border-gray-200 mt-10 gap-10">
            <div className="bg-white rotate-md" data-color-mode="light">
            <MDEditor
                value={markdown}
                onChange={(val = '') => setMarkdown(val)}
                height={400}
                preview="live"
                style={{ backgroundColor: 'white', color: 'black' }}
                previewOptions={{
                    className: 'bg-white text-black',
                    style: { backgroundColor: 'white', color: 'black' }
                }}
            />
            </div>
        </div>
    );
}