import { create } from "zustand";

export const useStore = create((set) => ({
	isLoggedIn: false,
	email: "",
	token: "",
	darkMode: localStorage.darkMode === "true" ? true : false,
	toggleDarkMode: () => {
		localStorage.setItem(
			"darkMode",
			JSON.stringify(!useStore.getState().darkMode)
		);
		set((state) => ({ darkMode: !state.darkMode }));
	},
	login: (email, token) =>
		set({
			isLoggedIn: true,
			email: email,
			token: token,
		}),
	logout: () => {},
}));
