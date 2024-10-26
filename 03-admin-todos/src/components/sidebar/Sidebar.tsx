import Image from "next/image";

import { SidebarItem } from "./SidebarItem";
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogoutButton } from "./LogoutButton";

const SIDEBAR_ITEMS = [
  {
    path: "/dashboard",
    icon: <IoCalendarOutline size={30} />,
    title: "Dashboard",
  },
  {
    path: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline size={30} />,
    title: "Rest TODOS",
  },
  {
    path: "/dashboard/server-todos",
    icon: <IoListOutline size={30} />,
    title: "Server Actions",
  },
  {
    path: "/dashboard/cookies",
    icon: <IoCodeWorkingOutline size={30} />,
    title: "Cookies",
  },
  {
    path: "/dashboard/products",
    icon: <IoBasketOutline size={30} />,
    title: "Products",
  },
  {
    path: "/dashboard/profile",
    icon: <IoPersonOutline size={30} />,
    title: "Perfil del usuario",
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/api/auth/signin");
  }

  const userName = session.user?.name;
  const userRoles = session.user?.roles ?? ["client"];
  const avatarUrl =
    session.user?.image ??
    "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          {/* TODO: Next/Link hacia dashboard */}
          <a href="/dashboard" title="home">
            {/* Next/Image */}
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              width={128}
              height={32}
              alt="tailus logo"
            />
          </a>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={avatarUrl}
            alt=""
            width={40}
            height={40}
            className="m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block">
            {userRoles.join(",")}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
