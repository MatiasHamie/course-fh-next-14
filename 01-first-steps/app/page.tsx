import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-24">
      <span className="text-5xl">hola mundo</span>
      <Link href="/about">About Page</Link>
    </main>
  );
}
