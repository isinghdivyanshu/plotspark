"use client";

import { useState } from "react";
import { useStore } from "@/app/store";
import axios from "../app/axios";
import { toast } from "react-toastify";
import useScreenWidth from "@/app/hooks/useScreenWidth";
import Modal from "react-modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

export default function CallModal({
	modal,
	data = null,
	setStories = () => {},
	areOpen,
	onClose,
}) {
	const { setCurrentStory, darkMode } = useStore();
	const windowWidth = useScreenWidth();
	const mobileWidth = 570;
	const check = windowWidth > mobileWidth;

	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			backgroundColor: `${darkMode ? "#1a1d28" : "#ffffff"}`,
			width: `${check ? "50%" : "90%"}`,
			maxHeight: "90%",
			border: `3px solid ${darkMode ? "#364370" : "#72659A"}`,
			borderRadius: "10px",
			padding: "0",
		},
		overlay: {
			backgroundColor: `${darkMode ? "#3b435e80" : "#dee4f784"}`,
		},
	};

	if (modal === "story") {
		return (
			<StoryModal
				setCurrentStory={setCurrentStory}
				isOpen={areOpen.storyModal === "true"}
				onClose={onClose}
				style={customStyles}
				data={data}
			/>
		);
	} else if (modal === "character")
		return (
			<CharacterModal
				isOpen={areOpen.characterModal === "true"}
				onClose={onClose}
				style={customStyles}
				data={data}
			/>
		);
	else if (modal === "event")
		return (
			<EventModal
				isOpen={areOpen.eventModal === "true"}
				onClose={onClose}
				style={customStyles}
				data={data}
			/>
		);
	else if (modal === "addStory")
		return (
			<AddStoryModal
				setCurrentStory={setCurrentStory}
				setStories={setStories}
				isOpen={areOpen.addStoryModal === "true"}
				onClose={onClose}
				style={customStyles}
			/>
		);
	else if (modal === "addCharacter")
		return (
			<AddCharacterModal
				isOpen={areOpen.addCharacterModal === "true"}
				onClose={onClose}
				style={customStyles}
				data={data}
			/>
		);
	else if (modal === "addEvent")
		return (
			<AddEventModal
				isOpen={areOpen.addEventModal === "true"}
				onClose={onClose}
				style={customStyles}
				data={data}
			/>
		);
	else if (modal === "newPassword")
		return (
			<NewPasswordModal
				isOpen={areOpen.newPasswordModal === "true"}
				onClose={onClose}
				style={customStyles}
			/>
		);
	else if (modal === "forgotPassword")
		return (
			<ForgotPasswordModal
				isOpen={areOpen.forgotPasswordModal === "true"}
				onClose={onClose}
				style={customStyles}
				data={data}
			/>
		);
}

