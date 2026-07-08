const docxLib = window.docx;
const { Document, Packer, ImageRun, LineRuleType, XmlComponent, Paragraph, ommlXmlText, BorderStyle, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, PageBreak, textParagraphs } = docxLib;
let usefullLoad = 30
let roofType = 1
let roofTable
let deck_thickness = 14
let varus1A = 1
let varus1B = 2


let secChildren = []

let deck_load = 7850*deck_thickness/1000*10/1000
let deck_load_real = deck_load*1.05
let mainest_beam = usefullLoad * 1.05 + 1.33 * 1.3 + deck_load_real
let mainest_beam2 = (usefullLoad * 1.05) + (0.7 * 1.3) + deck_load_real
let maine_beam = usefullLoad + 1.33 + deck_load
let maine_beam2 = usefullLoad + 0.7 + deck_load

let maine 
let mainest
if (roofType == 1) {
	maine = maine_beam
	mainest = mainest_beam
} else if (roofType == 2) {
	maine = maine_beam2
	mainest = mainest_beam2
}
let roofye = Math.ceil(selectBeamByNumber(14).weight/varus1A/100*1000)/1000
let seco_beam = maine + roofye
let sest_beam = mainest + Math.ceil(roofye*1000*1.05)/1000

deck_load = Math.ceil(deck_load*1000)/1000
deck_load_real = Math.ceil(deck_load*1000*1.05)/1000 
mainest_beam = Math.ceil(mainest_beam*1000)/1000
mainest_beam2 = Math.ceil(mainest_beam2*1000)/1000
maine_beam = Math.ceil(maine_beam*1000)/1000
maine_beam2 = Math.ceil(maine_beam2*1000)/1000

roofye = Math.ceil(roofye*1000)/1000
seco_beam = Math.ceil(seco_beam*1000)/1000
sest_beam = Math.ceil(sest_beam*1000)/1000

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ctnr = document.getElementById("canvas-container");

const cssWidth = ctnr.offsetWidth-8;
const cssHeight = 340;
const dpi = 10;

canvas.width = cssWidth * dpi;
canvas.height = cssHeight * dpi;

canvas.style.width = cssWidth + "px";
canvas.style.height = cssHeight + "px";

ctx.scale(dpi, dpi);

let zoom = 1
let A = 5
let B = 10
let scale = 35
const move = 3*B*scale/2
// Общий стиль для границ таблицы (тонкая черная рамка)
const tableBorders = {
    top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    right: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
};

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

const oMatho = new XmlComponent("m:oMath");
oMatho.root.push(createMathRun("q"));
oMatho.root.push(createMathRun(", "));
oMatho.root.push(fraction);

const gammaF = new XmlComponent("m:oMath")
gammaF.root.push(createMathSub("γ", "f"));

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
function getTheRoof() {
	if (roofType == 1) {
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
			                    children: [oMatho]
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
	        	        createCell("Стальной настил", AlignmentType.LEFT),
	        	        createCell(String(deck_load).replace(/\./g, ",")),
	        	        createCell("1,05"),
	        	        createCell(String(deck_load_real).replace(/\./g, ",")),
	        	    ],
	        	}),
	        	// --- СТРОКА 5 ---
			    new TableRow({
	        	    children: [
	        	        createCell("5"),
	        	        createCell("Балка настила", AlignmentType.LEFT),
	        	        createCell(String(roofye).replace(/\./g, ",")),
	        	        createCell("1,05"),
	        	        createCell(String(Math.ceil(roofye*1.05*1000)/1000).replace(/\./g, ",")),
	        	    ],
	        	}),
			    // --- СТРОКА 6 ---
			    new TableRow({
	        	    children: [
	        	        createCell("6"),
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
	        	        createCell(String(seco_beam).replace(/\./g, ",")),
	        	        createCell(""), // Пустая ячейка под коэффициентом нагрузки
	        	        createCell(String(sest_beam).replace(/\./g, ",")),
	        	    ],
	        	}),
	    	],
		});
	} else if (roofType == 2) {
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
			                    children: [oMatho]
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
			            createCell("0,585"),
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
	        	        createCell("Стальной настил", AlignmentType.LEFT),
	        	        createCell(String(deck_load).replace(/\./g, ",")),
	        	        createCell("1,05"),
	        	        createCell(String(deck_load_real).replace(/\./g, ",")),
	        	    ],
	        	}),

			    // --- СТРОКА 5 ---
			    new TableRow({
	        	    children: [
	        	        createCell("5"),
	        	        createCell("Балка настила", AlignmentType.LEFT),
	        	        createCell(String(roofye).replace(/\./g, ",")),
	        	        createCell("1,05"),
	        	        createCell(String(Math.ceil(roofye*1.05*1000)/1000).replace(/\./g, ",")),
	        	    ],
	        	}),
			    // --- СТРОКА 6 ---
			    new TableRow({
	        	    children: [
	        	        createCell("6"),
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
	        	        createCell(String(seco_beam).replace(/\./g, ",")),
	        	        createCell(""), // Пустая ячейка под коэффициентом нагрузки
	        	        createCell(String(sest_beam).replace(/\./g, ",")),
	        	    ],
	        	}),
	    	],
		});
	}
}

