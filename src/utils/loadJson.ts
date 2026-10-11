export async function loadJson<T>(jsonPath: string): Promise<T> {
    console.log(`[JSON] loading ${decodeURIComponent(jsonPath)}`);
    const response = await fetch(jsonPath);

    if (!response.ok) {
        throw new Error("Could not load " + jsonPath);
    }
    const contentType: string = response.headers.get("content-type") ?? "";

    //Whenever a json.gz file is loaded, it's automatically served as plain json, so loadGzipJson is more of a precaution.
    if (contentType.includes("application/json")) {
        return response.json();
    } else if (contentType.includes("application/gzip")) {
        return loadGzipJson(response);
    }

    throw new Error(jsonPath + " did not return json. Does it exist?");
}

async function loadGzipJson<T>(response: Response):Promise<T> {
    if (!response.body) {
        throw new Error("Response body is empty");
    }

    const stream = response.body.pipeThrough(
        new DecompressionStream("gzip")
    );

    const text = await new Response(stream).text();

    return JSON.parse(text) as T;
}
