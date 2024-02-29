import { create } from "zustand";

export const useStore = create((set) => ({
	email: "",
	setEmail: (email) => {
		localStorage.setItem("userEmail", email);
		set({ email: email });
	},

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
		localStorage.setItem("currentStory", "");
	},

	darkMode: true,
	toggleDarkMode: () => {
		localStorage.setItem(
			"darkMode",
			JSON.stringify(!useStore.getState().darkMode)
		);
		set((state) => ({ darkMode: !state.darkMode }));
	},

	currentStory: "",
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
		if (userEmail) {
			set({ email: userEmail });
		}

		const currentStory = localStorage.getItem("currentStory");
		if (currentStory !== "undefined" && currentStory !== "") {
			set({ currentStory: JSON.parse(currentStory) });
		} else {
			localStorage.setItem("currentStory", "");
		}

		const darkMode = localStorage.getItem("darkMode");
		if (darkMode) {
			set({ darkMode: JSON.parse(darkMode) });
		} else {
			localStorage.setItem("darkMode", true);
		}
	},
}));
