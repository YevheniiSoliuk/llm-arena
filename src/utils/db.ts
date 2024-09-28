import { firestore } from "@/providers/firebase";
import { Model } from "@/types";
import { collection, doc, limit, PartialWithFieldValue, query, QueryDocumentSnapshot } from "firebase/firestore";

const converter = <T>() => ({
  toFirestore: (data: PartialWithFieldValue<T>) => data ?? {},
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

const dataPoint = <T>(collectionPath: string) => collection(firestore, collectionPath).withConverter(converter<T>());

const db = {
  models: query(dataPoint<Model>("models"), limit(10)),
  model: (id: string) => doc(dataPoint<Model>("models"), id),
};

export { db };
