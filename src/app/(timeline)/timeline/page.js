"use client";

import ReactFlow, { Controls, MiniMap } from "reactflow";
import "reactflow/dist/base.css";
import CustomEdge from "@/components/CustomEdge";
import {
	CharacterNode,
	DefaultNode,
	InputNode,
	OutputNode,
	ChapterNode,
} from "@/components/CustomNode";
import { backCharacters, backEvents } from "@/components/stories";

const nodeTypes = {
	characterNode: CharacterNode,
	defaultNode: DefaultNode,
	inputNode: InputNode,
	outputNode: OutputNode,
	chapterNode: ChapterNode,
};
const edgeTypes = { addNode: CustomEdge };

export default function Timeline() {
	const nodeColors = ["#E94336", "#00A150", "#FABB08", "#4283F3"];
	let nodes = [];
	let edges = [];

	let chapters = 0;

	let y = 150;
	let x = 100;
	backCharacters.forEach((char) => {
		nodes.push({
			id: `story${char.story_id}-char${char.id}`,
			position: { x: x, y: y },
			data: { name: char.name },
			type: "characterNode",
		});
		y += 100;
	});

	y = 150;
	backEvents.forEach((eventList, index) => {
		if (chapters < eventList.length) {
			chapters = eventList.length;
		}
		let x = 400;
		eventList.sort((a, b) => a.index - b.index);
		eventList.forEach((event) => {
			if (event.index == eventList.length - 1) {
				nodes.push({
					id: `evn-char${index}-${event.index}`,
					position: { x: x, y: y },
					data: {
						title: event.title,
						index: index,
						color: nodeColors[index % nodeColors.length],
					},
					type: "outputNode",
				});
			} else {
				nodes.push({
					id: `evn-char${index}-${event.index}`,
					position: { x: x, y: y },
					data: {
						title: event.title,
						index: index,
						color: nodeColors[index % nodeColors.length],
					},
					type: event.index == 0 ? "inputNode" : "defaultNode",
				});
			}
			if (event.index > 0) {
				edges.push({
					id: `char${index + 1}-evn${event.index - 1}-evn${
						event.index
					}`,
					source: `evn-char${index}-${event.index - 1}`,
					target: `evn-char${index}-${event.index}`,
					data: { color: nodeColors[index % nodeColors.length] },
					type: "addNode",
				});
			}
			x += 250;
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

	function nodeColor(node) {
		switch (node.type) {
			case "characterNode":
				return "#85a1ff";
			case "inputNode":
				return "#6ede87";
			case "outputNode":
				return "#ff9b85";
			case "defaultNode":
				return "grey";
		}
	}

	return (
		<div className="h-full bg-white rounded-b-lg border-[#000000] border-2 border-t-0 shadow-md shadow-zinc-600 dark:bg-[#1a1d28]">
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
	);
}
