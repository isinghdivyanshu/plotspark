export default function Loading() {
	return (
		<div className="h-screen dark:bg-[#1a1d28] flex justify-center items-center gap-5">
			<div className="flex flex-row gap-2">
				<div className="animate-bounce [animation-delay:-.3s]">
					<div className="border-t-8 rounded-full border-[#0c1f5f] bg-[#f4b9a4] dark:border-[#a0b3f3] dark:bg-[#f4b9a4]  animate-spin aspect-square w-8"></div>
				</div>
				<div className="animate-bounce [animation-delay:-.6s]">
					<div className="border-b-8 rounded-full border-[#0c1f5f] bg-[#f4b9a4] dark:border-[#a0b3f3] dark:bg-[#f4b9a4]  animate-spin aspect-square w-8"></div>
				</div>
				<div className="animate-bounce [animation-delay:-.3s]">
					<div className="border-t-8 rounded-full border-[#0c1f5f] bg-[#f4b9a4] dark:border-[#a0b3f3] dark:bg-[#f4b9a4]  animate-spin aspect-square w-8"></div>
				</div>
				<div className="animate-bounce [animation-delay:-.6s]">
					<div className="border-b-8 rounded-full border-[#0c1f5f] bg-[#f4b9a4] dark:border-[#a0b3f3] dark:bg-[#f4b9a4]  animate-spin aspect-square w-8"></div>
				</div>
			</div>
		</div>
	);
}
