"use client";

import { useState } from "react";
import { useStore } from "@/app/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "../axios";
import { toast } from "react-toastify";
// import GoogleIcon from "@mui/icons-material/Google";
// import AppleIcon from "@mui/icons-material/Apple";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Signup() {
	const router = useRouter();
	const { setEmail } = useStore();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState("false");

	// const style = {
	// 	backgroundColor:
	// 		localStorage.getItem("theme") === "dark" ? "#d1d1d1" : "#7979794d",
	// 	height: "1px",
	// 	border: "none",
	// };

	//TODO: Add Google & Apple signup

	return (
		<div className="h-screen flex justify-center items-center bg-gradient-to-r from-[#FFEFD7] to-[#FFD7C8] dark:bg-none dark:bg-[#1a1d28] dark:text-white">
			<div className="lg:w-[40%] w-full p-5 lg:p-24">
				<div className="text-[#0C1F5F91] font-normal dark:text-[#a0b3f3]">
					Hey there, Welcome
				</div>
				<div className="font-black text-4xl mb-10 ">Get Started</div>
				{/* <div className="flex gap-2 mb-5 justify-around">
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
					</div> */}
				<form onSubmit={handleSubmit}>
					<label htmlFor="name" className="flex flex-col gap-1">
						Name
						<input
							type="text"
							name="name"
							id="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Type Here"
							autoComplete="name"
							className="rounded-xl p-3 mb-3 dark:text-black"
							required
						/>
					</label>
					<label htmlFor="email" className="flex flex-col gap-1">
						Email address
						<input
							type="email"
							name="email"
							id="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Type Here"
							autoComplete="email"
							className="rounded-xl p-3 mb-3 dark:text-black"
							required
						/>
					</label>
					<label htmlFor="password" className="flex flex-col gap-1">
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
								autoComplete="new-password"
								className="rounded-xl p-3 mb-8 w-full dark:text-black"
								required
							/>
							{!showPassword ? (
								<VisibilityIcon
									onClick={handlePassword}
									className="absolute cursor-pointer right-2 top-3 dark:text-black"
								/>
							) : (
								<VisibilityOffIcon
									onClick={handlePassword}
									className="absolute cursor-pointer right-2 top-3 dark:text-black"
								/>
							)}
						</div>
					</label>
					<button
						type="submit"
						className="w-full bg-[#0c1f5f] p-3 rounded-xl text-white mb-16 font-bold dark:bg-[#a0b3f3] disabled:cursor-not-allowed disabled:opacity-50"
						disabled={loading === "true"}
					>
						Sign Up
					</button>
				</form>
				<Link href="/login">
					<span className="text-[#5f6180b8] dark:text-[#a0b3f3]">
						Have an account?{" "}
					</span>
					<span>Log in</span>
				</Link>
			</div>
			<div className="w-[60%] hidden md:block h-[80%] rounded-s-xl border border-[#000000] border-r-0 overflow-hidden ml-16 shadow-[-4px_0px_100px_4px_rgba(0,0,0,0.25)] dark:shadow-[-4px_0px_100px_4px_rgba(255,255,255,0.1)] dark:border-[#ffffff]">
				<div className="bg-[#dfdce8] pt-2 pb-1 px-10 font-bold text-2xl dark:bg-[#202431]">
					<div className="flex flex-col w-fit  items-center justify-center">
						Timeline
						<span className="w-[75%] rounded-xl bg-black dark:bg-white h-1"></span>
					</div>
				</div>
				<div className="h-full bg-white dark:bg-[#1e1e1e]"></div>
			</div>
		</div>
	);

	async function handleSubmit(e) {
		e.preventDefault();

		setLoading("true");
		try {
			const res = await axios.post("/v1/users/", formData);
			if (res.data) {
				toast.success("Account Created Successfully");
				const response = await axios.post("/v1/tokens/activation", {
					email: formData.email,
				});
				if (response.data.message) {
					setEmail(formData.email);
					router.replace("/activation");
					toast.info(
						"Activation email sent. Please verify your email."
					);
				}
			}
		} catch (err) {
			if (err?.response?.status === 422) {
				toast.error("Email already exists. Please login.");
				setLoading("false");
			} else {
				toast.error(err?.response?.data?.detail);
				console.log(err);
				setLoading("false");
			}
		}
	}

	function handlePassword(e) {
		setShowPassword(!showPassword);
	}

	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	}
}
