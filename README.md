# Pregador IA

Extensão do VS Code para auxiliar na preparação de pregações, estudos bíblicos e organização de conteúdo ministerial.

## Recursos

- Geração de esboços de pregação por tema
- Sugestão de versículos por assunto
- Explicação de passagens bíblicas
- Criação de cronograma de pregações
- Análise teológica de temas
- Concordância bíblica
- Painel lateral integrado ao VS Code

## Requisitos

- Node.js instalado
- npm 11.9.0
- VS Code 1.80.0 ou superior

## Instalação para desenvolvimento

```bash
npm install
```

## Scripts

```bash
npm run compile
npm run watch
npm run lint
npm run test
```

## Executar a extensão no VS Code

1. Abra a pasta do projeto no VS Code.
2. Execute `npm install`.
3. Pressione `F5` para abrir uma nova janela de desenvolvimento da extensão.

## Comandos disponíveis

- `Pregador IA: Gerar Esboço de Pregação`
- `Pregador IA: Sugerir Versículos por Tema`
- `Pregador IA: Explicar Passagem Bíblica`
- `Pregador IA: Criar Cronograma de Pregações`
- `Pregador IA: Análise Teológica`
- `Pregador IA: Concordância Bíblica`
- `Pregador IA: Abrir Painel`

## Estrutura

- `src/extension.ts`: ativação da extensão e registro dos comandos
- `src/pregadorProvider.ts`: painel lateral da extensão
- `src/commands/`: comandos principais do Pregador IA

## Publicação no GitHub

Este projeto foi preparado para um repositório GitHub chamado `Pregador-IA`.