function StoryModal({ data, setCurrentStory, isOpen, onClose, style }) {
	const [oldStoryDetail, setOldStoryDetail] = useState({
		title: data.title,
		description: data.description,
	});
	const [newStoryDetail, setNewStoryDetail] = useState({
		title: data.title,
		description: data.description,
	});
	const [loading, setLoading] = useState("false");

	let { title: oldTitle, description: oldDescription } = oldStoryDetail;
	let { title: newTitle, description: newDescription } = newStoryDetail;

	oldTitle = oldTitle.trim().toLowerCase();
	oldDescription = oldDescription.trim().toLowerCase();
	newTitle = newTitle.trim().toLowerCase();
	newDescription = newDescription.trim().toLowerCase();

	return (
		<Modal
			isOpen={isOpen}
			contentLabel="Story Modal"
			style={style}
			shouldCloseOnOverlayClick={false}
			ariaHideApp={false}
		>
			<h1 className="flex justify-between items-center text-2xl font-bold bg-[#DEE4F7] px-10 py-3 align-bottom dark:bg-[#3B435E] dark:text-white">
				<span className="flex gap-5 items-center justify-center">
					Story Detail{" "}
					{loading === "true" ? (
						<div className="border-b-8 rounded-full border-[#D31D8A] bg-[#37B94D] animate-spin w-4 h-4"></div>
					) : null}
				</span>
				<CloseTwoToneIcon
					onClick={onClose}
					className="cursor-pointer"
				/>
			</h1>

			<form
				onSubmit={
					newTitle === oldTitle && newDescription === oldDescription
						? onClose
						: async (e) => {
								e.preventDefault();
								setLoading("true");
								try {
									const res = await axios.patch(
										`/v1/stories/${data.id}`,
										{
											story_id: data.story_id,
											title: newStoryDetail.title,
											description:
												newStoryDetail.description,
										},
										{
											headers: {
												Authorization: `Bearer ${localStorage.getItem(
													"authToken"
												)}`,
											},
										}
									);
									if (res.data.Story) {
										setCurrentStory(res.data.Story);
										toast.success("Story Updated");
										onClose();
									}
								} catch (err) {
									if (err?.response?.status === 422) {
										toast.error(
											"Story with same title already exists"
										);
										setLoading("false");
									} else {
										toast.error("Error Updating Story");
										console.log(err);
										setLoading("false");
									}
								}
						  }
				}
				className="p-10 dark:text-white"
				autoComplete="off"
			>
				<label htmlFor="title" className="flex flex-col gap-1">
					Name
					<input
						type="text"
						name="title"
						id="title"
						value={newStoryDetail.title}
						onChange={(e) =>
							setNewStoryDetail({
								...newStoryDetail,
								title: e.target.value,
							})
						}
						placeholder="Add Title"
						className="rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
						required
					/>
				</label>
				<label
					htmlFor="description"
					className="flex flex-col gap-1 my-4"
				>
					Description
					<textarea
						name="description"
						id="description"
						value={newStoryDetail.description}
						onChange={(e) =>
							setNewStoryDetail({
								...newStoryDetail,
								description: e.target.value,
							})
						}
						placeholder="Add Description"
						rows={3}
						className="rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
					/>
				</label>
				<button
					type="submit"
					className="float-right w-32 text-xl bg-[#37B94D] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#268436] disabled:cursor-progress disabled:opacity-50"
					disabled={loading === "true"}
				>
					Save
				</button>
				<button
					className="float-left w-32 text-xl bg-[#D31D8A] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#882962] disabled:cursor-progress disabled:opacity-50"
					onClick={async (e) => {
						e.preventDefault();
						setLoading("true");
						try {
							const res = await axios.delete(
								`v1/stories/${data.id}`,
								{
									headers: {
										Authorization: `Bearer ${localStorage.getItem(
											"authToken"
										)}`,
									},
								}
							);
							if (res.data.message) {
								setCurrentStory("");
								toast.success("Story Deleted");
								onClose();
							}
						} catch (err) {
							toast.error("Error Deleting Story");
							console.log(err);
							setLoading("false");
						}
					}}
					disabled={loading === "true"}
				>
					Delete
				</button>
			</form>
		</Modal>
	);
}

