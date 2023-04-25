import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity";
import { IoMdArrowDropdown } from "react-icons/io";
import CurrencyInput from "react-currency-input-field";
import { removeFromBasket } from "@/redux/basketSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

type Props = {
	items: Product[];
	id: string;
};

function CheckoutProduct({ items, id }: Props) {
	const dispatch = useDispatch();
	const removeItemFromBasket = () => {
		dispatch(removeFromBasket({ id }));

		toast.error(`${items[0].title} removed from basket`, {
			position: "bottom-center",
		});
	};
	return (
		<main className="flex flex-col gap-x-4 border-b border-gray-300 pb-5 lg:flex-row">
			<figure className="">
				<Image
					src={urlFor(items[0].image[0]).url()}
					alt=""
					height={0}
					width={0}
					sizes="100vw"
					className="h-44 w-44 object-contain"
				/>
			</figure>

			<article className="flex flex-1 items-end lg:items-center">
				<div className="flex-1 space-y-4">
					<div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
						<h4 className="font-semibold lg:w-96">{items[0].title}</h4>
						<p className="flex items-end gap-x-1 font-semibold">
							{items.length}
						</p>
					</div>

					<p className="flex cursor-pointer items-end text-blue-500 hover:underline">
						show product details
						<IoMdArrowDropdown className="h-6 w-6" />
					</p>
				</div>

				<div className="flex flex-col items-start lg:items-center">
					<h4 className="flex justify-end text-xl font-semibold lg:text-2xl">
						<CurrencyInput
							value={items.reduce((total, item) => total + item.price, 0)}
							intlConfig={{ locale: "en-US", currency: "USD" }}
							disabled
							className="w-24"
						/>
					</h4>
					<button
						onClick={removeItemFromBasket}
						className="text-blue-500 hover:underline"
					>
						Remove
					</button>
				</div>
			</article>
		</main>
	);
}

export default CheckoutProduct;
