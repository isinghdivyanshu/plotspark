"use client";

import { useEffect } from "react";
import { useStore } from "@/app/store";
import { useRouter } from "next/navigation";

export default function AuthProvider({ children }) {
	const router = useRouter();
	const { logout, initializeFromLocalStorage } = useStore();

	useEffect(() => {
		const expiry = localStorage.getItem("expiry");
		const tokenExpiry = new Date(expiry);
		const logoutTimer = setTimeout(() => {
			logout();
			router.replace("/login");
		}, tokenExpiry.getTime() - new Date().getTime());

		return () => clearTimeout(logoutTimer);
	}, []);

	useEffect(() => {
		initializeFromLocalStorage();
	}, [initializeFromLocalStorage]);

	return <>{children}</>;
}
