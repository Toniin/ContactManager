const phone_FR = /^(?:(?:\()(?:\+)33)(?:\))\s*[1-9](?:[\s.-]*\d{2}){4}$/

export const phoneValidator_FR_fr = (phoneNumber: string) => {
  return phone_FR.test(phoneNumber)
}

export const phoneFormatLocal_FR_fr = (phoneNumber: string) => {
  return phoneNumber.replace("(+33)", '0')
}

export const phoneFormatInternational_FR_fr = (phoneNumber: string) => {
  return phoneNumber.replace("0", '(+33)')
}
