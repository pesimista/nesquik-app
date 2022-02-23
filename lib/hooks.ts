import { FirestoreError } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

export function useDocumentDataSSR<T>(ref, options): [T, boolean, FirestoreError] {

  const [value, loading, error] = useDocumentData<T>(ref, options);

  if (options?.startWith && loading) {
    return [options.startWith, loading, error];
  } else {
    return [value, loading, error];
  }
}
