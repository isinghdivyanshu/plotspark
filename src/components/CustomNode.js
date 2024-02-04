import React, { memo } from "react";
import { Handle, Position } from "reactflow";

function CharNode({ data }) {
	const nodeColors = ["#D31D8A", "#B1F1BC", "#DEE4F7", "#FFE298", "#4467DE"];
	// nodeColors[index % nodeColors.length];
	return (
		<button
			className={`nodrag bg-[#DEE4F7] px-4 py-2 shadow-md rounded-md !border-[${
				nodeColors[data.index % nodeColors.length]
			}] text-lg font-bold hover:scale-110`}
		>
			{data.name}
		</button>
	);
}
export const CharacterNode = memo(CharNode);

function DefNode({ data }) {
	return (
		<button
			className={`nodrag px-4 py-2 shadow-md rounded-md bg-white border-2 !border-[${data.color}] text-lg font-bold hover:scale-110`}
			onClick={() => {
				console.log("Clicked");
			}}
		>
			{data.title}
			<Handle
				type="target"
				position={Position.Left}
				className="!bg-teal-500"
			/>
			<Handle
				type="source"
				position={Position.Right}
				className="!bg-teal-500"
			/>
		</button>
	);
}
export const DefaultNode = memo(DefNode);

function InNode({ data }) {
	return (
		<button
			className={`nodrag px-4 py-2 shadow-md rounded-md bg-white border-2 !border-[${data.color}] text-lg font-bold hover:scale-110`}
		>
			{data.title}
			<Handle
				type="source"
				position={Position.Right}
				className=" !bg-teal-500"
			/>
		</button>
	);
}
export const InputNode = memo(InNode);

function OutNode({ data }) {
	return (
		<button
			className={`nodrag px-4 py-2 shadow-md rounded-md bg-white border-2 !border-[${data.color}] text-lg font-bold hover:scale-110`}
		>
			{data.title}
			<Handle
				type="target"
				position={Position.Left}
				className=" !bg-teal-500"
			/>
		</button>
	);
}
export const OutputNode = memo(OutNode);
