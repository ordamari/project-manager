import StorageKey from "../types/storage-key.type";

class StorageService {
        public static get<T>(key: StorageKey) {
            if (typeof window === 'undefined') return undefined;
            const stringItem = localStorage.getItem(key);
            if (!stringItem) return null;
            const item = JSON.parse(stringItem);
            return item as T;
        }

        public static set<T>(key: StorageKey, value: T) {
            if (typeof window === 'undefined') throw new Error('Server side rendering is not supported');
            if (!value) return;
            const stringItem = JSON.stringify(value);
            localStorage.setItem(key, stringItem);
        }
}

export default StorageService
