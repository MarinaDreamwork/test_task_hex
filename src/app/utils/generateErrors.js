export function generateError(message) {
    switch (message) {
        case 'Network Error':
            return 'Network problem. Please try again later';
        default:
            return 'Error server. Please try later';
    }
}