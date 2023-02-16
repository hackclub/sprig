import type { APIRoute } from 'astro'
export const get: APIRoute = ({ redirect }) => redirect('/get', 301)