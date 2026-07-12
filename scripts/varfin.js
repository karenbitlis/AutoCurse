let varfinChildren = []

const docxLib = window.docx;
const { Document, Packer, ImageRun, XmlComponent, LineRuleType, Paragraph, ommlXmlText, BorderStyle, VerticalAlign, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, PageBreak, textParagraphs } = docxLib;


let varus1A = 1
let varus1B = 2

let varus2A = 1.25
let varus2B = 2

let varus3A = 1
let varus3B = 2.5

let A = 5
let B = 10



let varusA_list = [varus1A, varus2A, varus3A]

let deck_weight_list = [1.099*100, 0.785*100, 1.099*100]


let roof_beam_list = [14, 16, 18]
let roof_weight_list = []
for (var i = 0; i < roof_beam_list.length; i++) {
    roof_weight_list.push(selectBeamByNumber(roof_beam_list[i]).weight/varusA_list[i])
}

let varusB_list = [varus1B, varus2B, varus3B]
let sec_beam_list = ['40Б2', '40Б2', '45Б1']
let sec_weight_list = []
for (var i = 0; i < sec_beam_list.length; i++) {
    sec_weight_list.push(sectBeamByNumber(sec_beam_list[i]).weight/varusB_list[i])
    console.log(varusB_list[i])
}

let roof_numeros = []
for (var i = 0; i < roof_beam_list.length; i++) {
    roof_numeros.push(
        (A/varusA_list[i]-1)*(B/varusB_list[i])
    )
}

let sec_numeros = []
for (var i = 0; i < roof_beam_list.length; i++) {
    sec_numeros.push(
        (B/varusB_list[i])+1
    )
}

document.getElementById('deck_f1').innerText = parToSrtingo(parToSumble(deck_weight_list[0]))
document.getElementById('deck_f2').innerText = parToSrtingo(parToSumble(deck_weight_list[1]))
document.getElementById('deck_f3').innerText = parToSrtingo(parToSumble(deck_weight_list[2]))

document.getElementById('roof_f1').innerText = parToSrtingo(parToSumble(roof_weight_list[0]))
document.getElementById('roof_f2').innerText = parToSrtingo(parToSumble(roof_weight_list[1]))
document.getElementById('roof_f3').innerText = parToSrtingo(parToSumble(roof_weight_list[2]))

document.getElementById('roof_num1').innerText = parToSrtingo(parToSumble(roof_numeros[0]))
document.getElementById('roof_num2').innerText = parToSrtingo(parToSumble(roof_numeros[1]))
document.getElementById('roof_num3').innerText = parToSrtingo(parToSumble(roof_numeros[2]))

document.getElementById('sec_f1').innerText = parToSrtingo(parToSumble(sec_weight_list[0]))
document.getElementById('sec_f2').innerText = parToSrtingo(parToSumble(sec_weight_list[1]))
document.getElementById('sec_f3').innerText = parToSrtingo(parToSumble(sec_weight_list[2]))

document.getElementById('sec_num1').innerText = parToSrtingo(parToSumble(sec_numeros[0]))
document.getElementById('sec_num2').innerText = parToSrtingo(parToSumble(sec_numeros[1]))
document.getElementById('sec_num3').innerText = parToSrtingo(parToSumble(sec_numeros[2]))


let deck_f1 = document.getElementById('deck_f1').innerText
let deck_f2 = document.getElementById('deck_f2').innerText
let deck_f3 = document.getElementById('deck_f3').innerText

deck_f1 = parToSumble(deck_f1)
deck_f2 = parToSumble(deck_f2)
deck_f3 = parToSumble(deck_f3)

let roof_f1 = document.getElementById('roof_f1').innerText
let roof_f2 = document.getElementById('roof_f2').innerText
let roof_f3 = document.getElementById('roof_f3').innerText

roof_f1 = parToSumble(roof_f1)
roof_f2 = parToSumble(roof_f2)
roof_f3 = parToSumble(roof_f3)

