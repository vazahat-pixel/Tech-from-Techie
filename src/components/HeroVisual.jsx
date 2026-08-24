import React, { memo, useState, useEffect } from 'react';
import { ShieldCheck, Terminal, Sparkles, CheckCircle2, Play, Cpu, Layers, Code2, Users, Flame } from 'lucide-react';
import { instructors } from '../data/instructors';

/**
 * Ultra-attractive, high-tech Hero Visual component.
 * Combines high-resolution development visuals with a live interactive IDE glass terminal,
 * floating real-time mentor status card, and glowing tech stack badges.
 */
const CODE_SNIPPETS = [
  {
    title: 'SpringAI_Agent.java',
    tech: 'Java / Spring AI',
    badge: 'Enterprise Backend',
    lines: [
      { num: 1, code: '@RestController @RequestMapping("/api/v1/ai")', color: 'text-purple-400' },
      { num: 2, code: 'public class TechieAgentController {', color: 'text-blue-300' },
      { num: 3, code: '  @Autowired private OpenAiChatModel chatModel;', color: 'text-emerald-400' },
      { num: 4, code: '  @PostMapping("/generate-agent")', color: 'text-purple-400' },
      { num: 5, code: '  public ResponseEntity<AgentResponse> build() {', color: 'text-yellow-300' },
      { num: 6, code: '    var prompt = new Prompt("Build Enterprise Microservice");', color: 'text-sky-300' },
      { num: 7, code: '    return ResponseEntity.ok(chatModel.call(prompt));', color: 'text-emerald-300' },
      { num: 8, code: '  }', color: 'text-blue-300' },
      { num: 9, code: '}', color: 'text-blue-300' },
    ],
    status: '✓ Spring AI Microservice Running on Port 8080',
  },
  {
    title: 'GenAI_RAG_Pipeline.py',
    tech: 'Python / GenAI',
    badge: 'Agentic AI',
    lines: [
      { num: 1, code: 'from techfromtechie.agents import RAGPipeline, Tool', color: 'text-purple-400' },
      { num: 2, code: 'pipeline = RAGPipeline(model="llama-3-agentic")', color: 'text-blue-300' },
      { num: 3, code: 'vector_db = PineconeIndex.connect(index="enterprise_docs")', color: 'text-emerald-400' },
      { num: 4, code: '@pipeline.register_tool(name="code_analyzer")', color: 'text-yellow-300' },
      { num: 5, code: 'def autonomous_workflow(query: str) -> dict:', color: 'text-sky-300' },
      { num: 6, code: '    context = vector_db.similarity_search(query)', color: 'text-emerald-300' },
      { num: 7, code: '    return pipeline.execute(query=query, context=context)', color: 'text-yellow-300' },
      { num: 8, code: '# Output: Enterprise RAG Assistant Online', color: 'text-slate-400 italic' },
    ],
    status: '✓ Vector Embeddings Synced • RAG Pipeline Active',
  },
  {
    title: 'FullStackApp.tsx',
    tech: 'React 18 / Node.js',
    badge: 'Full Stack',
    lines: [
      { num: 1, code: 'import { useQuery, useMutation } from "@tanstack/react-query";', color: 'text-purple-400' },
      { num: 2, code: 'export const EnterpriseDashboard = () => {', color: 'text-blue-300' },
      { num: 3, code: '  const { data: courses, isLoading } = useQuery({', color: 'text-sky-300' },
      { num: 4, code: '    queryKey: ["live-cohorts"], queryFn: fetchCohorts', color: 'text-emerald-400' },
      { num: 5, code: '  });', color: 'text-sky-300' },
      { num: 6, code: '  return <LiveCodingCanvas activeStream={courses} />;', color: 'text-yellow-300' },
      { num: 7, code: '};', color: 'text-blue-300' },
    ],
    status: '✓ Production Build Ready • Zero Downtime Deployed',
  },
];

