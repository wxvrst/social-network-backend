import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
	createPublicationSchema,
	updatePublicationSchema,
	publicationIdParamSchema,
	publicationAuthorIdParamSchema,
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
	"/by-author-id/:author_id",
	zValidator("param", publicationAuthorIdParamSchema),
	(c) => {
		const { author_id } = c.req.valid("param");
		const publications = getPublicationsByAuthorId(author_id);
		return c.json(publications);
	},
);

publications.get("/:id", zValidator("param", publicationIdParamSchema), (c) => {
	const { id } = c.req.valid("param");
	const publication = getPublicationById(id);
	if (!publication) return c.json({ error: "Publication not found" }, 404);
	return c.json(publication);
});

publications.post("/", zValidator("json", createPublicationSchema), (c) => {
	const data = c.req.valid("json");

	const publication = createPublication(data);
	return c.json(publication, 201);
});

publications.post("/", zValidator("json", createPublicationSchema), (c) => {
	const data = c.req.valid("json");

	const publication = createPublication(data);
	return c.json(publication, 201);
});
export default publications;
