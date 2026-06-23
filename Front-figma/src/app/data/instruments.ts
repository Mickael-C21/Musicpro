export interface InstrumentCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const instrumentCategories: InstrumentCategory[] = [
  {
    id: "guitares",
    name: "Guitares",
    icon: "Guitar",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "pianos",
    name: "Pianos & Claviers",
    icon: "Piano",
    color: "from-slate-700 to-slate-900"
  },
  {
    id: "batteries",
    name: "Batteries",
    icon: "Drum",
    color: "from-red-500 to-rose-600"
  },
  {
    id: "vents",
    name: "Instruments à Vent",
    icon: "Wind",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "cordes",
    name: "Instruments à Cordes",
    icon: "Music",
    color: "from-purple-500 to-violet-600"
  },
  {
    id: "studio",
    name: "Studio & Production",
    icon: "Mic",
    color: "from-green-500 to-emerald-600"
  }
];

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
