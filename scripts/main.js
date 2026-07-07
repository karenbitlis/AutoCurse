document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".page");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const collectBtn = document.getElementById("collectDataBtn");
    const progressBar = document.getElementById("progressBar");
    
    let currentIndex = 0;

    function updateSlider() {
        printVar()
        drawVar()
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
        // nextBtn.disabled = currentIndex === pages.length - 1;

        // ИСПРАВЛЕНО: Показываем кнопку создания файла только на последнем слайде
        if (currentIndex === pages.length - 1) {
            collectBtn.style.display = "block";
            nextBtn.style.display = "none";
        } else {
            collectBtn.style.display = "none";
            nextBtn.style.display = "block";
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

function generateDocx() {
    createTit()
    createIntro()
    createInit()
    createVargen()
    createFloor()
    createLitera()
    

    const documento = []
    documento.push(...titChildren)
    documento.push(...introChildren)
    documento.push(...initChildren)
    documento.push(...vargenChildren)
    documento.push(...floorChildren)
    documento.push(...litChildren)
    
    if (!docxLib) {
        alert("Ошибка: Библиотека docx не загрузилась. Проверьте интернет-подключение.");
        return;
    }
    // Сбор данных из полей формы
    const doc = new Document({
        styles: {
            paragraphStyles: [
                {
                    id: "customItalicStyle",
                    name: "Custom Italic Style",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        font: "Times New Roman",
                        size: 28, // Увеличено до 14pt (28 полупунктов)
                        italics: true

                    }
                },
                {
                    id: "Normal",
                    name: "Normal",
                    run: {
                        font: "Times New Roman",
                        size: 28 // Базовый шрифт документа теперь тоже 14pt
                    }
                }
            ]
        },
        sections: [{
            properties: {
                page: {
                    margin: { top: 1134, bottom: 1134, left: 1700, right: 1700 }
                }
            },
            children: documento
        }]
    });
    // Конвертация структуры в файл и сохранение
    Packer.toBlob(doc).then(blob => {
        if (saveAsLib) {
            saveAsLib(blob, "Doco.docx");
        } else {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "Doco.docx";
            link.click();
        }
    }).catch(err => {
        console.error(err);
        alert("Ошибка сохранения структуры таблиц.");
    });
}