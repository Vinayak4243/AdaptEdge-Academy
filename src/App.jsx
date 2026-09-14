import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowRight, BarChart3, BookOpen, CalendarDays, Camera, CheckCircle2, ChevronDown,
  Clock3, GraduationCap, MapPin, Menu, MessageCircle, PlayCircle, Send,
  ShieldCheck, Sparkles, Trash2, Upload, Users, X, Zap, Plus, Target,
  ClipboardCheck, ExternalLink, GraduationCap as GraduationCapIcon, BriefcaseBusiness
} from "lucide-react";

// =====================================
// App configuration and Supabase setup
// =====================================
const STORAGE_KEY = "adaptedge-studio-content-v1";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "adaptedge2026";
const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const randomId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const makeCourse = (overrides = {}) => ({
  id: randomId(),
  category: "CA Foundation",
  title: "New Course",
  duration: "3 months",
  mode: "Offline",
  start: "01 Jan 2027",
  highlights: ["Feature one", "Feature two", "Feature three"],
  ...overrides,
});

const makeBatch = (overrides = {}) => ({
  id: randomId(),
  program: "New Batch",
  starts: "01 Jan 2027",
  faculty: "Mentor Name",
  timing: "Mon–Sat · 9:00 AM",
  seats: "15 seats",
  status: "Open",
  ...overrides,
});

const makeFaq = (overrides = {}) => ({
  id: randomId(),
  question: "New question",
  answer: "Answer text here.",
  ...overrides,
});

const makeMedia = (type = "image", overrides = {}) => ({
  id: randomId(),
  type,
  label: type === "video" ? "Video upload" : "Image upload",
  src: type === "video"
    ? "https://www.w3schools.com/html/mov_bbb.mp4"
    : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  ...overrides,
});

const makePortalResource = (type = "video", overrides = {}) => ({
  id: randomId(),
  type,
  batch: "General",
  title: type === "video" ? "New video lecture" : "New PDF notes",
  description: type === "video"
    ? "Upload a lecture video for students to watch."
    : "Upload a PDF note file for students to download.",
  url: type === "video"
    ? "https://www.w3schools.com/html/mov_bbb.mp4"
    : "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  ...overrides,
});

const defaultPortalResources = [
  makePortalResource("video", {
    batch: "CA Foundation Complete",
    title: "CA Foundation Accounting – Lecture 01",
    description: "Core concepts and practice approach for the first accounting unit.",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
  }),
  makePortalResource("video", {
    batch: "CA Foundation Complete",
    title: "Business Laws – Revision Session",
    description: "Short revision lecture focused on key law principles and exam strategy.",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
  }),
  makePortalResource("pdf", {
    batch: "CA Foundation Complete",
    title: "Accounting Notes PDF",
    description: "Download the chapter summary and formula sheet for quick revision.",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  }),
  makePortalResource("pdf", {
    batch: "CA Foundation Complete",
    title: "CA Foundation Formula Sheet",
    description: "High-priority formulas and problem-solving shortcuts for exam prep.",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  }),
];

const caInterTrackerUrl = "https://docs.google.com/spreadsheets/d/1_pwDtx3A1nVrZEbl3RDWJc5XdHnl6s7wxZtigfO4NpQ/edit?usp=sharing";

const learningPaths = [
  { title: "CA", levels: "Foundation · Intermediate · Final", copy: "Build strong concepts, practise exam-style questions, and prepare with a measurable revision plan.", color: "bg-blue-600" },
  { title: "CS", levels: "CSEET · Executive · Professional", copy: "Master law, compliance, and company-secretarial subjects with structured mentor support.", color: "bg-violet-600" },
  { title: "CMA", levels: "Foundation · Intermediate · Final", copy: "Develop command over costing, finance, and strategic management through focused practice.", color: "bg-emerald-600" },
  { title: "B.Com", levels: "FY · SY · TY", copy: "Strengthen university fundamentals alongside career-ready accounting and commerce skills.", color: "bg-amber-500" },
];

const defaultContent = {
  brand: {
    name: "AdaptEdge Academy",
    accent: "Academy",
    logo: "./adaptedge-logo.png",
  },
  hero: {
    badge: "CA, CS, CMA & B.Com learning ecosystem",
    title: "Learn with a plan. Progress with confidence.",
    highlight: "Progress with confidence.",
    subtitle:
      "A digital learning ecosystem for CA, CS, CMA, and B.Com students with expert classes, recorded lectures, downloadable notes, revision resources, and mentor-led guidance built for daily progress.",
    primaryButton: "Explore Batches",
    secondaryButton: "Download Syllabus",
  },
  stats: [
    { value: "98%", label: "Pass Rate" },
    { value: "5,000+", label: "Active Learners" },
    { value: "24/7", label: "Lecture Access" },
  ],
  courses: [
    makeCourse({
      category: "CA Foundation",
      title: "CA Foundation Complete Track",
      duration: "10 months",
      mode: "Offline + Hybrid",
      start: "15 Sep 2026",
      highlights: ["Accounting & Law mastery", "Weekly concept clinics", "2 full revision cycles"],
    }),
    makeCourse({
      category: "CS Executive",
      title: "CS Executive Complete Track",
      duration: "9 months",
      mode: "Offline + Hybrid",
      start: "10 Oct 2026",
      highlights: ["Company law and compliance mastery", "Weekly answer-writing practice", "Amendment and revision support"],
    }),
    makeCourse({
      category: "CMA Intermediate",
      title: "CMA Inter Group I — Regular",
      duration: "8 months",
      mode: "Offline + Hybrid",
      start: "12 Oct 2026",
      highlights: ["Costing and finance problem solving", "Chapterwise tests", "Personal progress reviews"],
    }),
    makeCourse({
      category: "B.Com",
      title: "B.Com Commerce Excellence",
      duration: "Academic year",
      mode: "Offline + Hybrid",
      start: "05 Oct 2026",
      highlights: ["University-aligned teaching", "Accounts and economics support", "Career pathway guidance"],
    }),
    makeCourse({
      category: "CA Intermediate",
      title: "CA Inter Group I — Regular",
      duration: "8 months",
      mode: "Offline + Hybrid",
      start: "22 Sep 2026",
      highlights: ["Faculty-led problem solving", "Chapterwise test series", "Personal progress reviews"],
    }),
    makeCourse({
      category: "CA Intermediate",
      title: "CA Inter Group II — Regular",
      duration: "8 months",
      mode: "Offline + Hybrid",
      start: "22 Sep 2026",
      highlights: ["Strategic subject planning", "Case-study practice", "Exam writing workshops"],
    }),
    makeCourse({
      category: "Class 11-12 Commerce",
      title: "Class 12 Commerce Board Excellence",
      duration: "6 months",
      mode: "Offline",
      start: "05 Oct 2026",
      highlights: ["Accounts, Eco & BST", "Board-pattern mocks", "School-syllabus alignment"],
    }),
    makeCourse({
      category: "Fast-Track",
      title: "CA Foundation Fast-Track Revision",
      duration: "12 weeks",
      mode: "Hybrid",
      start: "01 Nov 2026",
      highlights: ["High-yield revision", "Daily doubt resolution", "Exam-day strategy"],
    }),
  ],
  batches: [
    makeBatch({ program: "CA Foundation Complete", starts: "15 Sep", faculty: "CA Ankita", timing: "Mon–Sat · 8:00–11:00 AM", seats: "12 seats", status: "Few Seats Left" }),
    makeBatch({ program: "CA Inter Group I", starts: "22 Sep", faculty: "CA Mina Sharma", timing: "Mon–Fri · 4:00–7:00 PM", seats: "18 seats", status: "Open" }),
    makeBatch({ program: "CS Executive Complete", starts: "10 Oct", faculty: "CS Mentor", timing: "Mon–Sat · 11:30 AM–2:00 PM", seats: "20 seats", status: "Open" }),
    makeBatch({ program: "CMA Inter Group I", starts: "12 Oct", faculty: "CMA Mentor", timing: "Mon–Fri · 5:00–7:30 PM", seats: "16 seats", status: "Open" }),
    makeBatch({ program: "B.Com Commerce Excellence", starts: "05 Oct", faculty: "Commerce Faculty", timing: "Mon–Sat · 3:30–5:30 PM", seats: "14 seats", status: "Open" }),
    makeBatch({ program: "Class 12 Commerce", starts: "05 Oct", faculty: "CA Priya Sarode", timing: "Mon–Sat · 3:30–5:30 PM", seats: "9 seats", status: "Few Seats Left" }),
  ],
  faqs: [
    makeFaq({
      question: "Can I attend a demo class before enrolling?",
      answer: "Yes. Book a complimentary demo to experience the faculty, teaching method, and classroom environment before you decide.",
    }),
    makeFaq({
      question: "How are doubts handled between classes?",
      answer: "Students get scheduled 1-on-1 doubt sessions, subject clinics, and a monitored academic-support channel.",
    }),
    makeFaq({
      question: "Do you offer hybrid learning?",
      answer: "Selected CA batches include live classroom access plus structured online revision support. Ask our counsellor for the current batch format.",
    }),
  ],
  media: [
    makeMedia("image", {
      label: "Hero image",
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    }),
    makeMedia("video", {
      label: "Intro video",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
    }),
  ],
  contact: {
    phone: "+91 91675 87322",
    email: "adaptedgeacademy@gmail.com",
    address: "Meet our academic counsellors and experience the AdaptEdge classroom.",
    mapLink: "https://share.google/IxOWFH0hHCju5qCdU",
    whatsapp: "https://wa.me/919167587322",
  },
  socials: [
    { title: "WhatsApp Channel", url: "https://whatsapp.com/channel/0029Vb7zMxx8kyyHrmlaoI0q", description: "Daily quizzes, bite-sized revision notes, and instant updates." },
    { title: "Telegram Channel", url: "https://t.me/+fZJqsFrZQJFlMGVl", description: "Download comprehensive study notes and access full video lectures." },
    { title: "YouTube Channel", url: "https://www.youtube.com/@minasharma9832", description: "In-depth concept lectures for CA, Class 11, and Class 12 students." },
    { title: "Instagram Profile", url: "https://www.instagram.com/adaptedgeacademy?igsh=ZjN6cHB0aTVtaXYy", description: "Educational reels, study tips, and official ICAI exam notifications." },
  ],
};

