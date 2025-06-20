export default function EditorPreview({ html }: { html: string }) {
    return (
        <div className="p-4 bg-gray-50 text-gray-700 min-h-[400px]">
            {html.trim() ? (
                    <div dangerouslySetInnerHTML={{ __html: html }} />
) : (
        <p className="text-sm text-gray-400">마크업으로 표시됩니다.</p>
)}
    </div>
);
}