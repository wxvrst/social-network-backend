import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import users from "./modules/users/users.routes.js";
import publications from "./modules/publications/publications.routes.js";

import { serveStatic } from "@hono/node-server/serve-static"; // убрать потом

const app = new Hono({ strict: false })
	.use("/static/*", serveStatic({ root: "./src" }))	//убрать потом
	.basePath("/api")
	.route("/users", users)
	.route("/publications", publications);

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
