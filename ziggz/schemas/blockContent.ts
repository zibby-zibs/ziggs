import { defineType, defineField } from 'sanity';

export default {
    title: "Block Content",
    name: "blockContent",
    type: "array",
    of: [
      {
        title: "Block",
        type: "block",
        marks: {
          decorators: [
            { title: "Strong", value: "strong" },
            { title: "Emphasis", value: "em" }
          ],
          annotations: [
            {
              title: "URL",
              name: "link",
              type: "object",
              fields: [
                {
                  title: "URL",
                  name: "href",
                  type: "url"
                }
              ]
            }
          ]
        }
      },
      {
        type: "image",
        options: { hotspot: true }
      }
    ]
  };