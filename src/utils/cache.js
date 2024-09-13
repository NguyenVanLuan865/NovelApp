const cache = {
    chapters: {},
    chapterLists: {},
    novels: {},
};


export const setCache = (key, data, expirationTime = 1800) => {
    const now = Date.now();
    cache[key] = {
        data,
        expirationTime: now + expirationTime * 1000,
    };
};


export const getCache = (key) => {
    const cachedItem = cache[key];
    if (cachedItem) {
        const now = Date.now();
        if (now < cachedItem.expirationTime) {
            return cachedItem.data;
        } else {
            delete cache[key];
        }
    }
    return null;
};


export const clearCache = () => {
    Object.keys(cache).forEach((key) => {
        delete cache[key];
    });
};

export const removeCache = (key) => {
    if (cache[key]) {
        delete cache[key];
    }
};


export const cleanupCache = () => {
    const now = Date.now();
    Object.keys(cache).forEach((key) => {
        const cachedItem = cache[key];
        if (cachedItem.expirationTime && now >= cachedItem.expirationTime) {
            delete cache[key];
        }
    });
};


setInterval(cleanupCache, 60000);