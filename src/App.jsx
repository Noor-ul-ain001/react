import { useState } from "react";

const data = {
  phases: [
    {
      id: "P1", label: "REACT CORE", color: "#FF6B35", glow: "rgba(255,107,53,0.2)",
      weeks: "Wk 1–2", tag: "FRONTEND",
      project: { name: "AI Task Manager", stack: "React + useState + localStorage + OpenAI API", ai: true },
      sections: [
        {
          title: "JSX & Components",
          items: ["JSX syntax, expressions, fragments","Functional components & props","children prop & prop drilling","Component composition patterns","Conditional rendering (&&, ternary)","List rendering with .map() + keys"],
        },
        {
          title: "State & Events",
          items: ["useState — primitive & object state","Immutable state updates (spread)","onClick, onChange, onSubmit","Controlled vs uncontrolled inputs","Lifting state up to parent","Forms: add, edit, delete flows"],
        },
      ],
    },
    {
      id: "P2", label: "HOOKS MASTERY", color: "#00D4FF", glow: "rgba(0,212,255,0.2)",
      weeks: "Wk 3–4", tag: "FRONTEND",
      project: { name: "AI Weather Dashboard", stack: "React + Hooks + REST API + AI Summary", ai: true },
      sections: [
        {
          title: "Built-in Hooks",
          items: ["useEffect — deps array, cleanup","useRef — DOM access, timers","useContext — global state","useReducer — complex state logic","useMemo — expensive computations","useCallback — stable references"],
        },
        {
          title: "Custom Hooks",
          items: ["useFetch — data fetching hook","useLocalStorage — persistence","useDebounce — input optimization","useForm — form state handler","useAI — wrapper for AI API calls","Rules of hooks (top-level, React fn)"],
        },
      ],
    },
    {
      id: "P3", label: "ADVANCED REACT", color: "#B94FFF", glow: "rgba(185,79,255,0.2)",
      weeks: "Wk 5", tag: "FRONTEND",
      project: { name: "E-commerce + AI Search", stack: "React + Context + Zustand + Semantic Search", ai: true },
      sections: [
        {
          title: "Patterns & Performance",
          items: ["React.memo — skip re-renders","Higher-Order Components (HOC)","Render props pattern","Compound components","Lazy loading + React.Suspense","Error Boundaries"],
        },
        {
          title: "Ecosystem",
          items: ["React Router v6 — routes, params","Nested routes + layouts","React Query — server state","Zustand — global client state","Axios — HTTP client setup","React Hook Form + Zod"],
        },
      ],
    },
    {
      id: "P4", label: "NEXT.JS CORE", color: "#00FF9D", glow: "rgba(0,255,157,0.2)",
      weeks: "Wk 6–7", tag: "FULLSTACK",
      project: { name: "AI Blog Platform", stack: "Next.js + App Router + MDX + AI Writer", ai: true },
      sections: [
        {
          title: "App Router Fundamentals",
          items: ["File-based routing (app/ dir)","Layouts, templates, loading.tsx","Server vs Client Components","Metadata API — SEO tags","Dynamic routes [slug] + [...catch]","Route Groups (marketing) vs (app)"],
        },
        {
          title: "Data & Rendering",
          items: ["SSR — Server Side Rendering","SSG — Static Site Generation","ISR — Incremental Static Regen","fetch() with cache options","Server Actions (form mutations)","Streaming with Suspense"],
        },
      ],
    },
    {
      id: "P5", label: "BACKEND + DB", color: "#FFD700", glow: "rgba(255,215,0,0.2)",
      weeks: "Wk 8–9", tag: "BACKEND",
      project: { name: "Full-Stack SaaS + Auth", stack: "Next.js + Prisma + PostgreSQL + NextAuth", ai: false },
      sections: [
        {
          title: "Backend Essentials",
          items: ["Node.js runtime concepts","REST API design principles","Express.js or Next.js API Routes","JWT + bcrypt authentication","NextAuth.js / Clerk — auth flows","Middleware — guards, redirects"],
        },
        {
          title: "Database Layer",
          items: ["PostgreSQL — tables, joins, queries","Prisma ORM — schema, migrations","MongoDB + Mongoose (NoSQL alt)","Redis — caching, sessions","Supabase — Postgres + auth + storage","Environment variables & secrets"],
        },
      ],
    },
    {
      id: "P6", label: "AI INTEGRATION", color: "#FF2D78", glow: "rgba(255,45,120,0.2)",
      weeks: "Wk 10–11", tag: "AI ★ HOT",
      project: { name: "AI SaaS App", stack: "Next.js + OpenAI + LangChain + Streaming UI", ai: true },
      sections: [
        {
          title: "AI APIs & SDKs",
          items: ["OpenAI API — chat, completions","Anthropic Claude API","Vercel AI SDK — streaming responses","Prompt engineering patterns","Function calling / tool use","Embeddings + vector search"],
        },
        {
          title: "AI App Patterns",
          items: ["Streaming chat UI (real-time tokens)","RAG — Retrieval Augmented Generation","LangChain.js / LlamaIndex","Pinecone / pgvector (vector DB)","Image gen — DALL·E / Replicate","AI agents + multi-step workflows"],
        },
      ],
    },
    {
      id: "P7", label: "STYLING & DX", color: "#FF9500", glow: "rgba(255,149,0,0.2)",
      weeks: "Wk 12", tag: "FRONTEND",
      project: { name: "Design System", stack: "Tailwind + shadcn/ui + TypeScript + Storybook", ai: false },
      sections: [
        {
          title: "Styling",
          items: ["Tailwind CSS — utility-first","CSS Modules — scoped styles","shadcn/ui — copy-paste components","Radix UI — accessible primitives","Framer Motion — animations","Dark mode with CSS variables"],
        },
        {
          title: "DX & Quality",
          items: ["TypeScript — types, interfaces, generics","ESLint + Prettier setup","Testing: RTL + Vitest / Jest","Storybook — component docs","Husky + lint-staged","Absolute imports (@/components)"],
        },
      ],
    },
    {
      id: "P8", label: "DEVOPS & SHIP", color: "#00D4FF", glow: "rgba(0,212,255,0.2)",
      weeks: "Wk 13–14", tag: "DEVOPS",
      project: { name: "Production AI App", stack: "Docker + CI/CD + Vercel + Monitoring", ai: false },
      sections: [
        {
          title: "Deployment",
          items: ["Vercel — zero-config deploy","Docker + docker-compose basics","GitHub Actions CI/CD pipeline","Railway / Render — backend hosting","AWS basics — S3, EC2, Lambda","Preview deployments per PR"],
        },
        {
          title: "Production Readiness",
          items: ["Web Vitals — LCP, CLS, FID","Linux/Bash essential commands","Sentry — error monitoring","PostHog / Vercel Analytics","Rate limiting + security headers","SEO: sitemap.xml, robots.txt"],
        },
      ],
    },
  ],
};

