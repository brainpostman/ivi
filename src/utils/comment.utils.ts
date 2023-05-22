export function validateComment(minLength: number, comment: string) {
    if (comment.length > minLength) {
        return true;
    } else return false;
}

export function trimComment(comment: string) {
    return comment.replace(/\s+/g, ' ').trim();
}
