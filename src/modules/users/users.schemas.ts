import { z } from "zod";

const additionalItemSchema = z.object({
	label: z.string(),
	value: z.string(),
});

export const createUserSchema = z.object({
	username: z.string().min(3, "3 symbols min").max(30, "30 symbols maximum"),
	name: z.string().min(2, "2 symbols min").max(20, "20 symbols maximum"),
	description: z.string().optional(),
	avatar: z.string().optional(), //.default() поставить заглушку, или на фронте
	additional: z.array(additionalItemSchema).optional(),
});

export const updateUserSchema = createUserSchema.partial();

export const userSchema = createUserSchema.extend({
	id: z.number().int().positive(),
});

export const userIdParamSchema = z.object({
	id: z.coerce.number().int().positive(),
});

export const userUsernameParamSchema = z.object({
	username: z.string().trim().min(3, "3 symbols min").max(30, "30 symbols maximum"),
});

export const listUsersQuerySchema = z.object({
	search: z.string().trim().min(1).max(30).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type User = z.infer<typeof userSchema>;
