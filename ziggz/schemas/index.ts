import blockContent from './blockContent'
import category from './category'
import productss from './productss'
import { user, account } from 'next-auth-sanity/schemas';
export default [blockContent, /* other types here */];

export const schemaTypes = [user, account,productss, category, blockContent]
