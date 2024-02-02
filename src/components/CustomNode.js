import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
	return (
		<>
			<button className="rounded-full" style={{ padding: "10px 20px" }}>
				Divyanshu
			</button>

			<Handle type="target" position={Position.Left} />
			<Handle type="source" position={Position.Right} />
		</>
	);
};

export default CustomNode;