let sec_f1 = document.getElementById('sec_f1').innerText
let sec_f2 = document.getElementById('sec_f2').innerText
let sec_f3 = document.getElementById('sec_f3').innerText

sec_f1 = parToSumble(sec_f1)
sec_f2 = parToSumble(sec_f2)
sec_f3 = parToSumble(sec_f3)

let fin_f1 = document.getElementById('fin_f1')
let fin_f2 = document.getElementById('fin_f2')
let fin_f3 = document.getElementById('fin_f3')

function parToSumble(stringo) {
    return Math.ceil(parseFloat(String(stringo).replace(',','.'))*100)/100
}
function parToSrtingo(matho) {
    return String(matho).replace('.',',')
}

fin_f1.innerText = parToSrtingo(parToSumble(parToSumble(deck_f1) + parToSumble(roof_f1) + parToSumble(sec_f1)))
fin_f2.innerText = parToSrtingo(parToSumble(parToSumble(deck_f2) + parToSumble(roof_f2) + parToSumble(sec_f2)))
fin_f3.innerText = parToSrtingo(parToSumble(parToSumble(deck_f3) + parToSumble(roof_f3) + parToSumble(sec_f3)))

fin_f1_res = parToSumble(fin_f1.innerText)
fin_f2_res = parToSumble(fin_f2.innerText)
fin_f3_res = parToSumble(fin_f3.innerText)

if (Math.min(fin_f1_res, fin_f2_res, fin_f3_res) == fin_f1_res) {
    document.getElementById('radio-card1').innerHTML += '<h4 class="bestvar">Лучший по расходу стали</h4>'
    document.getElementById('floorChoice1').checked = true
} else if (Math.min(fin_f1_res, fin_f2_res, fin_f3_res) == fin_f2_res) {
    document.getElementById('radio-card2').innerHTML += '<h4 class="bestvar">Лучший по расходу стали</h4>'
    document.getElementById('floorChoice2').checked = true
} else if (Math.min(fin_f1_res, fin_f2_res, fin_f3_res) == fin_f3_res) {
    document.getElementById('radio-card3').innerHTML += '<h4 class="bestvar">Лучший по расходу стали</h4>'
    document.getElementById('floorChoice3').checked = true
}

