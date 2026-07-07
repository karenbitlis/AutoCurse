const docxLib = window.docx;
const { Document, Packer, ImageRun, XmlComponent, Paragraph, ommlXmlText, BorderStyle, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, PageBreak, textParagraphs } = docxLib;
let usefullLoad = 30
let floorType = 1
let floorTable
// Общий стиль для границ таблицы (тонкая черная рамка)
const tableBorders = {
    top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    right: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
};
// Функция-хелпер для создания ячеек (чтобы сократить дублирование кода)
function createCell(textContent, alignment = AlignmentType.CENTER, columnSpan = 1) {
    // Если передан массив (для сложных формул в шапке), создаем TextRun для каждой строки
    const children = Array.isArray(textContent) 
        ? textContent.map(t => new Paragraph({ children: [t], alignment }))
        : [new Paragraph({ text: textContent, alignment })];

    return new TableCell({
        children: children,
        columnSpan: columnSpan,
        margins: { top: 100, bottom: 100, left: 150, right: 150 }, // внутренние отступы
    });
}

const oMath = new XmlComponent("m:oMath");

oMath.root.push(createMathSub("q", "n"));
oMath.root.push(createMathRun(", "));
const numerator = createMathRun("кН");
const denominator = createMathSup("м", "2");
const fraction = createMathFraction(numerator, denominator);
oMath.root.push(fraction);

const gammaF = new XmlComponent("m:oMath")
gammaF.root.push(createMathSub("γ", "f"));



document.getElementById('floorExplanation').innerText = 'Ранее вы выбрали тип ' + floorType


function createMathRun(text) {
    const r = new XmlComponent("m:r");
    const t = new XmlComponent("m:t");
    t.root.push(text);
    r.root.push(t);
    return r;
}
function createMathSup(baseText, supText) {
    const sSup = new XmlComponent("m:sSup");
    const e = new XmlComponent("m:e");    // База
    const j = new XmlComponent("m:sup");  // То, что сверху
    
    e.root.push(createMathRun(baseText));
    j.root.push(createMathRun(supText));
    
    sSup.root.push(e);
    sSup.root.push(j);
    return sSup;
}
function createMathSub(baseText, subText) {
    const sSub = new XmlComponent("m:sSub");

    const e = new XmlComponent("m:e");      // Основание
    const sub = new XmlComponent("m:sub");  // Нижний индекс

    e.root.push(createMathRun(baseText));
    sub.root.push(createMathRun(subText));

    sSub.root.push(e);
    sSub.root.push(sub);

    return sSub;
}
function createMathFraction(numComponent, denComponent) {
    const f = new XmlComponent("m:f");
    const num = new XmlComponent("m:num"); // Числитель
    const den = new XmlComponent("m:den"); // Знаменатель
    
    num.root.push(numComponent);
    den.root.push(denComponent);
    
    f.root.push(num);
    f.root.push(den);
    return f;
}

function updateFloorChoice() {
	document.getElementById('floorExplanation').innerText = 'Вы выбрали тип ' + floorType
}

const labels = document.querySelectorAll(".radio-card");
labels.forEach(label => {
    label.addEventListener("click", () => {
        if (document.getElementById("floorChoice1").checked) {
            floorType = 1;
            updateFloorChoice()
        } else if (document.getElementById("floorChoice2").checked) {
            floorType = 2;
            updateFloorChoice()
        }
    });
});


