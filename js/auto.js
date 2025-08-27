// Отримуємо всі картинки з data-src
const lazyImages = document.querySelectorAll('img[data-src]');
const loadBtn = document.getElementById('load-images');

// Функція для завантаження картинки
function loadImage(img) {
  img.src = img.dataset.src; // переносимо data-src -> src
  img.onload = () => {
    img.classList.add('loaded'); // додаємо клас для анімації
  };
  observer.unobserve(img); // перестаємо спостерігати
}

// Створюємо IntersectionObserver
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImage(entry.target);
    }
  });
});

// Спостерігаємо за кожною картинкою
lazyImages.forEach(img => observer.observe(img));

// Додатково: завантаження всіх картинок при кліку на кнопку
loadBtn.addEventListener('click', () => {
  lazyImages.forEach(img => {
    if (!img.classList.contains('loaded')) {
      loadImage(img);
    }
  });
});