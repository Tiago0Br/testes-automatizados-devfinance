export const format = (value) => {
    let formattedValue
  
    formattedValue = value.replace(/\./g, '')
    formattedValue = formattedValue.replace(/,/g, '.')
    formattedValue = Number(formattedValue.split('$')[1].trim())
  
    formattedValue = String(value).includes('-') ? -formattedValue : formattedValue
  
    return formattedValue
  }
  
  export const randomNumber = () => {
    return Math.floor(Math.random() * 101)
  }
  
  
  export const prepareLocalStorage = (win) => {
  
    win.localStorage.setItem('dev.finances:transactions', JSON.stringify([
        {
          description: "Salário",
          amount: randomNumber() * 1000,
          date: "11/03/2021"
        },
        {
          description: 'Notebook',
          amount: - (randomNumber() * 1000),
          date: "12/03/2021"
        },
        {
          description: 'Smartphone',
          amount: - (randomNumber() * 100),
          date: "12/03/2021"
        },
        {
          description: 'Website',
          amount: (randomNumber() * 500),
          date: "12/03/2021"
        }
      ])
    )
  
  }