import React, { memo } from "react";
import { Handle, Position } from "reactflow";

function CharNode({ data }) {
	const isOpen = data.isOpen;
	const setIsOpen = data.setIsOpen;
	const modalData = data.modalData;
	const setModalData = data.setModalData;
	const setModalType = data.setModalType;
	return (
		<button
			onClick={() => {
				setIsOpen({
					...isOpen,
					characterModal: "true",
				}),
					setModalData({
						id: data.id,
						name: data.name,
						description: data.description,
						getCharsEvents: data.getCharsEvents,
					}),
					setModalType("character");
			}}
			className="nodrag nopan bg-[#DEE4F7] px-4 py-2 shadow-md rounded-md text-lg font-bold hover:scale-110 w-48 h-14 whitespace-nowrap text-ellipsis overflow-hidden dark:bg-[#3b435e] dark:text-white"
		>
			{data.name}
		</button>
	);
}
export const CharacterNode = memo(CharNode);

function DefNode({ data }) {
	const isOpen = data.isOpen;
	const setIsOpen = data.setIsOpen;
	const modalData = data.modalData;
	const setModalData = data.setModalData;
	const setModalType = data.setModalType;

	return (
		<button
			onClick={() => {
				setIsOpen({
					...isOpen,
					eventModal: "true",
				}),
					setModalData({
						id: data.id,
						character_id: data.character_id,
						title: data.title,
						description: data.description,
						index: data.index,
						getCharsEvents: data.getCharsEvents,
					}),
					setModalType("event");
			}}
			className="nodrag nopan px-4 py-2 shadow-md rounded-md bg-white text-lg font-bold hover:scale-110 w-40 h-14 whitespace-nowrap text-ellipsis overflow-hidden dark:text-white dark:bg-transparent"
			style={{ border: `3px solid ${data.color}` }}
		>
			{data.title}
			<Handle
				type="target"
				position={Position.Left}
				style={{ backgroundColor: data.color }}
			/>
			<Handle
				type="source"
				position={Position.Right}
				style={{ backgroundColor: data.color }}
			/>
		</button>
	);
}
export const DefaultNode = memo(DefNode);

function InNode({ data }) {
	const isOpen = data.isOpen;
	const setIsOpen = data.setIsOpen;
	const modalData = data.modalData;
	const setModalData = data.setModalData;
	const setModalType = data.setModalType;

	return (
		<button
			onClick={() => {
				setIsOpen({
					...isOpen,
					eventModal: "true",
				}),
					setModalData({
						id: data.id,
						title: data.title,
						description: data.description,
					}),
					setModalType("event");
			}}
			className="nodrag nopan px-4 py-2 shadow-md rounded-md bg-white text-lg font-bold hover:scale-110 w-40 h-14 whitespace-nowrap text-ellipsis overflow-hidden dark:text-white dark:bg-transparent"
			style={{ border: `3px solid ${data.color}` }}
		>
			{data.title}
			<Handle
				type="source"
				position={Position.Right}
				style={{ backgroundColor: data.color }}
			/>
		</button>
	);
}
export const InputNode = memo(InNode);

function OutNode({ data }) {
	const isOpen = data.isOpen;
	const setIsOpen = data.setIsOpen;
	const modalData = data.modalData;
	const setModalData = data.setModalData;
	const setModalType = data.setModalType;

	return (
		<button
			onClick={() => {
				setIsOpen({
					...isOpen,
					eventModal: "true",
				}),
					setModalData({
						id: data.id,
						title: data.title,
						description: data.description,
					}),
					setModalType("event");
			}}
			className="nodrag nopan px-4 py-2 shadow-md rounded-md bg-white text-lg font-bold hover:scale-110 w-40 h-14 whitespace-nowrap text-ellipsis overflow-hidden dark:text-white dark:bg-transparent"
			style={{ border: `3px solid ${data.color}` }}
		>
			{data.title}
			<Handle
				type="target"
				position={Position.Left}
				style={{ backgroundColor: data.color }}
			/>
		</button>
	);
}
export const OutputNode = memo(OutNode);

function AddCharBtn({ data }) {
	const isOpen = data.isOpen;
	const setIsOpen = data.setIsOpen;
	const modalData = data.modalData;
	const setModalData = data.setModalData;
	const setModalType = data.setModalType;

	return (
		<button
			onClick={() => {
				setIsOpen({
					...isOpen,
					addCharacterModal: "true",
				}),
					setModalData({
						story_id: data.story_id,
						getCharsEvents: data.getCharsEvents,
					}),
					setModalType("addCharacter");
			}}
			className="nodrag nopan bg-[#3b435e] text-white px-4 py-2 shadow-md rounded-md text-lg font-bold hover:scale-110 w-48 h-14 dark:bg-[white] dark:text-black"
		>
			Add Character
		</button>
	);
}
export const AddCharacterButton = memo(AddCharBtn);

function DumEvnNode({ data }) {
	const isOpen = data.isOpen;
	const setIsOpen = data.setIsOpen;
	const modalData = data.modalData;
	const setModalData = data.setModalData;
	const setModalType = data.setModalType;

	return (
		<button
			onClick={() => {
				setIsOpen({
					...isOpen,
					addEventModal: "true",
				}),
					setModalData({
						character_id: data.character_id,
						getCharsEvents: data.getCharsEvents,
						index: 1,
					}),
					setModalType("addEvent");
			}}
			className="nodrag nopan px-4 py-2 shadow-md rounded-md bg-white text-lg font-bold hover:scale-110 w-40 h-14 whitespace-nowrap text-ellipsis overflow-hidden dark:text-white dark:bg-transparent"
			style={{ border: `3px solid ${data.color}` }}
		>
			Add Event
		</button>
	);
}
export const DummyEventNode = memo(DumEvnNode);

function ChapNode({ data }) {
	return (
		<div className="nodrag nopan px-4 py-2 bg-white text-lg font-bold hover:cursor-default text-center w-40 h-14 whitespace-nowrap text-ellipsis overflow-hidden dark:bg-transparent dark:text-white">
			{data.chapter}
		</div>
	);
}
export const ChapterNode = memo(ChapNode);

function NoNode() {
	return (
		<div className="nodrag nopan  w-40 h-14">
			<Handle
				type="target"
				position={Position.Left}
				style={{
					backgroundColor: "transparent",
				}}
			/>
		</div>
	);
}
export const NothingNode = memo(NoNode);
