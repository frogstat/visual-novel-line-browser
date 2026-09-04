export async function loadJson(jsonPath: string) {
    const response = await fetch(jsonPath);

    if (!response.ok) {
        throw new Error("Could not load json");
    }
    const contentType:string = response.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
        throw new Error("Request did not return json");
    }

    return await response.json();
}