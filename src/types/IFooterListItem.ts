export interface IFooterListItem {
    linkType: LinkType;
    url: string;
    text: string;
}

export type LinkType = 'internal' | 'external';
