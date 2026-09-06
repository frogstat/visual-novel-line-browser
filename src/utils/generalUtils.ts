export function getFileWithoutExtension(file: string) {
    const extensionIndex = file.lastIndexOf(".");

    if (extensionIndex === -1) {
        return file;
    }

    return file.substring(0, extensionIndex);
}