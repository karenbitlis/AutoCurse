const docxLib = window.docx;
const { Document, Packer, ImageRun, XmlComponent, LineRuleType, Paragraph, ommlXmlText, BorderStyle, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, PageBreak, textParagraphs } = docxLib;
const deckChildren = [];

let countDeckButton = document.getElementById('decking')
let deckDataBase = [6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 25, 26, 28, 30, 32]


// 6.0 7.0 8.0 (стандарт для повышенных нагрузок)9.010.0 (для тяжелых условий)11.012.013.014.015.016.017.018.020.022.025.0


const vart1A = 1
const q_normis = 31.33

const n0 = 150
const E = 2.06*(10**4)
const mu = 0.3
const E1 = E/(1 - (mu)**2)

// const deckFormula = new XmlComponent("m:oMath");

countDeckButton.addEventListener("click", () => {
	generateDeck()
})

function findNearestCeil(arr, target) {
    // 1. Защита: проверяем, что передан массив и он не пустой
    if (!Array.isArray(arr) || arr.length === 0) {
        console.warn("Передан невалидный массив:", arr);
        return null;
    }

    // 2. Сортируем массив по возрастанию
    const sorted = [...arr].sort((a, b) => a - b);

    // 3. Ищем ПЕРВЫЙ элемент, который больше или равен расчитанному значению
    const result = sorted.find(val => val >= target);

    // 4. Если значение больше всех элементов в базе, возвращаем самый большой доступный элемент
    return result !== undefined ? result : sorted[sorted.length - 1];
}

const qn = mSub("q", "н");
const n0gib = mSub("n", "0");
const n04 = mSup(n0gib, "4");

const qnF = mFormula(
	mSub("q", "н")
) 
const formula = mFormula(

    mFrac(
        mSub("l", "н"),
        mSub("t", "н")
    ),

    mEq(),

    mFrac(
        mGroup("4", n0gib),
        "15"
    ),

    mParen(
        "1",
        mPlus(),
        mFrac(
            mSub("72E", "1"),
            mGroup(n04, qn)
        )
    ));

const n150 = mFormula(

    mSub("n", "0"),

    mEq(),
    mSquareParen(
		mFrac(
			"1",
			"f",
		),
	),
	mEq(),
	"150",
);
const edef = mFormula(
    mSub("E", "1"),
    mEq(),

    mFrac(
        "E",
        mParen(
            "1",
            mMinus(),
            mSup("ν", "2")
        )
    ),

    mEq(),

    mFrac(
        [
            "2,06",
            mMul(),
            mSup("10", "4")
        ],
        mParen(
            "1",
            mMinus(),
            mSup("0,3", "2")
        )
    ),

    " ",
    mFrac(
        "кН",
        mSup("см", "2")
    )
)
const eexp = mFormula(
	mParen(
		"E",
    	mEq(),
	
    	[
    	    "2,06",
    	    mMul(),
    	    mSup("10", "4"),
    	    " "
    	],
	
    	mFrac(
    	    "кН",
    	    mSup("см", "2")
    	)
	)
)
const Eba = mFormula(
	'E'
)
const puas = mFormula(
	'ν'
)
const puasso = mFormula(
	'ν',
	mEq(),
	'0,3'
)
const l_nast = mFormula(
	mSub('l','н'),
	mEq(),

	String(vart1A).replaceAll(".", ",")+'м'
)
let deckForm = mFormula(
    mSub("t", "н"),
    mEq(),

    mFrac(
        mSub("l", "н"),

        mGroup(
            mFrac(
                mGroup("4", mSub("n", "0")),
                "15"
            ),

            mParen(
                "1",
                mPlus(),
                mFrac(
                    mGroup(
                        "72",
                        mSub("E", "1")
                    ),
                    mGroup(
                        mSup(
                            mSub("n", "0"),
                            "4"
                        ),
                        mSub("q", "н")
                    )
                )
            )
        )
    ),

    mEq(),

    mFrac(
        String(vart1A*100),

        mGroup(
            mFrac(
                mGroup("4", "·", "150"),
                "15"
            ),

            mParen(
                "1",
                mPlus(),

                mFrac(
                    mGroup(
                        "72",
                        mParen(
                            mFrac(
                                mGroup(
                                    "2,06",
                                    mMul(),
                                    mSup("10", "4")
                                ),
                                mGroup(
                                    "1",
                                    mMinus(),
                                    mSup("0,3", "2")
                                )
                            )
                        )
                    ),

                    mGroup(
                        mSup("150", "4"),
                        "·",
                        String(q_normis).replaceAll(".", ","),
                        "·",
                        mSup("10", "-4")
                    )
                )
            )
        )
    )
)

