// components/AllTools.jsx
const AllTools = () => {
  const tools = {
    Organize: [
      { icon: "Files", title: "Merge PDF" },
      { icon: "Files", title: "Split PDF" },
      { icon: "Files", title: "Compress PDF" },
      { icon: "Files", title: "Rotate PDF" },
    ],
    Convert: [
      { icon: "Files", title: "PDF to Word" },
      { icon: "Files", title: "Word to PDF" },
      { icon: "Files", title: "PDF to Excel" },
      { icon: "Files", title: "Excel to PDF" },
    ],
    Edit: [
      { icon: "Files", title: "Edit PDF" },
      { icon: "Files", title: "Sign PDF" },
      { icon: "Files", title: "Protect PDF" },
      { icon: "Files", title: "Unlock PDF" },
    ],
  };

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Judul */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#0e141b] tracking-light text-[32px] font-bold leading-tight min-w-72">
            All PDF Tools
          </p>
        </div>

        {/* Kategori Tools */}
        {Object.entries(tools).map(([category, items]) => (
          <div key={category}>
            {/* Judul Kategori */}
            <h3 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              {category}
            </h3>

            {/* Daftar Alat */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {items.map((tool, index) => (
                <div
                  key={index}
                  className="flex flex-1 gap-3 rounded-lg border border-[#d0dbe7] bg-slate-50 p-4 items-center"
                >
                  {/* Ikon */}
                  <div className="text-[#0e141b]" data-icon={tool.icon} data-size="24px" data-weight="regular">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M213.66,66.34l-40-40A8,8,0,0,0,168,24H88A16,16,0,0,0,72,40V56H56A16,16,0,0,0,40,72V216a16,16,0,0,0,16,16H168a16,16,0,0,0,16-16V200h16a16,16,0,0,0,16-16V72A8,8,0,0,0,213.66,66.34ZM168,216H56V72h76.69L168,107.31v84.53c0,.06,0,.11,0,.16s0,.1,0,.16V216Zm32-32H184V104a8,8,0,0,0-2.34-5.66l-40-40A8,8,0,0,0,136,56H88V40h76.69L200,75.31Zm-56-32a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h48A8,8,0,0,1,144,152Zm0,32a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h48A8,8,0,0,1,144,184Z"
                      ></path>
                    </svg>
                  </div>

                  {/* Judul Alat */}
                  <h2 className="text-[#0e141b] text-base font-bold leading-tight">{tool.title}</h2>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTools;