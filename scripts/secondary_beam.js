let secChildren = []

let sBzoom = 1
let sBscale = 35
let sBmove = 3*B*sBscale/2
let secBeamTable
let secvaro = 1


if (roofType == 1) {
	maine = maine_beam
	mainest = mainest_beam
} else if (roofType == 2) {
	maine = maine_beam2
	mainest = mainest_beam2
}


varus1A = parseFloat(vargen.shadowRoot.getElementById('variant1A').value);
varus1B = parseFloat(vargen.shadowRoot.getElementById('variant1B').value);
varus2A = parseFloat(vargen.shadowRoot.getElementById('variant2A').value);
varus2B = parseFloat(vargen.shadowRoot.getElementById('variant2B').value);
varus3A = parseFloat(vargen.shadowRoot.getElementById('variant3A').value);
varus3B = parseFloat(vargen.shadowRoot.getElementById('variant3B').value);

if (secvaro == 1) {
	aVar = varus1A
	bVar = varus1B
	dist = -3*B*sBscale/2
} else if (secvaro == 2) {
	aVar = varus2A
	bVar = varus2B
	dist = -3*B*sBscale/2
} else if (secvaro == 3) {
	aVar = varus3A
	bVar = varus3B
	dist = -3*B*sBscale/2
}

let roof_beam_num = rEpure.shadowRoot.getElementById('rEpure-result').innerText
let roofye = Math.ceil(selectBeamByNumber(roof_beam_num.slice(-2)).weight/aVar/100*1000)/1000
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

const sec_beam1 = document.getElementById('sec-beam1')
let sece_varo = sec_beam1.shadowRoot.getElementById('sece_varo')

const sBcanvas = sec_beam1.shadowRoot.getElementById("canvas");
const sBctx = sBcanvas.getContext("2d");
const sBctnr = sec_beam1.shadowRoot.getElementById("canvas-container");
const sBcssWidth = sBctnr.offsetWidth-8; const sBcssHeight = 340; const sBdpi = 10;

sBcanvas.width = sBcssWidth * sBdpi;
sBcanvas.height = sBcssHeight * sBdpi;
sBcanvas.style.width = sBcssWidth + "px";
sBcanvas.style.height = sBcssHeight + "px";
sBctx.scale(sBdpi, sBdpi);

let sBdataUrl = sBcanvas.toDataURL("image/png");
let { sBdata } = dataURLtoUint8Array(sBdataUrl);
let sBsnapshot

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
        mText(String(aVar).replace('.',',')),
        mMul(),
        mText(String(bVar).replace('.',',')),
        mEq(),
        mText(String(Math.ceil(sest_beam*aVar*bVar*1000)/1000).replace('.',',')),
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
        mText(String(aVar).replace('.',',')),
        mMul(),
        mText(String(bVar).replace('.',',')),
        mEq(),
        mText(String(Math.ceil(seco_beam*aVar*bVar*1000)/1000).replace('.',',')),
        mText("кН")
    )
)

drawEveryVarSecBeam(1)

sec_beam1.shadowRoot.getElementById('roof_beam').innerText = 'Выделенная площадь воспринимает ' + String(Math.ceil(sest_beam*aVar*bVar*1000)/1000).replace('.',',') + ' кН.'  



function doingSecVar() {
	if (secvaro == 1) {
		aVar = varus1A
		bVar = varus1B
		dist = -3*B*sBscale/2
	} else if (secvaro == 2) {
		aVar = varus2A
		bVar = varus2B
		dist = -3*B*sBscale/2
	} else if (secvaro == 3) {
		aVar = varus3A
		bVar = varus3B
		dist = -3*B*sBscale/2
	}

	sBzoom = 1
	sBscale = 35
	sBmove = 3*B*sBscale/2
	secBeamTable
	secChildren = []
	
	if (roofType == 1) {
		maine = maine_beam
		mainest = mainest_beam
	} else if (roofType == 2) {
		maine = maine_beam2
		mainest = mainest_beam2
	}
	
	roof_beam_num = rEpure.shadowRoot.getElementById('rEpure-result').innerText
	roofye = Math.ceil(selectBeamByNumber(roof_beam_num.slice(-2)).weight/aVar/100*1000)/1000
	seco_beam = maine + roofye
	sest_beam = mainest + Math.ceil(roofye*1000*1.05)/1000
	
	deck_load = Math.ceil(deck_load*1000)/1000
	deck_load_real = Math.ceil(deck_load*1000*1.05)/1000 
	mainest_beam = Math.ceil(mainest_beam*1000)/1000
	mainest_beam2 = Math.ceil(mainest_beam2*1000)/1000
	maine_beam = Math.ceil(maine_beam*1000)/1000
	maine_beam2 = Math.ceil(maine_beam2*1000)/1000
	
	roofye = Math.ceil(roofye*1000)/1000
	seco_beam = Math.ceil(seco_beam*1000)/1000
	sest_beam = Math.ceil(sest_beam*1000)/1000
		
	sBcanvas.width = sBcssWidth * sBdpi;
	sBcanvas.height = sBcssHeight * sBdpi;
	sBcanvas.style.width = sBcssWidth + "px";
	sBcanvas.style.height = sBcssHeight + "px";
	sBctx.scale(sBdpi, sBdpi);
	
	qab = mFormula(
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
	        mText(String(aVar).replace('.',',')),
	        mMul(),
	        mText(String(bVar).replace('.',',')),
	        mEq(),
	        mText(String(Math.ceil(sest_beam*aVar*bVar*1000)/1000).replace('.',',')),
	        mText("кН")
	    )
	)
	q_nab = mFormula(
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
	        mText(String(aVar).replace('.',',')),
	        mMul(),
	        mText(String(bVar).replace('.',',')),
	        mEq(),
	        mText(String(Math.ceil(seco_beam*aVar*bVar*1000)/1000).replace('.',',')),
	        mText("кН")
	    )
	)
	
	drawEveryVarSecBeam(secvaro)
	sec_beam1.shadowRoot.getElementById('roof_beam').innerText = 'Выделенная площадь воспринимает ' + String(Math.ceil(sest_beam*aVar*bVar*1000)/1000).replace('.',',') + ' кН.'  
}

