import { Request, Response } from "express";

interface Params {
    action: string;
    search: string;
    limit: string;
    namespace: string;
    format: string;
}

export const getWiki = async (req: Request, res: Response) => {
    let url = "https://en.wikipedia.org/w/api.php" + "?origin=*";

    const params: Params = {
        action: "opensearch",
        search: "Hampi",
        limit: "5",
        namespace: "0",
        format: "json",
    };

    for (const [key, value] of Object.entries(params)) {
        url += "&" + key + "=" + value;
    }

    console.log("Get Wiki hit " + url);

    let data = await fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    console.log("Wiki Data : " + data)
    res.send(data);
};
