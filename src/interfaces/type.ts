export interface Province {
    code: string;
    name: string;
    englishName: string;
    administrativeLevel: string;
    decree: string;
    communes?: Commune[]
}
export interface Commune {
    code: string;
    name: string;
}

export interface ApiResponse {
    requestId: string;
    provinces: Province[];
}
