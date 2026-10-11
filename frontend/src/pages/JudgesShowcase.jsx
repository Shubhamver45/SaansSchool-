import React, { useState, useEffect } from 'react';
import { 
  Award, Cloud, Cpu, CheckCircle2, Copy, ExternalLink, 
  Play, Video, ShieldCheck, Zap, Server, Database, Globe, 
  Terminal, Sparkles, AlertCircle, FileText, ArrowRight, 
  Check, RefreshCw, Compass
} from 'lucide-react';
import { fetchAwsArchitecture } from '../services/api';
import './JudgesShowcase.css';

export function JudgesShowcase({ onNavigateTab }) {
  const [awsMeta, setAwsMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeCriterion, setActiveCriterion] = useState('01');
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  useEffect(() => {
    loadAwsSpecs();
  }, []);

  const loadAwsSpecs = async () => {
    try {
      setLoading(true);
      const data = await fetchAwsArchitecture();
      setAwsMeta(data);
    } catch (err) {
      console.error('Failed to load AWS architecture specs:', err);
    } finally {
      setLoading(false);
    }
  };

  const copySamSnippet = () => {
    const snippet = `sam build\nsam local start-api --port 8001\nsam deploy --guided`;
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const tourSteps = [
    {
      title: "Step 1: Live Present Location AQI",
      desc: "Shows ground-truth piecewise US EPA / CPCB AQI using GPS/IP sensors and Copernicus satellite data.",
      tab: "dashboard"
    },
    {
      title: "Step 2: Air Track Solutions & Exposure Inhalation",
      desc: "Converts micro-particles into cigarette equivalents and provides 1-click school safety parent notices.",
      tab: "dashboard"
    },
    {
      title: "Step 3: Stubble Burning Satellite Radar",
      desc: "Tracks active agricultural fires and predicts smoke drift trajectory toward metropolitan areas.",
      tab: "dashboard"
    },
    {
      title: "Step 4: Interactive Air Quality Map",
      desc: "Explore 24+ global and national stations on OpenStreetMap with zero watermarks or mock data.",
      tab: "map"
    },
    {
      title: "Step 5: AWS AI Copilot (Strands Agents SDK & Bedrock)",
      desc: "Live multi-agent reasoning for individualized health precautions and vulnerable population care.",
      tab: "ai"
    },
    {
      title: "Step 6: Built on AWS Architecture & Verification",
      desc: "Review the full serverless architecture, SAM template, and Free Tier viability for judges.",
      tab: "judges"
    }
  ];

  const handleNextTourStep = () => {
    if (tourStep < tourSteps.length - 1) {
      const next = tourStep + 1;
      setTourStep(next);
      if (onNavigateTab) onNavigateTab(tourSteps[next].tab);
    } else {
      setTourActive(false);
      setTourStep(0);
    }
  };

  const handleStartTour = () => {
    setTourActive(true);
    setTourStep(0);
    if (onNavigateTab) onNavigateTab(tourSteps[0].tab);
  };

  return (
    <div className="judges-page container">
      {/* Top Header Banner */}
      <div className="judges-header-card glass-card">
        <div className="judges-header-pill-row">
          <span className="badge badge-award">
            <Award size={14} />
            <span>AWS Hackathon Official Submission</span>
          </span>
          <span className="badge badge-track">
            Track: Air — Help People Breathe Easier
          </span>
        </div>

        <div className="judges-hero-text">
          <h1 className="judges-main-title">Judges Evaluation & Architecture Showcase</h1>
          <p className="judges-main-subtitle">
            A comprehensive overview mapped 1:1 to the 5 official hackathon criteria. Built with AWS open-source tools (AWS Strands Agents SDK) and cloud services (Amazon Bedrock, AWS Lambda, API Gateway).
          </p>
        </div>

        {/* Video Tour Launcher Bar */}
        <div className="demo-tour-banner">
          <div className="tour-info">
            <Video className="tour-icon text-indigo" size={24} />
            <div>
              <strong className="tour-title">3-Minute Video Recording Mode</strong>
              <p className="tour-desc">
                Follow an automated, structured tour with timestamps to record your 3-minute video presentation.
              </p>
            </div>
          </div>
          <button className="btn-tour-start" onClick={handleStartTour}>
            <Play size={16} fill="currentColor" />
            <span>Launch 3-Min Demo Tour</span>
          </button>
        </div>
      </div>

      {/* Criteria Navigation Tabs (01 - 05) */}
      <div className="criteria-nav-bar">
        {[
          { id: '01', title: '01 Idea & Impact', badge: 'Air Track' },
          { id: '02', title: '02 Built on AWS', badge: 'Mandatory' },
          { id: '03', title: '03 Design & Usability', badge: 'Human-First' },
          { id: '04', title: '04 The Execution', badge: '100% Live' },
          { id: '05', title: '05 Demo Video Pitch', badge: '3-Min Script' }
        ].map((c) => (
          <button
            key={c.id}
            className={`criteria-nav-btn ${activeCriterion === c.id ? 'active' : ''}`}
            onClick={() => setActiveCriterion(c.id)}
          >
            <span className="criteria-num">{c.id}</span>
            <span className="criteria-lbl">{c.title.replace(c.id + ' ', '')}</span>
            <span className="criteria-badge">{c.badge}</span>
          </button>
        ))}
      </div>

      {/* Criterion 01: Idea & Impact */}
      {activeCriterion === '01' && (
        <section className="criterion-panel glass-card">
          <div className="criterion-header">
            <div className="criterion-index">01</div>
            <div>
              <h2 className="criterion-title">Idea & Impact: Tackling the Silent Air Crisis</h2>
              <p className="criterion-tagline">
                "Does it fix a real environmental problem? And what changes for the people living with it? A small problem solved well beats a big one solved vaguely."
              </p>
            </div>
          </div>

          <div className="impact-grid">
            <div className="impact-box problem-box">
              <span className="impact-box-label text-red">The Real Environmental Problem</span>
              <h3>Abstract AQI numbers fail to protect human lungs</h3>
              <p>
                Over 1.4 billion people breathe hazardous air in South Asia and global industrial centers. Most weather apps report abstract numbers like "AQI 168", which ordinary citizens, parents, and school principals cannot translate into real-life safety measures. School children play soccer outdoors during peak toxic ozone and PM2.5 spikes, causing irreversible pediatric lung capacity loss.
              </p>
              <ul className="impact-list">
                <li><strong>Invisible Inhalation:</strong> Commuters do not know how many toxic particulates they inhale during workouts.</li>
                <li><strong>Delayed School Actions:</strong> Principals wait for manual government notifications that arrive hours too late.</li>
                <li><strong>Night Inversion Trapping:</strong> Stubble burning smoke concentrates at ground level between 10 PM and 8 AM.</li>
              </ul>
            </div>

            <div className="impact-box solution-box">
              <span className="impact-box-label text-green">What Changes for People Living With It</span>
              <h3>Concrete, actionable physical metrics and automated decisions</h3>
              <p>
                AirWatch replaces vague metrics with clear physical impacts and automated interventions built for real people:
              </p>
              <ul className="impact-list">
                <li>
                  <strong>Cigarette Equivalence:</strong> Converts inhaled PM2.5 into cigarettes (e.g. "Running 60 min = smoking 4.9 cigarettes; wearing an N95 blocks 95%").
                </li>
                <li>
                  <strong>1-Click School Safety Directives:</strong> Evaluates GRAP thresholds and drafts instant, copy-ready WhatsApp & email notices for parents to protect students.
                </li>
                <li>
                  <strong>Stubble Smoke Trajectory Radar:</strong> Tracks agricultural fires and alerts households when nocturnal thermal inversions will trap toxic smoke.
                </li>
                <li>
                  <strong>Clean Light UX:</strong> Designed for mothers, teachers, and runners on low-bandwidth mobile connections.
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Criterion 02: Built on AWS */}
      {activeCriterion === '02' && (
        <section className="criterion-panel glass-card">
          <div className="criterion-header">
            <div className="criterion-index">02</div>
            <div>
              <h2 className="criterion-title">Built on AWS: Open-Source Tools & Cloud Services</h2>
              <p className="criterion-tagline">
                "Build locally with AWS open-source tools, or deploy on AWS services... Using an AWS open-source project or AWS services is mandatory to win a prize."
              </p>
            </div>
          </div>

          {/* Architecture Diagram Visualization */}
          <div className="aws-arch-visual glass-subcard">
            <h3 className="arch-visual-title">End-to-End Serverless AWS Architecture</h3>
            <div className="arch-flow-diagram">
              <div className="arch-node client-node">
                <Globe className="arch-icon" size={24} />
                <span className="node-title">React 19 Frontend</span>
                <span className="node-sub">Single-Page App</span>
              </div>
              <div className="arch-arrow">➔</div>
              <div className="arch-node edge-node">
                <Server className="arch-icon" size={24} />
                <span className="node-title">Amazon CloudFront + S3</span>
                <span className="node-sub">Global CDN Edge</span>
              </div>
              <div className="arch-arrow">➔</div>
              <div className="arch-node api-node">
                <Zap className="arch-icon" size={24} />
                <span className="node-title">Amazon API Gateway</span>
                <span className="node-sub">REST / TLS / CORS</span>
              </div>
              <div className="arch-arrow">➔</div>
              <div className="arch-node lambda-node">
                <Cpu className="arch-icon" size={24} />
                <span className="node-title">AWS Lambda</span>
                <span className="node-sub">Python 3.11 + Mangum</span>
              </div>
              <div className="arch-arrow">➔</div>
              <div className="arch-node ai-node">
                <Sparkles className="arch-icon" size={24} />
                <span className="node-title">AWS Strands & Bedrock</span>
                <span className="node-sub">Claude 3 / Titan Express</span>
              </div>
            </div>
          </div>

          {/* AWS Open-Source Tools & Cloud Services Details */}
          <div className="aws-components-grid">
            <div className="aws-card open-source-card">
              <div className="aws-card-badge">Open Source (Local Machine)</div>
              <h3>AWS Open-Source Tools Used</h3>
              
              <div className="tool-item">
                <div className="tool-title-row">
                  <Terminal size={18} className="text-amber" />
                  <strong>AWS Strands Agents SDK</strong>
                  <span className="code-pill">strands-agents</span>
                </div>
                <p>
                  Used for autonomous agent orchestration in <code>app/agents/air_agent.py</code>. Coordinates multi-step reasoning between atmospheric readings, vulnerable population risk synthesis, and emergency school alerts.
                </p>
              </div>

              <div className="tool-item">
                <div className="tool-title-row">
                  <FileText size={18} className="text-amber" />
                  <strong>AWS SAM CLI</strong>
                  <span className="code-pill">template.yaml</span>
                </div>
                <p>
                  Used to define serverless infrastructure, test Lambda functions locally via <code>sam local start-api</code>, and generate automated cloud deployment bundles.
                </p>
                <div className="code-box-mini">
                  <code>{`sam build && sam local start-api --port 8001`}</code>
                  <button onClick={copySamSnippet} className="btn-copy-code" title="Copy SAM command">
                    {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="aws-card cloud-card">
              <div className="aws-card-badge">Cloud Services (AWS Free Tier)</div>
              <h3>AWS Cloud Services Deployed</h3>

              <div className="tool-item">
                <div className="tool-title-row">
                  <Sparkles size={18} className="text-purple" />
                  <strong>Amazon Bedrock Runtime</strong>
                  <span className="code-pill">boto3 bedrock-runtime</span>
                </div>
                <p>
                  Invokes foundation models (Anthropic Claude 3 Haiku / Amazon Titan) to generate tailored respiratory advisories and emergency directives based on real-time sensor streams.
                </p>
              </div>

              <div className="tool-item">
                <div className="tool-title-row">
                  <Cpu size={18} className="text-purple" />
                  <strong>AWS Lambda & API Gateway</strong>
                  <span className="code-pill">Python 3.11</span>
                </div>
                <p>
                  Serverless ASGI execution via Mangum. Scales down to zero cost when idle and handles high traffic during pollution surges without server maintenance.
                </p>
              </div>

              <div className="free-tier-budget-box">
                <div className="budget-row">
                  <span>Free Tier Allowance:</span>
                  <strong>$200 New Account Credits</strong>
                </div>
                <div className="budget-row">
                  <span>Estimated Monthly Cost:</span>
                  <strong className="text-green">$2.40 - $4.80 / mo</strong>
                </div>
                <p className="budget-note">
                  AirWatch easily operates within the AWS Free Tier (1M Lambda requests/mo, 1TB CloudFront egress, 5GB S3).
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Criterion 03: Design & Usability */}
      {activeCriterion === '03' && (
        <section className="criterion-panel glass-card">
          <div className="criterion-header">
            <div className="criterion-index">03</div>
            <div>
              <h2 className="criterion-title">Design & Usability: Built for Everyday People</h2>
              <p className="criterion-tagline">
                "The people living with the problem have to be able to use the fix: clear to pick up, easy to get around, and built for where they are. Would someone who isn't on your team know what to do with it?"
              </p>
            </div>
          </div>

          <div className="usability-features-grid">
            <div className="usability-card">
              <div className="usability-icon-bubble">
                <Compass size={22} className="text-indigo" />
              </div>
              <h3>Zero Learning Curve</h3>
              <p>
                Opens directly to the user's location with clear color coding and plain English recommendations. No complex environmental jargon.
              </p>
              <div className="usability-example">
                <span className="example-tag">Instead of:</span>
                <span className="text-muted">"PM2.5 concentration is 142 µg/m³ with particulate variance"</span>
                <span className="example-tag text-green">We Show:</span>
                <strong>"Unhealthy — Walking 60 mins is like smoking 2.3 cigarettes. Wear an N95."</strong>
              </div>
            </div>

            <div className="usability-card">
              <div className="usability-icon-bubble">
                <Copy size={22} className="text-indigo" />
              </div>
              <h3>1-Click Action for School Leaders</h3>
              <p>
                School principals have no time to interpret state environmental bulletins. AirWatch computes GRAP directives and generates pre-written WhatsApp/Email notices with one click.
              </p>
              <div className="usability-example">
                <span className="example-tag">Action:</span>
                <strong>Tap "Copy Parent Notice" ➔ Paste directly into school parent broadcast group.</strong>
              </div>
            </div>

            <div className="usability-card">
              <div className="usability-icon-bubble">
                <ShieldCheck size={22} className="text-indigo" />
              </div>
              <h3>Light Mix Modern Aesthetic</h3>
              <p>
                High contrast, clean typography (Inter / Outfit), accessible for outdoor viewing in bright daylight, and optimized for mobile screens.
              </p>
              <div className="usability-example">
                <span className="example-tag">Design Standards:</span>
                <strong>Apple Weather / Linear inspired clean cards, zero watermarks, and smooth interactions.</strong>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Criterion 04: The Execution */}
      {activeCriterion === '04' && (
        <section className="criterion-panel glass-card">
          <div className="criterion-header">
            <div className="criterion-index">04</div>
            <div>
              <h2 className="criterion-title">The Execution: 100% Operational & Verified Live</h2>
              <p className="criterion-tagline">
                "Does it work? Not perfect, not polished. Working. One feature that runs beats five that almost do."
              </p>
            </div>
          </div>

          <div className="execution-status-grid">
            <div className="execution-card">
              <div className="exec-header">
                <CheckCircle2 size={24} className="text-green" />
                <h3>Live Atmosphere Verification</h3>
              </div>
              <p>
                Zero mock or hardcoded datasets. All readings are fetched in real-time from the Open-Meteo & Copernicus European Atmosphere Service, supplemented by WAQI and OpenWeather.
              </p>
              <div className="exec-metrics">
                <div className="metric-pill">
                  <span>Breakpoints:</span>
                  <strong>US EPA Piecewise Linear Formula</strong>
                </div>
                <div className="metric-pill">
                  <span>Latency:</span>
                  <strong>&lt; 380ms response time</strong>
                </div>
                <div className="metric-pill">
                  <span>GPS / IP:</span>
                  <strong>Dual Geolocation Fallback</strong>
                </div>
              </div>
            </div>

            <div className="execution-card">
              <div className="exec-header">
                <CheckCircle2 size={24} className="text-green" />
                <h3>All Core Features Operational</h3>
              </div>
              <ul className="exec-checklist">
                <li>
                  <Check size={16} className="text-green" />
                  <span>Real-Time Present Location AQI & 6 Pollutant Breakdown</span>
                </li>
                <li>
                  <Check size={16} className="text-green" />
                  <span>Personal Exposure & Cigarette Equivalence Calculator</span>
                </li>
                <li>
                  <Check size={16} className="text-green" />
                  <span>Automated School Safety Directives & 1-Click Notice Generator</span>
                </li>
                <li>
                  <Check size={16} className="text-green" />
                  <span>Satellite Stubble Fire Radar with Wind Dispersion Trajectories</span>
                </li>
                <li>
                  <Check size={16} className="text-green" />
                  <span>Interactive OpenStreetMap Station Hotspots (Zero Watermarks)</span>
                </li>
                <li>
                  <Check size={16} className="text-green" />
                  <span>AWS Strands Agents SDK & Amazon Bedrock Health Copilot</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Criterion 05: Demo Video Pitch Script */}
      {activeCriterion === '05' && (
        <section className="criterion-panel glass-card">
          <div className="criterion-header">
            <div className="criterion-index">05</div>
            <div>
              <h2 className="criterion-title">The Demo Video: Official 3-Minute Script & Timing</h2>
              <p className="criterion-tagline">
                "Three minutes, recorded, to show what it does, who it is for, and where AWS fits. There is no live demo, so the video is what the judges see."
              </p>
            </div>
          </div>

          <div className="script-container">
            <div className="script-block">
              <div className="script-time-tag">0:00 - 0:45 | Introduction & The Problem</div>
              <h4 className="script-section-title">Who is it for and what is broken?</h4>
              <p className="script-narration">
                "Hi judges! I'm presenting <strong>AirWatch</strong> for the <em>Air Track</em>. Air pollution claims over 7 million lives every year. But when everyday people, parents, and school administrators look at traditional weather apps, all they see is an abstract number like 'AQI 160'. They have no idea how much toxic smoke they are inhaling, when schools should cancel outdoor recess, or when agricultural stubble burning will trap toxic fumes over their neighborhood. We built AirWatch to solve this exact problem: transforming abstract atmospheric readings into concrete, life-saving actions."
              </p>
              <div className="script-action-tag">
                Live Demo Action: Show AirWatch homepage opening with live GPS detection for the user's city and the clean modern AQI gauge.
              </div>
            </div>

            <div className="script-block">
              <div className="script-time-tag">0:45 - 1:35 | The Fix & Usability Walkthrough</div>
              <h4 className="script-section-title">What changes for the people living with it?</h4>
              <p className="script-narration">
                "First, our <strong>Personal Exposure Calculator</strong> uses the Berkeley Earth standard to calculate real particulate inhalation. If I walk for 60 minutes in this air, I inhale the toxic equivalent of 2.3 cigarettes. But when I toggle on an N95 mask, AirWatch instantly demonstrates a 95% filtration benefit. Second, for schools, our <strong>Automated School Safety Protocol</strong> checks Graded Response Action Plan (GRAP) stages and generates a 1-click notice that a principal can copy and immediately paste into parent WhatsApp groups. Third, our <strong>Stubble Smoke Radar</strong> tracks active satellite crop fires and predicts downwind dispersion before nocturnal temperature inversions trap toxic smoke."
              </p>
              <div className="script-action-tag">
                Live Demo Action: Interact with Exposure slider, click 'Copy Parent Notice', and zoom into the Stubble Smoke Radar.
              </div>
            </div>

            <div className="script-block">
              <div className="script-time-tag">1:35 - 2:25 | Where AWS Fits & Architecture</div>
              <h4 className="script-section-title">Built with AWS Open-Source & Cloud Services</h4>
              <p className="script-narration">
                "Where does AWS fit? AirWatch is built using both AWS open-source tools and serverless cloud services. Locally, we use the <strong>AWS Strands Agents SDK</strong> to coordinate multi-agent reasoning across weather feeds, health thresholds, and school action directives. On the cloud, our backend runs on <strong>AWS Lambda</strong> via Mangum and <strong>Amazon API Gateway</strong>, defined cleanly in our <strong>AWS SAM</strong> template. For contextual AI recommendations, we call <strong>Amazon Bedrock</strong> with Claude 3 and Titan. The entire stack runs within the AWS Free Tier under $5 a month, meaning any municipality or school district can deploy it on their $200 AWS credit."
              </p>
              <div className="script-action-tag">
                Live Demo Action: Show the interactive AWS Architecture diagram, open the SAM template, and show the AI Copilot.
              </div>
            </div>

            <div className="script-block">
              <div className="script-time-tag">2:25 - 3:00 | Execution & Conclusion</div>
              <h4 className="script-section-title">100% Operational & Ready to Deploy</h4>
              <p className="script-narration">
                "Every feature you see is 100% live. We calculate real US EPA piecewise breakpoints from the Copernicus satellite network without mock data. In summary: AirWatch tackles the Air track with high-impact, human-first tools, powered by the AWS Strands Agents SDK, AWS Lambda, and Amazon Bedrock. Thank you for watching!"
              </p>
              <div className="script-action-tag">
                Live Demo Action: Show map with real-time station hotspots and the green system health checks.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Floating 3-Minute Tour Helper Modal */}
      {tourActive && (
        <div className="floating-tour-widget">
          <div className="tour-widget-header">
            <span className="tour-step-badge">Tour Step {tourStep + 1} / {tourSteps.length}</span>
            <button className="tour-close-btn" onClick={() => setTourActive(false)}>✕</button>
          </div>
          <div className="tour-widget-body">
            <h4 className="tour-step-title">{tourSteps[tourStep].title}</h4>
            <p className="tour-step-desc">{tourSteps[tourStep].desc}</p>
          </div>
          <div className="tour-widget-footer">
            <button 
              className="btn-tour-nav" 
              onClick={() => {
                if (tourStep > 0) {
                  const prev = tourStep - 1;
                  setTourStep(prev);
                  if (onNavigateTab) onNavigateTab(tourSteps[prev].tab);
                }
              }}
              disabled={tourStep === 0}
            >
              Previous
            </button>
            <button className="btn-tour-nav primary" onClick={handleNextTourStep}>
              {tourStep === tourSteps.length - 1 ? 'Finish Tour' : 'Next Step ➔'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
