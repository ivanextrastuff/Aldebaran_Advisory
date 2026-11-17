import { useMemo, useState } from 'react'
import {
  ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, Building2,
  Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, ClipboardCheck,
  CloudSun, Download, Flame,   Globe2, HardHat, Layers3, Leaf,
  Handshake, LockKeyhole, MapPin, Menu, MoreHorizontal, PackageCheck, Plus, Presentation,
  Recycle, Ruler, ShieldCheck, Sparkles, Wind, X, Zap,
} from 'lucide-react'

const roles = ['Architect / Engineer', 'Contractor / Installer', 'Distributor (STARK / Bygma)', 'Homeowner / Developer']
const roleDetails = {
  'Architect / Engineer': { hello: 'Design with confidence.', action: 'Explore specifications', href: '#specifier', icon: Building2, tag: 'DESIGN PARTNER' },
  'Contractor / Installer': { hello: 'Ready for the next build.', action: 'Open site toolkit', href: '#projects', icon: HardHat, tag: 'SITE PARTNER' },
  'Distributor (STARK / Bygma)': { hello: 'The right product. Right on time.', action: 'Check product range', href: '#specifier', icon: PackageCheck, tag: 'DISTRIBUTION PARTNER' },
  'Homeowner / Developer': { hello: 'Make your next move count.', action: 'Estimate your project', href: '#estimator', icon: CloudSun, tag: 'BUILDING OWNER' },
}
const buildingTypes = ['Non-Residential Renovation', 'Single-Family Home', 'Multi-Residential New Build', 'Commercial New Build']
const applications = ['External Wall', 'Sloped Roof', 'Partition Wall']
const priorities = ['Euroclass A1 Fire Safety', 'Acoustic Comfort', 'BR18 Climate Compliance']
const products = {
  'External Wall': { name: 'ROCKWOOL REDAir™  FLEX', type: 'VENTILATED FACADE SYSTEM', lambda: '0.034', thickness: '200', note: 'Designed for ventilated facade renovations with dependable fire performance.' },
  'Sloped Roof': { name: 'ROCKWOOL Flexibatts®', type: 'ROOF INSULATION', lambda: '0.037', thickness: '250', note: 'Flexible stone wool batts for a snug fit between rafters and lasting comfort.' },
  'Partition Wall': { name: 'ROCKWOOL A-Batts®', type: 'INTERNAL WALL INSULATION', lambda: '0.037', thickness: '95', note: 'Acoustic-first partition solution with non-combustible stone wool at its core.' },
}
const materials = [
  { name: 'Stone wool', color: 'red' },
  { name: 'Glass wool', color: 'grey' },
  { name: 'PIR foam', color: 'sand' },
  { name: 'Bio-based', color: 'green' },
]
const proofPoints = [
  { icon: Flame, eyebrow: 'SAFETY BY NATURE', title: 'Euroclass A1', number: '>1,000°C', copy: 'Non-combustible stone wool helps slow the spread of fire.', color: 'red' },
  { icon: ShieldCheck, eyebrow: 'BUILT TO LAST', title: '65-year proven durability', number: '65 years', copy: 'Copenhagen Airport hangar. Performance that stands the test of time.', color: 'ink' },
  { icon: Leaf, eyebrow: 'MADE TO CIRCULATE', title: 'Rockcycle® circularity', number: '85,000+ t', copy: 'Recycled in Denmark since 2012. Give stone wool a new life.', color: 'green' },
  { icon: MapPin, eyebrow: 'CLOSE TO YOUR PROJECT', title: 'Local Danish production', number: '2 plants', copy: 'Produced at Vamdrup and Øster Doense, close to the people who build.', color: 'sand' },
]
const stages = ['Design', 'Specification', 'Tender', 'Site Delivery']
const initialProjects = [
  { name: 'Nordhavn School', location: 'Copenhagen · Education', stage: 'Design', product: 'Facade · REDAir™', value: '€420k', initials: 'NS', tone: 'lavender' },
  { name: 'Aarhus Harbour Homes', location: 'Aarhus · Residential', stage: 'Specification', product: 'Roof · Flexibatts®', value: '€186k', initials: 'AH', tone: 'blue' },
  { name: 'Frederiksberg Care Centre', location: 'Frederiksberg · Healthcare', stage: 'Tender', product: 'Facade · REDAir™', value: '€315k', initials: 'FC', tone: 'peach', risk: true },
  { name: 'Odense Logistics Hub', location: 'Odense · Industrial', stage: 'Site Delivery', product: 'Roof · Hardrock®', value: '€264k', initials: 'OL', tone: 'mint' },
]

const pitchSlides = [
  { number: '12', label: 'Portal architecture', title: 'The Astral Heading Portal unifies the value chain through role-tailored compliance workflows' },
  { number: '13', label: 'Specification defense', title: 'Real-time substitution alerts and instant material comparisons eliminate post-tender leakage' },
  { number: '14', label: 'Renovation & ecosystem', title: 'Turnkey subsidy calculators capture high-intent residential and commercial renovation triggers', optional: true },
]