function dataURLtoUint8Array(dataurl) {
	const arr = dataurl.split(',');
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	
	while (n--) {
	  u8arr[n] = bstr.charCodeAt(n);
	}
	return { data: u8arr, mime };
}

document.getElementById("second_beam").addEventListener("click", () => {
	generateRoof()
})

let dataUrl = canvas.toDataURL("image/png");
let { data } = dataURLtoUint8Array(dataUrl);
let snapshot

let qab = mFormula(
    mGroup(
        mText("F"),
        mEq(),
        mText("q"),
        mMul(),
        mText("a"),
        mMul(),
        mText("b"),
        mEq(),
        mText(String(sest_beam).replace('.',',')),
        mMul(),
        mText(String(varus1A).replace('.',',')),
        mMul(),
        mText(String(varus1B).replace('.',',')),
        mEq(),
        mText(String(Math.ceil(sest_beam*varus1A*varus1B*1000)/1000).replace('.',',')),
        mText("кН")
    )
)

let q_nab = mFormula(
    mGroup(
        mSub("F","н"),
        mEq(),
        mText(),
        mSub("q", "н"),
        mMul(),
        mText("a"),
        mMul(),
        mText("b"),
        mEq(),
        mText(String(seco_beam).replace('.',',')),
        mMul(),
        mText(String(varus1A).replace('.',',')),
        mMul(),
        mText(String(varus1B).replace('.',',')),
        mEq(),
        mText(String(Math.ceil(seco_beam*varus1A*varus1B*1000)/1000).replace('.',',')),
        mText("кН")
    )
)

function pushRoof() {
	dataUrl = canvas.toDataURL("image/png");
	snapshot = dataURLtoUint8Array(dataUrl).data;
	secChildren.push(
		new Paragraph({
			alignment: AlignmentType.CENTER,
			children: [
				new ImageRun({
					data: snapshot,
				 	transformation: {
						width: 450, // Ширина в пикселях в документе
						height: 270, // Высота в пикселях в документе
					},
					size: 28,
				}),
			],
		})
	)
}

