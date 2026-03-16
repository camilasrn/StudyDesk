import { useState, useEffect, useRef, useMemo } from "react";

const C = {
  bg: "#F5F6FA", bgCard: "#FFFFFF", bgInput: "#F8F9FC",
  border: "#E2E5EC", borderHover: "#C8CDDA",
  accent: "#2563EB", accentDim: "#1E40AF", accentLight: "#EFF4FF", accentGlow: "#2563EB12",
  green: "#16A34A", greenLight: "#F0FDF4",
  yellow: "#D97706", yellowLight: "#FFFBEB",
  red: "#DC2626", redLight: "#FEF2F2",
  purple: "#7C3AED", purpleLight: "#F5F3FF",
  teal: "#0891B2", tealLight: "#ECFEFF",
  orange: "#EA580C", orangeLight: "#FFF7ED",
  textPrimary: "#111827", textSecondary: "#4B5563", textMuted: "#9CA3AF",
  sidebar: "#FFFFFF", sidebarBorder: "#E5E7EB",
  headerBg: "#FFFFFF",
};
const FONT = "'Inter','Segoe UI',sans-serif";
const SANS = "'Inter','Segoe UI',sans-serif";
const MONO = "'JetBrains Mono','Fira Code',monospace";

const TIPOS_ESTUDO = [
  { value: "teoria",   label: "Teoria",           color: C.accent  },
  { value: "questoes", label: "Questões",          color: C.purple  },
  { value: "revisao",  label: "Revisão",           color: C.teal    },
  { value: "resumo",   label: "Resumo / Fichamento", color: C.yellow  },
  { value: "video",    label: "Videoaula",          color: C.orange  },
  { value: "simulado", label: "Simulado",           color: C.red     },
  { value: "leitura",  label: "Leitura de Lei",     color: C.green   },
];

const EDITAIS_DEFAULT = [
  {
    id: 1, nome: "Banco do Brasil — Escriturário", sigla: "BB",
    cor: C.yellow, banca: "Cesgranrio", ano: "2023",
    materias: [
      { id: 101, nome: "Língua Portuguesa", peso: 10, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 1001, nome: "Compreensão e interpretação de textos", concluido: false },
        { id: 1002, nome: "Ortografia oficial", concluido: false },
        { id: 1003, nome: "Classes e emprego de palavras", concluido: false },
        { id: 1004, nome: "Emprego do acento indicativo de crase", concluido: false },
        { id: 1005, nome: "Sintaxe da oração e do período", concluido: false },
        { id: 1006, nome: "Emprego dos sinais de pontuação", concluido: false },
        { id: 1007, nome: "Concordância verbal e nominal", concluido: false },
        { id: 1008, nome: "Regência verbal e nominal", concluido: false },
        { id: 1009, nome: "Colocação pronominal (próclise, mesóclise e ênclise)", concluido: false },
      ]},
      { id: 102, nome: "Língua Inglesa", peso: 5, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 1021, nome: "Vocabulário fundamental para compreensão de textos", concluido: false },
        { id: 1022, nome: "Aspectos gramaticais básicos para leitura", concluido: false },
        { id: 1023, nome: "Interpretação de texto em inglês", concluido: false },
      ]},
      { id: 103, nome: "Matemática", peso: 10, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 1031, nome: "Números inteiros, racionais e reais; problemas de contagem", concluido: false },
        { id: 1032, nome: "Sistema legal de medidas", concluido: false },
        { id: 1033, nome: "Razões, proporções, regras de três e porcentagens", concluido: false },
        { id: 1034, nome: "Lógica proposicional e noções de conjuntos", concluido: false },
        { id: 1035, nome: "Relações e funções: polinomiais, exponenciais e logarítmicas", concluido: false },
        { id: 1036, nome: "Matrizes, determinantes e sistemas lineares", concluido: false },
        { id: 1037, nome: "Progressões aritméticas e geométricas", concluido: false },
      ]},
      { id: 104, nome: "Atualidades do Mercado Financeiro", peso: 10, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 1041, nome: "Bancos na Era Digital: tendências e desafios", concluido: false },
        { id: 1042, nome: "Internet banking e Mobile banking", concluido: false },
        { id: 1043, nome: "Open banking / Open Finance", concluido: false },
        { id: 1044, nome: "Fintechs, startups e big techs", concluido: false },
        { id: 1045, nome: "Shadow banking (sistema de bancos-sombra)", concluido: false },
        { id: 1046, nome: "Blockchain, bitcoin e criptomoedas", concluido: false },
        { id: 1047, nome: "PIX e arranjos de pagamentos instantâneos", concluido: false },
        { id: 1048, nome: "Marketplace e correspondentes bancários", concluido: false },
        { id: 1049, nome: "Transformação digital no Sistema Financeiro", concluido: false },
      ]},
      { id: 105, nome: "Conhecimentos Bancários", peso: 20, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 1051, nome: "Estrutura do Sistema Financeiro Nacional (SFN)", concluido: false },
        { id: 1052, nome: "Órgãos normativos: CMN, BCB, CVM", concluido: false },
        { id: 1053, nome: "Mercados monetário, de crédito, de capitais e cambial", concluido: false },
        { id: 1054, nome: "Moeda e política monetária; Taxa SELIC", concluido: false },
        { id: 1055, nome: "Orçamento público e Tesouro Nacional", concluido: false },
        { id: 1056, nome: "Produtos bancários: crédito, poupança, consórcio, seguros", concluido: false },
        { id: 1057, nome: "Mercado de câmbio e taxas de câmbio", concluido: false },
        { id: 1058, nome: "Garantias do SFN: aval, fiança, penhor, alienação fiduciária", concluido: false },
        { id: 1059, nome: "Crime de lavagem de dinheiro — Lei 9.613/98", concluido: false },
        { id: 1060, nome: "LGPD — Lei 13.709/2018", concluido: false },
        { id: 1061, nome: "Ética aplicada e Código de Ética do BB", concluido: false },
        { id: 1062, nome: "ASG: Ambiental, Social e Governança", concluido: false },
        { id: 1063, nome: "Sigilo Bancário: LC 105/2001", concluido: false },
        { id: 1064, nome: "Segurança cibernética: Resolução CMN 4.893/2021", concluido: false },
      ]},
      { id: 106, nome: "Matemática Financeira", peso: 10, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 1065, nome: "Juros simples e compostos", concluido: false },
        { id: 1066, nome: "Desconto simples e composto", concluido: false },
        { id: 1067, nome: "Taxas de juros: nominal, efetiva, proporcional e equivalente", concluido: false },
        { id: 1068, nome: "Séries de pagamentos (rendas certas)", concluido: false },
        { id: 1069, nome: "Sistemas de amortização: SAC, PRICE e SAM", concluido: false },
        { id: 1070, nome: "Análise de investimentos: TIR e VPL", concluido: false },
      ]},
      { id: 107, nome: "Vendas e Negociação", peso: 20, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 1071, nome: "Técnicas de vendas e atendimento ao cliente", concluido: false },
        { id: 1072, nome: "Marketing de relacionamento e CRM", concluido: false },
        { id: 1073, nome: "Noções de comportamento do consumidor", concluido: false },
        { id: 1074, nome: "Estratégias de negociação e persuasão", concluido: false },
        { id: 1075, nome: "Gestão de carteira de clientes", concluido: false },
        { id: 1076, nome: "Venda consultiva e cross-selling", concluido: false },
      ]},
      { id: 108, nome: "Informática", peso: 15, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 1081, nome: "Hardware, software e sistemas operacionais", concluido: false },
        { id: 1082, nome: "Microsoft Office: Word, Excel e PowerPoint", concluido: false },
        { id: 1083, nome: "Redes de computadores e internet", concluido: false },
        { id: 1084, nome: "Segurança da informação e proteção de dados", concluido: false },
        { id: 1085, nome: "Cloud computing e virtualização", concluido: false },
        { id: 1086, nome: "E-mail, navegadores e ferramentas de busca", concluido: false },
      ]},
    ],
  },
  {
    id: 2, nome: "INSS — Técnico do Seguro Social", sigla: "INSS",
    cor: C.teal, banca: "Cebraspe", ano: "2022",
    materias: [
      { id: 201, nome: "Língua Portuguesa", peso: 10, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 2011, nome: "Compreensão e interpretação de textos", concluido: false },
        { id: 2012, nome: "Tipologia textual", concluido: false },
        { id: 2013, nome: "Ortografia oficial e acentuação gráfica", concluido: false },
        { id: 2014, nome: "Emprego das classes de palavras", concluido: false },
        { id: 2015, nome: "Emprego do sinal indicativo de crase", concluido: false },
        { id: 2016, nome: "Sintaxe da oração e do período; pontuação", concluido: false },
        { id: 2017, nome: "Concordância nominal e verbal", concluido: false },
        { id: 2018, nome: "Regência nominal e verbal", concluido: false },
        { id: 2019, nome: "Significação das palavras (sinonímia, antonímia, polissemia)", concluido: false },
        { id: 2020, nome: "Redação de correspondências oficiais (Manual de Redação da PR)", concluido: false },
      ]},
      { id: 202, nome: "Raciocínio Lógico", peso: 10, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 2021, nome: "Estruturas lógicas e lógica de argumentação", concluido: false },
        { id: 2022, nome: "Lógica proposicional: negação, conjunção, disjunção, condicional", concluido: false },
        { id: 2023, nome: "Diagramas lógicos e tabelas-verdade", concluido: false },
        { id: 2024, nome: "Sequências e séries numéricas", concluido: false },
        { id: 2025, nome: "Raciocínio analítico e resolução de problemas", concluido: false },
      ]},
      { id: 203, nome: "Noções de Informática", peso: 10, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 2031, nome: "Sistemas operacionais: Windows e Linux", concluido: false },
        { id: 2032, nome: "Editor de textos: Microsoft Word e LibreOffice Writer", concluido: false },
        { id: 2033, nome: "Planilhas: Microsoft Excel e LibreOffice Calc", concluido: false },
        { id: 2034, nome: "Segurança da informação e prevenção de ataques", concluido: false },
        { id: 2035, nome: "Redes de computadores, internet e intranet", concluido: false },
        { id: 2036, nome: "E-mail e navegadores web", concluido: false },
      ]},
      { id: 204, nome: "Ética no Serviço Público", peso: 5, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 2041, nome: "Código de Ética do Servidor Público: Decreto 1.171/1994", concluido: false },
        { id: 2042, nome: "Decreto 6.029/2007 — Sistema de Gestão da Ética", concluido: false },
        { id: 2043, nome: "Ética, moral, valores e virtudes no serviço público", concluido: false },
        { id: 2044, nome: "Gestão da ética nas empresas públicas", concluido: false },
      ]},
      { id: 205, nome: "Noções de Direito Administrativo", peso: 10, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 2051, nome: "Estado, governo e administração pública", concluido: false },
        { id: 2052, nome: "Princípios da administração pública (LIMPE)", concluido: false },
        { id: 2053, nome: "Organização da administração pública federal", concluido: false },
        { id: 2054, nome: "Poderes da administração: vinculado, discricionário, hierárquico e disciplinar", concluido: false },
        { id: 2055, nome: "Ato administrativo: conceito, elementos e espécies", concluido: false },
        { id: 2056, nome: "Controle da administração pública", concluido: false },
        { id: 2057, nome: "Improbidade administrativa: Lei 8.429/1992", concluido: false },
        { id: 2058, nome: "Processo administrativo: Lei 9.784/1999", concluido: false },
      ]},
      { id: 206, nome: "Noções de Direito Constitucional", peso: 10, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 2061, nome: "Constituição: conceito, classificação e princípios fundamentais", concluido: false },
        { id: 2062, nome: "Direitos e garantias fundamentais (Art. 5º CF/88)", concluido: false },
        { id: 2063, nome: "Direitos sociais (Art. 6º ao 11 CF/88)", concluido: false },
        { id: 2064, nome: "Administração pública (Art. 37 a 41 CF/88)", concluido: false },
        { id: 2065, nome: "Organização do Estado: União, estados, municípios e DF", concluido: false },
        { id: 2066, nome: "Ordem social: seguridade, saúde, previdência e assistência", concluido: false },
      ]},
      { id: 207, nome: "Regime Jurídico Único — Lei 8.112/1990", peso: 5, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 2071, nome: "Provimento, vacância e remoção de cargos", concluido: false },
        { id: 2072, nome: "Direitos e vantagens do servidor público", concluido: false },
        { id: 2073, nome: "Deveres e proibições do servidor público", concluido: false },
        { id: 2074, nome: "Regime disciplinar e responsabilidades", concluido: false },
        { id: 2075, nome: "Processo administrativo disciplinar (PAD)", concluido: false },
      ]},
      { id: 208, nome: "Direito Previdenciário", peso: 40, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 2081, nome: "Seguridade Social: conceito, organização e princípios (CF/88)", concluido: false },
        { id: 2082, nome: "Legislação previdenciária: conteúdo, fontes e aplicação", concluido: false },
        { id: 2083, nome: "RGPS — Segurados obrigatórios e facultativos; qualidade de segurado", concluido: false },
        { id: 2084, nome: "Financiamento da Seguridade Social: contribuições (Lei 8.212/91)", concluido: false },
        { id: 2085, nome: "Plano de Benefícios: Lei 8.213/91 e Decreto 3.048/99", concluido: false },
        { id: 2086, nome: "Aposentadorias: programada, invalidez, especial e por incapacidade", concluido: false },
        { id: 2087, nome: "Auxílios, salário-família, salário-maternidade e pensão por morte", concluido: false },
        { id: 2088, nome: "Carência, períodos de contribuição e cálculo de benefícios", concluido: false },
        { id: 2089, nome: "Reforma da Previdência: EC 103/2019", concluido: false },
        { id: 2090, nome: "Crimes contra a seguridade social", concluido: false },
        { id: 2091, nome: "Serviços previdenciários e benefícios por legislações especiais", concluido: false },
        { id: 2092, nome: "Seguro-desemprego pescador artesanal", concluido: false },
        { id: 2093, nome: "Regimes Próprios de Previdência Social (RPPS)", concluido: false },
        { id: 2094, nome: "Previdência Complementar (EFPC e EAPC)", concluido: false },
        { id: 2095, nome: "Recursos e processos administrativos previdenciários", concluido: false },
      ]},
      { id: 209, nome: "Lei Orgânica da Assistência Social (LOAS)", peso: 10, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [
        { id: 2096, nome: "LOAS — Lei 8.742/1993: princípios e diretrizes", concluido: false },
        { id: 2097, nome: "Benefício de Prestação Continuada (BPC/LOAS)", concluido: false },
        { id: 2098, nome: "Decreto 6.214/2007: regulamentação do BPC", concluido: false },
        { id: 2099, nome: "Sistema Único de Assistência Social (SUAS)", concluido: false },
        { id: 2100, nome: "Proteção social básica e especial", concluido: false },
      ]},
    ],
  },
];

const DEFAULT_STATE = {
  editais: EDITAIS_DEFAULT,
  sessoes: [],
  ciclos: [],
  metas: { horasDia: 4, questoesDia: 50, diasSemana: 6 },
  tracker: { ativo: false, inicio: null, editalId: null, materiaId: null, pausas: [] },
};

// ─── UTILS ────────────────────────────────────────────────────────────────────
function useLS(key, init) {
  const [v, setV] = useState(() =>{
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; }
    catch { return init; }
  });
  useEffect(() =>{
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key, v]);
  return [v, setV];
}

const fmtClock = (s) =>{
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
};
const fmtH = (s) =>(s / 3600).toFixed(1) + "h";
const uid = () =>Date.now() + Math.floor(Math.random() * 9999);
const tipoInfo = (v) =>TIPOS_ESTUDO.find((t) =>t.value === v) || { label: v || "—", color: C.textMuted };

function periodoHoje() {
  const d = new Date(); d.setHours(0, 0, 0, 0);
  const f = new Date(d); f.setHours(23, 59, 59, 999);
  return [d, f];
}
function periodoSemana() {
  const d = new Date(); d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  const f = new Date(d); f.setDate(f.getDate() + 6); f.setHours(23, 59, 59, 999);
  return [d, f];
}
function periodoMes() {
  const d = new Date();
  const ini = new Date(d.getFullYear(), d.getMonth(), 1);
  const fim = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
  return [ini, fim];
}
function sessoesNoPeriodo(sessoes, ini, fim) {
  return sessoes.filter((s) =>{ const d = new Date(s.data); return d >= ini && d <= fim; });
}

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
function PBar({ val, max, color, h = 6 }) {
  const pct = max >0 ? Math.min(100, (val / max) * 100) : 0;
  return (
    <div style={{ background: C.border, borderRadius: 99, height: h, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, background: color || C.accent, height: "100%", borderRadius: 99, transition: "width 0.4s" }} />
    </div>
  );
}

function Badge({ children, color }) {
  return (
    <span style={{ background: color + "18", color, fontSize: 11, fontFamily: SANS, fontWeight: 500, padding: "2px 8px", borderRadius: 5, border: `1px solid ${color}30`, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function Card({ children, style, glow }) {
  return (
    <div style={{ background: C.bgCard, border: `1px solid ${glow ? glow + "40" : C.border}`, borderRadius: 10, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.04)", ...style }}>
      {children}
    </div>
  );
}

function Btn({ children, onClick, color, variant = "fill", style, disabled }) {
  const c = color || C.accent;
  const variants = {
    fill:    { background: c, color: "#fff", border: `1px solid ${c}`, boxShadow: "0 1px 2px rgba(0,0,0,0.08)" },
    outline: { background: "transparent", color: c, border: `1px solid ${c}50` },
    ghost:   { background: "transparent", color: C.textSecondary, border: `1px solid ${C.border}` },
    danger:  { background: C.redLight, color: C.red, border: `1px solid ${C.red}30` },
  };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ ...variants[variant], borderRadius: 7, padding: "8px 16px", cursor: disabled ? "not-allowed" : "pointer", fontFamily: SANS, fontSize: 13, fontWeight: 500, opacity: disabled ? 0.45 : 1, transition: "opacity 0.15s", letterSpacing: "-0.01em", ...style }}>
      {children}
    </button>
  );
}

function Input({ label, value, onChange, type = "text", min, max, step, placeholder, style }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {label && <label style={{ fontSize: 12, color: C.textSecondary, fontWeight: 500, letterSpacing: "-0.01em" }}>{label}</label>}
      <input type={type} value={value} onChange={(e) =>onChange(e.target.value)} min={min} max={max} step={step} placeholder={placeholder}
        style={{ background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: 7, padding: "8px 11px", color: C.textPrimary, fontFamily: SANS, fontSize: 13, outline: "none", transition: "border-color 0.15s", ...style }}
        onFocus={(e) =>(e.target.style.borderColor = C.accent)}
        onBlur={(e) =>(e.target.style.borderColor = C.border)}
      />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, rows = 2 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {label && <label style={{ fontSize: 12, color: C.textSecondary, fontWeight: 500 }}>{label}</label>}
      <textarea value={value} onChange={(e) =>onChange(e.target.value)} rows={rows} placeholder={placeholder}
        style={{ background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: 7, padding: "8px 11px", color: C.textPrimary, fontFamily: SANS, fontSize: 13, outline: "none", resize: "vertical", lineHeight: 1.5, transition: "border-color 0.15s" }}
        onFocus={(e) =>(e.target.style.borderColor = C.accent)}
        onBlur={(e) =>(e.target.style.borderColor = C.border)}
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {label && <label style={{ fontSize: 12, color: C.textSecondary, fontWeight: 500 }}>{label}</label>}
      <select value={value} onChange={(e) =>onChange(e.target.value)}
        style={{ background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: 7, padding: "8px 11px", color: C.textPrimary, fontFamily: SANS, fontSize: 13, outline: "none" }}>
        {options.map((o) =><option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function Modal({ open, onClose, title, children, width = 580 }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={(e) =>{ if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, width, maxWidth: "100%", maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 22px", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: C.bgCard, zIndex: 1 }}>
          <span style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.textPrimary, letterSpacing: "-0.01em" }}>{title}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 20, lineHeight: 1, borderRadius: 5, padding: "2px 6px" }}>×</button>
        </div>
        <div style={{ padding: 22 }}>{children}</div>
      </div>
    </div>
  );
}

function SL({ children, style }) {
  return <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12, ...style }}>{children}</div>;
}

function HBar({ label, val, max, color, sub }) {
  const pct = max >0 ? Math.min(100, (val / max) * 100) : 0;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontFamily: SANS, fontSize: 13, color: C.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, marginRight: 8 }}>{label}</span>
        <span style={{ fontFamily: MONO, fontSize: 11, color, flexShrink: 0 }}>{sub}</span>
      </div>
      <div style={{ background: C.border, borderRadius: 99, height: 6, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, background: color, height: "100%", borderRadius: 99, transition: "width 0.5s" }} />
      </div>
    </div>
  );
}

