import Link from "next/link";

const HeroSection = () => {
  return (
    <div
      className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-center justify-center p-4"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBcJ_rzE8bWh1jfWNjdV2PVMqVLIYt6qqLOSOKy0EZ6nY-Jo7FX9u2uqR1Xz0ThmTsPi3J8zlPjOK5NHz2Rp_xJ2_9_eOUqjOz_e5y_3MI8yZyDR7z-keqvUpc6tNafdgn_gLMyfIYQPwP-P7ZqoDNpatuGzX7bxfIodbeyUlXsPGBdk_XtoxlTqlM4UmgeysqkhUr7EulxiBs_YgCy9wcUdyV5DBqO8wEX08q2ID9JlUGIe5Ww7U25X6D0MToRpyJBch3z1ZoEBuM ")',
      }}
    >
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
          Your All-in-One PDF Solution
        </h1>
        <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
          Effortlessly manage your PDFs with our comprehensive suite of tools. Compress, convert, merge, and more, all in one place.
        </h2>
      </div>
      <Link href="/all-tools">
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#1978e5] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
        >
          <span className="truncate">Explore Tools</span>
        </button>
      </Link>
    </div>
  );
};

export default HeroSection;