let tEN = (vart1A*100) / (((4 * 150) / 15) * (1 + (72 * (2.06 * 10**4 / (1 - 0.3**2))) / (150**4 * q_normis * 10**-4)));
let deck_thickness = String(findNearestCeil(deckDataBase, tEN*10)).replaceAll(".", ",")
let deckResult = mFormula(
	mSub("t", "н"),
    mEq(),
    String(tEN).replaceAll(".", ","),
    " см",
    " ⇒ ",
    mSub("t", "н"),
    mEq(),
    deck_thickness,
    " мм"
)

document.getElementById('deck_thickness').innerText = deck_thickness + 'мм'

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

function createDeck() {
	deckChildren.push(
		new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 60 },
            children: 
            	[
            		new TextRun({
            			text: "1.1 Вариант 1",
            			bold: true,
            			size: 28,
            			font: "Times New Roman" 
            		}), 
            	]
        }),
        new Paragraph({}),
		new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { 
            	after: 60
            },
            children: 
            	[
            		new TextRun({
        				text: "1.1.1 Расчёт стального настила",
        				bold: true,
        				size: 28,
        				font: "Times New Roman" 
        			}), 
            	]
        }),
    )
    pushDeck()
    deckChildren.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new TextRun({
                    text: "Рис.2 - Грузовая площадь настила", font: "Times New Roman", size: 28 
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
            children: 
            	[
            		new TextRun({
        				text: "Для настила принимается сталь класса С245.",
        				size: 28,
        				font: "Times New Roman" 
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
            children: 
            	[
            		new TextRun({
        				text: "Чтобы определить толщину настила вычисляется отношение пролёта настила к его толщине по формуле:",
        				size: 28,
        				font: "Times New Roman" 
        			}), 
            	]
        }),
        new Paragraph({
    		alignment: AlignmentType.CENTER, // Для формул обычно используют выравнивание по центру
    		children: [formula]
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
            children: 
            	[
            		new TextRun({
        				text: "где",
        				size: 28,
        				font: "Times New Roman" 
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
    		children: [
        		new TextRun({
        		    children: [qnF]
        		}),
        		new TextRun(" — нормативная нагрузка на настил,")
   			]
		}),
		new Paragraph({
			alignment: AlignmentType.LEFT,
			spacing: {
                before: 0,
                after: 120,
                line: 360,
                lineRule: LineRuleType.AUTO,
            },
    		children: [
        		new TextRun({
        		    children: [n150]
        		}),
        		new TextRun(",")
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
    		children: [
        		new TextRun({
        		    children: [edef]
        		}),
        		new TextRun(",")
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
    		children: [
        		new TextRun({
        		    children: [Eba]
        		}),
        		new TextRun(" — модуль упругости стали "),
        		new TextRun({
        		    children: [eexp]
        		}),
        		new TextRun(","),
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
    		children: [
        		new TextRun({
        		    children: [puas]
        		}),
        		new TextRun(" — коэффициент Пуассона (для стали "),
        		new TextRun({
        		    children: [puasso]
        		}),
        		new TextRun("),"),
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
    		children: [
        		new TextRun({
        		    children: [l_nast]
        		}),
        		new TextRun(" — пролёт настила."),
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
    		children: [
    			new TextRun({
        		    children: [deckForm]
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
    		children: [
    			new TextRun({
        		    children: [deckResult]
        		}),
                new PageBreak()
   			]
		}),
	)
}

function generateDeck() {
	createDeck()
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
            children: deckChildren
        }]
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, "Decking.docx");
    }).catch(err => {
        console.error(err);
        alert("Произошла ошибка, детали в консоли.");
    });
}


function pushDeck() {
    dataUrl = canvas.toDataURL("image/png");
    snapshot = dataURLtoUint8Array(dataUrl).data;
    deckChildren.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new ImageRun({
                    data: snapshot,
                    transformation: {
                        width: 370, // Ширина в пикселях в документе
                        height: 222, // Высота в пикселях в документе
                    },
                    size: 28,
                }),
            ],
        })
    )
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
            x = centerX - variant1B*scale
        } else {
            x = centerX - variant1B/2*scale
        }
        if (nA1 % 2 == 0) {
            y = centerY - variant1A*scale
        } else {
            y = centerY - variant1A/2*scale
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