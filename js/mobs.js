/**
 * Скрипт для анимации пиксельных мини-мобов внизу экрана
 */

// Массив изображений для мобов
const mobImages = [
    // Используем изображения из папки mobs
    'images/mobs/IMG_20250518_001016-removebg-preview.png',
    'images/mobs/IMG_20250518_001036-removebg-preview.png',
    'images/mobs/IMG_20250518_001135-removebg-preview.png',
    'images/mobs/IMG_20250518_001300-removebg-preview.png',
    'images/mobs/IMG_20250518_003337-removebg-preview.png'
];

// Контейнер для мобов
const mobsContainer = document.getElementById('mobs-container');

// Количество мобов
const numberOfMobs = 8;

// Создание мобов
function createMobs() {
    for (let i = 0; i < numberOfMobs; i++) {
        const mob = document.createElement('div');
        mob.className = 'mob';
        
        // Выбираем случайное изображение для моба
        const randomImageIndex = Math.floor(Math.random() * mobImages.length);
        const mobImage = mobImages[randomImageIndex];
        
        // Устанавливаем изображение как фон
        mob.style.backgroundImage = `url('${mobImage}')`;
        
        // Случайная начальная позиция по горизонтали
        const randomX = Math.floor(Math.random() * (window.innerWidth - 32));
        mob.style.left = `${randomX}px`;
        
        // Добавляем моба в контейнер
        mobsContainer.appendChild(mob);
        
        // Запускаем анимацию движения
        animateMob(mob);
    }
}

// Анимация движения моба
function animateMob(mob) {
    // Случайная скорость для каждого моба
    const speed = 0.5 + Math.random() * 1.5; // от 0.5 до 2 пикселя в кадр
    
    // Случайное направление (влево или вправо)
    let direction = Math.random() > 0.5 ? 1 : -1;
    
    // Параметры для прыжка
    let isJumping = false;
    let jumpHeight = 0;
    const maxJumpHeight = 10 + Math.random() * 10; // Случайная высота прыжка от 10 до 20 пикселей
    let jumpDirection = 1; // 1 - вверх, -1 - вниз
    const jumpSpeed = 0.5 + Math.random() * 0.5; // Скорость прыжка
    
    // Если направление влево, отражаем спрайт
    if (direction === -1) {
        mob.classList.add('flip');
    }
    
    // Функция для обновления позиции моба
    function updatePosition() {
        // Текущая позиция по горизонтали
        const currentLeft = parseInt(mob.style.left) || 0;
        
        // Новая позиция по горизонтали
        let newLeft = currentLeft + (speed * direction);
        
        // Проверка границ экрана
        if (newLeft > window.innerWidth - 32) {
            // Достигли правой границы, меняем направление
            direction = -1;
            mob.classList.add('flip');
            newLeft = window.innerWidth - 32;
        } else if (newLeft < 0) {
            // Достигли левой границы, меняем направление
            direction = 1;
            mob.classList.remove('flip');
            newLeft = 0;
        }
        
        // Обновляем позицию по горизонтали
        mob.style.left = `${newLeft}px`;
        
        // Обработка прыжка
        if (isJumping) {
            // Если моб прыгает, обновляем высоту прыжка
            jumpHeight += jumpSpeed * jumpDirection;
            
            // Проверяем, достигли ли мы максимальной высоты или вернулись на землю
            if (jumpHeight >= maxJumpHeight) {
                // Достигли максимальной высоты, начинаем падать
                jumpDirection = -1;
            } else if (jumpHeight <= 0 && jumpDirection === -1) {
                // Вернулись на землю, прыжок завершен
                isJumping = false;
                jumpHeight = 0;
                jumpDirection = 1;
            }
            
            // Обновляем позицию по вертикали
            mob.style.bottom = `${5 + jumpHeight}px`;
        } else {
            // Случайный шанс начать прыжок
            if (Math.random() < 0.01) {
                isJumping = true;
            }
        }
        
        // Случайное изменение направления с небольшой вероятностью
        if (Math.random() < 0.005) {
            direction *= -1;
            if (direction === -1) {
                mob.classList.add('flip');
            } else {
                mob.classList.remove('flip');
            }
        }
        
        // Продолжаем анимацию
        requestAnimationFrame(updatePosition);
    }
    
    // Запускаем анимацию
    requestAnimationFrame(updatePosition);
}

// Запускаем создание мобов после загрузки страницы
window.addEventListener('load', createMobs);

// Обновляем позиции мобов при изменении размера окна
window.addEventListener('resize', () => {
    // Удаляем всех существующих мобов
    mobsContainer.innerHTML = '';
    // Создаем новых мобов
    createMobs();
});
