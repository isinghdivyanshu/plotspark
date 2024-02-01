import TimelineNav from "@/components/TimelineNav";

export default function TimelineLayout({ children }) {
	return (
		<div className="flex flex-col h-screen">
			<TimelineNav />
			<div className="grow">{children}</div>
		</div>
	);
}
