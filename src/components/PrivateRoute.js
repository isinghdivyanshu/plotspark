"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "@/app/store";
import { toast } from "react-toastify";

export default function PrivateRoute(Component) {
	return function IsAuth(props) {
		const { isLoggedIn } = useStore();
		useEffect(() => {
			const auth = localStorage.getItem("authToken");
			const email = localStorage.getItem("userEmail");
			if (!auth || !email) {
				toast.error("Login to view your Stories");
				redirect("/");
			}
		}, [isLoggedIn]);

		if (!isLoggedIn) {
			return null;
		}

		return <Component {...props} />;
	};
}
