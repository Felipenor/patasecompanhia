const imgs = document.querySelectorAll('.img-select a');

const imgBtns = [...imgs];

let imgId = 1;


// Função Click


// Slide Topo
const images =[
  { 'id': '1', 'url': './assets/img/slide/img1.jpg'},
  { 'id': '2', 'url': './assets/img/slide/img2.jpg'},
  { 'id': '3', 'url': './assets/img/slide/img3.jpg'},
  { 'id': '4', 'url': './assets/img/slide/img4.jpg'},
];

const containerItems = document.querySelector("#container-items");

const loadImages = (images) =>{
  images.forEach(image =>{
    containerItems.innerHTML += `
    <div class='item'>
    <img src='${image.url}'>
    </div>
    `;
  });
};

loadImages(images, containerItems);

let items = document.querySelectorAll(".item");

const previous = () =>{
  const  lastItem = items[items.length - 1];
  containerItems.insertBefore(lastItem, items[0]);
  items = document.querySelectorAll(".item");
};
const next = () =>{
  containerItems.appendChild(items[0]);
  items = document.querySelectorAll(".item");
};

document.querySelector("#previous").addEventListener("click", previous);
document.querySelector("#next").addEventListener("click", next);

let autoPlayInterval;

const startAutoPlay = () =>{
  autoPlayInterval = setInterval(() =>{
    next();
  }, 5000);
};

const stopAutoPlay = () =>{
  clearInterval(autoPlayInterval);
};

startAutoPlay();

containerItems.addEventListener("mouseenter", stopAutoPlay);
containerItems.addEventListener("mouseleave", startAutoPlay);

//Fim do Slide Top

// Seleciona todos os elementos que podem interferir com o hover (incluindo o container-shadow)

const interactiveElements = [containerItems, ... document.querySelectorAll('.container-shadow, .item, .item img')];

interactiveElements.forEach(element =>{
  element.addEventListener("mouseenter,")
})

// Abaixo é o código js para funciona o slide da equipe

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");

const carouselChildren = [...carousel.children];

let isDragging = false,
    isAutoPlay = true,
    startX,
    startScrollLeft,
    timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildren.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildren.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

/* Função de quando o slide começa */
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

/* Função enquanto o usuário arrasta */
const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

/* Função de quando o usuário para */
const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  /* Se o carousel estiver no inicio, rola para o final */
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  }
  /* Se o carousel estiver no final, rola para o inicio */
  else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) isAutoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return;
  timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
};

autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// Seleciona os elementos do botão de hambúrguer, pop-up do menu e botão de fechar
const menuToggle = document.getElementById('menu-toggle');
const menuPopup = document.getElementById('menu-popup');
const menuClose = document.getElementById('menu-close');

// Adiciona evento de clique ao botão de hambúrguer para abrir o menu
menuToggle.addEventListener('click', () => {
  menuPopup.style.display = 'flex'; // Exibe o menu pop-up
});

// Adiciona evento de clique ao botão de fechar para fechar o menu
menuClose.addEventListener('click', () => {
  menuPopup.style.display = 'none'; // Esconde o menu pop-up
});