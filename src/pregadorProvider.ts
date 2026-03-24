import * as vscode from 'vscode';

export class PregadorIAProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'pregador-ia-view';

	private _view?: vscode.WebviewView;

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			enableScripts: true
		};

		webviewView.webview.html = this._getHtmlContent();

		webviewView.webview.onDidReceiveMessage((data: any) => {
			switch (data.type) {
				case 'gerarEsboco':
					vscode.commands.executeCommand('pregador-ia.gerarEsboco');
					break;
				case 'sugerirVersiculos':
					vscode.commands.executeCommand('pregador-ia.sugerirVersiculos');
					break;
				case 'explicarPassagem':
					vscode.commands.executeCommand('pregador-ia.explicarPassagem');
					break;
				case 'criarCronograma':
					vscode.commands.executeCommand('pregador-ia.criarCronograma');
					break;
				case 'analisarTeologica':
					vscode.commands.executeCommand('pregador-ia.analisarTeologica');
					break;
				case 'concordancia':
					vscode.commands.executeCommand('pregador-ia.concordancia');
					break;
			}
		});
	}

	private _getHtmlContent() {
		return `<!DOCTYPE html>
	<html lang="pt-BR">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Pregador IA</title>
		<style>
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}

			body {
				font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
				padding: 15px;
				background: var(--vscode-editor-background);
				color: var(--vscode-editor-foreground);
			}

			.container {
				max-width: 100%;
			}

			h1 {
				font-size: 20px;
				margin-bottom: 15px;
				color: var(--vscode-textLink-foreground);
				display: flex;
				align-items: center;
				gap: 8px;
			}

			.emoji {
				font-size: 24px;
			}

			.description {
				font-size: 12px;
				color: var(--vscode-descriptionForeground);
				margin-bottom: 20px;
				line-height: 1.5;
			}

			.button-group {
				display: grid;
				grid-template-columns: 1fr;
				gap: 10px;
			}

			.btn {
				padding: 12px 15px;
				border: none;
				background: var(--vscode-button-background);
				color: var(--vscode-button-foreground);
				cursor: pointer;
				border-radius: 4px;
				font-size: 13px;
				font-weight: 500;
				transition: background 0.2s;
				text-align: left;
				display: flex;
				flex-direction: column;
				gap: 3px;
			}

			.btn:hover {
				background: var(--vscode-button-hoverBackground);
			}

			.btn-label {
				font-weight: 600;
			}

			.btn-desc {
				font-size: 11px;
				opacity: 0.8;
			}

			.section {
				margin-top: 25px;
				padding-top: 15px;
				border-top: 1px solid var(--vscode-activityBar-border);
			}

			.section-title {
				font-size: 12px;
				font-weight: 600;
				text-transform: uppercase;
				color: var(--vscode-descriptionForeground);
				margin-bottom: 12px;
				letter-spacing: 0.5px;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<h1>
				<span class="emoji">⛪</span>
				<span>Pregador IA</span>
			</h1>
			
			<p class="description">
				Seu assistente inteligente para preparar pregações pentecostais impactantes. 
				Use os comandos abaixo para gerar esboços, sugerir versículos e muito mais.
			</p>

			<div class="button-group">
				<button class="btn" onclick="sendMessage('gerarEsboco')">
					<span class="btn-label">📝 Gerar Esboço de Pregação</span>
					<span class="btn-desc">Cria um esboço completo baseado em um tema</span>
				</button>

				<button class="btn" onclick="sendMessage('sugerirVersiculos')">
					<span class="btn-label">📖 Sugerir Versículos por Tema</span>
					<span class="btn-desc">Encontra versículos relevantes para seu tema</span>
				</button>

				<button class="btn" onclick="sendMessage('explicarPassagem')">
					<span class="btn-label">💡 Explicar Passagem Bíblica</span>
					<span class="btn-desc">Analisa e explica uma passagem em detalhes</span>
				</button>

				<button class="btn" onclick="sendMessage('criarCronograma')">
					<span class="btn-label">📅 Criar Cronograma de Pregações</span>
					<span class="btn-desc">Planeja uma série de pregações para o mês</span>
				</button>

				<button class="btn" onclick="sendMessage('analisarTeologica')">
					<span class="btn-label">🔍 Análise Teológica</span>
					<span class="btn-desc">Análise aprofundada do tema teológico</span>
				</button>

				<button class="btn" onclick="sendMessage('concordancia')">
					<span class="btn-label">🔗 Concordância Bíblica</span>
					<span class="btn-desc">Encontra ocorrências de palavras na Bíblia</span>
				</button>
			</div>

			<div class="section">
				<div class="section-title">💻 Dicas</div>
				<p class="description">
					• Use os comandos via Command Palette (Ctrl+Shift+P)<br>
					• Customize as configurações em Configurações > Pregador IA<br>
					• Abra um arquivo .md para salvar suas pregações<br>
					• Cada funcionalidade pode ser personalizada conforme sua igreja
				</p>
			</div>
		</div>

		<script>
			const vscode = acquireVsCodeApi();

			function sendMessage(command) {
				vscode.postMessage({
					type: command
				});
			}
		</script>
	</body>
	</html>`;
	}
}
