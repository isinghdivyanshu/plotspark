"use client";

import { backCharacters, backEvents } from "@/components/stories";
import ReactFlow, {
	Controls,
	MiniMap,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
} from "reactflow";
import "reactflow/dist/base.css";
import CustomEdge from "@/components/CustomEdge";
import {
	CharacterNode,
	DefaultNode,
	InputNode,
	OutputNode,
} from "@/components/CustomNode";

const nodeTypes = {
	characterNode: CharacterNode,
	defaultNode: DefaultNode,
	inputNode: InputNode,
	outputNode: OutputNode,
};
const edgeTypes = { addNode: CustomEdge };

export default function Timeline() {
	let nodes = [];
	let edges = [];
	const nodeColors = ["#D31D8A", "#B1F1BC", "#DEE4F7", "#FFE298", "#4467DE"];
	let y = 50;
	backCharacters.forEach((char, index) => {
		let x = 100;
		nodes.push({
			id: `story${char.story_id}-char${char.id}`,
			position: { x: x, y: y },
			data: { name: char.name },
			color: nodeColors[index % nodeColors.length],
			type: "characterNode",
		});
		x += 200;
		y += 100;
	});
	y = 50;
	backEvents.forEach((eventList, index) => {
		let x = 300;
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
					id: `evn-char${index}-${event.index - 1}-${event.index}`,
					source: `evn-char${index}-${event.index - 1}`,
					target: `evn-char${index}-${event.index}`,
					type: "addNode",
				});
			}
			x += 200;
		});
		y += 100;
	});

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
		<div className="h-full bg-white dark:bg-[#1a1d28]">
			<div className="h-full">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodesConnectable={false}
					panOnScroll
					nodeTypes={nodeTypes}
					edgeTypes={edgeTypes}
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
						className="flex gap-2 m-0 bg-white"
					/>
					<MiniMap
						nodeColor={nodeColor}
						pannable
						inversePan
						className="hover:cursor-pointer"
					/>
				</ReactFlow>
			</div>
		</div>
	);
}
