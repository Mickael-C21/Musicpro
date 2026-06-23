import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Phone,
  Calendar,
  Mail,
  CheckCircle2,
  XCircle,
  Loader2,
  CalendarClock,
  FileText,
  AlertCircle,
  ArrowRight,
  Zap,
  MessageCircle,
  Clock
} from "lucide-react";
import { mockAppointments, Appointment } from "../data/mockAppointments";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const statusConfig = {
  immediate: {
    label: "Appel immédiat",
    icon: Zap,
    color: "bg-orange-100 text-orange-700",
    badgeVariant: "secondary" as const
  },
  scheduled: {
    label: "Programmé",
    icon: CalendarClock,
    color: "bg-blue-100 text-blue-700",
    badgeVariant: "default" as const
  },
  "in-progress": {
    label: "En cours",
    icon: Loader2,
    color: "bg-yellow-100 text-yellow-700",
    badgeVariant: "secondary" as const
  },
  completed: {
    label: "Terminé",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-700",
    badgeVariant: "secondary" as const
  },
  cancelled: {
    label: "Annulé",
    icon: XCircle,
    color: "bg-red-100 text-red-700",
    badgeVariant: "destructive" as const
  }
};

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const config = statusConfig[appointment.status];
  const StatusIcon = config.icon;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant={config.badgeVariant} className="gap-1">
                <StatusIcon className={`size-3 ${appointment.status === "in-progress" ? "animate-spin" : ""}`} />
                {config.label}
              </Badge>
              {appointment.duration && (
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="size-3" />
                  {appointment.duration}
                </span>
              )}
              {appointment.category && (
                <Badge variant="outline" className="text-xs">
                  {appointment.category}
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg">{appointment.subject}</CardTitle>
            <CardDescription className="mt-1">
              Demandé le {format(new Date(appointment.createdAt), "dd MMMM yyyy à HH:mm", { locale: fr })}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Contact Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-slate-700">
            <Phone className="size-4 text-slate-400" />
            <span className="font-medium">{appointment.customerName}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">{appointment.phone}</span>
          </div>
          
          {appointment.email && (
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="size-4 text-slate-400" />
              <span className="text-slate-600">{appointment.email}</span>
            </div>
          )}

          {appointment.scheduledDate && appointment.scheduledTime && (
            <div className="flex items-center gap-2 text-slate-700">
              <Calendar className="size-4 text-slate-400" />
              <span className="text-slate-600">
                {format(new Date(appointment.scheduledDate), "EEEE dd MMMM yyyy", { locale: fr })} à {appointment.scheduledTime}
              </span>
            </div>
          )}

          {appointment.status === "immediate" && (
            <div className="flex items-center gap-2 text-orange-700 bg-orange-50 p-2 rounded">
              <Zap className="size-4" />
              <span className="text-xs font-medium">En attente de rappel dans les 5 minutes</span>
            </div>
          )}
        </div>

        {/* Chat Context */}
        {appointment.chatContext && (
          <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
            <div className="flex items-start gap-2">
              <MessageCircle className="size-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-purple-900 mb-1">
                  Contexte de conversation
                </p>
                <p className="text-sm text-purple-700">
                  {appointment.chatContext}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        {appointment.summary && (
          <div className={`p-3 rounded-lg ${
            appointment.status === "cancelled" 
              ? "bg-red-50 border border-red-200" 
              : "bg-green-50 border border-green-200"
          }`}>
            <div className="flex items-start gap-2">
              {appointment.status === "cancelled" ? (
                <AlertCircle className="size-4 text-red-600 mt-0.5 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <p className={`text-xs font-medium mb-1 ${
                  appointment.status === "cancelled" ? "text-red-900" : "text-green-900"
                }`}>
                  {appointment.status === "cancelled" ? "Raison de l'annulation" : "Résumé de l'appel"}
                </p>
                <p className={`text-sm ${
                  appointment.status === "cancelled" ? "text-red-700" : "text-green-700"
                }`}>
                  {appointment.summary}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Advisor Notes */}
        {appointment.advisorNotes && (
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-start gap-2">
              <FileText className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-blue-900 mb-1">
                  Notes du conseiller
                </p>
                <p className="text-sm text-blue-700">
                  {appointment.advisorNotes}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        {appointment.status === "cancelled" && (
          <Button variant="outline" size="sm" className="w-full gap-2">
            <Phone className="size-4" />
            Replanifier un appel
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function AppointmentTracking() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const filteredAppointments = activeTab === "all" 
    ? mockAppointments 
    : mockAppointments.filter(apt => apt.status === activeTab);

  const stats = {
    total: mockAppointments.length,
    immediate: mockAppointments.filter(a => a.status === "immediate").length,
    scheduled: mockAppointments.filter(a => a.status === "scheduled").length,
    inProgress: mockAppointments.filter(a => a.status === "in-progress").length,
    completed: mockAppointments.filter(a => a.status === "completed").length,
    cancelled: mockAppointments.filter(a => a.status === "cancelled").length
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Mes rendez-vous
        </h1>
        <p className="text-slate-600">
          Suivez vos demandes d'appel et consultez les résumés de vos échanges
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
              <p className="text-sm text-slate-600 mt-1">Total</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">{stats.immediate}</p>
              <p className="text-sm text-slate-600 mt-1">Immédiats</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.scheduled}</p>
              <p className="text-sm text-slate-600 mt-1">Programmés</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
              <p className="text-sm text-slate-600 mt-1">En cours</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              <p className="text-sm text-slate-600 mt-1">Terminés</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
              <p className="text-sm text-slate-600 mt-1">Annulés</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="immediate">Immédiats</TabsTrigger>
          <TabsTrigger value="scheduled">Programmés</TabsTrigger>
          <TabsTrigger value="in-progress">En cours</TabsTrigger>
          <TabsTrigger value="completed">Terminés</TabsTrigger>
          <TabsTrigger value="cancelled">Annulés</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredAppointments.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <CalendarClock className="size-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  Aucun rendez-vous
                </h3>
                <p className="text-slate-600 mb-6">
                  Vous n'avez pas encore de rendez-vous dans cette catégorie
                </p>
                <div className="flex gap-3 justify-center">
                  <Link to="/chat">
                    <Button className="gap-2" variant="outline">
                      <MessageCircle className="size-4" />
                      Discuter avec le ChatBot
                    </Button>
                  </Link>
                  <Link to="/rendez-vous">
                    <Button className="gap-2">
                      <Phone className="size-4" />
                      Demander un appel
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Empty State for new users */}
      {mockAppointments.length === 0 && (
        <Card className="p-12 text-center">
          <div className="max-w-md mx-auto">
            <Phone className="size-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-2">
              Aucun rendez-vous
            </h3>
            <p className="text-slate-600 mb-6">
              Commencez par discuter avec notre ChatBot ou planifiez directement un appel avec nos experts
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/chat">
                <Button size="lg" variant="outline" className="gap-2">
                  <MessageCircle className="size-5" />
                  ChatBot
                </Button>
              </Link>
              <Link to="/rendez-vous">
                <Button size="lg" className="gap-2">
                  <Phone className="size-5" />
                  Demander un appel
                  <ArrowRight className="size-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
