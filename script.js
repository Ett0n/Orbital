const $document = document.querySelector(".home_body");
const $nav = $document.querySelector("#header__nav");
const $navAside = $document.querySelector(".header__aside_nav");
const $scrollArrow = $document.querySelector(".header__nav_fleche");
const $section1 = $document.querySelector("#section1");
const $section2 = $document.querySelector("#section2");
const $section3 = $document.querySelector("#section3");
const $section4 = $document.querySelector("#section4");

let timerScroll = true;
let timerWheelScroll = true;
let sectionArray = [$section1, $section2, $section3, $section4];
let pointer = 1;

let touchstartY = 0;
let touchendY = 0;

let mobile = false;

if (window.matchMedia("(max-width: 30rem)").matches) {
  mobile = true;
  window.onscroll = function (e) {
    if (timerScroll) {
      $scrollArrow.classList.add("hidden");
      $navAside.classList.remove("hiddenMenu");
      timerScroll = false;
      timerSwitchNav();
    }
  };

  $nav.addEventListener("touchstart", (e) => {
    e.preventDefault;
    if (e.target.parentNode.classList.contains("header__nav_fleche_figure")) {
      pointer++;

      swipeToSection(pointer);
    }
    if (
      e.target.parentNode.parentNode.parentNode.classList.contains(
        "header__aside_nav"
      )
    ) {
      pointer = e.target.getAttribute("data-id");

      swipeToSection(pointer);
    }
  });

  function handleGesture() {
    if (touchendY < touchstartY) {
      if (pointer < 4) {
        pointer++;
        swipeToSection(pointer);
      }
    }
    if (touchendY > touchstartY) {
      if (pointer > 1) {
        pointer--;
        swipeToSection(pointer);
      }
    }
  }

  $document.addEventListener("touchstart", (e) => {
    touchstartY = e.changedTouches[0].screenY;
  });

  $document.addEventListener("touchend", (e) => {
    touchendY = e.changedTouches[0].screenY;
    handleGesture();
  });

  function timerSwitchNav() {
    setTimeout(function () {
      timerScroll = true;
      $navAside.classList.add("hiddenMenu");
      if (pointer < 4) $scrollArrow.classList.remove("hidden");
    }, 2000);
  }

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
} //end media query for mobile screen size.

function swipeToSection(i) {
  if (i == 4) {
    $scrollArrow.classList.add("hidden");
  } else if ($scrollArrow.classList.contains("hidden") && i < 4 && !mobile) {
    $scrollArrow.classList.remove("hidden");
  }
  sectionArray[i - 1].scrollIntoView({
    behavior: "smooth",
  });
  let navElement = $document.querySelectorAll(`[data-id="${i}"]`);
  if ($document.querySelector(".navActive") != null) {
    $document.querySelector(".navActive").classList.remove("navActive");
  }
  navElement[0].classList.add("navActive");
}

$nav.addEventListener("click", (e) => {
  e.preventDefault;
  if (e.target.parentNode.classList.contains("header__nav_fleche_figure")) {
    pointer++;

    swipeToSection(pointer);
  }
  if (
    e.target.parentNode.parentNode.parentNode.classList.contains(
      "header__aside_nav"
    )
  ) {
    pointer = e.target.getAttribute("data-id");
    swipeToSection(pointer);
  }
});

window.addEventListener("wheel", function (event) {
  if (event.deltaY < 0 && pointer > 1 && timerWheelScroll) {
    timerWheel();
    if (timerWheelScroll) {
      timerWheelScroll = false;
      pointer--;
      swipeToSection(pointer);
    }
  } else if (event.deltaY > 0 && pointer < 4 && timerWheelScroll) {
    timerWheel();
    if (timerWheelScroll) {
      timerWheelScroll = false;
      pointer++;
      swipeToSection(pointer);
    }
  }
});

function timerWheel() {
  setTimeout(function () {
    timerWheelScroll = true;
  }, 1000);
}
