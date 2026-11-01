import type { CreateUserInput, UpdateUserInput, User } from "./users.schemas.js";
//TODO: с добавлением бд переписать
const users: User[] = [
	{
		id: 1,
		name: "Gregor Zamza",
		description: "Frontend developer, Google INC.",
		username: "wxvrst",
		additional: [
			{
				label: "Phone number:",
				value: "+ 7 (999) 999-99-99",
			},
			{
				label: "Email:",
				value: "example@example.com",
			},
			{
				label: "Birthday:",
				value: "January 1, 2000",
			},
			{
				label: "Telegram:",
				value: "@example",
			},
			{
				label: "GitHub:",
				value: "https://github.com/example",
			},
		],
	},
];
let nextId: number = 1;

const getAllUsers = (): User[] => users;

const getUserById = (id: number): User | null => users.find((u) => u.id === id) ?? null;

const getUserByUsername = (username: string): User | null =>
	users.find((u) => u.username === username) ?? null;

const createUser = (data: CreateUserInput): User => {
	const user: User = { id: nextId++, ...data };
	users.push(user);
	return user;
};

const updateUser = (id: number, data: UpdateUserInput): User | null => {
	const user = getUserById(id);
	if (!user) return null;
	Object.assign(user, data);
	return user;
};

const deleteUser = (id: number): boolean => {
	const index = users.findIndex((u) => u.id === id);
	if (index === -1) return false;
	users.splice(index, 1);
	return true;
};

const searchUsers = (search: string): User[] => {
	const q = search.toLowerCase();
	return users.filter(
		(u) => u.username.toLowerCase().includes(q) || u.name.toLowerCase().includes(q),
	);
};

export {
	getAllUsers,
	getUserById,
	getUserByUsername,
	createUser,
	updateUser,
	deleteUser,
	searchUsers,
};
