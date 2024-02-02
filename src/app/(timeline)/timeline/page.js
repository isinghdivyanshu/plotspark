"use client";

import { characters, events } from "@/components/stories";
import { useState, useCallback } from "react";
import ReactFlow, {
	Controls,
	Background,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomEdge from "@/components/CustomEdge";
import CustomNode from "@/components/CustomNode";

export default function Timeline() {
	const nodeTypes = { customNode: CustomNode };
	const edgeTypes = { "custom-edge": CustomEdge };

	let nodes = [];
	characters.forEach((character) => {
		nodes.push(character);
	});
	events.forEach((event) => {
		event.forEach((e) => {
			nodes.push(e);
		});
	});
	// nodes.push({ id: "btn-1", type: "customNode", position: { x: 50, y: 0 } });

	const edges = [
		{
			id: "a->b",
			type: "custom-edge",
			source: "evn-char1-4",
			target: "evn-char1-5",
		},
		{
			id: "b->c",
			source: "evn-char1-6",
			target: "evn-char1-7",
		},
	];

	// const onNodesChange = useCallback(
	// 	(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
	// 	[]
	// );
	// const onEdgesChange = useCallback(
	// 	(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
	// 	[]
	// );
	// const onConnect = useCallback(
	// 	(params) => setEdges((eds) => addEdge(params, eds)),
	// 	[]
	// );

	return (
		<div className="h-full bg-white dark:bg-[#1a1d28]">
			<div className="h-full">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodesConnectable={false}
					// onEdgesChange={onEdgesChange}
					// onConnect={onConnect}
					panOnScroll
					// TODO: implement drag and drop for nodes
					// snapToGrid={true}
					// snapGrid={[100,100]}
				>
					<Background />
					<Controls />
				</ReactFlow>
			</div>
		</div>
	);
}