function createVarFinTable() {
    const getValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.textContent.trim() : "";
    };
    const createCell = (text, options = {}) => {
        return new TableCell({
            children: [
                new Paragraph({
                    alignment: options.alignment || AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: String(text),
                            bold: options.bold || false,
                            size: 28
                        })
                    ]
                })
            ],
            verticalAlign: VerticalAlign.CENTER,
            margins: {
                top: 80,
                bottom: 80,
                left: 80,
                right: 80
            },
            borders: {
                top: {
                    style: BorderStyle.SINGLE,
                    size: 1,
                    color: "000000"
                },
                bottom: {
                    style: BorderStyle.SINGLE,
                    size: 1,
                    color: "000000"
                },
                left: {
                    style: BorderStyle.SINGLE,
                    size: 1,
                    color: "000000"
                },
                right: {
                    style: BorderStyle.SINGLE,
                    size: 1,
                    color: "000000"
                }
            },

            ...(options.rowSpan ? {
                rowSpan: options.rowSpan
            } : {}),

            ...(options.columnSpan ? {
                columnSpan: options.columnSpan
            } : {})
        });
    };
    return new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE
        },
        borders: {
            top: {
                style: BorderStyle.SINGLE,
                size: 1,
                color: "000000"
            },
            bottom: {
                style: BorderStyle.SINGLE,
                size: 1,
                color: "000000"
            },
            left: {
                style: BorderStyle.SINGLE,
                size: 1,
                color: "000000"
            },
            right: {
                style: BorderStyle.SINGLE,
                size: 1,
                color: "000000"
            },
            insideHorizontal: {
                style: BorderStyle.SINGLE,
                size: 1,
                color: "000000"
            },
            insideVertical: {
                style: BorderStyle.SINGLE,
                size: 1,
                color: "000000"
            }
        },
        rows: [
            new TableRow({
                children: [
                    createCell(
                        "Наименование элементов",
                        {
                            bold: true,
                            rowSpan: 2
                        }
                    ),
                    createCell(
                        "1-й вариант",
                        {
                            bold: true,
                            columnSpan: 2
                        }
                    ),
                    createCell(
                        "2-й вариант",
                        {
                            bold: true,
                            columnSpan: 2
                        }
                    ),
                    createCell(
                        "3-й вариант",
                        {
                            bold: true,
                            columnSpan: 2
                        }
                    )
                ]
            }),
            new TableRow({
                children: [
                    createCell("Расход стали\nкг/м²"),
                    createCell("Кол-во балок, шт."),
                    createCell("Расход стали\nкг/м²"),
                    createCell("Кол-во балок, шт."),
                    createCell("Расход стали\nкг/м²"),
                    createCell("Кол-во балок, шт.")
                ]
            }),
            new TableRow({
                children: [
                    createCell(
                        "Стальной настил",
                        {
                            alignment: AlignmentType.LEFT
                        }
                    ),
                    createCell(getValue("deck_f1")),
                    createCell("-"),
                    createCell(getValue("deck_f2")),
                    createCell("-"),
                    createCell(getValue("deck_f3")),
                    createCell("-")
                ]
            }),
            new TableRow({
                children: [
                    createCell(
                        "Балка настила",
                        {
                            alignment: AlignmentType.LEFT
                        }
                    ),
                    createCell(getValue("roof_f1")),
                    createCell(getValue("roof_num1")),
                    createCell(getValue("roof_f2")),
                    createCell(getValue("roof_num2")),
                    createCell(getValue("roof_f3")),
                    createCell(getValue("roof_num3"))
                ]
            }),
            new TableRow({
                children: [
                    createCell(
                        "Вспомогательные балки",
                        {
                            alignment: AlignmentType.LEFT
                        }
                    ),
                    createCell(getValue("sec_f1")),
                    createCell(getValue("sec_num1")),
                    createCell(getValue("sec_f2")),
                    createCell(getValue("sec_num2")),
                    createCell(getValue("sec_f3")),
                    createCell(getValue("sec_num3"))
                ]
            }),
            new TableRow({
                children: [
                    createCell(
                        "Итого:",
                        {
                            bold: true,
                            alignment: AlignmentType.LEFT
                        }
                    ),
                    createCell(
                        getValue("fin_f1"),
                        {
                            bold: true
                        }
                    ),
                    createCell(""),
                    createCell(
                        getValue("fin_f2"),
                        {
                            bold: true
                        }
                    ),
                    createCell(""),
                    createCell(
                        getValue("fin_f3"),
                        {
                            bold: true
                        }
                    ),
                    createCell("")
                ]
            })
        ]
    });
}

const varFinFormula1 = mFormula(
    mFrac(
        mGroup(
            parToSrtingo(selectBeamByNumber(roof_beam_list[0]).weight)+" ",
            mSquareParen("кг/м"),
            " (масса прогонного метра)"
        ),
        mGroup(
            parToSrtingo(varus1A)+" ",
            mSquareParen("м"),
            " (шаг балок настила)"
        )
    ),
    mEq(),
    parToSrtingo(roof_f1)+" кг/м²"
);

const varFinFormula2 = mFormula(
    mFrac(
        mGroup(
            parToSrtingo(selectBeamByNumber(roof_beam_list[1]).weight)+" ",
            mSquareParen(
                mFrac(
                    "кг",
                    "м"
                )
            )
        ),
        mGroup(
            parToSrtingo(varus2A)+" ",
            mSquareParen("м")
        )
    ),
    mGroup(
        "="+parToSrtingo(roof_f2)+" ",
        "кг/м²"
    )
);

