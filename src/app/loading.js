export default function Loading() {
	return (
		<div className="h-screen dark:bg-[#1a1d28] flex justify-center items-center">
			<h1
				className="text-5xl font-[Mont] bg-gradient-to-r from-[#0c1f5f] to-[#f4b9a4] dark:from-[#a0b3f3] dark:to-[#f4b9a4] bg-clip-text"
				style={{ WebkitTextFillColor: "transparent" }}
			>
				Loading...
			</h1>
		</div>
	);
}
