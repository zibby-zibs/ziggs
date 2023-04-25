import { RiMacbookLine } from "react-icons/ri";
import blockContent from "./blockContent";
import {defineField, defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: "products",
  title: "Product",
  type: "document",
  icon: RiMacbookLine,
  fields: [
    defineField({
        name: "title",
        title: "Title",
        type: "string",
      }),
      defineField( {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      }),
      defineField(
          {
            name: "image",
            title: "Image",
            type: "array",
            of: [{ type: "image" }],
          }
      ),
      defineField(

          {
            name: "category",
            title: "Category",
            type: "reference",
            to: [{ type: "category" }],
          }
      ),
      defineField(

          {
            name: "price",
            title: "Price",
            type: "number",
          }
      ),
      defineField(
          {
            name: "description",
            title: "Description",
            type: "blockContent"
          }
      ),
  ],
});