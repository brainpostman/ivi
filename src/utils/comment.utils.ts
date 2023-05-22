export function validateComment(minLength: number, maxLength: number, comment: string): boolean {
    if (comment.length < minLength || comment.length > maxLength) {
        return false;
    } else {
        return true;
    }
}

export function trimComment(comment: string) {
    return comment.replace(/\s+/g, ' ').trim();
}
