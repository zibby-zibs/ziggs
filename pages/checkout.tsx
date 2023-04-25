import Head from "next/head";
import Header from "../components/Header";
// import { ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useSelector } from "react-redux";
// import Stripe from "stripe";
import Button from "../components/Button";
// import CheckoutProduct from "../components/CheckoutProduct";
import { selectBasketItems, selectBasketTotal } from "../redux/basketSlice";
import CheckoutProduct from "@/components/CheckoutProduct";
import { IoMdArrowDropdown } from "react-icons/io";
import { Stripe } from "stripe";
// import CheckoutProduct from "../components/CheckoutProduct";
import { fetchPostJSON } from "../utils/api-helpers";
import getStripe from "../utils/get-stripejs";
type Props = {};

function Checkout({}: Props) {
	const items = useSelector(selectBasketItems);
	const basketTotal = useSelector(selectBasketTotal);
	const router = useRouter();
	const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
		{} as { [key: string]: Product[] }
	);
	const [loading, setLoading] = useState(false);

	const createCheckoutSession = async () => {
		setLoading(true);

		const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
			"/api/checkout_sessions",
			{
				items: items,
			}
		);
		//internal Server Error
		if ((checkoutSession as any).statusCode === 500) {
			console.error((checkoutSession as any).mesaage);
			return;
		}

		//redirect to checkout
		const stripe = await getStripe();
		const { error } = await stripe!.redirectToCheckout({
			sessionId: checkoutSession.id,
		});

		//If redirectToCheckout fails due to browser
		//or network, warn the customer.
		console.warn(error.message);

		setLoading(false);
	};

	useEffect(() => {
		const groupedItems = items.reduce((results, item) => {
			(results[item._id] = results[item._id] || []).push(item);
			return results;
		}, {} as { [key: string]: Product[] });

		setGroupedItemsInBasket(groupedItems);
	}, [items]);

	return (
		<main className="min-h-screen overflow-hidden bg-[#e7ecee]">
			<Head>
				<title>Bag </title>
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
			</Head>
			<Header />
			<section className="mx-auto max-w-5xl p-24">
				<div className="px-5">
					<h1 className="my-4 text-3xl font-semibold lg:text-4xl">
						{items.length > 0 ? "Review your bag" : "Your bag is empty"}
					</h1>
					<p className="my-4">Free delivery and return</p>

					{items.length === 0 && (
						<Button
							title="Continue Shopping"
							onClick={() => router.push("/")}
						/>
					)}

					{items.length > 0 && (
						<aside className="mx-5 md:mx-8">
							{Object.entries(groupedItemsInBasket).map(([key, items]) => (
								<CheckoutProduct key={key} items={items} id={key} />
							))}

							<div className="my-12 ml-auto mt-6 max-w-3xl">
								<div className="divide-y divide-gray-300">
									<div className="pb-4">
										<div className="flex justify-between">
											<p>Subtotal</p>
											<p>
												<CurrencyInput
													value={basketTotal}
													intlConfig={{ locale: "en-US", currency: "USD" }}
													disabled
													className=""
												/>
											</p>
										</div>
										<div className="flex justify-between">
											<p>Shipping</p>
											<p>FREE</p>
										</div>
										<div className="flex justify-between">
											<div className="flex flex-col gap-x-1 lg:flex-row">
												Estimated tax for:{" "}
												<p className="hover:undeline flex cursor-pointer items-end text-blue-500">
													Enter Zip Code
													<IoMdArrowDropdown className="h-6 w-6" />
												</p>
											</div>
											<p>$ -</p>
										</div>
									</div>

									<div className="flex justify-between pt-4 text-4xl font-semibold">
										<h4>Total</h4>
										<h4>
											<CurrencyInput
												value={basketTotal}
												intlConfig={{ locale: "en-US", currency: "USD" }}
												disabled
												className="w-32"
											/>
										</h4>
									</div>
								</div>
								<div className="my-14 space-y-4">
									<h4 className="font-body text-xl">
										How would you like to checkout?
									</h4>
									<div className="flex flex-col gap-4 md:flex-row">
										<div className="order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center">
											<h4 className="mb-4 flex flex-col text-xl font-semibold">
												<span>Pay Monthly</span>
												<span>with Apple Card</span>
												<span>
													$283.16/mo. at 0% APR <sup className="-top-1">0</sup>
												</span>
											</h4>
											<Button title="Check Out with Apple Card Monthly Installments" />
											<p className="mt-2 max-w-[240px] text-[13px]">
												$0.00 due today, which includes applicable full-price
												items, down payments, shipping, and taxes.
											</p>
										</div>

										<div className="flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2">
											<h4 className="mb-4 flex flex-col text-xl font-semibold">
												Pay in full
												<span>
													<CurrencyInput
														value={basketTotal}
														intlConfig={{ locale: "en-US", currency: "USD" }}
														disabled
														className="w-32"
													/>
												</span>
											</h4>

											<Button
												noIcon
												title="Check Out"
												width="w-full"
												onClick={createCheckoutSession}
											/>
										</div>
									</div>
								</div>
							</div>
						</aside>
					)}
				</div>
			</section>
		</main>
	);
}

export default Checkout;
