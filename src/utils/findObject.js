export default function findObject(obj, word) {
    const keys = Object.keys(obj);
    let findObj = null;
    for (const key of keys) {
        if (typeof obj[key] === "object") {
            if (key === word) {
                findObj = obj[key];
                return findObj;
            } else {
                const result = findObject(obj[key], word);
                if (result != null) {
                    return result;
                }
            }
        }
    }
    return findObj;
}