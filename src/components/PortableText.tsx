import { PortableText as PortableTextComponent } from "@portabletext/react";

interface PortableTextProps {
  content: any;
  className?: string;
}

export default function PortableText({
  content,
  className = "",
}: PortableTextProps) {
  if (!content) return null;

  return (
    <div className={className}>
      <PortableTextComponent
        value={content}
        components={{
          block: {
            normal: ({ children }) => (
              <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
            ),
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mb-6 text-gray-900">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg font-semibold mb-2 text-gray-900">
                {children}
              </h4>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-red-600 pl-4 italic text-gray-600 mb-4">
                {children}
              </blockquote>
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
          listItem: ({ children }) => (
            <li className="text-gray-700">{children}</li>
          ),
          marks: {
            link: ({ value, children }) => {
              const target = (value?.href || "").startsWith("http")
                ? "_blank"
                : undefined;
              return (
                <a
                  href={value?.href}
                  target={target}
                  rel={target === "_blank" ? "noopener noreferrer" : undefined}
                  className="text-red-600 hover:text-red-700 underline"
                >
                  {children}
                </a>
              );
            },
            strong: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            ),
          },
        }}
      />
    </div>
  );
}
