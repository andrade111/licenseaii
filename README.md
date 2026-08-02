# LicenseAI Insights

Crie uma aplicação web B2B em estilo SaaS Dashboard para uma plataforma chamada "LicenceAI" — uma solução de inteligência e conformidade regulatória para o setor minerário brasileiro.

A plataforma resolve o problema de falta de padronização e riscos de atraso/multa no licenciamento entre a ANM (Federal), Secretarias Estaduais de Meio Ambiente e Prefeituras.

---

### 🎨 DESIGN & INTERFACE (UI/UX)

- Design moderno, limpo e extremamente profissional voltado para a persona (Gerentes de Licenciamento/Compliance e Consultores Geológicos).

- Paleta de cores: Tons de verde esmeralda/mineral, cinza ardósia, azul corporativo e indicadores visuais de status (Verde = Conforme, Amarelo = Pendente, Vermelho = Bloqueado/Risco).

- Layout com Sidebar retrátil para navegação principal e Header com seções de perfil e seletor de projetos ativos.

---

### ⚙️ MÓDULOS E FUNCIONALIDADES PRINCIPAIS

#### 1. Dashboard Principal (Overview de Projetos)

- Exibir cards de projetos ativos (Ex: "Projeto Lítio - Vale do Jequitinhonha / MG", "Pesquisa de Bauxita - PA").

- Widget visual do "Índice de Prontidão Regulatória" (Regulator Readiness Index) em porcentagem (0% a 100%).

- Gráfico/Progresso das condicionantes cumpridas vs. pendentes por esfera (Federal, Estadual e Municipal).

#### 2. Matriz Interativa de Requisitos (Filtro Dinâmico)

- Seletor de entrada com 3 passos simples:

  1. Mineral (ex: Lítio, Ouro, Ferro, Bauxita, Agregados).

  2. Estado / Município (ex: MG, BA, PA, SP).

  3. Fase do Direito Minerário (ex: Requerimento de Pesquisa, Relatório Final de Pesquisa, Licenciamento Ambiental).

- Ao filtrar, exibir a **Matriz Parametrizada de Requisitos**:

  - Tabela organizada por Órgão Competente (ANM, Secretaria Estadual, Prefeitura).

  - Lista detalhada de Documentos Obrigatórios, Taxas, Certidões e Modelos de Formulários.

#### 3. Bot Validador & Assistente de Pré-Protocolo (O "Bot")

- Interface de simulação de upload e checagem de documentos para a persona:

  - O usuário faz o upload (ou insere dados) de um documento técnico (ex: Plano de Pesquisa / Licença Prévia).

  - O Bot executa uma simulação de auditoria automática e exibe um Checklist de Conformidade com status:

    - ✅ "Formato e campos obrigatórios preenchidos".

    - ⚠️ "Atenção: Ausência de Certidão de Uso do Solo Municipal".

    - ❌ "Documento fora do padrão exigido pela ANM regional".

  - Botão para gerar e baixar um "Relatório Executivo de Auditoria Regulatória" em PDF/Resumo.

#### 4. Kanban de Acompanhamento Interorgânico

- Quadro estilo Kanban dividido em colunas:

  - [Esfera Federal / ANM] | [Esfera Estadual / Licenciamento] | [Esfera Municipal / Certidões] | [Concluído / Prontidão]

- Os cards devem permitir mover arquivos e atualizar status de pendências.

---

### 📊 DADOS MOCKADOS (Exemplo para Protótipo)

- Insira dados fictícios realistas de processos de mineração em MG e PA para que a interface já nasça povoada e pronta para demonstração no Pitch.

Atue como desenvolvedor frontend especialista. Atualize a aplicação "LicenseAI" aplicando as modificações abaixo. Desenvolva o código de forma modular, enxuta e direta ao ponto, evitando redundâncias para otimizar o consumo de tokens.

---

### 1. 📊 DASHBOARD: INDICADORES ESTRATÉGICOS DE LICENCIAMENTO MINERÁRIO

Aprofunde a visualização do Dashboard para que a mineradora e a persona executiva tenham controle total sobre os riscos e fases operacionais. Exiba os seguintes indicadores críticos:

