"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
	const router = useRouter();

	useEffect(() => {
		const auth = localStorage.getItem("token");
		if (!auth) {
			router.push("/");
		}

		if (!auth) {
			return;
		}
	});

	return children;
}