// ─── HEATMAP ──────────────────────────────────────────────────────────────────
function Heatmap({ sessoes }) {
  const WEEKS = 18;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const dayMap = {};
  sessoes.forEach((s) =>{
    const d = new Date(s.data); d.setHours(0, 0, 0, 0);
    const k = d.toISOString().slice(0, 10);
    dayMap[k] = (dayMap[k] || 0) + s.duracao / 3600;
  });
  const startDay = new Date(today);
  startDay.setDate(startDay.getDate() - (WEEKS * 7 - 1));
  const cells = [];
  for (let i = 0; i < WEEKS * 7; i++) {
    const d = new Date(startDay); d.setDate(startDay.getDate() + i);
    const k = d.toISOString().slice(0, 10);
    cells.push({ date: d, h: dayMap[k] || 0, isToday: d.toDateString() === today.toDateString() });
  }
  const maxH = Math.max(...Object.values(dayMap), 0.1);
  const getColor = (h) =>{
    if (!h) return C.border;
    const t = Math.min(1, h / maxH);
    if (t < 0.25) return "#DBEAFE";
    if (t < 0.5) return "#93C5FD";
    if (t < 0.75) return "#3B82F6";
    return C.accent;
  };
  const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const streak = (() =>{
    let s = 0; const d = new Date(today);
    while (true) {
      const k = d.toISOString().slice(0, 10);
      if (!dayMap[k]) break;
      s++; d.setDate(d.getDate() - 1);
    }
    return s;
  })();
  const weeks = [];
  for (let w = 0; w < WEEKS; w++) weeks.push(cells.slice(w * 7, w * 7 + 7));
  const monthLabels = [];
  weeks.forEach((wk, wi) =>{
    const f = wk[0]?.date;
    if (f) {
      const m = f.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
      if (wi === 0 || f.getDate() <= 7) monthLabels.push({ wi, label: m });
    }
  });
  const totalDias = Object.keys(dayMap).length;
  const totalHoras = Object.values(dayMap).reduce((a, v) =>a + v, 0);
  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        {[
          { label: "Sequência atual", val: streak + (streak === 1 ? " dia" : " dias"), color: streak >= 7 ? C.green : streak >= 3 ? C.yellow : C.textSecondary },
          { label: "Dias estudados", val: totalDias, color: C.accent },
          { label: "Horas registradas", val: totalHoras.toFixed(1) + "h", color: C.purple },
        ].map((s) =>(
          <div key={s.label} style={{ background: C.bg, borderRadius: 8, padding: "8px 14px" }}>
            <div style={{ fontFamily: SANS, fontSize: 20, fontWeight: 700, color: s.color }}>{s.val}</div>
            <div style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted, marginTop: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 3, overflowX: "auto", paddingBottom: 4 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 20 }}>
          {DAYS.map((d, i) =>(
            <div key={d} style={{ height: 13, fontSize: 9, color: i % 2 !== 0 ? C.textMuted : "transparent", fontFamily: SANS, lineHeight: "13px", marginRight: 4, userSelect: "none", width: 24 }}>{d}</div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 18, gap: 3 }}>
            {weeks.map((_, wi) =>{
              const ml = monthLabels.find((m) =>m.wi === wi);
              return <div key={wi} style={{ width: 13, fontSize: 9, color: C.textMuted, fontFamily: SANS, overflow: "visible", whiteSpace: "nowrap" }}>{ml ? ml.label : ""}</div>;
            })}
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {weeks.map((week, wi) =>(
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {week.map((cell, di) =>(
                  <div key={di}
                    title={`${cell.date.toLocaleDateString("pt-BR")}: ${cell.h.toFixed(1)}h`}
                    style={{ width: 13, height: 13, borderRadius: 2, background: getColor(cell.h), border: cell.isToday ? `1.5px solid ${C.accent}` : "none", cursor: "default", flexShrink: 0, transition: "transform 0.1s" }}
                    onMouseEnter={(e) =>{ e.target.style.transform = "scale(1.4)"; }}
                    onMouseLeave={(e) =>{ e.target.style.transform = "scale(1)"; }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
        <span style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted }}>menos</span>
        {[C.border, "#DBEAFE", "#93C5FD", "#3B82F6", C.accent].map((col) =>(
          <div key={col} style={{ width: 13, height: 13, borderRadius: 2, background: col }} />
        ))}
        <span style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted }}>mais</span>
      </div>
    </div>
  );
}

// ─── MATERIAS ESTUDADAS ───────────────────────────────────────────────────────
function MateriasEstudadas({ sessoes, editais }) {
  const [periodo, setPeriodo] = useState("hoje");

  const isTotal = periodo === "total";

  // Sessões filtradas pelo período (vazio no modo Total)
  const ss = useMemo(() => {
    if (isTotal) return [];
    const ranges = { hoje: periodoHoje(), semana: periodoSemana(), mes: periodoMes() };
    const [ini, fim] = ranges[periodo] || periodoHoje();
    return sessoesNoPeriodo(sessoes, ini, fim);
  }, [periodo, sessoes, isTotal]);

  // Acumular por matéria no período selecionado
  const porMateria = useMemo(() => {
    const acc = {};
    ss.forEach((s) => {
      const key = `${s.editalId}_${s.materiaId}`;
      if (!acc[key]) acc[key] = { editalId: s.editalId, materiaId: s.materiaId, horas: 0, questoes: 0, certas: 0 };
      acc[key].horas    += s.duracao / 3600;
      acc[key].questoes += s.questoesFeitas  || 0;
      acc[key].certas   += s.questoesCertas  || 0;
    });
    return acc;
  }, [ss]);

  // Acumular total geral por matéria (todas as sessões, sem filtro)
  const totalPorMateria = useMemo(() => {
    const acc = {};
    sessoes.forEach((s) => {
      const key = `${s.editalId}_${s.materiaId}`;
      if (!acc[key]) acc[key] = { editalId: s.editalId, materiaId: s.materiaId, horas: 0, questoes: 0, certas: 0 };
      acc[key].horas    += s.duracao / 3600;
      acc[key].questoes += s.questoesFeitas  || 0;
      acc[key].certas   += s.questoesCertas  || 0;
    });
    return acc;
  }, [sessoes]);

  const items       = Object.values(isTotal ? totalPorMateria : porMateria).sort((a, b) => b.horas - a.horas);
  const maxH        = Math.max(...items.map((i) => i.horas), 0.1);
  const totalHGeral = Object.values(totalPorMateria).reduce((a, v) => a + v.horas, 0);

  const PERIODOS = [
    { id: "hoje",   label: "Hoje"   },
    { id: "semana", label: "Semana" },
    { id: "mes",    label: "Mês"    },
    { id: "total",  label: "Total"  },
  ];

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <SL style={{ marginBottom: 0 }}>Matérias Estudadas</SL>
        <div style={{ display: "flex", gap: 4 }}>
          {PERIODOS.map((p) => (
            <button key={p.id} onClick={() => setPeriodo(p.id)}
              style={{ background: periodo === p.id ? C.accent : "transparent", border: `1px solid ${periodo === p.id ? C.accent : C.border}`, color: periodo === p.id ? "#fff" : C.textMuted, borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontFamily: SANS, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.04em", transition: "all 0.15s" }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px 0", color: C.textMuted, fontFamily: SANS, fontSize: 13 }}>
          {isTotal ? "Nenhuma sessão registrada" : "Nenhuma sessão neste período"}
        </div>
      ) : (
        <div>
          {items.map((item) => {
            const ed      = editais.find((e) => e.id === item.editalId);
            const mat     = ed?.materias.find((m) => m.id === item.materiaId);
            const acerto  = item.questoes > 0 ? Math.round((item.certas / item.questoes) * 100) : null;
            const totItem = totalPorMateria[`${item.editalId}_${item.materiaId}`];
            return (
              <div key={`${item.editalId}_${item.materiaId}`} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: C.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, marginRight: 8 }}>{mat?.nome || "—"}</span>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: ed?.cor || C.accent }}>{item.horas.toFixed(1)}h</span>
                    {!isTotal && totItem && totItem.horas > item.horas && (
                      <span style={{ fontSize: 10, color: C.textMuted }}>/ {totItem.horas.toFixed(1)}h total</span>
                    )}
                    {acerto !== null && (
                      <span style={{ fontSize: 11, fontWeight: 600, color: acerto >= 70 ? C.green : acerto >= 50 ? C.yellow : C.red, background: (acerto >= 70 ? C.green : acerto >= 50 ? C.yellow : C.red) + "18", borderRadius: 5, padding: "1px 7px" }}>{acerto}%</span>
                    )}
                  </div>
                </div>
                <PBar val={item.horas} max={maxH} color={ed?.cor || C.accent} h={5} />
              </div>
            );
          })}
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.border}`, display: "flex", gap: 16, fontSize: 11, color: C.textMuted }}>
            <span>{items.reduce((a, i) => a + i.horas, 0).toFixed(1)}h</span>
            <span>{items.reduce((a, i) => a + i.questoes, 0)} questões</span>
            {!isTotal && totalHGeral > 0 && (
              <span style={{ marginLeft: "auto" }}>Total acumulado: {totalHGeral.toFixed(1)}h</span>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

// ─── SESSAO FORM ──────────────────────────────────────────────────────────────
// topicoQuestoes: [{ topicoId, topicoNome, feitas, certas }]
function SessaoForm({ editais, initial, onSave, onCancel, showDateTime = false }) {
  const [edId, setEdId]         = useState(initial?.editalId  || String(editais[0]?.id || ""));
  const [matId, setMatId]       = useState(initial?.materiaId || "");
  const [tipo, setTipo]         = useState(initial?.tipo      || "teoria");
  const [ondeParei, setOndeParei] = useState(initial?.ondeParei || "");
  const [horas, setHoras]       = useState(initial?.horas     || "");
  const [minutos, setMinutos]   = useState(initial?.minutos   || "");
  const [dataHora, setDataHora] = useState(initial?.dataHora  || new Date().toISOString().slice(0, 16));

  // Questões gerais (sem tópico)
  const [feitasGeral, setFeitasGeral] = useState(initial?.feitasGeral || "");
  const [certasGeral, setCertasGeral] = useState(initial?.certasGeral || "");

  // Questões por tópico: array de { id, topicoId, topicoNome, feitas, certas }
  const [topicoQuestoes, setTopicoQuestoes] = useState(initial?.topicoQuestoes || []);
  const [novoTopSel, setNovoTopSel]         = useState("");

  const ed     = editais.find((e) => e.id === Number(edId));
  const matOpts = (ed?.materias || []).map((m) => ({ value: String(m.id), label: m.nome }));
  const mat    = ed?.materias.find((m) => m.id === Number(matId));

  // Tópicos ainda não adicionados
  const topicosDisponiveis = (mat?.topicos || []).filter(
    (t) => !topicoQuestoes.some((tq) => String(tq.topicoId) === String(t.id))
  );
  const topOpts = [
    { value: "", label: "Selecionar tópico…" },
    ...topicosDisponiveis.map((t) => ({ value: String(t.id), label: t.nome })),
  ];

  function adicionarTopico() {
    if (!novoTopSel) return;
    const top = mat?.topicos?.find((t) => String(t.id) === novoTopSel);
    if (!top) return;
    setTopicoQuestoes((prev) => [...prev, { id: uid(), topicoId: top.id, topicoNome: top.nome, feitas: "", certas: "" }]);
    setNovoTopSel("");
  }

  function atualizarTopico(id, field, value) {
    setTopicoQuestoes((prev) => prev.map((tq) => tq.id === id ? { ...tq, [field]: value } : tq));
  }

  function removerTopico(id) {
    setTopicoQuestoes((prev) => prev.filter((tq) => tq.id !== id));
  }

  // Totais calculados
  const totalFeitas = (Number(feitasGeral) || 0) + topicoQuestoes.reduce((a, tq) => a + (Number(tq.feitas) || 0), 0);
  const totalCertas = (Number(certasGeral) || 0) + topicoQuestoes.reduce((a, tq) => a + (Number(tq.certas) || 0), 0);
  const pctTotal    = totalFeitas > 0 ? Math.round((totalCertas / totalFeitas) * 100) : null;
  const pctColor    = (p) => p >= 70 ? C.green : p >= 50 ? C.yellow : C.red;

  function submit() {
    if (!matId) return;
    const dur = (Number(horas) || 0) * 3600 + (Number(minutos) || 0) * 60;
    onSave({
      editalId:       Number(edId),
      materiaId:      Number(matId),
      tipo,
      questoesFeitas: totalFeitas,
      questoesCertas: totalCertas,
      topicoQuestoes: topicoQuestoes.map((tq) => ({
        topicoId:  tq.topicoId,
        topicoNome: tq.topicoNome,
        feitas:    Number(tq.feitas) || 0,
        certas:    Number(tq.certas) || 0,
      })),
      // Mantém campo legado "topico" com o primeiro tópico (compatibilidade)
      topico:  topicoQuestoes[0]?.topicoId ? String(topicoQuestoes[0].topicoId) : "",
      ondeParei,
      duracao: dur,
      data:    showDateTime ? new Date(dataHora).toISOString() : new Date().toISOString(),
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Edital + Matéria */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Select label="Edital" value={String(edId)} onChange={(v) => { setEdId(v); setMatId(""); setTopicoQuestoes([]); }}
          options={editais.map((e) => ({ value: String(e.id), label: `${e.sigla} — ${e.nome}` }))} />
        <Select label="Matéria" value={String(matId)} onChange={(v) => { setMatId(v); setTopicoQuestoes([]); }}
          options={[{ value: "", label: "Selecione..." }, ...matOpts]} />
      </div>

      <Select label="Tipo de Estudo" value={tipo} onChange={setTipo}
        options={TIPOS_ESTUDO.map((t) => ({ value: t.value, label: t.label }))} />

      {/* Data/hora e duração */}
      {showDateTime && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <Input label="Data e hora" type="datetime-local" value={dataHora} onChange={setDataHora} />
          <Input label="Horas" type="number" min="0" max="24" value={horas} onChange={setHoras} placeholder="0" />
          <Input label="Minutos" type="number" min="0" max="59" value={minutos} onChange={setMinutos} placeholder="0" />
        </div>
      )}

      {/* ── Questões por tópico ── */}
      <div style={{ border: `1px solid ${C.border}`, borderRadius: 9, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ background: C.bg, padding: "10px 14px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8 }}>
            Questões por Tópico
          </div>
          {/* Linha de adição */}
          {matId && topicosDisponiveis.length > 0 && (
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              <div style={{ flex: 1 }}>
                <select value={novoTopSel} onChange={(e) => setNovoTopSel(e.target.value)}
                  style={{ width: "100%", background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: 7, padding: "7px 10px", color: novoTopSel ? C.textPrimary : C.textMuted, fontFamily: SANS, fontSize: 12, outline: "none" }}>
                  {topOpts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <button onClick={adicionarTopico} disabled={!novoTopSel}
                style={{ background: C.accent, border: "none", color: "#fff", borderRadius: 7, padding: "7px 14px", cursor: novoTopSel ? "pointer" : "not-allowed", fontFamily: SANS, fontSize: 12, fontWeight: 500, opacity: novoTopSel ? 1 : 0.4, whiteSpace: "nowrap" }}>
                + Adicionar
              </button>
            </div>
          )}
          {matId && topicosDisponiveis.length === 0 && topicoQuestoes.length > 0 && (
            <div style={{ fontSize: 12, color: C.textMuted }}>Todos os tópicos da matéria foram adicionados.</div>
          )}
          {!matId && (
            <div style={{ fontSize: 12, color: C.textMuted }}>Selecione uma matéria para adicionar tópicos.</div>
          )}
        </div>

        {/* Tópicos adicionados */}
        {topicoQuestoes.length > 0 && (
          <div>
            {/* Cabeçalho da tabela */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 88px 88px auto", gap: 8, padding: "8px 14px 4px", background: C.bg, borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Tópico</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center" }}>Feitas</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center" }}>Certas</span>
              <span style={{ width: 28 }} />
            </div>
            {topicoQuestoes.map((tq) => {
              const p = (Number(tq.feitas) || 0) > 0 ? Math.round(((Number(tq.certas) || 0) / (Number(tq.feitas) || 1)) * 100) : null;
              return (
                <div key={tq.id} style={{ display: "grid", gridTemplateColumns: "1fr 88px 88px auto", gap: 8, padding: "8px 14px", borderBottom: `1px solid ${C.border}22`, alignItems: "center" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = C.bg}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: C.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tq.topicoNome}</div>
                    {p !== null && (
                      <div style={{ marginTop: 3 }}>
                        <span style={{ fontSize: 10, fontWeight: 600, color: pctColor(p), background: pctColor(p) + "18", borderRadius: 4, padding: "1px 6px" }}>{p}%</span>
                      </div>
                    )}
                  </div>
                  <input type="number" min="0" value={tq.feitas} onChange={(e) => atualizarTopico(tq.id, "feitas", e.target.value)}
                    style={{ background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 8px", color: C.textPrimary, fontFamily: SANS, fontSize: 12, outline: "none", textAlign: "center", width: "100%" }}
                    onFocus={(e) => e.target.style.borderColor = C.accent}
                    onBlur={(e) => e.target.style.borderColor = C.border}
                    placeholder="0" />
                  <input type="number" min="0" value={tq.certas} onChange={(e) => atualizarTopico(tq.id, "certas", e.target.value)}
                    style={{ background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 8px", color: C.green, fontFamily: SANS, fontSize: 12, outline: "none", fontWeight: 600, textAlign: "center", width: "100%" }}
                    onFocus={(e) => e.target.style.borderColor = C.green}
                    onBlur={(e) => e.target.style.borderColor = C.border}
                    placeholder="0" />
                  <button onClick={() => removerTopico(tq.id)}
                    style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 14, padding: "2px 4px", borderRadius: 4 }}
                    onMouseEnter={(e) => e.currentTarget.style.color = C.red}
                    onMouseLeave={(e) => e.currentTarget.style.color = C.textMuted}>×</button>
                </div>
              );
            })}
          </div>
        )}

        {/* Questões gerais (sem tópico específico) */}
        <div style={{ padding: "10px 14px", background: topicoQuestoes.length > 0 ? C.bgInput : "transparent" }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: C.textMuted, marginBottom: 8 }}>
            {topicoQuestoes.length > 0 ? "Questões sem tópico específico (opcional)" : "Questões gerais da matéria"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Input label="Feitas" type="number" min="0" value={feitasGeral} onChange={setFeitasGeral} />
            <Input label="Certas" type="number" min="0" value={certasGeral} onChange={setCertasGeral} />
          </div>
        </div>

        {/* Total consolidado */}
        {totalFeitas > 0 && (
          <div style={{ padding: "10px 14px", background: C.accentLight, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: C.textSecondary }}>Total da sessão</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: SANS, fontSize: 13, color: C.textSecondary }}>{totalFeitas} feitas</span>
              <span style={{ fontFamily: SANS, fontSize: 13, color: C.green, fontWeight: 600 }}>{totalCertas} certas</span>
              {pctTotal !== null && (
                <span style={{ background: pctColor(pctTotal) + "18", color: pctColor(pctTotal), border: `1px solid ${pctColor(pctTotal)}30`, borderRadius: 6, padding: "2px 10px", fontFamily: SANS, fontSize: 13, fontWeight: 700 }}>
                  {pctTotal}%
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <Textarea label="Onde parei" value={ondeParei} onChange={setOndeParei}
        placeholder="Ex: Pág. 142 — Cap. 4, juros compostos..." rows={2} />

      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        <Btn onClick={onCancel} variant="ghost" style={{ flex: 1 }}>Cancelar</Btn>
        <Btn onClick={submit} disabled={!matId} style={{ flex: 1 }}>Salvar</Btn>
      </div>
    </div>
  );
}

// ─── TRACKER ──────────────────────────────────────────────────────────────────
function Tracker({ state, setState }) {
  const [elapsed, setElapsed] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selEdital, setSelEdital] = useState(String(state.editais[0]?.id || ""));
  const [selMateria, setSelMateria] = useState("");
  const [tipo, setTipo] = useState("teoria");
  const [topico, setTopico] = useState("");
  const [topicoQuestoes, setTopicoQuestoes] = useState([]);
  const [novoTopSel, setNovoTopSel] = useState("");
  const [feitasGeral, setFeitasGeral] = useState("");
  const [certasGeral, setCertasGeral] = useState("");
  const [ondeParei, setOndeParei] = useState("");
  const ivRef = useRef(null);
  const tracker = state.tracker;
  const running = tracker.ativo && tracker.inicio;

  useEffect(() =>{
    if (running) {
      ivRef.current = setInterval(() =>{
        const base = tracker.pausas.reduce((a, p) =>a + (p.fim - p.inicio), 0);
        setElapsed(Math.floor((Date.now() - tracker.inicio - base) / 1000));
      }, 1000);
    }
    return () =>clearInterval(ivRef.current);
  }, [running, tracker]);

  const edAtivo = state.editais.find((e) =>e.id === tracker.editalId);
  const matAtiva = edAtivo?.materias.find((m) =>m.id === tracker.materiaId);
  const topicosMatAtiva = matAtiva?.topicos || [];
  const tipoAtivo = tipoInfo(tracker.tipo);

  function iniciar() {
    if (!selMateria) return;
    setState((s) =>({ ...s, tracker: { ativo: true, inicio: Date.now(), editalId: Number(selEdital), materiaId: Number(selMateria), tipo, pausas: [] } }));
    setModalOpen(false);
  }

  function parar() {
    const dur = elapsed;
    const totalFeitas = (Number(feitasGeral) || 0) + topicoQuestoes.reduce((a, tq) => a + (Number(tq.feitas) || 0), 0);
    const totalCertas = (Number(certasGeral) || 0) + topicoQuestoes.reduce((a, tq) => a + (Number(tq.certas) || 0), 0);
    setState((s) => {
      const sessao = {
        id: uid(), editalId: tracker.editalId, materiaId: tracker.materiaId,
        tipo: tracker.tipo || "teoria", duracao: dur, data: new Date().toISOString(),
        questoesFeitas: totalFeitas, questoesCertas: totalCertas,
        topicoQuestoes: topicoQuestoes.map((tq) => ({ topicoId: tq.topicoId, topicoNome: tq.topicoNome, feitas: Number(tq.feitas) || 0, certas: Number(tq.certas) || 0 })),
        topico: topicoQuestoes[0]?.topicoId ? String(topicoQuestoes[0].topicoId) : "",
        ondeParei,
      };
      const novosEditais = s.editais.map((e) => {
        if (e.id !== tracker.editalId) return e;
        return { ...e, materias: e.materias.map((m) => {
          if (m.id !== tracker.materiaId) return m;
          return { ...m, horasEstudadas: m.horasEstudadas + dur / 3600, questoesFeitas: m.questoesFeitas + totalFeitas, questoesCertas: m.questoesCertas + totalCertas };
        })};
      });
      return { ...s, sessoes: [...s.sessoes, sessao], editais: novosEditais, tracker: { ativo: false, inicio: null, editalId: null, materiaId: null, pausas: [] } };
    });
    setElapsed(0); setFeitasGeral(""); setCertasGeral(""); setTopicoQuestoes([]); setNovoTopSel(""); setOndeParei("");
  }

  const edOpts = state.editais.map((e) =>({ value: String(e.id), label: `${e.sigla} — ${e.nome}` }));
  const matOpts = (state.editais.find((e) =>e.id === Number(selEdital))?.materias || []).map((m) =>({ value: String(m.id), label: m.nome }));
  const topOpts = [
    { value: "", label: "Tópico geral da matéria" },
    ...topicosMatAtiva.map((t) =>({ value: String(t.id), label: t.nome })),
  ];

  return (
    <>
      <Card glow={running ? C.accent : null} style={{ position: "relative", overflow: "hidden" }}>
        {running && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.accent},${C.purple},${C.teal})` }} />}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: C.textPrimary }}>Tracker de Estudos</span>
          {running && (
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <Badge color={tipoAtivo.color}>{tipoAtivo.label}</Badge>
              <Badge color={C.green}>● AO VIVO</Badge>
            </div>
          )}
        </div>
        {running ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: SANS, fontSize: 52, fontWeight: 700, color: C.accent, letterSpacing: "0.06em", lineHeight: 1 }}>{fmtClock(elapsed)}</div>
              <div style={{ marginTop: 6, color: C.textSecondary, fontFamily: SANS, fontSize: 12 }}>{edAtivo?.sigla} — {matAtiva?.nome}</div>
            </div>

            {/* Questões por tópico inline */}
            {(() => {
              const topicosDisponiveis = topicosMatAtiva.filter((t) => !topicoQuestoes.some((tq) => String(tq.topicoId) === String(t.id)));
              const totalFeitas = (Number(feitasGeral) || 0) + topicoQuestoes.reduce((a, tq) => a + (Number(tq.feitas) || 0), 0);
              const totalCertas = (Number(certasGeral) || 0) + topicoQuestoes.reduce((a, tq) => a + (Number(tq.certas) || 0), 0);
              const pctTotal = totalFeitas > 0 ? Math.round((totalCertas / totalFeitas) * 100) : null;
              const pctColor = (p) => p >= 70 ? C.green : p >= 50 ? C.yellow : C.red;
              return (
                <div style={{ border: `1px solid ${C.border}`, borderRadius: 9, overflow: "hidden" }}>
                  {/* Adicionar tópico */}
                  {topicosDisponiveis.length > 0 && (
                    <div style={{ padding: "10px 12px", background: C.bg, borderBottom: `1px solid ${C.border}`, display: "flex", gap: 8 }}>
                      <select value={novoTopSel} onChange={(e) => setNovoTopSel(e.target.value)}
                        style={{ flex: 1, background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 8px", color: novoTopSel ? C.textPrimary : C.textMuted, fontFamily: SANS, fontSize: 12, outline: "none" }}>
                        <option value="">Adicionar tópico…</option>
                        {topicosDisponiveis.map((t) => <option key={t.id} value={String(t.id)}>{t.nome}</option>)}
                      </select>
                      <button onClick={() => {
                        if (!novoTopSel) return;
                        const top = topicosMatAtiva.find((t) => String(t.id) === novoTopSel);
                        if (!top) return;
                        setTopicoQuestoes((prev) => [...prev, { id: uid(), topicoId: top.id, topicoNome: top.nome, feitas: "", certas: "" }]);
                        setNovoTopSel("");
                      }} disabled={!novoTopSel}
                        style={{ background: C.accent, border: "none", color: "#fff", borderRadius: 6, padding: "6px 12px", cursor: novoTopSel ? "pointer" : "not-allowed", fontFamily: SANS, fontSize: 12, fontWeight: 500, opacity: novoTopSel ? 1 : 0.4 }}>
                        + Add
                      </button>
                    </div>
                  )}

                  {/* Linhas de tópicos */}
                  {topicoQuestoes.map((tq) => {
                    const p = (Number(tq.feitas) || 0) > 0 ? Math.round(((Number(tq.certas) || 0) / (Number(tq.feitas) || 1)) * 100) : null;
                    return (
                      <div key={tq.id} style={{ display: "grid", gridTemplateColumns: "1fr 72px 72px 24px", gap: 8, padding: "8px 12px", borderBottom: `1px solid ${C.border}22`, alignItems: "center" }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 12, color: C.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tq.topicoNome}</div>
                          {p !== null && <span style={{ fontSize: 10, fontWeight: 600, color: pctColor(p), background: pctColor(p) + "18", borderRadius: 4, padding: "1px 5px" }}>{p}%</span>}
                        </div>
                        <input type="number" min="0" value={tq.feitas} onChange={(e) => setTopicoQuestoes((prev) => prev.map((x) => x.id === tq.id ? { ...x, feitas: e.target.value } : x))}
                          style={{ background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: 6, padding: "5px 6px", color: C.textPrimary, fontFamily: SANS, fontSize: 12, outline: "none", textAlign: "center" }}
                          onFocus={(e) => e.target.style.borderColor = C.accent} onBlur={(e) => e.target.style.borderColor = C.border} placeholder="0" />
                        <input type="number" min="0" value={tq.certas} onChange={(e) => setTopicoQuestoes((prev) => prev.map((x) => x.id === tq.id ? { ...x, certas: e.target.value } : x))}
                          style={{ background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: 6, padding: "5px 6px", color: C.green, fontFamily: SANS, fontSize: 12, outline: "none", fontWeight: 600, textAlign: "center" }}
                          onFocus={(e) => e.target.style.borderColor = C.green} onBlur={(e) => e.target.style.borderColor = C.border} placeholder="0" />
                        <button onClick={() => setTopicoQuestoes((prev) => prev.filter((x) => x.id !== tq.id))}
                          style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 14, padding: 0 }}
                          onMouseEnter={(e) => e.currentTarget.style.color = C.red} onMouseLeave={(e) => e.currentTarget.style.color = C.textMuted}>×</button>
                      </div>
                    );
                  })}

                  {/* Questões gerais */}
                  <div style={{ padding: "8px 12px", background: topicoQuestoes.length > 0 ? C.bg : "transparent" }}>
                    <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>{topicoQuestoes.length > 0 ? "Sem tópico específico" : "Questões gerais"}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <Input label="Feitas" type="number" min="0" value={feitasGeral} onChange={setFeitasGeral} />
                      <Input label="Certas" type="number" min="0" value={certasGeral} onChange={setCertasGeral} />
                    </div>
                  </div>

                  {/* Total */}
                  {totalFeitas > 0 && (
                    <div style={{ padding: "8px 12px", background: C.accentLight, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: C.textSecondary }}>Total</span>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: C.textSecondary }}>{totalFeitas} feitas</span>
                        <span style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>{totalCertas} certas</span>
                        {pctTotal !== null && <span style={{ fontSize: 12, fontWeight: 700, color: pctColor(pctTotal), background: pctColor(pctTotal) + "18", borderRadius: 5, padding: "1px 8px" }}>{pctTotal}%</span>}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            <Textarea label="Onde parei" value={ondeParei} onChange={setOndeParei} placeholder="Ex: Pág. 142 — Cap. 4, juros compostos..." rows={2} />
            <Btn onClick={parar} color={C.red} style={{ width: "100%" }}>Encerrar Sessão</Btn>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ textAlign: "center", padding: "14px 0" }}>
              <div style={{ fontFamily: SANS, fontSize: 44, color: C.textMuted, lineHeight: 1 }}>00:00:00</div>
              <div style={{ marginTop: 6, color: C.textMuted, fontFamily: SANS, fontSize: 12 }}>Nenhuma sessão ativa</div>
            </div>
            <Btn onClick={() =>setModalOpen(true)} style={{ width: "100%" }}>Iniciar Sessão</Btn>
          </div>
        )}
      </Card>
      <Modal open={modalOpen} onClose={() =>setModalOpen(false)} title="Nova Sessão de Estudos">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Select label="Edital" value={selEdital} onChange={(v) =>{ setSelEdital(v); setSelMateria(""); }} options={edOpts} />
          <Select label="Matéria" value={selMateria} onChange={setSelMateria} options={[{ value: "", label: "Selecione a matéria..." }, ...matOpts]} />
          <Select label="Tipo de Estudo" value={tipo} onChange={setTipo} options={TIPOS_ESTUDO.map((t) =>({ value: t.value, label: t.label }))} />
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <Btn onClick={() =>setModalOpen(false)} variant="ghost" style={{ flex: 1 }}>Cancelar</Btn>
            <Btn onClick={iniciar} disabled={!selMateria} style={{ flex: 1 }}>Iniciar</Btn>
          </div>
        </div>
      </Modal>
    </>
  );
}

