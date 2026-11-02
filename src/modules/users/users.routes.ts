import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
	createUserSchema,
	updateUserSchema,
	userIdParamSchema,
	userUsernameParamSchema,
	listUsersQuerySchema,
} from "./users.schemas.js";

import {
	getAllUsers,
	getUserById,
	getUserByUsername,
	createUser,
	updateUser,
	deleteUser,
	searchUsers,
} from "./users.service.js";

const users = new Hono();

users.get("/", zValidator("query", listUsersQuerySchema), (c) => {
	const { search } = c.req.valid("query");
	return c.json(search ? searchUsers(search) : getAllUsers());
});

users.get("/by-username/:username", zValidator("param", userUsernameParamSchema), (c) => {
	const { username } = c.req.valid("param");
	const user = getUserByUsername(username);
	if (!user) return c.json({ error: "User not found" }, 404);
	return c.json(user);
});

users.get("/:id", zValidator("param", userIdParamSchema), (c) => {
	const { id } = c.req.valid("param");
	const user = getUserById(id);
	if (!user) return c.json({ error: "User not found" }, 404);
	return c.json(user);
});

users.post("/", zValidator("json", createUserSchema), (c) => {
	const data = c.req.valid("json");

	if (getUserByUsername(data.username)) {
		return c.json({ error: "Username is already taken" }, 409);
	}

	const user = createUser(data);
	return c.json(user, 201);
});

users.patch(
	"/:id",
	zValidator("param", userIdParamSchema),
	zValidator("json", updateUserSchema),
	(c) => {
		const { id } = c.req.valid("param");
		const data = c.req.valid("json");

		if (data.username) {
			const existing = getUserByUsername(data.username);
			if (existing && existing.id !== id) {
				return c.json({ error: "Username is already taken" }, 409);
			}
		}

		const updated = updateUser(id, data);
		if (!updated) return c.json({ error: "User not found" }, 404);
		return c.json(updated);
	},
);

users.delete("/:id", zValidator("param", userIdParamSchema), (c) => {
	const { id } = c.req.valid("param");
	const ok = deleteUser(id);
	if (!ok) return c.json({ error: "User not found" }, 404);
	return c.json({ ok: true });
});

export default users;
