export async function loadJson<T>(jsonPath: string): Promise<T> {
    const paths = [jsonPath + ".gz", jsonPath];

    for (const path of paths) {
        const response = await fetch(path);

        if (!response.ok) {
            continue;
        }

        const contentType = response.headers.get("content-type") ?? "";

        if (contentType.includes("application/json")) {
            console.log(`[JSON] loaded ${decodeURIComponent(path)}`);
            return response.json();
        }
    }

    throw new Error("Could not load JSON from " + jsonPath + " (or its .gz variant)");
}