// ─── RELATÓRIOS ───────────────────────────────────────────────────────────────
function Relatorios({ state }) {
  const hoje = new Date();
  const [dataIni, setDataIni] = useState(() =>{ const d = new Date(); d.setDate(d.getDate() - 29); return d.toISOString().slice(0, 10); });
  const [dataFim, setDataFim] = useState(() =>hoje.toISOString().slice(0, 10));
  const [edFiltro, setEdFiltro] = useState("todos");
  const [aba, setAba] = useState("horas");

  const ini = useMemo(() =>{ const d = new Date(dataIni); d.setHours(0, 0, 0, 0); return d; }, [dataIni]);
  const fim = useMemo(() =>{ const d = new Date(dataFim); d.setHours(23, 59, 59, 999); return d; }, [dataFim]);

  const ss = useMemo(() =>{
    return sessoesNoPeriodo(state.sessoes, ini, fim).filter((s) =>edFiltro === "todos" || s.editalId === Number(edFiltro));
  }, [state.sessoes, ini, fim, edFiltro]);

  const totalH = ss.reduce((a, s) =>a + s.duracao / 3600, 0);
  const totalQ = ss.reduce((a, s) =>a + s.questoesFeitas, 0);
  const totalC = ss.reduce((a, s) =>a + s.questoesCertas, 0);
  const acertoGeral = totalQ >0 ? Math.round((totalC / totalQ) * 100) : 0;

  const porMateria = {};
  ss.forEach((s) =>{
    const k = `${s.editalId}_${s.materiaId}`;
    if (!porMateria[k]) porMateria[k] = { editalId: s.editalId, materiaId: s.materiaId, horas: 0, questoes: 0, certas: 0 };
    porMateria[k].horas += s.duracao / 3600;
    porMateria[k].questoes += s.questoesFeitas || 0;
    porMateria[k].certas += s.questoesCertas || 0;
  });
  const matItems = Object.values(porMateria).sort((a, b) =>b.horas - a.horas).slice(0, 15);
  const questMatItems = Object.values(porMateria).filter((i) =>i.questoes >0).sort((a, b) =>b.questoes - a.questoes).slice(0, 12);

  const porTipo = {};
  ss.forEach((s) =>{
    const t = s.tipo || "teoria";
    if (!porTipo[t]) porTipo[t] = { tipo: t, horas: 0, questoes: 0, certas: 0 };
    porTipo[t].horas += s.duracao / 3600;
    porTipo[t].questoes += s.questoesFeitas || 0;
    porTipo[t].certas += s.questoesCertas || 0;
  });
  const tipoItems = Object.values(porTipo).sort((a, b) =>b.horas - a.horas);

  const porTopico = {};
  ss.forEach((s) =>{
    if (!s.topico) return;
    const ed = state.editais.find((e) =>e.id === s.editalId);
    const mat = ed?.materias.find((m) =>m.id === s.materiaId);
    const top = mat?.topicos?.find((t) =>String(t.id) === String(s.topico));
    if (!top) return;
    const k = `${s.editalId}_${s.materiaId}_${s.topico}`;
    if (!porTopico[k]) porTopico[k] = { nome: top.nome, matNome: mat.nome, horas: 0, questoes: 0, certas: 0, cor: ed?.cor || C.accent };
    porTopico[k].horas += s.duracao / 3600;
    porTopico[k].questoes += s.questoesFeitas || 0;
    porTopico[k].certas += s.questoesCertas || 0;
  });
  const topicoItems = Object.values(porTopico).sort((a, b) =>b.horas - a.horas).slice(0, 15);

  const diasPeriodo = Math.min(Math.round((fim - ini) / 86400000) + 1, 60);
  const dias = Array.from({ length: diasPeriodo }, (_, i) =>{
    const d = new Date(ini); d.setDate(d.getDate() + i);
    const ds = d.toDateString();
    const dayS = ss.filter((s) =>new Date(s.data).toDateString() === ds);
    return {
      label: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      h: dayS.reduce((a, s) =>a + s.duracao / 3600, 0),
      q: dayS.reduce((a, s) =>a + s.questoesFeitas, 0),
    };
  });
  const maxDH = Math.max(...dias.map((d) =>d.h), 0.5);
  const maxDQ = Math.max(...dias.map((d) =>d.q), 1);
  const maxMatH = Math.max(...matItems.map((i) =>i.horas), 0.1);
  const maxMatQ = Math.max(...questMatItems.map((i) =>i.questoes), 1);
  const maxTipoH = Math.max(...tipoItems.map((i) =>i.horas), 0.1);
  const maxTopH = Math.max(...topicoItems.map((i) =>i.horas), 0.1);

  const ABAS = [
    { id: "horas", label: " Horas" },
    { id: "questoes", label: " Questões" },
    { id: "tipos", label: "📂 Tipos" },
    { id: "topicos", label: " Tópicos" },
    { id: "evolucao", label: " Evolução" },
  ];

  const edOpts = [
    { value: "todos", label: "Todos os editais" },
    ...state.editais.map((e) =>({ value: String(e.id), label: `${e.sigla} — ${e.nome}` })),
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 600, color: C.textPrimary, margin: 0 }}>Relatórios</h2>

      <Card style={{ padding: "16px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <Input label="Data inicial" type="date" value={dataIni} onChange={setDataIni} />
          <Input label="Data final" type="date" value={dataFim} onChange={setDataFim} />
          <Select label="Edital" value={edFiltro} onChange={setEdFiltro} options={edOpts} />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {[{ label: "Últimos 7 dias", d: 7 }, { label: "Últimos 30 dias", d: 30 }, { label: "Últimos 90 dias", d: 90 }].map((p) =>(
            <button key={p.d} onClick={() =>{
              const f = new Date(); const i = new Date(); i.setDate(i.getDate() - p.d + 1);
              setDataIni(i.toISOString().slice(0, 10)); setDataFim(f.toISOString().slice(0, 10));
            }} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontFamily: SANS, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {p.label}
            </button>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10 }}>
        {[
          { label: "Horas no período", val: totalH.toFixed(1) + "h", color: C.accent, icon: "" },
          { label: "Sessões", val: ss.length, color: C.teal, icon: "" },
          { label: "Questões feitas", val: totalQ, color: C.purple, icon: "" },
          { label: "Aproveitamento", val: acertoGeral + "%", color: acertoGeral >= 70 ? C.green : acertoGeral >= 50 ? C.yellow : C.red, icon: "" },
        ].map((s) =>(
          <Card key={s.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 10, color: C.textMuted, fontFamily: SANS, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</span>
              <span style={{ fontSize: 15 }}>{s.icon}</span>
            </div>
            <div style={{ fontFamily: SANS, fontSize: 26, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.val}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "flex", gap: 4, borderBottom: `1px solid ${C.border}` }}>
        {ABAS.map((a) =>(
          <button key={a.id} onClick={() =>setAba(a.id)}
            style={{ background: "transparent", border: "none", borderBottom: aba === a.id ? `2px solid ${C.accent}` : "2px solid transparent", color: aba === a.id ? C.accent : C.textMuted, cursor: "pointer", fontFamily: SANS, fontSize: 13, fontWeight: 500, padding: "8px 14px", transition: "all 0.15s" }}>
            {a.label}
          </button>
        ))}
      </div>

      {aba === "horas" && (
        <Card>
          <SL>Horas por Matéria</SL>
          {matItems.length === 0 ? (
            <div style={{ color: C.textMuted, fontFamily: SANS, fontSize: 13, textAlign: "center", padding: 20 }}>Sem dados no período</div>
          ) : matItems.map((item) =>{
            const ed = state.editais.find((e) =>e.id === item.editalId);
            const mat = ed?.materias.find((m) =>m.id === item.materiaId);
            return (
              <HBar key={`${item.editalId}_${item.materiaId}`}
                label={`${ed?.sigla} · ${mat?.nome || "—"}`}
                val={item.horas} max={maxMatH}
                color={ed?.cor || C.accent}
                sub={item.horas.toFixed(1) + "h"}
              />
            );
          })}
        </Card>
      )}

      {aba === "questoes" && (
        <Card>
          <SL>Questões por Matéria</SL>
          {questMatItems.length === 0 ? (
            <div style={{ color: C.textMuted, fontFamily: SANS, fontSize: 13, textAlign: "center", padding: 20 }}>Sem questões no período</div>
          ) : questMatItems.map((item) =>{
            const ed = state.editais.find((e) =>e.id === item.editalId);
            const mat = ed?.materias.find((m) =>m.id === item.materiaId);
            const ac = item.questoes >0 ? Math.round((item.certas / item.questoes) * 100) : 0;
            return (
              <div key={`${item.editalId}_${item.materiaId}`} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: SANS, fontSize: 12, color: C.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, marginRight: 8 }}>{ed?.sigla} · {mat?.nome || "—"}</span>
                  <span style={{ fontFamily: SANS, fontSize: 11, color: C.textMuted, flexShrink: 0 }}>{item.questoes}Q</span>
                </div>
                <div style={{ background: C.border, borderRadius: 99, height: 8, overflow: "hidden", position: "relative" }}>
                  <div style={{ width: `${Math.min(100, (item.questoes / maxMatQ) * 100)}%`, background: (ed?.cor || C.accent) + "44", height: "100%", borderRadius: 99, position: "absolute" }} />
                  <div style={{ width: `${Math.min(100, (item.certas / maxMatQ) * 100)}%`, background: ac >= 70 ? C.green : ac >= 50 ? C.yellow : C.red, height: "100%", borderRadius: 99, position: "absolute" }} />
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <span style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted }}>{item.questoes} feitas</span>
                  <span style={{ fontFamily: SANS, fontSize: 10, color: ac >= 70 ? C.green : ac >= 50 ? C.yellow : C.red }}>{item.certas} certas ({ac}%)</span>
                </div>
              </div>
            );
          })}
        </Card>
      )}

      {aba === "tipos" && (
        <Card>
          <SL>Distribuição por Tipo de Estudo</SL>
          {tipoItems.length === 0 ? (
            <div style={{ color: C.textMuted, fontFamily: SANS, fontSize: 13, textAlign: "center", padding: 20 }}>Sem dados no período</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {tipoItems.map((item) =>{
                const info = tipoInfo(item.tipo);
                const pct = totalH >0 ? Math.round((item.horas / totalH) * 100) : 0;
                const ac = item.questoes >0 ? Math.round((item.certas / item.questoes) * 100) : null;
                return (
                  <div key={item.tipo} style={{ background: C.bg, borderRadius: 8, padding: "12px 14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: info.color, flexShrink: 0 }} />
                        <span style={{ fontFamily: SANS, fontSize: 13, color: C.textPrimary }}>{info.label}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontFamily: SANS, fontSize: 12, color: info.color }}>{item.horas.toFixed(1)}h</span>
                        <span style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted }}>{pct}%</span>
                      </div>
                    </div>
                    <PBar val={item.horas} max={maxTipoH} color={info.color} h={6} />
                    {ac !== null && (
                      <div style={{ marginTop: 6, fontFamily: SANS, fontSize: 10, color: C.textMuted }}>{item.questoes} questões · {ac}% acerto</div>
                    )}
                  </div>
                );
              })}
              {tipoItems.length >1 && (
                <div style={{ height: 14, borderRadius: 7, overflow: "hidden", display: "flex", marginTop: 4 }}>
                  {tipoItems.map((item) =>{
                    const info = tipoInfo(item.tipo);
                    const pct = totalH >0 ? (item.horas / totalH) * 100 : 0;
                    return <div key={item.tipo} title={`${info.label}: ${item.horas.toFixed(1)}h`} style={{ width: `${pct}%`, background: info.color, transition: "width 0.5s" }} />;
                  })}
                </div>
              )}
            </div>
          )}
        </Card>
      )}

      {aba === "topicos" && (
        <Card>
          <SL>Horas por Tópico</SL>
          {topicoItems.length === 0 ? (
            <div style={{ color: C.textMuted, fontFamily: SANS, fontSize: 13, textAlign: "center", padding: 20 }}>Nenhuma sessão com tópico definido no período</div>
          ) : topicoItems.map((item, i) =>(
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: SANS, fontSize: 12, color: C.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.nome}</div>
                  <div style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted }}>{item.matNome}</div>
                </div>
                <span style={{ fontFamily: SANS, fontSize: 11, color: item.cor, flexShrink: 0, marginLeft: 8 }}>{item.horas.toFixed(1)}h</span>
              </div>
              <PBar val={item.horas} max={maxTopH} color={item.cor} h={5} />
            </div>
          ))}
        </Card>
      )}

      {aba === "evolucao" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card>
            <SL>Horas por Dia</SL>
            {dias.every((d) =>d.h === 0) ? (
              <div style={{ color: C.textMuted, fontFamily: SANS, fontSize: 13, textAlign: "center", padding: 20 }}>Sem dados no período</div>
            ) : (
              <div style={{ display: "flex", alignItems: "flex-end", gap: diasPeriodo >30 ? 1 : 3, overflowX: "auto", height: 100, paddingBottom: 4 }}>
                {dias.map((d, i) =>(
                  <div key={i} title={`${d.label}: ${d.h.toFixed(1)}h`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minWidth: diasPeriodo >30 ? 4 : 10, flex: 1 }}>
                    <div style={{ width: "100%", background: d.h >0 ? C.accent : C.border, borderRadius: "2px 2px 0 0", height: `${Math.max((d.h / maxDH) * 72, d.h >0 ? 3 : 1)}px`, transition: "height 0.3s" }} />
                    {diasPeriodo <= 21 && <span style={{ fontSize: 8, color: C.textMuted, fontFamily: FONT }}>{d.label}</span>}
                  </div>
                ))}
              </div>
            )}
          </Card>
          <Card>
            <SL>Questões por Dia</SL>
            {dias.every((d) =>d.q === 0) ? (
              <div style={{ color: C.textMuted, fontFamily: SANS, fontSize: 13, textAlign: "center", padding: 20 }}>Sem questões no período</div>
            ) : (
              <div style={{ display: "flex", alignItems: "flex-end", gap: diasPeriodo >30 ? 1 : 3, overflowX: "auto", height: 100, paddingBottom: 4 }}>
                {dias.map((d, i) =>(
                  <div key={i} title={`${d.label}: ${d.q} questões`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minWidth: diasPeriodo >30 ? 4 : 10, flex: 1 }}>
                    <div style={{ width: "100%", background: d.q >0 ? C.purple : C.border, borderRadius: "2px 2px 0 0", height: `${Math.max((d.q / maxDQ) * 72, d.q >0 ? 3 : 1)}px`, transition: "height 0.3s" }} />
                    {diasPeriodo <= 21 && <span style={{ fontSize: 8, color: C.textMuted, fontFamily: FONT }}>{d.label}</span>}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── CICLOS ───────────────────────────────────────────────────────────────────
function CicloItemRow({ item, idx2, isCurrent, ed, ciclo, state, setState, onAvancar }) {
  const [expandido, setExpandido]     = useState(false);
  const [trackerAtivo, setTrackerAtivo] = useState(false);
  const [elapsed, setElapsed]         = useState(0);
  const [inicioTs, setInicioTs]       = useState(null);
  const [modalManual, setModalManual] = useState(false);

  // Form fields
  const [tipo, setTipo]               = useState("teoria");
  const [ondeParei, setOndeParei]     = useState("");
  const [feitasGeral, setFeitasGeral] = useState("");
  const [certasGeral, setCertasGeral] = useState("");
  const [topicoQuestoes, setTopicoQuestoes] = useState([]); // [{id,topicoId,topicoNome,feitas,certas}]
  const [novoTopSel, setNovoTopSel]   = useState("");

  const ivRef = useRef(null);

  const ultimaSessao = state.sessoes
    .filter((s) => s.editalId === ciclo.editalId && s.materiaId === item.materiaId && s.ondeParei)
    .sort((a, b) => new Date(b.data) - new Date(a.data))[0];

  const mat = state.editais.find((e) => e.id === ciclo.editalId)?.materias.find((m) => m.id === item.materiaId);
  const topicosDisponiveis = (mat?.topicos || []).filter(
    (t) => !topicoQuestoes.some((tq) => String(tq.topicoId) === String(t.id))
  );

  const horasMateria = state.sessoes
    .filter((s) => s.editalId === ciclo.editalId && s.materiaId === item.materiaId)
    .reduce((a, s) => a + s.duracao / 3600, 0);

  // Totais calculados
  const totalFeitas = (Number(feitasGeral) || 0) + topicoQuestoes.reduce((a, tq) => a + (Number(tq.feitas) || 0), 0);
  const totalCertas = (Number(certasGeral) || 0) + topicoQuestoes.reduce((a, tq) => a + (Number(tq.certas) || 0), 0);
  const pctTotal    = totalFeitas > 0 ? Math.round((totalCertas / totalFeitas) * 100) : null;
  const pctColor    = (p) => p >= 70 ? C.green : p >= 50 ? C.yellow : C.red;

  useEffect(() => {
    if (trackerAtivo) {
      ivRef.current = setInterval(() => setElapsed(Math.floor((Date.now() - inicioTs) / 1000)), 1000);
    }
    return () => clearInterval(ivRef.current);
  }, [trackerAtivo, inicioTs]);

  function adicionarTopico() {
    if (!novoTopSel) return;
    const top = mat?.topicos?.find((t) => String(t.id) === novoTopSel);
    if (!top) return;
    setTopicoQuestoes((prev) => [...prev, { id: uid(), topicoId: top.id, topicoNome: top.nome, feitas: "", certas: "" }]);
    setNovoTopSel("");
  }

  function resetForm() {
    setTipo("teoria"); setOndeParei("");
    setFeitasGeral(""); setCertasGeral("");
    setTopicoQuestoes([]); setNovoTopSel("");
  }

  function iniciarTracker() { setInicioTs(Date.now()); setTrackerAtivo(true); setExpandido(true); }

  function encerrarTracker() {
    clearInterval(ivRef.current);
    setTrackerAtivo(false);
    salvarSessao(elapsed);
    setElapsed(0); setInicioTs(null);
  }

  function salvarSessao(dur) {
    setState((s) => ({
      ...s,
      sessoes: [...s.sessoes, {
        id: uid(), editalId: ciclo.editalId, materiaId: item.materiaId,
        tipo, duracao: dur, data: new Date().toISOString(),
        questoesFeitas: totalFeitas, questoesCertas: totalCertas,
        topicoQuestoes: topicoQuestoes.map((tq) => ({
          topicoId: tq.topicoId, topicoNome: tq.topicoNome,
          feitas: Number(tq.feitas) || 0, certas: Number(tq.certas) || 0,
        })),
        topico: topicoQuestoes[0]?.topicoId ? String(topicoQuestoes[0].topicoId) : "",
        ondeParei,
      }],
      editais: s.editais.map((e) => e.id !== ciclo.editalId ? e : {
        ...e, materias: e.materias.map((m) => m.id !== item.materiaId ? m : {
          ...m, horasEstudadas: m.horasEstudadas + dur / 3600,
          questoesFeitas: m.questoesFeitas + totalFeitas,
          questoesCertas: m.questoesCertas + totalCertas,
        }),
      }),
    }));
    resetForm();
  }

  function salvarSessaoManual(dados) {
    setState((s) => ({
      ...s,
      sessoes: [...s.sessoes, { id: uid(), ...dados }],
      editais: s.editais.map((e) => e.id !== ciclo.editalId ? e : {
        ...e, materias: e.materias.map((m) => m.id !== item.materiaId ? m : {
          ...m, horasEstudadas: m.horasEstudadas + dados.duracao / 3600,
          questoesFeitas: m.questoesFeitas + dados.questoesFeitas,
          questoesCertas: m.questoesCertas + dados.questoesCertas,
        }),
      }),
    }));
    setModalManual(false);
  }

  const barPct = item.minutos > 0 ? Math.min(100, (horasMateria * 60 / item.minutos) * 100) : 0;
  const edCorBorder = isCurrent ? ed?.cor || C.accent : C.border;

  return (
    <>
      <div style={{ borderLeft: `3px solid ${edCorBorder}`, background: isCurrent ? (ed?.cor || C.accent) + "0a" : C.bg, borderRadius: "0 8px 8px 0", marginBottom: 4, overflow: "hidden" }}>
        {/* Linha principal */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px" }}>
          {trackerAtivo && <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, flexShrink: 0 }} />}
          <span style={{ flex: 1, fontSize: 14, fontWeight: isCurrent ? 600 : 400, color: isCurrent ? C.textPrimary : C.textSecondary }}>{item.nome}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {trackerAtivo && <span style={{ fontSize: 12, color: C.green, minWidth: 64, fontFamily: MONO }}>{fmtClock(elapsed)}</span>}
            <span style={{ fontSize: 11, color: C.textMuted }}>
              {(horasMateria * 60).toFixed(0)}min / {item.minutos}min
            </span>
          </div>
          <button onClick={() => setExpandido((v) => !v)}
            style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 13, padding: "2px 6px" }}>
            {expandido ? "↑" : "↓"}
          </button>
        </div>

        {/* Barra de progresso */}
        <div style={{ height: 2, background: C.border, marginLeft: 16, marginRight: 16, marginBottom: expandido ? 0 : 8 }}>
          <div style={{ width: `${barPct}%`, height: "100%", background: ed?.cor || C.accent, borderRadius: 99, transition: "width 0.4s" }} />
        </div>

        {/* Painel expandido */}
        {expandido && (
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}22` }}>

            {/* Onde parei — última sessão */}
            {ultimaSessao && !trackerAtivo && (
              <div style={{ background: "#FFFBEB", border: `1px solid ${C.yellow}33`, borderRadius: 8, padding: "8px 12px", marginBottom: 12 }}>
                <div style={{ fontSize: 9, color: C.yellow, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3, fontWeight: 600 }}>Onde parei</div>
                <div style={{ fontSize: 12, color: C.textSecondary }}>{ultimaSessao.ondeParei}</div>
                <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>
                  {new Date(ultimaSessao.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            )}

            {/* Tracker ativo: campos de sessão com multi-tópico */}
            {trackerAtivo && (
              <div style={{ marginBottom: 12 }}>
                <Select label="Tipo de estudo" value={tipo} onChange={setTipo}
                  options={TIPOS_ESTUDO.map((t) => ({ value: t.value, label: t.label }))} />

                {/* Painel questões por tópico */}
                <div style={{ border: `1px solid ${C.border}`, borderRadius: 9, overflow: "hidden", marginTop: 10 }}>
                  {/* Linha de adição de tópico */}
                  {topicosDisponiveis.length > 0 && (
                    <div style={{ padding: "8px 12px", background: C.bg, borderBottom: `1px solid ${C.border}`, display: "flex", gap: 8 }}>
                      <select value={novoTopSel} onChange={(e) => setNovoTopSel(e.target.value)}
                        style={{ flex: 1, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 8px", color: novoTopSel ? C.textPrimary : C.textMuted, fontFamily: SANS, fontSize: 12, outline: "none" }}>
                        <option value="">Adicionar tópico…</option>
                        {topicosDisponiveis.map((t) => <option key={t.id} value={String(t.id)}>{t.nome}</option>)}
                      </select>
                      <button onClick={adicionarTopico} disabled={!novoTopSel}
                        style={{ background: C.accent, border: "none", color: "#fff", borderRadius: 6, padding: "6px 12px", cursor: novoTopSel ? "pointer" : "not-allowed", fontFamily: SANS, fontSize: 12, fontWeight: 500, opacity: novoTopSel ? 1 : 0.4 }}>
                        + Add
                      </button>
                    </div>
                  )}

                  {/* Cabeçalho tabela */}
                  {topicoQuestoes.length > 0 && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 72px 72px 24px", gap: 0, padding: "6px 12px 4px", background: C.bg, borderBottom: `1px solid ${C.border}` }}>
                      <span style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Tópico</span>
                      <span style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center" }}>Feitas</span>
                      <span style={{ fontSize: 10, fontWeight: 600, color: C.green, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center" }}>Certas</span>
                      <span />
                    </div>
                  )}

                  {/* Linhas de tópicos */}
                  {topicoQuestoes.map((tq) => {
                    const p = (Number(tq.feitas) || 0) > 0 ? Math.round(((Number(tq.certas) || 0) / (Number(tq.feitas) || 1)) * 100) : null;
                    return (
                      <div key={tq.id} style={{ display: "grid", gridTemplateColumns: "1fr 72px 72px 24px", gap: 4, padding: "6px 12px", borderBottom: `1px solid ${C.border}22`, alignItems: "center" }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 12, color: C.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tq.topicoNome}</div>
                          {p !== null && <span style={{ fontSize: 10, fontWeight: 600, color: pctColor(p), background: pctColor(p) + "18", borderRadius: 4, padding: "1px 5px" }}>{p}%</span>}
                        </div>
                        <input type="number" min="0" value={tq.feitas}
                          onChange={(e) => setTopicoQuestoes((prev) => prev.map((x) => x.id === tq.id ? { ...x, feitas: e.target.value } : x))}
                          style={{ background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: 6, padding: "5px 4px", color: C.textPrimary, fontFamily: SANS, fontSize: 12, outline: "none", textAlign: "center", width: "100%" }}
                          onFocus={(e) => e.target.style.borderColor = C.accent} onBlur={(e) => e.target.style.borderColor = C.border}
                          placeholder="0" />
                        <input type="number" min="0" value={tq.certas}
                          onChange={(e) => setTopicoQuestoes((prev) => prev.map((x) => x.id === tq.id ? { ...x, certas: e.target.value } : x))}
                          style={{ background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: 6, padding: "5px 4px", color: C.green, fontFamily: SANS, fontSize: 12, outline: "none", fontWeight: 600, textAlign: "center", width: "100%" }}
                          onFocus={(e) => e.target.style.borderColor = C.green} onBlur={(e) => e.target.style.borderColor = C.border}
                          placeholder="0" />
                        <button onClick={() => setTopicoQuestoes((prev) => prev.filter((x) => x.id !== tq.id))}
                          style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 14, padding: 0 }}
                          onMouseEnter={(e) => e.currentTarget.style.color = C.red} onMouseLeave={(e) => e.currentTarget.style.color = C.textMuted}>×</button>
                      </div>
                    );
                  })}

                  {/* Questões gerais */}
                  <div style={{ padding: "8px 12px", background: topicoQuestoes.length > 0 ? C.bg : "transparent" }}>
                    <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 6, fontWeight: 500 }}>
                      {topicoQuestoes.length > 0 ? "Sem tópico específico" : "Questões gerais da matéria"}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <Input label="Feitas" type="number" min="0" value={feitasGeral} onChange={setFeitasGeral} />
                      <Input label="Certas" type="number" min="0" value={certasGeral} onChange={setCertasGeral} />
                    </div>
                  </div>

                  {/* Total consolidado */}
                  {totalFeitas > 0 && (
                    <div style={{ padding: "8px 12px", background: C.accentLight, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: C.textSecondary, fontWeight: 500 }}>Total</span>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: C.textSecondary }}>{totalFeitas} feitas</span>
                        <span style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>{totalCertas} certas</span>
                        {pctTotal !== null && (
                          <span style={{ fontSize: 12, fontWeight: 700, color: pctColor(pctTotal), background: pctColor(pctTotal) + "18", borderRadius: 5, padding: "1px 8px" }}>{pctTotal}%</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: 10 }}>
                  <Textarea label="Onde parei" value={ondeParei} onChange={setOndeParei} placeholder="Pág., capítulo, link..." rows={2} />
                </div>
              </div>
            )}

            {/* Botões */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {!trackerAtivo ? (
                <>
                  <button onClick={iniciarTracker}
                    style={{ background: C.green + "22", border: `1px solid ${C.green}44`, color: C.green, borderRadius: 20, padding: "5px 14px", cursor: "pointer", fontFamily: SANS, fontSize: 12, fontWeight: 500 }}>
                    Iniciar Estudo
                  </button>
                  <button onClick={() => setModalManual(true)}
                    style={{ background: C.accent + "18", border: `1px solid ${C.accent}44`, color: C.accent, borderRadius: 20, padding: "5px 14px", cursor: "pointer", fontFamily: SANS, fontSize: 12 }}>
                    Adicionar Manualmente
                  </button>
                  {isCurrent && (
                    <button onClick={onAvancar}
                      style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 20, padding: "5px 14px", cursor: "pointer", fontFamily: SANS, fontSize: 12 }}>
                      Próxima Matéria
                    </button>
                  )}
                </>
              ) : (
                <button onClick={encerrarTracker}
                  style={{ background: C.redLight, border: `1px solid ${C.red}44`, color: C.red, borderRadius: 20, padding: "5px 14px", cursor: "pointer", fontFamily: SANS, fontSize: 12, fontWeight: 500 }}>
                  Encerrar Sessão
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <Modal open={modalManual} onClose={() => setModalManual(false)} title={`Adicionar Estudo — ${item.nome}`} width={600}>
        <SessaoForm
          editais={state.editais}
          initial={{ editalId: String(ciclo.editalId), materiaId: String(item.materiaId) }}
          onSave={salvarSessaoManual}
          onCancel={() => setModalManual(false)}
          showDateTime={true}
        />
      </Modal>
    </>
  );
}

function Ciclos({ state, setState }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nome: "", editalId: "", itens: [] });
  const [novoItem, setNovoItem] = useState({ materiaId: "", minutos: "60" });
  const [cicloExpandido, setCicloExpandido] = useState(null);

  const edOpts = state.editais.map((e) =>({ value: String(e.id), label: `${e.sigla} — ${e.nome}` }));
  const matOpts = (state.editais.find((e) =>e.id === Number(form.editalId))?.materias || []).map((m) =>({ value: String(m.id), label: m.nome }));

  function abrirNovo() {
    setEditando(null);
    setForm({ nome: "", editalId: String(state.editais[0]?.id || ""), itens: [] });
    setNovoItem({ materiaId: "", minutos: "60" });
    setModalOpen(true);
  }
  function abrirEditar(ciclo) {
    setEditando(ciclo.id);
    setForm({ nome: ciclo.nome, editalId: String(ciclo.editalId), itens: [...ciclo.itens] });
    setNovoItem({ materiaId: "", minutos: "60" });
    setModalOpen(true);
  }
  function addItem() {
    if (!novoItem.materiaId) return;
    const ed = state.editais.find((e) =>e.id === Number(form.editalId));
    const mat = ed?.materias.find((m) =>m.id === Number(novoItem.materiaId));
    if (!mat) return;
    setForm((f) =>({ ...f, itens: [...f.itens, { id: uid(), materiaId: Number(novoItem.materiaId), nome: mat.nome, minutos: Number(novoItem.minutos) }] }));
    setNovoItem({ materiaId: "", minutos: "60" });
  }
  function removeItem(id) { setForm((f) =>({ ...f, itens: f.itens.filter((i) =>i.id !== id) })); }
  function salvar() {
    if (!form.nome || form.itens.length === 0) return;
    if (editando) {
      setState((s) =>({ ...s, ciclos: s.ciclos.map((c) =>c.id === editando ? { ...c, nome: form.nome, editalId: Number(form.editalId), itens: form.itens } : c) }));
    } else {
      const novoId = uid();
      setState((s) =>({ ...s, ciclos: [...s.ciclos, { id: novoId, nome: form.nome, editalId: Number(form.editalId), itens: form.itens, ativo: false, rodadaAtual: 0, ciclosCompletos: 0 }] }));
      setCicloExpandido(novoId);
    }
    setModalOpen(false);
  }
  function deletarCiclo(id) { setState((s) =>({ ...s, ciclos: s.ciclos.filter((c) =>c.id !== id) })); }
  function toggleAtivo(id) { setState((s) =>({ ...s, ciclos: s.ciclos.map((c) =>({ ...c, ativo: c.id === id ? !c.ativo : false })) })); }
  function avancarCiclo(cicloId) {
    setState((s) =>({
      ...s, ciclos: s.ciclos.map((c) =>{
        if (c.id !== cicloId) return c;
        const novaRodada = (c.rodadaAtual || 0) + 1;
        const ciclosCompletos = (c.ciclosCompletos || 0) + (novaRodada % c.itens.length === 0 ? 1 : 0);
        return { ...c, rodadaAtual: novaRodada, ciclosCompletos };
      }),
    }));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 600, color: C.textPrimary, margin: 0 }}>Ciclos de Estudo</h2>
        <Btn onClick={abrirNovo} variant="outline">+ Novo Ciclo</Btn>
      </div>

      {state.ciclos.length === 0 && (
        <Card style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}></div>
          <div style={{ fontFamily: SANS, fontSize: 14, color: C.textSecondary }}>Nenhum ciclo criado</div>
          <div style={{ fontFamily: SANS, fontSize: 12, color: C.textMuted, marginTop: 4 }}>Organize suas matérias em blocos de tempo por ciclo</div>
        </Card>
      )}

      {state.ciclos.map((ciclo) =>{
        const ed = state.editais.find((e) =>e.id === ciclo.editalId);
        const totalMin = ciclo.itens.reduce((a, i) =>a + i.minutos, 0);
        const rodadaAtual = ciclo.rodadaAtual || 0;
        const idx = rodadaAtual % ciclo.itens.length;
        const ciclosCompletos = ciclo.ciclosCompletos || 0;
        const isExp = cicloExpandido === ciclo.id;

        // Progresso total do ciclo: horas estudadas vs horas planejadas
        const horasTotaisEstudadas = ciclo.itens.reduce((acc, item) =>{
          return acc + state.sessoes.filter((s) =>s.editalId === ciclo.editalId && s.materiaId === item.materiaId).reduce((a, s) =>a + s.duracao / 3600, 0);
        }, 0);
        const horasTotaisPlano = totalMin / 60;
        const progressoPct = horasTotaisPlano >0 ? Math.min(100, (horasTotaisEstudadas / horasTotaisPlano) * 100) : 0;

        return (
          <Card key={ciclo.id} glow={ciclo.ativo ? ed?.cor || C.green : null}>
            {/* Header do ciclo */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  {ciclo.ativo && <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, flexShrink: 0 }} />}
                  <span style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.textPrimary }}>{ciclo.nome}</span>
                  {ed && <Badge color={ed.cor}>{ed.sigla}</Badge>}
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  {/* Ciclos completos */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div>
                      <div style={{ fontFamily: SANS, fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Ciclos completos</div>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", border: `3px solid ${ciclosCompletos >0 ? ed?.cor || C.green : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontSize: 18, fontWeight: 700, color: ciclosCompletos >0 ? ed?.cor || C.green : C.textMuted }}>
                        {ciclosCompletos}
                      </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 160 }}>
                      <div style={{ fontFamily: SANS, fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Progresso</div>
                      <div style={{ fontFamily: SANS, fontSize: 11, color: C.textSecondary, marginBottom: 5 }}>
                        {(horasTotaisEstudadas * 60).toFixed(0)}min / {totalMin}min
                      </div>
                      <PBar val={horasTotaisEstudadas} max={horasTotaisPlano} color={ed?.cor || C.accent} h={8} />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <Btn onClick={() =>abrirEditar(ciclo)} variant="ghost" style={{ padding: "6px 10px", fontSize: 12 }}>Editar</Btn>
                <Btn onClick={() =>toggleAtivo(ciclo.id)} color={C.green} variant={ciclo.ativo ? "fill" : "outline"} style={{ padding: "6px 12px", fontSize: 12 }}>{ciclo.ativo ? "Ativo" : "Ativar"}</Btn>
                <Btn onClick={() =>deletarCiclo(ciclo.id)} variant="danger" style={{ padding: "6px 10px", fontSize: 12 }}>Excluir</Btn>
              </div>
            </div>

            {/* Sequência dos estudos */}
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
              <div style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Sequência dos Estudos</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {ciclo.itens.map((item, idx2) =>{
                  const isCurrent = idx2 === idx;
                  return (
                    <CicloItemRow
                      key={item.id}
                      item={item} idx2={idx2} isCurrent={isCurrent}
                      ed={ed} ciclo={ciclo} state={state} setState={setState}
                      onAvancar={() =>avancarCiclo(ciclo.id)}
                    />
                  );
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
                <button onClick={() =>avancarCiclo(ciclo.id)}
                  style={{ background: ed?.cor || C.accent, border: "none", color: "#fff", borderRadius: 20, padding: "8px 24px", cursor: "pointer", fontFamily: SANS, fontSize: 13, fontWeight: 600 }}>
                  Avançar Ciclo
                </button>
              </div>
            </div>
          </Card>
        );
      })}

      <Modal open={modalOpen} onClose={() =>setModalOpen(false)} title={editando ? "Editar Ciclo" : "Novo Ciclo de Estudo"} width={620}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Input label="Nome do ciclo" value={form.nome} onChange={(v) =>setForm((f) =>({ ...f, nome: v }))} placeholder="Ex: Ciclo Semanal BB..." />
          <Select label="Edital" value={form.editalId || ""} onChange={(v) =>setForm((f) =>({ ...f, editalId: v, itens: [] }))} options={[{ value: "", label: "Selecione..." }, ...edOpts]} />
          {form.editalId && (
            <div>
              <SL>Adicionar matéria ao ciclo</SL>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 90px auto", gap: 8, alignItems: "flex-end" }}>
                <Select value={novoItem.materiaId || ""} onChange={(v) =>setNovoItem((n) =>({ ...n, materiaId: v }))} options={[{ value: "", label: "Matéria..." }, ...matOpts]} />
                <Input type="number" min="10" step="5" value={novoItem.minutos} onChange={(v) =>setNovoItem((n) =>({ ...n, minutos: v }))} placeholder="min" />
                <Btn onClick={addItem} variant="outline" style={{ padding: "9px 14px" }}>+ Add</Btn>
              </div>
            </div>
          )}
          {form.itens.length >0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <SL>Ordem ({form.itens.length} matérias) — arraste para reordenar</SL>
              <DragList
                items={form.itens}
                onReorder={(next) => setForm((f) => ({ ...f, itens: next }))}
                renderItem={(item, i) => (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.bg, borderRadius: 8, padding: "8px 12px", marginBottom: 4 }}>
                    <span style={{ color: C.textMuted, fontSize: 15, lineHeight: 1, padding: "0 2px", userSelect: "none", flexShrink: 0 }} title="Arrastar">⠿</span>
                    <span style={{ fontFamily: SANS, fontSize: 11, color: C.textMuted, width: 18, flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ flex: 1, fontFamily: SANS, fontSize: 13, color: C.textPrimary }}>{item.nome}</span>
                    <Badge color={C.accent}>{item.minutos}min</Badge>
                    <button onClick={() =>removeItem(item.id)} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 14 }}>×</button>
                  </div>
                )}
              />
              <div style={{ fontFamily: SANS, fontSize: 11, color: C.textMuted, marginTop: 2 }}>
                Total: {(form.itens.reduce((a, i) =>a + i.minutos, 0) / 60).toFixed(1)}h/rodada
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 4, borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
            <Btn onClick={() =>setModalOpen(false)} variant="ghost" style={{ flex: 1 }}>Cancelar</Btn>
            <Btn onClick={salvar} disabled={!form.nome || form.itens.length === 0} style={{ flex: 1 }}>{editando ? "Salvar Alterações" : "Criar Ciclo"}</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── SIMULADOS ────────────────────────────────────────────────────────────────
