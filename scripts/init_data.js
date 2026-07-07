const saveAsLib = window.saveAs;
const initChildren = [];

const InitBut = document.getElementById('init').shadowRoot.getElementById('InitBut')
InitBut.addEventListener("click", () => {
    generateInit()
});

let after_intro1 = `Главная задача при проектировании балочной клетки состоит в том, чтобы путем технико-экономического сравнения различных вариантов найти наиболее экономичную конструкцию балочной клетки по расходу материала на 1 квадратный метр площади перекрытия. Учитывая, что наибольший расход стали в балочных клетках идет на стальной настил, толщина которого зависит от расстояния между балками настила, следует стремиться к такому расположению балок настила, а также вспомогательных балок, чтобы суммарный расход стали этих конструкций на 1 квадратный метр перекрытия был наименьшим.`
let after_intro2 =`С этой целью в работе составлены три варианта расположения вспомогательных балок и балок настила. После статического конструктивного расчетов настила и балок для всех вариантов производится их сравнение по расходу стали на 1 квадратный метр площади перекрытия балочной клетки и количеству монтажных единиц.`

function createInit() {
    const init = document.getElementById('init')
    const dataIn = {
        taskNum: init.shadowRoot.getElementById('taskNum').value,
        paramL: init.shadowRoot.getElementById('paramL').value,
        param_l: init.shadowRoot.getElementById('param_l').value,
        paramH: init.shadowRoot.getElementById('paramH').value,
        payload: init.shadowRoot.getElementById('payload').value,
        concrete: init.shadowRoot.getElementById('concrete').value,
        columns: init.shadowRoot.getElementById('columns').value,
        joints: init.shadowRoot.getElementById('joints').value,
        floorType: init.shadowRoot.getElementById('floorType').value,
        note: init.shadowRoot.getElementById('note').value
    };
    let grid_sizes = 'В данной курсовой работе проектируется балочная клетка с размерами в плане' + dataIn.paramL + '×' + dataIn.param_l + 'м.'
    
    if (typeof window.docx === 'undefined') {
        alert("Ошибка: Библиотека docx не загрузилась. Проверьте интернет-подключение.");
        return;
    }
    initChildren.push(
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
    )
    initChildren.push(
        new Paragraph({}),
        new Paragraph({
            spacing: {
                before: 0,
                after: 120
            },
            indent: {
                firstLine: 709, // Красная строка 1,25 см
            },
            alignment: AlignmentType.JUSTIFIED,
            children: [
                new TextRun({ 
                    text: grid_sizes,
                    size: 28, 
                    font: "Times New Roman",
                }) 
            ]
        }),
        new Paragraph({
            spacing: {
                before: 0,
                after: 120,
                line: 360,
                lineRule: LineRuleType.AUTO,
            },
            indent: {
                firstLine: 709, // Красная строка 1,25 см
            },
            alignment: AlignmentType.JUSTIFIED,
            children: [
                new TextRun({ 
                    text: after_intro1,
                    size: 28, 
                    font: "Times New Roman",
                    
                }) 
            ]
        }),
        new Paragraph({
            spacing: {
                before: 0,
                after: 120,
                line: 360,
                lineRule: LineRuleType.AUTO,
            },
            indent: {
                firstLine: 709, // Красная строка 1,25 см
            },
            alignment: AlignmentType.JUSTIFIED,
            children: [
                new TextRun({ 
                    text: after_intro2,
                    size: 28, 
                    font: "Times New Roman",
                    
                }),
                new PageBreak()
            ]
        })
    );
}

function generateInit() {
    createInit()
    if (!docxLib) {
        alert("Ошибка: Библиотека docx не загрузилась. Проверьте интернет-подключение.");
        return;
    }
    // Сбор данных из полей формы
    const doc = new Document({
        sections: [{
            properties: {
                page: {
                    margin: { top: 1134, bottom: 1134, left: 1700, right: 1700 }
                }
            },
            children: initChildren
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