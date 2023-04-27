export const fetchCategories = async () => {
    const res = await fetch(`https://ziggs.vercel.app/api/getCategories`);

    const data = await res.json()
    const categories: Category[] = data.categories
    console.log(data)

    return categories
}