function Simulados({ state, setState }) {
  const [modalNovo, setModalNovo] = useState(false);
  const [modalDetalhe, setModalDetalhe] = useState(null);
  const [form, setForm] = useState({ nome: "", editalId: "", banca: "", tipo: "Múltipla Escolha", data: new Date().toISOString().slice(0, 10), duracao: "02:30:00", total: "", certas: "", disciplinas: [] });
  const [novaDisciplina, setNovaDisciplina] = useState({ nome: "", total: "", certas: "" });

  const sims = (state.simulados || []).sort((a, b) =>new Date(b.data) - new Date(a.data));
  const edOpts = [{ value: "", label: "Nenhum" }, ...state.editais.map((e) =>({ value: String(e.id), label: `${e.sigla} — ${e.nome}` }))];

  function addDisciplina() {
    if (!novaDisciplina.nome) return;
    setForm((f) =>({ ...f, disciplinas: [...f.disciplinas, { id: uid(), ...novaDisciplina }] }));
    setNovaDisciplina({ nome: "", total: "", certas: "" });
  }

  function salvar() {
    if (!form.nome) return;
    const qf = Number(form.total) || 0;
    const qc = Number(form.certas) || 0;
    const erros = qf - qc;
    const brancos = qf - qc - erros < 0 ? 0 : 0;
    const pct = qf >0 ? Math.round((qc / qf) * 100) : 0;
    const sim = { id: uid(), nome: form.nome, editalId: form.editalId ? Number(form.editalId) : null, banca: form.banca, tipo: form.tipo, data: form.data, duracao: form.duracao, total: qf, certas: qc, erros, brancos, pct, disciplinas: form.disciplinas };
    setState((s) =>({ ...s, simulados: [...(s.simulados || []), sim] }));
    setForm({ nome: "", editalId: "", banca: "", tipo: "Múltipla Escolha", data: new Date().toISOString().slice(0, 10), duracao: "02:30:00", total: "", certas: "", disciplinas: [] });
    setModalNovo(false);
  }

  function remover(id) { setState((s) =>({ ...s, simulados: (s.simulados || []).filter((s) =>s.id !== id) })); }

  // Stats
  const totalRealizados = sims.length;
  const ultimo = sims[0];
  const mediaPct = sims.length >0 ? Math.round(sims.reduce((a, s) =>a + s.pct, 0) / sims.length) : 0;

  function pctColor(pct) {
    if (pct >= 70) return C.green;
    if (pct >= 50) return C.yellow;
    return C.red;
  }
  function pctBadge(pct) {
    const c = pctColor(pct);
    return <span style={{ background: c + "22", color: c, border: `1px solid ${c}44`, borderRadius: 6, padding: "2px 8px", fontFamily: SANS, fontSize: 11, fontWeight: 700 }}>{pct}%</span>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 700, color: C.textPrimary, margin: 0 }}>Simulados</h2>
        <Btn onClick={() =>setModalNovo(true)}>+ Novo Simulado</Btn>
      </div>

      {/* Cards de resumo */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 14 }}>
        <Card style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SL style={{ marginBottom: 4 }}>Simulados realizados</SL>
          <div style={{ fontFamily: SANS, fontSize: 44, fontWeight: 700, color: C.accent, lineHeight: 1 }}>{totalRealizados}</div>
          {ultimo && (
            <div style={{ marginTop: 8, borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>
              <div style={{ fontFamily: SANS, fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Último simulado</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green }} />
                  <span style={{ fontFamily: SANS, fontSize: 11, color: C.green }}>{ultimo.certas} acertos</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.yellow }} />
                  <span style={{ fontFamily: SANS, fontSize: 11, color: C.yellow }}>{ultimo.brancos || 0} brancos</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.red }} />
                  <span style={{ fontFamily: SANS, fontSize: 11, color: C.red }}>{ultimo.erros} erros</span>
                </div>
              </div>
              <div style={{ marginTop: 8, fontFamily: SANS, fontSize: 24, fontWeight: 700, color: pctColor(ultimo.pct) }}>{ultimo.pct}%</div>
            </div>
          )}
        </Card>

        {/* Gráfico de evolução */}
        <Card>
          <SL style={{ marginBottom: 12 }}>Seu Desempenho</SL>
          {sims.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px 0", color: C.textMuted, fontFamily: SANS, fontSize: 13 }}>Nenhum simulado registrado</div>
          ) : (
            <div style={{ position: "relative", height: 120 }}>
              {/* SVG line chart */}
              {(() =>{
                const pts = [...sims].reverse().slice(-10);
                const W = 400; const H = 100;
                const minP = Math.max(0, Math.min(...pts.map((s) =>s.pct)) - 10);
                const maxP = Math.min(100, Math.max(...pts.map((s) =>s.pct)) + 10);
                const range = maxP - minP || 10;
                const coords = pts.map((s, i) =>({
                  x: pts.length === 1 ? W / 2 : (i / (pts.length - 1)) * W,
                  y: H - ((s.pct - minP) / range) * H,
                  pct: s.pct,
                  nome: s.nome,
                }));
                const pathD = coords.map((c, i) =>`${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
                return (
                  <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "100%" }} preserveAspectRatio="none">
                    <polyline fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={coords.map((c) =>`${c.x},${c.y}`).join(" ")} />
                    {coords.map((c, i) =>(
                      <g key={i}>
                        <circle cx={c.x} cy={c.y} r="5" fill={C.bgCard} stroke={C.accent} strokeWidth="2.5" />
                        <text x={c.x} y={c.y - 10} textAnchor="middle" fontSize="10" fill={C.textMuted} fontFamily={FONT}>{c.pct}%</text>
                      </g>
                    ))}
                  </svg>
                );
              })()}
            </div>
          )}
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 16, height: 2, background: C.accent, borderRadius: 1 }} />
              <span style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted }}>Desempenho</span>
            </div>
            {mediaPct >0 && <span style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted }}>Média: {mediaPct}%</span>}
          </div>
        </Card>
      </div>

      {/* Lista de simulados */}
      {sims.length === 0 ? (
        <Card style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}></div>
          <div style={{ fontFamily: SANS, fontSize: 14, color: C.textSecondary }}>Nenhum simulado registrado</div>
          <div style={{ fontFamily: SANS, fontSize: 12, color: C.textMuted, marginTop: 4 }}>Registre seus simulados para acompanhar a evolução</div>
        </Card>
      ) : sims.map((sim) =>{
        const ed = state.editais.find((e) =>e.id === sim.editalId);
        const isDetalhado = modalDetalhe === sim.id;
        return (
          <div key={sim.id} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px" }}>
              {/* Data */}
              <div style={{ fontFamily: SANS, fontSize: 11, color: C.textMuted, flexShrink: 0, minWidth: 52 }}>
                {new Date(sim.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" })}
              </div>
              {/* Nome e banca */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: C.accent }}>{sim.nome}</div>
                <div style={{ fontFamily: SANS, fontSize: 11, color: C.textMuted }}>{sim.tipo}{sim.banca ? ` · ${sim.banca}` : ""}{ed ? ` · ${ed.sigla}` : ""}</div>
              </div>
              {/* Stats */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                {sim.duracao && <span style={{ fontFamily: SANS, fontSize: 11, color: C.textMuted }}>{sim.duracao}</span>}
                {sim.total >0 && <span style={{ fontFamily: SANS, fontSize: 12, color: C.textSecondary }}>{sim.total}Q</span>}
                {sim.certas >0 && <span style={{ fontFamily: SANS, fontSize: 12, color: C.green }}>+{sim.certas}</span>}
                {sim.erros >0 && <span style={{ fontFamily: SANS, fontSize: 12, color: C.red }}>-{sim.erros}</span>}
                {sim.total >0 && pctBadge(sim.pct)}
                <button onClick={() =>setModalDetalhe(isDetalhado ? null : sim.id)}
                  style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 14, padding: "2px 6px" }}>
                  {isDetalhado ? "↑" : "↓"}
                </button>
                <button onClick={() =>remover(sim.id)} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 14, padding: "2px 6px" }}>Excluir</button>
              </div>
            </div>

            {/* Detalhe: disciplinas */}
            {isDetalhado && sim.disciplinas && sim.disciplinas.length >0 && (
              <div style={{ borderTop: `1px solid ${C.border}`, padding: "12px 20px" }}>
                <div style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Disciplinas</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {sim.disciplinas.map((d) =>{
                    const dPct = Number(d.total) >0 ? Math.round((Number(d.certas) / Number(d.total)) * 100) : null;
                    return (
                      <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.border, flexShrink: 0 }} />
                        <span style={{ flex: 1, fontFamily: SANS, fontSize: 13, color: C.textSecondary }}>{d.nome}</span>
                        {d.total && <span style={{ fontFamily: SANS, fontSize: 11, color: C.textMuted }}>{d.total}Q</span>}
                        {d.certas && <span style={{ fontFamily: SANS, fontSize: 11, color: C.green }}>+{d.certas}</span>}
                        {d.total && d.certas && <span style={{ fontFamily: SANS, fontSize: 11, color: Number(d.total) - Number(d.certas) >0 ? C.red : C.textMuted }}>-{Number(d.total) - Number(d.certas)}</span>}
                        {dPct !== null && pctBadge(dPct)}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Modal novo simulado */}
      <Modal open={modalNovo} onClose={() =>setModalNovo(false)} title="Registrar Simulado" width={620}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Nome do simulado" value={form.nome} onChange={(v) =>setForm((f) =>({ ...f, nome: v }))} placeholder="Ex: Simulado 01 — BB" />
            <Input label="Banca" value={form.banca} onChange={(v) =>setForm((f) =>({ ...f, banca: v }))} placeholder="Ex: Cesgranrio" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Select label="Tipo" value={form.tipo} onChange={(v) =>setForm((f) =>({ ...f, tipo: v }))} options={[{ value: "Múltipla Escolha", label: "Múltipla Escolha" }, { value: "Discursivo", label: "Discursivo" }, { value: "Misto", label: "Misto" }]} />
            <Input label="Data" type="date" value={form.data} onChange={(v) =>setForm((f) =>({ ...f, data: v }))} />
            <Input label="Duração (hh:mm)" value={form.duracao} onChange={(v) =>setForm((f) =>({ ...f, duracao: v }))} placeholder="02:30" />
          </div>
          <Select label="Edital (opcional)" value={form.editalId} onChange={(v) =>setForm((f) =>({ ...f, editalId: v }))} options={edOpts} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Total de questões" type="number" min="0" value={form.total} onChange={(v) =>setForm((f) =>({ ...f, total: v }))} />
            <Input label="Questões certas" type="number" min="0" value={form.certas} onChange={(v) =>setForm((f) =>({ ...f, certas: v }))} />
          </div>

          {/* Disciplinas */}
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
            <SL>Desempenho por disciplina (opcional)</SL>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px auto", gap: 8, alignItems: "flex-end", marginBottom: 8 }}>
              <Input placeholder="Nome da disciplina" value={novaDisciplina.nome} onChange={(v) =>setNovaDisciplina((d) =>({ ...d, nome: v }))} />
              <Input placeholder="Total" type="number" value={novaDisciplina.total} onChange={(v) =>setNovaDisciplina((d) =>({ ...d, total: v }))} />
              <Input placeholder="Certas" type="number" value={novaDisciplina.certas} onChange={(v) =>setNovaDisciplina((d) =>({ ...d, certas: v }))} />
              <Btn onClick={addDisciplina} variant="outline" style={{ padding: "9px 12px" }}>+</Btn>
            </div>
            {form.disciplinas.map((d, i) =>(
              <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 10, background: C.bg, borderRadius: 8, padding: "7px 12px", marginBottom: 4 }}>
                <span style={{ flex: 1, fontFamily: SANS, fontSize: 13, color: C.textSecondary }}>{d.nome}</span>
                {d.total && <span style={{ fontFamily: SANS, fontSize: 11, color: C.textMuted }}>{d.total}Q</span>}
                {d.certas && <span style={{ fontFamily: SANS, fontSize: 11, color: C.green }}>+{d.certas}</span>}
                {d.total && d.certas && <span style={{ fontFamily: SANS, fontSize: 11, color: C.red }}>-{Number(d.total) - Number(d.certas)}</span>}
                <button onClick={() =>setForm((f) =>({ ...f, disciplinas: f.disciplinas.filter((_, j) =>j !== i) }))} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 14 }}>×</button>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 4, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
            <Btn onClick={() =>setModalNovo(false)} variant="ghost" style={{ flex: 1 }}>Cancelar</Btn>
            <Btn onClick={salvar} disabled={!form.nome} style={{ flex: 1 }}>Salvar Simulado</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── DRAG LIST ─────────────────────────────────────────────────────────────────
// Reordenação de listas via drag & drop nativo (sem libs externas)
function DragList({ items, onReorder, renderItem }) {
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);

  function onDragStart(e, i) {
    setDragIdx(i);
    e.dataTransfer.effectAllowed = "move";
  }
  function onDragOver(e, i) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (i !== overIdx) setOverIdx(i);
  }
  function onDrop(e, i) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === i) { setDragIdx(null); setOverIdx(null); return; }
    const next = [...items];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(i, 0, moved);
    onReorder(next);
    setDragIdx(null);
    setOverIdx(null);
  }
  function onDragEnd() { setDragIdx(null); setOverIdx(null); }

  return (
    <div>
      {items.map((item, i) => {
        const isDragging = dragIdx === i;
        const isOver     = overIdx === i && dragIdx !== i;
        return (
          <div key={item.id ?? i}
            draggable
            onDragStart={(e) => onDragStart(e, i)}
            onDragOver={(e)  => onDragOver(e, i)}
            onDrop={(e)      => onDrop(e, i)}
            onDragEnd={onDragEnd}
            style={{
              opacity:    isDragging ? 0.35 : 1,
              borderTop:  isOver ? `2px solid ${C.accent}` : "2px solid transparent",
              transition: "opacity 0.15s, border-color 0.1s",
              cursor:     "grab",
            }}>
            {renderItem(item, i)}
          </div>
        );
      })}
    </div>
  );
}

// ─── EDITOR EDITAL ────────────────────────────────────────────────────────────
function EditorEdital({ edital, onSave, onClose }) {
  const [nome, setNome] = useState(edital.nome);
  const [sigla, setSigla] = useState(edital.sigla);
  const [banca, setBanca] = useState(edital.banca || "");
  const [ano, setAno] = useState(edital.ano || "");
  const [cor, setCor] = useState(edital.cor);
  const [materias, setMaterias] = useState(JSON.parse(JSON.stringify(edital.materias)));
  const [editMateria, setEditMateria] = useState(null);
  const [novaMateria, setNovaMateria] = useState({ nome: "", peso: "10" });
  const [novoTopico, setNovoTopico] = useState({ matIdx: null, texto: "" });
  const [editTopico, setEditTopico] = useState(null);
  const CORES = [C.accent, C.yellow, C.teal, C.purple, C.green, C.red, C.orange, "#E879F9", "#F59E0B"];

  function addMateria() {
    if (!novaMateria.nome.trim()) return;
    setMaterias((ms) =>[...ms, { id: uid(), nome: novaMateria.nome.trim(), peso: Number(novaMateria.peso) || 10, horasEstudadas: 0, questoesFeitas: 0, questoesCertas: 0, topicos: [] }]);
    setNovaMateria({ nome: "", peso: "10" });
  }
  function removeMateria(idx) { setMaterias((ms) =>ms.filter((_, i) =>i !== idx)); }
  function updateMateria(idx, field, value) {
    setMaterias((ms) =>ms.map((m, i) =>i === idx ? { ...m, [field]: field === "peso" ? Number(value) : value } : m));
  }
  function addTopico(matIdx) {
    if (!novoTopico.texto.trim()) return;
    setMaterias((ms) =>ms.map((m, i) =>i === matIdx ? { ...m, topicos: [...(m.topicos || []), { id: uid(), nome: novoTopico.texto.trim(), concluido: false }] } : m));
    setNovoTopico({ matIdx: null, texto: "" });
  }
  function removeTopico(matIdx, topIdx) { setMaterias((ms) =>ms.map((m, i) =>i === matIdx ? { ...m, topicos: m.topicos.filter((_, j) =>j !== topIdx) } : m)); }
  function saveTopico(matIdx, topIdx) {
    if (!editTopico?.texto.trim()) return;
    setMaterias((ms) =>ms.map((m, i) =>i === matIdx ? { ...m, topicos: m.topicos.map((t, j) =>j === topIdx ? { ...t, nome: editTopico.texto.trim() } : t) } : m));
    setEditTopico(null);
  }
  function reorderMaterias(next) { setMaterias(next); }
  function reorderTopicos(matIdx, next) {
    setMaterias((ms) => ms.map((m, i) => i === matIdx ? { ...m, topicos: next } : m));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <SL>Dados do Edital</SL>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 1fr 80px", gap: 10 }}>
          <Input label="Nome completo" value={nome} onChange={setNome} />
          <Input label="Sigla" value={sigla} onChange={(v) =>setSigla(v.toUpperCase())} />
          <Input label="Banca" value={banca} onChange={setBanca} />
          <Input label="Ano" value={ano} onChange={setAno} />
        </div>
        <div style={{ marginTop: 12 }}>
          <label style={{ fontSize: 11, color: C.textMuted, fontFamily: SANS, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>Cor</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CORES.map((c) =>(
              <div key={c} onClick={() =>setCor(c)} style={{ width: 28, height: 28, borderRadius: "50%", background: c, cursor: "pointer", border: cor === c ? `3px solid ${C.textPrimary}` : "3px solid transparent" }} />
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${C.border}` }} />
      <div>
        <SL>Matérias ({materias.length}) — arraste para reordenar</SL>
        <DragList items={materias} onReorder={reorderMaterias} renderItem={(mat, matIdx) => (
            <div style={{ background: C.bg, borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderBottom: `1px solid ${C.border}` }}>
                {/* Handle */}
                <div title="Arrastar para reordenar" style={{ cursor: "grab", color: C.textMuted, fontSize: 14, lineHeight: 1, padding: "0 4px", userSelect: "none", flexShrink: 0 }}>⠿</div>
                {editMateria?.idx === matIdx && editMateria.campo === "nome" ? (
                  <input autoFocus value={editMateria.valor}
                    onChange={(e) =>setEditMateria((em) =>({ ...em, valor: e.target.value }))}
                    onBlur={() =>{ updateMateria(matIdx, "nome", editMateria.valor); setEditMateria(null); }}
                    onKeyDown={(e) =>{ if (e.key === "Enter") { updateMateria(matIdx, "nome", editMateria.valor); setEditMateria(null); } }}
                    style={{ flex: 1, background: C.bgInput, border: `1px solid ${C.accent}`, borderRadius: 6, padding: "4px 8px", color: C.textPrimary, fontFamily: SANS, fontSize: 13, outline: "none" }}
                  />
                ) : (
                  <span onClick={() =>setEditMateria({ idx: matIdx, campo: "nome", valor: mat.nome })} style={{ flex: 1, fontFamily: SANS, fontSize: 13, fontWeight: 500, color: C.textPrimary, cursor: "text" }} title="Clique para editar">{mat.nome}</span>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted }}>Peso:</span>
                  {editMateria?.idx === matIdx && editMateria.campo === "peso" ? (
                    <input autoFocus type="number" min="1" max="100" value={editMateria.valor}
                      onChange={(e) =>setEditMateria((em) =>({ ...em, valor: e.target.value }))}
                      onBlur={() =>{ updateMateria(matIdx, "peso", editMateria.valor); setEditMateria(null); }}
                      onKeyDown={(e) =>{ if (e.key === "Enter") { updateMateria(matIdx, "peso", editMateria.valor); setEditMateria(null); } }}
                      style={{ width: 48, background: C.bgInput, border: `1px solid ${C.accent}`, borderRadius: 6, padding: "4px 6px", color: C.textPrimary, fontFamily: SANS, fontSize: 12, outline: "none", textAlign: "center" }}
                    />
                  ) : (
                    <span onClick={() =>setEditMateria({ idx: matIdx, campo: "peso", valor: String(mat.peso) })} style={{ fontFamily: SANS, fontSize: 11, color: cor, cursor: "text", background: cor + "22", padding: "2px 6px", borderRadius: 4 }} title="Clique para editar">{mat.peso}%</span>
                  )}
                  <button onClick={() =>removeMateria(matIdx)} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 14, padding: "2px 4px" }}>Excluir</button>
                </div>
              </div>
              <div style={{ padding: "10px 12px" }}>
                <DragList
                  items={mat.topicos || []}
                  onReorder={(next) => reorderTopicos(matIdx, next)}
                  renderItem={(top, topIdx) => (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: `1px solid ${C.border}22` }}>
                      {editTopico?.matIdx === matIdx && editTopico?.topIdx === topIdx ? (
                        <>
                          <input autoFocus value={editTopico.texto}
                            onChange={(e) =>setEditTopico((et) =>({ ...et, texto: e.target.value }))}
                            onKeyDown={(e) =>{ if (e.key === "Enter") saveTopico(matIdx, topIdx); if (e.key === "Escape") setEditTopico(null); }}
                            style={{ flex: 1, background: C.bgInput, border: `1px solid ${C.accent}`, borderRadius: 6, padding: "4px 8px", color: C.textPrimary, fontFamily: SANS, fontSize: 12, outline: "none" }}
                          />
                          <button onClick={() =>saveTopico(matIdx, topIdx)} style={{ background: C.green, border: "none", color: "#fff", borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontFamily: SANS, fontSize: 11 }}>✓</button>
                          <button onClick={() =>setEditTopico(null)} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 13 }}>✕</button>
                        </>
                      ) : (
                        <>
                          <span style={{ color: C.textMuted, fontSize: 13, lineHeight: 1, padding: "0 2px", userSelect: "none", flexShrink: 0, cursor: "grab" }} title="Arrastar para reordenar">⠿</span>
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: top.concluido ? C.green : C.border, flexShrink: 0 }} />
                          <span style={{ flex: 1, fontFamily: SANS, fontSize: 12, color: top.concluido ? C.textMuted : C.textSecondary, textDecoration: top.concluido ? "line-through" : "none" }}>{top.nome}</span>
                          <button onClick={() =>setEditTopico({ matIdx, topIdx, texto: top.nome })} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 12, padding: "2px 4px" }}>Editar</button>
                          <button onClick={() =>removeTopico(matIdx, topIdx)} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 12, padding: "2px 4px" }}>×</button>
                        </>
                      )}
                    </div>
                  )}
                />
                {novoTopico.matIdx === matIdx ? (
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <input autoFocus value={novoTopico.texto}
                      onChange={(e) =>setNovoTopico((n) =>({ ...n, texto: e.target.value }))}
                      onKeyDown={(e) =>{ if (e.key === "Enter") addTopico(matIdx); if (e.key === "Escape") setNovoTopico({ matIdx: null, texto: "" }); }}
                      placeholder="Nome do tópico..."
                      style={{ flex: 1, background: C.bgInput, border: `1px solid ${C.accent}`, borderRadius: 6, padding: "5px 8px", color: C.textPrimary, fontFamily: SANS, fontSize: 12, outline: "none" }}
                    />
                    <button onClick={() =>addTopico(matIdx)} style={{ background: C.accent, border: "none", color: "#fff", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontFamily: SANS, fontSize: 11 }}>+ Add</button>
                    <button onClick={() =>setNovoTopico({ matIdx: null, texto: "" })} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 14 }}>✕</button>
                  </div>
                ) : (
                  <button onClick={() =>setNovoTopico({ matIdx, texto: "" })} style={{ marginTop: 8, background: "transparent", border: `1px dashed ${C.border}`, borderRadius: 6, padding: "5px 12px", cursor: "pointer", color: C.textMuted, fontFamily: SANS, fontSize: 11, width: "100%" }}>
                    + Adicionar tópico
                  </button>
                )}
              </div>
            </div>
        )} />
        <div style={{ marginTop: 12, background: C.bg, borderRadius: 10, border: `1px dashed ${C.border}`, padding: "12px 14px" }}>
          <SL>Nova matéria</SL>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px auto", gap: 8, alignItems: "flex-end" }}>
            <Input placeholder="Nome da matéria" value={novaMateria.nome} onChange={(v) =>setNovaMateria((m) =>({ ...m, nome: v }))} />
            <Input label="Peso %" type="number" min="1" max="100" value={novaMateria.peso} onChange={(v) =>setNovaMateria((m) =>({ ...m, peso: v }))} />
            <Btn onClick={addMateria} variant="outline" style={{ padding: "9px 14px" }}>+ Adicionar</Btn>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
        <Btn onClick={onClose} variant="ghost" style={{ flex: 1 }}>Cancelar</Btn>
        <Btn onClick={() =>onSave({ ...edital, nome, sigla, banca, ano, cor, materias })} style={{ flex: 1 }}>Salvar Edital</Btn>
      </div>
    </div>
  );
}

