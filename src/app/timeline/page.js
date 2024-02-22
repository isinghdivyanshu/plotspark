"use client";

import { useState, useEffect } from "react";
import axios from "@/app/axios";
import PrivateRoute from "@/components/PrivateRoute";
import { useStore } from "@/app/store";
import { toast } from "react-toastify";
import ReactFlow, {
	Controls,
	//  MiniMap
} from "reactflow";
import "reactflow/dist/base.css";
import TimelineNav from "@/components/TimelineNav";
import CallModal from "@/components/CallModal";
import CustomEdge from "@/components/CustomEdge";
import {
	CharacterNode,
	DefaultNode,
	InputNode,
	// OutputNode,
	ChapterNode,
	NothingNode,
	AddCharacterButton,
	DummyEventNode,
} from "@/components/CustomNode";
// import { data } from "@/components/stories";

const nodeTypes = {
	characterNode: CharacterNode,
	defaultNode: DefaultNode,
	inputNode: InputNode,
	// outputNode: OutputNode,
	addCharacterButton: AddCharacterButton,
	chapterNode: ChapterNode,
	nothingNode: NothingNode,
	dummyEventNode: DummyEventNode,
};
const edgeTypes = { addNode: CustomEdge };

function Timeline() {
	const { isLoggedIn, currentStory } = useStore();

	const [areModalsOpen, setAreModalsOpen] = useState({
		characterModal: "false",
		eventModal: "false",
		addCharacterModal: "false",
		addEventModal: "false",
		addStoryModal: "false",
	});
	const [modalData, setModalData] = useState("");
	const [modalType, setModalType] = useState("");
	const [storyData, setStoryData] = useState("");

	async function getCharsEvents() {
		try {
			const res = await axios.get(
				`v1/eventsstory/${currentStory.id}`,

				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"authToken"
						)}`,
					},
				}
			);
			if (res.data) {
				setStoryData(res.data);
			}
		} catch (err) {
			toast.error("Error Fetching Characters and Events");
			console.log(err);
		}
	}

	useEffect(() => {
		if (isLoggedIn && typeof window !== "undefined") {
			getCharsEvents();
		}
	}, [currentStory]);
	// console.log(storyData);

	const closeModals = () => {
		setAreModalsOpen({
			characterModal: "false",
			eventModal: "false",
			addCharacterModal: "false",
			addEventModal: "false",
			addStoryModal: "false",
		}),
			setModalData(""),
			setModalType("");
	};

	const nodeColors = ["#E94336", "#00A150", "#FABB08", "#4283F3"];
	let nodes = [];
	let edges = [];

	let chapters = 0;

	let y = 50;
	let x = 100;

	function createNodesEdges() {
		nodes.push({
			id: "addCharacterButton",
			position: { x: x, y: y },
			data: {
				story_id: currentStory.id,
				getCharsEvents: getCharsEvents,
				isOpen: areModalsOpen,
				setIsOpen: setAreModalsOpen,
				onClose: closeModals,
				modalData: modalData,
				setModalData: setModalData,
				setModalType: setModalType,
			},
			type: "addCharacterButton",
		});

		if (storyData && storyData.story_events) {
			y = 150;
			storyData.story_events.forEach((char) => {
				nodes.push({
					id: `node-char-${char.character_index}`,
					position: { x: x, y: y },
					data: {
						story_id: storyData.story_id,
						id: char.character_id,
						name: char.character_name,
						description: char.character_description
							? char.character_description
							: "",
						index: char.character_index,
						getCharsEvents: getCharsEvents,
						isOpen: areModalsOpen,
						setIsOpen: setAreModalsOpen,
						onClose: closeModals,
						modalData: modalData,
						setModalData: setModalData,
						setModalType: setModalType,
					},
					type: "characterNode",
				});
				y += 100;
			});

			y = 150;
			storyData.story_events.forEach((char) => {
				if (chapters < char.events.length) {
					chapters = char.events.length;
				}
				let x = 400;
				if (char.events.length === 0) {
					nodes.push({
						id: `node-char${char.character_index}-dummyEvn`,
						position: { x: x, y: y },
						data: {
							character_id: char.character_id,
							getCharsEvents: getCharsEvents,
							color: nodeColors[
								char.character_index % nodeColors.length
							],
							isOpen: areModalsOpen,
							setIsOpen: setAreModalsOpen,
							onClose: closeModals,
							modalData: modalData,
							setModalData: setModalData,
							setModalType: setModalType,
						},
						type: "dummyEventNode",
					});
					x = 400;
				}
				char.events.forEach((event) => {
					nodes.push({
						id: `node-char${char.character_index}-evn${event.index}`,
						position: { x: x, y: y },
						data: {
							id: event.id,
							character_id: event.character_id,
							title: event.title,
							description: event.description,
							index: event.index,
							getCharsEvents: getCharsEvents,
							color: nodeColors[
								char.character_index % nodeColors.length
							],
							isOpen: areModalsOpen,
							setIsOpen: setAreModalsOpen,
							onClose: closeModals,
							modalData: modalData,
							setModalData: setModalData,
							setModalType: setModalType,
						},
						type: event.index == 0 ? "inputNode" : "defaultNode",
					});
					if (event.index > 0) {
						edges.push({
							id: `edge-char${char.character_index}-evn${
								event.index - 1
							}-evn${event.index}`,
							source: `node-char${char.character_index}-evn${
								event.index - 1
							}`,
							target: `node-char${char.character_index}-evn${event.index}`,
							data: {
								index: event.index,
								character_id: event.character_id,
								getCharsEvents: getCharsEvents,
								isOpen: areModalsOpen,
								setIsOpen: setAreModalsOpen,
								onClose: closeModals,
								modalData: modalData,
								setModalData: setModalData,
								setModalType: setModalType,
								color: nodeColors[
									char.character_index % nodeColors.length
								],
							},
							type: "addNode",
						});
					}
					x += 250;
				});
				nodes.push({
					id: `node-char${char.character_index}-evn${char.events.length}`,
					position: { x: x, y: y },
					type: "nothingNode",
				});
				edges.push({
					id: `edge-char${char.character_index}-evn${
						char.events.length - 1
					}-evn${char.events.length}`,
					source: `node-char${char.character_index}-evn${
						char.events.length - 1
					}`,
					target: `node-char${char.character_index}-evn${char.events.length}`,
					data: {
						index: char.events.length,
						character_id: char.character_id,
						color: nodeColors[
							char.character_index % nodeColors.length
						],
					},
					type: "addNode",
				});
				y += 100;
			});

			y = 50;
			x = 400;
			for (let i = 0; i < chapters; i++) {
				nodes.push({
					id: `chap${i + 1}`,
					position: { x: x, y: y },
					data: { chapter: `Chapter ${i + 1}` },
					type: "chapterNode",
				});
				x += 250;
			}

			y = 50;
			x = 100;
			nodes.push({
				id: "addCharacterButton",
				position: { x: x, y: y },
				data: {
					story_id: currentStory.id,
					getCharsEvents: getCharsEvents,
					isOpen: areModalsOpen,
					setIsOpen: setAreModalsOpen,
					onClose: closeModals,
					modalData: modalData,
					setModalData: setModalData,
					setModalType: setModalType,
				},
				type: "addCharacterButton",
			});
		}
	}
	if (typeof window !== "undefined") {
		createNodesEdges();
	}

	// function nodeColor(node) {
	// 	switch (node.type) {
	// 		case "characterNode":
	// 			return "#85a1ff";
	// 		case "inputNode":
	// 			return "#6ede87";
	// 		case "outputNode":
	// 			return "#ff9b85";
	// 		case "defaultNode":
	// 			return "grey";
	// 	}
	// }

	return (
		<div className="flex flex-col h-screen">
			<TimelineNav />
			<div className="grow">
				<div className="h-full bg-white dark:bg-[#1a1d28]">
					<div className="h-full">
						<ReactFlow
							nodes={nodes}
							nodeTypes={nodeTypes}
							edges={edges}
							edgeTypes={edgeTypes}
							panOnScroll
							zoomOnDoubleClick={false}
							zoomOnPinch={true}
							translateExtent={[
								[0, 0],
								[Infinity, Infinity],
							]}
							minZoom={0.5}
							maxZoom={1.5}
							// TODO: implement drag and drop for nodes
						>
							<Controls
								position="top-left"
								showFitView={false}
								className="flex gap-2 m-0 bg-white w-24 justify-around"
							/>
							{/* <MiniMap
							nodeColor={nodeColor}
							pannable
							className="hover:cursor-pointer"
						/> */}
						</ReactFlow>
					</div>
				</div>
			</div>
			<CallModal
				modal={modalType}
				data={modalData}
				areOpen={areModalsOpen}
				onClose={closeModals}
			/>
		</div>
	);
}

export default PrivateRoute(Timeline);
