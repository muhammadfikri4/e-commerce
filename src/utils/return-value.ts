export const ReturnValue = <T = unknown>(data: T) => {
    if (typeof data !== 'undefined' && data !== null) {
        return data
    }
    return undefined
}