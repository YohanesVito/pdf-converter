import Header from "@/components/layout/Header";
import MergePDF from "@/components/MergePDF";

export const metadata = {
  title: "Merge PDF - PDF Tools",
};

export default function MergePDFPage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden font-['Work Sans','Noto Sans',sans-serif]">
      <Header />
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <MergePDF />
          </div>
        </div>
      </div>
    </div>
  );
}