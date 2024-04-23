let filledInputs = true
let correctEmail = true

const validateEmptyInputs = () => {
  const mailInput = document.querySelector("#inputEmail3").value
  const passwordInput = document.querySelector("#inputPassword3").value
  if (mailInput.length == 0 || passwordInput.length == 0) {
    filledInputs = false
    alert("Por favor, completa los campos requeridos")
  } else {
    filledInputs = true
  }
}

const validateEmail = () => {
  const mailInput = document.querySelector("#inputEmail3").value
  if (!mailInput.includes("@")) {
    correctEmail = false
    alert("Tu mail es inválido, por favor, verifica que contenga el caracter '@'")
  } else {
    correctEmail = true
  }
}

const validatePassword = () => {
  alert("Recuerda que la contraseña debe tener entre 1 y 10 caracteres.")
}

const sendForm = () => {
  validateEmail()
  validateEmptyInputs()
  if (!filledInputs) return
  if (!correctEmail) return
  const inputValue = document.querySelector("#inputEmail3").value
  const username = inputValue.toString().split('@')[0]
  alert("Bienvenido/a " + username)

}