function CharacterModal({ data, isOpen, onClose, style }) {
	const [oldCharacterDetail, setOldCharacterDetail] = useState({
		name: data.name,
		description: data.description,
	});
	const [newCharacterDetail, setNewCharacterDetail] = useState({
		name: data.name,
		description: data.description,
	});
	const [loading, setLoading] = useState("false");

	const getCharsEvents = data.getCharsEvents;

	let { name: oldName, description: oldDescription } = oldCharacterDetail;
	let { name: newName, description: newDescription } = newCharacterDetail;

	oldName = oldName.trim().toLowerCase();
	oldDescription = oldDescription.trim().toLowerCase();
	newName = newName.trim().toLowerCase();
	newDescription = newDescription.trim().toLowerCase();

	return (
		<Modal
			isOpen={isOpen}
			contentLabel="Character Modal"
			style={style}
			shouldCloseOnOverlayClick={false}
			ariaHideApp={false}
		>
			<h1 className="flex justify-between items-center text-2xl font-bold bg-[#DEE4F7] px-10 py-3 align-bottom dark:bg-[#3B435E] dark:text-white">
				<span className="flex gap-5 items-center justify-center">
					Story Detail{" "}
					{loading === "true" ? (
						<div className="border-b-8 rounded-full border-[#D31D8A] bg-[#37B94D] animate-spin w-4 h-4"></div>
					) : null}
				</span>
				<CloseTwoToneIcon
					onClick={onClose}
					className="cursor-pointer"
				/>
			</h1>
			<form
				onSubmit={
					newName === oldName && newDescription === oldDescription
						? onClose
						: async (e) => {
								e.preventDefault();
								setLoading("true");
								try {
									const res = await axios.patch(
										`/v1/characters/${data.id}`,
										{
											story_id: data.story_id,
											name: newCharacterDetail.name,
											description:
												newCharacterDetail.description,
										},
										{
											headers: {
												Authorization: `Bearer ${localStorage.getItem(
													"authToken"
												)}`,
											},
										}
									);
									if (res.data.character) {
										await getCharsEvents();
										setOldCharacterDetail(
											newCharacterDetail
										);
										toast.success("Character Updated");
										onClose();
									}
								} catch (error) {
									if (error.response?.status === 422) {
										toast.error(
											"Character with same name already exists"
										);
										setLoading("false");
									} else {
										toast.error("Error Updating Character");
										console.log(error);
										setLoading("false");
									}
								}
						  }
				}
				className="p-10 dark:text-white"
				autoComplete="off"
			>
				<label htmlFor="name" className="flex flex-col gap-1">
					Name
					<input
						type="text"
						name="name"
						id="name"
						value={newCharacterDetail.name}
						onChange={(e) =>
							setNewCharacterDetail({
								...newCharacterDetail,
								name: e.target.value,
							})
						}
						placeholder="Add Name"
						className="rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
						required
					/>
				</label>
				<label
					htmlFor="description"
					className="flex flex-col gap-1 my-4"
				>
					Description
					<textarea
						name="description"
						id="description"
						value={newCharacterDetail.description}
						onChange={(e) =>
							setNewCharacterDetail({
								...newCharacterDetail,
								description: e.target.value,
							})
						}
						placeholder="Add Description"
						rows={3}
						className="rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
					/>
				</label>
				<button
					type="submit"
					className="float-right w-32 text-xl bg-[#37B94D] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#268436] disabled:cursor-progress disabled:opacity-50"
					disabled={loading === "true"}
				>
					Save
				</button>
				<button
					className="float-left w-32 text-xl bg-[#D31D8A] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#882962] disabled:cursor-progress disabled:opacity-50"
					onClick={async (e) => {
						e.preventDefault();
						setLoading("true");
						try {
							const res = await axios.delete(
								`v1/characters/${data.id}`,
								{
									data: {
										story_id: data.story_id,
									},
								}
							);
							if (res.data.message) {
								await getCharsEvents();
								toast.success("Character Deleted");
								onClose();
							}
						} catch (err) {
							setLoading("false");
							toast.error("Error Deleting Character");
							console.log(err);
						}
					}}
					disabled={loading === "true"}
				>
					Delete
				</button>
			</form>
		</Modal>
	);
}

function EventModal({ data, isOpen, onClose, style }) {
	const [oldEventDetail, setOldEventDetail] = useState({
		title: data.title,
		description: data.description,
	});
	const [newEventDetail, setNewEventDetail] = useState({
		title: data.title,
		description: data.description,
	});
	const [loading, setLoading] = useState("false");

	const getCharsEvents = data.getCharsEvents;

	let { title: oldTitle, description: oldDescription } = oldEventDetail;
	let { title: newTitle, description: newDescription } = newEventDetail;

	oldTitle = oldTitle.trim().toLowerCase();
	oldDescription = oldDescription.trim().toLowerCase();
	newTitle = newTitle.trim().toLowerCase();
	newDescription = newDescription.trim().toLowerCase();

	return (
		<Modal
			isOpen={isOpen}
			contentLabel="Event Modal"
			style={style}
			shouldCloseOnOverlayClick={false}
			ariaHideApp={false}
		>
			<h1 className="flex justify-between items-center text-2xl font-bold bg-[#DEE4F7] px-10 py-3 align-bottom dark:bg-[#3B435E] dark:text-white">
				<span className="flex gap-5 items-center justify-center">
					Event Detail{" "}
					{loading === "true" ? (
						<div className="border-b-8 rounded-full border-[#D31D8A] bg-[#37B94D] animate-spin w-4 h-4"></div>
					) : null}
				</span>
				<CloseTwoToneIcon
					onClick={onClose}
					className="cursor-pointer"
				/>
			</h1>
			<form
				onSubmit={
					newTitle === oldTitle && newDescription === oldDescription
						? onClose
						: async (e) => {
								e.preventDefault();
								setLoading("true");
								try {
									const res = await axios.patch(
										`/v1/events/${data.id}`,
										{
											character_id: data.character_id,
											index: data.index,
											title: newEventDetail.title,
											description:
												newEventDetail.description,
										},
										{
											headers: {
												Authorization: `Bearer ${localStorage.getItem(
													"authToken"
												)}`,
											},
										}
									);
									if (res.data.Event) {
										await getCharsEvents();
										setOldEventDetail(newEventDetail);
										toast.success("Event Updated");
										onClose();
									}
								} catch (err) {
									toast.error("Error Updating Event");
									setLoading("false");
									console.log(err);
								}
						  }
				}
				className="p-10 dark:text-white"
				autoComplete="off"
			>
				<label htmlFor="title" className="flex flex-col gap-1">
					Title
					<input
						type="text"
						name="title"
						id="title"
						value={newEventDetail.title}
						onChange={(e) =>
							setNewEventDetail({
								...newEventDetail,
								title: e.target.value,
							})
						}
						placeholder="Add Title"
						className="rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
						required
					/>
				</label>
				<label
					htmlFor="description"
					className="flex flex-col gap-1 my-4"
				>
					Description
					<textarea
						name="description"
						id="description"
						value={newEventDetail.description}
						onChange={(e) =>
							setNewEventDetail({
								...newEventDetail,
								description: e.target.value,
							})
						}
						placeholder="Add Description"
						rows={3}
						className="rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
					/>
				</label>
				<button
					type="submit"
					className="float-right w-32 text-xl bg-[#37B94D] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#268436] disabled:cursor-progress disabled:opacity-50"
					disabled={loading === "true"}
				>
					Save
				</button>
				<button
					className="float-left w-32 text-xl bg-[#D31D8A] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#882962] disabled:cursor-progress disabled:opacity-50"
					onClick={async (e) => {
						e.preventDefault();
						setLoading("true");
						try {
							const res = await axios.delete(
								`v1/events/${data.id}`,
								{
									data: {
										character_id: data.character_id,
									},
								}
							);
							if (res.data.message) {
								await getCharsEvents();
								toast.success("Event Deleted");
								onClose();
							}
						} catch (err) {
							toast.error("Error Deleting Event");
							setLoading("false");
							console.log(err);
						}
					}}
					disabled={loading === "true"}
				>
					Delete
				</button>
			</form>
		</Modal>
	);
}

function AddStoryModal({
	setCurrentStory,
	setStories,
	isOpen,
	onClose,
	style,
}) {
	const [newStoryDetail, setNewStoryDetail] = useState({
		title: "",
		description: "",
	});
	const [loading, setLoading] = useState("false");

	return (
		<Modal
			isOpen={isOpen}
			contentLabel="Add Story Modal"
			style={style}
			shouldCloseOnOverlayClick={false}
			ariaHideApp={false}
		>
			<h1 className="flex justify-between items-center text-2xl font-bold bg-[#DEE4F7] px-10 py-3 align-bottom dark:bg-[#3B435E] dark:text-white">
				<span className="flex gap-5 items-center justify-center">
					Add Story{" "}
					{loading === "true" ? (
						<div className="border-b-8 rounded-full border-[#D31D8A] bg-[#37B94D] animate-spin w-4 h-4"></div>
					) : null}
				</span>
				<CloseTwoToneIcon
					onClick={onClose}
					className="cursor-pointer"
				/>
			</h1>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					setLoading("true");
					try {
						const res = await axios.post(
							"/v1/stories",
							newStoryDetail,
							{
								headers: {
									Authorization: `Bearer ${localStorage.getItem(
										"authToken"
									)}`,
								},
							}
						);
						const response = await axios.get("/v1/stories", {
							headers: {
								Authorization: `Bearer ${localStorage.getItem(
									"authToken"
								)}`,
							},
						});
						if (response.data.stories) {
							setStories(response.data.stories);
						}
						if (res.data.story) {
							setCurrentStory(res.data.story);
							toast.success("Story Added");
							onClose();
						}
					} catch (err) {
						if (err?.response?.status === 422) {
							toast.error("Story with same title already exists");
							setLoading("false");
						} else {
							toast.error("Error Adding Story");
							setLoading("false");
							console.log(err);
						}
					}
				}}
				className="p-10 dark:text-white"
				autoComplete="off"
			>
				<label htmlFor="title" className="flex flex-col gap-1">
					Title
					<input
						type="text"
						name="title"
						id="title"
						value={newStoryDetail.title}
						onChange={(e) =>
							setNewStoryDetail({
								...newStoryDetail,
								title: e.target.value,
							})
						}
						placeholder="Add Title"
						className="rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
						autoFocus
						required
					/>
				</label>
				<label
					htmlFor="description"
					className="flex flex-col gap-1 my-4"
				>
					Description
					<textarea
						name="description"
						id="description"
						value={newStoryDetail.description}
						onChange={(e) =>
							setNewStoryDetail({
								...newStoryDetail,
								description: e.target.value,
							})
						}
						placeholder="Add Description"
						rows={3}
						className="rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
					/>
				</label>
				<button
					type="submit"
					className="float-right w-32 text-xl bg-[#37B94D] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#268436] disabled:cursor-progress disabled:opacity-50"
					disabled={loading === "true"}
				>
					Add
				</button>
			</form>
		</Modal>
	);
}

function AddCharacterModal({ data, isOpen, onClose, style }) {
	const [newCharacterDetail, setNewCharacterDetail] = useState({
		name: "",
		description: "",
	});
	const [loading, setLoading] = useState("false");

	const getCharsEvents = data.getCharsEvents;

	return (
		<Modal
			isOpen={isOpen}
			contentLabel="Add Character Modal"
			style={style}
			shouldCloseOnOverlayClick={false}
			ariaHideApp={false}
		>
			<h1 className="flex justify-between items-center text-2xl font-bold bg-[#DEE4F7] px-10 py-3 align-bottom dark:bg-[#3B435E] dark:text-white">
				<span className="flex gap-5 items-center justify-center">
					Add Character{" "}
					{loading === "true" ? (
						<div className="border-b-8 rounded-full border-[#D31D8A] bg-[#37B94D] animate-spin w-4 h-4"></div>
					) : null}
				</span>
				<CloseTwoToneIcon
					onClick={onClose}
					className="cursor-pointer"
				/>
			</h1>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					setLoading("true");
					try {
						const res = await axios.post(
							"/v1/characters",
							{
								story_id: data.story_id,
								name: newCharacterDetail.name,
								description: newCharacterDetail.description,
							},
							{
								headers: {
									Authorization: `Bearer ${localStorage.getItem(
										"authToken"
									)}`,
								},
							}
						);
						if (res.data.character) {
							await getCharsEvents();
							toast.success("Character Added");
							onClose();
						}
					} catch (err) {
						if (err?.response?.status === 422) {
							toast.error(
								"Character with same name already exists"
							);
							setLoading("false");
						} else {
							toast.error("Error Adding Character");
							setLoading("false");
							console.log(err);
						}
					}
				}}
				className="p-10 dark:text-white"
				autoComplete="off"
			>
				<label htmlFor="name" className="flex flex-col gap-1">
					Name
					<input
						type="text"
						name="name"
						id="name"
						value={newCharacterDetail.name}
						onChange={(e) =>
							setNewCharacterDetail({
								...newCharacterDetail,
								name: e.target.value,
							})
						}
						placeholder="Add Name"
						className="rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
						autoFocus
						required
					/>
				</label>
				<label
					htmlFor="description"
					className="flex flex-col gap-1 my-4"
				>
					Description
					<textarea
						name="description"
						id="description"
						value={newCharacterDetail.description}
						onChange={(e) =>
							setNewCharacterDetail({
								...newCharacterDetail,
								description: e.target.value,
							})
						}
						placeholder="Add Description"
						rows={3}
						className="rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
					/>
				</label>
				<button
					type="submit"
					className="float-right w-32 text-xl bg-[#37B94D] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#268436] disabled:cursor-progress disabled:opacity-50"
					disabled={loading === "true"}
				>
					Add
				</button>
			</form>
		</Modal>
	);
}

function AddEventModal({ data, isOpen, onClose, style }) {
	const [newEventDetail, setNewEventDetail] = useState({
		title: "",
		description: "",
	});
	const [loading, setLoading] = useState("false");

	const getCharsEvents = data.getCharsEvents;

	return (
		<Modal
			isOpen={isOpen}
			contentLabel="Add Event Modal"
			style={style}
			shouldCloseOnOverlayClick={false}
			ariaHideApp={false}
		>
			<h1 className="flex justify-between items-center text-2xl font-bold bg-[#DEE4F7] px-10 py-3 align-bottom dark:bg-[#3B435E] dark:text-white">
				<span className="flex gap-5 items-center justify-center">
					Add Event{" "}
					{loading === "true" ? (
						<div className="border-b-8 rounded-full border-[#D31D8A] bg-[#37B94D] animate-spin w-4 h-4"></div>
					) : null}
				</span>
				<CloseTwoToneIcon
					onClick={onClose}
					className="cursor-pointer"
				/>
			</h1>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					setLoading("true");
					try {
						const res = await axios.post(
							"/v1/events",
							{
								character_id: data.character_id,
								title: newEventDetail.title,
								description: newEventDetail.description,
								index: data.index,
							},
							{
								headers: {
									Authorization: `Bearer ${localStorage.getItem(
										"authToken"
									)}`,
								},
							}
						);
						if (res.data.event) {
							await getCharsEvents();
							toast.success("Event Added");
							onClose();
						}
					} catch (err) {
						toast.error("Error Adding Event");
						setLoading("false");
						console.log(err);
					}
				}}
				className="p-10 dark:text-white"
				autoComplete="off"
			>
				<label htmlFor="title" className="flex flex-col gap-1">
					Title
					<input
						type="text"
						name="title"
						id="title"
						value={newEventDetail.title}
						onChange={(e) =>
							setNewEventDetail({
								...newEventDetail,
								title: e.target.value,
							})
						}
						placeholder="Add Title"
						className="rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
						autoFocus
						required
					/>
				</label>
				<label
					htmlFor="description"
					className="flex flex-col gap-1 my-4"
				>
					Description
					<textarea
						name="description"
						id="description"
						value={newEventDetail.description}
						onChange={(e) =>
							setNewEventDetail({
								...newEventDetail,
								description: e.target.value,
							})
						}
						placeholder="Add Description"
						rows={3}
						className="rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
					/>
				</label>
				<button
					type="submit"
					className="float-right w-32 text-xl bg-[#37B94D] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#268436] disabled:cursor-progress disabled:opacity-50"
					disabled={loading === "true"}
				>
					Add
				</button>
			</form>
		</Modal>
	);
}

function NewPasswordModal({ isOpen, onClose, style }) {
	const [password, setPassword] = useState("");
	const [resetToken, setResetToken] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState("false");

	return (
		<Modal
			isOpen={isOpen}
			contentLabel="New Password Modal"
			style={style}
			shouldCloseOnOverlayClick={false}
			ariaHideApp={false}
		>
			<h1 className="flex justify-between items-center text-2xl font-bold bg-[#DEE4F7] px-10 py-3 align-bottom dark:bg-[#3B435E] dark:text-white">
				<span className="flex gap-5 items-center justify-center">
					New Password{" "}
					{loading === "true" ? (
						<div className="border-b-8 rounded-full border-[#D31D8A] bg-[#37B94D] animate-spin w-4 h-4"></div>
					) : null}
				</span>
				<CloseTwoToneIcon
					onClick={onClose}
					className="cursor-pointer"
				/>
			</h1>
			<form
				onSubmit={async (e) => {
					e.preventDefault();

					setLoading("true");
					try {
						const res = await axios.put("/v1/users/password", {
							password: password,
							token: resetToken,
						});
						if (res.data.message) {
							toast.success("Password Reset Successful");
							onClose();
						}
					} catch (error) {
						if (error?.response?.status === 422) {
							toast.error("Invalid Reset Token");
							setResetToken("");
							setLoading("false");
						} else {
							toast.error("Error Resetting Password");
							setLoading("false");
							console.log(error);
						}
					}
				}}
				className="p-10 dark:text-white"
				autoComplete="off"
			>
				<label htmlFor="password" className="flex flex-col gap-1">
					Password
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							id="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							minLength={8}
							placeholder="New Password Here"
							className="w-full rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
							autoFocus
							required
						/>
						{!showPassword ? (
							<VisibilityIcon
								onClick={() => {
									setShowPassword(!showPassword);
								}}
								className="absolute cursor-pointer right-2 top-3 dark:text-black"
							/>
						) : (
							<VisibilityOffIcon
								onClick={() => {
									setShowPassword(!showPassword);
								}}
								className="absolute cursor-pointer right-2 top-3 dark:text-black"
							/>
						)}
					</div>
					<label htmlFor="token" className="flex flex-col gap-1">
						Reset Token
						<input
							type="text"
							name="resetToken"
							id="resetToken"
							value={resetToken}
							onChange={(e) => {
								setResetToken(e.target.value);
							}}
							maxLength={6}
							minLength={6}
							placeholder="Reset Token Here"
							className="rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
							autoComplete="off"
							required
						/>
					</label>
				</label>
				<button
					type="submit"
					className="float-right w-32 text-xl bg-[#37B94D] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#268436] disabled:cursor-progress disabled:opacity-50"
					disabled={loading === "true"}
				>
					Reset
				</button>
			</form>
		</Modal>
	);
}

function ForgotPasswordModal({ data, isOpen, onClose, style }) {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState("false");

	return (
		<Modal
			isOpen={isOpen}
			contentLabel="Forgot Password Modal"
			style={style}
			shouldCloseOnOverlayClick={false}
			ariaHideApp={false}
		>
			<h1 className="flex justify-between items-center text-2xl font-bold bg-[#DEE4F7] px-10 py-3 align-bottom dark:bg-[#3B435E] dark:text-white">
				<span className="flex gap-5 items-center justify-center">
					Forgot Password{" "}
					{loading === "true" ? (
						<div className="border-b-8 rounded-full border-[#D31D8A] bg-[#37B94D] animate-spin w-4 h-4"></div>
					) : null}
				</span>
				<CloseTwoToneIcon
					onClick={onClose}
					className="cursor-pointer"
				/>
			</h1>
			<form
				onSubmit={async (e) => {
					e.preventDefault();

					setLoading("true");
					try {
						const res = await axios.post(
							"/v1/tokens/password-reset",
							{
								email: email,
							}
						);
						if (res.data.message) {
							toast.info("Email with reset token sent.");
							setLoading("false");
							onClose();
							data.setIsModalOpen({
								...data.isModalOpen,
								newPasswordModal: "true",
							});
							data.setModalType("newPassword");
						}
					} catch (error) {
						toast.error("Error Resetting Password");
						setLoading("false");
						console.log(error);
					}
				}}
				className="p-10 dark:text-white"
			>
				<label htmlFor="email" className="flex flex-col gap-1">
					Email
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						placeholder="Your Email Here"
						className="rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
						autoFocus
						required
					/>
				</label>

				<button
					type="submit"
					className="float-right w-32 text-xl bg-[#37B94D] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#268436] disabled:cursor-progress disabled:opacity-50"
					disabled={loading === "true"}
				>
					Reset
				</button>
			</form>
		</Modal>
	);
}