function getTheFloor() {
	if (document.getElementById('floorChoice1').checked) {
	    floorTable = new Table({
			borders: tableBorders,
			width: {
			    size: 100,
			    type: WidthType.PERCENTAGE, // Растягиваем таблицу на всю ширину страницы
			},
			// Пропорции колонок в процентах
			columnWidths: [8, 42, 16, 16, 18], 
			rows: [
			    // --- ШАПКА ТАБЛИЦЫ ---
			    new TableRow({
			        tableHeader: true,
			        children: [
			            createCell("№ п.п"),
			            createCell("Вид нагрузки", AlignmentType.LEFT),
			            createCell([
			                new TextRun({
			                    children: [oMath]
			                })
			            ]),
			            createCell([
			                new TextRun({
			                    children: [gammaF]
			                }),
			            ]),
			            createCell([
			                new TextRun ({
			                    children: [oMath]
			                })
			            ]),
			        ],
			    }),
			    // --- СТРОКА 1 ---
			    new TableRow({
			        children: [
			            createCell("1"),
			            createCell("Металлоцементный раствор 30мм", AlignmentType.LEFT),
			            createCell("0,75"),
			            createCell("1,3"),
			            createCell("0,975"),
			        ],
			    }),

			    // --- СТРОКА 2 ---
			    new TableRow({
			        children: [
			            createCell("2"),
			            createCell("Гидроизоляция два слоя рубероида на мастике", AlignmentType.LEFT),
			            createCell("0,1"),
			            createCell("1,3"),
			            createCell("0,13"),
			        ],
			    }),

			    // --- СТРОКА 3 ---
			    new TableRow({
			        children: [
			            createCell("3"),
			            createCell("Теплоизоляция-шлакобетон 40мм", AlignmentType.LEFT),
			            createCell("0,48"),
			            createCell("1,3"),
			            createCell("0,624"),
			        ],
			    }),

			    // --- СТРОКА 4 ---
			    new TableRow({
	        	    children: [
	        	        createCell("4"),
	        	        createCell("Полезная нагрузка", AlignmentType.LEFT),
	        	        createCell(String(usefullLoad).replace(/\./g, ",")),
	        	        createCell("1,05"),
	        	        createCell(String(usefullLoad*1.05).replace(/\./g, ",")),
	        	    ],
	        	}),
		
	        	// --- СТРОКА ИТОГО ---
	        	new TableRow({
	        	    children: [
	        	        // Объединяем первую и вторую колонки под текст "Итого:"
	        	        createCell("Итого:", AlignmentType.LEFT, 2), 
	        	        createCell(String(usefullLoad + 1.33).replace(/\./g, ",")),
	        	        createCell(""), // Пустая ячейка под коэффициентом нагрузки
	        	        createCell(String(usefullLoad*1.05 + 1.729).replace(/\./g, ",")),
	        	    ],
	        	}),
	    	],
		});
	} else if (document.getElementById('floorChoice2').checked) {
		floorTable = new Table({
			borders: tableBorders,
			width: {
			    size: 100,
			    type: WidthType.PERCENTAGE, // Растягиваем таблицу на всю ширину страницы
			},
			// Пропорции колонок в процентах
			columnWidths: [8, 42, 16, 16, 18], 
			rows: [
			    // --- ШАПКА ТАБЛИЦЫ ---
			    new TableRow({
			        tableHeader: true,
			        children: [
			            createCell("№ п.п"),
			            createCell("Вид нагрузки", AlignmentType.LEFT),
			            createCell([
			                new TextRun({
			                    children: [oMath]
			                })
			            ]),
			            createCell([
			                new TextRun({
			                    children: [gammaF]
			                }),
			            ]),
			            createCell([
			                new TextRun ({
			                    children: [oMath]
			                })
			            ]),
			        ],
			    }),

			    // --- СТРОКА 1 ---
			    new TableRow({
			        children: [
			            createCell("1"),
			            createCell("Кислотоупорные керам. плитки 15мм", AlignmentType.LEFT),
			            createCell("0,45"),
			            createCell("1,3"),
			            createCell("0,58"),
			        ],
			    }),

			    // --- СТРОКА 2 ---
			    new TableRow({
			        children: [
			            createCell("2"),
			            createCell("Битумная мастика 8мм", AlignmentType.LEFT),
			            createCell("0,15"),
			            createCell("1,3"),
			            createCell("0,195"),
			        ],
			    }),

			    // --- СТРОКА 3 ---
			    new TableRow({
			        children: [
			            createCell("3"),
			            createCell("Гидроизоляция два слоя рубероида на мастике", AlignmentType.LEFT),
			            createCell("0,1"),
			            createCell("1,3"),
			            createCell("0,13"),
			        ],
			    }),

			    // --- СТРОКА 4 ---
			    new TableRow({
	        	    children: [
	        	        createCell("4"),
	        	        createCell("Полезная нагрузка", AlignmentType.LEFT),
	        	        createCell(String(usefullLoad).replace(/\./g, ",")),
	        	        createCell("1,05"),
	        	        createCell(String(usefullLoad*1.05).replace(/\./g, ",")),
	        	    ],
	        	}),
		
	        	// --- СТРОКА ИТОГО ---
	        	new TableRow({
	        	    children: [
	        	        // Объединяем первую и вторую колонки под текст "Итого:"
	        	        createCell("Итого:", AlignmentType.LEFT, 2), 
	        	        createCell(String(usefullLoad + 0.7).replace(/\./g, ",")),
	        	        createCell(""), // Пустая ячейка под коэффициентом нагрузки
	        	        createCell(String(usefullLoad*1.05 + 0.91).replace(/\./g, ",")),
	        	    ],
	        	}),
	    	],
		});
	}
}
document.getElementById("generate-btn").addEventListener("click", () => {
	getTheFloor()
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
            children: [
                new Paragraph({
                	alignment: AlignmentType.CENTER,
                	children: [
                		new TextRun({
                			text: "Сбор нагрузок для настила",
                			bold: true,
            			}),
                	]
                }),
                new Paragraph({ text: "" }), // пустая строка перед таблицей
                floorTable,
            ],
        }],
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, "Floor.docx");
    }).catch(err => {
        console.error(err);
        alert("Произошла ошибка, детали в консоли.");
    });
})
