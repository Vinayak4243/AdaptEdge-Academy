import React, { useState } from "react";
import {
  ArrowRight, BarChart3, BookOpen, CalendarDays, CheckCircle2, ChevronDown,
  Camera, Clock3, GraduationCap, MapPin, Menu, MessageCircle, PlayCircle,
  Send, ShieldCheck, Sparkles, Users, X, Zap
} from "lucide-react";

const courses = [
  { category: "CA Foundation", title: "CA Foundation Complete Track", duration: "10 months", mode: "Offline + Hybrid", start: "15 Sep 2026", highlights: ["Accounting & Law mastery", "Weekly concept clinics", "2 full revision cycles"] },
  { category: "CA Intermediate", title: "CA Inter Group I — Regular", duration: "8 months", mode: "Offline + Hybrid", start: "22 Sep 2026", highlights: ["Faculty-led problem solving", "Chapterwise test series", "Personal progress reviews"] },
  { category: "CA Intermediate", title: "CA Inter Group II — Regular", duration: "8 months", mode: "Offline + Hybrid", start: "22 Sep 2026", highlights: ["Strategic subject planning", "Case-study practice", "Exam writing workshops"] },
  { category: "Class 11-12 Commerce", title: "Class 12 Commerce Board Excellence", duration: "6 months", mode: "Offline", start: "05 Oct 2026", highlights: ["Accounts, Eco & BST", "Board-pattern mocks", "School-syllabus alignment"] },
  { category: "Fast-Track", title: "CA Foundation Fast-Track Revision", duration: "12 weeks", mode: "Hybrid", start: "01 Nov 2026", highlights: ["High-yield revision", "Daily doubt resolution", "Exam-day strategy"] },
];

const batches = [
  ["CA Foundation Complete", "15 Sep", " C.A Ankita ", "Mon–Sat · 8:00–11:00 AM", "12 seats", "Few Seats Left"],
  ["CA Inter Group I", "22 Sep", "CA Mina Sharma", "Mon–Fri · 4:00–7:00 PM", "18 seats", "Open"],
  ["Class 12 Commerce", "05 Oct", "CA Priya Sarode", "Mon–Sat · 3:30–5:30 PM", "9 seats", "Few Seats Left"],
];

const faqs = [
  ["Can I attend a demo class before enrolling?", "Yes. Book a complimentary demo to experience the faculty, teaching method, and classroom environment before you decide."],
  ["How are doubts handled between classes?", "Students get scheduled 1-on-1 doubt sessions, subject clinics, and a monitored academic-support channel."],
  ["Do you offer hybrid learning?", "Selected CA batches include live classroom access plus structured online revision support. Ask our counsellor for the current batch format."],
];

const FORM_ENDPOINT = "https://formsubmit.co/ajax/admissions@adaptedgeacademy.in";
const blankForm = { name: "", email: "", phone: "", course: "CA Foundation", mode: "Offline", query: "" };

