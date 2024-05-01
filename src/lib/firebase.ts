import metrics from "../../metrics";
import { FieldPath, getFirestore, WhereFilterOp } from 'firebase-admin/firestore'
import { lazy } from "./utils/lazy";
import { initializeApp } from "firebase-admin/app";
import admin from 'firebase-admin'

const app = lazy(() => {
	if (admin.apps.length === 0) {
		return initializeApp({
			credential: admin.credential.cert(JSON.parse(Buffer.from(import.meta.env.FIREBASE_CREDENTIAL, 'base64').toString()))
		})
	} else {
		return admin.apps[0]!
	}
})

export const firestore = lazy(() => {
	const firestore = getFirestore(app)
	try {
		firestore.settings({ preferRest: true })
	} catch (error) {
		// Catch cursed "Firestore has already been initialized" error
		// console.error(error)
	}
	return firestore
})

const timedOperation = async (metricKey: string, callback: Function) => {
	const startTime = new Date().getTime();
	const result = await callback();
	const endTime = (new Date().getTime()) - startTime;

	metrics.timing(metricKey, endTime);
	return result;
}

export const deleteDocument = async (path: string, documentId: string): Promise<void> => {
	const metricKey = "database.delete";
	try {
		await timedOperation(metricKey, async () => await firestore.collection(path).doc(documentId).delete());

		metrics.increment(`${metricKey}.success`, 1);
	} catch (error) {
		console.error(`Failed to delete ${documentId}: `, error);
		metrics.increment(`${metricKey}.error`, 1);
	}
}

export const addDocument = async (path: string, fields: any): Promise<admin.firestore.DocumentReference<admin.firestore.DocumentData>> => {
	const metricKey = "database.add";
	try {
		const data = await timedOperation(metricKey, async () => await firestore.collection(path).add(fields));

		metrics.increment(`${metricKey}.success`, 1);
		return data;
	} catch (error) {
		console.error(`Failed to add document into ${path}: `, error);
		metrics.increment(`${metricKey}.error`, 1);
	}
	return {} as any;
}

export const getDocument = async (path: string, documentId: string): Promise<admin.firestore.DocumentSnapshot<admin.firestore.DocumentData>> => {
	const metricKey = "database.get";
	try {
		const data = await timedOperation(metricKey, async () => await firestore.collection(path).doc(documentId).get());

		metrics.increment(`${metricKey}.success`, 1);
		return data;
	} catch (error) {
		console.error(`Failed to get document ${documentId}: `, error);
		metrics.increment(`${metricKey}.error`, 1);
	}
	return {} as any;
}

export const updateDocument = async (path: string, documentId: string, fields: any): Promise<void> => {
	const metricKey = "database.update";
	try {
		await timedOperation(metricKey, async () => await firestore.collection(path).doc(documentId).update(fields));

		metrics.increment(`${metricKey}.success`, 1);
	} catch (error) {
		console.error(`Failed to update ${documentId}: `, error);
		metrics.increment(`${metricKey}.error`, 1);
	}
}

export const setDocument = async (path: string, documentId: string, fields: any): Promise<void> => {
	const metricKey = "database.set";
	try {
		await timedOperation(metricKey, async () => await firestore.collection(path).doc(documentId).set(fields));

		metrics.increment(`${metricKey}.success`, 1);
	} catch (error) {
		console.error(`Failed to set document ${documentId}: `, error);
		metrics.increment(`${metricKey}.error`, 1);
	}
}

type WhereQuery = [string | FieldPath, WhereFilterOp, string];
type WhereParam = string | WhereQuery;
export const findDocument = async (path: string, where: WhereParam[] | [WhereParam, WhereFilterOp, WhereParam], limit: number = 1): Promise<any> => {
	const metricKey = "database.find";
	try {
		let collection: any = firestore.collection(path);
		if (typeof where[0] === 'object') {
			for (let condition of where) {
				collection = collection.where(condition[0], condition[1], condition[2]);
			}
		} else {
			collection = collection.where(where[0], where[1], where[2]);
		}

		const data = await timedOperation(metricKey, async () => await collection.limit(limit).get());

		metrics.increment(`${metricKey}.success`, 1);
		return data;
	} catch (error) {
		console.error(`Failed to find: `, error);
		metrics.increment(`${metricKey}.error`, 1);
		return {};
	}
}