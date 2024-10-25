export function add(numbers: string): number {
    if (numbers === "") return 0; // Handle empty string case

    const delimiter = getDelimiter(numbers); // Get the delimiter
    const numberString = getNumberString(numbers); // Get the number string after delimiter line

    // Split the numbers using the specified delimiter and newlines
    const numberArray = numberString
        .split(new RegExp(`[${delimiter}\\n]`)) // Split by delimiter and newlines
        .map(num => Number(num)) // Convert to numbers
        .filter(num => !isNaN(num)); // Filter out NaN values

    const negativeNumbers = numberArray.filter(num => num < 0);
    if (negativeNumbers.length > 0) {
        throw new Error("negative numbers not allowed: " + negativeNumbers.join(", "));
    }

    return numberArray.reduce((sum, num) => sum + num, 0); // Return the sum
}

function getDelimiter(input: string): string {
    const firstLineEndIndex = input.indexOf("\n");
    if (firstLineEndIndex === -1) return ","; // Default delimiter

    const firstLine = input.substring(0, firstLineEndIndex);
    if (firstLine.startsWith("//")) {
        // Support for custom delimiters in the format "//[delimiter]"
        const customDelimiterMatch = firstLine.match(/\/\/(.*?)\n/);
        if (customDelimiterMatch) {
            const delimiters = customDelimiterMatch[1].split(/[\[\]]+/).filter(Boolean);
            return delimiters.join('|'); // Join multiple delimiters with '|'
        }
    }
    return ","; // Default delimiter if no custom delimiter is found
}

function getNumberString(input: string): string {
    const firstLineEndIndex = input.indexOf("\n");
    if (firstLineEndIndex === -1) return input; // No custom delimiter, return the whole string

    return input.substring(firstLineEndIndex + 1); // Return the part after the delimiter line
}