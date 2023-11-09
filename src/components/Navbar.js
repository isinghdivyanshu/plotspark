"use client";

import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Link from "next/link";

export default function Navbar({ children }) {
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

	return (
		<div className="bg-white dark:bg-[#444444] flex px-28 justify-between items-center p-4  dark:text-white">
			<div className="flex gap-12 justify-between">
				<span className="font-extrabold">Writer</span>
				<ul className="flex gap-12">
					<li>Home</li>
					<li>Features</li>
					<li>Contact</li>
				</ul>
			</div>
			<div className="flex gap-6 justify-between">
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
			{children}
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
}
