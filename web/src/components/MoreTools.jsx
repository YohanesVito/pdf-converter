// components/MoreTools.jsx
const MoreTools = () => {
  const tools = [
    { icon: "File", title: "Protect PDF", description: "Password protect your PDF files" },
    { icon: "File", title: "Unlock PDF", description: "Remove passwords from protected PDFs" },
    { icon: "File", title: "Rotate PDF", description: "Rotate PDF pages clockwise or counterclockwise" },
    { icon: "File", title: "Delete Pages", description: "Remove unwanted pages from your PDF" },
    { icon: "File", title: "Extract Images", description: "Extract all images from a PDF file" },
    { icon: "File", title: "Organize PDF", description: "Reorder, add, or delete pages in your PDF" },
  ];

  return (
    <div>
      <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        More Tools
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {tools.map((tool, index) => (
          <div key={index} className="flex flex-1 gap-3 rounded-lg border border-[#d0dbe7] bg-slate-50 p-4 flex-col">
            <div className="text-[#0e141b]" data-icon={tool.icon} data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"
                ></path>
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-[#0e141b] text-base font-bold leading-tight">{tool.title}</h2>
              <p className="text-[#4e7097] text-sm font-normal leading-normal">{tool.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreTools;