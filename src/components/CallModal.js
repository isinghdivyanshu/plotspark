"use client";

import { useState } from "react";
import { useStore } from "@/app/store";
import axios from "../app/axios";
import { toast } from "react-toastify";
import Modal from "react-modal";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

export default function CallModal({
	modal,
	data = null,
	setStories = () => {},
	areOpen,
	onClose,
}) {
	const { setCurrentStory, darkMode } = useStore();

	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			backgroundColor: `${darkMode ? "#1a1d28" : "#ffffff"}`,
			width: "45%",
			maxHeight: "90%",
			border: `3px solid ${darkMode ? "#364370" : "#72659A"}`,
			borderRadius: "10px",
			padding: "0",
		},
		overlay: {
			backgroundColor: `${darkMode ? "#3b435e80" : "#dee4f784"}`,
		},
	};
	if (modal === "character")
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
}

function CharacterModal({ data, isOpen, onClose, style }) {
	const [oldCharacterDetail, setOldCharacterEventDetail] = useState({
		name: data.name,
		description: data.description,
	});
	const [newCharacterDetail, setNewCharacterDetail] = useState({
		name: data.name,
		description: data.description,
	});

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
				Character Detail
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
										getCharsEvents();
										toast.success("Character Updated");
										onClose();
									}
								} catch (err) {
									toast.error("Error Updating Character");
									console.log(err);
								}
						  }
				}
				className="p-10 dark:text-white"
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
					className="float-left w-32 text-xl bg-[#D31D8A] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#882962]"
					onClick={() => {
						console.log("Save");
					}}
				>
					Delete
				</button>
				<button
					type="submit"
					className="float-right w-32 text-xl bg-[#37B94D] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#268436]"
				>
					Save
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
				Event Detail
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
										getCharsEvents();
										toast.success("Event Updated");
										onClose();
									}
								} catch (err) {
									toast.error("Error Updating Event");
									console.log(err);
								}
						  }
				}
				className="p-10 dark:text-white"
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
					className="float-left w-32 text-xl bg-[#D31D8A] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#882962]"
					onClick={() => {
						console.log("Save");
					}}
				>
					Delete
				</button>
				<button
					type="submit"
					className="float-right w-32 text-xl bg-[#37B94D] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#268436]"
				>
					Save
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
				Add Character
				<CloseTwoToneIcon
					onClick={onClose}
					className="cursor-pointer"
				/>
			</h1>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
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
							getCharsEvents();
							toast.success("Character Added");
							onClose();
						}
					} catch (err) {
						if (err.response.status === 422) {
							toast.error(
								"Character with same name already exists"
							);
						} else {
							toast.error("Error Adding Character");
							console.log(err);
						}
					}
				}}
				className="p-10 dark:text-white"
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
						placeholder="Type Here"
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
						placeholder="Type Here"
						rows={3}
						className="rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
					/>
				</label>
				<button
					type="submit"
					className="float-right w-32 text-xl bg-[#37B94D] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#268436]"
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
				Add Event
				<CloseTwoToneIcon
					onClick={onClose}
					className="cursor-pointer"
				/>
			</h1>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
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
							getCharsEvents();
							toast.success("Event Added");
							onClose();
						}
					} catch (err) {
						toast.error("Error Adding Event");
						console.log(err);
					}
				}}
				className="p-10 dark:text-white"
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
						placeholder="Type Here"
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
						placeholder="Type Here"
						rows={3}
						className="rounded-xl p-3 mb-3 dark:text-black border border-[#72659A] focus:outline-none"
						required
					/>
				</label>
				<button
					type="submit"
					className="float-right w-32 text-xl bg-[#37B94D] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#268436]"
				>
					Add
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

	return (
		<Modal
			isOpen={isOpen}
			contentLabel="Add Story Modal"
			style={style}
			shouldCloseOnOverlayClick={false}
			ariaHideApp={false}
		>
			<h1 className="flex justify-between items-center text-2xl font-bold bg-[#DEE4F7] px-10 py-3 align-bottom dark:bg-[#3B435E] dark:text-white">
				Add Story
				<CloseTwoToneIcon
					onClick={onClose}
					className="cursor-pointer"
				/>
			</h1>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
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
						try {
							if (response.data.stories) {
								setStories(response.data.stories);
							}
						} catch (err) {
							toast.error("Try Refreshing The Page");
							console.log(err);
						}
						if (res.data.story) {
							setCurrentStory(res.data.story);
							toast.success("Story Added");
							onClose();
						}
					} catch (err) {
						toast.error("Error Adding Story");
						console.log(err);
					}
				}}
				className="p-10 dark:text-white"
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
					className="float-right w-32 text-xl bg-[#37B94D] px-3 py-2 rounded-xl text-white my-5 font-medium border-2 border-[#268436]"
				>
					Add
				</button>
			</form>
		</Modal>
	);
}
