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