import { BaseEdge, EdgeLabelRenderer, getStraightPath } from "reactflow";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
	const [edgePath, labelX, labelY] = getStraightPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
	});
	// console.log(id);
	return (
		<>
			<BaseEdge id={id} path={edgePath} />
			<EdgeLabelRenderer>
				<button
					style={{
						position: "absolute",
						transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						pointerEvents: "all",
					}}
					className="nodrag rounded-full bg-transparent"
				>
					<AddCircleOutlineIcon className="text-sm hover:scale-125 bg-white rounded-full text-center" />
				</button>
			</EdgeLabelRenderer>
		</>
	);
}
