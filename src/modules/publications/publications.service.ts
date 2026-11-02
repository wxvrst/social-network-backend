import type {
	CreatePublicationInput,
	UpdatePublicationInput,
	Publication,
} from "./publications.schemas.js";

const publications: Publication[] = [
	{
		id: 10,
		author_id: 10,
		description: "description1",
		// image: "https://placehold.co/800x600",
		image: "http://localhost:3000/static/frog.jpg",
		date_added: new Date().toISOString(),
	},
	{
		id: 11,
		author_id: 10,
		description: "description2",
		image: "http://localhost:3000/static/frog.jpg",
		date_added: "18.20.2023",
	},
];

let nextId: number = 1;

const getAllPublications = (): Publication[] => publications;

const getPublicationsByAuthorId = (id: number): Publication[] =>
	publications.filter((p) => p.author_id === id);

const getPublicationById = (id: number): Publication | null =>
	publications.find((p) => p.id === id) ?? null;

const createPublication = (data: CreatePublicationInput): Publication => {
	const publication: Publication = {
		id: nextId++,
		date_added: new Date().toISOString(),
		...data,
	};
	publications.push(publication);
	return publication;
};

const updatePublication = (id: number, data: UpdatePublicationInput): Publication | null => {
	const publication = getPublicationById(id);
	if (!publication) return null;
	Object.assign(publication, data);
	return publication;
};

const deletePublication = (id: number): boolean => {
	const index = publications.findIndex((p) => p.id === id);
	if (index === -1) return false;
	publications.splice(index, 1);
	return true;
};

const searchPublications = (search: string): Publication[] => {
	const q = search.toLowerCase();
	return publications.filter((p) => p.description.toLowerCase().includes(q));
	//TODO: дописать поиск по имени или юзу автора, и соответственно переписать его тип
};
export {
	getAllPublications,
	getPublicationsByAuthorId,
	getPublicationById,
	createPublication,
	updatePublication,
	deletePublication,
	searchPublications,
};
