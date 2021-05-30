export const format = (value) => {
    let formattedValue;
  
    formattedValue = value.replace(/\./g, '');
    formattedValue = formattedValue.replace(/,/g, '.');
    formattedValue = Number(formattedValue.split('$')[1].trim());
  
    formattedValue = String(value).includes('-') ? -formattedValue : formattedValue;
  
    return formattedValue;
  }
  
  export const randomNumber = () => {
    return Math.floor(Math.random() * 101);
  }
  // dd/mm/aaaa
  export const dateFormatter = date => {
    if (!date) return '';
    let months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro",
      "Outubro", "Novembro", "Dezembro"
    ];
    let monthNumber = Number(date.split("/")[1]);
    let day = date.split("/")[0];
    let year = date.split("/")[2];

    let monthName = months[monthNumber-1];
    return `${monthName} ${day}, ${year}`;
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