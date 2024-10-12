import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-[#FF6A3D] text-sm rounded rotate-12 absolute">
        Pokemon no encontrado
      </div>
      <button className="mt-5">
        <Link
          href="/dashboard"
          className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
        >
          Go Home
        </Link>
      </button>
    </main>
  );
}
