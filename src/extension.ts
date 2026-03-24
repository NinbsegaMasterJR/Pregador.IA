import * as vscode from 'vscode';
import { PregadorIAProvider } from './pregadorProvider';
import { gerarEsboco } from './commands/gerarEsboco';
import { sugerirVersiculos } from './commands/sugerirVersiculos';
import { explicarPassagem } from './commands/explicarPassagem';
import { criarCronograma } from './commands/criarCronograma';
import { analisarTeologica } from './commands/analisarTeologica';
import { buscarConcordancia } from './commands/concordancia';

export function activate(context: vscode.ExtensionContext) {
	console.log('Extensão "Pregador IA" foi ativada!');

	// Criar provider para o painel
	const pregadorProvider = new PregadorIAProvider();
	
	vscode.window.registerWebviewViewProvider(
		'pregador-ia-view',
		pregadorProvider,
		{ webviewOptions: { retainContextWhenHidden: true } }
	);

	// Registrar comandos
	const commands = [
		vscode.commands.registerCommand('pregador-ia.gerarEsboco', () => gerarEsboco(context)),
		vscode.commands.registerCommand('pregador-ia.sugerirVersiculos', () => sugerirVersiculos(context)),
		vscode.commands.registerCommand('pregador-ia.explicarPassagem', () => explicarPassagem(context)),
		vscode.commands.registerCommand('pregador-ia.criarCronograma', () => criarCronograma(context)),
		vscode.commands.registerCommand('pregador-ia.analisarTeologica', () => analisarTeologica(context)),
		vscode.commands.registerCommand('pregador-ia.concordancia', () => buscarConcordancia(context)),
		vscode.commands.registerCommand('pregador-ia.abrirPainel', () => {
			vscode.window.showInformationMessage('Painel do Pregador IA aberto!');
		})
	];

	commands.forEach(cmd => context.subscriptions.push(cmd));

	// Listen for configuration changes
	const configChangeListener = vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
		if (event.affectsConfiguration('pregador-ia')) {
			vscode.window.showInformationMessage('Configurações do Pregador IA atualizadas');
		}
	});

	context.subscriptions.push(configChangeListener);
}

export function deactivate() {
	console.log('Extensão "Pregador IA" foi desativada');
}