export default function AdaptEdgeAcademy() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [schedule, setSchedule] = useState("Upcoming Batches");
  const [faqOpen, setFaqOpen] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState(blankForm);
  const visibleCourses = filter === "All" ? courses : courses.filter((course) => course.category === filter);
  const goToForm = () => document.getElementById("admissions")?.scrollIntoView({ behavior: "smooth" });
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const submit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          source: "AdaptEdge Academy Website",
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setForm(blankForm);
      setSubmitted(true);
    } catch (error) {
      setSubmitError("We could not send your enquiry right now. Please email admissions@adaptedgeacademy.in directly or contact us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#home" className="flex items-center gap-3" aria-label="AdaptEdge Academy home">
            <img src="./adaptedge-logo.png" alt="AdaptEdge Academy" className="h-12 w-12 rounded-xl object-contain" />
            <span className="text-lg font-extrabold tracking-tight text-slate-900">AdaptEdge <span className="text-blue-600">Academy</span></span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            {[["Courses", "courses"], ["Methodology", "methodology"], ["Results", "results"], ["Batch Schedule", "schedule"], ["Contact", "contact"]].map(([label, id]) => <a key={id} href={`#${id}`} className="transition hover:text-blue-600">{label}</a>)}
            <button onClick={goToForm} className="rounded-xl bg-blue-600 px-5 py-3 text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700">Book Free Demo</button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 text-slate-700 md:hidden" aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden"><div className="flex flex-col gap-3 text-sm font-semibold">{[["Courses", "courses"], ["Methodology", "methodology"], ["Results", "results"], ["Batch Schedule", "schedule"], ["Contact", "contact"]].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}<button onClick={() => { setMenuOpen(false); goToForm(); }} className="rounded-xl bg-blue-600 px-4 py-3 text-white">Book Free Demo</button></div></div>}
      </nav>

      <section id="home" className="relative isolate overflow-hidden bg-slate-950">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_22%,#2563eb55,transparent_27%),radial-gradient(circle_at_17%_78%,#0ea5e933,transparent_25%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.25fr_.75fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-200"><Sparkles size={16} /> Admissions open for Sep–Oct 2026 batches</div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">Build concepts that <span className="text-blue-400">outlast the exam.</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Personal mentorship, disciplined practice, and exam-smart strategy for CA Foundation, CA Inter, and Commerce students determined to perform at their best.</p>
            <div className="mt-9 flex flex-wrap gap-4"><button onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-xl shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-blue-500">Explore Batches <ArrowRight size={18} /></button><a href="mailto:admissions@adaptedgeacademy.in?subject=Syllabus%20Request" className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-6 py-4 font-bold text-white transition hover:border-blue-400 hover:bg-white/5">Download Syllabus</a></div>
          </div>
          <div className="grid content-center gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[["98%", "Pass Rate", ShieldCheck], ["5,000+", "Students Mentored", Users], ["Top", "Rankers Guided", GraduationCap]].map(([value, label, Icon]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"><Icon className="mb-3 text-blue-400" /><div className="text-3xl font-black text-white">{value}</div><div className="mt-1 text-sm font-medium text-slate-300">{label}</div></div>)}
          </div>
        </div>
      </section>

      <section id="courses" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="max-w-2xl"><span className="text-sm font-bold uppercase tracking-widest text-blue-600">Find your right batch</span><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Focused programs. Measurable progress.</h2><p className="mt-4 text-slate-600">Choose a learning track designed around your current level, exam date, and preferred class format.</p></div><div className="mt-8 flex flex-wrap gap-2">{["All", "CA Foundation", "CA Intermediate", "Class 11-12 Commerce", "Fast-Track"].map((tab) => <button key={tab} onClick={() => setFilter(tab)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${filter === tab ? "bg-slate-900 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-blue-300"}`}>{tab}</button>)}</div><div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{visibleCourses.map((course) => <article key={course.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{course.category}</span><h3 className="mt-4 text-xl font-extrabold">{course.title}</h3><div className="mt-4 space-y-2 text-sm text-slate-600"><p className="flex gap-2"><Clock3 size={17} className="text-blue-600" />{course.duration} · {course.mode}</p><p className="flex gap-2"><CalendarDays size={17} className="text-blue-600" />Next batch: {course.start}</p></div><ul className="my-5 space-y-2 border-y border-slate-100 py-4 text-sm text-slate-600">{course.highlights.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-600" />{item}</li>)}</ul><button onClick={goToForm} className="inline-flex items-center gap-2 font-bold text-blue-600 transition group-hover:gap-3">Enquire about this batch <ArrowRight size={17} /></button></article>)}</div></section>

      <section id="methodology" className="bg-slate-900 py-20 text-white"><div className="mx-auto max-w-7xl px-5 lg:px-8"><span className="text-sm font-bold uppercase tracking-widest text-blue-400">The AdaptEdge advantage</span><div className="mt-3 flex flex-col justify-between gap-6 md:flex-row"><h2 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">A system built for clarity, consistency, and confident exam writing.</h2><p className="max-w-md text-slate-300">We turn ambitious goals into a weekly, visible academic plan—not a pile of lectures.</p></div><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{[[MessageCircle,"1-on-1 Doubt Sessions","Individual attention when a concept needs more than a quick answer."],[BookOpen,"Curated Study Material","Exam-aligned notes, practice sets, and revision resources that cut through noise."],[BarChart3,"Weekly Analytics","Mock-test insights that show what to fix before marks are on the line."],[Users,"Expert Faculty","Approachable subject specialists who teach the why, not just the answer."]].map(([Icon,title,copy]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6"><div className="mb-5 inline-flex rounded-xl bg-blue-500/20 p-3 text-blue-300"><Icon size={23}/></div><h3 className="font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p></div>)}</div></div></section>

      <section id="schedule" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="text-sm font-bold uppercase tracking-widest text-blue-600">Plan ahead</span><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Upcoming batch schedule</h2></div><div className="flex rounded-xl bg-slate-100 p-1"><button onClick={() => setSchedule("Upcoming Batches")} className={`rounded-lg px-4 py-2 text-sm font-bold ${schedule === "Upcoming Batches" ? "bg-white shadow-sm" : "text-slate-500"}`}>Upcoming Batches</button><button onClick={() => setSchedule("Fee Guidance")} className={`rounded-lg px-4 py-2 text-sm font-bold ${schedule === "Fee Guidance" ? "bg-white shadow-sm" : "text-slate-500"}`}>Fee Guidance</button></div></div>{schedule === "Upcoming Batches" ? <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr>{["Program","Starts","Faculty","Timing","Availability"].map(h => <th key={h} className="px-6 py-4">{h}</th>)}</tr></thead><tbody>{batches.map(([program,start,faculty,timing,seats,status]) => <tr key={program} className="border-t border-slate-100"><td className="px-6 py-5 font-bold">{program}</td><td className="px-6 py-5">{start}</td><td className="px-6 py-5">{faculty}</td><td className="px-6 py-5">{timing}</td><td className="px-6 py-5"><span className={`rounded-full px-3 py-1 text-xs font-bold ${status === "Few Seats Left" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>{seats} · {status}</span></td></tr>)}</tbody></table></div> : <div className="mt-8 grid gap-5 md:grid-cols-3">{[["Foundation", "Flexible payment plans", "Counselling-based quote"], ["CA Inter", "Group-wise enrolment", "Scholarships for early admission"], ["Commerce", "Transparent course fee", "Sibling benefit available"]].map(([title,copy,sub]) => <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6"><Zap className="text-blue-600"/><h3 className="mt-4 font-extrabold">{title}</h3><p className="mt-2 text-sm text-slate-600">{copy}</p><p className="mt-5 text-sm font-bold text-blue-600">{sub}</p><button onClick={goToForm} className="mt-5 text-sm font-bold underline">Request fee details</button></div>)}</div>}</section>

      <section id="results" className="bg-blue-50 py-20"><div className="mx-auto max-w-7xl px-5 lg:px-8"><span className="text-sm font-bold uppercase tracking-widest text-blue-600">Results that speak</span><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Students and families see the difference.</h2><div className="mt-10 grid gap-6 lg:grid-cols-3">{[["Aarav Mehra","CA Foundation · 302/400","“The weekly analysis made my weak areas impossible to ignore—and much easier to improve.”"],["Riya Patel","Class 12 Commerce · 96.4%","“Accounts finally clicked because every answer was explained from the principle up.”"],["Parent of Ananya S.","CA Inter student","“The mentorship and regular communication brought real structure to her preparation.”"]].map(([name,result,quote]) => <figure key={name} className="rounded-2xl bg-white p-7 shadow-sm"><div className="text-3xl font-black text-blue-600">“</div><blockquote className="mt-2 leading-7 text-slate-700">{quote}</blockquote><figcaption className="mt-6 border-t border-slate-100 pt-4"><div className="font-bold">{name}</div><div className="mt-1 text-sm text-blue-600">{result}</div></figcaption></figure>)}</div></div></section>

      <section id="admissions" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="grid overflow-hidden rounded-3xl bg-slate-950 lg:grid-cols-[.85fr_1.15fr]"><div className="p-8 text-white sm:p-12"><span className="text-sm font-bold uppercase tracking-widest text-blue-400">Start your journey</span><h2 className="mt-4 text-3xl font-black leading-tight">Book your free academic consultation.</h2><p className="mt-5 leading-7 text-slate-300">Tell us where you are now. Our counsellor will help you identify the right batch, study plan, and next step.</p><div className="mt-9 space-y-4 text-sm"><p className="flex items-center gap-3"><CheckCircle2 className="text-blue-400" size={19}/>No-pressure guidance</p><p className="flex items-center gap-3"><CheckCircle2 className="text-blue-400" size={19}/>Batch and fee details</p><p className="flex items-center gap-3"><CheckCircle2 className="text-blue-400" size={19}/>Demo-class booking</p></div></div><div className="bg-white p-8 sm:p-12">{submitted ? <div className="flex min-h-96 flex-col items-center justify-center text-center"><div className="rounded-full bg-emerald-100 p-4 text-emerald-600"><CheckCircle2 size={42}/></div><h3 className="mt-6 text-2xl font-black">Application Submitted Successfully!</h3><p className="mt-3 max-w-sm text-slate-600">Thank you, {form.name || "future achiever"}. Our admissions team will be in touch shortly.</p><button onClick={() => setSubmitted(false)} className="mt-7 font-bold text-blue-600">Submit another enquiry</button></div> : <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2"><label className="sm:col-span-2 text-sm font-bold">Full Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-1.5 w-full rounded-xl border-slate-200 px-4 py-3 focus:border-blue-500 focus:ring-blue-500" placeholder="Your name"/></label><label className="text-sm font-bold">Email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="mt-1.5 w-full rounded-xl border-slate-200 px-4 py-3" placeholder="you@example.com"/></label><label className="text-sm font-bold">Phone Number<input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="mt-1.5 w-full rounded-xl border-slate-200 px-4 py-3" placeholder="+91"/></label><label className="text-sm font-bold">Target Course<select value={form.course} onChange={e=>setForm({...form,course:e.target.value})} className="mt-1.5 w-full rounded-xl border-slate-200 px-4 py-3"><option>CA Foundation</option><option>CA Intermediate</option><option>Class 11-12 Commerce</option><option>Fast-Track</option></select></label><label className="text-sm font-bold">Preferred Mode<select value={form.mode} onChange={e=>setForm({...form,mode:e.target.value})} className="mt-1.5 w-full rounded-xl border-slate-200 px-4 py-3"><option>Offline</option><option>Online</option><option>Hybrid</option></select></label><label className="sm:col-span-2 text-sm font-bold">How can we help?<textarea value={form.query} onChange={e=>setForm({...form,query:e.target.value})} className="mt-1.5 min-h-24 w-full rounded-xl border-slate-200 px-4 py-3" placeholder="Tell us your target exam or question..."/></label><button className="sm:col-span-2 rounded-xl bg-blue-600 px-5 py-4 font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700">Request a Free Demo</button></form>}</div></div></section>

      <section className="border-t border-slate-200 bg-white py-16"><div className="mx-auto max-w-4xl px-5"><h2 className="text-center text-2xl font-black">Questions before you enrol?</h2><div className="mt-7 divide-y divide-slate-200 rounded-2xl border border-slate-200">{faqs.map(([question, answer],i) => <div key={question}><button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-bold">{question}<ChevronDown className={`shrink-0 transition ${faqOpen === i ? "rotate-180" : ""}`}/></button>{faqOpen === i && <p className="px-5 pb-5 leading-7 text-slate-600">{answer}</p>}</div>)}</div></div></section>

      <section className="bg-slate-50 py-20"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="max-w-2xl"><span className="text-sm font-bold uppercase tracking-widest text-blue-600">Keep learning beyond class</span><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Level up your prep with AdaptEdge.</h2><p className="mt-4 leading-7 text-slate-600">Get daily practice, complete study resources, in-depth lectures, and official exam updates on the platform that fits your routine.</p></div><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{[[MessageCircle,"WhatsApp Channel","Daily quizzes, bite-sized revision notes, and instant updates.","https://whatsapp.com/channel/0029Vb7zMxx8kyyHrmlaoI0q","Join WhatsApp"],[Send,"Telegram Channel","Download comprehensive study notes and access full video lectures.","https://t.me/+fZJqsFrZQJFlMGVl","Open Telegram"],[PlayCircle,"YouTube Channel","In-depth concept lectures for CA, Class 11, and Class 12 students.","https://www.youtube.com/@minasharma9832","Subscribe on YouTube"],[Camera,"Instagram Profile","Educational reels, study tips, and official ICAI exam notifications.","https://www.instagram.com/adaptedgeacademy?igsh=ZjN6cHB0aTVtaXYy","Follow on Instagram"]].map(([Icon,title,copy,url,cta]) => <a key={title} href={url} target="_blank" rel="noreferrer" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5"><Icon className="text-blue-600" size={27}/><h3 className="mt-5 font-extrabold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600">{cta} <ArrowRight size={16} className="transition group-hover:translate-x-1"/></span></a>)}</div><div className="mt-6 flex flex-wrap gap-4"><span className="inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-500"><BookOpen size={17}/>LinkedIn — coming soon</span><span className="inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-500"><Users size={17}/>Facebook — coming soon</span></div></div></section>

      <footer id="contact" className="bg-slate-950 py-12 text-slate-300"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8"><div><div className="flex items-center gap-2 font-black text-white"><img src="./adaptedge-logo.png" alt="" className="h-9 w-9 rounded-lg"/>AdaptEdge Academy</div><p className="mt-4 text-sm leading-6">Concept-led coaching for ambitious commerce and CA students.</p></div><div><h3 className="font-bold text-white">Visit our centre</h3><p className="mt-4 text-sm">Meet our academic counsellors and experience the AdaptEdge classroom.</p><a href="https://share.google/IxOWFH0hHCju5qCdU" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-400 transition hover:text-blue-300"><MapPin size={16}/>Get directions on Google Maps <ArrowRight size={16}/></a><p className="mt-4 text-sm"><span className="font-bold text-white">Admission Enquiry</span><br/><a href="tel:+919167587322" className="transition hover:text-blue-300">+91 91675 87322</a><br/>admissions@adaptedgeacademy.in</p></div><div><h3 className="font-bold text-white">Quick links</h3><div className="mt-4 flex flex-col gap-2 text-sm"><a href="#courses">Programs</a><a href="#results">Student success</a><a href="#schedule">Batch schedule</a></div></div><div><h3 className="font-bold text-white">A note on results</h3><p className="mt-4 text-sm leading-6">Results reflect the performance of individual students and are not a guarantee of future outcomes.</p></div></div><p className="mx-auto mt-10 max-w-7xl border-t border-slate-800 px-5 pt-6 text-xs text-slate-500 lg:px-8">© 2026 AdaptEdge Academy. All rights reserved.</p></footer>
      <a href="https://wa.me/919167587322" target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-bold text-white shadow-xl shadow-emerald-900/25 transition hover:scale-105"><MessageCircle size={20}/>WhatsApp us</a>
    </main>
  );
}
