document.addEventListener("DOMContentLoaded", () => {
  const typing = document.getElementById("typing");
  const texts = [
    "Java Developer",
    "C Developer",
    "C++ Developer",
    "AI Specialist",
  ];
  let index = 0;
  let charIndex = 0;
  let currentText = "";
  let isDeleting = false;

  function type() {
    if (isDeleting) {
      currentText = texts[index].substring(0, charIndex - 1);
      charIndex--;
    } else {
      currentText = texts[index].substring(0, charIndex + 1);
      charIndex++;
    }

    typing.textContent = currentText;

    if (!isDeleting && charIndex === texts[index].length) {
      isDeleting = true;
      setTimeout(type, 1000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % texts.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, 200);
    }
  }

  type();

  const loading = document.getElementById("loading");
  window.addEventListener("load", () => {
    loading.style.display = "none";
  });

  //comment form handlig
  const commentForm = document.getElementById("comment-form");
  const commentList = document.getElementById("comment-list");

  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const comment = document.getElementById("comment").value.trim();
    if (!name || !email || !comment) {
      alert("please fill in all required fields.");
      return;
    }
    if (name && comment) {
      const commentItem = document.createElement("li");
      commentItem.innerHTML =
        "<strong>${name}/<strong> (${email})<br>${comment}";
      commentList.appendChild(commentItem);
      //clear form fields
      commentForm.requestFullscreen();
    }
  });

  const fadeInElements = document.querySelectorAll(".fadeInOnScroll");

  function fadeInOnScroll() {
    for (let element of fadeInElements) {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < window.innerHeight) {
        element.classList.add("fadeIn");
      }
    }
  }

  window.addEventListener("scroll", fadeInOnScroll);
  fadeInOnScroll();

  const skills = document.querySelectorAll(".skill");

  skills.forEach((skill) => {
    const circle = skill.querySelector(".circle svg circle:nth-child(2)");
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const percentage = skill.getAttribute("data-percentage");

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  });
});
