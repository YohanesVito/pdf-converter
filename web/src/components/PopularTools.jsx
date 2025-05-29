// components/PopularTools.jsx
import Link from "next/link";

const PopularTools = () => {
  const tools = [
    {
      icon: "File",
      title: "Compress PDF",
      description: "Reduce file size without losing quality",
      href: "/compress-pdf",
      disabled: true,
    },
    {
      icon: "FileImage",
      title: "Image to PDF",
      description: "Convert images to PDF pages or PDF to images",
      href: "/image-to-pdf",
    },
    {
      icon: "FilePdf",
      title: "Word to PDF",
      description: "Convert word documents to PDF or PDF to Word",
      href: "/word-to-pdf",
      disabled: true,
    },
    {
      icon: "File",
      title: "Merge PDF",
      description: "Combine multiple PDFs into one",
      href: "/merge-pdf",
      disabled: true,
    },
    // {
    //   icon: "File",
    //   title: "Split PDF",
    //   description: "Extract specific pages from a PDF",
    //   href: "/split-pdf",
    // },
    // {
    //   icon: "File",
    //   title: "Edit PDF",
    //   description: "Add or edit text, images, and more",
    //   href: "/edit-pdf",
    // },
  ];

  return (
    <div>
      <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Popular Tools
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {tools.map((tool, index) => {
          const ToolCard = (
            <div
              className={`flex flex-1 gap-3 rounded-lg border p-4 flex-col transition ${tool.disabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed relative overflow-hidden"
                  : "bg-slate-50 border-[#d0dbe7] hover:shadow-md hover:cursor-pointer"
                }`}
            >
              <div
                className={`text-[#0e141b] ${tool.disabled ? "opacity-30" : ""}`}
                data-icon={tool.icon}
                data-size="24px"
                data-weight="regular"
              >
                {/* SVG as is */}
              </div>
              <div className="flex flex-col gap-1">
                <h2 className={`text-base font-bold leading-tight ${tool.disabled ? "text-gray-400" : "text-[#0e141b]"}`}>
                  {tool.title}
                </h2>
                <p className={`text-sm font-normal leading-normal ${tool.disabled ? "text-gray-300" : "text-[#4e7097]"}`}>
                  {tool.description}
                </p>
              </div>
              {tool.disabled && (
                <div className="absolute top-2 right-2 bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-1 rounded">
                  🔒 On Development
                </div>
              )}
            </div>
          );

          return tool.disabled ? (
            <div key={index}>{ToolCard}</div>
          ) : (
            <Link key={index} href={tool.href}>
              {ToolCard}
            </Link>
          );
        })}

      </div>
    </div>
  );
};

export default PopularTools;