function PitchSlides({ slideIndex, setSlideIndex, onExit }) {
  const [controlsVisible, setControlsVisible] = useState(true)
  const slide = pitchSlides[slideIndex]
  const changeSlide = (direction) => setSlideIndex((index) => (index + direction + pitchSlides.length) % pitchSlides.length)

  return (
    <main className={`pitch-mode ${controlsVisible ? '' : 'pitch-clean'}`}>
      {controlsVisible && <header className="pitch-toolbar">
        <button className="pitch-back" onClick={onExit}><ArrowLeft size={15} /> Back to portal</button>
        <div className="pitch-toolbar-center"><span className="pitch-toolbar-label"><Presentation size={14} /> PITCH DECK PREVIEW</span><div className="pitch-tabs">{pitchSlides.map((item, index) => <button key={item.number} className={index === slideIndex ? 'selected' : ''} onClick={() => setSlideIndex(index)}><span>{item.number}</span>{item.label}{item.optional && <i>OPTIONAL</i>}</button>)}</div></div>
        <button className="pitch-focus" onClick={() => setControlsVisible(false)}>Clean screenshot view <ArrowUpRight size={14} /></button>
      </header>}
      <div className="pitch-stage">
        <article className={`pitch-canvas pitch-slide-${slide.number}`} aria-label={`Slide ${slide.number}: ${slide.label}`}>
          <div className="pitch-slide-top">
            <div className="pitch-brand"><span className="pitch-logo"><i /><i /><i /></span><span>ROCKWOOL<small>GROUP</small></span><i className="pitch-brand-divider" /><b>ASTRAL HEADING</b></div>
            <div className="pitch-slide-kicker"><span>DENMARK · GENERAL BUILDING INSULATION</span><b>PROTOTYPE / {slide.number}</b></div>
          </div>
          <div className="pitch-title-row"><div><p className="pitch-overline">DIGITAL VALUE-CHAIN PLATFORM <span>—</span> {slide.number} / 14</p><h1>{slide.title}</h1></div><div className="pitch-page-number">{slide.number}<span>/ 14</span></div></div>

          {slide.number === '12' && <div className="pitch-content pitch-content-12">
            <section className="pitch-portal-panel">
              <div className="pitch-browser-chrome"><div><i /><i /><i /></div><span>portal.rockwool.dk <ShieldCheck size={11} /></span><MoreHorizontal size={15} /></div>
              <div className="pitch-portal-nav"><span className="pitch-mini-brand"><i /> ROCKWOOL <b>·</b> Astral Heading</span><span className="pitch-mini-nav">OVERVIEW　 SMART SPEC　 PROJECTS</span><span className="pitch-mini-avatar">AH</span></div>
              <div className="pitch-portal-body"><div className="pitch-mini-overline"><span className="pitch-live" /> SWITCH STAKEHOLDER VIEW</div><h2>One portal.<br /><em>Every perspective.</em></h2><p>Role-specific tools. One shared project truth.</p>
                <div className="pitch-role-grid">
                  <div className="pitch-role active"><Building2 /><span><b>Architect</b><small>SPECIFY WITH CONFIDENCE</small></span><Check /></div>
                  <div className="pitch-role active"><HardHat /><span><b>Contractor</b><small>BUILD IT RIGHT</small></span><Check /></div>
                  <div className="pitch-role active"><PackageCheck /><span><b>Distributor</b><small>SUPPLY WITH CERTAINTY</small></span><Check /></div>
                  <div className="pitch-role active"><CloudSun /><span><b>Homeowner</b><small>PLAN YOUR RENOVATION</small></span><Check /></div>
                </div>
                <div className="pitch-access-tools"><span><ClipboardCheck /> EPD / LCA LIBRARY</span><span><Flame /> BR18 COMPLIANCE</span><span><HardHat /> INSTALL GUIDES</span><span><Ruler /> RENOVATION ESTIMATOR</span></div>
                <div className="pitch-source-line"><span><LockKeyhole /> ONE SECURE SOURCE OF TRUTH</span><span>LOCAL MOCK DATA · NO BACKEND</span></div>
              </div>
            </section>
            <section className="pitch-workflows">
              <div className="pitch-workflows-head"><div><span className="pitch-overline">ONE PLATFORM, FOUR PURPOSE-BUILT JOURNEYS</span><h2>Right information.<br /><em>Right when it matters.</em></h2></div><span className="pitch-journey-badge">01—04</span></div>
              <article className="pitch-workflow"><span className="pitch-workflow-no">01</span><div><h3>Architect / Specifying Engineer</h3><p>Instant EPD/LCA carbon datasets, Euroclass A1 fire documentation, and historical Danish project libraries. Secures early, named stone wool specifications.</p></div></article>
              <article className="pitch-workflow"><span className="pitch-workflow-no">02</span><div><h3>Contractor / Installer</h3><p>Smart Spec Selector, installation best-practice guides, and pre-filled BR18 compliance packs cut admin friction and help prevent substitution.</p></div></article>
              <article className="pitch-workflow"><span className="pitch-workflow-no">03</span><div><h3>Distributor · STARK / Bygma</h3><p>Cross-product inventory bundling and shared pipeline visibility let counter teams recommend ROCKWOOL and justify value with confidence.</p></div></article>
              <article className="pitch-workflow"><span className="pitch-workflow-no">04</span><div><h3>Homeowner / Developer</h3><p>Clear recommendations, renovation estimates, and compliance guidance turn complex decisions into a confident next step.</p></div></article>
              <div className="pitch-architecture"><span><Layers3 /></span><div><b>LIGHTWEIGHT BY DESIGN</b><p>Modular React SPA · local JSON mock state · zero database infrastructure · immediate, privacy-first deployment.</p></div><span className="pitch-architecture-check"><Check /></span></div>
            </section>
          </div>}

          {slide.number === '13' && <div className="pitch-content pitch-content-13">
            <div className="pitch-product-shot">
              <div className="pitch-window-bar"><span><i /><i /><i /> <b>01</b> SMART SPEC SELECTOR</span><span>PROJECT: FREDERIKSBERG CARE CENTRE <MoreHorizontal /></span></div>
              <div className="pitch-product-ui">
                <div className="pitch-smart-form"><span className="pitch-overline">PROJECT PARAMETERS</span><h2>Specify smarter.</h2><label>BUILDING TYPE<strong><Building2 /> Non-residential renovation <ChevronDown /></strong></label><label>APPLICATION<strong><Layers3 /> External wall <ChevronDown /></strong></label><label>PROJECT PRIORITY<strong><Flame /> Euroclass A1 Fire Safety <ChevronDown /></strong></label><div className="pitch-smart-recommend"><Check /><span><b>ROCKWOOL REDAir™ FLEX</b><small>A1 · λ 0.034 W/mK · 200 mm</small></span></div></div>
                <div className="pitch-compare"><span className="pitch-overline">MATERIAL COMPARISON · INDICATIVE SCORE</span><h3>Performance beyond the spec.</h3><div className="pitch-chart-legend"><span><i className="pitch-red-dot" />STONE WOOL</span><span><i />GLASS WOOL</span><span><i />PIR FOAM</span><span><i />BIO-BASED</span></div>
                  {[['Fire & A1', [98, 91, 28, 42]], ['Circularity', [84, 55, 24, 88]], ['Durability', [94, 70, 56, 49]], ['Acoustic', [91, 82, 35, 57]]].map(([label, scores]) => <div className="pitch-chart-row" key={label}><span>{label}</span><div>{scores.map((score, index) => <i className={index === 0 ? 'primary' : ''} key={index} style={{ width: `${score}%` }} />)}</div><b>{scores[0]}</b></div>)}
                  <div className="pitch-proof-chips"><span><Flame /> A1 · NON-COMBUSTIBLE</span><span><ShieldCheck /> 65-YEAR DURABILITY</span><span><Recycle /> ROCKCYCLE®</span></div>
                </div>
              </div>
              <div className="pitch-defense-foot"><span><ClipboardCheck /> EPD + LCA + BR18 TECHNICAL DEFENSE PACK</span><b><Download /> DEPLOY IN 1 CLICK</b></div>
            </div>
            <div className="pitch-pipeline-shot">
              <div className="pitch-window-bar"><span><i /><i /><i /> <b>02</b> SPEC-TO-SITE PIPELINE</span><span>VALUE PROTECTION <BadgeCheck /></span></div>
              <div className="pitch-kanban-mini">{['Design', 'Specification', 'Tender', 'Site delivery'].map((stage, index) => <div className="pitch-kanban-col" key={stage}><span><i className={`pitch-stage-dot stage-dot-${index}`} />{stage}<b>0{index === 0 || index === 3 ? 1 : index === 1 ? 2 : 1}</b></span>
                {index === 2 && <div className="pitch-risk-pill"><Zap /> SUBSTITUTION RISK ALERT</div>}
                <div className={`pitch-mini-project mini-project-${index}`}><small>{index === 2 ? 'FREDERIKSBERG' : ['NORDHAVN SCHOOL', 'AARHUS HARBOUR', '', 'ODENSE LOGISTICS'][index]}</small><b>{index === 2 ? 'Care Centre' : ['School', 'Homes', '', 'Hub'][index]}</b><span>{index === 2 ? 'Tender review required' : 'ROCKWOOL · STONE WOOL'}</span><i><Check /> SPEC PROTECTED</i></div>
                {index === 2 && <div className="pitch-kanban-alert"><span><Zap /> DETECTED AT TENDER</span><p>Alternative material proposed. A1 / EPD pack ready to defend the spec.</p><b><ShieldCheck /> DEPLOY TECHNICAL DEFENSE</b></div>}
              </div>)}</div>
            </div>
            <div className="pitch-thesis-row"><div><span>THE ANTI-LEAKAGE GUARDRAIL</span><p>Named stone wool specification travels with each project across <b>Design → Specification → Tender → Site Delivery</b>.</p></div><div><span>AUTOMATED SUBSTITUTION RESPONSE</span><p>At tender, flag alternative materials and give sales teams a <b>1-click EPD / LCA / BR18 defense pack</b> before contracts are signed.</p></div><div className="pitch-thesis-proof"><Flame /><b>A1</b><span>NON-COMBUSTIBLE<br />BY NATURE</span></div></div>
          </div>}

          {slide.number === '14' && <div className="pitch-content pitch-content-14">
            <section className="pitch-grant-shot"><div className="pitch-window-bar"><span><i /><i /><i /> <b>LIVE DEMO</b> · RENOVATION ESTIMATOR</span><span>DENMARK <MapPin /></span></div>
              <div className="pitch-grant-body"><div className="pitch-grant-heading"><span className="pitch-grant-icon"><Ruler /></span><div><span className="pitch-overline">PROPERTY RENOVATION · MOCK CALCULATOR</span><h2>Make the numbers<br />work for you.</h2></div></div>
                <label className="pitch-grant-label">BUILDING FLOOR AREA <span><b>180</b> m²</span></label><div className="pitch-slider"><i /></div><div className="pitch-slider-ends"><span>50 m²</span><span>500 m²</span></div>
                <label className="pitch-grant-label">BUILDING AGE</label><div className="pitch-age-picker"><span className="selected">Before 1980</span><span>1980–1999</span><span>2000+</span></div>
                <div className="pitch-grant-result"><span>INDICATIVE RENOVATION SUPPORT<small>Energy &amp; fire-safety improvements</small></span><b>€7,560</b></div>
                <button className="pitch-grant-button">GENERATE PRE-FILLED APPLICATION <ArrowRight /></button><small className="pitch-demo-note">ILLUSTRATIVE DEMO RATE · NOT AN OFFICIAL GRANT OFFER</small>
              </div>
            </section>
            <section className="pitch-ecosystem">
              <div className="pitch-workflows-head"><div><span className="pitch-overline">03 — RENOVATION &amp; CIRCULARITY ECOSYSTEM</span><h2>Turn interest into<br /><em>renovation action.</em></h2></div><span className="pitch-journey-badge">EPBD</span></div>
              <article className="pitch-ecosystem-card"><span className="pitch-ecosystem-icon"><Zap /></span><div><b>01 / SUBSIDY CALCULATOR</b><p>Building age + floor area turn Danish energy renovation incentives into a clear, low-friction next step for owners.</p></div></article>
              <article className="pitch-ecosystem-card"><span className="pitch-ecosystem-icon muted"><Handshake /></span><div><b>02 / RECIPROCAL ADVISORY NETWORK</b><p>Independent lawyers, estate agents &amp; mortgage advisors share free compliance tools in return for qualified renovation leads.</p></div></article>
              <article className="pitch-ecosystem-card"><span className="pitch-ecosystem-icon green"><Recycle /></span><div><b>03 / ROCKCYCLE® TRACKING</b><p>Verified circularity certificates report tonnes diverted from landfill—evidence commercial developers can put to work in ESG reporting.</p></div></article>
              <div className="pitch-circularity-card"><span><Recycle /></span><div><b>85,000+ TONNES</b><small>RECYCLED IN DENMARK SINCE 2012</small></div><span className="pitch-circularity-status"><Check /> CERTIFIED IMPACT</span></div>
            </section>
            <div className="pitch-slide14-foot"><span><ShieldCheck /> PRIVACY-FIRST · FRONTEND-ONLY PROTOTYPE</span><span>Funding eligibility and rates are illustrative; confirm current terms with the relevant Danish authority.</span></div>
          </div>}

          <div className="pitch-footer"><span>ASTRAL HEADING <i /> BUILT FOR THE DANISH VALUE CHAIN</span><span>ROCKWOOL® <b>·</b> BETTER BY NATURE</span></div>
        </article>
      </div>
      {controlsVisible ? <div className="pitch-bottom-bar"><button onClick={() => changeSlide(-1)}><ChevronLeft /> PREVIOUS</button><span>SLIDE {slide.number} <i /> 03 OF 03</span><button onClick={() => changeSlide(1)}>NEXT <ChevronRight /></button></div>
        : <button className="pitch-show-controls" onClick={() => setControlsVisible(true)}><Presentation /> SHOW SLIDE CONTROLS</button>}
    </main>
  )
}

