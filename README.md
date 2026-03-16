# StudyDesk

Dashboard de estudos para concursos públicos (BB e INSS).

## Como rodar localmente

### Pré-requisito
Instale o **Node.js** em https://nodejs.org (versão 18 ou superior)

### Passos

```bash
# 1. Instale as dependências
npm install

# 2. Rode em modo desenvolvimento
npm run dev
# Acesse http://localhost:5173

# 3. Para gerar a versão de produção
npm run build
npm run preview
```

## Deploy gratuito na Vercel (site online)

```bash
# Instale a CLI da Vercel
npm install -g vercel

# Faça o build e deploy
npm run build
vercel --prod
```

Ou acesse https://vercel.com, conecte seu GitHub e faça o deploy pela interface.

## Como instalar como app (PWA)

Após publicar na Vercel, acesse o site pelo celular e toque em
"Adicionar à tela inicial" no navegador.

## Dados

Todos os dados são salvos no **localStorage** do navegador.
Use a função de Export/Import para fazer backups.

## Funcionalidades

- Dashboard com tracker de estudos ao vivo
- Edital Verticalizado (estilo Estudei)
- Ciclos de estudo com cronômetro por matéria
- Simulados com gráfico de evolução
- Listas de questões agrupadas por matéria
- Controle de Legislação (teoria / anki / questões)
- Editais BB (Cesgranrio 2023) e INSS (Cebraspe 2022) pré-carregados
- Relatórios por período
- Heatmap de frequência
- Questões por tópico em cada sessão
