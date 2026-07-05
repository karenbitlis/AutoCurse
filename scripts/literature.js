const litChildren = []

const LitBut = document.getElementById('litera').shadowRoot.getElementById('LitBut')
LitBut.addEventListener("click", () => {
    generateLitera()
});

const CONSTANT_TITLE = "Список используемой литературы:";

const defaultSources = [
    "Металлические конструкции: учебник для студ. высш. учеб. заведений / [Ю. И. Кудишин, Е.И. Беленя, В.С. Игнатьева и др.] под ред. Ю.И. Кудишина. – 11-е издание., стер. – М. : Издательский центр «Академия», 2008. – 688 с.",
    "К.Ф. Шагивалеев, М.М. Айгумов. Конструирование и расчет балочной площадки промышленного здания: Учебное пособие для студентов специальности 290300 «Промышленное и гражданское строительство» Саратов 2011",
    "СП 16.13330.2022 «Стальные конструкции»/Госстрой России. – М.:ЦИТП Госстрой России, 2022 –174 с.",
    "СП 20.13330.2022 «Нагрузки и воздействия»/Госстрой России. – М.:ЦИТП Госстрой России, 2022 –102 с."];

let container = document.getElementById('litera').shadowRoot.getElementById('sourcesContainer');

function createSourceRow(value = "") {
    const index = container.children.length + 1;
    const div = document.createElement('div');
    document.getElementById('litera').shadowRoot.append(div)
    div.className = 'source-item';
    div.innerHTML = `
        <span class="source-number">${index}.</span>
        <textarea class="source-text" id="litInput${index}">${value}</textarea>
        <button type="button" class="btn-delete" onclick="removeSourceRow(this)">X</button>
    `;
    container.appendChild(div);}

defaultSources.forEach(src => createSourceRow(src));

const btn_delete = document.getElementById('litera').shadowRoot.querySelectorAll('.btn-delete')
btn_delete.forEach(btn => {
    btn.addEventListener("click", () => {
        console.log(btn)
        removeSourceRow(btn)
    });});

function addSourceRow() {
    createSourceRow("");
    renumberSources();
}

const addSource = document.getElementById('litera').shadowRoot.getElementById('addSourceBut')
addSource.addEventListener("click", () => {
    addSourceRow()
});

function removeSourceRow(button) {
    button.parentElement.remove();
    renumberSources();
}

function renumberSources() {
    const items = container.querySelectorAll('.source-item');
    items.forEach((item, idx) => {
        item.querySelector('.source-number').innerText = `${idx + 1}.`;
    });
}


function createLitera() {
    const textareas = container.querySelectorAll('.source-text');
    // 1. ЗАГОЛОВОК
    litChildren.push(new Paragraph({
        alignment: AlignmentType.CENTER, // Безопасное выравнивание по центру
        spacing: { before: 0, after: 240 }, 
        children: [
            new TextRun({
                text: CONSTANT_TITLE,
                bold: true
            })
        ]
    }));

    // 2. ИСТОЧНИКИ
    textareas.forEach((textarea, idx) => {
        const textContent = textarea.value.trim();
        if (!textContent) return;

        const fullLineText = `${idx + 1}. ${textContent}`;

        litChildren.push(new Paragraph({
            alignment: AlignmentType.JUSTIFIED, // Официальный тип из библиотеки!
            spacing: { before: 0, after: 0 }, 
            indentation: {
                firstLine: 709, // Красная строка 1.25 см
                left: 0,
                hanging: 0
            },
            children: [
                new TextRun({
                    text: fullLineText
                })
            ]
        }));
    });
    litChildren.push(new Paragraph({
        children: [
            new PageBreak(), 
        ]
    }));
}
function generateLitera() {
    createLitera()
    if (!docxLib) {
        alert("Ошибка: Библиотека docx не загрузилась.");
        return;
    }
    const doc = new Document({
        styles: {
            default: {
                document: {
                    run: {
                        font: "Times New Roman",
                        size: 28 
                    },
                    paragraph: {
                        spacing: {
                            line: 360, 
                            lineRule: "auto" 
                        }
                    }
                }
            }
        },
        sections: [{
            properties: {
                page: {
                    margin: { 
                        top: 1134,    
                        bottom: 1134, 
                        left: 1700,   
                        right: 1700   
                    }
                }
            },
            children: litChildren
        }]
    });
    Packer.toBlob(doc).then(blob => {
        if (saveAsLib) {
            saveAsLib(blob, "Bibliography.docx");
        } else {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "Bibliography.docx";
            link.click();
            setTimeout(() => window.URL.revokeObjectURL(link.href), 100);
        }
    }).catch(err => {
        console.error(err);
        alert("Ошибка генерации документа.");
    });
}