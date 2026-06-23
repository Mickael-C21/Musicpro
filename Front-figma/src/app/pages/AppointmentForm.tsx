import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon,
  Clock,
  Phone,
  User,
  Mail,
  MessageSquare,
  Zap,
  CheckCircle2,
  Music
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

export function AppointmentForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [chatContext, setChatContext] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    date: undefined as Date | undefined,
    time: ""
  });

  const [callType, setCallType] = useState<"immediate" | "scheduled">("immediate");

  useEffect(() => {
    // Get chat context if coming from chatbot
    const context = sessionStorage.getItem("chatContext");
    if (context) {
      setChatContext(context);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (callType === "scheduled" && (!formData.date || !formData.time)) {
      toast.error("Veuillez sélectionner une date et une heure");
      return;
    }

    // Simulate API call
    if (callType === "immediate") {
      toast.success("Demande d'appel envoyée !", {
        description: "Un de nos conseillers va vous appeler dans les 5 prochaines minutes"
      });
    } else {
      toast.success("Rendez-vous confirmé !", {
        description: `Votre appel est prévu le ${format(formData.date!, "dd MMMM yyyy", { locale: fr })} à ${formData.time}`
      });
    }

    // Clear chat context
    sessionStorage.removeItem("chatContext");

    setTimeout(() => {
      navigate("/mes-rendez-vous");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link to="/chat">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="size-4" />
          Retour au chat
        </Button>
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Info Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-4 sticky top-24">
            <Card>
              <CardHeader>
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-lg w-fit mb-3">
                  <Phone className="size-6 text-white" />
                </div>
                <CardTitle className="text-lg">Appel avec un expert</CardTitle>
                <CardDescription>
                  Échangez avec un conseiller passionné pendant 15 minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Conseils personnalisés</p>
                    <p className="text-xs text-slate-600">Selon votre niveau et budget</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Sans engagement</p>
                    <p className="text-xs text-slate-600">Service gratuit</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Disponible rapidement</p>
                    <p className="text-xs text-slate-600">Appel immédiat ou programmé</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {chatContext && (
              <Card className="bg-purple-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <MessageSquare className="size-4" />
                    Contexte de la conversation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-slate-700 line-clamp-3">
                    {chatContext}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Demande d'appel</CardTitle>
              <CardDescription>
                Choisissez entre un appel immédiat ou programmé selon vos disponibilités
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Call Type Selection */}
                <div>
                  <Label className="mb-3 block">Type d'appel *</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setCallType("immediate")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        callType === "immediate"
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div className={`p-2 rounded-lg ${
                          callType === "immediate" ? "bg-blue-500" : "bg-slate-300"
                        }`}>
                          <Zap className="size-5 text-white" />
                        </div>
                      </div>
                      <p className="font-medium text-sm mb-1">Appel immédiat</p>
                      <p className="text-xs text-slate-500">Dans les 5 minutes</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCallType("scheduled")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        callType === "scheduled"
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div className={`p-2 rounded-lg ${
                          callType === "scheduled" ? "bg-blue-500" : "bg-slate-300"
                        }`}>
                          <CalendarIcon className="size-5 text-white" />
                        </div>
                      </div>
                      <p className="font-medium text-sm mb-1">Planifier</p>
                      <p className="text-xs text-slate-500">Choisir date et heure</p>
                    </button>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                        <User className="size-4" />
                        Nom complet *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Jean Dupont"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                        <Phone className="size-4" />
                        Téléphone *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+33 6 12 34 56 78"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                      <Mail className="size-4" />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jean.dupont@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="flex items-center gap-2 mb-2">
                      <Music className="size-4" />
                      Sujet de l'appel (optionnel)
                    </Label>
                    <Textarea
                      id="subject"
                      placeholder="Ex: Conseil pour choisir une guitare électrique pour débuter..."
                      rows={3}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Cela aidera notre conseiller à mieux vous accompagner
                    </p>
                  </div>
                </div>

                {/* Scheduling */}
                {callType === "scheduled" && (
                  <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarIcon className="size-5 text-slate-700" />
                      <h3 className="font-medium text-slate-900">Choisir un créneau</h3>
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 size-4" />
                            {formData.date ? (
                              format(formData.date, "EEEE dd MMMM yyyy", { locale: fr })
                            ) : (
                              <span className="text-slate-500">Sélectionner une date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.date}
                            onSelect={(date) => setFormData({ ...formData, date })}
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today || date.getDay() === 0 || date.getDay() === 6;
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="text-xs text-slate-500 mt-1">
                        Du lundi au vendredi uniquement
                      </p>
                    </div>

                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <Clock className="size-4" />
                        Heure souhaitée *
                      </Label>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setFormData({ ...formData, time })}
                            className={`p-2 rounded text-sm transition-all ${
                              formData.time === time
                                ? "bg-blue-600 text-white"
                                : "bg-white border border-slate-200 hover:border-blue-300"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Immediate Call Info */}
                {callType === "immediate" && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Zap className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900 mb-1">
                          Appel immédiat
                        </p>
                        <p className="text-sm text-blue-700">
                          Un de nos conseillers vous appellera dans les 5 prochaines minutes sur le numéro indiqué. 
                          Assurez-vous d'être disponible !
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex gap-3">
                <Link to="/chat" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Annuler
                  </Button>
                </Link>
                <Button type="submit" className="flex-1 gap-2">
                  {callType === "immediate" ? (
                    <>
                      <Zap className="size-4" />
                      Être rappelé maintenant
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="size-4" />
                      Confirmer le rendez-vous
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
