import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Link href="/signup">
				<div className="hover:bg-blue-500 border border-blue-500 p-2 rounded-md">
					Sign Up
				</div>
			</Link>
			<Link href="/login">
				<div className="hover:bg-blue-500 border border-blue-500 p-2 rounded-md">
					Login
				</div>
			</Link>
		</main>
	);
}
