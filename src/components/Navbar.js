"use client";

import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/app/store";
import { toast } from "react-toastify";
// import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Link from "next/link";

export default function Navbar() {
	const { email, isLoggedIn, logout, darkMode, toggleDarkMode } = useStore();

	const router = useRouter();
	const pathName = usePathname();

	return (
		<div className="bg-[#FFEAE2] dark:bg-[#3b435e] flex px-7 py-4  md:px-28 justify-between items-center  dark:text-white">
			<div className="flex gap-12 justify-between items-center">
				<span className="text-xl font-extrabold">Writer</span>
				<ul className="flex gap-12">
					<NavLinks />
				</ul>
			</div>
			<div className="flex gap-6 justify-between items-center">
				{/* // TODO: add searching */}
				{/* <SearchIcon className="hover:cursor-pointer" /> */}
				{darkMode === false ? (
					<DarkModeIcon
						onClick={toggleDarkMode}
						className="hover:cursor-pointer"
					/>
				) : (
					<LightModeIcon
						onClick={toggleDarkMode}
						className="hover:cursor-pointer"
					/>
				)}
				{isLoggedIn ? (
					<div className="dropdown relative">
						<PersonIcon
							fontSize="large"
							className="hover:cursor-pointer dark:text-white"
						/>
						<div className="dropdown-content hidden absolute -right-[25%] -bottom-[550%] rounded-md border border-[#0c1f5f] divide-y-2 divide-[#0c1f5f] bg-[#FFEAE2] dark:bg-[#3b435e] dark:border-[#a0b3f3] dark:divide-[#a0b3f3]">
							<div className="w-full py-3">
								<span className="text-gray-400 py-2 px-4">
									User:{" "}
								</span>{" "}
								<span className=" rounded italic py-2 px-4">
									{email}
								</span>
							</div>
							<div className="w-full flex flex-col gap-3 px-5 text-center py-3">
								<button className="border border-[#0c1f5f] py-2 px-4 rounded dark:border-[#a0b3f3] whitespace-nowrap">
									Reset Password
								</button>
								<button
									onClick={() => {
										logout(),
											toast.success("Logged out"),
											router.push("/");
									}}
									className="border border-[#0c1f5f] py-2 px-4 rounded dark:border-[#a0b3f3]"
								>
									Logout
								</button>
							</div>
						</div>
					</div>
				) : (
					<Link href="/login">
						<div className="bg-black dark:bg-white py-1 px-3 text-white dark:text-black text-sm rounded-md  ">
							Login
						</div>
					</Link>
				)}
			</div>
		</div>
	);

	function NavLinks() {
		const links = [
			{ name: "Home", path: "/" },
			// { name: "Features", path: "/features" },
			// { name: "Contact", path: "/contact" },
		];
		return (
			<>
				{links.map((link) => {
					return (
						<Link href={link.path} key={link.name}>
							<li>
								{pathName === link.path ? (
									<div className="flex w-fit flex-col items-center justify-center font-semibold">
										{link.name}
										<span className="w-[107%] rounded-xl bg-black dark:bg-white h-[3px]"></span>
									</div>
								) : (
									link.name
								)}
							</li>
						</Link>
					);
				})}
			</>
		);
	}
}
