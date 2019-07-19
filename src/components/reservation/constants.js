// all constants (i.e. dates, stall names) for reservation feature

import { format, addDays } from 'date-fns'

const reservabledDays = 3
let days = new Array(reservabledDays)
let reformattedDays = new Array(reservabledDays)
for (let i=0; i<reservabledDays; i++) {
  days[i] = (format(addDays(new Date(), i+1), 'MMM Do, dddd'))  // i.e. Jun 11th, Tuesday
  reformattedDays[i] = (format(addDays(new Date(), i+1), 'MMMD'))  // i.e. Jun11
}

const today = (format(addDays(new Date()), 'MMMD'))

const stalls = ['A1', 'A2', 'A3']
const times = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
const timesDB = ['a7', 'b8', 'c9', 'd10', 'e11', 'f12',
  'g13', 'h14', 'i15', 'j16', 'k17', 'l18']

export { days, reformattedDays, stalls, times, timesDB, today }