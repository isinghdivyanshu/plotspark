import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Home() {
	return (
		<div className="bg-white dark:bg-black pl-28 dark:text-white pt-36">
			<div className="whitespace-pre-line font-black text-8xl mb-16">
				Build{" "}
				<span
					className="bg-gradient-to-r from-[#0c1f5f] to-[#f4b9a4] dark:from-[#a0b3f3] dark:to-[#f4b9a4] bg-clip-text"
					style={{ webkitTextFillColor: "transparent" }}
				>
					interactive
				</span>{" "}
				{"\n"} Timelines
			</div>
			<div
				className="font-bold text-lg mb-1"
				style={{ wordSpacing: ".25rem" }}
			>
				A visual hub for your entire project.
			</div>
			<div className="text-sm mb-5">
				Model anything from a product{" "}
				<span className="font-semibold">roadmap</span> to a{" "}
				<span className="font-semibold">fictional universe</span>.
			</div>
			<button className="bg-[#f4b9a4] rounded-md py-2 px-12 my-5 mr-4">
				How does it work?
			</button>
			<button className="bg-[#0c1f5f] dark:bg-[#a0b3f3] text-white rounded-md py-2 px-6 my-5">
				Get Started
			</button>
			<div className="mt-10 flex gap-16">
				<InstagramIcon
					className="rounded-full bg-black dark:bg-white text-white dark:text-black p-1"
					fontSize="large"
				/>
				<TwitterIcon
					className="rounded-full bg-black dark:bg-white text-white dark:text-black p-1"
					fontSize="large"
				/>
				<LinkedInIcon
					className="rounded-full bg-black dark:bg-white text-white dark:text-black p-1"
					fontSize="large"
				/>
			</div>
			<div className="absolute right-0 bottom-0 min-h-[55%] min-w-[50%] rounded-tl-xl border border-[#000000] dark:border-[#ffffff] border-r-0 overflow-hidden shadow-xl shadow-[#000000] dark:shadow-[#ffffff]">
				<div className="bg-[#dfdce8] dark:bg-[#202431] py-2 px-10 font-bold text-2xl">
					Timeline
				</div>
				<div className="h-full bg-white dark:bg-[#1e1e1e]"></div>
			</div>
		</div>
	);
}
