import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Landing from "@/components/Landing";
import { Tab } from "@headlessui/react";
import type { GetServerSideProps } from "next";
import { fetchCategories } from "@/utils/fetchCategories";
import { fetchProducts } from "@/utils/fetchProducts";
import Product from "@/components/Product";
import Basket from "@/components/Basket";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { Context } from "react-responsive";

const inter = Inter({ subsets: ["latin"] });

interface Props {
	categories: Category[];
	products: Product[];
	session: Session | null;
}

export default function Home({ categories, products }: Props) {
	const showProducts = (category: number) => {
		return (
			products
				//filter through products.category._ref(category is an array so we need the particular category hence the .ref) and then === categories[category]._id(categories is an array so we need the index which is he category)
				.filter((product) => product.category._ref === categories[category]._id)
				.map((product) => <Product product={product} key={product._id} />)
		);
	};
	return (
		<>
			<main className="min-h-screen overflow-x-hidden">
				<Header />

				<Basket />

				<section className="relative h-[200vh] bg-[#e7ecee]">
					<Landing />
				</section>

				<section className="relative z-40 -mt-[100vh] min-h-screen bg-[#181818]">
					<div className="space-y-10 py-16">
						<h1 className="text-center text-4xl font-medium tracking-wide text-white md:text-5xl">
							New Promos
						</h1>

						<Tab.Group>
							<Tab.List className="flex justify-center">
								{categories.map((category) => (
									<Tab
										key={category._id}
										id={category._id}
										className={({ selected }) =>
											`whitespace-nowrap rounded-t-lg px-5 py-3 text-sm font-light outline-none md:px-6 md:py-4 md:text-base ${
												selected
													? "borderGradient bg-[#35383C] text-white"
													: "border-b-2 border-[#35383C] text-[#747474]"
											}`
										}
									>
										{category.title}
									</Tab>
								))}
							</Tab.List>
							<Tab.Panels className="mx-auto max-w-fit pb-24 pt-10 sm:px-4">
								<Tab.Panel className="tabPanel">{showProducts(0)}</Tab.Panel>
								<Tab.Panel className="tabPanel">{showProducts(1)}</Tab.Panel>
								<Tab.Panel className="tabPanel">{showProducts(2)}</Tab.Panel>
								<Tab.Panel className="tabPanel">{showProducts(3)}</Tab.Panel>
							</Tab.Panels>
						</Tab.Group>
					</div>
				</section>
			</main>
		</>
	);
}

//data fetching on the server side
export const getServerSideProps: GetServerSideProps<Props> = async (
	context
) => {
	const categories = await fetchCategories();
	const products = await fetchProducts();
	//the session from next auth
	const session = await getSession(context);
	return {
		props: {
			categories,
			products,
			session,
		},
	};
};