export const HeroVisual = memo(function HeroVisual() {
  const [activeSnippetIdx, setActiveSnippetIdx] = useState(0);
  const currentSnippet = CODE_SNIPPETS[activeSnippetIdx];
  const mentor = instructors[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSnippetIdx((prev) => (prev + 1) % CODE_SNIPPETS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-lg lg:max-w-none mx-auto">
      {/* Background Radial Glow */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[3rem] blur-3xl opacity-60 pointer-events-none
                   bg-[radial-gradient(ellipse_at_center,#2563EB35,#4338CA20,transparent_75%)]"
      />

      {/* Main Container Glass Frame */}
      <div className="relative rounded-2xl overflow-hidden border border-blue-500/25 bg-[#0B0F1A]/95 shadow-glow-mixed backdrop-blur-xl">
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-[#111728] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="ml-2 text-[11px] font-mono text-slate-400 font-medium flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              techfromtechie-ide ~ <span className="text-white font-semibold">{currentSnippet.title}</span>
            </span>
          </div>

          {/* Snippet Switch Tabs */}
          <div className="flex items-center gap-1">
            {CODE_SNIPPETS.map((snip, idx) => (
              <button
                key={snip.title}
                onClick={() => setActiveSnippetIdx(idx)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors duration-150 cursor-pointer
                  ${idx === activeSnippetIdx
                    ? 'bg-blue-600/30 text-blue-300 border border-blue-400/40 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {snip.tech.split('/')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Code Display Area */}
        <div className="p-4 sm:p-5 font-mono text-[11.5px] sm:text-[12px] leading-relaxed bg-[#070A14] overflow-x-auto select-none min-h-[220px]">
          {currentSnippet.lines.map((line) => (
            <div key={line.num} className="flex items-center gap-3">
              <span className="text-slate-600 select-none w-4 text-right text-[10.5px] shrink-0">
                {line.num}
              </span>
              <span className={`${line.color} whitespace-pre`}>{line.code}</span>
            </div>
          ))}

          {/* Live Terminal Cursor */}
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
            <span className="text-emerald-400 text-[10.5px]">{currentSnippet.status}</span>
            <span className="w-2 h-4 bg-blue-400 inline-block animate-pulse" />
          </div>
        </div>

        {/* Visual Live Tech Bar */}
        <div className="px-4 py-3 bg-[#0E1528] border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-semibold text-slate-200">
              Live Coding &amp; Mentorship
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {['Java', 'Spring Boot', 'GenAI', 'Python', 'React', 'Docker'].map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 rounded text-[9.5px] font-mono font-medium bg-[#16203A] text-blue-300 border border-blue-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Card 1: Live Mentor Card (Top-Right / Overlapping) */}
      <div className="absolute -top-6 -right-3 sm:-right-6 z-20 hidden sm:flex items-center gap-2.5 p-2.5 px-3.5
                      rounded-xl bg-[#0B1020]/90 border border-blue-400/30 backdrop-blur-md shadow-elev-3 animate-float">
        <div className="relative">
          <img
            src={mentor.avatar}
            alt={mentor.name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-400/50"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0B1020]" />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <p className="text-[11.5px] font-bold text-white leading-tight">{mentor.name}</p>
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <p className="text-[9.5px] text-blue-300 font-medium leading-tight mt-0.5">
            {mentor.role} • 12+ Yrs NIT Raipur
          </p>
        </div>
      </div>

      {/* Floating Card 2: 1-on-1 Free Demo Badge (Bottom-Left / Overlapping) */}
      <div className="absolute -bottom-5 -left-3 sm:-left-5 z-20 flex items-center gap-2.5 p-2.5 px-3.5
                      rounded-xl bg-[#0B1020]/90 border border-emerald-500/35 backdrop-blur-md shadow-elev-3 animate-float-delayed">
        <div className="p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[11.5px] font-bold text-white leading-tight">One-to-One Free Demo</p>
          <p className="text-[10px] text-emerald-400 font-medium leading-tight mt-0.5">
            Book with Lead Engineer • 0 Commitment
          </p>
        </div>
      </div>
    </div>
  );
});
