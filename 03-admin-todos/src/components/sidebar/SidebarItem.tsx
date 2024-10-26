"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  path: string;
  icon: React.ReactNode;
  title: string;
}

export const SidebarItem = ({ path, icon, title }: SidebarItemProps) => {
  const pathName = usePathname();

  const isActive = pathName === path;

  return (
    <li>
      <Link
        href={path}
        className={`hover:bg-gradient-to-r hover:text-white hover:bg-sky-600 relative px-4 py-3 text-gray-600 flex items-center space-x-4 rounded-xl  ${
          isActive && "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
        }`}
      >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
};
