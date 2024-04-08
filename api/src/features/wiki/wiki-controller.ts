import { Request, Response } from "express";

interface Params {
    action?: string;
    list?: string;
    format?: string;

    namespace?: string;
    rnnamespace?: string;
    grnnamespace?: string;

    limit?: string;
    rnlimit?: string;
    grnlimit?: string;

    search?: string;

    generator?: string;
    prop?: string;
    rvprop?: string;
    grvprop?: string;
}

interface wikiData {
    title: string;
    pageid: number;
    extract: string;
}

interface wikiResponse {}

export const getWiki = async (req: Request, res: Response) => {
    try {
        const url = "https://en.wikipedia.org/api/rest_v1/page/random/summary";
        console.log("Get Wiki hit " + url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch wiki data");
        }
        console.log(response);

        return res.status(200).json(await response.json());
    } catch (error) {
        console.log("ERROR" + error);
    }
};
