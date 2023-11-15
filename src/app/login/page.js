"use client";

import { useState } from "react";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login() {
	const [formData, setFormData] = useState({ name: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);
	const hrStyle = {
		backgroundColor:
			localStorage.getItem("theme") === "dark" ? "#d1d1d1" : "#7979794d",
		height: "1px",
		border: "none",
	};

	return (
		<div className="h-screen relative bg-gradient-to-r from-[#FFEFD7] to-[#FFD7C8] pt-28 pl-28 dark:bg-none dark:bg-[#1a1d28] dark:text-white overflow-hidden">
			<div className="absolute bottom-24 w-full flex gap-16">
				<div className="w-1/3 ">
					<div className="text-[#0C1F5F91] font-normal dark:text-[#a0b3f3]">
						Hey there,
					</div>
					<div className="font-black text-4xl mb-10 ">
						Welcome Back
					</div>
					<div className="flex gap-2 mb-5 justify-around">
						<button
							type="button"
							className="rounded-xl bg-white py-2 px-4 flex items-center gap-2 justify-center dark:text-black"
						>
							<GoogleIcon />
							Log in with Google
						</button>
						<button
							type="button"
							className="rounded-xl bg-white py-2 px-4 flex items-center gap-2 justify-center dark:text-black"
						>
							<AppleIcon />
							Log in with Apple
						</button>
					</div>
					<div className="flex items-center justify-end">
						<hr className="w-full inline-block" style={hrStyle} />
						<span className=" text-[#797979d4] mx-2 dark:text-[#d1d1d1]">
							or
						</span>
						<hr className="w-full inline-block" style={hrStyle} />
					</div>
					<form onSubmit={handleSubmit}>
						<label
							htmlFor="name"
							className="flex flex-col gap-2 mt-8 "
						>
							Name
							<input
								type="text"
								name="name"
								id="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="Type Here"
								autoComplete="name"
								className="rounded-xl p-2 mb-6 dark:text-black"
								required
							/>
						</label>
						<label
							htmlFor="password"
							className="flex flex-col gap-2"
						>
							Password
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									id="password"
									value={formData.password}
									onChange={handleChange}
									minLength={8}
									placeholder="Type Here"
									autoComplete="current-password"
									className="rounded-xl p-2 mb-14 w-full dark:text-black"
									required
								/>
								{!showPassword ? (
									<VisibilityIcon
										onClick={handlePassword}
										className="absolute cursor-pointer right-2 top-2 dark:text-black"
									/>
								) : (
									<VisibilityOffIcon
										onClick={handlePassword}
										className="absolute cursor-pointer right-2 top-2 dark:text-black"
									/>
								)}
							</div>
						</label>
						<button
							type="submit"
							className="w-full bg-[#0c1f5f] p-2 rounded-xl text-white mb-16 font-bold dark:bg-[#a0b3f3]"
						>
							Log In
						</button>
					</form>
					<Link href="/signup">
						<span className="text-[#5f6180b8] dark:text-[#a0b3f3]">
							First time here?{" "}
						</span>
						<span>Sign up</span>
					</Link>
				</div>
				<div className="grow min-h-full rounded-s-xl border border-[#000000] border-r-0 overflow-hidden ml-16 shadow-[-4px_0px_100px_4px_rgba(0,0,0,0.25)] dark:shadow-[-4px_0px_100px_4px_rgba(255,255,255,0.1)] dark:border-[#ffffff]">
					<div className="bg-[#dfdce8] pt-2 pb-1 px-10 font-bold text-2xl dark:bg-[#202431]">
						<div className="flex w-fit flex-col items-center justify-center">
							Timeline
							<span className="w-[75%] rounded-xl bg-black dark:bg-white h-1"></span>
						</div>
					</div>
					<div className="h-full bg-white dark:bg-[#1e1e1e]"></div>
				</div>
			</div>
		</div>
	);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const res = await axios.get("/v1/login/", formData);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	}

	function handlePassword() {
		setShowPassword(!showPassword);
	}

	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	}
}
