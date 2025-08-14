import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json({ limit:'2mb' }))
app.use(morgan('dev'))
const JWT_SECRET = process.env.JWT_SECRET || 'secret_change_me'
const PORT = process.env.PORT || 5270

const users=[]
// hash of 'admin123'
users.push({ id: uuid(), email:'admin@veloria.fr', name:'Admin', phone:'+33 1 23 45 67 89', avatar:'/avatars/a1.svg', isAdmin:true, hash:'$2a$10$Jw8b0kXnkpqT2gL2z3aF6u5qF7G4Dnu7qj1xZr9vD1Pp9bI8I9nOG' })

const reviews=[
 { id:uuid(), name:'Camille', city:'Paris 9e', rating:5, text:'Résultats nets en 3 séances. Accueil impeccable et suivi sérieux.', avatar:'/avatars/a2.svg' },
 { id:uuid(), name:'Yanis', city:'Neuilly', rating:5, text:'Zéro poils incarnés depuis. Planning flexible, équipe pro.', avatar:'/avatars/a3.svg' },
 { id:uuid(), name:'Sofia', city:'Boulogne', rating:5, text:'Très bon accompagnement, douleur largement supportable.', avatar:'/avatars/a4.svg' },
 { id:uuid(), name:'Nora', city:'Courbevoie', rating:5, text:'Centre propre, explications claires. Je recommande vivement.', avatar:'/avatars/a5.svg' },
 { id:uuid(), name:'Lina', city:'Puteaux', rating:5, text:'Devis clair, protocole sérieux. Résultat durable.', avatar:'/avatars/a6.svg' },
 { id:uuid(), name:'Adam', city:'Levallois', rating:5, text:'Bon rapport qualité/prix et dispo le soir.', avatar:'/avatars/a1.svg' }
]

const services=[
 { group:'Visage', desc:'Zones délicates', items:[{label:'Lèvre supérieure',price:29},{label:'Menton',price:35},{label:'Joues',price:39},{label:'Favoris',price:35}]},
 { group:'Haut du corps', desc:'Bras, aisselles, torse, dos', items:[{label:'Aisselles',price:39},{label:'Avant-bras',price:59},{label:'Bras complets',price:89},{label:'Torse',price:119}]},
 { group:'Bas du corps', desc:'Ventre, maillot, jambes', items:[{label:'Maillot classique',price:49},{label:'Maillot intégral',price:79},{label:'Demi-jambes',price:89},{label:'Jambes complètes',price:149}]},
 { group:'Forfaits', desc:'Combinaisons avantageuses', items:[{label:'Aisselles + Maillot intégral',price:99},{label:'Demi-jambes + Maillot intégral',price:159},{label:'Corps intégral (femme)',price:349}]}
]

const slots={}
function ensureDay(dateStr){
  if(!slots[dateStr]){
    const arr=[]; for(let h=9; h<=17; h++){ arr.push({ id: uuid(), time: dayjs(dateStr+'T'+String(h).padStart(2,'0')+':00:00').toISOString(), bookedBy:null }) }
    slots[dateStr]=arr
  }
  return slots[dateStr]
}
function sign(u){ return jwt.sign({ uid:u.id }, JWT_SECRET, { expiresIn:'7d' }) }
function requireAuth(req,res,next){
  const a=req.headers.authorization||''; const t=a.startsWith('Bearer ')?a.slice(7):null
  if(!t) return res.status(401).json({ ok:false, error:'Non authentifié' })
  try{ const { uid } = jwt.verify(t, JWT_SECRET); req.userId=uid; next() }catch(e){ return res.status(401).json({ ok:false, error:'Jeton invalide' }) }
}

app.post('/api/auth/register', async (req,res)=>{
  const { email,password,name,phone,avatar } = req.body||{}
  if(!email || !password || !name) return res.status(400).json({ ok:false, error:'Champs requis' })
  if(users.find(u=>u.email===email)) return res.status(409).json({ ok:false, error:'Email déjà utilisé' })
  const hash = await bcrypt.hash(password,10)
  const user={ id:uuid(), email, hash, name, phone:phone||'', avatar: avatar||'/avatars/a2.svg', isAdmin:false }
  users.push(user); const token=sign(user)
  res.json({ ok:true, token, user:{ id:user.id, email:user.email, name:user.name, phone:user.phone, avatar:user.avatar, isAdmin:false } })
})
app.post('/api/auth/login', async (req,res)=>{
  const { email,password } = req.body||{}
  const u = users.find(x=>x.email===email); if(!u) return res.status(401).json({ ok:false, error:'Identifiants invalides' })
  const ok = await bcrypt.compare(password, u.hash); if(!ok) return res.status(401).json({ ok:false, error:'Identifiants invalides' })
  const token=sign(u); res.json({ ok:true, token, user:{ id:u.id, email:u.email, name:u.name, phone:u.phone, avatar:u.avatar, isAdmin:!!u.isAdmin } })
})
app.get('/api/auth/me', requireAuth, (req,res)=>{
  const u=users.find(x=>x.id===req.userId); if(!u) return res.status(404).json({ ok:false })
  res.json({ ok:true, user:{ id:u.id, email:u.email, name:u.name, phone:u.phone||'', avatar:u.avatar||'', isAdmin:!!u.isAdmin } })
})

app.get('/api/services', (req,res)=> res.json(services))
app.get('/api/reviews', (req,res)=> res.json(reviews))

app.get('/api/slots', (req,res)=>{ const { date }=req.query; if(!date) return res.status(400).json({ ok:false, error:'date manquante' }); res.json(ensureDay(date)) })
app.post('/api/slots/book', requireAuth, (req,res)=>{
  const { slotId,date }=req.body||{}; if(!slotId||!date) return res.status(400).json({ ok:false, error:'Paramètres manquants' })
  const day=ensureDay(date); const s=day.find(x=>x.id===slotId); if(!s) return res.status(404).json({ ok:false, error:'Créneau introuvable' })
  if(s.bookedBy) return res.status(409).json({ ok:false, error:'Déjà réservé' })
  if(day.some(x=>x.bookedBy===req.userId)) return res.status(409).json({ ok:false, error:'Un seul rendez-vous par jour' })
  s.bookedBy=req.userId; res.json({ ok:true })
})
app.post('/api/slots/cancel', requireAuth, (req,res)=>{
  const { slotId,date }=req.body||{}; const day=ensureDay(date); const s=day.find(x=>x.id===slotId); if(!s) return res.status(404).json({ ok:false, error:'Créneau introuvable' })
  const u=users.find(x=>x.id===req.userId); if(!u?.isAdmin) return res.status(403).json({ ok:false, error:'Admin requis' })
  s.bookedBy=null; res.json({ ok:true })
})

app.listen(PORT, ()=>console.log('API on http://localhost:'+PORT))
