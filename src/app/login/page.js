"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "../axios";
import { useStore } from "@/app/store";
import { toast } from "react-toastify";
// import GoogleIcon from "@mui/icons-material/Google";
// import AppleIcon from "@mui/icons-material/Apple";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login() {
	const { setEmail, login } = useStore();
	const router = useRouter();

	const [formData, setFormData] = useState({ email: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);
	// const hrStyle = {
	// 	backgroundColor:
	// 		localStorage.getItem("theme") === "dark" ? "#d1d1d1" : "#7979794d",
	// 	height: "1px",
	// 	border: "none",
	// };

	//TODO: Add Google & Apple Login

	return (
		<div className="h-screen flex justify-center items-center bg-gradient-to-r from-[#FFEFD7] to-[#FFD7C8] dark:bg-none dark:bg-[#1a1d28] dark:text-white">
			<div className="lg:w-[40%] w-full p-5 lg:p-24">
				<div className="text-[#0C1F5F91] font-normal dark:text-[#a0b3f3]">
					Hey there,
				</div>
				<div className="font-black text-4xl mb-10 ">Welcome Back</div>
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
					<label
						htmlFor="email"
						className="flex flex-col gap-2 mt-8 "
					>
						Email
						<input
							type="email"
							name="email"
							id="email"
							value={formData.name}
							onChange={handleChange}
							placeholder="Type Here"
							autoComplete="email"
							className="rounded-xl p-3 mb-6 dark:text-black"
							required
						/>
					</label>
					<label htmlFor="password" className="flex flex-col gap-2">
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
								className="rounded-xl p-3 mb-14 w-full dark:text-black"
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
						className="w-full bg-[#0c1f5f] p-3 rounded-xl text-white mb-16 font-bold dark:bg-[#a0b3f3]"
					>
						Log In
					</button>
				</form>
				<Link href="/signup">
					<span className="text-[#5f6180b8] dark:text-[#A0B3F3]">
						First time here?{" "}
					</span>
					<span>Sign up</span>
				</Link>
			</div>
			<div className="w-[60%] hidden lg:block h-[80%] rounded-s-xl border border-[#000000] border-r-0 overflow-hidden ml-16 shadow-[-4px_0px_100px_4px_rgba(0,0,0,0.25)] dark:shadow-[-4px_0px_100px_4px_rgba(255,255,255,0.1)] dark:border-[#ffffff]">
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

		try {
			const res = await axios.post("/v1/tokens/authentication", formData);
			if (res.data && !res.data.activated) {
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
			} else if (res.data && res.data.activated) {
				localStorage.setItem("userEmail", formData.email);
				localStorage.setItem(
					"authToken",
					res.data.authentication_token.token
				);
				login(formData.email, localStorage.token);
				router.replace("/");
				toast.success("Logged In Successfully");
			}
		} catch (err) {
			if (err?.response?.status === 401) {
				toast.error("Incorrect Email/Password");
			} else if (err?.response?.status === 422) {
				toast.error(
					"Email must be valid & Password must be at least 8 chars"
				);
			} else {
				console.log(err);
				toast.error(err?.response?.data?.detail);
			}
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
