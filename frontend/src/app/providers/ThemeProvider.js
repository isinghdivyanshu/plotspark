"use client";

import { useEffect } from "react";
import { useStore } from "@/app/store";

export default function ThemeProvider({ children }) {
	const { darkMode } = useStore();

	useEffect(() => {
		if (localStorage.darkMode === "true") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	return <>{children}</>;
}
