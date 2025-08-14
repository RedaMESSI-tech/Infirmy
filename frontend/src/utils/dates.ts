import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import 'dayjs/locale/en'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isBetween from 'dayjs/plugin/isBetween'
import minMax from 'dayjs/plugin/minMax'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

// Configuration de dayjs
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)
dayjs.extend(minMax)
dayjs.extend(weekday)
dayjs.extend(weekOfYear)
dayjs.extend(quarterOfYear)

// Définir la locale française par défaut
dayjs.locale('fr')

export interface DateRange {
  start: dayjs.Dayjs
  end: dayjs.Dayjs
}

export interface TimeSlot {
  start: dayjs.Dayjs
  end: dayjs.Dayjs
  isAvailable: boolean
}

export interface WeekDay {
  date: dayjs.Dayjs
  dayOfWeek: number
  isToday: boolean
  isPast: boolean
  isFuture: boolean
  isWeekend: boolean
}

export interface MonthDay {
  date: dayjs.Dayjs
  dayOfMonth: number
  isCurrentMonth: boolean
  isToday: boolean
  isPast: boolean
  isFuture: boolean
  isWeekend: boolean
}

export const dateUtils = {
  // Configuration de la locale
  setLocale(locale: 'fr' | 'en') {
    dayjs.locale(locale)
  },

  // Obtenir la date actuelle
  now(): dayjs.Dayjs {
    return dayjs()
  },

  // Parser une date
  parse(date: string | Date | dayjs.Dayjs): dayjs.Dayjs {
    return dayjs(date)
  },

  // Formater une date
  format(date: dayjs.Dayjs | string | Date, format: string = 'DD/MM/YYYY'): string {
    return dayjs(date).format(format)
  },

  // Formater une date en français
  formatFrench(date: dayjs.Dayjs | string | Date): string {
    return dayjs(date).locale('fr').format('dddd D MMMM YYYY')
  },

  // Formater une date courte
  formatShort(date: dayjs.Dayjs | string | Date): string {
    return dayjs(date).format('DD/MM/YY')
  },

  // Formater une heure
  formatTime(date: dayjs.Dayjs | string | Date): string {
    return dayjs(date).format('HH:mm')
  },

  // Formater une date et heure
  formatDateTime(date: dayjs.Dayjs | string | Date): string {
    return dayjs(date).format('DD/MM/YYYY HH:mm')
  },

  // Formater une date relative (il y a X temps)
  formatRelative(date: dayjs.Dayjs | string | Date): string {
    return dayjs(date).fromNow()
  },

  // Vérifier si une date est aujourd'hui
  isToday(date: dayjs.Dayjs | string | Date): boolean {
    return dayjs(date).isSame(dayjs(), 'day')
  },

  // Vérifier si une date est hier
  isYesterday(date: dayjs.Dayjs | string | Date): boolean {
    return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day')
  },

  // Vérifier si une date est demain
  isTomorrow(date: dayjs.Dayjs | string | Date): boolean {
    return dayjs(date).isSame(dayjs().add(1, 'day'), 'day')
  },

  // Vérifier si une date est dans le passé
  isPast(date: dayjs.Dayjs | string | Date): boolean {
    return dayjs(date).isBefore(dayjs(), 'day')
  },

  // Vérifier si une date est dans le futur
  isFuture(date: dayjs.Dayjs | string | Date): boolean {
    return dayjs(date).isAfter(dayjs(), 'day')
  },

  // Vérifier si une date est ce mois
  isThisMonth(date: dayjs.Dayjs | string | Date): boolean {
    return dayjs(date).isSame(dayjs(), 'month')
  },

  // Vérifier si une date est cette semaine
  isThisWeek(date: dayjs.Dayjs | string | Date): boolean {
    return dayjs(date).isSame(dayjs(), 'week')
  },

  // Vérifier si une date est ce trimestre
  isThisQuarter(date: dayjs.Dayjs | string | Date): boolean {
    return dayjs(date).isSame(dayjs(), 'quarter')
  },

  // Vérifier si une date est cette année
  isThisYear(date: dayjs.Dayjs | string | Date): boolean {
    return dayjs(date).isSame(dayjs(), 'year')
  },

  // Vérifier si une date est un weekend
  isWeekend(date: dayjs.Dayjs | string | Date): boolean {
    const day = dayjs(date).day()
    return day === 0 || day === 6
  },

  // Vérifier si une date est un jour de semaine
  isWeekday(date: dayjs.Dayjs | string | Date): boolean {
    return !this.isWeekend(date)
  },

  // Obtenir le début de la journée
  startOfDay(date: dayjs.Dayjs | string | Date): dayjs.Dayjs {
    return dayjs(date).startOf('day')
  },

  // Obtenir la fin de la journée
  endOfDay(date: dayjs.Dayjs | string | Date): dayjs.Dayjs {
    return dayjs(date).endOf('day')
  },

  // Obtenir le début de la semaine
  startOfWeek(date: dayjs.Dayjs | string | Date): dayjs.Dayjs {
    return dayjs(date).startOf('week')
  },

  // Obtenir la fin de la semaine
  endOfWeek(date: dayjs.Dayjs | string | Date): dayjs.Dayjs {
    return dayjs(date).endOf('week')
  },

  // Obtenir le début du mois
  startOfMonth(date: dayjs.Dayjs | string | Date): dayjs.Dayjs {
    return dayjs(date).startOf('month')
  },

  // Obtenir la fin du mois
  endOfMonth(date: dayjs.Dayjs | string | Date): dayjs.Dayjs {
    return dayjs(date).endOf('month')
  },

  // Obtenir le début de l'année
  startOfYear(date: dayjs.Dayjs | string | Date): dayjs.Dayjs {
    return dayjs(date).startOf('year')
  },

  // Obtenir la fin de l'année
  endOfYear(date: dayjs.Dayjs | string | Date): dayjs.Dayjs {
    return dayjs(date).endOf('year')
  },

  // Ajouter du temps
  add(date: dayjs.Dayjs | string | Date, amount: number, unit: dayjs.ManipulateType): dayjs.Dayjs {
    return dayjs(date).add(amount, unit)
  },

  // Soustraire du temps
  subtract(date: dayjs.Dayjs | string | Date, amount: number, unit: dayjs.ManipulateType): dayjs.Dayjs {
    return dayjs(date).subtract(amount, unit)
  },

  // Différence entre deux dates
  diff(date1: dayjs.Dayjs | string | Date, date2: dayjs.Dayjs | string | Date, unit: dayjs.OpUnitType = 'day'): number {
    return dayjs(date1).diff(dayjs(date2), unit)
  },

  // Obtenir l'âge
  getAge(birthDate: dayjs.Dayjs | string | Date): number {
    return dayjs().diff(dayjs(birthDate), 'year')
  },

  // Obtenir les jours entre deux dates
  getDaysBetween(start: dayjs.Dayjs | string | Date, end: dayjs.Dayjs | string | Date): dayjs.Dayjs[] {
    const days: dayjs.Dayjs[] = []
    let current = dayjs(start).startOf('day')
    const endDate = dayjs(end).startOf('day')

    while (current.isSameOrBefore(endDate)) {
      days.push(current)
      current = current.add(1, 'day')
    }

    return days
  },

  // Obtenir les semaines entre deux dates
  getWeeksBetween(start: dayjs.Dayjs | string | Date, end: dayjs.Dayjs | string | Date): dayjs.Dayjs[] {
    const weeks: dayjs.Dayjs[] = []
    let current = dayjs(start).startOf('week')
    const endDate = dayjs(end).startOf('week')

    while (current.isSameOrBefore(endDate)) {
      weeks.push(current)
      current = current.add(1, 'week')
    }

    return weeks
  },

  // Obtenir les mois entre deux dates
  getMonthsBetween(start: dayjs.Dayjs | string | Date, end: dayjs.Dayjs | string | Date): dayjs.Dayjs[] {
    const months: dayjs.Dayjs[] = []
    let current = dayjs(start).startOf('month')
    const endDate = dayjs(end).startOf('month')

    while (current.isSameOrBefore(endDate)) {
      months.push(current)
      current = current.add(1, 'month')
    }

    return months
  },

  // Obtenir les jours de la semaine
  getWeekDays(start: dayjs.Dayjs | string | Date): WeekDay[] {
    const weekStart = dayjs(start).startOf('week')
    const days: WeekDay[] = []

    for (let i = 0; i < 7; i++) {
      const date = weekStart.add(i, 'day')
      days.push({
        date,
        dayOfWeek: date.day(),
        isToday: this.isToday(date),
        isPast: this.isPast(date),
        isFuture: this.isFuture(date),
        isWeekend: this.isWeekend(date)
      })
    }

    return days
  },

  // Obtenir les jours du mois
  getMonthDays(date: dayjs.Dayjs | string | Date): MonthDay[] {
    const monthStart = dayjs(date).startOf('month')
    const monthEnd = dayjs(date).endOf('month')
    const weekStart = monthStart.startOf('week')
    const weekEnd = monthEnd.endOf('week')
    const days: MonthDay[] = []

    let current = weekStart
    while (current.isSameOrBefore(weekEnd)) {
      days.push({
        date: current,
        dayOfMonth: current.date(),
        isCurrentMonth: current.isSame(monthStart, 'month'),
        isToday: this.isToday(current),
        isPast: this.isPast(current),
        isFuture: this.isFuture(current),
        isWeekend: this.isWeekend(current)
      })
      current = current.add(1, 'day')
    }

    return days
  },

  // Obtenir les créneaux horaires
  getTimeSlots(
    startTime: string, 
    endTime: string, 
    duration: number = 30
  ): TimeSlot[] {
    const slots: TimeSlot[] = []
    let current = dayjs(`2000-01-01T${startTime}`)
    const end = dayjs(`2000-01-01T${endTime}`)

    while (current.isBefore(end)) {
      const slotEnd = current.add(duration, 'minute')
      slots.push({
        start: current,
        end: slotEnd,
        isAvailable: true
      })
      current = slotEnd
    }

    return slots
  },

  // Vérifier si un créneau est disponible
  isTimeSlotAvailable(
    slot: TimeSlot,
    bookedSlots: TimeSlot[]
  ): boolean {
    return !bookedSlots.some(booked => 
      slot.start.isBefore(booked.end) && slot.end.isAfter(booked.start)
    )
  },

  // Obtenir les créneaux disponibles
  getAvailableTimeSlots(
    allSlots: TimeSlot[],
    bookedSlots: TimeSlot[]
  ): TimeSlot[] {
    return allSlots.map(slot => ({
      ...slot,
      isAvailable: this.isTimeSlotAvailable(slot, bookedSlots)
    }))
  },

  // Formater la durée
  formatDuration(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} min`
    }
    
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    
    if (remainingMinutes === 0) {
      return `${hours}h`
    }
    
    return `${hours}h${remainingMinutes}`
  },

  // Formater la durée en français
  formatDurationFrench(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? 's' : ''}`
    }
    
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    
    if (remainingMinutes === 0) {
      return `${hours} heure${hours > 1 ? 's' : ''}`
    }
    
    return `${hours} heure${hours > 1 ? 's' : ''} et ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`
  },

  // Obtenir le nom du jour en français
  getDayName(date: dayjs.Dayjs | string | Date): string {
    return dayjs(date).locale('fr').format('dddd')
  },

  // Obtenir le nom du mois en français
  getMonthName(date: dayjs.Dayjs | string | Date): string {
    return dayjs(date).locale('fr').format('MMMM')
  },

  // Obtenir le nom du jour en anglais
  getDayNameEn(date: dayjs.Dayjs | string | Date): string {
    return dayjs(date).locale('en').format('dddd')
  },

  // Obtenir le nom du mois en anglais
  getMonthNameEn(date: dayjs.Dayjs | string | Date): string {
    return dayjs(date).locale('en').format('MMMM')
  },

  // Vérifier si une date est valide
  isValid(date: string | Date): boolean {
    return dayjs(date).isValid()
  },

  // Obtenir la date minimale
  min(...dates: (dayjs.Dayjs | string | Date)[]): dayjs.Dayjs {
    return dayjs.min(dates.map(d => dayjs(d)))
  },

  // Obtenir la date maximale
  max(...dates: (dayjs.Dayjs | string | Date)[]): dayjs.Dayjs {
    return dayjs.max(dates.map(d => dayjs(d)))
  },

  // Vérifier si une date est entre deux autres
  isBetween(
    date: dayjs.Dayjs | string | Date,
    start: dayjs.Dayjs | string | Date,
    end: dayjs.Dayjs | string | Date,
    unit: dayjs.OpUnitType = 'day',
    inclusivity: '()' | '[]' | '(]' | '[)' = '[]'
  ): boolean {
    return dayjs(date).isBetween(dayjs(start), dayjs(end), unit, inclusivity)
  },

  // Obtenir le numéro de la semaine
  getWeekNumber(date: dayjs.Dayjs | string | Date): number {
    return dayjs(date).week()
  },

  // Obtenir le numéro du trimestre
  getQuarterNumber(date: dayjs.Dayjs | string | Date): number {
    return dayjs(date).quarter()
  },

  // Obtenir le nombre de jours dans le mois
  getDaysInMonth(date: dayjs.Dayjs | string | Date): number {
    return dayjs(date).daysInMonth()
  },

  // Obtenir le nombre de semaines dans l'année
  getWeeksInYear(date: dayjs.Dayjs | string | Date): number {
    return dayjs(date).weeksInYear()
  },

  // Convertir en UTC
  toUTC(date: dayjs.Dayjs | string | Date): dayjs.Dayjs {
    return dayjs(date).utc()
  },

  // Convertir depuis UTC
  fromUTC(date: dayjs.Dayjs | string | Date): dayjs.Dayjs {
    return dayjs.utc(date)
  },

  // Obtenir le fuseau horaire local
  getLocalTimezone(): string {
    return dayjs.tz.guess()
  },

  // Formater avec fuseau horaire
  formatWithTimezone(
    date: dayjs.Dayjs | string | Date,
    format: string = 'DD/MM/YYYY HH:mm',
    timezone: string = 'Europe/Paris'
  ): string {
    return dayjs(date).tz(timezone).format(format)
  }
}

export default dateUtils