function App() {
  const [role, setRole] = useState(roles[0])
  const [building, setBuilding] = useState(buildingTypes[0])
  const [application, setApplication] = useState(applications[0])
  const [priority, setPriority] = useState(priorities[0])
  const [comparedMaterial, setComparedMaterial] = useState('Stone wool')
  const [area, setArea] = useState(180)
  const [age, setAge] = useState('Before 1980')
  const [toast, setToast] = useState('')
  const [modal, setModal] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [projects, setProjects] = useState(initialProjects)
  const [activeStage, setActiveStage] = useState('All projects')
  const [activePitchSlide, setActivePitchSlide] = useState(null)
  const roleInfo = roleDetails[role]
  const product = products[application]
  const grant = useMemo(() => Math.round(Math.max(0, Math.min(20000, Number(area) || 0)) * (age === 'Before 1980' ? 42 : age === '1980–1999' ? 31 : 18) / 10) * 10, [area, age])
  const visibleProjects = activeStage === 'All projects' ? projects : projects.filter((project) => project.stage === activeStage)
  const activeMaterialIndex = materials.findIndex((material) => material.name === comparedMaterial)
  const comparisonRows = [
    { label: 'Fire performance', values: [98, 91, 28, 42] },
    { label: 'Circularity', values: [84, 55, 24, 88] },
    { label: 'Durability', values: [94, 70, 56, 49] },
    { label: 'Acoustic comfort', values: [91, 82, 35, 57] },
  ]
  const priorityMetric = priority === priorities[0] ? 'Fire performance' : priority === priorities[1] ? 'Acoustic comfort' : 'Circularity'
  const orderedComparisonRows = [
    ...comparisonRows.filter((row) => row.label === priorityMetric),
    ...comparisonRows.filter((row) => row.label !== priorityMetric),
  ]

  function notify(message) {
    setToast(message)
    window.clearTimeout(window.toastTimer)
    window.toastTimer = window.setTimeout(() => setToast(''), 3000)
  }
  function moveProject(name, direction) {
    setProjects((current) => current.map((project) => {
      if (project.name !== name) return project
      const currentIndex = stages.indexOf(project.stage)
      const next = stages[Math.min(stages.length - 1, Math.max(0, currentIndex + direction))]
      return { ...project, stage: next, risk: false }
    }))
    notify('Project stage updated')
  }
  const RoleIcon = roleInfo.icon

  if (activePitchSlide !== null) {
    return <PitchSlides slideIndex={activePitchSlide} setSlideIndex={setActivePitchSlide} onExit={() => setActivePitchSlide(null)} />
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#overview" aria-label="Astral Heading home">
          <span className="brand-mark"><span /><span /><span /></span>
          <span className="brand-name">ROCKWOOL<span className="brand-dot">®</span><small>GROUP</small></span>
          <span className="brand-divider" />
          <span className="product-name">Astral Heading</span>
        </a>
        <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu"><Menu size={19} /></button>
        <nav className={`main-nav ${mobileMenu ? 'nav-open' : ''}`}>
          <a className="nav-link active" href="#overview" onClick={() => setMobileMenu(false)}>Overview</a>
          <a className="nav-link" href="#specifier" onClick={() => setMobileMenu(false)}>Smart spec</a>
          <a className="nav-link" href="#evidence" onClick={() => setMobileMenu(false)}>Our impact</a>
          <a className="nav-link" href="#projects" onClick={() => setMobileMenu(false)}>Project tracker</a>
          <button className="nav-link pitch-entry" onClick={() => setActivePitchSlide(0)}><Presentation size={13} /> Pitch slides</button>
        </nav>
        <div className="top-actions">
          <span className="role-label">SWITCH STAKEHOLDER VIEW</span>
          <label className="role-select-wrap">
            <RoleIcon size={15} />
            <select value={role} onChange={(event) => setRole(event.target.value)} aria-label="Switch stakeholder view">
              {roles.map((item) => <option key={item}>{item}</option>)}
            </select>
            <ChevronDown size={14} className="role-chevron" />
          </label>
          <button className="avatar" aria-label="Profile">AH</button>
        </div>
      </header>

      <main id="overview">
        <section className="hero">
          <div className="hero-main">
            <div className="hero-topline"><span className="live-dot" /> DENMARK · GENERAL BUILDING INSULATION <span className="hero-season">2025 / 26</span></div>
            <div className="hero-copy">
              <p className="eyebrow">{roleInfo.tag} <span>—</span> YOUR PROJECT DESK</p>
              <h1>{roleInfo.hello.split(' ').slice(0, -1).join(' ')} <em>{roleInfo.hello.split(' ').slice(-1)}</em></h1>
              <p className="hero-description">A better built environment starts with a better material choice. Find the right solution for your next Danish project.</p>
              <a className="button button-light" href={roleInfo.href}>{roleInfo.action}<ArrowRight size={16} /></a>
            </div>
            <div className="hero-foot"><span>01 / 04</span><span className="hero-progress"><i /></span><span>BETTER BY NATURE</span></div>
          </div>
          <aside className="hero-aside">
            <div className="aside-head"><span>THE BUILT ENVIRONMENT, REIMAGINED</span><ArrowUpRight size={16} /></div>
            <div className="hero-art">
              <div className="art-sun" />
              <div className="art-building art-back"><span /><span /><span /></div>
              <div className="art-building art-front"><span /><span /><span /><span /></div>
              <div className="art-ground" />
              <div className="art-caption"><span>01</span><span>DESIGNED FOR<br />GENERATIONS</span></div>
            </div>
            <div className="aside-foot"><span>STONE WOOL. ENDLESS POSSIBILITIES.</span><span>DK <ArrowUpRight size={12} /></span></div>
          </aside>
        </section>

        <section className="metrics-strip" aria-label="ROCKWOOL at a glance">
          <div className="metric-intro"><span className="eyebrow">MATERIAL MATTERS</span><b>Built on proof.<br />Made for what’s next.</b></div>
          <div className="metric"><span className="metric-icon"><Flame size={16} /></span><b>1,000<span>°C+</span></b><small>NON-COMBUSTIBLE</small></div>
          <div className="metric"><span className="metric-icon green"><Leaf size={16} /></span><b>85<span>k+</span></b><small>TONNES RECYCLED IN DK</small></div>
          <div className="metric"><span className="metric-icon sand"><Globe2 size={16} /></span><b>65<span>yrs</span></b><small>PROVEN DURABILITY</small></div>
          <a className="metric-link" href="#evidence">Explore our impact <ArrowUpRight size={15} /></a>
        </section>

        <section className="section spec-section" id="specifier">
          <div className="section-heading">
            <div><p className="eyebrow">01 — SPECIFY WITH CONFIDENCE</p><h2>One smart choice.<br /><em>More certainty.</em></h2></div>
            <p className="section-intro">Tell us what you’re building. We’ll find the stone wool solution that works harder for your project, your budget, and the next generation.</p>
          </div>
          <div className="spec-layout">
            <div className="spec-form">
              <div className="form-top"><span className="form-step">01</span><div><b>Project parameters</b><small>Tailored to your Danish project</small></div><Sparkles size={17} /></div>
              <label className="field-label">BUILDING TYPE
                <span className="select-box"><Building2 size={16} /><select value={building} onChange={(event) => setBuilding(event.target.value)}>{buildingTypes.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={15} /></span>
              </label>
              <label className="field-label">APPLICATION
                <span className="select-box"><Layers3 size={16} /><select value={application} onChange={(event) => setApplication(event.target.value)}>{applications.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={15} /></span>
              </label>
              <label className="field-label">PROJECT PRIORITY
                <span className="select-box"><Zap size={16} /><select value={priority} onChange={(event) => setPriority(event.target.value)}>{priorities.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={15} /></span>
              </label>
              <div className="form-foot"><span><BadgeCheck size={14} /> BR18-aligned guidance</span><span>STEP 1 OF 1</span></div>
            </div>
            <article className="recommendation-card">
              <div className="recommendation-head"><span className="rec-pill"><span /> YOUR RECOMMENDATION</span><button aria-label="More options" className="icon-button" onClick={() => notify('Recommendation saved to your project desk')}><MoreHorizontal size={19} /></button></div>
              <div className="product-block">
                <div className="product-art"><div className="product-swatch"><span /><span /><span /><span /><span /></div><span className="product-art-mark">RW<br /><small>STONE<br />WOOL</small></span></div>
                <div className="product-info"><span className="product-type">{product.type}</span><h3>{product.name}</h3><p>{product.note} Recommended for {building.toLowerCase()}.</p><div className="product-tags"><span><Flame size={12} /> EUROCLASS A1</span><span><Check size={12} /> EPD VERIFIED</span></div></div>
              </div>
              <div className="spec-data">
                <div><small>THERMAL CONDUCTIVITY</small><b>λ <span>{product.lambda}</span> W/mK</b></div>
                <div><small>REFERENCE THICKNESS</small><b>{product.thickness} <span>mm</span></b></div>
                <div><small>PRIORITY MATCH</small><b className="match-value"><Check size={13} /> {priority === priorities[0] ? 'A1 fire safety' : priority === priorities[1] ? 'Acoustic comfort' : 'BR18 climate'}</b></div>
              </div>
              <div className="rec-actions"><button className="button button-red" onClick={() => notify('Compliance pack downloaded')}><Download size={15} /> Download BR18 &amp; EPD compliance pack</button><button className="text-button" onClick={() => notify('Full technical data sheet opened')}>Technical data sheet <ArrowUpRight size={14} /></button></div>
            </article>
          </div>
          <div className="comparison">
            <div className="comparison-copy"><span className="eyebrow">MATERIAL COMPARISON</span><h3>Performance that<br />goes beyond the spec.</h3><p>Compare the factors that shape a better building. Higher is better.</p>            <div className="chart-legend">{materials.map((material) => <button key={material.name} className={comparedMaterial === material.name ? 'active-material' : ''} onClick={() => setComparedMaterial(material.name)} aria-pressed={comparedMaterial === material.name}><i className={`legend-dot ${material.color}`} />{material.name}</button>)}</div></div>
            <div className="bar-chart" role="img" aria-label="Material comparison chart across fire performance, circularity, durability and acoustic performance">
              {orderedComparisonRows.map((row) => <div className={`chart-row ${row.label === priorityMetric ? 'priority-row' : ''}`} key={row.label}><span className="chart-label">{row.label}</span><div className="bars">{row.values.map((value, index) => <span key={materials[index].name} className={`bar ${materials[index].color} ${activeMaterialIndex === index ? 'bar-selected' : 'bar-muted'}`} style={{ width: `${value}%` }} title={`${materials[index].name}: ${value}`} />)}</div><span className="chart-score">{row.values[activeMaterialIndex]}</span></div>)}
              <div className="chart-scale"><span>LOWER</span><span>RELATIVE PERFORMANCE</span><span>HIGHER</span></div>
            </div>
            <div className="comparison-note"><span>i</span> Indicative comparison based on common product characteristics. Always verify specific product EPDs and technical data for your project.</div>
          </div>
        </section>

        <section className="impact-section" id="evidence">
          <div className="section impact-heading"><div><p className="eyebrow">02 — EVIDENCE THAT ENDURES</p><h2>Stone wool.<br /><em>Strong by nature.</em></h2></div><a className="outline-button" href="#projects">See how it performs <ArrowUpRight size={14} /></a></div>
          <div className="proof-grid">{proofPoints.map((point, index) => {
            const Icon = point.icon
            return <article className={`proof-card proof-${point.color}`} key={point.title}><div className="proof-card-top"><span className="proof-icon"><Icon size={18} /></span><span>0{index + 1}</span></div><p className="eyebrow">{point.eyebrow}</p><h3>{point.title}</h3><b className="proof-number">{point.number}</b><p className="proof-copy">{point.copy}</p><ArrowUpRight className="proof-arrow" size={16} /></article>
          })}</div>
          <div className="proof-foot"><span><BadgeCheck size={15} /> VERIFIED MATERIAL ADVANTAGES</span><span>DATA SOURCES: ROCKWOOL GROUP · ROCKCYCLE DK · COPENHAGEN AIRPORT</span></div>
        </section>

        <section className="section estimator-section" id="estimator">
          <div className="estimator-copy"><p className="eyebrow">03 — MAKE RENOVATION ADD UP</p><h2>Better buildings.<br /><em>Within reach.</em></h2><p>Explore a directional estimate for energy and fire-safety improvements. Every project is unique; final eligibility is subject to the applicable Danish scheme.</p><div className="estimate-note"><CircleHelp size={15} /> Indicative estimate only — not a funding guarantee.</div></div>
          <div className="estimator-card">
            <div className="estimator-card-top"><div><span className="eyebrow">RENOVATION ESTIMATOR</span><h3>Your project, at a glance.</h3></div><span className="estimator-icon"><Ruler size={18} /></span></div>
            <div className="estimator-inputs">
              <label className="field-label">FLOOR AREA
                <span className="input-box"><input type="number" min="0" max="20000" value={area} onChange={(event) => setArea(event.target.value)} /><span>m²</span></span>
              </label>
              <label className="field-label">BUILDING AGE
                <span className="select-box"><Building2 size={15} /><select value={age} onChange={(event) => setAge(event.target.value)}><option>Before 1980</option><option>1980–1999</option><option>2000 or later</option></select><ChevronDown size={14} /></span>
              </label>
            </div>
            <div className="estimate-result"><div><span>INDICATIVE RENOVATION SUPPORT</span><small>Energy &amp; fire-safety improvements</small></div><b>€{grant.toLocaleString('en-DK')}</b></div>
            <button className="button button-red full-button" onClick={() => setModal(true)}>Generate pre-filled application <ArrowRight size={15} /></button>
            <div className="estimator-meta"><span><ShieldCheck size={13} /> PRIVACY-FIRST ESTIMATE</span><span>BASED ON MOCK PROGRAMME RATES</span></div>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section project-heading">
            <div><p className="eyebrow">04 — FROM SPEC TO SITE</p><h2>Keep good specs<br /><em>moving forward.</em></h2></div>
            <div className="project-heading-right"><p>One view of the value chain, from first drawing to site delivery. Keep performance in the brief, all the way to handover.</p><button className="button button-dark" onClick={() => notify('Technical defense pack deployed to project team')}><ClipboardCheck size={15} /> Deploy technical defense pack</button></div>
          </div>
          <div className="pipeline-toolbar"><div className="pipeline-title"><span className="live-dot" /> LIVE PROJECT PIPELINE <span className="pipeline-count">04</span></div><div className="pipeline-filters">{['All projects', ...stages].map((stage) => <button key={stage} className={activeStage === stage ? 'selected' : ''} onClick={() => setActiveStage(stage)}>{stage}</button>)}</div><button className="icon-button add-project" onClick={() => notify('New project workspace created')}><Plus size={16} /> Add project</button></div>
          <div className="kanban">
            {stages.map((stage, index) => {
              const stageProjects = visibleProjects.filter((project) => project.stage === stage)
              return <div className="kanban-column" key={stage}><div className="kanban-col-head"><span><i className={`stage-indicator stage-${index}`} />{stage}</span><small>{stageProjects.length.toString().padStart(2, '0')}</small><button aria-label={`Add to ${stage}`} onClick={() => notify(`New ${stage.toLowerCase()} project started`)}><Plus size={15} /></button></div><div className="project-cards">{stageProjects.length ? stageProjects.map((project) => <article className="project-card" key={project.name}>
                {project.risk && <div className="risk-alert"><span><Zap size={12} /> VALUE-ENGINEERING RISK</span><button aria-label="Dismiss substitution risk" onClick={() => setProjects((items) => items.map((item) => item.name === project.name ? { ...item, risk: false } : item))}><X size={13} /></button></div>}
                <div className="project-card-top"><span className={`project-avatar ${project.tone}`}>{project.initials}</span><button className="icon-button" aria-label={`More about ${project.name}`} onClick={() => notify(`${project.name} · project details opened`)}><MoreHorizontal size={17} /></button></div><h3>{project.name}</h3><p className="project-location"><MapPin size={12} />{project.location}</p><div className="project-product"><span>{project.product}</span><span>{project.value}</span></div><div className="project-card-foot"><span><span className="project-status" /> ON TRACK</span><div className="stage-move"><button aria-label="Move project earlier" onClick={() => moveProject(project.name, -1)} disabled={index === 0}><ChevronLeft size={14} /></button><button aria-label="Move project forward" onClick={() => moveProject(project.name, 1)} disabled={index === stages.length - 1}><ChevronRight size={14} /></button></div></div>
              </article>) : <div className="empty-stage"><span><Wind size={17} /></span><p>Nothing here just yet.</p><button onClick={() => notify(`New ${stage.toLowerCase()} project started`)}>Add a project <ArrowRight size={12} /></button></div>}</div></div>
            })}
          </div>
          <div className="tracker-foot"><span><span className="project-status" /> ALL PROJECTS UP TO DATE</span><span>LAST SYNC · JUST NOW <ArrowDown size={12} /></span></div>
        </section>

        <section className="closing-cta"><div className="cta-mark"><span /><span /><span /></div><p className="eyebrow">BETTER BY NATURE</p><h2>Let’s build a future<br />that <em>stands strong.</em></h2><button className="button button-light" onClick={() => notify('Your ROCKWOOL Denmark team will be in touch')}>Talk to our Denmark team <ArrowUpRight size={15} /></button><span className="cta-orbit orbit-one" /><span className="cta-orbit orbit-two" /></section>
      </main>

      <footer className="footer"><div className="footer-brand"><span className="brand-mark"><span /><span /><span /></span><span>ROCKWOOL GROUP</span></div><span>ASTRAL HEADING · DENMARK GENERAL BUILDING INSULATION</span><span>© 2025 ROCKWOOL A/S <span className="footer-sep">·</span> <a href="#overview">BACK TO TOP <ArrowUpRight size={11} /></a></span></footer>

      {toast && <div className="toast" role="status"><span><Check size={15} /></span>{toast}<button onClick={() => setToast('')} aria-label="Dismiss notification"><X size={14} /></button></div>}
      {modal && <div className="modal-backdrop" onClick={() => setModal(false)}><div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setModal(false)} aria-label="Close"><X size={17} /></button><span className="modal-icon"><ClipboardCheck size={22} /></span><p className="eyebrow">YOUR RENOVATION STARTS HERE</p><h2 id="modal-title">A stronger case<br /><em>for your project.</em></h2><p className="modal-description">We’ve prepared a sample application summary based on the details you entered. In a real project, confirm current funding criteria with the relevant Danish authority.</p><div className="modal-summary"><span>PROJECT AREA <b>{Number(area || 0).toLocaleString('en-DK')} m²</b></span><span>BUILDING AGE <b>{age}</b></span><span>INDICATIVE SUPPORT <b>€{grant.toLocaleString('en-DK')}</b></span></div><button className="button button-red full-button" onClick={() => { setModal(false); notify('Pre-filled application generated') }}>Generate sample application <ArrowDownRight size={15} /></button><small className="modal-disclaimer">DEMO ONLY · NO PERSONAL DATA IS STORED</small></div></div>}
    </div>
  )
}

export default App
