// components/MoreTools.jsx
import Link from "next/link";

const MoreTools = () => {
  const tools = [
    {
      icon: "File",
      title: "Protect PDF",
      description: "Password protect your PDF files",
      href: "/protect-pdf",
      disabled: true,
    },
    {
      icon: "File",
      title: "Unlock PDF",
      description: "Remove passwords from protected PDFs",
      href: "/unlock-pdf",
      disabled: true,
    },
    {
      icon: "File",
      title: "Rotate PDF",
      description: "Rotate PDF pages to the desired orientation",
      href: "/rotate-pdf",
      disabled: true,
    },
    {
      icon: "File",
      title: "Delete Pages",
      description: "Remove unwanted pages from your PDF",
      href: "/delete-pages",
      disabled: true,
    },
    {
      icon: "File",
      title: "Extract Images",
      description: "Extract all images from a PDF file",
      href: "/extract-images",
      disabled: true,
    },
    {
      icon: "File",
      title: "Organize PDF",
      description: "Reorder, add, or delete pages in your PDF",
      href: "/organize-pdf",
      disabled: true,
    },
  ];

  return (
    <div>
      <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        More Tools
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {tools.map((tool, index) => {
          const ToolCard = (
            <div
              className={`flex flex-1 gap-3 rounded-lg border p-4 flex-col transition relative overflow-hidden ${
                tool.disabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-slate-50 border-[#d0dbe7] hover:shadow-md hover:cursor-pointer"
              }`}
            >
              <div
                className={`text-[#0e141b] ${tool.disabled ? "opacity-30" : ""}`}
                data-icon={tool.icon}
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z" />
                </svg>
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
                  🔒 Coming Soon
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

export default MoreTools;
