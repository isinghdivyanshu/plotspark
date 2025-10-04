"use client";

import { useState } from "react";
import axios from "@/app/axios";
import { useStore } from "@/app/store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EmailIcon from "@mui/icons-material/Email";

export default function Activation() {
	const router = useRouter();
	const { email } = useStore();

	const [token, setToken] = useState("");
	const [loading, setLoading] = useState("false");

	return (
		<div className="flex flex-col w-screen h-screen bg-gradient-to-r from-[#FFEFD7] to-[#FFD7C8]  text-[#484848] justify-center items-center p-5 text-center dark:bg-none dark:bg-[#1A1D28] dark:text-[#DEE4F7]">
			<div className="flex gap-5 justify-center items-center absolute top-10 left-5 lg:left-24">
				<ArrowBackIosIcon
					className=" hover:cursor-pointer hover:scale-110"
					onClick={() => {
						router.push("/login");
					}}
				/>
				{loading === "true" ? (
					<div className="border-b-8 rounded-full border-[#D31D8A] bg-[#37B94D] animate-spin w-4 h-4"></div>
				) : null}
			</div>
			<EmailIcon className="text-6xl text-[#0C1F5F] mb-5 dark:text-[#A0B3F3]" />
			<p className="text-4xl font-bold my-5">Please Verify your email</p>
			<p className="text-lg">You’re almost there! We sent an email to</p>
			<p className="text-2xl font-semibold mb-5">{email}</p>
			<p className="my-5 w-1/2 text-lg">
				Just click on the link in that email to complete your signup. If
				you don’t see it, you may need to{" "}
				<span className="font-semibold">check your spam</span> folder.
			</p>
			<form
				onSubmit={async (e) => {
					e.preventDefault();

					setLoading("true");
					try {
						const res = await axios.put("v1/users/activated", {
							token: token,
						});
						if (res.data.User.activated) {
							toast.success(
								"Activation Successful. Login Again."
							);
							router.replace("/login");
						}
					} catch (err) {
						toast.error("Invalid Token");
						console.log(err);
						setToken("");
						setLoading("false");
					}
				}}
				className="flex flex-wrap gap-5 justify-center items-center m-7"
			>
				<input
					type="text"
					value={token}
					onChange={(e) => {
						setToken(e.target.value);
					}}
					placeholder="Activation Token Here"
					maxLength={6}
					minLength={6}
					className="rounded-md p-2 outline-none text-black"
					required
				></input>
				<button
					type="submit"
					className="py-2 px-7 bg-[#0C1F5F] rounded-md text-white font-medium text-base  dark:bg-[#A0B3F3] disabled:cursor-progress disabled:opacity-50"
					disabled={loading === "true"}
				>
					Submit Token
				</button>
			</form>
			<p className="mt-7 mb-3 text-sm">
				Still can’t find the email? No problem.
			</p>
			<button
				className="py-2 px-7 bg-[#0C1F5F] rounded-md text-white font-medium text-base dark:bg-[#A0B3F3] disabled:cursor-progress disabled:opacity-50"
				onClick={async () => {
					setLoading("true");
					try {
						const response = await axios.post(
							"/v1/tokens/activation",
							{
								email: email,
							}
						);
						if (response.data.message) {
							toast.info("Resent Verification Email.");
							setLoading("false");
						}
					} catch (err) {
						toast.error("Error Resending Verification Email.");
						setLoading("false");
						console.log(err);
					}
				}}
				disabled={loading === "true"}
			>
				Resend Verification Mail
			</button>
		</div>
	);
}
