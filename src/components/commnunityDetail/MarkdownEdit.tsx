import type { DetailData } from '@customType/communityDetail'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownEdit({
  detailData,
}: {
  detailData: DetailData
}) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => {
            const src = props.src || ''
            const match = src.match(/^image(\d+)/)
            if (match) {
              const index = parseInt(match[1], 10) - 1
              const actualSrc = detailData.images?.[index].image_url
              if (actualSrc) {
                return (
                  <img {...props} src={actualSrc} alt={props.alt || 'image'} />
                )
              } else {
                return null
              }
            }
            return <img {...props} alt={props.alt || 'image'} />
          },
        }}
      >
        {detailData.content}
      </ReactMarkdown>
    </div>
  )
}
