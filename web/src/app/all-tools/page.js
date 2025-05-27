import Header from "@/components/layout/Header";
import AllTools from "@/components/AllTools";

export const metadata = {
  title: "All PDF Tools",
};

export default function AllToolsPage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden font-['Work Sans','Noto Sans',sans-serif]">
      <Header />
      <div className="layout-container flex h-full grow flex-col">
        <AllTools />
      </div>
    </div>
  );
}