const fieldClass = "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500";

class AppErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("AdaptEdge page rendering error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-center text-slate-900">
          <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5">
            <h1 className="text-2xl font-black">We’re refreshing the academy website.</h1>
            <p className="mt-3 text-slate-600">Please reload this page. If the issue continues, contact AdaptEdge Academy directly.</p>
            <button type="button" onClick={() => window.location.reload()} className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">Reload website</button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

// Merge saved/cloud content with defaults so a new Supabase row such as `{}`
// never causes the public site to render a blank page.
const mergeContentWithDefaults = (saved = {}) => ({
  ...defaultContent,
  ...saved,
  brand: { ...defaultContent.brand, ...(saved.brand || {}) },
  hero: { ...defaultContent.hero, ...(saved.hero || {}) },
  contact: { ...defaultContent.contact, ...(saved.contact || {}) },
  stats: Array.isArray(saved.stats) && saved.stats.length ? saved.stats : defaultContent.stats,
  courses: Array.isArray(saved.courses) && saved.courses.length ? saved.courses : defaultContent.courses,
  batches: Array.isArray(saved.batches) && saved.batches.length ? saved.batches : defaultContent.batches,
  faqs: Array.isArray(saved.faqs) && saved.faqs.length ? saved.faqs : defaultContent.faqs,
  media: Array.isArray(saved.media) && saved.media.length ? saved.media : defaultContent.media,
  socials: Array.isArray(saved.socials) && saved.socials.length ? saved.socials : defaultContent.socials,
});

// =====================================
// Local storage helpers
// Purpose: load saved website content and portal resources from the browser when available
// =====================================
const getSavedContent = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? mergeContentWithDefaults(JSON.parse(saved)) : defaultContent;
  } catch {
    return defaultContent;
  }
};

const getSavedPortalResources = () => {
  try {
    const saved = localStorage.getItem("adaptedge-student-resources");
    return saved ? JSON.parse(saved) : defaultPortalResources;
  } catch {
    return defaultPortalResources;
  }
};

