// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sanityClient } from '@/sanity';
import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity';

type Data = {
  products: Product[]
}

const query = groq`*[_type == "products"] {
  _id,
  ...
}`;


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const products = await sanityClient.fetch(query)
  res.status(200).json({products})
}
