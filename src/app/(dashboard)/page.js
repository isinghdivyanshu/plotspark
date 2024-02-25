import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";

export default function Home() {
	return (
		<div className=" bg-white h-screen  dark:bg-[#1a1d28] px-5 pt-20 md:pl-28 md:pt-28 md:pr-0 dark:text-white">
			<div className="whitespace-pre-line  leading-tight text-5xl md:text-6xl lg:text-8xl font-[Mont]">
				Build{" "}
				<span
					className="bg-gradient-to-r from-[#0c1f5f] to-[#f4b9a4] dark:from-[#a0b3f3] dark:to-[#f4b9a4] bg-clip-text"
					style={{ WebkitTextFillColor: "transparent" }}
				>
					interactive
				</span>{" "}
				{"\n"} Timelines
			</div>
			<div className="md:flex md:justify-between md:gap-4">
				<div className="h-full flex flex-col my-16">
					<div>
						<div
							className="font-bold text-lg md:text-xl mb-1"
							style={{ wordSpacing: ".25rem" }}
						>
							A visual hub for your entire project.
						</div>
						<div className="text-xs md:text-sm mb-5">
							Model anything from a product{" "}
							<span className="font-semibold">roadmap</span> to a{" "}
							<span className="font-semibold">
								fictional universe
							</span>
							.
						</div>
					</div>

					<div>
						<div className="flex gap-4 mt-10 mb-7 flex-wrap justify-center items-center">
							{/* <button className="bg-[#f4b9a4] rounded-md py-2 px-4 grow-[3]">
								How does it work?
							</button> */}
							<Link
								href="/timeline"
								className="bg-[#0c1f5f] dark:bg-[#a0b3f3] w-4/5 text-white rounded-md md:grow py-2 text-center"
							>
								Get Started
							</Link>
						</div>
						<div className="flex w-full justify-center md:justify-between">
							<div className="mt-10 flex gap-16">
								<Link
									href="https://www.instagram.com/gdscvitvellore?igsh=NTc4MTIwNjQ2YQ=="
									target="_blank"
								>
									<InstagramIcon
										className="rounded-full bg-black dark:bg-white text-white dark:text-black p-1"
										fontSize="large"
									/>
								</Link>
								<Link
									href=" https://x.com/gdscvit?t=vzFvlA7mM7pGbZDiFsZ_lg&s=08"
									target="_blank"
								>
									<TwitterIcon
										className="rounded-full bg-black dark:bg-white text-white dark:text-black p-1"
										fontSize="large"
									/>
								</Link>
								<Link
									href="https://www.linkedin.com/company/dscvit/"
									target="_blank"
								>
									<LinkedInIcon
										className="rounded-full bg-black dark:bg-white text-white dark:text-black p-1"
										fontSize="large"
									/>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="hidden md:block w-1/2 rounded-tl-xl rounded-bl-xl border border-[#000000] dark:border-[#ffffff] border-r-0 shadow-[-4px_-2px_28px_9px_rgba(0,0,0,0.25)] dark:shadow-[-4px_-2px_28px_9px_rgba(255,255,255,0.1)] ">
					<div className="bg-[#dfdce8] dark:bg-[#202431] rounded-tl-xl pt-3 pb-1 px-10 font-bold text-2xl">
						<div className="flex w-fit flex-col items-center justify-center">
							Timeline
							<span className="w-[75%] rounded-xl bg-black dark:bg-white h-1"></span>
						</div>
					</div>
					<div className="h-[52vh] rounded-bl-xl bg-white dark:bg-[#1e1e1e]"></div>
				</div>
			</div>
		</div>
	);
}