const persistPortalResources = async (resources) => {
  if (!supabase) return;

  try {
    const payload = resources.map((resource) => ({
      id: resource.id,
      type: resource.type,
      title: resource.title,
      description: resource.description,
      url: resource.url,
      batch: resource.batch || "General",
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("student_resources").upsert(payload, { onConflict: "id" });
    if (error) throw error;
  } catch (error) {
    console.warn("Supabase portal resource sync failed:", error);
  }
};

const persistStudentAccess = async (record) => {
  if (!supabase) return;

  try {
    const { error } = await supabase.from("student_access").upsert(
      [
        {
          id: randomId(),
          name: record.name,
          email: record.email,
          phone: record.phone,
          created_at: new Date().toISOString(),
        },
      ],
      { onConflict: "email" }
    );

    if (error) throw error;
  } catch (error) {
    console.warn("Supabase student access sync failed:", error);
  }
};

// =====================================
// Main app component
// Purpose: manages all website state, CMS editing, portal login, and rendering of all sections
// =====================================
export default function AdaptEdgeAcademy() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [schedule, setSchedule] = useState("Upcoming Batches");
  const [faqOpen, setFaqOpen] = useState(null);
  const [studioOpen, setStudioOpen] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminError, setAdminError] = useState("");
  const [activeTab, setActiveTab] = useState("site");
  const [content, setContent] = useState(getSavedContent);
  const [saveState, setSaveState] = useState("idle");
  const [cloudState, setCloudState] = useState(supabase ? "ready" : "disabled");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "CA Foundation",
    mode: "Offline",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({ type: "idle", message: "" });
  const [studentForm, setStudentForm] = useState({ name: "", email: "", phone: "" });
  const [studentAccess, setStudentAccess] = useState(() => {
    try {
      const saved = localStorage.getItem("adaptedge-student-access");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [studentError, setStudentError] = useState("");
  const [portalResources, setPortalResources] = useState(getSavedPortalResources);
  const [portalBatchFilter, setPortalBatchFilter] = useState("All batches");
  const [resourceUploadStatus, setResourceUploadStatus] = useState("");
  const [careerGoal, setCareerGoal] = useState("CA");
  const [studyStage, setStudyStage] = useState("After Class 12");
  const [careerResult, setCareerResult] = useState("");

  // =====================================
  // Browser persistence and cloud sync
  // Purpose: save the editable site content to localStorage and load Supabase data when configured
  // =====================================
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem("adaptedge-student-resources", JSON.stringify(portalResources));
  }, [portalResources]);

  useEffect(() => {
    const loadCloudContent = async () => {
      if (!supabase) return;

      setCloudState("loading");

      try {
        const { data, error } = await supabase
          .from("site_content")
          .select("content")
          .eq("id", "main")
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data?.content) {
          const parsed = typeof data.content === "string" ? JSON.parse(data.content) : data.content;
          setContent(mergeContentWithDefaults(parsed));
        }

        setCloudState("ready");
      } catch (error) {
        console.warn("Supabase content unavailable:", error);
        setCloudState("error");
      }
    };

    const loadPortalResources = async () => {
      if (!supabase) return;

      try {
        const { data, error } = await supabase
          .from("student_resources")
          .select("*")
          .order("updated_at", { ascending: true });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setPortalResources(data.map((item) => ({
            id: item.id,
            type: item.type,
            title: item.title,
            description: item.description,
            url: item.url,
            batch: item.batch || "General",
          })));
        }
      } catch (error) {
        console.warn("Supabase student resources unavailable:", error);
      }
    };

    loadCloudContent();
    loadPortalResources();
  }, []);

  const visibleCourses = filter === "All" ? content.courses : content.courses.filter((course) => course.category === filter);
  const categoryFilters = ["All", ...new Set(content.courses.map((course) => course.category))];

  const unlockStudio = () => {
    if (adminPasswordInput === adminPassword) {
      setAdminUnlocked(true);
      setAdminError("");
      setStudioOpen(true);
      setAdminPasswordInput("");
      return;
    }

    setAdminError("Incorrect password. Please use your admin passcode.");
  };

  const handleStudioToggle = () => {
    if (!adminUnlocked) {
      setStudioOpen((prev) => !prev);
      setAdminError("");
      return;
    }

    setStudioOpen((prev) => !prev);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdmissionSubmit = async (event) => {
    event.preventDefault();

    setFormStatus({ type: "sending", message: "Sending your enquiry..." });

    try {
      const endpoint = formEndpoint || "https://formsubmit.co/ajax/adaptedgeacademy@gmail.com";
      const payload = formEndpoint
        ? {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            course: formData.course,
            mode: formData.mode,
            query: formData.message,
            source: "AdaptEdge Academy website",
          }
        : {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            course: formData.course,
            mode: formData.mode,
            message: formData.message,
            _subject: "AdaptEdge Academy Enquiry",
            _captcha: "false",
            _template: "table",
          };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Form delivery failed");
      }

      setFormStatus({
        type: "success",
        message: "Thanks! Your enquiry has been sent successfully. We will contact you shortly.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "CA Foundation",
        mode: "Offline",
        message: "",
      });
    } catch (error) {
      console.error("Admission form submission failed", error);
      setFormStatus({
        type: "error",
        message: "Something went wrong. Please send your details on WhatsApp or email adaptedgeacademy@gmail.com directly.",
      });
    }
  };

  const handleStudentInput = (event) => {
    const { name, value } = event.target;
    setStudentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStudentLogin = async (event) => {
    event.preventDefault();

    if (!studentForm.name.trim() || !studentForm.email.trim() || !studentForm.phone.trim()) {
      setStudentError("Name, email, and phone number are required to access the study portal.");
      return;
    }

    const accessRecord = {
      name: studentForm.name.trim(),
      email: studentForm.email.trim(),
      phone: studentForm.phone.trim(),
    };

    localStorage.setItem("adaptedge-student-access", JSON.stringify(accessRecord));
    setStudentAccess(accessRecord);
    setStudentForm({ name: "", email: "", phone: "" });
    setStudentError("");
    await persistStudentAccess(accessRecord);
  };

  const handleStudentLogout = () => {
    localStorage.removeItem("adaptedge-student-access");
    setStudentAccess(null);
  };

  const showCareerRecommendation = () => {
    const path = learningPaths.find((item) => item.title === careerGoal);
    setCareerResult(`${path.title} is a great starting path for you. Based on your stage (${studyStage}), book a free counselling session and we will map the right level, batch, and weekly study plan.`);
  };

  const addPortalResource = (type) => {
    const next = [...portalResources, makePortalResource(type)];
    setPortalResources(next);
    persistPortalResources(next);
  };

  const updatePortalResource = (id, field, value) => {
    const next = portalResources.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    setPortalResources(next);
    persistPortalResources(next);
  };

  const removePortalResource = async (id) => {
    const next = portalResources.filter((item) => item.id !== id);
    setPortalResources(next);
    if (supabase) {
      try {
        const { error } = await supabase.from("student_resources").delete().eq("id", id);
        if (error) throw error;
      } catch (error) {
        console.warn("Could not remove portal resource from Supabase:", error);
      }
    }
  };

  const handlePortalResourceUpload = async (event, id) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith("video/");
    const isPdf = file.type === "application/pdf";
    if (!isVideo && !isPdf) {
      return;
    }

    setResourceUploadStatus(`Uploading ${file.name}...`);
    let uploadedUrl = "";
    if (supabase) {
      try {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
        const filePath = `resources/${Date.now()}-${safeName}`;
        const { error } = await supabase.storage.from("site-media").upload(filePath, file, { upsert: false, cacheControl: "3600" });
        if (error) throw error;
        const { data } = supabase.storage.from("site-media").getPublicUrl(filePath);
        uploadedUrl = data.publicUrl;
      } catch (error) {
        console.warn("Resource upload failed:", error);
        setResourceUploadStatus("Cloud upload failed. Check Supabase Storage setup, then try again.");
        event.target.value = "";
        return;
      }
    }

    const objectUrl = uploadedUrl || URL.createObjectURL(file);
    const next = portalResources.map((item) => {
      if (item.id !== id) return item;
      return {
        ...item,
        url: objectUrl,
        title: file.name.replace(/\.[^/.]+$/, ""),
        description: isVideo ? "Uploaded lecture video ready for student access." : "Uploaded PDF notes ready for student access.",
      };
    });

    setPortalResources(next);
    persistPortalResources(next);
    setResourceUploadStatus(uploadedUrl ? "Upload complete. The resource is saved online." : "Preview added for this browser session. Connect Supabase to keep uploaded files online.");
    event.target.value = "";
  };

  const updateContent = (updater) => {
    setContent((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      return next;
    });
  };

  const addCourse = () => {
    updateContent((prev) => ({ ...prev, courses: [...prev.courses, makeCourse()] }));
  };

  const updateCourse = (id, field, value) => {
    updateContent((prev) => ({
      ...prev,
      courses: prev.courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      ),
    }));
  };

  const updateCourseHighlight = (courseId, index, value) => {
    updateContent((prev) => ({
      ...prev,
      courses: prev.courses.map((course) => {
        if (course.id !== courseId) return course;
        const updated = [...course.highlights];
        updated[index] = value;
        return { ...course, highlights: updated };
      }),
    }));
  };

  const addCourseHighlight = (courseId) => {
    updateContent((prev) => ({
      ...prev,
      courses: prev.courses.map((course) =>
        course.id === courseId
          ? { ...course, highlights: [...course.highlights, "New highlight"] }
          : course
      ),
    }));
  };

  const removeCourse = (id) => {
    updateContent((prev) => ({
      ...prev,
      courses: prev.courses.filter((course) => course.id !== id),
    }));
  };

  const addBatch = () => {
    updateContent((prev) => ({ ...prev, batches: [...prev.batches, makeBatch()] }));
  };

  const updateBatch = (id, field, value) => {
    updateContent((prev) => ({
      ...prev,
      batches: prev.batches.map((batch) =>
        batch.id === id ? { ...batch, [field]: value } : batch
      ),
    }));
  };

  const removeBatch = (id) => {
    updateContent((prev) => ({
      ...prev,
      batches: prev.batches.filter((batch) => batch.id !== id),
    }));
  };

  const addFaq = () => {
    updateContent((prev) => ({ ...prev, faqs: [...prev.faqs, makeFaq()] }));
  };

  const updateFaq = (id, field, value) => {
    updateContent((prev) => ({
      ...prev,
      faqs: prev.faqs.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const removeFaq = (id) => {
    updateContent((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((item) => item.id !== id),
    }));
  };

  const addMedia = (type) => {
    updateContent((prev) => ({ ...prev, media: [...prev.media, makeMedia(type)] }));
  };

  const updateMedia = (id, field, value) => {
    updateContent((prev) => ({
      ...prev,
      media: prev.media.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const handleMediaUpload = async (event, id) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (supabase) {
      try {
        const fileName = `site-media/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        const { error: uploadError } = await supabase.storage
          .from("site-media")
          .upload(fileName, file, {
            upsert: true,
            cacheControl: "3600",
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage.from("site-media").getPublicUrl(fileName);
        updateMedia(id, "src", data.publicUrl);
        updateMedia(id, "label", file.name);
        event.target.value = "";
        return;
      } catch (error) {
        console.warn("Supabase upload failed, falling back to local preview:", error);
      }
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateMedia(id, "src", String(reader.result));
      updateMedia(id, "label", file.name);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const removeMedia = (id) => {
    updateContent((prev) => ({
      ...prev,
      media: prev.media.filter((item) => item.id !== id),
    }));
  };

  const saveToCloud = async () => {
    if (!supabase) {
      setCloudState("disabled");
      setSaveState("missing");
      return;
    }

    setSaveState("saving");

    try {
      const { error } = await supabase.from("site_content").upsert(
        {
          id: "main",
          content: JSON.stringify(content),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (error) {
        throw error;
      }

      setSaveState("saved");
      setCloudState("ready");
    } catch (error) {
      console.error("Could not save content to Supabase", error);
      setSaveState("error");
      setCloudState("error");
    }
  };

  const loadFromCloud = async () => {
    if (!supabase) {
      setCloudState("disabled");
      setSaveState("missing");
      return;
    }

    setSaveState("loading");

    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("id", "main")
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (data?.content) {
        const parsed = typeof data.content === "string" ? JSON.parse(data.content) : data.content;
        setContent(mergeContentWithDefaults(parsed));
      }

      setCloudState("ready");
      setSaveState("idle");
    } catch (error) {
      console.error("Could not load content from Supabase", error);
      setCloudState("error");
      setSaveState("error");
    }
  };

  // =====================================
  // Page rendering
  // Purpose: prepares visuals and renders the full academy website layout
  // =====================================
  const heroVisual = content.media?.[0]?.src || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80";
  const heroVisualType = content.media?.[0]?.type || "image";

  return (
    <AppErrorBoundary>
    <div className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#home" className="flex items-center gap-3" aria-label="AdaptEdge Academy home">
            <img src={content.brand.logo} alt={content.brand.name} className="h-12 w-12 rounded-xl object-contain" />
            <span className="text-lg font-extrabold tracking-tight text-slate-900">{content.brand.name.split(" ")[0]} <span className="text-blue-600">{content.brand.accent}</span></span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            {["Paths", "Courses", "Study Tracker", "Results", "Contact"].map((item) => {
              const id = item.toLowerCase().replace(/\s+/g, "-");
              return (
                <a key={item} href={`#${id === "study-tracker" ? "guidance" : id}`} className="transition hover:text-blue-600">
                  {item}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => document.getElementById("admissions")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-xl bg-blue-600 px-5 py-3 text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
            >
              Book Free Demo
            </button>
            <button
              type="button"
              onClick={handleStudioToggle}
              className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
            >
              {studioOpen ? "Close Studio" : "Open Studio"}
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 text-slate-700 md:hidden" aria-label="Toggle navigation">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm font-semibold">
              {[["Paths", "paths"], ["Courses", "courses"], ["Study Tracker", "guidance"], ["Results", "results"], ["Contact", "contact"]].map(([label, id]) => (
                <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
              ))}
              <button onClick={() => { setMenuOpen(false); document.getElementById("admissions")?.scrollIntoView({ behavior: "smooth" }); }} className="rounded-xl bg-blue-600 px-4 py-3 text-white">
                Book Free Demo
              </button>
              <button onClick={() => { setMenuOpen(false); setStudioOpen((prev) => !prev); }} className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-700">
                Studio
              </button>
            </div>
          </div>
        )}
      </nav>

      // =====================================
      // Admin studio login and CMS panel
      // Purpose: protects content editing behind a password gate and lets admins change site content
      // =====================================
      {studioOpen && !adminUnlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Admin access</p>
            <h3 className="mt-3 text-2xl font-black text-slate-900">Unlock website studio</h3>
            <p className="mt-2 text-sm text-slate-600">Enter the admin password to manage content, media, and site data.</p>

            <div className="mt-5 space-y-3">
              <input
                type="password"
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
              {adminError && <p className="text-sm font-medium text-red-600">{adminError}</p>}
              <button type="button" onClick={unlockStudio} className="w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white">
                Unlock studio
              </button>
            </div>
          </div>
        </div>
      )}

      {studioOpen && adminUnlocked && (
        <aside className="fixed right-4 top-24 z-50 w-[min(420px,calc(100vw-2rem))] rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Website studio</p>
              <h3 className="text-lg font-black text-slate-900">Content editor</h3>
            </div>
            <button type="button" onClick={() => setStudioOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800">
              <X size={18} />
            </button>
          </div>

          <div className="flex border-b border-slate-200 px-3 py-2">
            {[
              ["site", "Site"],
              ["courses", "Courses"],
              ["batches", "Batches"],
              ["faq", "FAQ"],
              ["media", "Media"],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`flex-1 rounded-xl px-3 py-2 text-sm font-bold transition ${activeTab === key ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="max-h-[68vh] overflow-y-auto p-5">
            <div className="mb-4 flex gap-2">
              <button type="button" onClick={saveToCloud} className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-sm font-bold text-white">
                {saveState === "saving" ? "Saving..." : "Save to cloud"}
              </button>
              <button type="button" onClick={loadFromCloud} className="rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700">
                Load
              </button>
            </div>
            <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <span>Cloud</span>
              <span className={cloudState === "ready" ? "text-emerald-600" : cloudState === "error" ? "text-red-600" : cloudState === "loading" ? "text-amber-600" : "text-slate-500"}>
                {cloudState}
              </span>
            </div>

            {activeTab === "site" && (
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700">
                  Brand name
                  <input value={content.brand.name} onChange={(e) => updateContent((prev) => ({ ...prev, brand: { ...prev.brand, name: e.target.value } }))} className={fieldClass} />
                </label>
                <label className="block text-sm font-bold text-slate-700">
                  Accent word
                  <input value={content.brand.accent} onChange={(e) => updateContent((prev) => ({ ...prev, brand: { ...prev.brand, accent: e.target.value } }))} className={fieldClass} />
                </label>
                <label className="block text-sm font-bold text-slate-700">
                  Hero badge
                  <input value={content.hero.badge} onChange={(e) => updateContent((prev) => ({ ...prev, hero: { ...prev.hero, badge: e.target.value } }))} className={fieldClass} />
                </label>
                <label className="block text-sm font-bold text-slate-700">
                  Hero title
                  <input value={content.hero.title} onChange={(e) => updateContent((prev) => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))} className={fieldClass} />
                </label>
                <label className="block text-sm font-bold text-slate-700">
                  Highlighted text
                  <input value={content.hero.highlight} onChange={(e) => updateContent((prev) => ({ ...prev, hero: { ...prev.hero, highlight: e.target.value } }))} className={fieldClass} />
                </label>
                <label className="block text-sm font-bold text-slate-700">
                  Description
                  <textarea value={content.hero.subtitle} onChange={(e) => updateContent((prev) => ({ ...prev, hero: { ...prev.hero, subtitle: e.target.value } }))} className={`${fieldClass} min-h-24`} />
                </label>

                <div className="space-y-3">
                  <p className="text-sm font-bold text-slate-700">Stats</p>
                  {content.stats.map((stat, index) => (
                    <div key={`${stat.label}-${index}`} className="grid gap-2 rounded-2xl border border-slate-200 p-3">
                      <input value={stat.value} onChange={(e) => updateContent((prev) => ({ ...prev, stats: prev.stats.map((item, i) => i === index ? { ...item, value: e.target.value } : item) }))} className={fieldClass} />
                      <input value={stat.label} onChange={(e) => updateContent((prev) => ({ ...prev, stats: prev.stats.map((item, i) => i === index ? { ...item, label: e.target.value } : item) }))} className={fieldClass} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="space-y-4">
                <button type="button" onClick={addCourse} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white">
                  <Plus size={16} /> Add course
                </button>

                {content.courses.map((course) => (
                  <div key={course.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="font-black text-slate-900">{course.title || "Course"}</h4>
                      <button type="button" onClick={() => removeCourse(course.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <input value={course.category} onChange={(e) => updateCourse(course.id, "category", e.target.value)} className={fieldClass} />
                      <input value={course.title} onChange={(e) => updateCourse(course.id, "title", e.target.value)} className={fieldClass} />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input value={course.duration} onChange={(e) => updateCourse(course.id, "duration", e.target.value)} className={fieldClass} />
                        <input value={course.mode} onChange={(e) => updateCourse(course.id, "mode", e.target.value)} className={fieldClass} />
                      </div>
                      <input value={course.start} onChange={(e) => updateCourse(course.id, "start", e.target.value)} className={fieldClass} />

                      <div className="space-y-2">
                        <p className="text-sm font-bold text-slate-700">Highlights</p>
                        {course.highlights.map((item, index) => (
                          <input
                            key={`${course.id}-highlight-${index}`}
                            value={item}
                            onChange={(e) => updateCourseHighlight(course.id, index, e.target.value)}
                            className={fieldClass}
                          />
                        ))}
                        <button type="button" onClick={() => addCourseHighlight(course.id)} className="text-sm font-bold text-blue-600">
                          + Add highlight
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "batches" && (
              <div className="space-y-4">
                <button type="button" onClick={addBatch} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white">
                  <Plus size={16} /> Add batch
                </button>

                {content.batches.map((batch) => (
                  <div key={batch.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="font-black text-slate-900">{batch.program}</h4>
                      <button type="button" onClick={() => removeBatch(batch.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input value={batch.program} onChange={(e) => updateBatch(batch.id, "program", e.target.value)} className={fieldClass} />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input value={batch.starts} onChange={(e) => updateBatch(batch.id, "starts", e.target.value)} className={fieldClass} />
                        <input value={batch.faculty} onChange={(e) => updateBatch(batch.id, "faculty", e.target.value)} className={fieldClass} />
                      </div>
                      <input value={batch.timing} onChange={(e) => updateBatch(batch.id, "timing", e.target.value)} className={fieldClass} />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input value={batch.seats} onChange={(e) => updateBatch(batch.id, "seats", e.target.value)} className={fieldClass} />
                        <input value={batch.status} onChange={(e) => updateBatch(batch.id, "status", e.target.value)} className={fieldClass} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "faq" && (
              <div className="space-y-4">
                <button type="button" onClick={addFaq} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white">
                  <Plus size={16} /> Add FAQ
                </button>

                {content.faqs.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="font-black text-slate-900">FAQ</h4>
                      <button type="button" onClick={() => removeFaq(item.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input value={item.question} onChange={(e) => updateFaq(item.id, "question", e.target.value)} className={fieldClass} />
                      <textarea value={item.answer} onChange={(e) => updateFaq(item.id, "answer", e.target.value)} className={`${fieldClass} min-h-24`} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "media" && (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <button type="button" onClick={() => addMedia("image")} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white">
                    <Upload size={16} /> Add image
                  </button>
                  <button type="button" onClick={() => addMedia("video")} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700">
                    <Upload size={16} /> Add video
                  </button>
                </div>

                {content.media.map((item) => (
                  <div key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <div className="relative">
                      {item.type === "video" ? (
                        <video src={item.src} controls className="h-52 w-full object-cover bg-slate-200" />
                      ) : (
                        <img src={item.src} alt={item.label} className="h-52 w-full object-cover" />
                      )}
                    </div>
                    <div className="space-y-3 p-4">
                      <input value={item.label} onChange={(e) => updateMedia(item.id, "label", e.target.value)} className={fieldClass} />
                      <input value={item.src} onChange={(e) => updateMedia(item.id, "src", e.target.value)} className={fieldClass} />
                      <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700">
                        Upload file
                        <input type="file" accept={item.type === "video" ? "video/*" : "image/*"} onChange={(e) => handleMediaUpload(e, item.id)} className="hidden" />
                      </label>
                      <button type="button" onClick={() => removeMedia(item.id)} className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-600">
                        <Trash2 size={15} /> Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-lg font-black text-slate-900">Student resource library</h4>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => addPortalResource("video")} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white">
                      <Upload size={16} /> Add lecture video
                    </button>
                    <button type="button" onClick={() => addPortalResource("pdf")} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700">
                      <Upload size={16} /> Add PDF notes
                    </button>
                  </div>
                  {resourceUploadStatus && <p className="mt-3 text-sm font-medium text-blue-700">{resourceUploadStatus}</p>}

                  <div className="mt-4 space-y-4">
                    {portalResources.map((resource) => (
                      <div key={resource.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="space-y-3">
                          <input value={resource.title} onChange={(e) => updatePortalResource(resource.id, "title", e.target.value)} className={fieldClass} />
                          <label className="block text-sm font-bold text-slate-700">Visible in batch
                            <select value={resource.batch || "General"} onChange={(e) => updatePortalResource(resource.id, "batch", e.target.value)} className={fieldClass}>
                              <option>General</option>
                              {content.batches.map((batch) => <option key={batch.id} value={batch.program}>{batch.program}</option>)}
                            </select>
                          </label>
                          <textarea value={resource.description} onChange={(e) => updatePortalResource(resource.id, "description", e.target.value)} className={`${fieldClass} min-h-20`} />
                          <input value={resource.url} onChange={(e) => updatePortalResource(resource.id, "url", e.target.value)} className={fieldClass} />
                          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">
                            Upload {resource.type === "video" ? "video" : "PDF"} file
                            <input type="file" accept={resource.type === "video" ? "video/*" : ".pdf,application/pdf"} onChange={(e) => handlePortalResourceUpload(e, resource.id)} className="hidden" />
                          </label>
                          <button type="button" onClick={() => removePortalResource(resource.id)} className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-600">
                            <Trash2 size={15} /> Remove resource
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      )}

      <main className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
        // =====================================
        // Hero section
        // Purpose: displays top branding, academy headline, CTA buttons, and hero media
        // =====================================
        <section id="home" className="relative isolate overflow-hidden bg-slate-950">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_22%,#2563eb55,transparent_27%),radial-gradient(circle_at_17%_78%,#0ea5e933,transparent_25%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.25fr_.75fr] lg:px-8 lg:py-28">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-200">
                <Sparkles size={16} /> {content.hero.badge}
              </div>
              <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {content.hero.title.replace(content.hero.highlight, `"${content.hero.highlight}"`)}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{content.hero.subtitle}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <button onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-xl shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-blue-500">
                  {content.hero.primaryButton} <ArrowRight size={18} />
                </button>
                <a href="mailto:adaptedgeacademy@gmail.com?subject=Syllabus%20Request" className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-6 py-4 font-bold text-white transition hover:border-blue-400 hover:bg-white/5">
                  {content.hero.secondaryButton}
                </a>
              </div>
            </div>

            <div className="grid content-center gap-4">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
                {heroVisualType === "video" ? (
                  <video src={heroVisual} controls className="h-[280px] w-full rounded-2xl object-cover" />
                ) : (
                  <img src={heroVisual} alt={content.brand.name} className="h-[280px] w-full rounded-2xl object-cover" />
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {content.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                    <ShieldCheck className="mb-3 text-blue-400" />
                    <div className="text-3xl font-black text-white">{stat.value}</div>
                    <div className="mt-1 text-sm font-medium text-slate-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="paths" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-sm font-bold uppercase tracking-widest text-blue-600">Choose your path</span>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">One academy. Four professional pathways.</h2>
              <p className="mt-4 leading-7 text-slate-600">Explore coaching designed for every milestone—from your first commerce class to professional examinations.</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {learningPaths.map((path) => (
                <article key={path.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl text-lg font-black text-white ${path.color}`}>{path.title}</span>
                  <h3 className="mt-5 text-xl font-extrabold">{path.title}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-blue-600">{path.levels}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{path.copy}</p>
                  <button onClick={() => { setFilter(({ CA: "CA Foundation", CS: "CS Executive", CMA: "CMA Intermediate", "B.Com": "B.Com" })[path.title]); document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600">Explore {path.title} <ArrowRight size={16} /></button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="guidance" className="bg-blue-50 py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
            <div className="rounded-3xl bg-slate-950 p-8 text-white sm:p-10">
              <span className="text-sm font-bold uppercase tracking-widest text-blue-400">Career path finder</span>
              <h2 className="mt-3 text-3xl font-black">Not sure where to start?</h2>
              <p className="mt-4 leading-7 text-slate-300">Choose your goal and current stage for a simple next-step recommendation.</p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-bold">My goal
                  <select value={careerGoal} onChange={(e) => setCareerGoal(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-3 text-white outline-none">
                    {learningPaths.map((path) => <option key={path.title}>{path.title}</option>)}
                  </select>
                </label>
                <label className="text-sm font-bold">I am currently
                  <select value={studyStage} onChange={(e) => setStudyStage(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-3 text-white outline-none">
                    <option>In Class 11 or 12</option><option>After Class 12</option><option>In college</option><option>Preparing for a professional level</option>
                  </select>
                </label>
              </div>
              <button onClick={showCareerRecommendation} className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-500">Show my next step</button>
              {careerResult && <p className="mt-5 rounded-xl border border-blue-400/30 bg-blue-400/10 p-4 text-sm leading-6 text-blue-100">{careerResult}</p>}
            </div>
            <div className="rounded-3xl border border-blue-100 bg-white p-8 sm:p-10">
              <div className="inline-flex rounded-xl bg-emerald-100 p-3 text-emerald-700"><Target size={24} /></div>
              <h2 className="mt-5 text-3xl font-black">CA Inter study tracker</h2>
              <p className="mt-4 leading-7 text-slate-600">Keep your CA Intermediate subjects, chapters, tests, and revision goals visible in one shared tracker.</p>
              <div className="mt-6 space-y-3 text-sm text-slate-700">
                {["Plan chapter completion and revision cycles", "Track mock tests and weak areas", "Review progress with your mentor"].map((item) => <p key={item} className="flex items-center gap-3"><ClipboardCheck size={18} className="text-emerald-600" />{item}</p>)}
              </div>
              <a href={caInterTrackerUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700">Open CA Inter Tracker <ExternalLink size={17} /></a>
            </div>
          </div>
        </section>

        // =====================================
        // Student portal login and protected content area
        // Purpose: requires name, email, and phone, then unlocks lecture videos and PDF notes
        // =====================================
        <section id="portal" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-sm font-bold uppercase tracking-widest text-blue-600">Student access</span>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Secure portal for video lectures and PDF notes.</h2>
              <p className="mt-4 leading-7 text-slate-600">Students must log in with their name, email, and phone number to unlock the learning portal. Access is only granted after providing all required details.</p>
            </div>

            {!studentAccess ? (
              <div className="mt-10 grid gap-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 lg:grid-cols-[1.1fr_.9fr]">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">Login to access learning content</h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li>• Watch recorded video lectures</li>
                    <li>• Download PDFs and revision notes</li>
                    <li>• Access study materials from your student account</li>
                  </ul>
                </div>

                <form onSubmit={handleStudentLogin} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <label className="block text-sm font-bold text-slate-700">
                    Full Name
                    <input name="name" value={studentForm.name} onChange={handleStudentInput} required className={fieldClass} placeholder="Enter your full name" />
                  </label>
                  <label className="block text-sm font-bold text-slate-700">
                    Email Address
                    <input type="email" name="email" value={studentForm.email} onChange={handleStudentInput} required className={fieldClass} placeholder="your@email.com" />
                  </label>
                  <label className="block text-sm font-bold text-slate-700">
                    Phone Number
                    <input name="phone" value={studentForm.phone} onChange={handleStudentInput} required className={fieldClass} placeholder="+91 98765 43210" />
                  </label>
                  {studentError && <p className="text-sm font-medium text-red-600">{studentError}</p>}
                  <button type="submit" className="w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">Unlock course content</button>
                </form>
              </div>
            ) : (
              <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Student portal</p>
                    <h3 className="mt-2 text-2xl font-black text-slate-900">Welcome, {studentAccess.name}</h3>
                  </div>
                  <button type="button" onClick={handleStudentLogout} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700">
                    Log out
                  </button>
                </div>

                <div className="mb-5 flex flex-wrap gap-2">
                  {["All batches", "General", ...new Set(content.batches.map((batch) => batch.program))].map((batch) => (
                    <button key={batch} type="button" onClick={() => setPortalBatchFilter(batch)} className={`rounded-full px-3 py-2 text-xs font-bold ${portalBatchFilter === batch ? "bg-blue-600 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"}`}>{batch}</button>
                  ))}
                </div>
                <div className="grid gap-5 lg:grid-cols-2">
                  {portalResources.filter((resource) => portalBatchFilter === "All batches" || (resource.batch || "General") === portalBatchFilter).map((resource) => (
                    <div key={resource.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-3 flex items-center gap-2 text-blue-600">
                        {resource.type === "video" ? <PlayCircle size={18} /> : <BookOpen size={18} />}
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">{resource.type === "video" ? "Lecture" : "PDF"}</span>
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900">{resource.title}</h4>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-blue-600">{resource.batch || "General"}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{resource.description}</p>

                      {resource.type === "video" ? (
                        <video src={resource.url} controls className="mt-4 h-52 w-full rounded-xl object-cover bg-slate-200" />
                      ) : (
                        <a href={resource.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">
                          Download PDF notes
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="gallery" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl"><span className="text-sm font-bold uppercase tracking-widest text-blue-600">Academy life</span><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Inside the AdaptEdge classroom.</h2><p className="mt-4 text-slate-600">Studio uploads appear here automatically—use this area for classroom photos, events, results, and student activities.</p></div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {content.media.filter((item) => item.type === "image").map((item) => <figure key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><img src={item.src} alt={item.label} className="h-64 w-full object-cover" /><figcaption className="px-4 py-3 text-sm font-bold text-slate-700">{item.label}</figcaption></figure>)}
            </div>
          </div>
        </section>

        // =====================================
        // Platform strengths section
        // Purpose: highlights student benefits such as recorded lectures, notes, support, and revision
        // =====================================
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-sm font-bold uppercase tracking-widest text-blue-600">Learning platform</span>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">More than classes—an active study ecosystem.</h2>
              <p className="mt-4 leading-7 text-slate-600">Students stay engaged with recorded lectures, revision notes, digital resources, and exam-focused support designed for consistent progress.</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                [PlayCircle, "Recorded Lectures", "Watch every class anytime, revisit difficult topics, and learn at your own pace."],
                [BookOpen, "Downloadable Notes", "Access chapter-wise notes, summaries, and quick formulas across all subjects."],
                [MessageCircle, "Doubt Support", "Get mentor-driven guidance and structured solutions for questions that matter most."],
                [BarChart3, "Practice & Revision", "Track progress with mock tests, revision drills, and exam-focused performance insights."]
              ].map(([Icon, title, copy]) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <div className="mb-5 inline-flex rounded-xl bg-blue-100 p-3 text-blue-700"><Icon size={24} /></div>
                  <h3 className="text-xl font-extrabold text-slate-900">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        // =====================================
        // Course catalog section
        // Purpose: shows filterable batches and course cards for different programs
        // =====================================
        <section id="courses" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">Find your right batch</span>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Focused programs. Measurable progress.</h2>
            <p className="mt-4 text-slate-600">Choose a learning track designed around your current level, exam date, and preferred class format.</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {categoryFilters.map((tab) => (
              <button key={tab} onClick={() => setFilter(tab)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${filter === tab ? "bg-slate-900 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-blue-300"}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleCourses.map((course) => (
              <article key={course.id} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{course.category}</span>
                <h3 className="mt-4 text-xl font-extrabold">{course.title}</h3>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p className="flex gap-2"><Clock3 size={17} className="text-blue-600" />{course.duration} · {course.mode}</p>
                  <p className="flex gap-2"><CalendarDays size={17} className="text-blue-600" />Next batch: {course.start}</p>
                </div>
                <ul className="my-5 space-y-2 border-y border-slate-100 py-4 text-sm text-slate-600">
                  {course.highlights.map((item) => (
                    <li key={`${course.id}-${item}`} className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-600" />{item}</li>
                  ))}
                </ul>
                <button onClick={() => document.getElementById("admissions")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 font-bold text-blue-600 transition group-hover:gap-3">
                  Enquire about this batch <ArrowRight size={17} />
                </button>
              </article>
            ))}
          </div>
        </section>

        // =====================================
        // Academy methodology section
        // Purpose: explains the teaching approach and value proposition
        // =====================================
        <section id="methodology" className="bg-slate-900 py-20 text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-400">The AdaptEdge advantage</span>
            <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row">
              <h2 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">A system built for clarity, consistency, and confident exam writing.</h2>
              <p className="max-w-md text-slate-300">We turn ambitious goals into a weekly, visible academic plan—not a pile of lectures.</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[[MessageCircle, "1-on-1 Doubt Sessions", "Individual attention when a concept needs more than a quick answer."], [BookOpen, "Curated Study Material", "Exam-aligned notes, practice sets, and revision resources that cut through noise."], [BarChart3, "Weekly Analytics", "Mock-test insights that show what to fix before marks are on the line."], [Users, "Expert Faculty", "Approachable subject specialists who teach the why, not just the answer."]].map(([Icon, title, copy]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="mb-5 inline-flex rounded-xl bg-blue-500/20 p-3 text-blue-300"><Icon size={23} /></div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="success-hub" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-2xl"><span className="text-sm font-bold uppercase tracking-widest text-blue-600">Built for progress</span><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Everything around the classroom, in one place.</h2></div>
              <button onClick={() => document.getElementById("admissions")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 font-bold text-blue-600">Book a free academic consultation <ArrowRight size={17} /></button>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                [BarChart3, "Test-series dashboard", "Mock tests, performance snapshots, weak-topic analysis, and faculty feedback after every test."],
                [MessageCircle, "Doubt-solving support", "Submit doubts, attend scheduled clinics, and book mentor-led sessions for difficult topics."],
                [GraduationCapIcon, "Faculty & demo lectures", "Meet subject specialists, see their teaching approach, and experience a demo class before you join."],
                [Users, "Parent progress updates", "Simple weekly progress conversations keep families informed and students accountable."],
                [BookOpen, "Exam resource library", "Access notes, revision resources, mock-test material, amendments, and important institute updates."],
                [BriefcaseBusiness, "Alumni & career guidance", "Learn from mentors about articleship, internships, practical exposure, and professional opportunities."],
              ].map(([Icon, title, copy]) => (
                <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-blue-200 hover:bg-white hover:shadow-lg hover:shadow-blue-900/5">
                  <div className="inline-flex rounded-xl bg-blue-100 p-3 text-blue-700"><Icon size={22} /></div>
                  <h3 className="mt-5 text-lg font-extrabold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        // =====================================
        // Batch schedule section
        // Purpose: shows upcoming batch timing, faculty, and availability details
        // =====================================
        <section id="schedule" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-blue-600">Plan ahead</span>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Upcoming batch schedule</h2>
            </div>
            <div className="flex rounded-xl bg-slate-100 p-1">
              <button onClick={() => setSchedule("Upcoming Batches")} className={`rounded-lg px-4 py-2 text-sm font-bold ${schedule === "Upcoming Batches" ? "bg-white shadow-sm" : "text-slate-500"}`}>Upcoming Batches</button>
              <button onClick={() => setSchedule("Admission Guidance")} className={`rounded-lg px-4 py-2 text-sm font-bold ${schedule === "Admission Guidance" ? "bg-white shadow-sm" : "text-slate-500"}`}>Admission Guidance</button>
            </div>
          </div>

          {schedule === "Upcoming Batches" ? (
            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>{["Program", "Starts", "Faculty", "Timing", "Availability"].map((h) => <th key={h} className="px-6 py-4">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {content.batches.map((batch) => (
                    <tr key={batch.id} className="border-t border-slate-100">
                      <td className="px-6 py-5 font-bold">{batch.program}</td>
                      <td className="px-6 py-5">{batch.starts}</td>
                      <td className="px-6 py-5">{batch.faculty}</td>
                      <td className="px-6 py-5">{batch.timing}</td>
                      <td className="px-6 py-5">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${batch.status === "Few Seats Left" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
                          {batch.seats} · {batch.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {["CA", "CS & CMA", "B.Com"].map((title, index) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <Zap className="text-blue-600" />
                  <h3 className="mt-4 font-extrabold">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{index === 0 ? "Find the right entry level and batch." : index === 1 ? "Choose the level and group that fits your plan." : "Balance degree preparation with professional goals."}</p>
                  <p className="mt-5 text-sm font-bold text-blue-600">{index === 0 ? "Foundation and Inter counselling" : index === 1 ? "Executive and Intermediate guidance" : "Academic and career roadmap"}</p>
                  <button onClick={() => document.getElementById("admissions")?.scrollIntoView({ behavior: "smooth" })} className="mt-5 text-sm font-bold underline">Book a counselling call</button>
                </div>
              ))}
            </div>
          )}
        </section>

        // =====================================
        // Student results and testimonial section
        // Purpose: builds credibility using achievement outcomes and parent/student quotes
        // =====================================
        <section id="results" className="bg-blue-50 py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">Results that speak</span>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Students and families see the difference.</h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {[["Aarav Mehra", "CA Foundation · 302/400", "The weekly analysis made my weak areas impossible to ignore—and much easier to improve."], ["Riya Patel", "Class 12 Commerce · 96.4%", "Accounts finally clicked because every answer was explained from the principle up."], ["Parent of Ananya S.", "CA Inter student", "The mentorship and regular communication brought real structure to her preparation."]].map(([name, result, quote]) => (
                <figure key={name} className="rounded-2xl bg-white p-7 shadow-sm">
                  <div className="text-3xl font-black text-blue-600">“</div>
                  <blockquote className="mt-2 leading-7 text-slate-700">{quote}</blockquote>
                  <figcaption className="mt-6 border-t border-slate-100 pt-4">
                    <div className="font-bold">{name}</div>
                    <div className="mt-1 text-sm text-blue-600">{result}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        // =====================================
        // Admission form section
        // Purpose: collects student details and sends them through FormSubmit for enquiry intake
        // =====================================
        <section id="admissions" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="grid overflow-hidden rounded-3xl bg-slate-950 lg:grid-cols-[.85fr_1.15fr]">
            <div className="p-8 text-white sm:p-12">
              <span className="text-sm font-bold uppercase tracking-widest text-blue-400">Start your journey</span>
              <h2 className="mt-4 text-3xl font-black leading-tight">Book your free academic consultation.</h2>
              <p className="mt-5 leading-7 text-slate-300">Tell us where you are now. Our counsellor will help you identify the right batch, study plan, and next step.</p>
              <div className="mt-9 space-y-4 text-sm">
                <p className="flex items-center gap-3"><CheckCircle2 className="text-blue-400" size={19} />No-pressure guidance</p>
                <p className="flex items-center gap-3"><CheckCircle2 className="text-blue-400" size={19} />Batch and fee details</p>
                <p className="flex items-center gap-3"><CheckCircle2 className="text-blue-400" size={19} />Demo-class booking</p>
              </div>
            </div>

            <div className="bg-white p-8 sm:p-12">
              <form onSubmit={handleAdmissionSubmit} className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2 text-sm font-bold">
                  Full Name
                  <input name="name" value={formData.name} onChange={handleFormChange} required className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" placeholder="Your name" />
                </label>
                <label className="text-sm font-bold">
                  Email
                  <input name="email" type="email" value={formData.email} onChange={handleFormChange} required className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" placeholder="you@example.com" />
                </label>
                <label className="text-sm font-bold">
                  Phone Number
                  <input name="phone" value={formData.phone} onChange={handleFormChange} required className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" placeholder="+91" />
                </label>
                <label className="text-sm font-bold">
                  Target Course
                  <select name="course" value={formData.course} onChange={handleFormChange} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500">
                    <option>CA Foundation</option>
                    <option>CA Intermediate</option>
                    <option>CA Final</option>
                    <option>CS Executive</option>
                    <option>CS Professional</option>
                    <option>CMA Intermediate</option>
                    <option>CMA Final</option>
                    <option>B.Com</option>
                    <option>Class 11-12 Commerce</option>
                  </select>
                </label>
                <label className="text-sm font-bold">
                  Preferred Mode
                  <select name="mode" value={formData.mode} onChange={handleFormChange} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500">
                    <option>Offline</option>
                    <option>Online</option>
                    <option>Hybrid</option>
                  </select>
                </label>
                <label className="sm:col-span-2 text-sm font-bold">
                  How can we help?
                  <textarea name="message" value={formData.message} onChange={handleFormChange} required className="mt-1.5 min-h-24 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" placeholder="Tell us your target exam or question..." />
                </label>
                <button type="submit" disabled={formStatus.type === "sending"} className="sm:col-span-2 rounded-xl bg-blue-600 px-5 py-4 font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
                  {formStatus.type === "sending" ? "Sending..." : "Request a Free Demo"}
                </button>
                {formStatus.message && (
                  <p className={`sm:col-span-2 text-sm font-medium ${formStatus.type === "success" ? "text-emerald-600" : formStatus.type === "error" ? "text-red-600" : "text-slate-600"}`}>
                    {formStatus.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        // =====================================
        // FAQ accordion section
        // Purpose: answers common student questions in an expandable layout
        // =====================================
        <section className="border-t border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-4xl px-5">
            <h2 className="text-center text-2xl font-black">Questions before you enrol?</h2>
            <div className="mt-7 divide-y divide-slate-200 rounded-2xl border border-slate-200">
              {content.faqs.map((item, index) => (
                <div key={item.id}>
                  <button onClick={() => setFaqOpen(faqOpen === index ? null : index)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-bold">
                    {item.question}
                    <ChevronDown className={`shrink-0 transition ${faqOpen === index ? "rotate-180" : ""}`} />
                  </button>
                  {faqOpen === index && <p className="px-5 pb-5 leading-7 text-slate-600">{item.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        // =====================================
        // Social/community section
        // Purpose: links students to WhatsApp, Telegram, YouTube, Instagram, and other resources
        // =====================================
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-sm font-bold uppercase tracking-widest text-blue-600">Keep learning beyond class</span>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Level up your prep with AdaptEdge.</h2>
              <p className="mt-4 leading-7 text-slate-600">Watch recorded lectures anytime, download study notes, revisit key concepts, and keep learning with a platform built for 5,000+ active students.</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {content.socials.map((card) => (
                <a key={card.title} href={card.url} target="_blank" rel="noreferrer" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5">
                  {card.title.includes("WhatsApp") ? <MessageCircle className="text-blue-600" size={27} /> : card.title.includes("Telegram") ? <Send className="text-blue-600" size={27} /> : card.title.includes("YouTube") ? <PlayCircle className="text-blue-600" size={27} /> : <Camera className="text-blue-600" size={27} />}
                  <h3 className="mt-5 font-extrabold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600">Open Link <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        // =====================================
        // Footer and contact details
        // Purpose: provides center information, quick links, and final contact CTA
        // =====================================
        <footer id="contact" className="bg-slate-950 py-12 text-slate-300">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
            <div>
              <div className="flex items-center gap-2 font-black text-white"><img src={content.brand.logo} alt="" className="h-9 w-9 rounded-lg" />{content.brand.name}</div>
              <p className="mt-4 text-sm leading-6">Concept-led coaching for ambitious commerce and CA students.</p>
            </div>
            <div>
              <h3 className="font-bold text-white">Visit our centre</h3>
              <p className="mt-4 text-sm">{content.contact.address}</p>
              <a href={content.contact.mapLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-400 transition hover:text-blue-300"><MapPin size={16} />Get directions on Google Maps <ArrowRight size={16} /></a>
              <p className="mt-4 text-sm"><span className="font-bold text-white">Admission Enquiry</span><br /><a href={`tel:${content.contact.phone.replace(/\s+/g, "")}`} className="transition hover:text-blue-300">{content.contact.phone}</a><br />{content.contact.email}</p>
            </div>
            <div>
              <h3 className="font-bold text-white">Quick links</h3>
              <div className="mt-4 flex flex-col gap-2 text-sm"><a href="#courses">Programs</a><a href="#results">Student success</a><a href="#schedule">Batch schedule</a></div>
            </div>
            <div>
              <h3 className="font-bold text-white">A note on results</h3>
              <p className="mt-4 text-sm leading-6">Results reflect the performance of individual students and are not a guarantee of future outcomes.</p>
            </div>
          </div>
          <p className="mx-auto mt-10 max-w-7xl border-t border-slate-800 px-5 pt-6 text-xs text-slate-500 lg:px-8">© 2026 AdaptEdge Academy. All rights reserved.</p>
        </footer>

        <a href={content.contact.whatsapp} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-bold text-white shadow-xl shadow-emerald-900/25 transition hover:scale-105"><MessageCircle size={20} />WhatsApp us</a>
      </main>
    </div>
    </AppErrorBoundary>
  );
}
