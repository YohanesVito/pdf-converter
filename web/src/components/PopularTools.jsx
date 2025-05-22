// // components/PopularTools.jsx
// import Link from "next/link";

// const PopularTools = () => {
//   return (
//     <div>
//       <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
//         Popular Tools
//       </h2>
//       <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        

//         //merge pdf
//         <Link href="/merge-pdf" className="flex flex-1 gap-3 rounded-lg border border-[#d0dbe7] bg-slate-50 p-4 flex-col">
//           <div className="text-[#0e141b]" data-icon="File" data-size="24px" data-weight="regular">
//             <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
//               <path
//                 d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"
//               ></path>
//             </svg>
//           </div>
//           <div className="flex flex-col gap-1">
//             <h2 className="text-[#0e141b] text-base font-bold leading-tight">Merge PDF</h2>
//             <p className="text-[#4e7097] text-sm font-normal leading-normal">Reduce file size without losing quality</p>
//           </div>
//         </Link>
//         {/* Tambahkan alat populer lainnya di sini */}
//       </div>
//     </div>
//   );
// };

// export default PopularTools;



// components/PopularTools.jsx
import Link from "next/link";

const PopularTools = () => {
  const tools = [
    {
      icon: "File",
      title: "Compress PDF",
      description: "Reduce file size without losing quality",
      href: "/compress-pdf",
    },
    {
      icon: "FileImage",
      title: "PDF to Image",
      description: "Convert PDF pages to images",
      href: "/pdf-to-image",
    },
    {
      icon: "FilePdf",
      title: "PDF to Word",
      description: "Convert PDF to editable Word documents",
      href: "/pdf-to-word",
    },
    {
      icon: "File",
      title: "Merge PDF",
      description: "Combine multiple PDFs into one",
      href: "/merge-pdf",
    },
    {
      icon: "File",
      title: "Split PDF",
      description: "Extract specific pages from a PDF",
      href: "/split-pdf",
    },
    {
      icon: "File",
      title: "Edit PDF",
      description: "Add or edit text, images, and more",
      href: "/edit-pdf",
    },
  ];

  return (
    <div>
      <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Popular Tools
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {tools.map((tool, index) => (
          <Link key={index} href={tool.href} className="flex flex-1 gap-3 rounded-lg border border-[#d0dbe7] bg-slate-50 p-4 flex-col">
            <div className="text-[#0e141b]" data-icon={tool.icon} data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                {tool.icon === "FileImage" && (
                  <path
                    d="M110.66,147.56a8,8,0,0,0-13.32,0L76.49,178.85l-9.76-15.18a8,8,0,0,0-13.46,0l-36,56A8,8,0,0,0,24,232H152a8,8,0,0,0,6.66-12.44ZM38.65,216,60,182.79l9.63,15a8,8,0,0,0,13.39.11l21-31.47L137.05,216Zm175-133.66-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40v96a8,8,0,0,0,16,0V40h88V88a8,8,0,0,0,8,8h48V216h-8a8,8,0,0,0,0,16h8a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160Z"
                  ></path>
                )}
                {tool.icon === "FilePdf" && (
                  <path
                    d="M224,152a8,8,0,0,1-8,8H192v16h16a8,8,0,0,1,0,16H192v16a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152ZM92,172a28,28,0,0,1-28,28H56v8a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8H64A28,28,0,0,1,92,172Zm-16,0a12,12,0,0,0-12-12H56v24h8A12,12,0,0,0,76,172Zm88,8a36,36,0,0,1-36,36H112a8,8,0,0,1-8-8V152a8,8,0,0,1,8-8h16A36,36,0,0,1,164,180Zm-16,0a20,20,0,0,0-20-20h-8v40h8A20,20,0,0,0,148,180ZM40,112V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0ZM160,80h28.69L160,51.31Z"
                  ></path>
                )}
                {tool.icon === "File" && (
                  <path
                    d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"
                  ></path>
                )}
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-[#0e141b] text-base font-bold leading-tight">{tool.title}</h2>
              <p className="text-[#4e7097] text-sm font-normal leading-normal">{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTools;