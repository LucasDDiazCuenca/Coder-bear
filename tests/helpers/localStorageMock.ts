const localStorageMock = (() => {
    let store: { [key: string]: string } = {};

    const localStorageInstance: Storage = {
        getItem: function (key: string) {
            return store[key] || null;
        },
        get: function () {
            return store
        },
        setItem: function (key: string, value: string) {
            store[key] = value;
        },
        removeItem: function (key: string) {
            delete store[key];
        },
        clear: function () {
            store = {};
        },
        key: function (index: number) {
            return Object.keys(store)[index] || null;
        },
        get length() {
            return Object.keys(store).length;
        }
    };

    return localStorageInstance;
})();

export default localStorageMock;