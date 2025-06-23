export default function ({text}: { text: string }) {
    return (
        <>
            <div className="max-w-5xl mx-auto mt-10">
                <div className="mt-6 text-right">
                    <button
                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-md shadow-sm transition">
                        {text}
                    </button>
                </div>
            </div>
        </>
    )
}