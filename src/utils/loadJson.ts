export async function loadJson<T>(jsonPath: string): Promise<T | null> {

    const response = await fetch(jsonPath);

    if (!response.ok) {
        console.error("Could not load " + jsonPath);
        return null
    }
    const contentType: string = response.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
        console.error(jsonPath + " did not return json. Does it exist?");
        return null
    }
    return await response.json();
}