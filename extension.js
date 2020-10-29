// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
var path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "run-hol-code" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('run-hol-code.cd', function (fileUri) {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		var filePath;
        if (!fileUri || typeof fileUri.fsPath !== 'string') {
            var activeEditor = vscode.window.activeTextEditor;
            if (activeEditor && !activeEditor.document.isUntitled) {
                filePath = activeEditor.document.fileName;
            }
        }
        else {
            filePath = fileUri.fsPath;
        }
        var terminal = vscode.window.activeTerminal;
        // filePath = path.dirname(filePath.replace(/([A-Za-z]):\\/, this.replacer).replace(/\\/g, '/'));
        if (filePath) {
            terminal.sendText("cd \"" + path.dirname(filePath) + "\"");
        }
	});

	let run = vscode.commands.registerCommand('run-hol-code.hol', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		var terminal = vscode.window.activeTerminal;
		var filePath = vscode.window.activeTextEditor.document.fileName;
		var HolPath = vscode.workspace.getConfiguration("run-hol-code").get("HolPath");
        if (filePath) {
			terminal.sendText(HolPath + " \"" + filePath + "\"");
		}
	});

	let lines = vscode.commands.registerCommand('run-hol-code.lines', function() {
		var terminal = vscode.window.activeTerminal;
		var textEditor = vscode.window.activeTextEditor;
		var lines = textEditor.document.getText(textEditor.selection.with(textEditor.selection.start, textEditor.selection.end));
		if (!lines) {
			lines = textEditor.document.lineAt(textEditor.selection.active).text
		}
		if (vscode.workspace.getConfiguration("run-hol-code").get("Auto") && !(lines[0] == 'e' || lines[1] == 'a')) {
			lines = "e (" + lines + ");";
		}
		terminal.sendText(lines);
	})

	let format = vscode.commands.registerCommand('run-hol-code.format', function() {
		var terminal = vscode.window.activeTerminal;
		var textEditor = vscode.window.activeTextEditor;
		var format = textEditor.document.getText(textEditor.selection.with(textEditor.selection.start, textEditor.selection.end));
		var matchList = []
		if (!format) {
			return;
		} else {
			matchList = format.match(/(?:\e\s*\()(.+)(?:\);)/g);
			var formated = matchList[0].replace(/(?:\e\s*\()(.+)(?:\);)/,"$1");
			for (let index = 1; index < matchList.length; index++) {
				const element = matchList[index];
				formated += element.replace(/(?:\e\s*\()(.+)(?:\);)/," >>\n$1");
			}
		}
		textEditor.edit((editBuilder) => {
			editBuilder.insert(textEditor.selection.end, '\n\n' + formated + '\n')
		})
		//terminal.sendText(format);
	})

	context.subscriptions.push(disposable);
	context.subscriptions.push(run);
	context.subscriptions.push(lines);
	context.subscriptions.push(format);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