const tagColors = { FRONTEND: "#00D4FF", FULLSTACK: "#00FF9D", BACKEND: "#FFD700", "AI ★ HOT": "#FF2D78", DEVOPS: "#B94FFF" };

export default function Roadmap() {
  const [active, setActive] = useState(0);
  const [checked, setChecked] = useState({});

  const phase = data.phases[active];
  const totalItems = data.phases.reduce((a, p) => a + p.sections.reduce((b, s) => b + s.items.length, 0), 0);
  const doneCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneCount / totalItems) * 100);

  const toggle = (key) => setChecked((p) => ({ ...p, [key]: !p[key] }));

  const phaseProgress = (pi) => {
    const p = data.phases[pi];
    const total = p.sections.reduce((a, s) => a + s.items.length, 0);
    const done = p.sections.reduce((a, s, si) => a + s.items.filter((_, ii) => checked[`${pi}-${si}-${ii}`]).length, 0);
    return { done, total, pct: Math.round((done / total) * 100) };
  };

  return (
    <div style={{ minHeight: "100vh", background: "#06060f", color: "#c0c0d0", fontFamily: "'DM Mono','Courier New',monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Unbounded:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-track { background: #0a0a14; } ::-webkit-scrollbar-thumb { background: #222; }
        .ptab { transition: all 0.18s; } .ptab:hover { background: #0f0f1c !important; }
        .irow { transition: all 0.13s; cursor: pointer; } .irow:hover { background: #0e0e1c !important; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .fi { animation: fadeIn 0.25s ease; }
        @keyframes glow { 0%,100% { opacity:.7; } 50% { opacity:1; } }
        .ai-badge { animation: glow 2s infinite; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: "#09091a", borderBottom: "1px solid #111128", padding: "24px 24px 20px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:16 }}>
            <div>
              <div style={{ fontSize:9, letterSpacing:5, color:"#333", marginBottom:6 }}>COMPLETE FULLSTACK + AI PATH</div>
              <h1 style={{ fontFamily:"'Unbounded',sans-serif", fontSize:"clamp(20px,4vw,38px)", fontWeight:900, color:"#fff", letterSpacing:-1, lineHeight:1.1 }}>
                React · Next.js · Backend<br/>
                <span style={{ color:"#FF2D78" }}>+ AI Integration</span>
              </h1>
              <div style={{ fontSize:10, color:"#333", marginTop:6, letterSpacing:2 }}>14 Weeks · JS → Full Stack AI Dev</div>
            </div>
            <div style={{ background:"#0c0c1c", border:"1px solid #181830", borderRadius:12, padding:"14px 20px", minWidth:190 }}>
              <div style={{ fontSize:9, color:"#333", letterSpacing:3, marginBottom:8 }}>OVERALL PROGRESS</div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ flex:1, height:4, background:"#111", borderRadius:2, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#FF2D78,#FF9500,#00FF9D)", borderRadius:2, transition:"width 0.4s" }} />
                </div>
                <span style={{ fontFamily:"'Unbounded',sans-serif", fontSize:16, fontWeight:900, color: pct > 0 ? "#00FF9D" : "#222" }}>{pct}%</span>
              </div>
              <div style={{ fontSize:9, color:"#333", marginTop:5 }}>{doneCount}/{totalItems} topics</div>
            </div>
          </div>

          {/* Phase tabs */}
          <div style={{ display:"flex", gap:5, marginTop:20, flexWrap:"wrap" }}>
            {data.phases.map((p, i) => {
              const prog = phaseProgress(i);
              const isActive = active === i;
              return (
                <button key={i} className="ptab" onClick={() => setActive(i)} style={{
                  background: isActive ? "#111125" : "transparent",
                  border: `1px solid ${isActive ? p.color : "#161628"}`,
                  borderRadius:6, padding:"7px 13px", cursor:"pointer",
                  color: isActive ? p.color : "#333",
                  fontSize:9, letterSpacing:2, fontFamily:"'DM Mono',monospace", fontWeight:500, position:"relative",
                }}>
                  {p.id}
                  {p.tag === "AI ★ HOT" && <span style={{ marginLeft:4, fontSize:8, color:"#FF2D78" }}>★</span>}
                  {prog.done > 0 && (
                    <span style={{ position:"absolute", top:-3, right:-3, width:7, height:7, borderRadius:"50%", background: prog.done===prog.total ? "#00FF9D" : p.color, border:"1.5px solid #06060f" }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth:1080, margin:"0 auto", padding:"24px 20px" }}>
        <div key={active} className="fi">
          {/* Phase header */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:46, height:46, borderRadius:10, background:phase.glow, border:`1.5px solid ${phase.color}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:phase.color, letterSpacing:1 }}>
                {phase.id}
              </div>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                  <span style={{ fontSize:9, color: tagColors[phase.tag] || "#555", letterSpacing:3, background:`${tagColors[phase.tag]}15`, border:`1px solid ${tagColors[phase.tag]}33`, padding:"2px 8px", borderRadius:4 }}>{phase.tag}</span>
                  <span style={{ fontSize:9, color:"#333", letterSpacing:2 }}>{phase.weeks}</span>
                </div>
                <h2 style={{ fontFamily:"'Unbounded',sans-serif", fontSize:20, fontWeight:900, color:"#fff", letterSpacing:-0.5 }}>{phase.label}</h2>
              </div>
            </div>
            {/* Project card */}
            <div style={{
              background: phase.project.ai ? `linear-gradient(135deg, ${phase.glow}, rgba(255,45,120,0.08))` : `${phase.glow}`,
              border: `1px solid ${phase.project.ai ? "#FF2D7833" : phase.color+"33"}`,
              borderRadius:10, padding:"12px 18px", maxWidth:340,
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5 }}>
                <span style={{ fontSize:9, letterSpacing:3, color: phase.project.ai ? "#FF2D78" : phase.color }}>PROJECT</span>
                {phase.project.ai && <span className="ai-badge" style={{ fontSize:9, background:"#FF2D7820", border:"1px solid #FF2D7844", color:"#FF2D78", padding:"1px 7px", borderRadius:4, letterSpacing:2 }}>✦ AI</span>}
              </div>
              <div style={{ fontSize:13, fontWeight:700, color:"#fff", marginBottom:4 }}>🔨 {phase.project.name}</div>
              <div style={{ fontSize:10, color:"#444" }}>{phase.project.stack}</div>
            </div>
          </div>

          {/* Sections */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))", gap:14 }}>
            {phase.sections.map((sec, si) => {
              const secDone = sec.items.filter((_, ii) => checked[`${active}-${si}-${ii}`]).length;
              return (
                <div key={si} style={{ background:"#0b0b18", border:"1px solid #121220", borderRadius:12, overflow:"hidden" }}>
                  <div style={{ padding:"13px 16px", borderBottom:"1px solid #121220", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:3, height:15, borderRadius:2, background:phase.color }} />
                      <span style={{ fontSize:10, fontWeight:700, color:"#bbb", letterSpacing:1 }}>{sec.title.toUpperCase()}</span>
                    </div>
                    <span style={{ fontSize:9, color: secDone === sec.items.length ? "#00FF9D" : "#333" }}>{secDone}/{sec.items.length}</span>
                  </div>
                  <div style={{ padding:"6px 0" }}>
                    {sec.items.map((item, ii) => {
                      const key = `${active}-${si}-${ii}`;
                      const done = !!checked[key];
                      return (
                        <div key={ii} className="irow" onClick={() => toggle(key)} style={{ display:"flex", alignItems:"center", gap:11, padding:"8px 16px", background: done ? `${phase.glow.replace("0.2","0.05")}` : "transparent" }}>
                          <div style={{ width:16, height:16, borderRadius:3, border:`1.5px solid ${done ? phase.color : "#1e1e30"}`, background: done ? phase.color : "transparent", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color:"#000", fontWeight:900, transition:"all 0.13s" }}>
                            {done ? "✓" : ""}
                          </div>
                          <span style={{ fontSize:11, color: done ? "#333" : "#777", textDecoration: done ? "line-through" : "none", lineHeight:1.4, transition:"all 0.13s" }}>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ padding:"0 16px 12px" }}>
                    <div style={{ height:2, background:"#0f0f1c", borderRadius:2, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${Math.round((secDone/sec.items.length)*100)}%`, background:phase.color, borderRadius:2, transition:"width 0.3s" }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nav */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:24, gap:12 }}>
            <button onClick={() => setActive(Math.max(0,active-1))} disabled={active===0} style={{ background:"transparent", border:"1px solid #161628", borderRadius:8, padding:"9px 18px", color:active===0?"#1a1a2a":"#555", cursor:active===0?"not-allowed":"pointer", fontSize:10, letterSpacing:2, fontFamily:"'DM Mono',monospace" }}>← PREV</button>
            <div style={{ display:"flex", gap:5 }}>
              {data.phases.map((_,i) => (
                <div key={i} onClick={() => setActive(i)} style={{ width:i===active?18:5, height:5, borderRadius:3, background:i===active?phase.color:"#161628", cursor:"pointer", transition:"all 0.2s" }} />
              ))}
            </div>
            <button onClick={() => setActive(Math.min(data.phases.length-1,active+1))} disabled={active===data.phases.length-1} style={{ background:active===data.phases.length-1?"transparent":phase.color, border:`1px solid ${active===data.phases.length-1?"#161628":phase.color}`, borderRadius:8, padding:"9px 18px", color:active===data.phases.length-1?"#1a1a2a":"#000", cursor:active===data.phases.length-1?"not-allowed":"pointer", fontSize:10, letterSpacing:2, fontFamily:"'DM Mono',monospace", fontWeight:700 }}>NEXT →</button>
          </div>
        </div>
      </div>

      {/* ALL PROJECTS */}
      <div style={{ borderTop:"1px solid #0f0f1e", padding:"20px 24px 32px", marginTop:8 }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div style={{ fontSize:9, letterSpacing:4, color:"#252535", marginBottom:14 }}>ALL PROJECTS</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {data.phases.map((p, i) => (
              <div key={i} onClick={() => setActive(i)} style={{
                background:"#0b0b18", border:`1px solid ${active===i ? p.color : "#111120"}`,
                borderRadius:8, padding:"10px 16px", cursor:"pointer", transition:"all 0.2s", minWidth:170,
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                  <span style={{ fontSize:9, color:p.color, letterSpacing:2 }}>{p.id}</span>
                  {p.project.ai && <span style={{ fontSize:8, color:"#FF2D78", background:"#FF2D7815", padding:"1px 5px", borderRadius:3, letterSpacing:1 }}>✦ AI</span>}
                </div>
                <div style={{ fontSize:11, color:"#999", fontWeight:700 }}>{p.project.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}