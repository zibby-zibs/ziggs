import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsSearch, BsBag } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { useSelector } from "react-redux";
import { selectBasketItems } from "@/redux/basketSlice";
import { signIn, signOut, useSession } from "next-auth/react";

type Props = {};

function Header({}: Props) {
	const { data: session } = useSession();
	const items = useSelector(selectBasketItems);
	return (
		<header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#e7ecee] p-4">
			<div className="md: flex items-center justify-center md:w-1/5">
				<Link href="/">
					<aside className="h-18 relative w-5 cursor-pointer opacity-75 transition hover:opacity-100">
						<img
							src="https://rb.gy/vsvv2o"
							alt=""
							height={0}
							width={0}
							sizes="100vw"
							className="h-18 w-5 object-contain"
						/>
					</aside>
				</Link>
			</div>
			<aside className="hidden flex-1 items-center justify-center space-x-8 md:flex">
				<a className="headerLink">Product</a>
				<a className="headerLink">Explore</a>
				<a className="headerLink">Support</a>
				<a className="headerLink">Business</a>
			</aside>
			<aside className="md:w-1/ flex items-center justify-center gap-x-4 md:w-1/5">
				<BsSearch className="headerIcon" />
				<Link href="/checkout">
					<div className="relative cursor-pointer">
						{items.length > 0 && (
							<span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
								{items.length}
							</span>
						)}
						<BsBag className="headerIcon" />
					</div>
				</Link>
				{session ? (
					<img
						src={
							session?.user?.image ||
							"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
						}
						alt=""
						className="h-8 w-8 cursor-pointer rounded-full"
						onClick={() => signOut}
					/>
				) : (
					<BiUser
						className="headerIcon"
						onClick={(e) => {
							e.preventDefault();
							signIn();
						}}
					/>
				)}
			</aside>
		</header>
	);
}

export default Header;
