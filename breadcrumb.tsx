import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

const POPULAR_SKILLS = [
  // Programming
  "Python",
  "JavaScript",
  "TypeScript",
  "Rust",
  "Go (Golang)",
  "Java",
  "C++",
  "C#",
  "Swift",
  "Kotlin",
  "PHP",
  "Ruby",
  "Scala",
  // Web
  "Web Development",
  "React",
  "Vue.js",
  "Angular",
  "Next.js",
  "Node.js",
  "HTML & CSS",
  "Tailwind CSS",
  "GraphQL",
  "REST API Design",
  // Mobile
  "React Native",
  "Flutter",
  "iOS Development",
  "Android Development",
  // Data & AI
  "Machine Learning",
  "Deep Learning",
  "Data Science",
  "Data Analysis",
  "Artificial Intelligence",
  "Natural Language Processing",
  "Computer Vision",
  "PyTorch",
  "TensorFlow",
  "SQL",
  "Data Engineering",
  // Cloud & DevOps
  "Cloud Computing (AWS)",
  "Google Cloud Platform",
  "Azure",
  "Docker",
  "Kubernetes",
  "DevOps",
  "CI/CD Pipelines",
  "Linux Administration",
  "Networking Fundamentals",
  // Design
  "UI Design",
  "UX Design",
  "Product Design",
  "Figma",
  "Graphic Design",
  "Motion Design",
  "3D Modeling (Blender)",
  // Business & Other
  "Digital Marketing",
  "SEO",
  "Copywriting",
  "Content Marketing",
  "Project Management",
  "Product Management",
  "Public Speaking",
  "Excel & Data Visualization",
  "Cybersecurity",
  "Blockchain Development",
  "Game Development (Unity)",
  "Unreal Engine",
];

interface SkillAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  "data-testid"?: string;
}

export function SkillAutocomplete({
  value,
  onChange,
  placeholder = "e.g. React Native, Machine Learning, Japanese...",
  className,
  "data-testid": testId,
}: SkillAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = value.trim()
    ? POPULAR_SKILLS.filter((s) =>
        s.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8)
    : POPULAR_SKILLS.slice(0, 8);

  const showDropdown = open && filtered.length > 0;

  const select = useCallback(
    (skill: string) => {
      onChange(skill);
      setOpen(false);
      setHighlighted(-1);
      inputRef.current?.blur();
    },
    [onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) {
      if (e.key === "ArrowDown") {
        setOpen(true);
        setHighlighted(0);
        e.preventDefault();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlighted((h) => Math.max(h - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter" && highlighted >= 0) {
      select(filtered[highlighted]);
      e.preventDefault();
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlighted(-1);
    }
  };

  useEffect(() => {
    if (highlighted >= 0 && listRef.current) {
      const item = listRef.current.children[highlighted] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlighted]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
            setHighlighted(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          data-testid={testId}
          className={cn(
            "flex h-14 w-full rounded-md border border-input bg-background px-4 py-2 text-lg ring-offset-background",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "pl-12 pr-10",
            className
          )}
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(true);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
            tabIndex={-1}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <ul
          ref={listRef}
          className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-popover shadow-xl overflow-auto max-h-64 py-1"
          role="listbox"
        >
          {filtered.map((skill, i) => (
            <li
              key={skill}
              role="option"
              aria-selected={i === highlighted}
              onMouseDown={(e) => {
                e.preventDefault();
                select(skill);
              }}
              onMouseEnter={() => setHighlighted(i)}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm transition-colors",
                i === highlighted
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50 shrink-0" />
              <span className="font-medium">{skill}</span>
            </li>
          ))}
          {value.trim() && !POPULAR_SKILLS.some(
            (s) => s.toLowerCase() === value.toLowerCase()
          ) && (
            <li
              role="option"
              onMouseDown={(e) => {
                e.preventDefault();
                select(value.trim());
              }}
              onMouseEnter={() => setHighlighted(filtered.length)}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm border-t border-border transition-colors mt-1 pt-2",
                highlighted === filtered.length
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Search className="w-3.5 h-3.5 shrink-0 opacity-60" />
              <span>Learn &ldquo;<strong className="text-foreground">{value.trim()}</strong>&rdquo;</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
