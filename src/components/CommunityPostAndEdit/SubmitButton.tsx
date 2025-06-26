interface Props {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function SubmitButton({text, onClick, disabled}: Props) {
    return (
        <footer>
            <div className="max-w-5xl mx-auto mt-6 text-right">
                <button
                    onClick={onClick}
                    disabled={disabled}
                    className={`px-6 py-2 rounded-md font-medium shadow-sm transition ${
                        disabled
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                >
                    {text}
                </button>
            </div>
        </footer>
    );
}