import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();
app.use("*", prettyJSON());

const api = new Hono().basePath("/api");

api.get("/:id", (c) => {
	const id = c.req.param("id");

	return c.json({
		id: id,
	});
});

app.route("/", api);

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
