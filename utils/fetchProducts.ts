export const fetchProducts = async () => {
    const res = await fetch(`http://localhost:3000/api/getProducts`);

    const data = await res.json()
    const products: Product[] = data.products
    console.log(data)

    return products
}