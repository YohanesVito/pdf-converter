import Header from "@/components/layout/Header";
import ConvertImagePDF from "@/components/ConvertImagePDF";

export const metadata = {
  title: "Convert PDF",
};

export default function ConvertPDFPage() {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-gray-50 group/design-root overflow-x-hidden font-['Work Sans','Noto Sans',sans-serif]"
    >
      <Header />
      <div className="layout-container flex h-full grow flex-col">
        <ConvertImagePDF />
      </div>
    </div>
  );
}