const idGen = () => (
  Math.random().toString(36).substring(2, 15)
  + Math.random().toString(36).substring(2, 15)
)  // generate random str consisted of num & letters for bookingID

const stallA1 = {
  a7: {index: 0, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  b8: {index: 1, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  c9: {index: 2, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  d10: {index: 3, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  e11: {index: 4, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  f12: {index: 5, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  g13: {index: 6, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  h14: {index: 7, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  i15: {index: 8, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  j16: {index: 9, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  k17: {index: 10, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  l18: {index: 11, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
}

const stallA2 = {
  a7: {index: 12, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  b8: {index: 13, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  c9: {index: 14, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  d10: {index: 15, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  e11: {index: 16, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  f12: {index: 17, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  g13: {index: 18, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  h14: {index: 19, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  i15: {index: 20, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  j16: {index: 21, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  k17: {index: 22, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
  l18: {index: 23, bookingID: idGen(), uid: '', bookingRef: '', validated: false, valCount: 0},
}

const stallA3 = {
  a7: {index: 24, bookingID: idGen(), uid: '', bookingRef: '', validated: false},
  b8: {index: 25, bookingID: idGen(), uid: '', bookingRef: '', validated: false},
  c9: {index: 26, bookingID: idGen(), uid: '', bookingRef: '', validated: false},
  d10: {index: 27, bookingID: idGen(), uid: '', bookingRef: '', validated: false},
  e11: {index: 28, bookingID: idGen(), uid: '', bookingRef: '', validated: false},
  f12: {index: 29, bookingID: idGen(), uid: '', bookingRef: '', validated: false},
  g13: {index: 30, bookingID: idGen(), uid: '', bookingRef: '', validated: false},
  h14: {index: 31, bookingID: idGen(), uid: '', bookingRef: '', validated: false},
  i15: {index: 32, bookingID: idGen(), uid: '', bookingRef: '', validated: false},
  j16: {index: 33, bookingID: idGen(), uid: '', bookingRef: '', validated: false},
  k17: {index: 34, bookingID: idGen(), uid: '', bookingRef: '', validated: false},
  l18: {index: 35, bookingID: idGen(), uid: '', bookingRef: '', validated: false},
}

const RES_DATA = {
  stallA1: stallA1,
  stallA2: stallA2,
  stallA3: stallA3
}

export default RES_DATA
