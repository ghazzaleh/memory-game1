document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "image1.png",
    "image2.png",
    "image3.png",
    "image4.png",
    "image5.png",
    "image6.png",
    "image7.png",
    "image8.png",
    "image9.png",
    "image10.png",
    "image11.png",
    "image12.png",
  ];
  const totalCards = 12; // تعداد کل کارت‌ها
  let gameCards = [];
  let firstCard = null;
  let secondCard = null;
  let matchedCards = 0;
  let timer;
  let timeLeft = 20;

  // تابع برای راه‌اندازی بازی
  function initGame() {
    gameCards = [];
    matchedCards = 0;
    firstCard = null;
    secondCard = null;
    document.getElementById("message").textContent = "";
    timeLeft = 20;
    document.getElementById(
      "timer"
    ).textContent = `Time Left: ${timeLeft} seconds`;

    // انتخاب ۶ تصویر تصادفی و دو بار اضافه کردن آن‌ها
    const shuffledImages = [...images]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards / 2);
    shuffledImages.forEach((image) => {
      gameCards.push(image);
      gameCards.push(image); // اضافه کردن یکبار دیگر برای هر تصویر
    });

    // جابجایی تصادفی کارت‌ها
    gameCards.sort(() => Math.random() - 0.5);

    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";
    gameCards.forEach((image) => {
      const card = document.createElement("div");
      card.className = "card";
      card.setAttribute("data-image", image);
      card.style.backgroundImage = 'url("back.png")'; // تصویر پشت کارت
      card.addEventListener("click", () => flipCard(card));
      gameBoard.appendChild(card);
    });

    showCards(true);
    setTimeout(() => {
      showCards(false);
      startTimer();
    }, 2000);
  }

  // تابع برای نمایش یا مخفی کردن کارت‌ها
  function showCards(show) {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.style.backgroundImage = show
        ? `url("${card.getAttribute("data-image")}")`
        : 'url("back.png")';
    });
  }

  // تابع برای شروع تایمر
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById(
        "timer"
      ).textContent = `Time Left: ${timeLeft} seconds`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(false);
      }
    }, 1000);
  }

  // تابع برای باز کردن کارت
  function flipCard(card) {
    if (firstCard && secondCard) return; // اگر دو کارت در حال حاضر افشا شده‌اند، هیچ کاری نکن

    card.style.backgroundImage = `url("${card.getAttribute("data-image")}")`;
    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      checkMatch();
    }
  }

  // تابع برای بررسی مطابقت کارت‌ها
  function checkMatch() {
    if (
      firstCard.getAttribute("data-image") ===
      secondCard.getAttribute("data-image")
    ) {
      // دو کارت مطابقت یافته
      matchedCards += 2;
      firstCard.removeEventListener("click", () => flipCard(firstCard));
      secondCard.removeEventListener("click", () => flipCard(secondCard));
      firstCard = null;
      secondCard = null;

      // بررسی پایان بازی
      if (matchedCards === totalCards) {
        endGame(true);
      }
    } else {
      // اگر مطابقت نداشته باشند
      setTimeout(() => {
        firstCard.style.backgroundImage = 'url("back.png")';
        secondCard.style.backgroundImage = 'url("back.png")';
        firstCard = null;
        secondCard = null;
      }, 1000);
    }
  }

  // تابع برای پایان بازی
  function endGame(won) {
    clearInterval(timer);
    const message = document.getElementById("message");
    if (won) {
      message.textContent = "You Win!";
    } else {
      message.textContent = "You Lose!";
      showCards(true);
    }
    document.getElementById("startButton").disabled = false;
  }

  // شروع بازی با کلیک روی دکمه
  document.getElementById("startButton").addEventListener("click", () => {
    initGame();
    document.getElementById("startButton").disabled = true;
  });
});
