interface Category{
    _id: string;
    _createdAt: string;
    _rev: string;
    _updatedAt: string;
    _type: "category";
    slug: {
        _type: "slug";
        current: string;
    };
    title: string;
}

interface Product{
    _id: string;
    _createdAt: string;
    _rev: string;
    _updatedAt: string;
    _type: "products";
    title: string;
    price: number;
    slug: {
        _type: "slug";
        current: string;
    };
    description: string;
    category: {
        _type: "reference";
        _ref: string;
    };
    image: Image[];
}


interface Image{
    url: any;
    _key: string;
    _type: "image";
    asset: {
      url: string;
      _ref: string;
      _type: "reference";
    };
}

interface StripeProduct {
    id: string;
    amount_discount: number;
    amount_subtotal: number;
    amount_tax: number;
    amount_total: number;
    currency: string;
    description: string;
    object: string;
    quantity: number;
    price: {
      unit_amount: number;
    };
}