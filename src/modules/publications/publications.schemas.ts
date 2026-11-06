import { z } from "zod";

export const createPublicationSchema = z.object({
	author_id: z.coerce.number().positive(), //TODO: убрать после auth
	description: z.string().trim().min(1, "Empty description").max(200),
	image: z.string().trim().min(1, "Empty string").max(500).optional(),
});

export const updatePublicationSchema = createPublicationSchema.omit({ author_id: true }).partial();

export const publicationSchema = createPublicationSchema.extend({
	id: z.number().int().positive(),
	date_added: z.string(),
});

export const publicationIdParamSchema = z.object({
	id: z.coerce.number().int().positive(),
});

export const publicationAuthorIdParamSchema = z.object({
	author_id: z.number().int().positive(),
});

export const listPublicationsQuerySchema = z.object({
	search: z.string().trim().min(1).max(100).optional(),
});

export type CreatePublicationInput = z.infer<typeof createPublicationSchema>;
export type UpdatePublicationInput = z.infer<typeof updatePublicationSchema>;
export type Publication = z.infer<typeof publicationSchema>;
