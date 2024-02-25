import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
	return (
		<div className="h-screen overflow-hidden">
			<Navbar />
			{children}
		</div>
	);
}
