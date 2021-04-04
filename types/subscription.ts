export interface Credentials {
    client_secret: string;
    client_id: string;
    project_id: string;
    auth_uri: string;
    token_uri: string;
}

interface ResourceId {
    kind: string;
    channelId: string;
}

interface ThumbnailUrl {
    url: string;
}

interface Thumbnails {
    default: ThumbnailUrl;
    medium: ThumbnailUrl;
    high: ThumbnailUrl;
}

interface Snippet {
    publishedAt: string;
    title: string;
    description: string;
    channelId: string;
    resourceId: ResourceId;
    thumbnails: Thumbnails;
}

export interface Subscription {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
}