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

export const getWiki = async (req: Request, res: Response) => {
    try {
        const url = "https://en.wikipedia.org/api/rest_v1/page/random/summary";
        console.log("Get Wiki hit " + url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch wiki data");
        }
        const rawData = await response.json();
        const cleanedData = cleanWikiData(rawData);
        console.log(cleanedData);
        return res.status(200).json(cleanedData);
    } catch (error) {
        console.log("ERROR" + error);
    }
};

export const cleanWikiData = (data: wikiData): wikiData => {
    return {
        title: data.title,
        pageid: data.pageid,
        extract: data.extract,
    };
};
