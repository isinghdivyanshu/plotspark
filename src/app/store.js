import { create } from "zustand";

export const useStore = create((set) => ({
	email: "",
	token: "",
	isLoggedIn: false,
	login: (email, token) => {
		set({
			isLoggedIn: true,
			email: email,
			token: token,
		});
	},
	logout: () => {
		set({
			isLoggedIn: false,
			email: "",
			token: "",
			currentStory: "",
		});

		localStorage.removeItem("userEmail");
		localStorage.removeItem("authToken");
		localStorage.removeItem("currentStory");
	},

	darkMode: true,
	toggleDarkMode: () => {
		localStorage.setItem(
			"darkMode",
			JSON.stringify(!useStore.getState().darkMode)
		);
		set((state) => ({ darkMode: !state.darkMode }));
	},

	currentStory:
		typeof window !== "undefined" &&
		window.localStorage &&
		localStorage.getItem("currentStory")
			? JSON.parse(localStorage.getItem("currentStory"))
			: "",
	setCurrentStory: (storyObject) => {
		localStorage.setItem("currentStory", JSON.stringify(storyObject));
		set({
			currentStory: storyObject,
		});
	},

	initializeFromLocalStorage: () => {
		const userEmail = localStorage.getItem("userEmail");
		const authToken = localStorage.getItem("authToken");
		if (userEmail && authToken) {
			set({
				isLoggedIn: true,
				email: userEmail,
				token: authToken,
			});
		}

		const currentStory = JSON.parse(localStorage.getItem("currentStory"));
		if (currentStory) {
			set({ currentStory: currentStory });
		}
	},
}));
