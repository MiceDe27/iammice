  const words = ["Software Engineer", "Full-Stack Developer", "Web Developer", "System Developer"];
  let i = 0;
  let timer;

  function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
      if (word.length > 0) {
        document.querySelector('.typewriter-text').innerHTML += word.shift();
      } else {
        setTimeout(deletingEffect, 2000);
        return false;
      }
      timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
  }

  function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
      if (word.length > 0) {
        word.pop();
        document.querySelector('.typewriter-text').innerHTML = word.join("");
      } else {
        if (words.length > (i + 1)) {
          i++;
        } else {
          i = 0;
        }
        typingEffect();
        return false;
      }
      timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
  }

  document.addEventListener("DOMContentLoaded", typingEffect);
  
emailjs.init("zfrkMildAESmbb391");

document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.innerText = "Sending Message...";
  submitBtn.disabled = true;

  const templateParams = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value
  };

  emailjs.send("service_38fwyco", "template_ykzt7wh", templateParams)
    .then(function(response) {
      submitBtn.innerText = "Send Message";
      submitBtn.disabled = false;

      alert("Message sent successfully! I'll get back to you soon.");
      document.getElementById("contactForm").reset();
    }, function(error) {
      submitBtn.innerText = "Send Message";
      submitBtn.disabled = false;

      alert("Failed to send message. Please check your network connection.");
      console.log("EmailJS Error Log:", error);
    });
});
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
const BIN_ID = "6a781400f5f4af5e29fd9d50";
const API_KEY = "$2a$10$TqqhwpVBK56BQiDUgcVqIO701BzxyuyYOexP4zMjmk1WyKHhjqnJ6";
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const stars = document.querySelectorAll("#stars i");
const ratingInfo = document.getElementById("ratingInfo");

let userIP = null;
let binData = null;

async function getIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch (err) {
    return null;
  }
}

async function loadBin() {
  const res = await fetch(BIN_URL + "/latest", {
    headers: { "X-Master-Key": API_KEY }
  });
  const json = await res.json();
  return json.record;
}

async function saveBin(data) {
  await fetch(BIN_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY
    },
    body: JSON.stringify(data)
  });
}

function updateDisplay(data) {

  if (data.count === 0) {
    ratingInfo.innerText = "0/5";
    return;
  }
  const avg = (data.total / data.count).toFixed(1);
  ratingInfo.innerText = `Ratings: ${avg}/5`;
  highlightStars(Math.round(avg));
}

function highlightStars(value) {
  stars.forEach(star => {
    star.classList.toggle("bi-star-fill", star.dataset.value <= value);
    star.classList.toggle("bi-star", star.dataset.value > value);
  });
}

function lockStars() {
  stars.forEach(s => {
    s.style.pointerEvents = "none";
    s.style.opacity = "0.5";
  });
}

async function init() {
  userIP = await getIP();
  binData = await loadBin();
  updateDisplay(binData);

  if (userIP && binData.ips.includes(userIP)) {
    lockStars();
  }
}

stars.forEach(star => {
  star.addEventListener("click", async () => {
    if (!userIP || !binData) return;

    if (binData.ips.includes(userIP)) {
      alert("You've already rated this portfolio!");
      return;
    }

    const value = parseInt(star.dataset.value);
    binData.total += value;
    binData.count += 1;
    binData.ips.push(userIP);

    await saveBin(binData);
    updateDisplay(binData);
    stars.forEach(s => {
      s.classList.remove("bi-star", "bi-star-fill");
    });
    highlightStars(value);
    lockStars();
  });
});

init();