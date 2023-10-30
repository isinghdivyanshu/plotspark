import Link from "next/link";

export default function Login() {
	return (
		<div className="min-h-screen bg-gradient-to-r from-[#FFEFD7] to-[#FFD7C8] pt-28 pl-28">
			<div className="flex gap-6 ">
				<div className="w-1/3 ">
					<div className="text-[#0C1F5F91] font-normal">
						Hey there, Welcome
					</div>
					<div className="font-black text-4xl mb-10">Get Started</div>
					<div className="flex gap-2 mb-5 justify-between">
						<button
							type="button"
							className="grow rounded-lg bg-white py-2 px-4"
						>
							Sign in with Google
						</button>
						<button
							type="button"
							className="grow rounded-lg bg-white py-2 px-4"
						>
							Sign in with Apple
						</button>
					</div>
					<div className="flex items-center justify-end">
						<hr className="w-full inline-block" />
						<span className=" text-[#797979d4] mx-2">or</span>
						<hr className="w-full inline-block" />
					</div>
					<label htmlFor="name" className="flex flex-col gap-1">
						Name
						<input
							type="text"
							id="name"
							placeholder="Type Here"
							autoComplete="name"
							className="rounded-lg p-2 mb-3"
						/>
					</label>
					<label htmlFor="email" className="flex flex-col gap-1">
						Email address
						<input
							type="text"
							id="email"
							placeholder="Type Here"
							autoComplete="email"
							className="rounded-lg p-2 mb-3"
						/>
					</label>
					<label htmlFor="password" className="flex flex-col gap-1">
						Password
						<input
							type="text"
							id="password"
							placeholder="Type Here"
							className="rounded-lg p-2 mb-8"
						/>
					</label>
					<button
						type="submit"
						className="w-full bg-[#0c1f5f] p-2 rounded-lg text-white mb-16"
					>
						Sign Up
					</button>
					<Link href="/login">
						<span className="text-[#5f6180b8]">
							Have an account?{" "}
						</span>
						<span>Log in</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
