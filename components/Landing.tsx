import Image from "next/image";
import React from "react";
import Button from "./Button";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";

type Props = {};

function Landing({}: Props) {
	const { scrollY } = useScroll();
	const scroll1 = useTransform(scrollY, [0, 1000], ["0vw", "-30vw"]);
	const scroll2 = useTransform(scrollY, [0, 1000], ["0vw", "30vw"]);

	return (
		<main className="sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-between px-8">
			<motion.article className="space-y-8" style={{ x: scroll1 }}>
				<h1 className="space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl">
					<span className="block bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
						Powered
					</span>
					<span className="block">By Intellect</span>
					<span className="block">Driven By Values</span>
				</h1>

				<div className="space-x-3">
					<Button title="Buy Now" />
					<a className="link">Learn More</a>
				</div>
			</motion.article>

			<motion.aside
				className="relative hidden h-[450px] w-[450px] transition-all duration-200 md:inline lg:h-[650px] lg:w-[600px]"
				style={{ x: scroll2 }}
			>
				<Image
					src="/iphone.png"
					alt=""
					height={0}
					width={0}
					sizes="100vw"
					className="h-auto w-auto object-contain"
				/>
			</motion.aside>
		</main>
	);
}

export default Landing;
