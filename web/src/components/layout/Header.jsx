import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-solid border-b-[#e7edf3] px-10 py-3">
      <div className="flex items-center gap-4 text-[#0e141b]">
        <Link href="/" className="flex items-center gap-4 text-[#0e141b] no-underline hover:opacity-80 text-decoration:none">

          <div className="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em]">PDF Tools</h2>
        </Link>
      </div>

      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          {/* Link dengan Tailwind CSS */}
          <Link
            href="/all-tools"
            className="text-[#0e141b] text-sm font-medium leading-normal no-underline hover:text-blue-500"
          >
            All Tools
          </Link>
        </div>


        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDLibIWG5OyiJusYaG7T_mmkI84YFYL3cEUgzMnjouX2WrKOzJH9yFXT7X4mSXyYGMMOF3o-CTIHFEhczOCgvQoFfLaHq_TfPjjZ4VBDtaQ38--kB4MrDSfNSKITcBoUsSeC9OYq0npwqLblk8uiyG0Fc1EOk2mTzGl1wKfVZrBQX7t8ukzH4LsAXaTdzb6sCqXuToCzwcUEpmGrMkkEMU8Jkyd7zqU2T2TfKQwH3boYwjdQDv8BN9xcyNLoeVvVrN_Z4JwmtdhtFE ")`,
          }}
        ></div>

      </div>
    </header>
  );
};

export default Header;