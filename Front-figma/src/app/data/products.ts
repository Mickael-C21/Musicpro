export interface Product {
  id: number | string;
  name: string;
  category: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  features: string[];
  specifications: {
    brand: string;
    model: string;
    year: number;
    condition: string;
  };
  inStock: boolean;
}

export const products: Product[] = [
  // Guitares
  {
    id: "guitar-1",
    name: "Guitare Acoustique Yamaha FG800",
    category: "guitares",
    price: 249,
    description: "Guitare acoustique idéale pour débutants et intermédiaires",
    longDescription: "La Yamaha FG800 est une guitare acoustique folk qui offre un excellent rapport qualité-prix. Sa table en épicéa massif produit un son riche et équilibré, tandis que son dos et ses éclisses en nato offrent une résonance chaleureuse. Parfaite pour les débutants comme pour les guitaristes confirmés.",
    image: "https://images.unsplash.com/photo-1760413209602-bb726f8830f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: [
      "Table en épicéa massif",
      "Dos et éclisses en nato",
      "Finition naturelle brillante",
      "Action confortable pour débutants",
      "Son équilibré et chaleureux"
    ],
    specifications: {
      brand: "Yamaha",
      model: "FG800",
      year: 2024,
      condition: "Neuf"
    },
    inStock: true
  },
  {
    id: "guitar-2",
    name: "Guitare Électrique Fender Stratocaster",
    category: "guitares",
    price: 899,
    description: "La légendaire Stratocaster, polyvalente et iconique",
    longDescription: "La Fender Stratocaster est l'une des guitares électriques les plus emblématiques de l'histoire. Avec ses trois micros simple bobinage et son sélecteur 5 positions, elle offre une palette sonore exceptionnelle. Son corps en aulne et son manche en érable garantissent un confort de jeu optimal.",
    image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: [
      "3 micros simple bobinage",
      "Sélecteur 5 positions",
      "Corps en aulne",
      "Manche en érable vissé",
      "Chevalet tremolo synchronisé"
    ],
    specifications: {
      brand: "Fender",
      model: "Player Stratocaster",
      year: 2024,
      condition: "Neuf"
    },
    inStock: true
  },

  // Pianos
  {
    id: "piano-1",
    name: "Piano Numérique Yamaha P-125",
    category: "pianos",
    price: 699,
    description: "Piano numérique portable avec toucher authentique",
    longDescription: "Le Yamaha P-125 est un piano numérique compact qui offre un toucher et un son exceptionnels. Équipé de 88 touches lestées GHS (Graded Hammer Standard) et du son Pure CF, il reproduit fidèlement la sensation et la sonorité d'un piano acoustique. Idéal pour la pratique à domicile ou sur scène.",
    image: "https://images.unsplash.com/photo-1621025397024-ad4b63b0e706?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: [
      "88 touches lestées GHS",
      "Son Pure CF échantillonné",
      "192 notes de polyphonie",
      "Métronome et enregistreur intégrés",
      "Connexion USB vers ordinateur"
    ],
    specifications: {
      brand: "Yamaha",
      model: "P-125",
      year: 2024,
      condition: "Neuf"
    },
    inStock: true
  },
  {
    id: "piano-2",
    name: "Synthétiseur Roland JUNO-DS88",
    category: "pianos",
    price: 1299,
    description: "Synthétiseur professionnel 88 touches",
    longDescription: "Le Roland JUNO-DS88 est un synthétiseur de scène complet avec 88 touches. Il offre une vaste bibliothèque de sons professionnels, des effets de haute qualité et une interface intuitive. Parfait pour les performances live et la production en studio.",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: [
      "88 touches lestées",
      "Plus de 1000 sons",
      "Effets professionnels intégrés",
      "Séquenceur 8 pistes",
      "Entrée/sortie MIDI complète"
    ],
    specifications: {
      brand: "Roland",
      model: "JUNO-DS88",
      year: 2023,
      condition: "Neuf"
    },
    inStock: true
  },

  // Batteries
  {
    id: "drum-1",
    name: "Batterie Acoustique Pearl Export",
    category: "batteries",
    price: 799,
    description: "Batterie acoustique complète 5 fûts",
    longDescription: "La Pearl Export est une batterie acoustique de qualité professionnelle, idéale pour les débutants et intermédiaires. Elle comprend 5 fûts (grosse caisse 22', tom 10', tom 12', tom basse 16', caisse claire 14') en peuplier 6 plis. Son excellent rapport qualité-prix en fait un choix privilégié depuis des décennies.",
    image: "https://images.unsplash.com/photo-1647788738075-d9363b39fac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: [
      "5 fûts en peuplier",
      "Grosse caisse 22 pouces",
      "Caisse claire 14 pouces",
      "Cymbales incluses",
      "Hardware professionnel"
    ],
    specifications: {
      brand: "Pearl",
      model: "Export EXX725",
      year: 2024,
      condition: "Neuf"
    },
    inStock: true
  },
  {
    id: "drum-2",
    name: "Batterie Électronique Alesis Nitro Mesh",
    category: "batteries",
    price: 499,
    description: "Batterie électronique avec peaux mesh",
    longDescription: "La batterie électronique Alesis Nitro Mesh offre une expérience de jeu silencieuse avec ses peaux mesh qui reproduisent la sensation naturelle d'une batterie acoustique. Avec 385 sons et 60 play-along tracks, c'est l'instrument idéal pour pratiquer à domicile sans déranger les voisins.",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: [
      "Peaux mesh ultra-silencieuses",
      "385 sons de batterie",
      "60 play-along tracks",
      "Sortie casque et USB-MIDI",
      "Rack stable et ajustable"
    ],
    specifications: {
      brand: "Alesis",
      model: "Nitro Mesh Kit",
      year: 2024,
      condition: "Neuf"
    },
    inStock: true
  },

  // Instruments à vent
  {
    id: "wind-1",
    name: "Saxophone Alto Yamaha YAS-280",
    category: "vents",
    price: 1199,
    description: "Saxophone alto étudiant de qualité professionnelle",
    longDescription: "Le Yamaha YAS-280 est un saxophone alto conçu pour les étudiants mais avec une qualité de fabrication professionnelle. Il offre une excellente justesse, une mécanique fiable et un son riche. Livré avec étui, bec et anche.",
    image: "https://images.unsplash.com/photo-1725830071503-d705ef4a0975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: [
      "Corps en laiton doré",
      "Clétage ergonomique",
      "Justesse améliorée",
      "Étui rigide inclus",
      "Bec et anche fournis"
    ],
    specifications: {
      brand: "Yamaha",
      model: "YAS-280",
      year: 2024,
      condition: "Neuf"
    },
    inStock: true
  },

  // Instruments à cordes
  {
    id: "string-1",
    name: "Violon Stentor Student II",
    category: "cordes",
    price: 349,
    description: "Violon étudiant 4/4 complet avec archet et étui",
    longDescription: "Le Stentor Student II est un excellent violon pour débutants et étudiants. Fabriqué en bois massif, il offre un son chaleureux et une excellente jouabilité. Livré avec archet en bois du Brésil, étui, colophane et mentonnière.",
    image: "https://images.unsplash.com/photo-1626234042769-7966a61f42f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: [
      "Table en épicéa massif",
      "Fond et éclisses en érable",
      "Archet en bois du Brésil",
      "Étui léger inclus",
      "Colophane fournie"
    ],
    specifications: {
      brand: "Stentor",
      model: "Student II 1500",
      year: 2024,
      condition: "Neuf"
    },
    inStock: true
  },

  // Studio & Production
  {
    id: "studio-1",
    name: "Interface Audio Focusrite Scarlett 2i2",
    category: "studio",
    price: 189,
    description: "Interface audio USB 2 entrées / 2 sorties",
    longDescription: "La Focusrite Scarlett 2i2 est l'interface audio USB la plus populaire au monde. Avec ses préamplis Scarlett de 3ème génération et sa conversion 24-bit/192kHz, elle offre un son cristallin pour l'enregistrement vocal et instrumental. Parfaite pour le home studio.",
    image: "https://images.unsplash.com/photo-1642177255157-fe900ab513e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: [
      "Préamplis Scarlett 3ème gen",
      "Conversion 24-bit/192kHz",
      "Mode Air pour brillance vocale",
      "Alimenté par USB-C",
      "Logiciels inclus"
    ],
    specifications: {
      brand: "Focusrite",
      model: "Scarlett 2i2 Gen 3",
      year: 2024,
      condition: "Neuf"
    },
    inStock: true
  },
  {
    id: "studio-2",
    name: "Microphone Condensateur Rode NT1-A",
    category: "studio",
    price: 269,
    description: "Microphone studio à large membrane",
    longDescription: "Le Rode NT1-A est un microphone à condensateur à large membrane reconnu pour sa faible auto-bruit et sa clarté sonore exceptionnelle. Idéal pour l'enregistrement vocal, il est livré avec suspension anti-choc, filtre anti-pop et câble XLR de qualité.",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: [
      "Large membrane 1 pouce",
      "Auto-bruit ultra-faible (5dB-A)",
      "Réponse en fréquence étendue",
      "Suspension et filtre inclus",
      "Câble XLR 6 mètres"
    ],
    specifications: {
      brand: "Rode",
      model: "NT1-A",
      year: 2024,
      condition: "Neuf"
    },
    inStock: true
  }
];
