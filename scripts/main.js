document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".page");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const collectBtn = document.getElementById("collectDataBtn");
    const progressBar = document.getElementById("progressBar");
    
    let currentIndex = 0;

    function updateSlider() {
        // Переключаем активные классы для слоев-страниц
        pages.forEach((page, index) => {
            if (index === currentIndex) {
                page.classList.add("active");
            } else {
                page.classList.remove("active");
            }
        });

        // Линия прогресса
        const progressPercent = ((currentIndex + 1) / pages.length) * 100;
        progressBar.style.width = `${progressPercent}%`;

        // Доступность стрелок
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === pages.length - 1;

        // ИСПРАВЛЕНО: Показываем кнопку создания файла только на последнем слайде
        if (currentIndex === pages.length - 1) {
            collectBtn.style.display = "block";
        } 
    }

    nextBtn.addEventListener("click", () => {
        if (currentIndex < pages.length - 1) { currentIndex++; updateSlider(); }
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) { currentIndex--; updateSlider(); }
    });

    // Инициализация при старте
    updateSlider();
})
