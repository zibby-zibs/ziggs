import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity";
import { BsCart2 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToBasket } from "@/redux/basketSlice";
import toast from "react-hot-toast";

type Props = {
	product: Product;
};

function Product({ product }: Props) {
	const dispatch = useDispatch();
	const addItemToBasket = () => {
		dispatch(addToBasket(product));

		toast.success(`${product.title} added to basket`, {
			position: "bottom-center",
		});
	};
	return (
		<main className="flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl bg-[#35383c] p-8 md:h-[500px] md:w-[400px] md:p-10">
			<figure>
				{product?.image?.length > 0 && (
					<Image
						src={urlFor(product?.image[0]).url()}
						alt=""
						height={0}
						width={0}
						sizes="100vw"
						className="h-64 w-full object-contain md:h-72"
					/>
				)}
			</figure>

			<article className="flex flex-1 items-center justify-between space-x-3">
				<div className="space-y-2 text-xl text-white md:text-2xl">
					<p>{product.title}</p>
					<p>${product.price}</p>
				</div>

				<div
					className="flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[70px] md:w-[70px]"
					onClick={addItemToBasket}
				>
					<BsCart2 className="h-8 w-8 text-white" />
				</div>
			</article>
		</main>
	);
}

export default Product;