1. **Índice de Prontidão Regulatória (Regulator Readiness Index):** Score geral (0% a 100%) indicando o nível de conformidade dos processos.

2. **Controle de Prazos & Vencimentos (Alertas):** 

   - Licenças Prévias (LP), de Instalação (LI) e de Operação (LO) com contagem regressiva de dias para renovação.

   - Prazos de cumprimento de exigências da ANM e formulários do órgão ambiental estadual.

3. **Taxa de Cumprimento de Condicionantes:** Gráfico/barra de progresso mostrando a porcentagem de condicionantes ambientais/sociais executadas vs. pendentes.

4. **Matriz de Risco Fiscal e Reputacional:** Indicador de nível de risco (Baixo, Médio, Crítico) para multas ou paralisação de lavra por inconformidade.

5. **Visão Tripartida por Esfera:** Card sintetizado dividindo as pendências ativas por órgão:

   - **Federal (ANM / IBAMA)**

   - **Estadual (Secretaria de Meio Ambiente)**

   - **Municipal (Uso e Ocupação do Solo)**

---

### 2. 📋 KANBAN ESTILO TRELLO COM RECORREÇÃO AUTOMÁTICA VIA BOT

Redesenhe a seção de acompanhamento para uma estrutura visual estilo Trello dividida estritamente nas seguintes 3 colunas:

- **Coluna 1: `Em andamento`**

  - Cards representando processos e documentações técnicas em elaboração.

- **Coluna 2: `Recorreção`**

  - Cards que apresentaram inconformidade técnica ou documental prévia.

  - Cada card nesta coluna deve exibir o motivo da pendência apontada pelo Bot.

  - **Ação Interativa:** Incluir um botão **"Recorrigir"** em cada card.

  - **Comportamento do Bot:** Ao clicar no botão "Recorrigir", exibir um efeito visual de carregamento ("*Bot reanalisando parâmetros...*") e, após a simulação, alterar o status da pendência e mover o card automaticamente para a coluna `Concluídos`.

- **Coluna 3: `Concluídos`**

  - Cards com documentação 100% validada e pronta para submissão oficial aos órgãos reguladores.

---

### 🎨 DESIGN E USABILIDADE

- Mantenha a estética limpa, moderna e responsiva (tons de verde mineral, cinza e badges coloridos para status).

- Adicione interatividade fluida (drag-and-drop nos cards e feedback visual imediato ao acionar o botão de recorreção).

Ajuste o layout da seção "Kanban Interorgânico / Quadro de Acompanhamento" no GeoReg Matrix para o formato clássico do Trello, organizando a leitura e visualização das colunas na horizontal (da esquerda para a direita).

---

### 📋 ALTERAÇÃO DE LAYOUT: KANBAN HORIZONTAL (ESTILO TRELLO)

1. **Estrutura e Alinhamento Visual:**

   - Organize as 3 colunas lado a lado no eixo horizontal (da esquerda para a direita):

     `[Em andamento]` ➔ `[Recorreção]` ➔ `[Concluídos]`

   - Utilize um container flexível com alinhamento horizontal (`flex-row` / `overflow-x-auto`) para que as colunas fiquem dispostas paralelamente, e não empilhadas de cima para baixo.

   - Cada coluna deve possuir largura fixa/proporcional (ex: `min-w-[320px]`), mantendo os cards dispostos verticalmente **dentro** de sua respectiva coluna.

2. **Fluxo de Ação e Automação:**

   - **Coluna Esquerda (`Em andamento`):** Processos técnicos em elaboração.

   - **Coluna Central (`Recorreção`):** Processos com pendências. Exibir botão **"Recorrigir"** que dispara a animação do Bot ("*Analisando pendências...*") e transfere automaticamente o card para a coluna da direita.

   - **Coluna Direita (`Concluídos`):** Documentação 100% validada.

---

### ⚙️ DIRETRIZ DE CÓDIGO

- Atualize estritamente o componente de renderização do Kanban para economizar tokens.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://licenseaii.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7600b5be-baee-40eb-a618-dbd669818ec7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
