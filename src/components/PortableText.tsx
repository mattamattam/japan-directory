import { PortableText as PortableTextComponent } from "@portabletext/react";

interface PortableTextProps {
  content: any;
  className?: string;
}

export default function PortableText({
  content,
  className = "",
}: PortableTextProps) {
  if (!content) {
    return null;
  }

  return (
    <div className={className}>
      <PortableTextComponent
        value={content}
        components={{
          block: {
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mb-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold mb-3">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold mb-2">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg font-semibold mb-2">{children}</h4>
            ),
            normal: ({ children }) => (
              <p className="mb-4 text-gray-600 leading-relaxed">{children}</p>
            ),
          },
          list: {
            bullet: ({ children }) => (
              <ul className="list-disc list-inside mb-4 space-y-1">
                {children}
              </ul>
            ),
            number: ({ children }) => (
              <ol className="list-decimal list-inside mb-4 space-y-1">
                {children}
              </ol>
            ),
          },
          listItem: {
            bullet: ({ children }) => (
              <li className="text-gray-600">{children}</li>
            ),
            number: ({ children }) => (
              <li className="text-gray-600">{children}</li>
            ),
          },
          marks: {
            strong: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
                {children}
              </code>
            ),
          },
        }}
      />
    </div>
  );
}
