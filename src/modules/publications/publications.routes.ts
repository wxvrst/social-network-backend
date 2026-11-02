import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
	createPublicationSchema,
	updatePublicationSchema,
	publicationIdParamSchema,
	publicationAuhtorIdParamSchema,
	listPublicationsQuerySchema,
} from "./publications.schemas.js";

import {
	getAllPublications,
	getPublicationsByAuthorId,
	getPublicationById,
	createPublication,
	updatePublication,
	deletePublication,
	searchPublications,
} from "./publications.service.js";

const publications = new Hono();

publications.get("/", zValidator("query", listPublicationsQuerySchema), (c) => {
	const { search } = c.req.valid("query");
	return c.json(search ? searchPublications(search) : getAllPublications());
});

publications.get(
	"/by-author-id/:id",
	zValidator("param", publicationAuhtorIdParamSchema),
	(c) => {
		const { author_id } = c.req.valid("param");
		const publications = getPublicationsByAuthorId(author_id);
		if (!publications) return c.json({ error: "Publications not found" }, 404); //TODO length?
		return c.json(publications);
	},
);

//TODO: дописать get

publications.post("/", zValidator("json", createPublicationSchema), (c) => {
	const data = c.req.valid("json");

	const publication = createPublication(data);
	return c.json(publication, 201);
});
export default publications;
