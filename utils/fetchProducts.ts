export const fetchProducts = async () => {
    const res = await fetch(`https://ziggs.vercel.app/api/getProducts`);

    const data = await res.json()
    const products: Product[] = data.products
    console.log(data)

    return products
}