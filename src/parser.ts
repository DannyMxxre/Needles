// Interface describing dependency information in the code
export interface DependencyInfo {
    variables: string[]; // List of variables found in the code
    functions: string[]; // List of functions found in the code
    imports: string[];   // List of imports found in the code
}

// Function to analyze Python code and extract information about variables, functions, and imports
export function parsePythonCode(code: string): DependencyInfo {
    // Regular expression to find variables (e.g., x = 10)
    const variablePattern = /^\s*([a-zA-Z_]\w*)\s*=/gm;

    // Regular expression to find functions (e.g., def my_function():)
    const functionPattern = /^\s*def\s+([a-zA-Z_]\w*)\s*\(/gm;

    // Regular expression to find imports (e.g., import os or from os import path)
    const importPattern = /^\s*(?:import|from)\s+([a-zA-Z0-9_\.]+)/gm;

    // Extract all variables from the code
    const variables = [...code.matchAll(variablePattern)].map(m => m[1]);

    // Extract all functions from the code
    const functions = [...code.matchAll(functionPattern)].map(m => m[1]);

    // Extract all imports from the code
    const imports = [...code.matchAll(importPattern)].map(m => m[1]);

    // Return an object with information about variables, functions, and imports
    return { variables, functions, imports };
}