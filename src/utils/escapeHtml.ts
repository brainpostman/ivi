export function escapeHtmlNbsp(str: string): string {
    return str.replaceAll('&nbsp;', ' ');
}
