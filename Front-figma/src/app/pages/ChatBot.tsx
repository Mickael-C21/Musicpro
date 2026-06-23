import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { 
  Send, 
  Bot, 
  User, 
  Phone, 
  Loader2,
  Music,
  Sparkles
} from "lucide-react";
import { ChatMessage } from "../data/instruments";

const categoryMessages: Record<string, string> = {
  guitares: "Bonjour ! 👋 Je vois que vous vous intéressez aux guitares. Excellent choix ! Je peux vous renseigner sur nos guitares acoustiques, électriques ou classiques. Que recherchez-vous ?",
  pianos: "Bonjour ! 👋 Bienvenue dans notre espace pianos et claviers ! Je peux vous aider à choisir entre un piano acoustique, numérique ou un synthétiseur. Qu'est-ce qui vous intéresse ?",
  batteries: "Bonjour ! 👋 Vous vous intéressez aux batteries ? Parfait ! Je peux vous conseiller sur les batteries acoustiques, électroniques ou les percussions. Que souhaitez-vous savoir ?",
  vents: "Bonjour ! 👋 Les instruments à vent sont magnifiques ! Je peux vous renseigner sur les saxophones, trompettes, flûtes et clarinettes. Qu'est-ce qui vous attire ?",
  cordes: "Bonjour ! 👋 Les instruments à cordes ont un charme unique ! Je peux vous parler des violons, violoncelles et contrebasses. Que recherchez-vous ?",
  studio: "Bonjour ! 👋 Vous vous intéressez au matériel studio ? Excellent ! Je peux vous conseiller sur les interfaces audio, microphones et équipements de production. Comment puis-je vous aider ?"
};

const predefinedQuestions = [
  "Je cherche une guitare pour débuter",
  "Quelle est la différence entre un piano acoustique et numérique ?",
  "Budget pour une batterie électronique ?",
  "Instruments pour un enfant de 8 ans"
];

export function ChatBot() {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category;
  
  const initialMessages: ChatMessage[] = [
    {
      id: "1",
      role: "assistant",
      content: category && categoryMessages[category] 
        ? categoryMessages[category]
        : "Bonjour ! 👋 Je suis votre assistant virtuel MusicPro. Je peux vous aider à trouver l'instrument parfait pour vous. Que recherchez-vous aujourd'hui ?",
      timestamp: new Date()
    }
  ];
  
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("guitare") && lowerMessage.includes("début")) {
      return "Excellente question ! Pour débuter à la guitare, je vous recommande :\n\n🎸 Guitare acoustique (300-500€) : Son chaleureux, idéale pour apprendre les bases\n🎸 Guitare électrique (400-600€) : Plus facile à jouer, parfaite pour le rock/pop\n\nVoulez-vous que je vous mette en contact avec un conseiller pour un accompagnement personnalisé ? 📞";
    }

    if (lowerMessage.includes("piano")) {
      return "Piano acoustique vs numérique :\n\n🎹 Piano acoustique : Son authentique, toucher traditionnel, nécessite de l'espace (à partir de 3000€)\n🎹 Piano numérique : Toucher lourd réaliste, volume réglable, compact (à partir de 500€)\n\nPour quel usage ? Appartement ou maison ? Je peux vous orienter vers le bon choix. Souhaitez-vous un appel avec nos experts ? 📞";
    }

    if (lowerMessage.includes("batterie")) {
      return "Pour une batterie électronique, comptez :\n\n🥁 Débutant : 400-800€\n drummer Intermédiaire : 800-1500€\n drummer Pro : 1500€+\n\nLes batteries électroniques sont parfaites pour jouer en appartement ! Voulez-vous discuter avec un spécialiste pour trouver le modèle idéal ? 📞";
    }

    if (lowerMessage.includes("enfant") || lowerMessage.includes("8 ans")) {
      return "Pour un enfant de 8 ans, je recommande :\n\n🎵 Guitare 3/4 (taille adaptée)\n🎵 Clavier 61 touches\n🎵 Ukulélé (facile et ludique)\n🎵 Batterie électronique compacte\n\nL'important est de choisir selon ses goûts ! Un de nos conseillers peut vous aider à faire le bon choix. Souhaitez-vous être rappelé ? 📞";
    }

    // Default response for complex questions
    return "C'est une excellente question ! Pour vous donner la meilleure réponse possible et des conseils vraiment personnalisés, je vous propose de vous mettre en relation avec un de nos experts. Ils pourront vous guider en fonction de vos besoins précis. Souhaitez-vous planifier un appel de 15 minutes ? 📞";
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = generateResponse(text);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleRequestCall = () => {
    // Store chat context for the appointment form
    const chatContext = messages
      .filter(m => m.role === "user")
      .map(m => m.content)
      .join(" | ");
    
    sessionStorage.setItem("chatContext", chatContext);
    navigate("/rendez-vous");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-200px)] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg">
                    <Bot className="size-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Assistant MusicPro</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                      <CardDescription className="text-xs">En ligne</CardDescription>
                    </div>
                  </div>
                </div>
                <Badge className="gap-1">
                  <Sparkles className="size-3" />
                  IA
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`size-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user" 
                      ? "bg-blue-600" 
                      : "bg-gradient-to-br from-purple-500 to-indigo-600"
                  }`}>
                    {message.role === "user" ? (
                      <User className="size-4 text-white" />
                    ) : (
                      <Bot className="size-4 text-white" />
                    )}
                  </div>
                  <div className={`flex-1 ${message.role === "user" ? "flex justify-end" : ""}`}>
                    <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-900"
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.role === "user" ? "text-blue-100" : "text-slate-500"
                      }`}>
                        {message.timestamp.toLocaleTimeString("fr-FR", { 
                          hour: "2-digit", 
                          minute: "2-digit" 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="size-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="size-4 text-white" />
                  </div>
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="size-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="size-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="size-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </CardContent>

            <CardFooter className="border-t p-4">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2 w-full"
              >
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Posez votre question..."
                  disabled={isTyping}
                  className="flex-1"
                />
                <Button type="submit" disabled={!inputValue.trim() || isTyping} className="gap-2">
                  <Send className="size-4" />
                  <span className="hidden sm:inline">Envoyer</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleRequestCall}
                className="w-full gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Phone className="size-4" />
                Demander un appel
              </Button>
              <p className="text-xs text-slate-500 text-center">
                Échangez avec un expert en 15 minutes
              </p>
            </CardContent>
          </Card>

          {/* Predefined Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Music className="size-5" />
                Questions fréquentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {predefinedQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(question)}
                  disabled={isTyping}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all text-sm disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="bg-gradient-to-br from-slate-900 to-slate-700 text-white border-none">
            <CardContent className="p-6">
              <Bot className="size-10 mb-3 opacity-80" />
              <h3 className="font-bold mb-2">Besoin d'aide ?</h3>
              <p className="text-sm text-slate-300 mb-4">
                Notre IA est là pour répondre à toutes vos questions. Si besoin, nous vous mettons en contact avec un expert.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="size-2 bg-green-400 rounded-full animate-pulse" />
                <span>Disponible 24/7</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}