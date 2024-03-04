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
	const [modalData, setModalData] = useState("");
	const [modalType, setModalType] = useState("");
	const [isModalOpen, setIsModalOpen] = useState({
		addStoryModal: "false",
		storyModal: "false",
		newPasswordModal: "false",
	});
	const [loading, setLoading] = useState("false");

	// const [timelineActive, setTimelineActive] = useState(true);
	// const [charactersActive, setCharactersActive] = useState(false);
	// const [placesActive, setPlacesActive] = useState(false);

	async function getStories() {
		setLoading("true");
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
				if (res.data.stories.length === 0) {
					setCurrentStory("");
					router.refresh();
				} else {
					setCurrentStory(
						currentStory === "" ? res.data.stories[0] : currentStory
					);
				}
				setLoading("false");
			}
		} catch (error) {
			toast.error("Error Fetching Stories");
			console.log(error.response?.data?.detail);
			setLoading("false");
		}
	}

	useEffect(() => {
		if (isLoggedIn && window.localStorage) {
			getStories();
		}
	}, [isLoggedIn, currentStory]);

	const closeModal = () => {
		setIsModalOpen({
			addStoryModal: "false",
			storyModal: "false",
			newPasswordModal: "false",
		});
		setModalType("");
	};

	return (
		<>
			<div className="flex bg-[#DEE4F7] py-2 px-5 justify-between  dark:bg-[#3b435e]">
				<div className="flex gap-4 justify-center items-center">
					<div className="dropdown relative">
						<button className="bg-white font-semibold text-3xl text-black w-8 h-9 rounded-sm">
							<AddIcon className="w-full aspect-square" />
						</button>
						<div className="dropdown-content hidden absolute -left-[25%] -bottom-[235%] rounded-md border border-[#3b435e] divide-y-2 divide-[#3b435e] bg-[#DEE4F7] dark:bg-[#3b435e] dark:border-white dark:divide-white">
							<button
								onClick={() => {
									if (stories.length === 0) {
										toast.error("Add a story to edit");
									} else {
										setIsModalOpen({
											...isModalOpen,
											storyModal: "true",
										}),
											setModalData({
												id: currentStory.id,
												title: currentStory.title,
												description:
													currentStory.description
														? currentStory.description
														: "",
											}),
											setModalType("story");
									}
								}}
								className="py-2 px-4 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 hover:underline"
								disabled={stories.length === 0}
							>
								Edit
							</button>
							<button
								onClick={() => {
									setIsModalOpen({
										...isModalOpen,
										addStoryModal: "true",
									}),
										setModalType("addStory");
								}}
								className="py-2 px-4 dark:text-white hover:underline"
							>
								New
							</button>
						</div>
					</div>
					<select
						style={{ maxWidth: "200px" }}
						className="py-1 px-5 h-9  bg-white rounded text-sm whitespace-nowrap text-center text-ellipsis overflow-hidden appearance-none cursor-pointer outline-none hover:scale-105 after:content-none after:path"
						value={
							stories.length === 0
								? "No Stories"
								: currentStory?.title
						}
						onChange={(e) => {
							setCurrentStory(
								stories.find(
									(story) => story.title === e.target.value
								)
							);
						}}
					>
						{stories.length === 0 ? (
							<option disabled value="No Stories">
								No Stories
							</option>
						) : null}
						<ListStories />
					</select>
					{loading === "true" ? (
						<div className="border-b-8 rounded-full border-[#D31D8A] bg-[#37B94D] animate-spin w-4 h-4"></div>
					) : null}
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
							className="hover:cursor-pointer hover:scale-110"
						/>
					) : (
						<LightModeIcon
							onClick={toggleDarkMode}
							className="hover:cursor-pointer dark:text-white hover:scale-110"
						/>
					)}
					{isLoggedIn ? (
						<div className="dropdown relative">
							<PersonIcon
								fontSize="large"
								className="hover:cursor-pointer dark:text-white"
							/>
							<div className="dropdown-content hidden absolute -right-[25%] -bottom-[550%] rounded-md border border-[#3b435e] divide-y-2 divide-[#3b435e] bg-[#DEE4F7] dark:bg-[#3b435e] dark:border-white dark:divide-white">
								<div className="w-full py-3">
									<span className="text-gray-400 py-2 px-4">
										User:{" "}
									</span>{" "}
									<span className=" text-black rounded italic py-2 px-4 dark:text-white">
										{email}
									</span>
								</div>
								<div className="w-full flex flex-col gap-3 px-5 text-center py-3">
									<button
										className="border border-[#3b435e] dark:border-white py-2 px-2 rounded dark:text-white whitespace-nowrap hover:underline hover:bg-black hover:text-white disabled:cursor-progress disabled:opacity-50"
										onClick={async () => {
											setLoading("true");
											try {
												const res = await axios.post(
													"/v1/tokens/password-reset",
													{
														email: localStorage.getItem(
															"userEmail"
														),
													}
												);
												if (res.data.message) {
													toast.info(
														"Email with reset token sent."
													);
													setLoading("false");
													setIsModalOpen({
														...isModalOpen,
														newPasswordModal:
															"true",
													}),
														setModalType(
															"newPassword"
														);
												}
											} catch (error) {
												toast.error(
													"Error Resetting Password"
												);
												setLoading("false");
												console.log(error);
											}
										}}
										disabled={loading === "true"}
									>
										Reset Password
									</button>
									<button
										onClick={() => {
											logout(),
												toast.success("Logged out"),
												router.replace("/");
										}}
										className="border border-[#3b435e] dark:border-white py-2 px-2 rounded dark:text-white hover:underline hover:bg-black hover:text-white"
									>
										Logout
									</button>
								</div>
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
				data={modalData}
				areOpen={isModalOpen}
				onClose={closeModal}
			/>
		</>
	);

	function ListStories() {
		return stories.map((story) => {
			return (
				<option key={story.id} value={story.title}>
					{story.title}
				</option>
			);
		});
	}
}
