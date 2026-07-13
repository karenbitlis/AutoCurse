let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".page");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const collectBtn = document.getElementById("collectDataBtn");
    const progressBar = document.getElementById("progressBar");
    
    

    function updateSlider() {
        // printVar()
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
        const progressPercent = ((currentIndex) / (pages.length - 1)) * 100;
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
        if (currentIndex > 4) {
            floor.shadowRoot.getElementById('floorExplanation').innerText = 'Ранее вы выбрали тип ' + floorType
        }
        init.shadowRoot.getElementById('floorType').value = floorType
        usefullLoad = parseFloat(init.shadowRoot.getElementById('payload').value)
    });
    // Инициализация при старте
    updateSlider();
})

let documento = []
function generateDocx() {
    documento = []
    createTit()
    createIntro()
    createInit()
    createVargen()
    createFloor()
    createDeck()
    createLitera()
    documento.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: "Оглавление", bold: true, font: "Times New Roman", size: 28 
                }),
            ]
        }),

        new TableOfContents("Оглавление", {
            hyperlink: true,
            headingStyleRange: "1-3", // Диапазон уровней заголовков (с 1 по 3)
            upperHeadingLevel: 3,
            lowerHeadingLevel: 1,
        }),
        new Paragraph({
            children: [
                new PageBreak()
            ]
        }),
    );
    documento.push(...introChildren)
    documento.push(...initChildren)
    documento.push(...vargenChildren)
    documento.push(...floorChildren)

        decking_varo.value = 1
        roof_varo.value = 1
        roofe_varo.value = 1
        sece_varo.value = 1
        secep_varo.value = 1
        changeDeckVar()
        changeRoofVar()
        changerEpureVar()
        changeSecBeamVar()
        changeSecEpureVar()
        createDeck()
        createRoof()
        createRoofEpure()
        createSecBeam()
        createSecEpure()
        documento.push(...dkChildren)
        documento.push(...roofChildren)
        documento.push(...reBeamChildren)
        documento.push(...secChildren)
        documento.push(...secondaryBeamChildren)
        
        
        decking_varo.value = 2
        roof_varo.value = 2
        roofe_varo.value = 2
        sece_varo.value = 2
        secep_varo.value = 2
        changeDeckVar()
        changeRoofVar()
        changerEpureVar()
        changeSecBeamVar()
        changeSecEpureVar()
        createDeck()
        createRoof()
        createRoofEpure()
        createSecBeam()
        createSecEpure()
        documento.push(...dkChildren)
        documento.push(...roofChildren)
        documento.push(...reBeamChildren)
        documento.push(...secChildren)
        documento.push(...secondaryBeamChildren)
        
        decking_varo.value = 3
        roof_varo.value = 3
        roofe_varo.value = 3
        sece_varo.value = 3
        secep_varo.value = 3
        changeDeckVar()
        changeRoofVar()
        changerEpureVar()
        changeSecBeamVar()
        changeSecEpureVar()
        createDeck()
        createRoof()
        createRoofEpure()
        createSecBeam()
        createSecEpure()
        documento.push(...dkChildren)
        documento.push(...roofChildren)
        documento.push(...reBeamChildren)
        documento.push(...secChildren)
        documento.push(...secondaryBeamChildren)
    createVarFin()
    documento.push(...varfinChildren)

    documento.push(...litChildren)
    
    if (!docxLib) {
        alert("Ошибка: Библиотека docx не загрузилась. Проверьте интернет-подключение.");
        return;
    }
    // Сбор данных из полей формы
    const doc = new Document({
        features: {
            updateFields: true,
        },
        styles: {
          paragraphStyles: [
            // Кастомный курсивный стиль (твой)
            {
              id: 'customItalicStyle',
              name: 'Custom Italic Style',
              basedOn: 'Normal',
              next: 'Normal',
              run: {
                font: 'Times New Roman',
                size: 28,
                italics: true,
              },
            },
            // Базовый стиль документа: Times New Roman, 14 pt
            {
              id: 'Normal',
              name: 'Normal',
              run: {
                font: 'Times New Roman',
                size: 28,
              },
            },
            // Заголовок 1: жирный, по центру
            {
              id: 'Heading1',
              name: 'Заголовок 1',
              basedOn: 'Heading 1',
              type: 'paragraph',
              paragraph: {
                alignment: 'center',
              },
              run: {
                font: 'Times New Roman',
                size: 28,
                bold: true,
              },
            },
            // Заголовок 2: жирный, по центру
            {
              id: 'Heading2',
              name: 'Заголовок 2',
              basedOn: 'Heading 2',
              type: 'paragraph',
              paragraph: {
            alignment: 'center',
              },
              run: {
                font: 'Times New Roman',
                size: 28,
                bold: true,
              },
            },

            // Заголовок 3: жирный, по центру
            {
              id: 'Heading3',
              name: 'Заголовок 3',
              basedOn: 'Heading 3',
              type: 'paragraph',
              paragraph: {
                alignment: 'center',
              },
              run: {
                font: 'Times New Roman',
                size: 28,
                bold: true,
              },
            },
          ],
        },
        sections: [
            {
            properties: {
                page: {
                    margin: { top: 1134, bottom: 1134, left: 1700, right: 1700 }
                }
            },
            // Передаем в эту секцию только содержимое титульника (например, titChildren)
            children: titChildren // или те элементы, которые относятся к титулу
            },

            {
            properties: {
                page: {
                    margin: { top: 1134, bottom: 1134, left: 1700, right: 1700 },
                    pageNumberStart: 2,
                    titlePage: true,
                }
            },
            footers: {
                // Обычный колонтитул (со 2-й страницы и далее): по центру снизу
                default: new Footer({
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER, // Выравнивание по центру
                            children: [
                                new TextRun({
                                    children: [PageNumber.CURRENT]
                                })
                            ]
                        })
                    ]
                }),
                // Колонтитул для первой страницы: пустой (без номера)
                first: new Footer({
                    children: []
                })
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
    hideLoader()
}


const allShadowRoots = Array.from(document.querySelectorAll('*'))
  .filter(el => el.shadowRoot)
  .map(el => el.shadowRoot);
// Теперь у тебя в allShadowRoots — массив всех shadowRoot
allShadowRoots.forEach(root => {
  root.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', e => {
      if (e.target.value === '1') {
        decking_varo.value = 1
        roof_varo.value = 1
        roofe_varo.value = 1
        sece_varo.value = 1
        secep_varo.value = 1
        changeDeckVar()
        changeRoofVar()
        changerEpureVar()
        changeSecBeamVar()
        changeSecEpureVar()
      } else if (e.target.value === '2'){
        decking_varo.value = 2
        roof_varo.value = 2
        roofe_varo.value = 2
        sece_varo.value = 2
        secep_varo.value = 2
        changeDeckVar()
        changeRoofVar()
        changerEpureVar()
        changeSecBeamVar()
        changeSecEpureVar()
      } else if (e.target.value === '3'){
        decking_varo.value = 3
        roof_varo.value = 3
        roofe_varo.value = 3
        sece_varo.value = 3
        secep_varo.value = 3
        changeDeckVar()
        changeRoofVar()
        changerEpureVar()
        changeSecBeamVar()
        changeSecEpureVar()
      }
    });
  });
});


const loader = document.getElementById('fullscreen-loader');

// Показываем лоадер
function showLoader() {
    loader.classList.add('visible');
    setTimeout(() => {
        generateDocx()
    }, 200); 
}

// Скрываем лоадер
function hideLoader() {
    loader.classList.remove('visible');
}

const collectDataBtn = document.getElementById('collectDataBtn')

collectDataBtn.addEventListener("click", () => {
    showLoader()
})