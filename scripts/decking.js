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