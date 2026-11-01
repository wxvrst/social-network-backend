import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import users from "./modules/users/users.routes.js";

const app = new Hono().basePath("api").route("/user", users);

// app.use("/test/*", bearerAuth({ token: "1234" }));

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
