"use client";

import { usePathname } from "next/navigation";
import { useStore } from "@/app/store";
// import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Link from "next/link";

export default function Navbar() {
	const { isLoggedIn, darkMode, toggleDarkMode } = useStore();

	const pathName = usePathname();

	return (
		<div className="bg-[#FFEAE2] dark:bg-[#3b435e] flex px-28 justify-between items-center p-4  dark:text-white">
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
					<PersonIcon
						fontSize="large"
						className="hover:cursor-pointer"
					/>
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
			{ name: "Features", path: "/features" },
			{ name: "Contact", path: "/contact" },
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
