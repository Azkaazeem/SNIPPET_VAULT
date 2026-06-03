function highlightLine(line) {
  const parts = line.split(/(<\/?[\w-]+|class=|viewBox=|fill=|xmlns=|href=|#[a-fA-F0-9]{3,8}|--[\w-]+|@[a-zA-Z-]+|\bfrom\b|\bto\b|\bopacity\b|\btransform\b)/g);

  return parts.map((part, index) => {
    if (!part) return null;
    let className = 'text-gray-300';

    if (/^<\/?[\w-]+$/.test(part) || part === 'class=' || part === 'href=') {
      className = 'text-red-500';
    } else if (/^#|^--|^@/.test(part)) {
      className = 'text-red-500';
    } else if (/viewBox=|fill=|xmlns=/.test(part)) {
      className = 'text-sky-300';
    } else if (/from|to|opacity|transform/.test(part)) {
      className = 'text-cyan-300';
    } else if (part.includes('"')) {
      className = 'text-gray-300';
    }

    return (
      <span key={`${part}-${index}`} className={className}>
        {part}
      </span>
    );
  });
}

export default function CodeBlock({ code, className = '', numbered = false }) {
  const lines = code.split('\n');

  return (
    <pre className={`code-scroll font-mono text-[14px] leading-[1.45] ${className}`}>
      {lines.map((line, index) => (
        <div key={`${line}-${index}`} className="flex min-h-[20px]">
          {numbered && (
            <span className="mr-7 w-6 shrink-0 select-none text-right text-gray-500">
              {index + 1}
            </span>
          )}
          <code className="whitespace-pre-wrap">{highlightLine(line)}</code>
        </div>
      ))}
    </pre>
  );
}
