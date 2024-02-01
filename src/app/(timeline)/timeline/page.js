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

export default function Timeline() {
	let nodes = []
	characters.forEach((character) => {
		nodes.push(character)
	})
	events.forEach((event) => {
		event.forEach((e) => {
			nodes.push(e)
		})
	})
	const initialEdges = [];
	// { id: "1-2", source: "1", target: "2" }
	// const [nodes, setNodes] = useState(initialNodes);
	// const [edges, setEdges] = useState(initialEdges);

	const onNodesChange = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[]
	);

	const onEdgesChange = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[]
	);

	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[]
	);

	return (
		<div className="h-full bg-white dark:bg-[#1a1d28]">
			<div className="h-full">
				<ReactFlow
					nodes={nodes}
					// edges={edges}
					// onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					
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
