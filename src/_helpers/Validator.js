import React, { useState } from 'react'

export const globalValidator = (value, type) => {
  if (type === 'email') {
    return textValidator(value) && emailValidator(value)
  } else if (type === 'password') {
    return passwordValidator(value)
  } else if (type === 'text') {
    return textValidator(value)
  } else if (type === 'number') {
    return textValidator(value)
  } else if (type === 'telephone') {
    return textValidator(value)
  }
}

const textValidator = (value) => value == null || value.length === 0 || /^\s+$/.test(value) ? 'No empty fields allowed' : 1

export const usePasswordCheck = (passwords) => {
  const [passwordsToCheck, setPasswordsToCheck] = useState(passwords)
  const onPasswordChange = (e) => {
    setPasswordsToCheck({
      ...passwordsToCheck,
      [e.target.name]: {
        uppercase: checkPattern('uppercase', e.target.value),
        lowercase: checkPattern('lowercase', e.target.value),
        number: checkPattern('number', e.target.value),
        specialCharacter: checkPattern('specialCharacter', e.target.value),
        longEnough: passwordLength(e.target.value),
        value: e.target.value
      }
    })
  }

  const passwordLength = value => value.length > 7
  const passwordsMatch = (password1, password2) => (password1 === password2) && password1.length > 7 && password2.length > 7

  const checkPattern = (pattern, password) => {
    let check = false
    const patternsTest = {
      uppercase: (i) => password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90,
      lowercase: (i) => password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122,
      number: i => password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57,
      specialCharacter: (i) => !patternsTest.uppercase(i) && !patternsTest.lowercase(i) && !patternsTest.number(i)
    }

    for (var i = 0; i < password.length; i++) {
      if (patternsTest[pattern](i))
        check = true
    }

    return check
  }

  return {
    passwordsToCheck,
    get: pattern => !!passwordsToCheck['password'][pattern],
    passwordsMatch: () => passwordsMatch(passwordsToCheck.password.value, passwordsToCheck.confirmedPassword.value),
    onPasswordChange
  }
}

const passwordValidator = (password) => {
  if (password.length >= 8) {
    let mayuscula = false
    let minuscula = false
    let numero = false
    let caracterRaro = false
    for (var i = 0; i < password.length; i++) {
      if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
        mayuscula = true
      } else if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
        minuscula = true
      } else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
        numero = true
      } else {
        caracterRaro = true
      }
    }
    if (mayuscula && minuscula && numero && caracterRaro) {
      return 1
    }
  }
  return 'Must enter a password with at least one lowercase, one uppercase, one special character and a number'
}

const emailValidator = email => {
  let regex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/
  return regex.test(email) ? 1 : 'Must enter a valid email'
}
