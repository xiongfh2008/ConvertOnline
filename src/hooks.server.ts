import type { Handle, HandleHttpError } from "@sveltejs/kit";
import { paraglideMiddleware } from "$lib/paraglide/server";

// creating a handle to use the paraglide middleware
const paraglideHandle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(
		event.request,
		({ request: localizedRequest, locale }) => {
			event.request = localizedRequest;
			return resolve(event, {
				transformPageChunk: ({ html }) => {
					return html.replace("%lang%", locale);
				},
			});
		},
	);

export const handle: Handle = paraglideHandle;

// Handle HTTP errors during prerendering
export const handleHttpError: HandleHttpError = ({ error, event }) => {
	// Ignore 404 errors for static assets during prerender
	if (error.status === 404 && event.url.pathname.startsWith("/")) {
		console.warn(`Ignoring 404 for ${event.url.pathname} during prerender`);
		return { message: "" };
	}
	// For other errors, return undefined to use default handling
	return undefined;
};
