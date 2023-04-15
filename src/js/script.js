import "../css/style.css";
import "../img/image1.webp";

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const title = document.querySelector(".portfolio__title--multicolor");

const trackVisits = () => {
  let totalVisits = parseInt(localStorage.getItem("totalVisits")) || 0;
  let visitsTime = parseInt(localStorage.getItem("visitsTime")) || 0;
  const startTime = new Date().getTime();

  window.addEventListener("beforeunload", function () {
    const endTime = new Date().getTime();
    const timeSpent = endTime - startTime;
    visitsTime += timeSpent;
    localStorage.setItem("visitsTime", parseInt(visitsTime));
  });

  const addVisit = () => {
    totalVisits++;
    localStorage.setItem("totalVisits", totalVisits);
  };

  addVisit();

  const calcAvgVisitTime = () => {
    const average = visitsTime / totalVisits;
    const seconds = Math.floor(average / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return { minutes, remainingSeconds };
  };

  let { minutes, remainingSeconds } = calcAvgVisitTime();

  /* Була ще ідея збирати час відвідування у масив, і з нього вираховувати середнє значення. Так
		воно було б наглядніше по часу сессій. Але розмір масиву збільшувався б постійно, 
		що в перспективі могло б стати проблемою. Якщо на певному моменті 
		почати видаляти старі значення, нові при цьому аншифтяться на початок, то вже не можна сказати, що
		час середній за весь час. Було б лише за останні 50, 100 відвідувань. Залежить від обмеження. Тому 
		вирішив записувати в змінну.
	*/
  console.log(`Вітаю! Ви зайшли на цей сайт вже ${totalVisits} разів`);
  console.log(
    `Ви провели на ньому в середньому ${minutes} хвилин ${remainingSeconds} секунд`
  );
};

trackVisits();

const enhance = (id) => {
  const element = document.getElementById(id),
    text = element.innerText.split("");

  element.innerText = "";

  text.forEach((value, index) => {
    const outer = document.createElement("span");

    outer.className = "outer";

    const inner = document.createElement("span");

    inner.className = "inner";

    inner.style.animationDelay = `${rand(-5000, 0)}ms`;

    const letter = document.createElement("span");

    letter.className = "letter";

    letter.innerText = value;

    letter.style.animationDelay = `${index * 1000}ms`;

    inner.appendChild(letter);

    outer.appendChild(inner);

    element.appendChild(outer);
  });
};

enhance("channel-link");

function randomColor() {
  let color = [];
  for (let i = 0; i < 3; i++) {
    color.push(Math.floor(Math.random() * 256));
  }
  return "rgb(" + color.join(", ") + ")";
}

title.addEventListener("mouseover", function () {
  title.style.color = randomColor();
});

title.addEventListener("mouseout", function () {
  title.style.color = randomColor();
});
