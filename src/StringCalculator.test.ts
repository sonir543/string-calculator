import { add } from './StringCalculator';

describe('String Calculator', () => {
    test('should return 0 for an empty string', () => {
        expect(add("")).toBe(0);
    });

    test('should return the number for a single number', () => {
        expect(add("1")).toBe(1);
    });

    test('should return the sum of two numbers separated by a comma', () => {
        expect(add("1,2")).toBe(3);
    });

    test('should return the sum of two numbers separated by new lines', () => {
        expect(add("1\n2")).toBe(3);
    });

    test('should return the sum of numbers separated by commas and new lines', () => {
        expect(add("1\n2,3")).toBe(6); // Handling new lines and commas together
    });

    test('should support custom delimiters', () => {
        expect(add("//;\n1;2")).toBe(3); // Custom delimiter ';'
    });

    test('should support multiple custom delimiters', () => {
        expect(add("//[***]\n1***2***3")).toBe(6); // Custom delimiter '***'
    });

    test('should throw an error for negative numbers', () => {
        expect(() => add("1,-2")).toThrow("negative numbers not allowed: -2");
        expect(() => add("1,-2,-3")).toThrow("negative numbers not allowed: -2, -3");
    });

    test('should handle mixed delimiters with new lines', () => {
        expect(add("//[;][&]\n1;2&3")).toBe(6); // Custom delimiters ';' and '&'
    });

    test('should handle multiple delimiters defined in the first line', () => {
        expect(add("//[;][%]\n1;2%3")).toBe(6); // Custom delimiters ';' and '%'
    });

    test('should return the sum of numbers with multiple custom delimiters and new lines', () => {
        expect(add("//[;]\n1;2\n3")).toBe(6); // Custom delimiter ';' with new lines
    });
});