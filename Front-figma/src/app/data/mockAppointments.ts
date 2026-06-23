export interface Appointment {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  subject: string;
  category: string;
  chatContext?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  status: "immediate" | "scheduled" | "in-progress" | "completed" | "cancelled";
  createdAt: string;
  summary?: string;
  duration?: string;
  advisorNotes?: string;
}

export const mockAppointments: Appointment[] = [
  {
    id: "1",
    customerName: "Thomas Bernard",
    phone: "+33 6 12 34 56 78",
    email: "thomas.bernard@email.com",
    subject: "Conseil guitare électrique débutant",
    category: "guitares",
    chatContext: "Le client hésite entre une Stratocaster et une Les Paul pour débuter. Budget 800-1000€.",
    scheduledDate: "2026-03-28",
    scheduledTime: "14:30",
    status: "completed",
    createdAt: "2026-03-25T10:30:00",
    summary: "Client conseillé sur une Fender Player Stratocaster. Commande passée avec pack ampli. Livraison prévue dans 3 jours.",
    duration: "12 min",
    advisorNotes: "Client très intéressé par les cours en ligne. Proposer offre découverte."
  },
  {
    id: "2",
    customerName: "Sophie Laurent",
    phone: "+33 6 23 45 67 89",
    email: "sophie.laurent@email.com",
    subject: "Question sur piano numérique",
    category: "pianos",
    chatContext: "Cherche un piano numérique pour appartement. Toucher lourd important. Budget flexible.",
    scheduledDate: "2026-03-27",
    scheduledTime: "10:00",
    status: "scheduled",
    createdAt: "2026-03-26T09:15:00"
  },
  {
    id: "3",
    customerName: "Marc Dubois",
    phone: "+33 6 34 56 78 90",
    email: "marc.dubois@email.com",
    subject: "Demande immédiate - Batterie électronique",
    category: "batteries",
    status: "immediate",
    createdAt: "2026-03-26T14:22:00"
  },
  {
    id: "4",
    customerName: "Julie Martin",
    phone: "+33 6 45 67 89 01",
    email: "julie.martin@email.com",
    subject: "Réparation saxophone",
    category: "vents",
    chatContext: "Saxophone alto avec problème de clés. Besoin estimation réparation.",
    scheduledDate: "2026-03-26",
    scheduledTime: "16:00",
    status: "in-progress",
    createdAt: "2026-03-26T08:00:00"
  }
];
