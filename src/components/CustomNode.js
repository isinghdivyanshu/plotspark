import React, { memo } from "react";
import { Handle, Position } from "reactflow";

function CharNode({ data }) {
	return (
		<button className="nodrag nopan bg-[#DEE4F7] px-4 py-2 shadow-md rounded-md text-lg font-bold hover:scale-110 w-48 h-14 whitespace-nowrap text-ellipsis overflow-hidden dark:bg-[#3b435e] dark:text-white">
			{data.name}
		</button>
	);
}
export const CharacterNode = memo(CharNode);

function DefNode({ data }) {
	return (
		<button
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
	return (
		<button
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
	return (
		<button
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

function ChapNode({ data }) {
	return (
		<div className="nodrag nopan px-4 py-2 bg-white text-lg font-bold hover:cursor-default text-center w-40 h-14 whitespace-nowrap text-ellipsis overflow-hidden dark:bg-transparent dark:text-white">
			{data.chapter}
		</div>
	);
}
export const ChapterNode = memo(ChapNode);
