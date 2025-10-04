import { BaseEdge, EdgeLabelRenderer, getStraightPath } from "reactflow";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";

export default function CustomEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	data,
}) {
	const [edgePath, labelX, labelY] = getStraightPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
	});

	const isOpen = data.isOpen;
	const setIsOpen = data.setIsOpen;
	const modalData = data.modalData;
	const setModalData = data.setModalData;
	const setModalType = data.setModalType;

	return (
		<>
			<BaseEdge
				id={id}
				path={edgePath}
				className="hover:cursor-default"
				style={{
					stroke: data.color,
					strokeWidth: 3,
				}}
			/>
			<EdgeLabelRenderer>
				<button
					style={{
						position: "absolute",
						transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						pointerEvents: "all",
					}}
					className="nodrag nopan rounded-full bg-transparent flex items-center justify-center "
					onClick={() => {
						setIsOpen({
							...isOpen,
							addEventModal: "true",
						}),
							setModalData({
								character_id: data.character_id,
								index: data.index,
								getCharsEvents: data.getCharsEvents,
							}),
							setModalType("addEvent");
					}}
				>
					<AddIcon
						className={`text-lg hover:scale-125 bg-white rounded-full outline outline-[${data.color}] dark:bg-[#1a1d28]`}
						style={{ color: data.color }}
					/>
				</button>
			</EdgeLabelRenderer>
		</>
	);
}
