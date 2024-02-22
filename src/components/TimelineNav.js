"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "../app/axios";
import { useStore } from "@/app/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CallModal from "./CallModal";
import PersonIcon from "@mui/icons-material/Person";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AddIcon from "@mui/icons-material/Add";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
// import { stories } from "./stories";

export default function TimelineNav() {
	const router = useRouter();
	const {
		email,
		isLoggedIn,
		logout,
		currentStory,
		setCurrentStory,
		darkMode,
		toggleDarkMode,
	} = useStore();

	const [stories, setStories] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState({
		addStoryModal: "false",
	});
	const [modalType, setModalType] = useState("");

	// const [timelineActive, setTimelineActive] = useState(true);
	// const [charactersActive, setCharactersActive] = useState(false);
	// const [placesActive, setPlacesActive] = useState(false);

	useEffect(() => {
		async function getStories() {
			try {
				const res = await axios.get("v1/stories", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"authToken"
						)}`,
					},
				});
				if (res) {
					setStories(res.data.stories);
					setCurrentStory(
						currentStory === "" ? res.data.stories[0] : currentStory
					);
				}
			} catch (err) {
				toast.error("Error Fetching Stories");
				console.log(err?.response?.data?.detail);
			}
		}
		if (isLoggedIn) {
			getStories();
		}
	}, [isLoggedIn]);

	const closeModal = () => {
		setIsModalOpen({
			addStoryModal: "false",
		});
		setModalType("");
	};

	return (
		<>
			<div className="flex bg-[#DEE4F7] py-2 px-5 justify-between  dark:bg-[#3b435e]">
				<div className="flex gap-4">
					<button
						className="bg-white font-semibold text-3xl text-black p-1 w-fit h-fit rounded-sm hover:scale-105"
						onClick={() => {
							setIsModalOpen({
								addStoryModal: "true",
							}),
								setModalType("addStory");
						}}
					>
						<AddIcon />
					</button>
					<select
						className="py-1 px-5  bg-white rounded text-sm appearance-none cursor-pointer outline-none hover:scale-105 after:content-none after:path"
						value={currentStory?.title}
						// onChange={(e) => {
						// 	let foundStory = stories.find(
						// 		(story) => story.name === e.target.value
						// 	);
						// 	// setCurrentStory(foundStory.id);
						// 	console.log(foundStory);
						// }}
					>
						<ListStories />
					</select>
					{/* <div className="flex justify-center items-center gap-3">
						<button
							className={
								timelineActive === true
									? "bg-white py-1 px-2 rounded text-sm"
									: "py-1 px-2 font-medium text-sm dark:text-white"
							}
							onClick={() => (
								setTimelineActive(true),
								setCharactersActive(false),
								setPlacesActive(false)
							)}
						>
							Timeline
						</button>
						// TODO: add characters and places feature or any other feature
						<button
							className={
								charactersActive === true
									? "bg-white py-1 px-2 rounded text-sm"
									: "py-1 px-2 font-medium text-sm dark:text-white"
							}
							onClick={() => (
								setTimelineActive(false),
								setCharactersActive(true),
								setPlacesActive(false)
							)}
						>
							Characters
						</button>
						<button
							className={
								placesActive === true
									? "bg-white py-1 px-2 rounded text-sm"
									: "py-1 px-2 font-medium text-sm dark:text-white"
							}
							onClick={() => (
								setTimelineActive(false),
								setCharactersActive(false),
								setPlacesActive(true)
							)}
						>
							Places
						</button>
					</div> */}
				</div>
				<div className="flex gap-4 items-center justify-center">
					{/* // TODO: add filtering */}
					{/* <button className="flex items-center justify-center bg-white py-1 px-2 rounded">
						<FilterAltIcon />
						Filter
					</button> */}
					{darkMode === false ? (
						<DarkModeIcon
							onClick={toggleDarkMode}
							className="hover:cursor-pointer"
						/>
					) : (
						<LightModeIcon
							onClick={toggleDarkMode}
							className="hover:cursor-pointer dark:text-white"
						/>
					)}
					{isLoggedIn ? (
						<div className="dropdown relative">
							<PersonIcon
								fontSize="large"
								className="hover:cursor-pointer dark:text-white"
							/>
							<div className="dropdowncontent hidden absolute right-0 bg-[#adbbe8] dark:bg-slate-600 p-2 shadow-md shadow-[rgba(0, 0, 0, 0.2)] dark:shadow-[#898c8e] rounded-md">
								<span className="text-gray-400 italic">
									User:{" "}
								</span>{" "}
								<span className=" text-black border p-1 rounded border-gray-400 mb-2">
									{email}
								</span>
								<button
									onClick={() => {
										logout(),
											toast.success("Logged out"),
											router.push("/");
									}}
									className="my-3 border border-black py-1 px-4 rounded"
								>
									Logout
								</button>
							</div>
						</div>
					) : null}
					<Link href="/">
						<CloseTwoToneIcon color="disabled" fontSize="small" />
					</Link>
				</div>
			</div>
			<CallModal
				setStories={setStories}
				modal={modalType}
				areOpen={isModalOpen}
				onClose={closeModal}
			/>
		</>
	);

	function ListStories() {
		return stories.map((story) => {
			return (
				<option
					key={story.id}
					value={story.title}
					onClick={() => {
						setCurrentStory(story);
					}}
				>
					{story.title}
				</option>
			);
		});
	}
}
