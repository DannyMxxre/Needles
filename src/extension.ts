// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { parsePythonCode } from './parser';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "needles" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('needles.analyzeFile', () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showInformationMessage('No active editor.');
			return;
		}

		const text = editor.document.getText();
		const result = parsePythonCode(text);

		const output = vscode.window.createOutputChannel("Needles");
		output.clear();
		output.appendLine("📊 Needles Analysis:");
		output.appendLine(`Functions: ${result.functions.join(', ')}`);
		output.appendLine(`Variables: ${result.variables.join(', ')}`);
		output.appendLine(`Imports: ${result.imports.join(', ')}`);
		output.show();
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
