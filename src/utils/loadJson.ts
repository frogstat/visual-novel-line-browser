export async function loadJson<T>(jsonPath: string):Promise<T> {
    const response = await fetch(jsonPath);

    if (!response.ok) {
        throw new Error("Could not load " + jsonPath);
    }
    const contentType:string = response.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
        throw new Error(jsonPath + " did not return json. Does it exist?");
    }

    return await response.json();
}