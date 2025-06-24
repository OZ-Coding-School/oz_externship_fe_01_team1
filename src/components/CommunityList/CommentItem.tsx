
interface CommentProps {
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
  taggedUsers?: string[];
}

export default function CommentItem({ author, avatar, content, createdAt, taggedUsers = [] }: CommentProps) {
  const highlightTags = (text: string) => {
    return text.split(/(\s+)/).map((word, idx) => {
      if (taggedUsers.includes(word.replace(/^@/, ''))) {
        return (
          <span key={idx} className="text-blue-400 font-semibold">
            {word}
          </span>
        );
      }
      return word;
    });
  };

  return (
    <div className="flex space-x-3 py-2">
      <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
      <div className="text-white text-sm">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{author}</span>
          <span className="text-gray-400 text-xs">{createdAt}</span>
        </div>
        <div className="mt-1 text-gray-300 break-words">
          {highlightTags(content)}
        </div>
      </div>
    </div>
  );
}
