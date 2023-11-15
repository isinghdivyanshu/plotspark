"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Link from "next/link";

export default function Navbar() {
	const [isDark, setIsDark] = useState(
		localStorage.getItem("theme") === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
	);

	useEffect(() => {
		if (
			localStorage.getItem("theme") === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	});

	const pathName = usePathname();

	return (
		<div className="bg-white dark:bg-[#3b435e] flex px-28 justify-between items-center p-4  dark:text-white">
			<div className="flex gap-12 justify-between items-center">
				<span className="text-xl font-extrabold">Writer</span>
				<ul className="flex gap-12">
					<NavLinks />
				</ul>
			</div>
			<div className="flex gap-6 justify-between items-center">
				<SearchIcon className="hover:cursor-pointer" />
				<Link href="/login">
					<div className="bg-black dark:bg-white py-1 px-3 text-white dark:text-black text-sm rounded-md  ">
						Login
					</div>
				</Link>
				{isDark ? (
					<LightModeIcon
						onClick={handleLightTheme}
						className="hover:cursor-pointer dark:text-white"
					/>
				) : (
					<DarkModeIcon
						onClick={handleDarkTheme}
						className="hover:cursor-pointer"
					/>
				)}
			</div>
		</div>
	);

	function handleDarkTheme() {
		setIsDark(!isDark);
		localStorage.setItem("theme", "dark");
	}
	function handleLightTheme() {
		setIsDark(!isDark);
		localStorage.setItem("theme", "light");
	}

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
