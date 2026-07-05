const docxLib = window.docx;
const { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, PageBreak, textParagraphs } = docxLib;
const titChildren = [];

const TitlePageBut = document.getElementById('tit').shadowRoot.getElementById('TitlePageBut')
TitlePageBut.addEventListener("click", () => {
    generateTitle()
});

function createTit() {
    const tit = document.getElementById('tit')
    const data = {
        university: tit.shadowRoot.getElementById('university').value,
        institute: tit.shadowRoot.getElementById('institute').value,
        department: tit.shadowRoot.getElementById('department').value,
        direction: tit.shadowRoot.getElementById('direction').value,
        profile: tit.shadowRoot.getElementById('profile').value,
        workType: tit.shadowRoot.getElementById('workType').value,
        discipline: tit.shadowRoot.getElementById('discipline').value,
        topic: tit.shadowRoot.getElementById('topic').value,
        studentInst: tit.shadowRoot.getElementById('studentInst').value,
        group: tit.shadowRoot.getElementById('group').value,
        educationForm: tit.shadowRoot.getElementById('educationForm').value,
        gradebook: tit.shadowRoot.getElementById('gradebook').value,
        authorName: tit.shadowRoot.getElementById('authorName').value,
        reviewerDep: tit.shadowRoot.getElementById('reviewerDep').value,
        reviewerName: tit.shadowRoot.getElementById('reviewerName').value,
        city: tit.shadowRoot.getElementById('city').value+', '+tit.shadowRoot.getElementById('year').value
        
    };
    if (typeof window.docx === 'undefined') {
        alert("Библиотека docx еще не загрузилась. Пожалуйста, подождите.");
        return;
    }
    // Вспомогательная функция для создания абзацев шапки (Применяем кастомный стиль)
    const createHeaderParam = (text) => new Paragraph({
        alignment: AlignmentType.CENTER,
        style: "customItalicStyle",
        spacing: { after: 60 },
        children: [new TextRun({ text: text })]
    });
    // Функция для элементов справа (размер 28 — это 14pt)
    const createLeftParam = (label, value, isBoldVal = false) => new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { after: 40 },
        indent: { left: 5600 },
        children: [
            new TextRun({ text: label, size: 24, font: "Times New Roman" }),
            new TextRun({ text: value, bold: isBoldVal, size: 24, font: "Times New Roman" })
        ]
    });
    titChildren.push(
        ...data.university.split('\n').map(line => createHeaderParam(line)),
        createHeaderParam(data.institute),
        createHeaderParam(data.department),
        createHeaderParam(`Направление «${data.direction}»`),
        createHeaderParam(`Профиль «${data.profile}»`),

        ...Array(3).fill().map(() => new Paragraph({ spacing: { after: 240 } })),

        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
            children: [new TextRun({ text: data.workType, bold: true, size: 32, font: "Times New Roman" })]
        }),

        ...Array(1).fill().map(() => new Paragraph({ spacing: { after: 240 } })),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
                new TextRun({ text: "по дисциплине ", size: 28, font: "Times New Roman" }),
                new TextRun({ text: `«${data.discipline}»`, bold: true, size: 28, font: "Times New Roman" })
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
                new TextRun({ text: "Тема: ", size: 28, font: "Times New Roman" }),
                new TextRun({ text: `«${data.topic}»`, size: 28, font: "Times New Roman" })
            ]
        }),

        ...Array(1).fill().map(() => new Paragraph({ spacing: { after: 180 } })),

        // --- БЛОК ВЫПОЛНИЛ ---
        new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 60 },
            indent: { left: 5600 },
            children: [new TextRun({ text: "Выполнил(а):", bold: true, size: 24, font: "Times New Roman" })]
        }),
        createLeftParam("студент ", data.studentInst, true),
        createLeftParam("группы ", data.group, true),
        createLeftParam("форма обучения: ", data.educationForm, true),
        createLeftParam("№ зачетной книжки: ", data.gradebook, true),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 40 },
            indent: { left: 5600 },
            children: [new TextRun({ text: data.authorName, bold: true, size: 24, font: "Times New Roman" })]
        }),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 240 },
            indent: { left: 5600 },
            children: [new TextRun({ text: "Подпись:_____________", bold: true, size: 24, font: "Times New Roman" })]
        }),

        // --- БЛОК ПРОВЕРИЛ ---
        new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 60 },
            indent: { left: 5600 },
            children: [new TextRun({ text: "Проверил(а):", bold: true, size: 24, font: "Times New Roman" })]
        }),
        createLeftParam("Преподаватель кафедры ", data.reviewerDep),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 40 },
            indent: { left: 5600 },
            children: [new TextRun({ text: data.reviewerName, bold: true, size: 24, font: "Times New Roman" })]
        }),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 240 },
            indent: { left: 5600 },
            children: [new TextRun({ text: "Подпись:_____________", bold: true, size: 24, font: "Times New Roman" })]
        }),

        ...Array(1).fill().map(() => new Paragraph({ spacing: { after: 240 } })),

        // --- ПОДВАЛ ---
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 60 },
            children: [new TextRun({ text: data.city, size: 28, font: "Times New Roman" }), new PageBreak()]
        }),
    )
}
function generateTitle() {
    createTit()
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
            children: titChildren
        }]
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, "Title_Page.docx");
    }).catch(err => {
        console.error(err);
        alert("Произошла ошибка, детали в консоли.");
    });
}