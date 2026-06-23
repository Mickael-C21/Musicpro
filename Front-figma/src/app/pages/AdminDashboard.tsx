import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Calendar,
  Phone,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Users,
  BarChart3,
  MessageSquare,
  Filter
} from "lucide-react";

interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  productInterest: string;
  type: "immediate" | "scheduled";
  date?: string;
  time?: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  notes: string;
  agentNotes?: string;
  createdAt: string;
}

// Données de démonstration
const mockAppointments: Appointment[] = [
  {
    id: "1",
    clientName: "Marie Dubois",
    clientEmail: "marie.dubois@email.fr",
    clientPhone: "06 12 34 56 78",
    productInterest: "Guitare Acoustique Yamaha FG800",
    type: "immediate",
    status: "pending",
    notes: "Débutante, cherche une guitare pour apprendre",
    createdAt: "2026-04-23T10:30:00",
  },
  {
    id: "2",
    clientName: "Thomas Martin",
    clientEmail: "thomas.m@email.fr",
    clientPhone: "06 98 76 54 32",
    productInterest: "Piano Numérique Yamaha P-125",
    type: "scheduled",
    date: "2026-04-24",
    time: "14:00",
    status: "in_progress",
    notes: "Pianiste intermédiaire, veut upgrader son matériel",
    agentNotes: "Client très intéressé, budget 800€",
    createdAt: "2026-04-22T15:20:00",
  },
  {
    id: "3",
    clientName: "Sophie Laurent",
    clientEmail: "sophie.l@email.fr",
    clientPhone: "06 45 67 89 12",
    productInterest: "Batterie Électronique Alesis Nitro Mesh",
    type: "scheduled",
    date: "2026-04-23",
    time: "16:30",
    status: "completed",
    notes: "Habite en appartement, besoin de quelque chose de silencieux",
    agentNotes: "Commande passée - Livraison prévue dans 3 jours",
    createdAt: "2026-04-21T09:15:00",
  },
];

export function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  useEffect(() => {
    if (!user) {
      navigate("/admin");
    } else if (!isAdmin) {
      navigate("/");
    }
  }, [user, isAdmin, navigate]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [agentNote, setAgentNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const statusConfig = {
    pending: { label: "En attente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    in_progress: { label: "En cours", color: "bg-blue-100 text-blue-800", icon: Phone },
    completed: { label: "Terminé", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
    cancelled: { label: "Annulé", color: "bg-red-100 text-red-800", icon: XCircle },
  };

  const updateStatus = (appointmentId: string, newStatus: Appointment["status"]) => {
    setAppointments(prev =>
      prev.map(apt => apt.id === appointmentId ? { ...apt, status: newStatus } : apt)
    );
  };

  const saveAgentNote = (appointmentId: string) => {
    setAppointments(prev =>
      prev.map(apt => apt.id === appointmentId ? { ...apt, agentNotes: agentNote } : apt)
    );
    setAgentNote("");
    setSelectedAppointment(null);
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch =
      apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.productInterest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.clientEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === "all" || apt.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === "pending").length,
    inProgress: appointments.filter(a => a.status === "in_progress").length,
    completed: appointments.filter(a => a.status === "completed").length,
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Tableau de bord Agent
        </h1>
        <p className="text-slate-600">
          Bienvenue {user?.name} - Gérez vos rendez-vous clients
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total rendez-vous</p>
                <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="size-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">En attente</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="size-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">En cours</p>
                <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Phone className="size-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Terminés</p>
                <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle2 className="size-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                placeholder="Rechercher un client, produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                size="sm"
              >
                Tous
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                onClick={() => setFilterStatus("pending")}
                size="sm"
              >
                En attente
              </Button>
              <Button
                variant={filterStatus === "in_progress" ? "default" : "outline"}
                onClick={() => setFilterStatus("in_progress")}
                size="sm"
              >
                En cours
              </Button>
              <Button
                variant={filterStatus === "completed" ? "default" : "outline"}
                onClick={() => setFilterStatus("completed")}
                size="sm"
              >
                Terminés
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <AlertCircle className="size-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">Aucun rendez-vous trouvé</p>
            </CardContent>
          </Card>
        ) : (
          filteredAppointments.map((appointment) => {
            const StatusIcon = statusConfig[appointment.status].icon;
            return (
              <Card key={appointment.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Client Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900">{appointment.clientName}</h3>
                          <p className="text-sm text-slate-600">{appointment.clientEmail}</p>
                          <p className="text-sm text-slate-600">{appointment.clientPhone}</p>
                        </div>
                        <Badge className={statusConfig[appointment.status].color}>
                          <StatusIcon className="size-3 mr-1" />
                          {statusConfig[appointment.status].label}
                        </Badge>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-slate-700 mb-1">Produit d'intérêt</p>
                        <p className="text-slate-900">{appointment.productInterest}</p>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant={appointment.type === "immediate" ? "default" : "secondary"}>
                            {appointment.type === "immediate" ? "Immédiat" : "Programmé"}
                          </Badge>
                        </div>
                        {appointment.type === "scheduled" && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="size-4" />
                            <span>{appointment.date} à {appointment.time}</span>
                          </div>
                        )}
                      </div>

                      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-900 mb-1">
                          <MessageSquare className="size-4 inline mr-1" />
                          Notes du client
                        </p>
                        <p className="text-sm text-blue-800">{appointment.notes}</p>
                      </div>

                      {appointment.agentNotes && (
                        <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                          <p className="text-sm font-medium text-green-900 mb-1">
                            Notes de l'agent
                          </p>
                          <p className="text-sm text-green-800">{appointment.agentNotes}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="lg:w-64 space-y-3">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-700">Changer le statut</p>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            size="sm"
                            variant={appointment.status === "pending" ? "default" : "outline"}
                            onClick={() => updateStatus(appointment.id, "pending")}
                          >
                            En attente
                          </Button>
                          <Button
                            size="sm"
                            variant={appointment.status === "in_progress" ? "default" : "outline"}
                            onClick={() => updateStatus(appointment.id, "in_progress")}
                          >
                            En cours
                          </Button>
                          <Button
                            size="sm"
                            variant={appointment.status === "completed" ? "default" : "outline"}
                            onClick={() => updateStatus(appointment.id, "completed")}
                          >
                            Terminé
                          </Button>
                          <Button
                            size="sm"
                            variant={appointment.status === "cancelled" ? "destructive" : "outline"}
                            onClick={() => updateStatus(appointment.id, "cancelled")}
                          >
                            Annuler
                          </Button>
                        </div>
                      </div>

                      {selectedAppointment?.id === appointment.id ? (
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Ajouter une note..."
                            value={agentNote}
                            onChange={(e) => setAgentNote(e.target.value)}
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => saveAgentNote(appointment.id)}
                              className="flex-1"
                            >
                              Enregistrer
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedAppointment(null);
                                setAgentNote("");
                              }}
                            >
                              Annuler
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setAgentNote(appointment.agentNotes || "");
                          }}
                        >
                          <MessageSquare className="size-4 mr-2" />
                          Ajouter une note
                        </Button>
                      )}

                      <Button
                        size="sm"
                        className="w-full gap-2"
                        onClick={() => window.location.href = `tel:${appointment.clientPhone}`}
                      >
                        <Phone className="size-4" />
                        Appeler le client
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
