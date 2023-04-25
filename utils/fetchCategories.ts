export const fetchCategories = async () => {
    const res = await fetch(`http://localhost:3000/api/getCategories`);

    const data = await res.json()
    const categories: Category[] = data.categories
    console.log(data)

    return categories
}