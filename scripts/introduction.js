function generateDocx() {
    const docxLib = window.docx || (window.umd && window.umd.docx);
    const saveAsLib = window.saveAs;
    if (!docxLib) {
        alert("Ошибка: Библиотека docx не загрузилась.");
        return;
    }
    // Убрали LineRule из деструктуризации, чтобы не было ошибки undefined
    const { Document, Packer, Paragraph, TextRun, AlignmentType,  PageBreak} = docxLib;

    const rawText = document.getElementById('introductionText').value;
    const textParagraphs = rawText.split(/\r?\n/).map(p => p.trim()).filter(p => p.length > 0);

    const docChildren = [];

    // 1. ЗАГОЛОВОК "Введение" (По центру, Жирный)
    docChildren.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 360 }, 
        children: [
            new TextRun({
                text: "Введение",
                bold: true
            })
        ]
    }));

    // 2. ОСНОВНОЙ ТЕКСТ
    textParagraphs.forEach(textLine => {
        const isListItem = textLine.startsWith("СП ");

        docChildren.push(new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                before: 0,
                after: 120
            },
            indent: {
                firstLine: 709, // Красная строка 1,25 см
            },
            children: [
                new TextRun({
                    text: textLine
                }), 
            ]
        }));
    });
    docChildren.push(new Paragraph({
            children: [
                new PageBreak(), 
            ]
        }));
    // Создаем документ с безопасными настройками интервалов
    const doc = new Document({
        styles: {
            default: {
                document: {
                    run: {
                        font: "Times New Roman",
                        size: 28 // 14 кегль
                    },
                    paragraph: {
                        spacing: {
                            line: 360, // Полуторный интервал (передаем числом)
                            lineRule: "auto" // Передаем строкой "auto" вместо обращения к LineRule.AUTO
                        }
                    }
                }
            }
        },
        sections: [{
            properties: {
                page: {
                    margin: { 
                        top: 1134,    // 2 см
                        bottom: 1134, // 2 см
                        left: 1700,   // 3 см
                        right: 1700   // 3 см
                    }
                }
            },
            children: docChildren
        }]
    });
    // Скачивание файла
    Packer.toBlob(doc).then(blob => {
        if (saveAsLib) {
            saveAsLib(blob, "Introduction.docx");
        } else {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "Introduction.docx";
            link.click();
        }
    }).catch(err => {
        console.error(err);
        alert("Ошибка сборки документа.");
    });
    console.log(AlignmentType);
}