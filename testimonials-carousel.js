const track = document.querySelector('.testimonial-track');
const leftBtn = document.querySelector('.arrow.left');
const rightBtn = document.querySelector('.arrow.right');
const step = 440; // ширина карточки + gap

rightBtn.addEventListener('click', () => {
  track.scrollBy({ left: step, behavior: 'smooth' });
});

leftBtn.addEventListener('click', () => {
  track.scrollBy({ left: -step, behavior: 'smooth' });
});
