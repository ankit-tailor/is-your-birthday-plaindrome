import { useState } from 'react';
import './App.css';
import calender from "./assets/calender.jpeg"
import waiting from "./assets/waiting.gif"

const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function App() {
  const [birthDate, setBirthDate] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [outputMessage, setOutputMessage] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
    const birthdateArray = birthDate.split("-")
    const birthYear = birthdateArray[0]
    const birthMonth = birthdateArray[1]
    const birthDay = birthdateArray[2]

    setIsLoading(true)
    setOutputMessage("")
    setTimeout(() => {
      const output = allCombinations(birthDay, birthMonth, birthYear)
      if (output) {
        setOutputMessage(`Woahhh your birthdate in format  ${output} is palindrome!!!`);
      } else {
        const [nextDate, totalDays] = findNextDate(birthDay, birthMonth, birthYear);
        setOutputMessage(`Your birthdate is not palindrome, but we've found a combination of next date for you.\nThe date is ${nextDate} and you've missed it by ${totalDays} days!! `)
      }
      setIsLoading(false);
    }, 4000)

  }

  const allCombinations = (birthDay, birthMonth, birthYear) => {
    const format1 = birthDay + birthMonth + birthYear
    const format2 = birthMonth + birthDay + birthYear
    const format3 = birthYear + birthMonth + birthDay;
    const format4 = birthDay + birthMonth + birthYear.substr(2);

    if (isPalindrome(format1)) {
      return (`${birthDay}-${birthMonth}-${birthYear} `)
    } else if (isPalindrome(format2)) {
      return (`${birthMonth}-${birthDay}-${birthYear}`)
    } else if (isPalindrome(format3)) {
      return (`${birthYear}-${birthMonth}-${birthDay}`)
    } else if (isPalindrome(format4)) {
      return (`${birthDay}-${birthMonth}-${birthYear.substr(2)}`)
    }
    return null;
  }

  const isPalindrome = (date) => {
    let start = 0, end = date.length - 1;
    while (start < end) {
      if (date[start] !== date[end]) {
        return false;
      }
      start++;
      end--;
    }
    return true;
  }

  const findNextDate = (day, month, year) => {
    let currDay = Number(day);
    let currMonth = Number(month);
    let currYear = Number(year);

    let countDays = 0;

    while (true) {
      countDays++;
      currDay++;
      if (currDay > daysOfMonth[currMonth - 1]) {
        currDay = 1;
        currMonth++;
      }
      if (currMonth > 12) {
        currMonth = 1;
        currYear++;
      }

      let currDayString = currDay.toString();
      let currMonthString = currMonth.toString();
      let currYearString = currYear.toString();

      if (currDay <= 9) {
        currDayString = "0" + currDayString
      }

      if (currMonth <= 9) {
        currMonthString = "0" + currMonthString
      }

      const output = allCombinations(currDayString, currMonthString, currYearString)
      if (output) {
        return [output, countDays]
      }
    }
  }

  return (
    <div className="App">
      <section className="main__section">
        <div className="main__header">
          <h1>Is your birthday palindrome ?</h1>
          <p>Palindrome is string / number which reads the same from backward and forward</p>
          <a href="#content"><button>Try out!</button></a>
        </div>
        <img src={calender} alt="calender_image" height="400px" width="50%" />
      </section>
      <section id="content">
        <h1 style={{ textAlign: "center" }}>Enter your birthdate and we will tell you if your birthdate is a palindrome</h1>
        <p style={{ color: "gray", fontSize: "14px", textAlign: "center" }}>You can put dates in MM/DD/YYYY format, DD/MM/YYYY, MM/DD/YY format etc. to check if they have any chance.</p>
        <form
          onSubmit={handelSubmit}
        >
          <input type="date" className="date-picker" required onChange={(e) => setBirthDate(e.target.value)} />
          <button className="submit-btn" >Check</button>
        </form>
        {isLoading && <div
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        ><img
            style={{ borderRadius: "20px" }}
            width="30%" height="30%"
            src={waiting} alt="waiting_img" />
        </div>
        }
        {outputMessage && <p style={{
          width: "50%",
          margin: "auto",
          marginTop: "30px",
          color: "#242b2e",
          border: "2px solid #242b2e",
          textAlign: "center",
          padding: "2rem"
        }}>{outputMessage}</p>}
      </section>
    </div>
  );
}

export default App;
