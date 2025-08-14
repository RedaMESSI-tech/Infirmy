export const services = [
  {
    group: "Visage",
    desc: "Traitement précis et efficace pour un visage parfaitement épilé",
    items: [
      { label: "Lèvre supérieure", price: 45 },
      { label: "Menton", price: 35 },
      { label: "Joues", price: 55 },
      { label: "Visage complet", price: 120 },
      { label: "Sourcils (forme)", price: 25 }
    ]
  },
  {
    group: "Haut du Corps",
    desc: "Épilation efficace pour toutes les zones du haut du corps",
    items: [
      { label: "Aisselles", price: 65 },
      { label: "Bras (avant-bras)", price: 85 },
      { label: "Bras (complet)", price: 120 },
      { label: "Dos", price: 150 },
      { label: "Poitrine", price: 100 },
      { label: "Abdomen", price: 90 }
    ]
  },
  {
    group: "Jambes",
    desc: "Traitement complet pour des jambes parfaitement lisses",
    items: [
      { label: "Jambes (1/2 jambe)", price: 95 },
      { label: "Jambes (complet)", price: 180 },
      { label: "Pieds", price: 45 },
      { label: "Cuisses", price: 110 }
    ]
  },
  {
    group: "Zones Intimes",
    desc: "Traitement délicat et professionnel pour votre intimité",
    items: [
      { label: "Maillot (classique)", price: 75 },
      { label: "Maillot (brésilien)", price: 95 },
      { label: "Maillot (complet)", price: 120 },
      { label: "Zone périanale", price: 65 }
    ]
  }
]

export const forfaits = [
  {
    name: "Forfait Découverte",
    discount: 20,
    description: "Sur votre première séance",
    color: "primary"
  },
  {
    name: "Forfait Couple",
    discount: 15,
    description: "Pour 2 personnes",
    color: "secondary"
  },
  {
    name: "Forfait Famille",
    discount: 25,
    description: "À partir de 3 personnes",
    color: "success"
  }
]

export const phototypes = [
  {
    value: 1,
    label: "Phototype I - Peau très claire, brûle toujours",
    description: "Peau très claire, cheveux blonds ou roux, yeux bleus ou verts"
  },
  {
    value: 2,
    label: "Phototype II - Peau claire, brûle souvent",
    description: "Peau claire, cheveux blonds ou châtains clairs, yeux bleus, verts ou marrons"
  },
  {
    value: 3,
    label: "Phototype III - Peau claire à moyenne, brûle modérément",
    description: "Peau claire à moyenne, cheveux châtains, yeux marrons"
  },
  {
    value: 4,
    label: "Phototype IV - Peau moyenne, brûle rarement",
    description: "Peau mate, cheveux châtains foncés ou noirs, yeux marrons"
  },
  {
    value: 5,
    label: "Phototype V - Peau mate, brûle très rarement",
    description: "Peau mate, cheveux noirs, yeux marrons"
  },
  {
    value: 6,
    label: "Phototype VI - Peau très mate, ne brûle jamais",
    description: "Peau très mate à noire, cheveux noirs, yeux marrons"
  }
]