const varFinFormula3 = mFormula(
    mFrac(
        mGroup(
            parToSrtingo(selectBeamByNumber(roof_beam_list[2]).weight)+" ",
            mSquareParen(
                mFrac(
                    "кг",
                    "м"
                )
            )
        ),
        mGroup(
            parToSrtingo(varus3A)+" ",
            mSquareParen("м")
        )
    ),
    mGroup(
        "="+parToSrtingo(roof_f3)+" ",
        "кг/м²"
    )
);
const varFinFormula4 = mFormula(
    mFrac(
        mGroup(
            parToSrtingo(sectBeamByNumber(sec_beam_list[0]).weight)+" ",
            mSquareParen("кг/м"),
            " (масса прогонного метра)"
        ),
        mGroup(
            parToSrtingo(varus1B)+" ",
            mSquareParen("м"),
            " (шаг вспомогательных балок)"
        )
    ),
    mEq(),
    parToSrtingo(sec_f1)+" кг/м²"
);

const varFinFormula5 = mFormula(
    mFrac(
        mGroup(
            parToSrtingo(sectBeamByNumber(sec_beam_list[1]).weight)+" ",
            mSquareParen(
                mFrac(
                    "кг",
                    "м"
                )
            )
        ),
        mGroup(
            parToSrtingo(varus2B)+" ",
            mSquareParen("м")
        )
    ),
    mGroup(
        "="+parToSrtingo(sec_f2)+" ",
        "кг/м²"
    )
);
const varFinFormula6 = mFormula(
    mFrac(
        mGroup(
            parToSrtingo(sectBeamByNumber(sec_beam_list[2]).weight)+" ",
            mSquareParen(
                mFrac(
                    "кг",
                    "м"
                )
            )
        ),
        mGroup(
            parToSrtingo(varus3B)+" ",
            mSquareParen("м")
        )
    ),
    mGroup(
        "="+parToSrtingo(sec_f3)+" ",
        "кг/м²"
    )
);
function createVarFin() {
    varfinChildren = []
    varfinChildren.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
                line: 360, // Полуторный интервал для ВСЕГО документа
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: "1.4 Таблица сравнения вариантов балочной клетки", bold: true, font: "Times New Roman", size: 28 
                }),
            ]
        }),
    )
    varfinChildren.push(
        createVarFinTable(),
        new Paragraph({size: 28})
    )
    varfinChildren.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: "Расчёты для балок настила:", font: "Times New Roman", size: 28 
                }),
            ]
        }),
    )
    varfinChildren.push(
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: "Вариант 1, двутавр №"+roof_beam_list[0]+" по ГОСТ 8239-89", font: "Times New Roman", size: 28 
                }),
            ]
        }),
    )
    varfinChildren.push(
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                varFinFormula1, 
                new TextRun({
                    text: ' '
                })
            ]
        }),
    )
    varfinChildren.push(
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: "Вариант 2, двутавр №"+roof_beam_list[1]+" по ГОСТ 8239-89", font: "Times New Roman", size: 28 
                }),
            ]
        }),
    )
    varfinChildren.push(
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                varFinFormula2, 
                new TextRun({
                    text: ' '
                })
            ]
        }),
    )
    varfinChildren.push(
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: "Вариант 3, двутавр №"+roof_beam_list[2]+" по ГОСТ 8239-89", font: "Times New Roman", size: 28 
                }),
            ]
        }),
    )
    varfinChildren.push(
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                varFinFormula3, 
                new TextRun({
                    text: ' '
                })
            ]
        }),
    )
    varfinChildren.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: "Расчёты для второстепенных балок:", font: "Times New Roman", size: 28 
                }),
            ]
        }),
    )
    varfinChildren.push(
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: "Вариант 1, двутавр №"+sec_beam_list[0]+" по ГОСТ 26020-83", font: "Times New Roman", size: 28 
                }),
            ]
        }),
    )
    varfinChildren.push(
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                varFinFormula4, 
                new TextRun({
                    text: ' '
                })
            ]
        }),
    )
    varfinChildren.push(
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: "Вариант 2, двутавр №"+sec_beam_list[1]+" по ГОСТ 26020-83", font: "Times New Roman", size: 28 
                }),
            ]
        }),
    )
    varfinChildren.push(
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                varFinFormula5, 
                new TextRun({
                    text: ' '
                })
            ]
        }),
    )
    varfinChildren.push(
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: "Вариант 3, двутавр №"+sec_beam_list[2]+" по ГОСТ 26020-83", font: "Times New Roman", size: 28 
                }),
            ]
        }),
    )
    varfinChildren.push(
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                varFinFormula6, 
                new TextRun({
                    text: ' '
                })
            ]
        }),
    )

    if (document.getElementById('floorChoice1').checked) {
        if (Math.min(fin_f1_res, fin_f2_res, fin_f3_res) == fin_f1_res) {
            varfinChildren.push(
                new Paragraph({
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                        line: 360,
                        before: 0,
                        after: 0,
                    },
                    children: [
                        new TextRun({
                            text: "Для дальнейших расчетов принимается наиболее оптимальный по расходу стали Вариант 1.", bold: true, size: 28 
                        }),
                        new PageBreak(),
                    ]
                }),
            )
        } else {
            varfinChildren.push(
                new Paragraph({
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                        line: 360,
                        before: 0,
                        after: 0,
                    },
                    children: [
                        new TextRun({
                            text: "Для дальнейших расчетов принимается Вариант 1.", bold: true, size: 28 
                        }),
                        new PageBreak(),
                    ]
                }),
            )

        }
    } else if (document.getElementById('floorChoice2').checked) {
        if (Math.min(fin_f1_res, fin_f2_res, fin_f3_res) == fin_f2_res) {
            varfinChildren.push(
                new Paragraph({
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                        line: 360,
                        before: 0,
                        after: 0,
                    },
                    children: [
                        new TextRun({
                            text: "Для дальнейших расчетов принимается наиболее оптимальный по расходу стали Вариант 2.", bold: true, size: 28 
                        }),
                        new PageBreak(),
                    ]
                }),
            )
        } else {
            varfinChildren.push(
                new Paragraph({
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                        line: 360,
                        before: 0,
                        after: 0,
                    },
                    children: [
                        new TextRun({
                            text: "Для дальнейших расчетов принимается Вариант 2.", bold: true, size: 28 
                        }),
                        new PageBreak(),
                    ]
                }),
            )

        }
    } else if (document.getElementById('floorChoice3').checked) {
        if (Math.min(fin_f1_res, fin_f2_res, fin_f3_res) == fin_f3_res) {
            varfinChildren.push(
                new Paragraph({
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                        line: 360,
                        before: 0,
                        after: 0,
                    },
                    children: [
                        new TextRun({
                            text: "Для дальнейших расчетов принимается наиболее оптимальный по расходу стали Вариант 3.", bold: true, size: 28 
                        }),
                        new PageBreak(),
                    ]
                }),
            )
        } else {
            varfinChildren.push(
                new Paragraph({
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                        line: 360,
                        before: 0,
                        after: 0,
                    },
                    children: [
                        new TextRun({
                            text: "Для дальнейших расчетов принимается Вариант 3.", bold: true, size: 28 
                        }),
                        new PageBreak(),
                    ]
                }),
            )

        }
    }
}


function generateVafin() {
    createVarFin()
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
        sections: [
            {
                properties: {
                    page: {
                        margin: { top: 1134, bottom: 1134, left: 1700, right: 1700 }
                    }
                },
                children: varfinChildren
            },
        ],
    });
    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "Var_Fin.docx");
    });
}

let varfining = document.getElementById('varfining')
varfining.addEventListener("click", () => {
    generateVafin()
});