// ─── EDITAIS ──────────────────────────────────────────────────────────────────
function Editais({ state, setState }) {
  const [expanded, setExpanded] = useState(null);
  const [expandedMat, setExpandedMat] = useState(null);
  const [modalRegistro, setModalRegistro] = useState(null);
  const [modalEdital, setModalEdital] = useState(false);
  const [modalEditor, setModalEditor] = useState(null);
  const [novoEdital, setNovoEdital] = useState({ nome: "", sigla: "", cor: C.accent });
  const CORES = [C.accent, C.yellow, C.teal, C.purple, C.green, C.red, C.orange];

  function toggleTopico(edId, matId, topId) {
    setState((s) =>({
      ...s,
      editais: s.editais.map((e) =>e.id !== edId ? e : {
        ...e, materias: e.materias.map((m) =>m.id !== matId ? m : {
          ...m, topicos: m.topicos.map((t) =>t.id !== topId ? t : { ...t, concluido: !t.concluido }),
        }),
      }),
    }));
  }

  function salvarRegistroManual(dados) {
    setState((s) =>({
      ...s,
      sessoes: [...s.sessoes, { id: uid(), ...dados }],
      editais: s.editais.map((e) =>e.id !== dados.editalId ? e : {
        ...e, materias: e.materias.map((m) =>m.id !== dados.materiaId ? m : {
          ...m, horasEstudadas: m.horasEstudadas + dados.duracao / 3600, questoesFeitas: m.questoesFeitas + dados.questoesFeitas, questoesCertas: m.questoesCertas + dados.questoesCertas,
        }),
      }),
    }));
    setModalRegistro(null);
  }

  function salvarEditorEdital(updated) {
    setState((s) =>({ ...s, editais: s.editais.map((e) =>e.id === updated.id ? updated : e) }));
    setModalEditor(null);
  }

  function criarEdital() {
    if (!novoEdital.nome) return;
    setState((s) =>({ ...s, editais: [...s.editais, { id: uid(), ...novoEdital, banca: "", ano: "", materias: [] }] }));
    setNovoEdital({ nome: "", sigla: "", cor: C.accent });
    setModalEdital(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 600, color: C.textPrimary, margin: 0 }}>Editais</h2>
        <Btn onClick={() =>setModalEdital(true)} variant="outline">+ Novo Edital</Btn>
      </div>

      {state.editais.map((ed) =>{
        const totalTopicos = ed.materias.reduce((a, m) =>a + (m.topicos?.length || 0), 0);
        const concluidos = ed.materias.reduce((a, m) =>a + (m.topicos?.filter((t) =>t.concluido).length || 0), 0);
        const totalH = ed.materias.reduce((a, m) =>a + m.horasEstudadas, 0);
        const totalQ = ed.materias.reduce((a, m) =>a + m.questoesFeitas, 0);
        const totalCc = ed.materias.reduce((a, m) =>a + m.questoesCertas, 0);
        const pct = totalTopicos >0 ? Math.round((concluidos / totalTopicos) * 100) : 0;
        const acerto = totalQ >0 ? Math.round((totalCc / totalQ) * 100) : 0;
        const isExp = expanded === ed.id;
        return (
          <Card key={ed.id} glow={isExp ? ed.cor : null}>
            <div onClick={() =>setExpanded(isExp ? null : ed.id)} style={{ cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: ed.cor, marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, color: C.textPrimary }}>{ed.sigla} — {ed.nome}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                      {ed.banca && <Badge color={ed.cor}>{ed.banca} {ed.ano}</Badge>}
                      <span style={{ fontFamily: SANS, fontSize: 11, color: C.textMuted }}>{totalH.toFixed(1)}h · {totalQ}Q · {acerto}%</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <span style={{ fontFamily: SANS, fontSize: 24, fontWeight: 700, color: ed.cor }}>{pct}%</span>
                  <button onClick={(e) =>{ e.stopPropagation(); setModalEditor(ed); }} style={{ background: ed.cor + "22", border: `1px solid ${ed.cor}44`, color: ed.cor, borderRadius: 6, padding: "4px 8px", cursor: "pointer", fontFamily: SANS, fontSize: 11 }}>Editar</button>
                  <span style={{ color: C.textMuted, fontSize: 12 }}>{isExp ? "↑" : "↓"}</span>
                </div>
              </div>
              <PBar val={concluidos} max={totalTopicos} color={ed.cor} h={6} />
              <div style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted, marginTop: 5 }}>{concluidos}/{totalTopicos} tópicos concluídos</div>
            </div>

            {isExp && (
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {ed.materias.map((mat) =>{
                  const mTop = mat.topicos || [];
                  const mConc = mTop.filter((t) =>t.concluido).length;
                  const mPct = mTop.length >0 ? Math.round((mConc / mTop.length) * 100) : 0;
                  const acM = mat.questoesFeitas >0 ? Math.round((mat.questoesCertas / mat.questoesFeitas) * 100) : 0;
                  const isMatExp = expandedMat === mat.id;
                  return (
                    <div key={mat.id} style={{ background: C.bg, borderRadius: 10, border: `1px solid ${C.border}` }}>
                      <div onClick={() =>setExpandedMat(isMatExp ? null : mat.id)} style={{ padding: "12px 14px", cursor: "pointer" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
                            <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 500, color: C.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{mat.nome}</span>
                            <Badge color={ed.cor}>Peso {mat.peso}%</Badge>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                            <span style={{ fontFamily: SANS, fontSize: 11, color: C.textSecondary }}>{mat.horasEstudadas.toFixed(1)}h · {mat.questoesFeitas}Q · {acM}%</span>
                            <button onClick={(e) =>{ e.stopPropagation(); setModalRegistro({ editalId: ed.id, materiaId: mat.id, nome: mat.nome }); }} style={{ background: ed.cor + "22", border: `1px solid ${ed.cor}44`, color: ed.cor, borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontSize: 11, fontFamily: FONT }}>+ Registrar</button>
                            <span style={{ color: C.textMuted, fontSize: 11 }}>{isMatExp ? "↑" : "↓"}</span>
                          </div>
                        </div>
                        <PBar val={mConc} max={mTop.length} color={mPct === 100 ? C.green : ed.cor} h={4} />
                        <span style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted, marginTop: 4, display: "block" }}>{mConc}/{mTop.length} tópicos · {mPct}%</span>
                      </div>
                      {isMatExp && mTop.length >0 && (
                        <div style={{ borderTop: `1px solid ${C.border}`, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
                          {mTop.map((top) =>(
                            <div key={top.id} onClick={() =>toggleTopico(ed.id, mat.id, top.id)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "4px 0" }}>
                              <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${top.concluido ? C.green : C.borderHover}`, background: top.concluido ? C.green : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", transition: "all 0.15s" }}>{top.concluido ? "✓" : ""}</div>
                              <span style={{ fontFamily: SANS, fontSize: 12, color: top.concluido ? C.textMuted : C.textSecondary, textDecoration: top.concluido ? "line-through" : "none" }}>{top.nome}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        );
      })}

      <Modal open={!!modalRegistro} onClose={() =>setModalRegistro(null)} title={`Registrar Sessão — ${modalRegistro?.nome}`} width={620}>
        {modalRegistro && (
          <SessaoForm editais={state.editais}
            initial={{ editalId: String(modalRegistro.editalId), materiaId: String(modalRegistro.materiaId) }}
            onSave={salvarRegistroManual} onCancel={() =>setModalRegistro(null)} showDateTime={true}
          />
        )}
      </Modal>

      <Modal open={modalEdital} onClose={() =>setModalEdital(false)} title="Novo Edital">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Input label="Nome do edital" value={novoEdital.nome} onChange={(v) =>setNovoEdital((e) =>({ ...e, nome: v }))} />
          <Input label="Sigla" value={novoEdital.sigla} onChange={(v) =>setNovoEdital((e) =>({ ...e, sigla: v.toUpperCase() }))} />
          <div>
            <label style={{ fontSize: 11, color: C.textMuted, fontFamily: SANS, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>Cor</label>
            <div style={{ display: "flex", gap: 8 }}>
              {CORES.map((c) =><div key={c} onClick={() =>setNovoEdital((e) =>({ ...e, cor: c }))} style={{ width: 26, height: 26, borderRadius: "50%", background: c, cursor: "pointer", border: novoEdital.cor === c ? `3px solid ${C.textPrimary}` : "3px solid transparent" }} />)}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <Btn onClick={() =>setModalEdital(false)} variant="ghost" style={{ flex: 1 }}>Cancelar</Btn>
            <Btn onClick={criarEdital} style={{ flex: 1 }}>Criar Edital</Btn>
          </div>
        </div>
      </Modal>

      <Modal open={!!modalEditor} onClose={() =>setModalEditor(null)} title={`Editar Edital — ${modalEditor?.sigla}`} width={700}>
        {modalEditor && <EditorEdital edital={modalEditor} onSave={salvarEditorEdital} onClose={() =>setModalEditor(null)} />}
      </Modal>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ state, setState }) {
  const [modalManual, setModalManual] = useState(false);

  const totalH = state.sessoes.reduce((a, s) =>a + s.duracao / 3600, 0);
  const totalQ = state.sessoes.reduce((a, s) =>a + s.questoesFeitas, 0);
  const totalC = state.sessoes.reduce((a, s) =>a + s.questoesCertas, 0);
  const acerto = totalQ >0 ? ((totalC / totalQ) * 100).toFixed(1) : "0.0";
  const [hI, hF] = periodoHoje();
  const sesHoje = sessoesNoPeriodo(state.sessoes, hI, hF);
  const hojesH = sesHoje.reduce((a, s) =>a + s.duracao / 3600, 0);
  const hojesQ = sesHoje.reduce((a, s) =>a + s.questoesFeitas, 0);

  const ultimos7 = Array.from({ length: 7 }, (_, i) =>{
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const ss = state.sessoes.filter((s) =>new Date(s.data).toDateString() === d.toDateString());
    return { dia: d.toLocaleDateString("pt-BR", { weekday: "short" }).slice(0, 3), h: ss.reduce((a, s) =>a + s.duracao / 3600, 0) };
  });
  const maxH = Math.max(...ultimos7.map((d) =>d.h), 1);
  const cicloAtivo = state.ciclos?.find((c) =>c.ativo);

  function salvarManual(dados) {
    setState((s) =>({
      ...s,
      sessoes: [...s.sessoes, { id: uid(), ...dados }],
      editais: s.editais.map((e) =>e.id !== dados.editalId ? e : {
        ...e, materias: e.materias.map((m) =>m.id !== dados.materiaId ? m : {
          ...m, horasEstudadas: m.horasEstudadas + dados.duracao / 3600,
          questoesFeitas: m.questoesFeitas + dados.questoesFeitas,
          questoesCertas: m.questoesCertas + dados.questoesCertas,
        }),
      }),
    }));
    setModalManual(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(148px,1fr))", gap: 10 }}>
        {[
          { label: "Horas Totais", val: totalH.toFixed(1) + "h", color: C.accent, icon: "" },
          { label: "Hoje", val: hojesH.toFixed(1) + "h", sub: `/ ${state.metas.horasDia}h meta`, color: hojesH >= state.metas.horasDia ? C.green : C.yellow, icon: "" },
          { label: "Questões Total", val: totalQ, color: C.purple, icon: "" },
          { label: "Aproveitamento", val: acerto + "%", color: Number(acerto) >= 70 ? C.green : Number(acerto) >= 50 ? C.yellow : C.red, icon: "" },
          { label: "Questões Hoje", val: hojesQ, sub: `/ ${state.metas.questoesDia} meta`, color: hojesQ >= state.metas.questoesDia ? C.green : C.orange, icon: "" },
          { label: "Sessões", val: state.sessoes.length, color: C.teal, icon: "" },
        ].map((s) =>(
          <Card key={s.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 10, color: C.textMuted, fontFamily: SANS, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</span>
              <span style={{ fontSize: 15 }}>{s.icon}</span>
            </div>
            <div style={{ fontFamily: SANS, fontSize: 26, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.val}</div>
            {s.sub && <div style={{ fontSize: 11, color: C.textMuted, fontFamily: SANS }}>{s.sub}</div>}
          </Card>
        ))}
      </div>

      {cicloAtivo && (() =>{
        const ed = state.editais.find((e) =>e.id === cicloAtivo.editalId);
        const idx = (cicloAtivo.rodadaAtual || 0) % cicloAtivo.itens.length;
        const prox = cicloAtivo.itens[idx];
        return (
          <Card glow={C.green} style={{ padding: "14px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: SANS, fontSize: 10, color: C.green, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Ciclo ativo — {cicloAtivo.nome}</div>
                <div style={{ fontFamily: SANS, fontSize: 14, color: C.textPrimary }}>Próxima: <strong>{prox?.nome}</strong></div>
                {ed && <div style={{ fontFamily: SANS, fontSize: 11, color: C.textMuted, marginTop: 2 }}>{ed.sigla} · {prox?.minutos}min</div>}
              </div>
              <Badge color={C.green}>{idx + 1}/{cicloAtivo.itens.length}</Badge>
            </div>
          </Card>
        );
      })()}

      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <Tracker state={state} setState={setState} />
        </div>
        <Btn onClick={() =>setModalManual(true)} variant="outline" style={{ padding: "10px 14px", fontSize: 12, whiteSpace: "nowrap", marginTop: 0 }}>+ Sessão Manual</Btn>
      </div>

      <MateriasEstudadas sessoes={state.sessoes} editais={state.editais} />

      <Card>
        <SL>Últimos 7 dias</SL>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 84 }}>
          {ultimos7.map((d, i) =>(
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 9, color: C.textMuted, fontFamily: FONT }}>{d.h >0 ? d.h.toFixed(1) + "h" : ""}</span>
              <div style={{ width: "100%", background: d.h >0 ? C.accent : C.border, borderRadius: "3px 3px 0 0", height: `${Math.max((d.h / maxH) * 64, d.h >0 ? 4 : 2)}px`, transition: "height 0.4s" }} />
              <span style={{ fontSize: 10, color: C.textMuted, fontFamily: FONT }}>{d.dia}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SL>Frequência de Estudos — 18 semanas</SL>
        <Heatmap sessoes={state.sessoes} />
      </Card>

      <Card>
        <SL>Progresso por Edital</SL>
        {state.editais.map((ed) =>{
          const totalTopicos = ed.materias.reduce((a, m) =>a + (m.topicos?.length || 0), 0);
          const concluidos = ed.materias.reduce((a, m) =>a + (m.topicos?.filter((t) =>t.concluido).length || 0), 0);
          const totalH2 = ed.materias.reduce((a, m) =>a + m.horasEstudadas, 0);
          const totalQ2 = ed.materias.reduce((a, m) =>a + m.questoesFeitas, 0);
          const totalC2 = ed.materias.reduce((a, m) =>a + m.questoesCertas, 0);
          const pct = totalTopicos >0 ? Math.round((concluidos / totalTopicos) * 100) : 0;
          const acerto2 = totalQ2 >0 ? Math.round((totalC2 / totalQ2) * 100) : 0;
          return (
            <div key={ed.id} style={{ background: C.bg, borderRadius: 10, padding: "14px 16px", border: `1px solid ${C.border}`, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: ed.cor }} />
                  <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: C.textPrimary }}>{ed.sigla}</span>
                  {ed.banca && <Badge color={ed.cor}>{ed.banca} {ed.ano}</Badge>}
                </div>
                <span style={{ fontFamily: SANS, fontSize: 22, fontWeight: 700, color: ed.cor }}>{pct}%</span>
              </div>
              <PBar val={concluidos} max={totalTopicos} color={ed.cor} h={8} />
              <div style={{ display: "flex", gap: 14, marginTop: 7 }}>
                <span style={{ fontFamily: SANS, fontSize: 11, color: C.textMuted }}>{concluidos}/{totalTopicos} tópicos</span>
                <span style={{ fontFamily: SANS, fontSize: 11, color: C.textMuted }}>{totalH2.toFixed(1)}h</span>
                <span style={{ fontFamily: SANS, fontSize: 11, color: C.textMuted }}>{totalQ2}Q · {acerto2}%</span>
              </div>
            </div>
          );
        })}
      </Card>

      <Card>
        <SL>Meta Diária</SL>
        {[
          { label: "Horas", val: hojesH, max: state.metas.horasDia, fmt: (v) =>v.toFixed(1) + "h", color: C.accent },
          { label: "Questões", val: hojesQ, max: state.metas.questoesDia, fmt: (v) =>v, color: C.purple },
        ].map((m) =>(
          <div key={m.label} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: C.textSecondary, fontFamily: SANS }}>{m.label}</span>
              <span style={{ fontSize: 13, color: C.textPrimary, fontFamily: FONT }}>{m.fmt(m.val)} / {m.fmt(m.max)}</span>
            </div>
            <PBar val={m.val} max={m.max} color={m.color} h={8} />
          </div>
        ))}
      </Card>

      <Modal open={modalManual} onClose={() =>setModalManual(false)} title="Registrar Sessão Manual" width={620}>
        <SessaoForm editais={state.editais} initial={{}} onSave={salvarManual} onCancel={() =>setModalManual(false)} showDateTime={true} />
      </Modal>
    </div>
  );
}

// ─── METAS ────────────────────────────────────────────────────────────────────
function Metas({ state, setState }) {
  const [form, setForm] = useState(state.metas);
  const [hI, hF] = periodoHoje();
  const sesHoje = sessoesNoPeriodo(state.sessoes, hI, hF);
  const hojesH = sesHoje.reduce((a, s) =>a + s.duracao / 3600, 0);
  const hojesQ = sesHoje.reduce((a, s) =>a + s.questoesFeitas, 0);
  const hoje = new Date().toDateString();
  const semana = Array.from({ length: 7 }, (_, i) =>{
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    return state.sessoes.filter((s) =>new Date(s.data).toDateString() === d.toDateString()).reduce((a, s) =>a + s.duracao / 3600, 0);
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <h2 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 600, color: C.textPrimary, margin: 0 }}>Metas & Configurações</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10 }}>
        {[
          { label: "Horas Hoje", val: hojesH.toFixed(1) + "h", sub: `meta ${state.metas.horasDia}h`, color: hojesH >= state.metas.horasDia ? C.green : C.yellow },
          { label: "Questões Hoje", val: hojesQ, sub: `meta ${state.metas.questoesDia}`, color: hojesQ >= state.metas.questoesDia ? C.green : C.yellow },
          { label: "Média Semanal", val: (semana.reduce((a, v) =>a + v, 0) / 7).toFixed(1) + "h/dia", color: C.teal },
          { label: "Dias Ativos", val: semana.filter((v) =>v >0).length + "/7", color: C.purple },
        ].map((s) =>(
          <Card key={s.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 10, color: C.textMuted, fontFamily: SANS, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</span>
            <span style={{ fontFamily: SANS, fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</span>
            {s.sub && <span style={{ fontSize: 11, color: C.textMuted }}>{s.sub}</span>}
          </Card>
        ))}
      </div>
      <Card>
        <SL>Definir Metas Diárias</SL>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          <Input label="Horas por dia" type="number" min="1" max="16" step="0.5" value={form.horasDia} onChange={(v) =>setForm((f) =>({ ...f, horasDia: v }))} />
          <Input label="Questões por dia" type="number" min="1" value={form.questoesDia} onChange={(v) =>setForm((f) =>({ ...f, questoesDia: v }))} />
          <Input label="Dias por semana" type="number" min="1" max="7" value={form.diasSemana} onChange={(v) =>setForm((f) =>({ ...f, diasSemana: v }))} />
        </div>
        <Btn onClick={() =>setState((s) =>({ ...s, metas: { horasDia: Number(form.horasDia), questoesDia: Number(form.questoesDia), diasSemana: Number(form.diasSemana) } }))} style={{ marginTop: 14 }}>
          Salvar Metas
        </Btn>
      </Card>
      <Card>
        <SL>Semana Atual</SL>
        <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 80 }}>
          {semana.map((h, i) =>{
            const d = new Date(); d.setDate(d.getDate() - (6 - i));
            const isT = d.toDateString() === hoje;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: "100%", background: h >= state.metas.horasDia ? C.green : h >0 ? C.accent : C.border, borderRadius: "3px 3px 0 0", height: `${Math.max(2, Math.min(1, h / (state.metas.horasDia || 1)) * 60)}px`, transition: "height 0.3s" }} />
                <span style={{ fontSize: 10, color: isT ? C.accent : C.textMuted, fontFamily: SANS, fontWeight: isT ? 700 : 400 }}>{d.toLocaleDateString("pt-BR", { weekday: "short" }).slice(0, 3)}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// Componente separado para evitar hook dentro de map
function SessaoRow({ ses, editais, onRemover }) {
  const [expandido, setExpandido] = useState(false);
  const ed = editais.find((e) => e.id === ses.editalId);
  const mat = ed?.materias.find((m) => m.id === ses.materiaId);
  const acerto = ses.questoesFeitas > 0 ? Math.round((ses.questoesCertas / ses.questoesFeitas) * 100) : null;
  const tipoInf = tipoInfo(ses.tipo);
  const acColor = acerto === null ? C.textMuted : acerto >= 70 ? C.green : acerto >= 50 ? C.yellow : C.red;
  const hasTopicos = ses.topicoQuestoes && ses.topicoQuestoes.length > 0;
  const pctColor = (p) => p >= 70 ? C.green : p >= 50 ? C.yellow : C.red;

  return (
    <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 2, overflow: "hidden", transition: "border-color 0.15s" }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = C.borderHover}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = C.border}>

      {/* Linha principal */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 16px" }}>
        <div style={{ width: 3, height: 36, borderRadius: 2, background: ed?.cor || C.border, flexShrink: 0 }} />
        <div style={{ textAlign: "center", minWidth: 44, flexShrink: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: ed?.cor || C.accent }}>{fmtH(ses.duracao)}</div>
          <div style={{ fontSize: 9, color: C.textMuted }}>dur.</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: C.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{mat?.nome || "—"}</span>
            <span style={{ background: tipoInf.color + "18", color: tipoInf.color, fontSize: 10, fontWeight: 500, padding: "1px 7px", borderRadius: 4, border: `1px solid ${tipoInf.color}30`, whiteSpace: "nowrap" }}>{tipoInf.label}</span>
          </div>
          <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>
            {ed?.sigla} · {new Date(ses.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "2-digit", hour: "2-digit", minute: "2-digit" })}
          </div>
          {ses.ondeParei && (
            <div style={{ fontSize: 11, color: C.yellow, marginTop: 2, fontStyle: "italic" }}>"{ses.ondeParei}"</div>
          )}
        </div>
        {ses.questoesFeitas > 0 && (
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: acColor }}>{acerto}%</div>
            <div style={{ fontSize: 9, color: C.textMuted }}>{ses.questoesCertas}/{ses.questoesFeitas}</div>
          </div>
        )}
        {hasTopicos && (
          <button onClick={() => setExpandido((v) => !v)}
            style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.textMuted, cursor: "pointer", fontSize: 11, padding: "3px 10px", borderRadius: 5, flexShrink: 0, fontFamily: SANS, transition: "all 0.15s" }}>
            {expandido ? "↑ Fechar" : `${ses.topicoQuestoes.length} tópico${ses.topicoQuestoes.length > 1 ? "s" : ""} ↓`}
          </button>
        )}
        <button onClick={onRemover}
          style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 14, padding: "4px 6px", borderRadius: 6, flexShrink: 0, transition: "color 0.15s" }}
          onMouseEnter={(e) => e.currentTarget.style.color = C.red}
          onMouseLeave={(e) => e.currentTarget.style.color = C.textMuted}>×</button>
      </div>

      {/* Breakdown por tópico */}
      {expandido && hasTopicos && (
        <div style={{ borderTop: `1px solid ${C.border}`, background: C.bg }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 64px 64px 56px", padding: "7px 16px 5px 64px", gap: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Tópico</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.06em" }}>Feitas</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: C.green, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.06em" }}>Certas</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.06em" }}>%</span>
          </div>
          {ses.topicoQuestoes.map((tq, ti) => {
            const tp = tq.feitas > 0 ? Math.round((tq.certas / tq.feitas) * 100) : null;
            const tpColor = tp !== null ? pctColor(tp) : C.textMuted;
            return (
              <div key={ti} style={{ display: "grid", gridTemplateColumns: "1fr 64px 64px 56px", padding: "6px 16px 6px 64px", borderTop: `1px solid ${C.border}22`, gap: 0 }}>
                <span style={{ fontSize: 12, color: C.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tq.topicoNome}</span>
                <span style={{ fontSize: 12, color: C.textSecondary, textAlign: "center" }}>{tq.feitas}</span>
                <span style={{ fontSize: 12, color: C.green, fontWeight: 600, textAlign: "center" }}>{tq.certas}</span>
                <div style={{ textAlign: "center" }}>
                  {tp !== null && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: tpColor, background: tpColor + "18", borderRadius: 4, padding: "1px 6px" }}>{tp}%</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


function Sessoes({ state, setState }) {
  const [modalManual, setModalManual] = useState(false);
  const [filtroEdital, setFiltroEdital] = useState("todos");
  const [filtroMateria, setFiltroMateria] = useState("todas");
  const [filtroTipo, setFiltroTipo] = useState("todos");

  const edOpts = [{ value: "todos", label: "Todos os editais" }, ...state.editais.map((e) =>({ value: String(e.id), label: `${e.sigla} — ${e.nome}` }))];
  const matOpts = useMemo(() =>{
    const base = [{ value: "todas", label: "Todas as matérias" }];
    if (filtroEdital === "todos") {
      state.editais.forEach((e) =>e.materias.forEach((m) =>base.push({ value: `${e.id}_${m.id}`, label: `${e.sigla} · ${m.nome}` })));
    } else {
      const ed = state.editais.find((e) =>String(e.id) === filtroEdital);
      (ed?.materias || []).forEach((m) =>base.push({ value: String(m.id), label: m.nome }));
    }
    return base;
  }, [filtroEdital, state.editais]);

  const tipoOpts = [{ value: "todos", label: "Todos os tipos" }, ...TIPOS_ESTUDO.map((t) =>({ value: t.value, label: t.label }))];

  const sorted = useMemo(() =>{
    return [...state.sessoes]
      .filter((s) =>{
        if (filtroEdital !== "todos" && String(s.editalId) !== filtroEdital) return false;
        if (filtroMateria !== "todas") {
          const key = filtroEdital === "todos" ? `${s.editalId}_${s.materiaId}` : String(s.materiaId);
          if (key !== filtroMateria) return false;
        }
        if (filtroTipo !== "todos" && s.tipo !== filtroTipo) return false;
        return true;
      })
      .sort((a, b) =>new Date(b.data) - new Date(a.data));
  }, [state.sessoes, filtroEdital, filtroMateria, filtroTipo]);

  function remover(id) {
    const ses = state.sessoes.find((s) =>s.id === id);
    if (!ses) return;
    setState((s) =>({
      ...s,
      sessoes: s.sessoes.filter((x) =>x.id !== id),
      editais: s.editais.map((e) =>e.id !== ses.editalId ? e : {
        ...e, materias: e.materias.map((m) =>m.id !== ses.materiaId ? m : {
          ...m,
          horasEstudadas: Math.max(0, m.horasEstudadas - ses.duracao / 3600),
          questoesFeitas: Math.max(0, m.questoesFeitas - ses.questoesFeitas),
          questoesCertas: Math.max(0, m.questoesCertas - ses.questoesCertas),
        }),
      }),
    }));
  }

  function salvarManual(dados) {
    setState((s) =>({
      ...s,
      sessoes: [...s.sessoes, { id: uid(), ...dados }],
      editais: s.editais.map((e) =>e.id !== dados.editalId ? e : {
        ...e, materias: e.materias.map((m) =>m.id !== dados.materiaId ? m : {
          ...m, horasEstudadas: m.horasEstudadas + dados.duracao / 3600,
          questoesFeitas: m.questoesFeitas + dados.questoesFeitas,
          questoesCertas: m.questoesCertas + dados.questoesCertas,
        }),
      }),
    }));
    setModalManual(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 600, color: C.textPrimary, margin: 0 }}>Sessões de Estudo</h2>
          <div style={{ fontFamily: SANS, fontSize: 11, color: C.textMuted, marginTop: 3 }}>{sorted.length} sessão{sorted.length !== 1 ? "ões" : ""} encontrada{sorted.length !== 1 ? "s" : ""}</div>
        </div>
        <Btn onClick={() =>setModalManual(true)} variant="outline" style={{ fontSize: 13 }}>+ Sessão Manual</Btn>
      </div>

      {/* Filtros */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <Select value={filtroEdital} onChange={(v) =>{ setFiltroEdital(v); setFiltroMateria("todas"); }} options={edOpts} />
        <Select value={filtroMateria} onChange={setFiltroMateria} options={matOpts} />
        <Select value={filtroTipo} onChange={setFiltroTipo} options={tipoOpts} />
      </div>

      {sorted.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 0", color: C.textMuted, fontFamily: SANS, fontSize: 14 }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>
          Nenhuma sessão encontrada com esses filtros
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sorted.map((ses) => (
          <SessaoRow key={ses.id} ses={ses} editais={state.editais} onRemover={() => remover(ses.id)} />
        ))}
      </div>

      <Modal open={modalManual} onClose={() =>setModalManual(false)} title="Registrar Sessão Manual" width={620}>
        <SessaoForm editais={state.editais} initial={{}} onSave={salvarManual} onCancel={() =>setModalManual(false)} showDateTime={true} />
      </Modal>
    </div>
  );
}

// ─── LISTAS DE QUESTÕES ───────────────────────────────────────────────────────
function Listas({ state, setState }) {
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId]   = useState(null); // null = nova, id = editando
  const [expandedLista, setExpandedLista] = useState(null);
  const [expandedMat, setExpandedMat] = useState({});
  const [filtroEd, setFiltroEd]       = useState("todos");

  const formVazio = { nome: "", editalId: "", materiaId: "", banca: "", ano: "", total: "", certas: "", itens: [] };
  const [form, setForm]       = useState(formVazio);
  const [novoItem, setNovoItem] = useState({ enunciado: "", total: "", certas: "" });

  const listas = (state.listas || []).sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));

  const edOpts      = [{ value: "", label: "Selecione..." }, ...state.editais.map((e) => ({ value: String(e.id), label: `${e.sigla} — ${e.nome}` }))];
  const filtroEdOpts = [{ value: "todos", label: "Todos" }, ...state.editais.map((e) => ({ value: String(e.id), label: e.sigla }))];
  const matOpts = useMemo(() => {
    const ed = state.editais.find((e) => String(e.id) === form.editalId);
    return [{ value: "", label: "Sem matéria específica" }, ...(ed?.materias || []).map((m) => ({ value: String(m.id), label: m.nome }))];
  }, [form.editalId, state.editais]);

  function pctColor(pct) {
    if (pct >= 70) return C.green;
    if (pct >= 50) return C.yellow;
    return C.red;
  }

  function abrirNova() {
    setEditandoId(null);
    setForm(formVazio);
    setNovoItem({ enunciado: "", total: "", certas: "" });
    setModalAberto(true);
  }

  function abrirEditar(lista) {
    setEditandoId(lista.id);
    setForm({
      nome:      lista.nome,
      editalId:  lista.editalId ? String(lista.editalId) : "",
      materiaId: lista.materiaId ? String(lista.materiaId) : "",
      banca:     lista.banca || "",
      ano:       lista.ano   || "",
      total:     lista.total > 0 ? String(lista.total) : "",
      certas:    lista.certas > 0 ? String(lista.certas) : "",
      itens:     lista.itens ? lista.itens.map((it) => ({ ...it, id: it.id || uid() })) : [],
    });
    setNovoItem({ enunciado: "", total: "", certas: "" });
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setEditandoId(null);
    setForm(formVazio);
    setNovoItem({ enunciado: "", total: "", certas: "" });
  }

  function salvar() {
    if (!form.nome) return;
    const topTotal  = form.itens.reduce((a, it) => a + (Number(it.total)  || 0), 0);
    const topCertas = form.itens.reduce((a, it) => a + (Number(it.certas) || 0), 0);
    const autoMode  = form.itens.length > 0 && topTotal > 0;
    const qf = autoMode ? topTotal  : (Number(form.total)  || 0);
    const qc = autoMode ? topCertas : (Number(form.certas) || 0);
    const payload = {
      nome:      form.nome,
      editalId:  form.editalId  ? Number(form.editalId)  : null,
      materiaId: form.materiaId ? Number(form.materiaId) : null,
      banca: form.banca, ano: form.ano,
      total: qf, certas: qc, erros: qf - qc,
      pct:   qf > 0 ? Math.round((qc / qf) * 100) : 0,
      itens: form.itens,
    };
    if (editandoId) {
      // Edição — preserva dataCriacao e id
      setState((s) => ({
        ...s,
        listas: (s.listas || []).map((l) =>
          l.id === editandoId ? { ...l, ...payload } : l
        ),
      }));
    } else {
      // Nova lista
      setState((s) => ({
        ...s,
        listas: [...(s.listas || []), { id: uid(), ...payload, dataCriacao: new Date().toISOString() }],
      }));
    }
    fecharModal();
  }

  function remover(id) {
    setState((s) => ({ ...s, listas: (s.listas || []).filter((l) => l.id !== id) }));
  }

  function addItem() {
    if (!novoItem.enunciado) return;
    setForm((f) => ({ ...f, itens: [...f.itens, { id: uid(), ...novoItem }] }));
    setNovoItem({ enunciado: "", total: "", certas: "" });
  }

  // Agrupamento edital → matéria → listas
  const grupos = useMemo(() => {
    const filtradas = filtroEd === "todos" ? listas : listas.filter((l) => String(l.editalId) === filtroEd);
    const byEdital = {};
    filtradas.forEach((l) => {
      const ek = l.editalId ? String(l.editalId) : "__sem_edital__";
      if (!byEdital[ek]) byEdital[ek] = {};
      const mk = l.materiaId ? String(l.materiaId) : "__sem_materia__";
      if (!byEdital[ek][mk]) byEdital[ek][mk] = [];
      byEdital[ek][mk].push(l);
    });
    return Object.entries(byEdital).map(([ek, mats]) => {
      const ed = state.editais.find((e) => String(e.id) === ek) || null;
      const materias = Object.entries(mats).map(([mk, ls]) => {
        const mat  = ed?.materias.find((m) => String(m.id) === mk) || null;
        const totQ = ls.reduce((a, l) => a + l.total, 0);
        const totC = ls.reduce((a, l) => a + l.certas, 0);
        return { mat, matKey: mk, listas: ls, totQ, totC, pct: totQ > 0 ? Math.round((totC / totQ) * 100) : 0 };
      }).sort((a, b) => (a.mat?.nome || "").localeCompare(b.mat?.nome || ""));
      const totQ = materias.reduce((a, m) => a + m.totQ, 0);
      const totC = materias.reduce((a, m) => a + m.totC, 0);
      return { ed, edKey: ek, materias, totQ, totC, pct: totQ > 0 ? Math.round((totC / totQ) * 100) : 0 };
    }).sort((a, b) => (a.ed?.sigla || "zzz").localeCompare(b.ed?.sigla || "zzz"));
  }, [listas, filtroEd, state.editais]);

  const totalListas = listas.length;
  const totalFeitas = listas.reduce((a, l) => a + l.total, 0);
  const totalCertas = listas.reduce((a, l) => a + l.certas, 0);
  const mediaAcerto = totalFeitas > 0 ? Math.round((totalCertas / totalFeitas) * 100) : 0;

  // Preview % no form — calculado inline no render

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 600, color: C.textPrimary, margin: 0 }}>Listas de Questões</h2>
        <Btn onClick={abrirNova}>+ Nova Lista</Btn>
      </div>

      {/* Resumo */}
      {totalListas > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 10 }}>
          {[
            { label: "Listas feitas",   val: totalListas,       color: C.accent },
            { label: "Total questões",  val: totalFeitas,       color: C.purple },
            { label: "Total acertos",   val: totalCertas,       color: C.green  },
            { label: "Média de acerto", val: mediaAcerto + "%", color: pctColor(mediaAcerto) },
          ].map((s) => (
            <div key={s.label} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>
      )}

      {/* Filtro */}
      {totalListas > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {filtroEdOpts.map((o) => (
            <button key={o.value} onClick={() => setFiltroEd(o.value)}
              style={{ background: filtroEd === o.value ? C.accent : "transparent", border: `1px solid ${filtroEd === o.value ? C.accent : C.border}`, color: filtroEd === o.value ? "#fff" : C.textMuted, borderRadius: 8, padding: "5px 14px", cursor: "pointer", fontFamily: SANS, fontSize: 11, transition: "all 0.15s" }}>
              {o.label}
            </button>
          ))}
        </div>
      )}

      {/* Vazio */}
      {grupos.length === 0 && (
        <div style={{ textAlign: "center", padding: "56px 0", background: C.bgCard, borderRadius: 12, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 14, color: C.textSecondary, marginBottom: 4 }}>Nenhuma lista registrada</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>Clique em "+ Nova Lista" para começar</div>
        </div>
      )}

      {/* Grupos por edital */}
      {grupos.map(({ ed, edKey, materias, totQ, totC, pct: edPct }) => (
        <div key={edKey} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {/* Cabeçalho edital */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 8, borderBottom: `2px solid ${ed?.cor || C.border}` }}>
            {ed && <div style={{ width: 10, height: 10, borderRadius: "50%", background: ed.cor }} />}
            <span style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary }}>
              {ed ? `${ed.sigla} — ${ed.nome}` : "Sem edital"}
            </span>
            <div style={{ flex: 1 }} />
            {totQ > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 11, color: C.textMuted }}>{totQ}Q · {totC} certas</span>
                <span style={{ background: pctColor(edPct) + "18", color: pctColor(edPct), border: `1px solid ${pctColor(edPct)}30`, borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{edPct}%</span>
                <div style={{ width: 80 }}><PBar val={totC} max={totQ} color={ed?.cor || C.accent} h={5} /></div>
              </div>
            )}
          </div>

          {/* Grupos por matéria */}
          {materias.map(({ mat, matKey, listas: ls, totQ: mQ, totC: mC, pct: mPct }) => {
            const gk = `${edKey}_${matKey}`;
            const isMatExp = expandedMat[gk] !== false;
            return (
              <div key={matKey} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
                {/* Header matéria */}
                <div onClick={() => setExpandedMat((p) => ({ ...p, [gk]: !isMatExp }))}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", cursor: "pointer", background: isMatExp ? C.bg : "transparent", borderBottom: isMatExp ? `1px solid ${C.border}` : "none", transition: "background 0.15s" }}>
                  <div style={{ width: 3, height: 20, borderRadius: 2, background: ed?.cor || C.border, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{mat ? mat.nome : "Sem matéria"}</span>
                  <span style={{ fontSize: 11, color: C.textMuted }}>{ls.length} lista{ls.length !== 1 ? "s" : ""}</span>
                  {mQ > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, color: C.textMuted }}>{mQ}Q</span>
                      <span style={{ fontSize: 11, color: C.green }}>{mC}✓</span>
                      <span style={{ background: pctColor(mPct) + "18", color: pctColor(mPct), border: `1px solid ${pctColor(mPct)}30`, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{mPct}%</span>
                      <div style={{ width: 60 }}><PBar val={mC} max={mQ} color={ed?.cor || C.accent} h={4} /></div>
                    </div>
                  )}
                  <span style={{ color: C.textMuted, fontSize: 11, marginLeft: 4 }}>{isMatExp ? "↑" : "↓"}</span>
                </div>

                {/* Linhas de listas */}
                {isMatExp && (
                  <div>
                    {ls.map((lista, li) => {
                      const pc    = lista.pct;
                      const isExp = expandedLista === lista.id;
                      const isLast = li === ls.length - 1;
                      return (
                        <div key={lista.id} style={{ borderBottom: isLast ? "none" : `1px solid ${C.border}22` }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", transition: "background 0.15s" }}
                            onMouseEnter={(e) => e.currentTarget.style.background = C.bg}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                            <span style={{ fontSize: 11, color: C.textMuted, minWidth: 22, flexShrink: 0 }}>#{li + 1}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13, color: C.textPrimary, fontWeight: 500 }}>{lista.nome}</div>
                              {(lista.banca || lista.ano) && (
                                <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>{[lista.banca, lista.ano].filter(Boolean).join(" · ")}</div>
                              )}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                              <span style={{ fontSize: 12, color: C.textSecondary }}>{lista.total}Q</span>
                              <span style={{ fontSize: 12, color: C.green }}>+{lista.certas}</span>
                              <span style={{ fontSize: 12, color: lista.erros > 0 ? C.red : C.textMuted }}>-{lista.erros}</span>
                              {lista.total > 0 && (
                                <span style={{ background: pctColor(pc) + "18", color: pctColor(pc), border: `1px solid ${pctColor(pc)}30`, borderRadius: 6, padding: "2px 9px", fontSize: 12, fontWeight: 700, minWidth: 42, textAlign: "center" }}>{pc}%</span>
                              )}
                              <div style={{ width: 56 }}><PBar val={lista.certas} max={lista.total} color={pctColor(pc)} h={4} /></div>
                              {lista.itens?.length > 0 && (
                                <button onClick={() => setExpandedLista(isExp ? null : lista.id)}
                                  style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 12, padding: "2px 5px" }}>
                                  {isExp ? "↑" : "↓"}
                                </button>
                              )}
                              {/* ── Botão Editar ── */}
                              <button onClick={() => abrirEditar(lista)}
                                style={{ background: C.accentLight, border: `1px solid ${C.accent}30`, color: C.accent, borderRadius: 6, padding: "3px 10px", cursor: "pointer", fontFamily: SANS, fontSize: 11, fontWeight: 500, transition: "all 0.15s" }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = "#fff"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = C.accentLight; e.currentTarget.style.color = C.accent; }}>
                                Editar
                              </button>
                              <button onClick={() => remover(lista.id)}
                                style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 13, padding: "2px 5px", transition: "color 0.15s" }}
                                onMouseEnter={(e) => e.currentTarget.style.color = C.red}
                                onMouseLeave={(e) => e.currentTarget.style.color = C.textMuted}>×</button>
                            </div>
                          </div>

                          {/* Subtópicos expandidos */}
                          {isExp && lista.itens?.length > 0 && (
                            <div style={{ background: C.bg, padding: "10px 20px 12px 54px", borderTop: `1px solid ${C.border}22` }}>
                              <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, fontWeight: 600 }}>Por tópico</div>
                              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                {lista.itens.map((item, ii) => {
                                  const ip = Number(item.total) > 0 ? Math.round((Number(item.certas) / Number(item.total)) * 100) : null;
                                  return (
                                    <div key={ii} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: ip !== null ? pctColor(ip) : C.border, flexShrink: 0 }} />
                                      <span style={{ flex: 1, fontSize: 12, color: C.textSecondary }}>{item.enunciado}</span>
                                      {item.total && <span style={{ fontSize: 11, color: C.textMuted }}>{item.total}Q</span>}
                                      {item.certas && <span style={{ fontSize: 11, color: C.green }}>+{item.certas}</span>}
                                      {item.total && item.certas && <span style={{ fontSize: 11, color: C.red }}>-{Number(item.total) - Number(item.certas)}</span>}
                                      {ip !== null && (
                                        <span style={{ background: pctColor(ip) + "18", color: pctColor(ip), border: `1px solid ${pctColor(ip)}30`, borderRadius: 5, padding: "1px 7px", fontSize: 10, fontWeight: 700 }}>{ip}%</span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Modal nova / editar lista */}
      <Modal open={modalAberto} onClose={fecharModal}
        title={editandoId ? "Editar Lista" : "Nova Lista de Questões"} width={620}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Input label="Nome da lista" value={form.nome} onChange={(v) => setForm((f) => ({ ...f, nome: v }))} placeholder="Ex: Lista 01 — Direito Previdenciário" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Select label="Edital" value={form.editalId} onChange={(v) => setForm((f) => ({ ...f, editalId: v, materiaId: "" }))} options={edOpts} />
            <Select label="Matéria" value={form.materiaId} onChange={(v) => setForm((f) => ({ ...f, materiaId: v }))} options={matOpts} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
            <Input label="Banca" value={form.banca} onChange={(v) => setForm((f) => ({ ...f, banca: v }))} placeholder="Ex: Cebraspe" />
            <Input label="Ano"   value={form.ano}   onChange={(v) => setForm((f) => ({ ...f, ano:   v }))} placeholder="Ex: 2024" />
            {/* Total e Certas: auto se há tópicos preenchidos, manual caso contrário */}
            {(() => {
              const topTotal  = form.itens.reduce((a, it) => a + (Number(it.total)  || 0), 0);
              const topCertas = form.itens.reduce((a, it) => a + (Number(it.certas) || 0), 0);
              const autoMode  = form.itens.length > 0 && topTotal > 0;
              const dispTotal  = autoMode ? String(topTotal)  : form.total;
              const dispCertas = autoMode ? String(topCertas) : form.certas;
              return (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <label style={{ fontSize: 12, color: C.textSecondary, fontWeight: 500 }}>
                      Total questões {autoMode && <span style={{ fontSize: 10, color: C.accent, marginLeft: 4 }}>calculado</span>}
                    </label>
                    <input type="number" min="0" value={dispTotal} readOnly={autoMode}
                      onChange={(e) => { if (!autoMode) setForm((f) => ({ ...f, total: e.target.value })); }}
                      style={{ background: autoMode ? C.accentLight : C.bgInput, border: `1px solid ${autoMode ? C.accent + "50" : C.border}`, borderRadius: 7, padding: "8px 11px", color: autoMode ? C.accent : C.textPrimary, fontFamily: SANS, fontSize: 13, outline: "none", fontWeight: autoMode ? 600 : 400, cursor: autoMode ? "default" : "text" }}
                      onFocus={(e) => { if (!autoMode) e.target.style.borderColor = C.accent; }}
                      onBlur={(e)  => { if (!autoMode) e.target.style.borderColor = C.border; }}
                      placeholder="0" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <label style={{ fontSize: 12, color: C.textSecondary, fontWeight: 500 }}>
                      Certas {autoMode && <span style={{ fontSize: 10, color: C.green, marginLeft: 4 }}>calculado</span>}
                    </label>
                    <input type="number" min="0" value={dispCertas} readOnly={autoMode}
                      onChange={(e) => { if (!autoMode) setForm((f) => ({ ...f, certas: e.target.value })); }}
                      style={{ background: autoMode ? C.greenLight : C.bgInput, border: `1px solid ${autoMode ? C.green + "50" : C.border}`, borderRadius: 7, padding: "8px 11px", color: autoMode ? C.green : C.textPrimary, fontFamily: SANS, fontSize: 13, outline: "none", fontWeight: autoMode ? 600 : 400, cursor: autoMode ? "default" : "text" }}
                      onFocus={(e) => { if (!autoMode) e.target.style.borderColor = C.green; }}
                      onBlur={(e)  => { if (!autoMode) e.target.style.borderColor = C.border; }}
                      placeholder="0" />
                  </div>
                </>
              );
            })()}
          </div>

          {/* Preview % — usa itens se preenchidos, senão form.total/certas */}
          {(() => {
            const topTotal  = form.itens.reduce((a, it) => a + (Number(it.total)  || 0), 0);
            const topCertas = form.itens.reduce((a, it) => a + (Number(it.certas) || 0), 0);
            const autoMode  = form.itens.length > 0 && topTotal > 0;
            const t = autoMode ? topTotal  : (Number(form.total)  || 0);
            const c = autoMode ? topCertas : (Number(form.certas) || 0);
            if (t === 0) return null;
            const pct = Math.round((c / t) * 100);
            return (
              <div style={{ background: C.bg, borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                <PBar val={c} max={t} color={pctColor(pct)} h={8} />
                <div style={{ flexShrink: 0, textAlign: "right" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: pctColor(pct) }}>{pct}%</div>
                  <div style={{ fontSize: 10, color: C.textMuted }}>{c}/{t} certas</div>
                </div>
              </div>
            );
          })()}

          {/* Itens por tópico */}
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 9, overflow: "hidden" }}>
            <div style={{ background: C.bg, padding: "10px 14px", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 8 }}>Desempenho por tópico (opcional)</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 70px auto", gap: 8, alignItems: "flex-end" }}>
                <Input placeholder="Tópico / assunto" value={novoItem.enunciado} onChange={(v) => setNovoItem((n) => ({ ...n, enunciado: v }))} />
                <Input placeholder="Total"  type="number" value={novoItem.total}  onChange={(v) => setNovoItem((n) => ({ ...n, total:  v }))} />
                <Input placeholder="Certas" type="number" value={novoItem.certas} onChange={(v) => setNovoItem((n) => ({ ...n, certas: v }))} />
                <Btn onClick={addItem} variant="outline" style={{ padding: "8px 12px" }}>+</Btn>
              </div>
            </div>

            {form.itens.length > 0 && (
              <div>
                {/* Cabeçalho */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px 60px 24px", padding: "6px 14px 4px", background: C.bg, borderBottom: `1px solid ${C.border}` }}>
                  {["Tópico", "Total", "Certas", "%", ""].map((h, i) => (
                    <span key={i} style={{ fontSize: 10, fontWeight: 600, color: i === 2 ? C.green : C.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: i > 0 ? "center" : "left" }}>{h}</span>
                  ))}
                </div>
                {form.itens.map((item, i) => {
                  const ip = Number(item.total) > 0 ? Math.round((Number(item.certas) / Number(item.total)) * 100) : null;
                  return (
                    <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px 60px 24px", padding: "7px 14px", borderBottom: `1px solid ${C.border}22`, alignItems: "center" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = C.bg}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                      {/* Nome editável inline */}
                      <input value={item.enunciado}
                        onChange={(e) => setForm((f) => ({ ...f, itens: f.itens.map((it, j) => j === i ? { ...it, enunciado: e.target.value } : it) }))}
                        style={{ background: "transparent", border: "none", borderBottom: `1px solid ${C.border}`, padding: "2px 0", fontSize: 12, color: C.textPrimary, fontFamily: SANS, outline: "none", width: "100%" }}
                        onFocus={(e) => e.target.style.borderBottomColor = C.accent}
                        onBlur={(e)  => e.target.style.borderBottomColor = C.border} />
                      {/* Total editável */}
                      <input type="number" min="0" value={item.total || ""}
                        onChange={(e) => setForm((f) => ({ ...f, itens: f.itens.map((it, j) => j === i ? { ...it, total: e.target.value } : it) }))}
                        style={{ background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: 5, padding: "4px 4px", fontSize: 12, color: C.textSecondary, fontFamily: SANS, outline: "none", textAlign: "center", width: "100%" }}
                        onFocus={(e) => e.target.style.borderColor = C.accent} onBlur={(e) => e.target.style.borderColor = C.border}
                        placeholder="0" />
                      {/* Certas editável */}
                      <input type="number" min="0" value={item.certas || ""}
                        onChange={(e) => setForm((f) => ({ ...f, itens: f.itens.map((it, j) => j === i ? { ...it, certas: e.target.value } : it) }))}
                        style={{ background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: 5, padding: "4px 4px", fontSize: 12, color: C.green, fontFamily: SANS, outline: "none", fontWeight: 600, textAlign: "center", width: "100%" }}
                        onFocus={(e) => e.target.style.borderColor = C.green} onBlur={(e) => e.target.style.borderColor = C.border}
                        placeholder="0" />
                      {/* % */}
                      <div style={{ textAlign: "center" }}>
                        {ip !== null && (
                          <span style={{ fontSize: 11, fontWeight: 700, color: pctColor(ip), background: pctColor(ip) + "18", borderRadius: 4, padding: "1px 6px" }}>{ip}%</span>
                        )}
                      </div>
                      <button onClick={() => setForm((f) => ({ ...f, itens: f.itens.filter((_, j) => j !== i) }))}
                        style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 14, padding: 0 }}
                        onMouseEnter={(e) => e.currentTarget.style.color = C.red} onMouseLeave={(e) => e.currentTarget.style.color = C.textMuted}>×</button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 4, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
            <Btn onClick={fecharModal} variant="ghost" style={{ flex: 1 }}>Cancelar</Btn>
            <Btn onClick={salvar} disabled={!form.nome} style={{ flex: 1 }}>
              {editandoId ? "Salvar Alterações" : "Salvar Lista"}
            </Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}



// ─── EDITAL VERTICALIZADO ─────────────────────────────────────────────────────
function EditalVerticalizado({ state, setState }) {
  const [edSel, setEdSel] = useState(state.editais[0]?.id || null);
  const [expandedMat, setExpandedMat] = useState(null);
  const [modalReg, setModalReg] = useState(null); // { editalId, materiaId, topicoId, topicoNome }
  const [regForm, setRegForm] = useState({ feitas: "", certas: "" });

  const ed = state.editais.find((e) =>e.id === edSel);
  if (!ed) return <div style={{ color: C.textMuted, fontFamily: SANS, padding: 40, textAlign: "center" }}>Nenhum edital encontrado.</div>;

  // Build per-topic stats — reads new topicoQuestoes array + legacy topico field
  function topicoStats(editalId, materiaId, topicoId) {
    let feitas = 0, certas = 0, ultima = null;
    state.sessoes.forEach((s) => {
      if (s.editalId !== editalId || s.materiaId !== materiaId) return;
      if (s.topicoQuestoes && s.topicoQuestoes.length > 0) {
        const tq = s.topicoQuestoes.find((tq) => String(tq.topicoId) === String(topicoId));
        if (tq) {
          feitas += tq.feitas || 0; certas += tq.certas || 0;
          if (!ultima || new Date(s.data) > new Date(ultima)) ultima = s.data;
        }
      } else if (String(s.topico) === String(topicoId)) {
        feitas += s.questoesFeitas || 0; certas += s.questoesCertas || 0;
        if (!ultima || new Date(s.data) > new Date(ultima)) ultima = s.data;
      }
    });
    return { feitas, certas, erros: feitas - certas, pct: feitas > 0 ? Math.round((certas / feitas) * 100) : null, ultima };
  }

  function materiaStats(editalId, materiaId) {
    const ss = state.sessoes.filter((s) =>s.editalId === editalId && s.materiaId === materiaId);
    const feitas = ss.reduce((a, s) =>a + (s.questoesFeitas || 0), 0);
    const certas = ss.reduce((a, s) =>a + (s.questoesCertas || 0), 0);
    const erros = feitas - certas;
    const pct = feitas >0 ? Math.round((certas / feitas) * 100) : null;
    const horas = ss.reduce((a, s) =>a + s.duracao / 3600, 0);
    return { feitas, certas, erros, pct, horas };
  }

  const totalTopicos = ed.materias.reduce((a, m) =>a + (m.topicos?.length || 0), 0);
  const concluidos = ed.materias.reduce((a, m) =>a + (m.topicos?.filter((t) =>t.concluido).length || 0), 0);
  const pctGeral = totalTopicos >0 ? Math.round((concluidos / totalTopicos) * 100) : 0;

  function pctColor(pct) {
    if (pct === null) return C.textMuted;
    if (pct >= 70) return C.green;
    if (pct >= 50) return C.yellow;
    return C.red;
  }

  function pctBg(pct) {
    if (pct === null) return C.border;
    if (pct >= 70) return C.green + "22";
    if (pct >= 50) return C.yellow + "22";
    return C.red + "22";
  }

  function salvarReg() {
    const { editalId, materiaId, topicoId } = modalReg;
    const qf = Number(regForm.feitas) || 0;
    const qc = Number(regForm.certas) || 0;
    setState((s) =>({
      ...s,
      sessoes: [...s.sessoes, {
        id: uid(), editalId, materiaId, topico: String(topicoId),
        tipo: "questoes", duracao: 0, data: new Date().toISOString(),
        questoesFeitas: qf, questoesCertas: qc, ondeParei: "",
      }],
      editais: s.editais.map((e) =>e.id !== editalId ? e : {
        ...e, materias: e.materias.map((m) =>m.id !== materiaId ? m : {
          ...m, questoesFeitas: m.questoesFeitas + qf, questoesCertas: m.questoesCertas + qc,
        }),
      }),
    }));
    setRegForm({ feitas: "", certas: "" });
    setModalReg(null);
  }

  function toggleConc(matId, topId) {
    setState((s) =>({
      ...s,
      editais: s.editais.map((e) =>e.id !== edSel ? e : {
        ...e, materias: e.materias.map((m) =>m.id !== matId ? m : {
          ...m, topicos: m.topicos.map((t) =>t.id !== topId ? t : { ...t, concluido: !t.concluido }),
        }),
      }),
    }));
  }

  const thStyle = { fontFamily: SANS, fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", padding: "8px 10px", textAlign: "center", borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" };
  const tdStyle = { fontFamily: SANS, fontSize: 12, padding: "8px 10px", textAlign: "center", borderBottom: `1px solid ${C.border}22` };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ fontFamily: SANS, fontSize: 20, fontWeight: 700, color: C.textPrimary, margin: 0 }}>Edital Verticalizado</h2>
          <div style={{ fontFamily: SANS, fontSize: 11, color: C.textMuted, marginTop: 4 }}>{ed.banca} {ed.ano}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {state.editais.map((e) =>(
            <button key={e.id} onClick={() =>setEdSel(e.id)}
              style={{ background: edSel === e.id ? e.cor + "22" : "transparent", border: `1px solid ${edSel === e.id ? e.cor : C.border}`, color: edSel === e.id ? e.cor : C.textMuted, borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontFamily: SANS, fontSize: 12, fontWeight: 600, transition: "all 0.15s" }}>
              {e.sigla}
            </button>
          ))}
        </div>
      </div>

      {/* Progresso geral */}
      <Card style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontFamily: SANS, fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Progresso no edital — {concluidos} de {totalTopicos} tópicos concluídos
          </span>
          <span style={{ fontFamily: SANS, fontSize: 28, fontWeight: 700, color: ed.cor }}>{pctGeral}%</span>
        </div>
        <PBar val={concluidos} max={totalTopicos} color={ed.cor} h={10} />
      </Card>

      {/* Tabela por matéria */}
      {ed.materias.map((mat) =>{
        const mStat = materiaStats(ed.id, mat.id);
        const isExp = expandedMat === mat.id;
        const mTopConc = (mat.topicos || []).filter((t) =>t.concluido).length;
        const mTopTotal = (mat.topicos || []).length;
        const mTopPct = mTopTotal >0 ? Math.round((mTopConc / mTopTotal) * 100) : 0;

        return (
          <div key={mat.id} style={{ background: C.bgCard, border: `1px solid ${isExp ? ed.cor + "55" : C.border}`, borderRadius: 12, overflow: "hidden" }}>
            {/* Matéria header */}
            <div onClick={() =>setExpandedMat(isExp ? null : mat.id)}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", cursor: "pointer", borderBottom: isExp ? `1px solid ${C.border}` : "none" }}>
              <div style={{ width: 4, height: 20, borderRadius: 2, background: ed.cor, flexShrink: 0 }} />
              <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: C.textPrimary, flex: 1 }}>{mat.nome}</span>

              {/* Totais resumidos da matéria */}
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {mStat.feitas >0 && (
                  <>
                    <span style={{ fontFamily: SANS, fontSize: 11, color: C.green }}>{mStat.certas}</span>
                    <span style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted }}>/</span>
                    <span style={{ fontFamily: SANS, fontSize: 11, color: C.red }}>{mStat.erros}</span>
                    <span style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted }}>/</span>
                    <span style={{ fontFamily: SANS, fontSize: 11, color: C.textSecondary }}>{mStat.feitas}</span>
                    <div style={{ background: pctBg(mStat.pct), border: `1px solid ${pctColor(mStat.pct)}44`, borderRadius: 6, padding: "2px 8px" }}>
                      <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: pctColor(mStat.pct) }}>{mStat.pct}%</span>
                    </div>
                  </>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 8 }}>
                  <PBar val={mTopConc} max={mTopTotal} color={ed.cor} h={4} />
                  <span style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted, minWidth: 32 }}>{mTopPct}%</span>
                </div>
              </div>
              <span style={{ color: C.textMuted, fontSize: 12, marginLeft: 8 }}>{isExp ? "↑" : "↓"}</span>
            </div>

            {/* Tabela de tópicos */}
            {isExp && (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
                  <thead>
                    <tr style={{ background: C.bg }}>
                      <th style={{ ...thStyle, textAlign: "left", paddingLeft: 20, minWidth: 220 }}>Tópico</th>
                      <th style={{ ...thStyle, color: C.green }}>✓ Certas</th>
                      <th style={{ ...thStyle, color: C.red }}>✗ Erros</th>
                      <th style={{ ...thStyle }}>Total</th>
                      <th style={{ ...thStyle }}>%</th>
                      <th style={{ ...thStyle }}>Último estudo</th>
                      <th style={{ ...thStyle }}>Concluído</th>
                      <th style={{ ...thStyle }}>Registrar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(mat.topicos || []).map((top, ti) =>{
                      const ts = topicoStats(ed.id, mat.id, top.id);
                      const rowBg = ti % 2 === 0 ? "transparent" : C.bg + "88";
                      return (
                        <tr key={top.id} style={{ background: top.concluido ? C.green + "08" : rowBg, transition: "background 0.2s" }}
                          onMouseEnter={(e) =>{ if (!top.concluido) e.currentTarget.style.background = C.accentGlow; }}
                          onMouseLeave={(e) =>{ e.currentTarget.style.background = top.concluido ? C.green + "08" : rowBg; }}>

                          {/* Tópico nome */}
                          <td style={{ ...tdStyle, textAlign: "left", paddingLeft: 20 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ width: 8, height: 8, borderRadius: "50%", background: top.concluido ? C.green : ts.feitas >0 ? ed.cor : C.border, flexShrink: 0 }} />
                              <span style={{ color: top.concluido ? C.textMuted : C.textSecondary, textDecoration: top.concluido ? "line-through" : "none", fontSize: 12, fontFamily: SANS, lineHeight: 1.4 }}>{top.nome}</span>
                            </div>
                          </td>

                          {/* Certas */}
                          <td style={{ ...tdStyle, color: C.green, fontWeight: 600 }}>{ts.certas >0 ? ts.certas : <span style={{ color: C.border }}>—</span>}</td>

                          {/* Erros */}
                          <td style={{ ...tdStyle, color: ts.erros >0 ? C.red : C.border, fontWeight: ts.erros >0 ? 600 : 400 }}>{ts.erros >0 ? ts.erros : <span style={{ color: C.border }}>—</span>}</td>

                          {/* Total */}
                          <td style={{ ...tdStyle, color: C.textSecondary }}>{ts.feitas >0 ? ts.feitas : <span style={{ color: C.border }}>—</span>}</td>

                          {/* % aproveitamento */}
                          <td style={{ ...tdStyle }}>
                            {ts.pct !== null ? (
                              <span style={{ background: pctBg(ts.pct), color: pctColor(ts.pct), border: `1px solid ${pctColor(ts.pct)}44`, borderRadius: 6, padding: "2px 8px", fontWeight: 700, display: "inline-block" }}>
                                {ts.pct}%
                              </span>
                            ) : <span style={{ color: C.border }}>—</span>}
                          </td>

                          {/* Último estudo */}
                          <td style={{ ...tdStyle, color: C.textMuted, fontSize: 11 }}>
                            {ts.ultima ? new Date(ts.ultima).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" }) : <span style={{ color: C.border }}>—</span>}
                          </td>

                          {/* Toggle concluído */}
                          <td style={{ ...tdStyle }}>
                            <div onClick={() =>toggleConc(mat.id, top.id)}
                              style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${top.concluido ? C.green : C.border}`, background: top.concluido ? C.green : "transparent", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", transition: "all 0.15s", margin: "0 auto" }}>
                              {top.concluido ? "✓" : ""}
                            </div>
                          </td>

                          {/* Registrar questões */}
                          <td style={{ ...tdStyle }}>
                            <button onClick={() =>{ setModalReg({ editalId: ed.id, materiaId: mat.id, topicoId: top.id, topicoNome: top.nome, matNome: mat.nome }); setRegForm({ feitas: "", certas: "" }); }}
                              style={{ background: ed.cor + "22", border: `1px solid ${ed.cor}44`, color: ed.cor, borderRadius: 6, padding: "3px 10px", cursor: "pointer", fontFamily: SANS, fontSize: 10, whiteSpace: "nowrap" }}>
                              + Add
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    {/* Total row */}
                    {mStat.feitas >0 && (
                      <tr style={{ background: C.bg, borderTop: `2px solid ${C.border}` }}>
                        <td style={{ ...tdStyle, textAlign: "left", paddingLeft: 20, fontWeight: 600, color: C.textPrimary, fontFamily: SANS }}>TOTAL</td>
                        <td style={{ ...tdStyle, color: C.green, fontWeight: 700 }}>{mStat.certas}</td>
                        <td style={{ ...tdStyle, color: C.red, fontWeight: 700 }}>{mStat.erros}</td>
                        <td style={{ ...tdStyle, color: C.textSecondary, fontWeight: 700 }}>{mStat.feitas}</td>
                        <td style={{ ...tdStyle }}>
                          <span style={{ background: pctBg(mStat.pct), color: pctColor(mStat.pct), border: `1px solid ${pctColor(mStat.pct)}44`, borderRadius: 6, padding: "2px 8px", fontWeight: 700, display: "inline-block" }}>
                            {mStat.pct}%
                          </span>
                        </td>
                        <td style={{ ...tdStyle }} />
                        <td style={{ ...tdStyle }}>
                          <span style={{ fontFamily: SANS, fontSize: 10, color: ed.cor }}>{mTopConc}/{mTopTotal}</span>
                        </td>
                        <td style={{ ...tdStyle }} />
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}

      {/* Modal registrar questões por tópico */}
      <Modal open={!!modalReg} onClose={() =>setModalReg(null)} title={`Registrar Questões — ${modalReg?.topicoNome}`} width={400}>
        <div style={{ marginBottom: 14, padding: "10px 14px", background: C.bg, borderRadius: 8, border: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: SANS, fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Matéria</div>
          <div style={{ fontFamily: SANS, fontSize: 13, color: C.textSecondary }}>{modalReg?.matNome}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Questões feitas" type="number" min="0" value={regForm.feitas} onChange={(v) =>setRegForm((r) =>({ ...r, feitas: v }))} />
            <Input label="Questões certas" type="number" min="0" value={regForm.certas} onChange={(v) =>setRegForm((r) =>({ ...r, certas: v }))} />
          </div>
          {Number(regForm.feitas) >0 && (
            <div style={{ background: pctBg(Math.round((Number(regForm.certas) / Number(regForm.feitas)) * 100)), borderRadius: 8, padding: "10px 14px", textAlign: "center" }}>
              <span style={{ fontFamily: SANS, fontSize: 20, fontWeight: 700, color: pctColor(Math.round((Number(regForm.certas) / Number(regForm.feitas)) * 100)) }}>
                {Math.round((Number(regForm.certas) / Number(regForm.feitas)) * 100)}% acerto
              </span>
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <Btn onClick={() =>setModalReg(null)} variant="ghost" style={{ flex: 1 }}>Cancelar</Btn>
            <Btn onClick={salvarReg} disabled={!regForm.feitas} style={{ flex: 1 }}>Salvar</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── LEGISLAÇÃO ───────────────────────────────────────────────────────────────
const DIFICULDADES = [
  { value: "facil",  label: "Fácil",  color: "#16A34A" },
  { value: "medio",  label: "Médio",  color: "#D97706" },
  { value: "dificil",label: "Difícil",color: "#DC2626" },
];

function Legislacao({ state, setState }) {
  const [modalNova, setModalNova]   = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [filtroEd, setFiltroEd]     = useState("todos");
  const [filtroDif, setFiltroDif]   = useState("todos");
  const [filtroStatus, setFiltroStatus] = useState("todos"); // todos | pendente | concluida
  const [busca, setBusca]           = useState("");
  const [expandedGrupo, setExpandedGrupo] = useState({});

  const formVazio = { nome: "", numero: "", editalId: "", dificuldade: "medio", teoria: false, anki: false, questoes: false, obs: "" };
  const [form, setForm] = useState(formVazio);

  const leis = state.leis || [];

  // ── CRUD ──────────────────────────────────────────────────────────────────
  function abrirNova() {
    setEditandoId(null);
    setForm({ ...formVazio, editalId: state.editais[0] ? String(state.editais[0].id) : "" });
    setModalNova(true);
  }

  function abrirEditar(lei) {
    setEditandoId(lei.id);
    setForm({ nome: lei.nome, numero: lei.numero || "", editalId: lei.editalId ? String(lei.editalId) : "", dificuldade: lei.dificuldade || "medio", teoria: !!lei.teoria, anki: !!lei.anki, questoes: !!lei.questoes, obs: lei.obs || "" });
    setModalNova(true);
  }

  function fechar() { setModalNova(false); setEditandoId(null); setForm(formVazio); }

  function salvar() {
    if (!form.nome.trim()) return;
    const payload = { nome: form.nome.trim(), numero: form.numero.trim(), editalId: form.editalId ? Number(form.editalId) : null, dificuldade: form.dificuldade, teoria: form.teoria, anki: form.anki, questoes: form.questoes, obs: form.obs.trim() };
    if (editandoId) {
      setState((s) => ({ ...s, leis: (s.leis || []).map((l) => l.id === editandoId ? { ...l, ...payload } : l) }));
    } else {
      setState((s) => ({ ...s, leis: [...(s.leis || []), { id: uid(), ...payload, criadoEm: new Date().toISOString() }] }));
    }
    fechar();
  }

  function remover(id) { setState((s) => ({ ...s, leis: (s.leis || []).filter((l) => l.id !== id) })); }

  function toggleCheck(id, campo) {
    setState((s) => ({ ...s, leis: (s.leis || []).map((l) => l.id === id ? { ...l, [campo]: !l[campo] } : l) }));
  }

  // ── Filtros e agrupamento ─────────────────────────────────────────────────
  const leisFiltradas = useMemo(() => {
    return leis.filter((l) => {
      if (filtroEd !== "todos" && String(l.editalId) !== filtroEd) return false;
      if (filtroDif !== "todos" && l.dificuldade !== filtroDif) return false;
      if (filtroStatus === "concluida" && !(l.teoria && l.anki && l.questoes)) return false;
      if (filtroStatus === "pendente"  && (l.teoria && l.anki && l.questoes))  return false;
      if (busca && !`${l.nome} ${l.numero}`.toLowerCase().includes(busca.toLowerCase())) return false;
      return true;
    });
  }, [leis, filtroEd, filtroDif, filtroStatus, busca]);

  // Agrupar por edital
  const grupos = useMemo(() => {
    const byEd = {};
    leisFiltradas.forEach((l) => {
      const k = l.editalId ? String(l.editalId) : "__sem__";
      if (!byEd[k]) byEd[k] = [];
      byEd[k].push(l);
    });
    return Object.entries(byEd).map(([k, ls]) => ({
      ed: state.editais.find((e) => String(e.id) === k) || null,
      key: k,
      leis: ls,
    })).sort((a, b) => (a.ed?.sigla || "zzz").localeCompare(b.ed?.sigla || "zzz"));
  }, [leisFiltradas, state.editais]);

  // ── Stats globais ─────────────────────────────────────────────────────────
  const totalLeis       = leis.length;
  const totalConcluidas = leis.filter((l) => l.teoria && l.anki && l.questoes).length;
  const totalTeoria     = leis.filter((l) => l.teoria).length;
  const totalAnki       = leis.filter((l) => l.anki).length;
  const totalQuestoes   = leis.filter((l) => l.questoes).length;
  const pctGeral        = totalLeis > 0 ? Math.round((totalConcluidas / totalLeis) * 100) : 0;

  const difColor = (d) => DIFICULDADES.find((x) => x.value === d)?.color || C.textMuted;
  const difLabel = (d) => DIFICULDADES.find((x) => x.value === d)?.label || d;

  const edOpts = [{ value: "", label: "Sem edital" }, ...state.editais.map((e) => ({ value: String(e.id), label: `${e.sigla} — ${e.nome}` }))];

  // ── Checkbox visual ───────────────────────────────────────────────────────
  function Check({ checked, onChange, label, color }) {
    return (
      <div onClick={onChange} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", userSelect: "none" }}>
        <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${checked ? color : C.border}`, background: checked ? color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", flexShrink: 0 }}>
          {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
        {label && <span style={{ fontSize: 12, color: checked ? color : C.textMuted, fontWeight: checked ? 600 : 400 }}>{label}</span>}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 600, color: C.textPrimary, margin: 0 }}>Controle de Legislação</h2>
        <Btn onClick={abrirNova}>+ Nova Lei</Btn>
      </div>

      {/* Cards de resumo */}
      {totalLeis > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10 }}>
          {[
            { label: "Total de leis",  val: totalLeis,                                     color: C.accent  },
            { label: "Concluídas",     val: `${totalConcluidas} (${pctGeral}%)`,            color: C.green   },
            { label: "Teoria feita",   val: `${totalTeoria}/${totalLeis}`,                  color: C.purple  },
            { label: "Anki feito",     val: `${totalAnki}/${totalLeis}`,                    color: C.teal    },
            { label: "Questões feitas",val: `${totalQuestoes}/${totalLeis}`,                color: C.orange  },
          ].map((s) => (
            <div key={s.label} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600, marginBottom: 5 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>
      )}

      {/* Barra de progresso geral */}
      {totalLeis > 0 && (
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: C.textSecondary, fontWeight: 500 }}>Progresso geral (teoria + anki + questões)</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: pctGeral >= 70 ? C.green : pctGeral >= 40 ? C.yellow : C.red }}>{pctGeral}%</span>
          </div>
          {/* Três barras empilhadas */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: "Teoria",   val: totalTeoria,   color: C.purple },
              { label: "Anki",     val: totalAnki,     color: C.teal   },
              { label: "Questões", val: totalQuestoes, color: C.orange },
            ].map((b) => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, color: C.textMuted, minWidth: 52 }}>{b.label}</span>
                <div style={{ flex: 1, background: C.border, borderRadius: 99, height: 6, overflow: "hidden" }}>
                  <div style={{ width: `${totalLeis > 0 ? Math.round((b.val / totalLeis) * 100) : 0}%`, height: "100%", background: b.color, borderRadius: 99, transition: "width 0.4s" }} />
                </div>
                <span style={{ fontSize: 10, color: b.color, fontWeight: 600, minWidth: 28, textAlign: "right" }}>{b.val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtros */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        {/* Busca */}
        <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar lei..."
          style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 7, padding: "7px 12px", fontSize: 13, color: C.textPrimary, outline: "none", minWidth: 180, flex: 1 }}
          onFocus={(e) => e.target.style.borderColor = C.accent} onBlur={(e) => e.target.style.borderColor = C.border} />

        {/* Edital */}
        <select value={filtroEd} onChange={(e) => setFiltroEd(e.target.value)}
          style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 7, padding: "7px 10px", fontSize: 12, color: C.textSecondary, outline: "none", cursor: "pointer" }}>
          <option value="todos">Todos os editais</option>
          {state.editais.map((e) => <option key={e.id} value={String(e.id)}>{e.sigla}</option>)}
          <option value="__sem__">Sem edital</option>
        </select>

        {/* Dificuldade */}
        <select value={filtroDif} onChange={(e) => setFiltroDif(e.target.value)}
          style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 7, padding: "7px 10px", fontSize: 12, color: C.textSecondary, outline: "none", cursor: "pointer" }}>
          <option value="todos">Todas as dificuldades</option>
          {DIFICULDADES.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>

        {/* Status */}
        {["todos", "pendente", "concluida"].map((s) => (
          <button key={s} onClick={() => setFiltroStatus(s)}
            style={{ background: filtroStatus === s ? C.accent : "transparent", border: `1px solid ${filtroStatus === s ? C.accent : C.border}`, color: filtroStatus === s ? "#fff" : C.textMuted, borderRadius: 7, padding: "6px 12px", cursor: "pointer", fontSize: 11, fontWeight: 500, transition: "all 0.15s" }}>
            {s === "todos" ? "Todas" : s === "pendente" ? "Pendentes" : "Concluídas"}
          </button>
        ))}
      </div>

      {/* Vazio */}
      {leis.length === 0 && (
        <div style={{ textAlign: "center", padding: "56px 0", background: C.bgCard, borderRadius: 12, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 14, color: C.textSecondary, marginBottom: 4 }}>Nenhuma lei cadastrada</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>Clique em "+ Nova Lei" para começar</div>
        </div>
      )}

      {leis.length > 0 && leisFiltradas.length === 0 && (
        <div style={{ textAlign: "center", padding: "32px 0", color: C.textMuted, fontSize: 13 }}>Nenhuma lei encontrada com esses filtros</div>
      )}

      {/* Grupos por edital */}
      {grupos.map(({ ed, key, leis: ls }) => {
        const isExp = expandedGrupo[key] !== false;
        const concls = ls.filter((l) => l.teoria && l.anki && l.questoes).length;
        return (
          <div key={key} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Cabeçalho do grupo */}
            <div onClick={() => setExpandedGrupo((p) => ({ ...p, [key]: !isExp }))}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px", cursor: "pointer", borderBottom: `2px solid ${ed?.cor || C.border}`, marginBottom: 6 }}>
              {ed && <div style={{ width: 10, height: 10, borderRadius: "50%", background: ed.cor, flexShrink: 0 }} />}
              <span style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary }}>{ed ? `${ed.sigla} — ${ed.nome}` : "Sem edital"}</span>
              <span style={{ fontSize: 11, color: C.textMuted }}>{ls.length} lei{ls.length !== 1 ? "s" : ""}</span>
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 11, color: C.textMuted }}>{concls}/{ls.length} concluídas</span>
              <div style={{ width: 60 }}><PBar val={concls} max={ls.length} color={ed?.cor || C.accent} h={4} /></div>
              <span style={{ color: C.textMuted, fontSize: 11 }}>{isExp ? "↑" : "↓"}</span>
            </div>

            {/* Tabela de leis */}
            {isExp && (
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                {/* Header tabela */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 60px 60px 60px 80px 60px", gap: 0, padding: "8px 16px", background: C.bg, borderBottom: `1px solid ${C.border}` }}>
                  {[
                    { label: "Lei / Diploma", align: "left" },
                    { label: "Dificuldade", align: "center" },
                    { label: "Teoria", align: "center" },
                    { label: "Anki", align: "center" },
                    { label: "Questões", align: "center" },
                    { label: "Status", align: "center" },
                    { label: "", align: "center" },
                  ].map((h, i) => (
                    <span key={i} style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", textAlign: h.align }}>{h.label}</span>
                  ))}
                </div>

                {ls.map((lei, li) => {
                  const concluida = lei.teoria && lei.anki && lei.questoes;
                  const dc = difColor(lei.dificuldade);
                  const checks = [
                    { campo: "teoria",   color: C.purple, label: "T" },
                    { campo: "anki",     color: C.teal,   label: "A" },
                    { campo: "questoes", color: C.orange, label: "Q" },
                  ];
                  const isLast = li === ls.length - 1;
                  return (
                    <div key={lei.id} style={{ display: "grid", gridTemplateColumns: "1fr 90px 60px 60px 60px 80px 60px", gap: 0, padding: "10px 16px", borderBottom: isLast ? "none" : `1px solid ${C.border}22`, alignItems: "center", background: concluida ? C.greenLight : "transparent", transition: "background 0.2s" }}
                      onMouseEnter={(e) => { if (!concluida) e.currentTarget.style.background = C.bg; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = concluida ? C.greenLight : "transparent"; }}>

                      {/* Nome + número */}
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: concluida ? C.textMuted : C.textPrimary, textDecoration: concluida ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lei.nome}</div>
                        {lei.numero && <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>{lei.numero}</div>}
                        {lei.obs && <div style={{ fontSize: 11, color: C.yellow, marginTop: 2, fontStyle: "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lei.obs}</div>}
                      </div>

                      {/* Dificuldade */}
                      <div style={{ textAlign: "center" }}>
                        <span style={{ background: dc + "18", color: dc, border: `1px solid ${dc}30`, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{difLabel(lei.dificuldade)}</span>
                      </div>

                      {/* Checkboxes */}
                      {checks.map((ck) => (
                        <div key={ck.campo} style={{ display: "flex", justifyContent: "center" }}>
                          <div onClick={() => toggleCheck(lei.id, ck.campo)}
                            style={{ width: 22, height: 22, borderRadius: 5, border: `2px solid ${lei[ck.campo] ? ck.color : C.border}`, background: lei[ck.campo] ? ck.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s" }}>
                            {lei[ck.campo] && <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                          </div>
                        </div>
                      ))}

                      {/* Status badge */}
                      <div style={{ textAlign: "center" }}>
                        {concluida ? (
                          <span style={{ background: C.green + "18", color: C.green, border: `1px solid ${C.green}30`, borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 600 }}>Concluída</span>
                        ) : (
                          <span style={{ fontSize: 11, color: C.textMuted }}>
                            {[lei.teoria && "T", lei.anki && "A", lei.questoes && "Q"].filter(Boolean).join(" ") || "—"}
                          </span>
                        )}
                      </div>

                      {/* Ações */}
                      <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                        <button onClick={() => abrirEditar(lei)}
                          style={{ background: C.accentLight, border: `1px solid ${C.accent}30`, color: C.accent, borderRadius: 5, padding: "3px 8px", cursor: "pointer", fontSize: 11, fontWeight: 500 }}>
                          Editar
                        </button>
                        <button onClick={() => remover(lei.id)}
                          style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 14, padding: "2px 4px", borderRadius: 4, transition: "color 0.15s" }}
                          onMouseEnter={(e) => e.currentTarget.style.color = C.red}
                          onMouseLeave={(e) => e.currentTarget.style.color = C.textMuted}>×</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Modal nova/editar lei */}
      <Modal open={modalNova} onClose={fechar} title={editandoId ? "Editar Lei" : "Nova Lei"} width={520}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Input label="Nome da lei / diploma" value={form.nome} onChange={(v) => setForm((f) => ({ ...f, nome: v }))} placeholder="Ex: Lei de Responsabilidade Fiscal" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Número / referência" value={form.numero} onChange={(v) => setForm((f) => ({ ...f, numero: v }))} placeholder="Ex: LC 101/2000" />
            <Select label="Edital" value={form.editalId} onChange={(v) => setForm((f) => ({ ...f, editalId: v }))} options={edOpts} />
          </div>

          {/* Dificuldade */}
          <div>
            <label style={{ fontSize: 12, color: C.textSecondary, fontWeight: 500, display: "block", marginBottom: 8 }}>Nível de dificuldade</label>
            <div style={{ display: "flex", gap: 8 }}>
              {DIFICULDADES.map((d) => (
                <button key={d.value} onClick={() => setForm((f) => ({ ...f, dificuldade: d.value }))}
                  style={{ flex: 1, background: form.dificuldade === d.value ? d.color + "18" : "transparent", border: `2px solid ${form.dificuldade === d.value ? d.color : C.border}`, color: form.dificuldade === d.value ? d.color : C.textMuted, borderRadius: 8, padding: "8px 0", cursor: "pointer", fontSize: 13, fontWeight: form.dificuldade === d.value ? 700 : 400, transition: "all 0.15s" }}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes de progresso */}
          <div>
            <label style={{ fontSize: 12, color: C.textSecondary, fontWeight: 500, display: "block", marginBottom: 10 }}>Progresso</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                { campo: "teoria",   label: "Teoria",   color: C.purple, desc: "Leitura e estudo da lei" },
                { campo: "anki",     label: "Anki",     color: C.teal,   desc: "Flashcards criados" },
                { campo: "questoes", label: "Questões", color: C.orange, desc: "Questões resolvidas" },
              ].map((ck) => (
                <div key={ck.campo} onClick={() => setForm((f) => ({ ...f, [ck.campo]: !f[ck.campo] }))}
                  style={{ background: form[ck.campo] ? ck.color + "12" : C.bg, border: `2px solid ${form[ck.campo] ? ck.color : C.border}`, borderRadius: 10, padding: "12px", cursor: "pointer", transition: "all 0.15s", textAlign: "center" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, border: `2px solid ${form[ck.campo] ? ck.color : C.border}`, background: form[ck.campo] ? ck.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", transition: "all 0.15s" }}>
                    {form[ck.campo] && <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1 5.5L5 9.5L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: form[ck.campo] ? ck.color : C.textSecondary }}>{ck.label}</div>
                  <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>{ck.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <Textarea label="Observações (opcional)" value={form.obs} onChange={(v) => setForm((f) => ({ ...f, obs: v }))} placeholder="Anotações, pontos importantes..." rows={2} />

          <div style={{ display: "flex", gap: 10, marginTop: 4, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
            <Btn onClick={fechar} variant="ghost" style={{ flex: 1 }}>Cancelar</Btn>
            <Btn onClick={salvar} disabled={!form.nome.trim()} style={{ flex: 1 }}>{editandoId ? "Salvar Alterações" : "Adicionar Lei"}</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "dashboard",  label: "Dashboard"    },
  { id: "vertical",   label: "Verticalizado"},
  { id: "ciclos",     label: "Ciclos"       },
  { id: "simulados",  label: "Simulados"    },
  { id: "listas",      label: "Listas"       },
  { id: "legislacao",  label: "Legislação"   },
  { id: "editais",     label: "Editais"      },
  { id: "relatorios",  label: "Relatórios"   },
  { id: "metas",       label: "Metas"        },
  { id: "sessoes",     label: "Sessões"      },
];

export default function App() {
  const [state, setState] = useLS("studyDesk_v8", DEFAULT_STATE);
  const [tab, setTab] = useState("dashboard");
  const running = state.tracker?.ativo;
  const cicloAtivo = state.ciclos?.find((c) =>c.ativo);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.textPrimary, fontFamily: SANS }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        input, select, textarea, button { font-family: inherit; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.sidebarBorder}`, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, position: "sticky", top: 0, background: C.headerBg, zIndex: 100, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="2" width="14" height="2" rx="1" fill="white"/>
              <rect x="1" y="7" width="9" height="2" rx="1" fill="white"/>
              <rect x="1" y="12" width="11" height="2" rx="1" fill="white"/>
            </svg>
          </div>
          <span style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: C.textPrimary, letterSpacing: "-0.01em" }}>StudyDesk</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {cicloAtivo && (
            <span style={{ background: C.greenLight, color: C.green, border: `1px solid ${C.green}33`, borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 500 }}>
              Ciclo ativo: {cicloAtivo.nome}
            </span>
          )}
          {running && (
            <span style={{ display: "flex", alignItems: "center", gap: 6, background: C.redLight, color: C.red, border: `1px solid ${C.red}33`, borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 500 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.red, display: "inline-block" }} />
              Sessão ativa
            </span>
          )}
          <span style={{ fontSize: 13, color: C.textMuted, fontWeight: 400 }}>{new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}</span>
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 56px)" }}>
        {/* Sidebar */}
        <div style={{ width: 200, borderRight: `1px solid ${C.sidebarBorder}`, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 1, flexShrink: 0, overflowY: "auto", background: C.sidebar }}>
          {TABS.map((t) =>{
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() =>setTab(t.id)}
                style={{ background: active ? C.accentLight : "transparent", border: "none", borderRadius: 7, padding: "8px 12px", cursor: "pointer", color: active ? C.accent : C.textSecondary, fontFamily: SANS, fontSize: 13, fontWeight: active ? 600 : 400, textAlign: "left", display: "block", width: "100%", transition: "all 0.12s", letterSpacing: "-0.01em" }}
                onMouseEnter={(e) =>{ if (!active) e.currentTarget.style.background = C.bg; }}
                onMouseLeave={(e) =>{ if (!active) e.currentTarget.style.background = "transparent"; }}>
                {t.label}
              </button>
            );
          })}

          {/* Progresso mini */}
          <div style={{ marginTop: 20, borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
            <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, paddingLeft: 4 }}>Progresso</div>
            {state.editais.map((ed) =>{
              const totalTopicos = ed.materias.reduce((a, m) =>a + (m.topicos?.length || 0), 0);
              const concluidos = ed.materias.reduce((a, m) =>a + (m.topicos?.filter((t) =>t.concluido).length || 0), 0);
              const pct = totalTopicos >0 ? Math.round((concluidos / totalTopicos) * 100) : 0;
              return (
                <div key={ed.id} style={{ padding: "4px 4px 10px", marginBottom: 2 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: ed.cor }}>{ed.sigla}</span>
                    <span style={{ fontSize: 11, color: C.textMuted }}>{pct}%</span>
                  </div>
                  <PBar val={concluidos} max={totalTopicos} color={ed.cor} h={4} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: "28px 32px", background: C.bg }}>
          {tab === "dashboard"  && <Dashboard          state={state} setState={setState} />}
          {tab === "vertical"   && <EditalVerticalizado state={state} setState={setState} />}
          {tab === "ciclos"     && <Ciclos              state={state} setState={setState} />}
          {tab === "simulados"  && <Simulados           state={state} setState={setState} />}
          {tab === "listas"      && <Listas              state={state} setState={setState} />}
          {tab === "legislacao"  && <Legislacao          state={state} setState={setState} />}
          {tab === "editais"     && <Editais             state={state} setState={setState} />}
          {tab === "relatorios" && <Relatorios          state={state} />}
          {tab === "metas"      && <Metas               state={state} setState={setState} />}
          {tab === "sessoes"    && <Sessoes             state={state} setState={setState} />}
        </div>
      </div>
    </div>
  );
}