function getTheSecBeam() {
	if (roofType == 1) {
	    secBeamTable = new Table({
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
		secBeamTable = new Table({
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

function sBdataURLtoUint8Array(dataurl) {
	const arr = dataurl.split(',');
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	
	while (n--) {
	  u8arr[n] = bstr.charCodeAt(n);
	}
	return { sBdata: u8arr, mime };
}

sec_beam1.shadowRoot.getElementById("second_beam").addEventListener("click", () => {
	generateSecBeam()
})

function pushSecBeam() {
	sBdataUrl = sBcanvas.toDataURL("image/png");
	({ sBdata } = dataURLtoUint8Array(sBdataUrl))
	sBsnapshot = sBdataURLtoUint8Array(sBdataUrl).sBdata;
	secChildren.push(
		new Paragraph({
			alignment: AlignmentType.CENTER,
			children: [
				new ImageRun({
					data: sBsnapshot,
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
function createSecBeam() {
	getTheSecBeam()
	secChildren = []
	secChildren.push(
		new Paragraph({
        	alignment: AlignmentType.CENTER,
        	spacing: { 
        		after: 60
        	},
        	children: [
        		new TextRun({
        			text: "1."+secvaro+".3 Расчёт второстепенной балки",
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
        secBeamTable,
	)
	pushSecBeam()
	if (secvaro == 1) {
		secChildren.push(
			new Paragraph({
				alignment: AlignmentType.CENTER,
				spacing: { 
					after: 60
				},
				children: [
					new TextRun({
						text: 'Рис.5 - Грузовая площадь уча второстепенной балки (В1)'
					}),
				]
			}),
		);
	} else if (secvaro == 2) {
		secChildren.push(
			new Paragraph({
				alignment: AlignmentType.CENTER,
				spacing: { 
					after: 60
				},
				children: [
					new TextRun({
						text: 'Рис.11 - Грузовая площадь уча второстепенной балки (В2)'
					}),
				]
			}),
		);
	} else if (secvaro == 3) {
		secChildren.push(
			new Paragraph({
				alignment: AlignmentType.CENTER,
				spacing: { 
					after: 60
				},
				children: [
					new TextRun({
						text: 'Рис.17 - Грузовая площадь уча второстепенной балки (В3)'
					}),
				]
			}),
		);
	}
	secChildren.push(
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
function generateSecBeam() {
	createSecBeam()
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


function drawEveryVarSecBeam(num) {
	sBctx.fillStyle = "white";
	sBctx.fillRect(0, 0, reCanvas.width, reCanvas.height);

	sBctx.shadowColor = 'transparent';
	sBctx.strokeStyle = 'black';
	varus1A = parseFloat(vargen.shadowRoot.getElementById('variant1A').value);
	varus1B = parseFloat(vargen.shadowRoot.getElementById('variant1B').value);
	varus2A = parseFloat(vargen.shadowRoot.getElementById('variant2A').value);
	varus2B = parseFloat(vargen.shadowRoot.getElementById('variant2B').value);
	varus3A = parseFloat(vargen.shadowRoot.getElementById('variant3A').value);
	varus3B = parseFloat(vargen.shadowRoot.getElementById('variant3B').value);

	if (num == 1) {
		aVar = varus1A
		bVar = varus1B
		dist = -3*B*sBscale/2
	} else if (num == 2) {
		aVar = varus2A
		bVar = varus2B
		dist = -3*B*sBscale/2
	} else if (num == 3) {
		aVar = varus3A
		bVar = varus3B
		dist = -3*B*sBscale/2
	}

	let centerX = sBcanvas.width / (2*sBdpi) + sBscale + dist + sBmove;
	let centerY = sBcanvas.height / (2*sBdpi) + sBscale;
	

	if (sBzoom == 1) {
		centerX = sBcanvas.width / (2*sBdpi) + sBscale + dist + sBmove
		centerY = sBcanvas.height / (2*sBdpi) + sBscale
	}

	sBctx.lineWidth = 3;
	sBctx.strokeRect(centerX-(B/2)*sBscale, centerY-(A/2)*sBscale, B*sBscale, A*sBscale)

	let nA2 = parseInt(A/aVar)
	let nB2 = parseInt(B/bVar)

	for (var i = 0; i < nA2; i++) {
		for (var q = 0; q < nB2; q++) {
			sBctx.strokeRect(centerX-((B/2)-(q*bVar))*sBscale, centerY-((A/2)-(i*aVar))*sBscale, bVar*sBscale, aVar*sBscale)
		}
	}

	sBctx.lineWidth = 2
	
	sBctx.strokeRect(centerX-((B/2)*sBscale)-5, centerY-((A/2)*sBscale)-5, 10, 10)
	sBctx.strokeRect(centerX+((B/2)*sBscale)-5, centerY+((A/2)*sBscale)-5, 10, 10)
	sBctx.strokeRect(centerX+((B/2)*sBscale)-5, centerY-((A/2)*sBscale)-5, 10, 10)
	sBctx.strokeRect(centerX-((B/2)*sBscale)-5, centerY+((A/2)*sBscale)-5, 10, 10)

	if (sBzoom == 1) {
		sBctx.beginPath()
		for (var w = 0; w < nB2; w++) {
		sBctx.lineWidth = 1
		sBctx.moveTo((w * bVar * sBscale) + centerX-((B/2)*sBscale), centerY-((A/2)*sBscale))
		sBctx.lineTo((w * bVar * sBscale) + centerX-((B/2)*sBscale), centerY-((A/2)*sBscale) - 25)
		sBctx.lineTo((w * bVar * sBscale) + centerX-((B/2)*sBscale) + bVar*sBscale, centerY-((A/2)*sBscale) - 25)
		sBctx.lineTo((w * bVar * sBscale) + centerX-((B/2)*sBscale) + bVar*sBscale, centerY-((A/2)*sBscale))
		sBctx.moveTo((w * bVar * sBscale) + centerX-((B/2)*sBscale), centerY-((A/2)*sBscale) - 25)
		sBctx.lineTo((w * bVar * sBscale) + centerX-((B/2)*sBscale) + 5, centerY-((A/2)*sBscale) - 30)
		sBctx.lineTo((w * bVar * sBscale) + centerX-((B/2)*sBscale) - 5, centerY-((A/2)*sBscale) - 20)
		sBctx.moveTo((w * bVar * sBscale) + centerX-((B/2)*sBscale), centerY-((A/2)*sBscale) - 25)
		sBctx.lineTo((w * bVar * sBscale) + centerX-((B/2)*sBscale), centerY-((A/2)*sBscale) - 30)
		sBctx.moveTo((w * bVar * sBscale) + centerX-((B/2)*sBscale), centerY-((A/2)*sBscale) - 25)
		sBctx.lineTo((w * bVar * sBscale) + centerX-((B/2)*sBscale) - 5, centerY-((A/2)*sBscale) - 25)
		sBctx.moveTo((w * bVar * sBscale) + centerX-((B/2)*sBscale) + bVar*sBscale, centerY-((A/2)*sBscale) - 25)
		sBctx.lineTo((w * bVar * sBscale) + centerX-((B/2)*sBscale) + bVar*sBscale + 5, centerY-((A/2)*sBscale) - 30)
		sBctx.lineTo((w * bVar * sBscale) + centerX-((B/2)*sBscale) + bVar*sBscale - 5, centerY-((A/2)*sBscale) - 20)
		sBctx.moveTo((w * bVar * sBscale) + centerX-((B/2)*sBscale) + bVar*sBscale, centerY-((A/2)*sBscale) - 25)
		sBctx.lineTo((w * bVar * sBscale) + centerX-((B/2)*sBscale) + bVar*sBscale, centerY-((A/2)*sBscale) - 30)
		sBctx.moveTo((w * bVar * sBscale) + centerX-((B/2)*sBscale) + bVar*sBscale, centerY-((A/2)*sBscale) - 25)
		sBctx.lineTo((w * bVar * sBscale) + centerX-((B/2)*sBscale) + bVar*sBscale + 5, centerY-((A/2)*sBscale) - 25)
		sBctx.moveTo((w * bVar * sBscale) + centerX-((B/2)*sBscale) + bVar*sBscale/2, centerY-((A/2)*sBscale) - 25)
		sBctx.font = 'bold 12px GOST A';
		sBctx.fillStyle = 'black';
		sBctx.textAlign = 'center';
		sBctx.fillText('b=' +  String(bVar).replaceAll('.', ','), (w * bVar * sBscale) + centerX-((B/2)*sBscale) + bVar*sBscale/2, centerY-((A/2)*sBscale) - 35)
		sBctx.stroke()
		}
	
		for (var r = 0; r < nA2; r++) {
			sBctx.moveTo(centerX-((B/2)*sBscale), (r * aVar * sBscale) + centerY-((A/2)*sBscale))
			sBctx.lineTo(centerX-((B/2)*sBscale) - 25, (r * aVar * sBscale) + centerY-((A/2)*sBscale))
			sBctx.lineTo(centerX-((B/2)*sBscale) - 25, (r * aVar * sBscale) + centerY-((A/2)*sBscale) + aVar*sBscale)
			sBctx.lineTo(centerX-((B/2)*sBscale), (r * aVar * sBscale) + centerY-((A/2)*sBscale) + aVar*sBscale)
			sBctx.moveTo(centerX-((B/2)*sBscale) - 25, (r * aVar * sBscale) + centerY-((A/2)*sBscale))
			sBctx.lineTo(centerX-((B/2)*sBscale) - 20, (r * aVar * sBscale) + centerY-((A/2)*sBscale) + 5)
			sBctx.lineTo(centerX-((B/2)*sBscale) - 30, (r * aVar * sBscale) + centerY-((A/2)*sBscale) -5)
			sBctx.moveTo(centerX-((B/2)*sBscale) - 25, (r * aVar * sBscale) + centerY-((A/2)*sBscale))
			sBctx.lineTo(centerX-((B/2)*sBscale) - 25, (r * aVar * sBscale) + centerY-((A/2)*sBscale) - 5)
			sBctx.moveTo(centerX-((B/2)*sBscale) - 25, (r * aVar * sBscale) + centerY-((A/2)*sBscale) + aVar*sBscale)
			sBctx.lineTo(centerX-((B/2)*sBscale) - 20, (r * aVar * sBscale) + centerY-((A/2)*sBscale) + aVar*sBscale + 5)
			sBctx.lineTo(centerX-((B/2)*sBscale) - 30, (r * aVar * sBscale) + centerY-((A/2)*sBscale) + aVar*sBscale - 5)
			sBctx.moveTo(centerX-((B/2)*sBscale) - 25, (r * aVar * sBscale) + centerY-((A/2)*sBscale) + aVar*sBscale)
			sBctx.lineTo(centerX-((B/2)*sBscale) - 25, (r * aVar * sBscale) + centerY-((A/2)*sBscale) + aVar*sBscale + 5)
			sBctx.save();
			sBctx.font = 'bold 12px GOST A';
			sBctx.textAlign = 'right';
			sBctx.textBaseline = 'middle';
			sBctx.translate(centerX-((B/2)*sBscale) - 30, (r * aVar * sBscale) + centerY-((A/2)*sBscale) + aVar*sBscale/2);
			sBctx.rotate(0 * Math.PI / 180);
			sBctx.fillText('a=' + String(aVar).replaceAll('.', ','), 0, 0);
			sBctx.restore();
			sBctx.stroke()
		}
	
		sBctx.lineWidth = 1
		sBctx.moveTo(centerX-((B/2)*sBscale), centerY-((A/2)*sBscale))
		sBctx.lineTo(centerX-((B/2)*sBscale) - 65, centerY-((A/2)*sBscale))
		sBctx.lineTo(centerX-((B/2)*sBscale) - 65, centerY-((A/2)*sBscale) + A*sBscale)
		sBctx.lineTo(centerX-((B/2)*sBscale), centerY-((A/2)*sBscale) + A*sBscale)
		sBctx.moveTo(centerX-((B/2)*sBscale) - 65, + centerY-((A/2)*sBscale))
		sBctx.lineTo(centerX-((B/2)*sBscale) - 60, + centerY-((A/2)*sBscale) + 5)
		sBctx.lineTo(centerX-((B/2)*sBscale) - 70, + centerY-((A/2)*sBscale) -5)
		sBctx.moveTo(centerX-((B/2)*sBscale) - 65, + centerY-((A/2)*sBscale))
		sBctx.lineTo(centerX-((B/2)*sBscale) - 65, + centerY-((A/2)*sBscale) - 5)
		sBctx.moveTo(centerX-((B/2)*sBscale) - 65, + centerY-((A/2)*sBscale) + A*sBscale)
		sBctx.lineTo(centerX-((B/2)*sBscale) - 60, + centerY-((A/2)*sBscale) + A*sBscale + 5)
		sBctx.lineTo(centerX-((B/2)*sBscale) - 70, + centerY-((A/2)*sBscale) + A*sBscale - 5)
		sBctx.moveTo(centerX-((B/2)*sBscale) - 65, + centerY-((A/2)*sBscale) + A*sBscale)
		sBctx.lineTo(centerX-((B/2)*sBscale) - 65, + centerY-((A/2)*sBscale) + A*sBscale + 5)
		sBctx.save();
		sBctx.font = 'bold 14px GOST A';
		sBctx.textAlign = 'right';
		sBctx.textBaseline = 'middle';
		sBctx.translate(centerX-((B/2)*sBscale) - 70, centerY-((A/2)*sBscale) + A*sBscale/2);
		// sBctx.rotate(270 * Math.PI / 180);
		sBctx.fillText('l=' + String(A).replaceAll('.', ','), 0, 0);
		sBctx.restore();
		sBctx.stroke()
	
		sBctx.moveTo(centerX-((B/2)*sBscale), centerY-((A/2)*sBscale))
		sBctx.lineTo(centerX-((B/2)*sBscale), centerY-((A/2)*sBscale) - 55)
		sBctx.lineTo(centerX-((B/2)*sBscale) + B*sBscale, centerY-((A/2)*sBscale) - 55)
		sBctx.lineTo(centerX-((B/2)*sBscale) + B*sBscale, centerY-((A/2)*sBscale))
		sBctx.moveTo(centerX-((B/2)*sBscale), centerY-((A/2)*sBscale) - 55)
		sBctx.lineTo(centerX-((B/2)*sBscale) + 5, centerY-((A/2)*sBscale) - 60)
		sBctx.lineTo(centerX-((B/2)*sBscale) - 5, centerY-((A/2)*sBscale) - 50)
		sBctx.moveTo(centerX-((B/2)*sBscale), centerY-((A/2)*sBscale) - 55)
		sBctx.lineTo(centerX-((B/2)*sBscale), centerY-((A/2)*sBscale) - 60)
		sBctx.moveTo(centerX-((B/2)*sBscale), centerY-((A/2)*sBscale) - 55)
		sBctx.lineTo(centerX-((B/2)*sBscale) - 5, centerY-((A/2)*sBscale) - 55)
		sBctx.moveTo(centerX-((B/2)*sBscale) + B*sBscale, centerY-((A/2)*sBscale) - 55)
		sBctx.lineTo(centerX-((B/2)*sBscale) + B*sBscale + 5, centerY-((A/2)*sBscale) - 60)
		sBctx.lineTo(centerX-((B/2)*sBscale) + B*sBscale - 5, centerY-((A/2)*sBscale) - 50)
		sBctx.moveTo(centerX-((B/2)*sBscale) + B*sBscale, centerY-((A/2)*sBscale) - 55)
		sBctx.lineTo(centerX-((B/2)*sBscale) + B*sBscale, centerY-((A/2)*sBscale) - 60)
		sBctx.moveTo(centerX-((B/2)*sBscale) + B*sBscale, centerY-((A/2)*sBscale) - 55)
		sBctx.lineTo(centerX-((B/2)*sBscale) + B*sBscale + 5, centerY-((A/2)*sBscale) - 55)
		sBctx.moveTo(centerX-((B/2)*sBscale) + B*sBscale/2, centerY-((A/2)*sBscale) - 55)
		sBctx.font = 'bold 14px GOST A';
		sBctx.fillStyle = 'black';
		sBctx.textAlign = 'center';
		sBctx.fillText('L=' +  String(B).replaceAll('.', ','), centerX-((B/2)*sBscale) + B*sBscale/2, centerY-((A/2)*sBscale) - 60)

		sBctx.stroke()
		sBctx.lineWidth = 2
		
		let nB1 = B/bVar
		let nA1 = A/aVar

		let wo = bVar * sBscale;
		let h = aVar * sBscale;
		let x = centerX - (B / 2) * sBscale + (bVar / 2 * sBscale);
		let y = centerY - (A / 2) * sBscale + (aVar / 2 * sBscale);
		if (nB1 % 2 == 0) {
			x = centerX - bVar/2*sBscale
		} else {
			x = centerX - bVar*sBscale
		}
		if (nA1 % 2 == 0) {
			y = centerY - aVar/2*sBscale
		} else {
			y = centerY - aVar*sBscale
		}
		const step = 10; // Расстояние между линиями штриховки в пикселях
		sBctx.save(); // Сохраняем состояние холста
		sBctx.strokeRect(x, y, wo, h)

		// 2. Создаем маску по форме вашего прямоугольника
		sBctx.beginPath();
		sBctx.rect(x, y, wo, h);
		sBctx.clip();
		
		// 3. Рисуем штриховку внутри маски
		sBctx.strokeStyle = '#000000'; // Цвет штриховки
		sBctx.lineWidth = 1;           // Толщина линий штриховки
		sBctx.beginPath();
		
		for (let i = -h; i < wo; i += step) {
		    sBctx.moveTo(x + i, y);
		    sBctx.lineTo(x + i + h, y + h);
		}
		sBctx.stroke();
		
		sBctx.restore();
	}
}

function changeSecBeamVar() {
	if (sece_varo.value == 1) {
		secvaro = 1
		doingSecVar()
	} else if (sece_varo.value == 2) {
		secvaro = 2
		doingSecVar()
	} else if (sece_varo.value == 3) {
		secvaro = 3
		doingSecVar()
	}
}

sece_varo.addEventListener("click", () => {
    changeSecBeamVar()
});

init.shadowRoot.addEventListener('input', (event) => {
	doingSecVar()
});
floor.shadowRoot.addEventListener('input', (event) => {
	doingSecVar();
});
vargen.shadowRoot.addEventListener('input', (event) => {
	doingSecVar();
});
vargen.shadowRoot.getElementById('varGen').addEventListener("click", () => {
	doingSecVar();
});


function changeSecBeamVar() {
	if (sece_varo.value == 1) {
		secvaro = 1
		doingSecVar()
	} else if (sece_varo.value == 2) {
		secvaro = 2
		doingSecVar()
	} else if (sece_varo.value == 3) {
		secvaro = 3
		doingSecVar()
	}
}
