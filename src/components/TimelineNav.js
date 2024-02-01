"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import stories from "./stories";

export default function TimelineNav() {
	// const [stories, setstories] = useState([]);
	const [timelineActive, setTimelineActive] = useState(true);
	const [charactersActive, setCharactersActive] = useState(false);
	const [placesActive, setPlacesActive] = useState(false);
	const [currentStory, setCurrentStory] = useState(stories[0]);

	// const style = {
	// 	backgroundColor: "#B6C1E8",
	// 	height: "4px",
	// 	border: "none",
	// };

	// useEffect(() => {
	// 	const getStories = async () => {
	// 		try {
	// 			const response = await axios.get("v1/stories", {
	// 				headers: {
	// 					Authorization: `Bearer ${localStorage.getItem(
	// 						"token"
	// 					)}`,
	// 				},
	// 			});
	// 			if (response.data.status == 200 && response.data) {
	// 				setstories(response.data.stories);
	// 			}
	// 		} catch (error) {
	// 			toast.error("Error Fetching Stories");
	// 			console.log(error?.response?.data?.detail);
	// 		}
	// 		getStories();
	// 	};
	// }, [stories]);

	return (
		<>
			<div className="flex bg-[#DEE4F7] py-2 px-5 justify-between">
				<div className="flex gap-4">
					<button className="bg-white font-semibold text-3xl text-black p-1 w-fit h-fit rounded-sm">
						<AddIcon />
					</button>
					<select
						className="py-1 px-5  bg-white rounded text-sm"
						value={currentStory.title}
						onChange={(e) => {
							setCurrentStory(
								stories.find(
									(story) => story.title === e.target.value
								)
							);
						}}
					>
						<ListStories />
					</select>
					<div className="flex justify-center items-center gap-3">
						<button
							className={
								timelineActive === true
									? "bg-white py-1 px-2 rounded text-sm"
									: "py-1 px-2 font-medium text-sm"
							}
							onClick={() => (
								setTimelineActive(true),
								setCharactersActive(false),
								setPlacesActive(false)
							)}
						>
							Timeline
						</button>
						<button
							className={
								charactersActive === true
									? "bg-white py-1 px-2 rounded text-sm"
									: "py-1 px-2 font-medium text-sm"
							}
							onClick={() => (
								setTimelineActive(false),
								setCharactersActive(true),
								setPlacesActive(false)
							)}
						>
							Characters
						</button>
						<button
							className={
								placesActive === true
									? "bg-white py-1 px-2 rounded text-sm"
									: "py-1 px-2 font-medium text-sm"
							}
							onClick={() => (
								setTimelineActive(false),
								setCharactersActive(false),
								setPlacesActive(true)
							)}
						>
							Places
						</button>
					</div>
				</div>
				<div className="flex gap-4 items-center justify-center">
					<button className="flex items-center justify-center bg-white py-1 px-2 rounded">
						<FilterAltIcon />
						Filter
					</button>
					<Link href="/">
						<CloseTwoToneIcon color="disabled" fontSize="small" />
					</Link>
				</div>
			</div>
			{/* <hr className="w-[95%] block" style={style} /> */}
		</>
	);

	function ListStories() {
		return stories.map((story) => {
			return (
				<option key={story.id} value={story.title}>
					{story.title}
				</option>
			);
		});
	}
}
