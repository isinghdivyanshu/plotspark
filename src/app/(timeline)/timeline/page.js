"use client";

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
	const initialNodes = [
		{
			id: "1",
			position: { x: 0, y: 0 },
			data: { label: "Story" },
			type: "input",
		},
		{
			id: "2",
			position: { x: 100, y: 100 },
			data: { label: "Characters" },
		},
	];
	const initialEdges = [];
	// { id: "1-2", source: "1", target: "2" }
	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);

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
					onNodesChange={onNodesChange}
					edges={edges}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
				>
					<Background />
					<Controls />
				</ReactFlow>
			</div>
		</div>
	);
}