function createRoof() {
	secChildren = []
	secChildren.push(
		new Paragraph({
        	alignment: AlignmentType.CENTER,
        	spacing: { 
        		after: 60
        	},
        	children: [
        		new TextRun({
        			text: "1.1.3 Расчёт второстепенной балки",
        			bold: true,
        			size: 28,
        			font: "Times New Roman" 
        		}), 
        	]
        }),
        new Paragraph({
        	alignment: AlignmentType.CENTER,
        	spacing: { 
        		after: 60
        	},
        	children: [
        		new TextRun({
        			text: "Сбор нагрузок для второстепенных балок",
        			bold: true,
        			size: 28,
        			font: "Times New Roman" 
        		}), 
        	]
        }),
        new Paragraph({ text: "" }), // пустая строка перед таблицей
        floorTable,
	)
	pushRoof()
	secChildren.push(
		new Paragraph({
        	alignment: AlignmentType.CENTER,
        	spacing: { 
        		after: 60
        	},
        	children: [
        		new TextRun({
            		text: 'Рис.5 - Грузовая площадь балки настила'
        		}),
        	]
		}),
		new Paragraph({}),
		new Paragraph({
    		alignment: AlignmentType.JUSTIFIED,
    		spacing: {
                before: 0,
                after: 120,
                line: 360,
                lineRule: LineRuleType.AUTO,
            },
            indent: {
                firstLine: 709, // Красная строка 1,25 см
            },
    		children: [
    			new TextRun({
            		text: 'Для вспомогательных балок принимается сталь С245.'
        		}),
    		]
		}),
		new Paragraph({
    		alignment: AlignmentType.JUSTIFIED, // Для формул обычно используют выравнивание по центру
    		spacing: {
                before: 0,
                after: 120,
                line: 360,
                lineRule: LineRuleType.AUTO,
            },
            indent: {
                firstLine: 709, // Красная строка 1,25 см
            },
    		children: [
    			new TextRun({
            		text: 'Нагрузка с балок настила передаётся на вспомогательные балки в виде сосредоточенных сил.'
        		}),
    		]
		}),
		new Paragraph({
			alignment: AlignmentType.JUSTIFIED,
			spacing: {
                before: 0,
                after: 120,
                line: 360,
                lineRule: LineRuleType.AUTO,
            },
            indent: {
                firstLine: 709, // Красная строка 1,25 см
            },
			children: [
				qab,
				new TextRun({
            		text: ' '
        		}),
			]
		}),
		new Paragraph({
			alignment: AlignmentType.JUSTIFIED,
			spacing: {
                before: 0,
                after: 120,
                line: 360,
                lineRule: LineRuleType.AUTO,
            },
            indent: {
                firstLine: 709, // Красная строка 1,25 см
            },
			children: [
				q_nab,
				new TextRun({
            		text: ' '
        		}),
				new PageBreak()
			]
		}),
	)
}
function generateRoof() {
	getTheRoof()
	createRoof()
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
            children: secChildren
        }],
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, "Secondary_beam.docx");
    }).catch(err => {
        console.error(err);
        alert("Произошла ошибка, детали в консоли.");
    });
}
drawEveryVar(1)

