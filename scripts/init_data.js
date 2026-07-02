function generateDocx() {
    const docxLib = window.docx || (window.umd && window.umd.docx);
    const saveAsLib = window.saveAs;

    if (!docxLib) {
        alert("Ошибка: Библиотека docx не загрузилась. Проверьте интернет-подключение.");
        return;
    }

    const { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType } = docxLib;

    // Сбор данных из полей формы
    const dataIn = {
        taskNum: document.getElementById('taskNum').value,
        paramL: document.getElementById('paramL').value,
        param_l: document.getElementById('param_l').value,
        paramH: document.getElementById('paramH').value,
        payload: document.getElementById('payload').value,
        concrete: document.getElementById('concrete').value,
        columns: document.getElementById('columns').value,
        joints: document.getElementById('joints').value,
        floorType: document.getElementById('floorType').value,
        note: document.getElementById('note').value
    };

    const doc = new Document({
        sections: [{
            properties: {
                page: {
                    margin: { top: 1134, bottom: 1134, left: 1700, right: 1700 }
                }
            },
            children: [
                // Заголовок "Исходные данные:"
                new Paragraph({
                    alignment: AlignmentType.LEFT,
                    spacing: { before: 120, after: 280 },
                    indent: { left: 800 },
                    children: [new TextRun({ text: "Исходные данные:", bold: true, font: "Times New Roman", size: 28 })]
                }),

                // ТАБЛИЦА 1: Геометрия и нагрузки
                new Table({
                    alignment: AlignmentType.CENTER,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        // Шапка таблицы 1
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "№ задания", bold: true, font: "Times New Roman", size: 28 })] })] }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "L, м", bold: true, font: "Times New Roman", size: 28 })] })] }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "l, м", bold: true, font: "Times New Roman", size: 28 })] })] }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "H, м", bold: true, font: "Times New Roman", size: 28 })] })] }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Нормативная полезная нагрузка, кН/м2", bold: true, font: "Times New Roman", size: 28 })] })] }),
                            ]
                        }),
                        // Строка данных таблицы 1
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: dataIn.taskNum, font: "Times New Roman", size: 28 })] })] }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: dataIn.paramL, font: "Times New Roman", size: 28 })] })] }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: dataIn.param_l, font: "Times New Roman", size: 28 })] })] }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: dataIn.paramH, font: "Times New Roman", size: 28 })] })] }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: dataIn.payload, font: "Times New Roman", size: 28 })] })] }),
                            ]
                        })
                    ]
                }),

                // Зазор между таблицами
                new Paragraph({ spacing: { after: 240 } }),

                // ТАБЛИЦА 2: Конструкции и материалы
                new Table({
                    alignment: AlignmentType.CENTER,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        // Шапка таблицы 2
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Класс бетона под фундаменты", bold: true, font: "Times New Roman", size: 28 })] })] }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Колонны", bold: true, font: "Times New Roman", size: 28 })] })] }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Укрупнительные стыки балок", bold: true, font: "Times New Roman", size: 28 })] })] }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Тип пола", bold: true, font: "Times New Roman", size: 28 })] })] }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Примечание", bold: true, font: "Times New Roman", size: 28 })] })] }),
                            ]
                        }),
                        // Строка данных таблицы 2
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: dataIn.concrete, font: "Times New Roman", size: 28 })] })] }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: dataIn.columns, font: "Times New Roman", size: 28 })] })] }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: dataIn.joints, font: "Times New Roman", size: 28 })] })] }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: dataIn.floorType, font: "Times New Roman", size: 28 })] })] }),
                                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: dataIn.note, font: "Times New Roman", size: 28 })] })] }),
                            ]
                        })
                    ]
                })
            ]
        }]
    });
    // Конвертация структуры в файл и сохранение
    Packer.toBlob(doc).then(blob => {
        if (saveAsLib) {
            saveAsLib(blob, "Init_Data.docx");
        } else {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "Init_Data.docx";
            link.click();
        }
    }).catch(err => {
        console.error(err);
        alert("Ошибка сохранения структуры таблиц.");
    });
}