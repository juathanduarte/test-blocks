export interface IDetail {
	id: string;
	name: string;
	locale: string;
	createdAt: string;
	updatedAt: string | null;
}

export interface IProductDetails {
	id: string;
	description: string;
	locale: string;
	name: string;
	rfaFile: string;
	slug: string;
	createdAt: string;
	updatedAt: string | null;
}

export interface IFinish {
	id: string;
	isColor: boolean;
	detail: IDetail;
	createdAt: string;
	updatedAt: string | null;
}

export interface ICollectionDetails {
	id: string;
	name: string;
	description: string;
	locale: string;
	slug: string;
	updatedAt: string;
	createdAt: string;
}

export interface ICollection {
	id: string;
	createdAt: string;
	details: ICollectionDetails;
	updatedAt: string;
	scheduledDate: null;
	status: string;
	releasedAt: null;
	pinnedAt: null;
	isNew: boolean;
	familiesCount: null;
}

export interface IBrand {
	id: string;
	name: string;
	description: string | null;
	website: string | null;
	country: string | null;
	slug: string;
	createdAt: string;
}

export interface IStyle {
	id: string;
	detail: IDetail;
	createdAt: string;
	updatedAt: string | null;
}

export interface IProduct {
	id: string;
	isPremium: boolean;
	isHighlighted: boolean;
	revitVersion: string;
	isSaved: boolean;
	isActive: boolean;
	createdAt: string;
	updatedAt: string | null;
	releasedAt: string | null;
	scheduledDate: null;
	details: IProductDetails;
	finishes: IFinish[];
	collection: ICollection;
	brand: IBrand;
	isNew: boolean;
	stickers: unknown[];
	styles: IStyle[];
}

export interface IApiResponse {
	families: IProduct[];
	total: number;
}