function drawEveryVar(num) {
	ctx.shadowColor = 'transparent';
	ctx.strokeStyle = 'black';
	variant1A = 1
	variant1B = 2
	variant2A = 1.25
	variant2B = 2
	variant3A = 1
	variant3B = 2.5

	if (num == 1) {
		aVar = variant1A
		bVar = variant1B
		dist = -3*B*scale/2
	} else if (num == 2) {
		aVar = variant2A
		bVar = variant2B
		dist = 0
	} else if (num == 3) {
		aVar = variant3A
		bVar = variant3B
		dist = 3*B*scale/2
	}

	let centerX = canvas.width / (2*dpi) + scale + dist + move;
	let centerY = canvas.height / (2*dpi) + scale;
	

	if (zoom == 1) {
		centerX = canvas.width / (2*dpi) + scale + dist + move
		centerY = canvas.height / (2*dpi) + scale
	}

	ctx.lineWidth = 3;
	ctx.strokeRect(centerX-(B/2)*scale, centerY-(A/2)*scale, B*scale, A*scale)

	let nA2 = parseInt(A/aVar)
	let nB2 = parseInt(B/bVar)

	for (var i = 0; i < nA2; i++) {
		for (var q = 0; q < nB2; q++) {
			ctx.strokeRect(centerX-((B/2)-(q*bVar))*scale, centerY-((A/2)-(i*aVar))*scale, bVar*scale, aVar*scale)
		}
	}

	ctx.lineWidth = 2
	
	ctx.strokeRect(centerX-((B/2)*scale)-5, centerY-((A/2)*scale)-5, 10, 10)
	ctx.strokeRect(centerX+((B/2)*scale)-5, centerY+((A/2)*scale)-5, 10, 10)
	ctx.strokeRect(centerX+((B/2)*scale)-5, centerY-((A/2)*scale)-5, 10, 10)
	ctx.strokeRect(centerX-((B/2)*scale)-5, centerY+((A/2)*scale)-5, 10, 10)

	if (zoom == 1) {
		ctx.beginPath()
		for (var w = 0; w < nB2; w++) {
		ctx.lineWidth = 1
		ctx.moveTo((w * bVar * scale) + centerX-((B/2)*scale), centerY-((A/2)*scale))
		ctx.lineTo((w * bVar * scale) + centerX-((B/2)*scale), centerY-((A/2)*scale) - 25)
		ctx.lineTo((w * bVar * scale) + centerX-((B/2)*scale) + bVar*scale, centerY-((A/2)*scale) - 25)
		ctx.lineTo((w * bVar * scale) + centerX-((B/2)*scale) + bVar*scale, centerY-((A/2)*scale))
		ctx.moveTo((w * bVar * scale) + centerX-((B/2)*scale), centerY-((A/2)*scale) - 25)
		ctx.lineTo((w * bVar * scale) + centerX-((B/2)*scale) + 5, centerY-((A/2)*scale) - 30)
		ctx.lineTo((w * bVar * scale) + centerX-((B/2)*scale) - 5, centerY-((A/2)*scale) - 20)
		ctx.moveTo((w * bVar * scale) + centerX-((B/2)*scale), centerY-((A/2)*scale) - 25)
		ctx.lineTo((w * bVar * scale) + centerX-((B/2)*scale), centerY-((A/2)*scale) - 30)
		ctx.moveTo((w * bVar * scale) + centerX-((B/2)*scale), centerY-((A/2)*scale) - 25)
		ctx.lineTo((w * bVar * scale) + centerX-((B/2)*scale) - 5, centerY-((A/2)*scale) - 25)
		ctx.moveTo((w * bVar * scale) + centerX-((B/2)*scale) + bVar*scale, centerY-((A/2)*scale) - 25)
		ctx.lineTo((w * bVar * scale) + centerX-((B/2)*scale) + bVar*scale + 5, centerY-((A/2)*scale) - 30)
		ctx.lineTo((w * bVar * scale) + centerX-((B/2)*scale) + bVar*scale - 5, centerY-((A/2)*scale) - 20)
		ctx.moveTo((w * bVar * scale) + centerX-((B/2)*scale) + bVar*scale, centerY-((A/2)*scale) - 25)
		ctx.lineTo((w * bVar * scale) + centerX-((B/2)*scale) + bVar*scale, centerY-((A/2)*scale) - 30)
		ctx.moveTo((w * bVar * scale) + centerX-((B/2)*scale) + bVar*scale, centerY-((A/2)*scale) - 25)
		ctx.lineTo((w * bVar * scale) + centerX-((B/2)*scale) + bVar*scale + 5, centerY-((A/2)*scale) - 25)
		ctx.moveTo((w * bVar * scale) + centerX-((B/2)*scale) + bVar*scale/2, centerY-((A/2)*scale) - 25)
		ctx.font = 'bold 12px GOST A';
		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
		ctx.fillText('b=' +  String(bVar).replaceAll('.', ','), (w * bVar * scale) + centerX-((B/2)*scale) + bVar*scale/2, centerY-((A/2)*scale) - 35)
		ctx.stroke()
		}
	
		for (var r = 0; r < nA2; r++) {
			ctx.moveTo(centerX-((B/2)*scale), (r * aVar * scale) + centerY-((A/2)*scale))
			ctx.lineTo(centerX-((B/2)*scale) - 25, (r * aVar * scale) + centerY-((A/2)*scale))
			ctx.lineTo(centerX-((B/2)*scale) - 25, (r * aVar * scale) + centerY-((A/2)*scale) + aVar*scale)
			ctx.lineTo(centerX-((B/2)*scale), (r * aVar * scale) + centerY-((A/2)*scale) + aVar*scale)
			ctx.moveTo(centerX-((B/2)*scale) - 25, (r * aVar * scale) + centerY-((A/2)*scale))
			ctx.lineTo(centerX-((B/2)*scale) - 20, (r * aVar * scale) + centerY-((A/2)*scale) + 5)
			ctx.lineTo(centerX-((B/2)*scale) - 30, (r * aVar * scale) + centerY-((A/2)*scale) -5)
			ctx.moveTo(centerX-((B/2)*scale) - 25, (r * aVar * scale) + centerY-((A/2)*scale))
			ctx.lineTo(centerX-((B/2)*scale) - 25, (r * aVar * scale) + centerY-((A/2)*scale) - 5)
			ctx.moveTo(centerX-((B/2)*scale) - 25, (r * aVar * scale) + centerY-((A/2)*scale) + aVar*scale)
			ctx.lineTo(centerX-((B/2)*scale) - 20, (r * aVar * scale) + centerY-((A/2)*scale) + aVar*scale + 5)
			ctx.lineTo(centerX-((B/2)*scale) - 30, (r * aVar * scale) + centerY-((A/2)*scale) + aVar*scale - 5)
			ctx.moveTo(centerX-((B/2)*scale) - 25, (r * aVar * scale) + centerY-((A/2)*scale) + aVar*scale)
			ctx.lineTo(centerX-((B/2)*scale) - 25, (r * aVar * scale) + centerY-((A/2)*scale) + aVar*scale + 5)
			ctx.save();
			ctx.font = 'bold 12px GOST A';
			ctx.textAlign = 'right';
			ctx.textBaseline = 'middle';
			ctx.translate(centerX-((B/2)*scale) - 30, (r * aVar * scale) + centerY-((A/2)*scale) + aVar*scale/2);
			ctx.rotate(0 * Math.PI / 180);
			ctx.fillText('a=' + String(aVar).replaceAll('.', ','), 0, 0);
			ctx.restore();
			ctx.stroke()
		}
	
		ctx.lineWidth = 1
		ctx.moveTo(centerX-((B/2)*scale), centerY-((A/2)*scale))
		ctx.lineTo(centerX-((B/2)*scale) - 65, centerY-((A/2)*scale))
		ctx.lineTo(centerX-((B/2)*scale) - 65, centerY-((A/2)*scale) + A*scale)
		ctx.lineTo(centerX-((B/2)*scale), centerY-((A/2)*scale) + A*scale)
		ctx.moveTo(centerX-((B/2)*scale) - 65, + centerY-((A/2)*scale))
		ctx.lineTo(centerX-((B/2)*scale) - 60, + centerY-((A/2)*scale) + 5)
		ctx.lineTo(centerX-((B/2)*scale) - 70, + centerY-((A/2)*scale) -5)
		ctx.moveTo(centerX-((B/2)*scale) - 65, + centerY-((A/2)*scale))
		ctx.lineTo(centerX-((B/2)*scale) - 65, + centerY-((A/2)*scale) - 5)
		ctx.moveTo(centerX-((B/2)*scale) - 65, + centerY-((A/2)*scale) + A*scale)
		ctx.lineTo(centerX-((B/2)*scale) - 60, + centerY-((A/2)*scale) + A*scale + 5)
		ctx.lineTo(centerX-((B/2)*scale) - 70, + centerY-((A/2)*scale) + A*scale - 5)
		ctx.moveTo(centerX-((B/2)*scale) - 65, + centerY-((A/2)*scale) + A*scale)
		ctx.lineTo(centerX-((B/2)*scale) - 65, + centerY-((A/2)*scale) + A*scale + 5)
		ctx.save();
		ctx.font = 'bold 14px GOST A';
		ctx.textAlign = 'right';
		ctx.textBaseline = 'middle';
		ctx.translate(centerX-((B/2)*scale) - 70, centerY-((A/2)*scale) + A*scale/2);
		// ctx.rotate(270 * Math.PI / 180);
		ctx.fillText('l=' + String(A).replaceAll('.', ','), 0, 0);
		ctx.restore();
		ctx.stroke()
	
		ctx.moveTo(centerX-((B/2)*scale), centerY-((A/2)*scale))
		ctx.lineTo(centerX-((B/2)*scale), centerY-((A/2)*scale) - 55)
		ctx.lineTo(centerX-((B/2)*scale) + B*scale, centerY-((A/2)*scale) - 55)
		ctx.lineTo(centerX-((B/2)*scale) + B*scale, centerY-((A/2)*scale))
		ctx.moveTo(centerX-((B/2)*scale), centerY-((A/2)*scale) - 55)
		ctx.lineTo(centerX-((B/2)*scale) + 5, centerY-((A/2)*scale) - 60)
		ctx.lineTo(centerX-((B/2)*scale) - 5, centerY-((A/2)*scale) - 50)
		ctx.moveTo(centerX-((B/2)*scale), centerY-((A/2)*scale) - 55)
		ctx.lineTo(centerX-((B/2)*scale), centerY-((A/2)*scale) - 60)
		ctx.moveTo(centerX-((B/2)*scale), centerY-((A/2)*scale) - 55)
		ctx.lineTo(centerX-((B/2)*scale) - 5, centerY-((A/2)*scale) - 55)
		ctx.moveTo(centerX-((B/2)*scale) + B*scale, centerY-((A/2)*scale) - 55)
		ctx.lineTo(centerX-((B/2)*scale) + B*scale + 5, centerY-((A/2)*scale) - 60)
		ctx.lineTo(centerX-((B/2)*scale) + B*scale - 5, centerY-((A/2)*scale) - 50)
		ctx.moveTo(centerX-((B/2)*scale) + B*scale, centerY-((A/2)*scale) - 55)
		ctx.lineTo(centerX-((B/2)*scale) + B*scale, centerY-((A/2)*scale) - 60)
		ctx.moveTo(centerX-((B/2)*scale) + B*scale, centerY-((A/2)*scale) - 55)
		ctx.lineTo(centerX-((B/2)*scale) + B*scale + 5, centerY-((A/2)*scale) - 55)
		ctx.moveTo(centerX-((B/2)*scale) + B*scale/2, centerY-((A/2)*scale) - 55)
		ctx.font = 'bold 14px GOST A';
		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
		ctx.fillText('L=' +  String(B).replaceAll('.', ','), centerX-((B/2)*scale) + B*scale/2, centerY-((A/2)*scale) - 60)

		ctx.stroke()
		ctx.lineWidth = 2
		
		let nB1 = B/variant1B
		let nA1 = A/variant1A

		let wo = variant1B * scale;
		let h = variant1A * scale;
		let x = centerX - (B / 2) * scale + (variant1B / 2 * scale);
		let y = centerY - (A / 2) * scale + (variant1A / 2 * scale);
		if (nB1 % 2 == 0) {
			x = centerX - variant1B/2*scale
		} else {
			x = centerX - variant1B*scale
		}
		if (nA1 % 2 == 0) {
			y = centerY - variant1A/2*scale
		} else {
			y = centerY - variant1A*scale
		}
		const step = 10; // Расстояние между линиями штриховки в пикселях
		ctx.save(); // Сохраняем состояние холста
		ctx.strokeRect(x, y, wo, h)

		// 2. Создаем маску по форме вашего прямоугольника
		ctx.beginPath();
		ctx.rect(x, y, wo, h);
		ctx.clip();
		
		// 3. Рисуем штриховку внутри маски
		ctx.strokeStyle = '#000000'; // Цвет штриховки
		ctx.lineWidth = 1;           // Толщина линий штриховки
		ctx.beginPath();
		
		for (let i = -h; i < wo; i += step) {
		    ctx.moveTo(x + i, y);
		    ctx.lineTo(x + i + h, y + h);
		}
		ctx.stroke();
		
		ctx.restore();
	}
}

document.getElementById('roof_beam').innerText = 'Выделенная площадь второстепенной балки воспринимает ' + String(Math.ceil(sest_beam*varus1A*varus1B*1000)/1000).replace('.',',') + ' кН.'  