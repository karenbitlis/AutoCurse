let dkChildren = [];

const decker = document.getElementById('deck-roof1')

const dkCountButton = decker.shadowRoot.getElementById('decking');
const dkDataBase = [6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 25, 26, 28, 30, 32];
const dkQNormis = 31.33;

const dkN0 = 150;
const dkE = 2.06 * (10 ** 4);
const dkMu = 0.3;
const dkE1 = dkE / (1 - (dkMu) ** 2);
let localAVar, localBVar, localDist;
let decking_varo = decker.shadowRoot.getElementById('decking_varo')
let var1A = parseFloat(vargen.shadowRoot.getElementById('variant1A').value);
let var1B = parseFloat(vargen.shadowRoot.getElementById('variant1B').value);
let var2A = parseFloat(vargen.shadowRoot.getElementById('variant2A').value);
let var2B = parseFloat(vargen.shadowRoot.getElementById('variant2B').value);
let var3A = parseFloat(vargen.shadowRoot.getElementById('variant3A').value);
let var3B = parseFloat(vargen.shadowRoot.getElementById('variant3B').value);

dkCountButton.addEventListener("click", () => {
    generateDeck();
});

function dkFindNearestCeil(arr, target) {
    if (!Array.isArray(arr) || arr.length === 0) {
        console.warn("Передан невалидный массив:", arr);
        return null;
    }
    const sorted = [...arr].sort((a, b) => a - b);
    const result = sorted.find(val => val >= target);
    return result !== undefined ? result : sorted[sorted.length - 1];
}
let numvaro = 1
if (numvaro == 1) {
    localAVar = var1A;
    localBVar = var1B;
} else if (numvaro == 2) {
    localAVar = var2A;
    localBVar = var2B;
} else if (numvaro == 3) {
    localAVar = var3A;
    localBVar = var3B;
}

const dkQn = mSub("q", "н");
const dkN0gib = mSub("n", "0");
const dkN04 = mSup(dkN0gib, "4");

const dkQnF = mFormula(
    mSub("q", "н")
); 

const dkFormula = mFormula(
    mFrac(
        mSub("l", "н"),
        mSub("t", "н")
    ),
    mEq(),
    mFrac(
        mGroup("4", dkN0gib),
        "15"
    ),
    mParen(
        "1",
        mPlus(),
        mFrac(
            mSub("72E", "1"),
            mGroup(dkN04, dkQn)
        )
    )
);

const dkN150 = mFormula(
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

const dkEdef = mFormula(
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
);

const dkEexp = mFormula(
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
);

const dkEba = mFormula('E');
const dkPuas = mFormula('ν');
const dkPuasso = mFormula('ν', mEq(), '0,3');
let dkLNast
let dkDeckForm
let dkTEN
let dkDeckThickness
let dkDeckResult
calcThikness()
function calcThikness() {
    var1A = parseFloat(vargen.shadowRoot.getElementById('variant1A').value);
    var1B = parseFloat(vargen.shadowRoot.getElementById('variant1B').value);
    var2A = parseFloat(vargen.shadowRoot.getElementById('variant2A').value);
    var2B = parseFloat(vargen.shadowRoot.getElementById('variant2B').value);
    var3A = parseFloat(vargen.shadowRoot.getElementById('variant3A').value);
    var3B = parseFloat(vargen.shadowRoot.getElementById('variant3B').value);

    if (numvaro == 1) {
        localAVar = var1A;
        localBVar = var1B;
    } else if (numvaro == 2) {
        localAVar = var2A;
        localBVar = var2B;
    } else if (numvaro == 3) {
        localAVar = var3A;
        localBVar = var3B;
    }
    dkLNast = mFormula(
        mSub('l', 'н'),
        mEq(),
        String(localAVar).replaceAll(".", ",") + 'м'
    );
    dkDeckForm = mFormula(
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
            String(localAVar * 100),
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
                            String(dkQNormis).replaceAll(".", ","),
                            "·",
                            mSup("10", "-4")
                        )
                    )
                )
            )
        )
    );
    dkTEN = Math.ceil(((localAVar * 100) / (((4 * 150) / 15) * (1 + (72 * (2.06 * 10 ** 4 / (1 - 0.3 ** 2))) / (150 ** 4 * dkQNormis * 10 ** -4))))*1000)/1000;
    dkDeckThickness = String(dkFindNearestCeil(dkDataBase, dkTEN * 10)).replaceAll(".", ",");
    dkDeckResult = mFormula(
        mSub("t", "н"),
        mEq(),
        String(dkTEN).replaceAll(".", ","),
        " см",
        " ⇒ ",
        mSub("t", "н"),
        mEq(),
        dkDeckThickness,
        " мм"
    );
    decker.shadowRoot.getElementById('deck_thickness').innerText = dkDeckThickness + 'мм';
}

decker.shadowRoot.getElementById('deck_thickness').innerText = dkDeckThickness + 'мм';

const dkCanvas = decker.shadowRoot.getElementById("canvas");
const dkCtx = dkCanvas.getContext("2d");
const dkCtnr = decker.shadowRoot.getElementById("canvas-container");

const dkCssWidth = dkCtnr.offsetWidth - 8;
const dkCssHeight = 340;
const dkDpi = 10;

dkCanvas.width = dkCssWidth * dkDpi;
dkCanvas.height = dkCssHeight * dkDpi;

dkCanvas.style.width = dkCssWidth + "px";
dkCanvas.style.height = dkCssHeight + "px";

dkCtx.scale(dkDpi, dkDpi);

let dkZoom = 1;
let dkA = parseFloat(init.shadowRoot.getElementById('param_l').value);
let dkB = parseFloat(init.shadowRoot.getElementById('paramL').value);

let dkScale = 35;
const dkMove = 3 * dkB * dkScale / 2;

let dkSnapshotDataUrl, dkSnapshotBinary;

function dkDataURLtoUint8Array(dataurl) {
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
    dkChildren = []
    calcThikness()
    dkChildren.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 60 },
            children: [
                new TextRun({
                    text: "1."+numvaro+" Вариант " +numvaro,
                    bold: true,
                    size: 28,
                    font: "Times New Roman" 
                }), 
            ]
        }),
    )
    dkChildren.push(
        new Paragraph({}),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 60 },
            children: [
                new TextRun({
                    text: "1."+numvaro+".1 Расчёт стального настила",
                    bold: true,
                    size: 28,
                    font: "Times New Roman" 
                }), 
            ]
        }),
    );
    dkPushDeck();
    if (numvaro == 1) {
        dkChildren.push(
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: "Рис.2 - Грузовая площадь настила (В1)", font: "Times New Roman", size: 28 
                    }),
                ]
            }),
        )
    } else if (numvaro == 2) {
        dkChildren.push(
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: "Рис.8 - Грузовая площадь настила (В2)", font: "Times New Roman", size: 28 
                    }),
                ]
            }),
        )
    } else if (numvaro == 3) {
        dkChildren.push(
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: "Рис.14 - Грузовая площадь настила (В3)", font: "Times New Roman", size: 28 
                    }),
                ]
            }),
        )
    }
    
    dkChildren.push(
        new Paragraph({}),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
            indent: { firstLine: 709 },
            children: [
                new TextRun({
                    text: "Для настила принимается сталь класса С245.",
                    size: 28,
                    font: "Times New Roman" 
                }), 
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
            indent: { firstLine: 709 },
            children: [
                new TextRun({
                    text: "Чтобы определить толщину настила вычисляется отношение пролёта настила к его толщине по формуле:",
                    size: 28,
                    font: "Times New Roman" 
                }), 
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [dkFormula]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
            indent: { firstLine: 709 },
            children: [
                new TextRun({
                    text: "где",
                    size: 28,
                    font: "Times New Roman" 
                }), 
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
            children: [
                new TextRun({ children: [dkQnF] }),
                new TextRun(" — нормативная нагрузка на настил,")
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
            children: [
                new TextRun({ children: [dkN150] }),
                new TextRun(",")
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
            children: [
                new TextRun({ children: [dkEdef] }),
                new TextRun(",")
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
            children: [
                new TextRun({ children: [dkEba] }),
                new TextRun(" — модуль упругости стали "),
                new TextRun({ children: [dkEexp] }),
                new TextRun(","),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
            children: [
                new TextRun({ children: [dkPuas] }),
                new TextRun(" — коэффициент Пуассона (для стали "),
                new TextRun({ children: [dkPuasso] }),
                new TextRun("),"),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
            children: [
                new TextRun({ children: [dkLNast] }),
                new TextRun(" — пролёт настила."),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
            children: [
                new TextRun({ children: [dkDeckForm] }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
            children: [
                new TextRun({ children: [dkDeckResult] }),
                new PageBreak()
            ]
        }),
    );
}
function dkPushDeck() {
    dkSnapshotDataUrl = dkCanvas.toDataURL("image/png");
    dkSnapshotBinary = dkDataURLtoUint8Array(dkSnapshotDataUrl).data;
    dkChildren.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new ImageRun({
                    data: dkSnapshotBinary,
                    transformation: { width: 370, height: 222 },
                    size: 28,
                }),
            ],
        })
    );
}
function generateDeck() {
    createDeck();
    const doc = new Document({
        styles: {
            paragraphStyles: [
                {
                    id: "customItalicStyle",
                    name: "Custom Italic Style",
                    basedOn: "Normal",
                    next: "Normal",
                    run: { font: "Times New Roman", size: 28, italics: true }
                },
                {
                    id: "Normal",
                    name: "Normal",
                    run: { font: "Times New Roman", size: 28 }
                }
            ]
        },
        sections: [{
            properties: {
                page: { margin: { top: 1134, bottom: 1134, left: 1700, right: 1700 } }
            },
            children: dkChildren
        }]
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, "Decking.docx");
    }).catch(err => {
        console.error(err);
        alert("Произошла ошибка, детали в консоли.");
    });
}

function dkDrawEveryVar(num) {
    dkA = parseFloat(init.shadowRoot.getElementById('param_l').value);
    dkB = parseFloat(init.shadowRoot.getElementById('paramL').value);
    dkCtx.fillStyle = "white"
    dkCtx.fillRect(0, 0, canvas.width, canvas.height)
    dkCtx.fillStyle = "black"
    dkCtx.shadowColor = 'transparent';
    dkCtx.strokeStyle = 'black';
    var1A = parseFloat(vargen.shadowRoot.getElementById('variant1A').value);
    var1B = parseFloat(vargen.shadowRoot.getElementById('variant1B').value);
    var2A = parseFloat(vargen.shadowRoot.getElementById('variant2A').value);
    var2B = parseFloat(vargen.shadowRoot.getElementById('variant2B').value);
    var3A = parseFloat(vargen.shadowRoot.getElementById('variant3A').value);
    var3B = parseFloat(vargen.shadowRoot.getElementById('variant3B').value);
    
    localDist = -3 * 10 * dkScale / 2;
    if (num == 1) {
        localAVar = var1A;
        localBVar = var1B;
    } else if (num == 2) {
        localAVar = var2A;
        localBVar = var2B;
    } else if (num == 3) {
        localAVar = var3A;
        localBVar = var3B;
    }

    let centerX = dkCanvas.width / (2 * dkDpi) + dkScale + localDist + dkMove;
    let centerY = dkCanvas.height / (2 * dkDpi) + dkScale;
    
    if (dkZoom == 1) {
        centerX = dkCanvas.width / (2 * dkDpi) + dkScale + localDist + dkMove;
        centerY = dkCanvas.height / (2 * dkDpi) + dkScale;
    }

    dkCtx.lineWidth = 3;
    dkCtx.strokeRect(centerX - (dkB / 2) * dkScale, centerY - (dkA / 2) * dkScale, dkB * dkScale, dkA * dkScale);

    let nA2 = parseInt(dkA / localAVar);
    let nB2 = parseInt(dkB / localBVar);

    for (var i = 0; i < nA2; i++) {
        for (var q = 0; q < nB2; q++) {
            dkCtx.strokeRect(centerX - ((dkB / 2) - (q * localBVar)) * dkScale, centerY - ((dkA / 2) - (i * localAVar)) * dkScale, localBVar * dkScale, localAVar * dkScale);
        }
    }

    dkCtx.lineWidth = 2;
    
    dkCtx.strokeRect(centerX - ((dkB / 2) * dkScale) - 5, centerY - ((dkA / 2) * dkScale) - 5, 10, 10);
    dkCtx.strokeRect(centerX + ((dkB / 2) * dkScale) - 5, centerY + ((dkA / 2) * dkScale) - 5, 10, 10);
    dkCtx.strokeRect(centerX + ((dkB / 2) * dkScale) - 5, centerY - ((dkA / 2) * dkScale) - 5, 10, 10);
    dkCtx.strokeRect(centerX - ((dkB / 2) * dkScale) - 5, centerY + ((dkA / 2) * dkScale) - 5, 10, 10);

    if (dkZoom == 1) {
        dkCtx.beginPath();
        for (var w = 0; w < nB2; w++) {
            dkCtx.lineWidth = 1;
            dkCtx.moveTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale), centerY - ((dkA / 2) * dkScale));
            dkCtx.lineTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale), centerY - ((dkA / 2) * dkScale) - 25);
            dkCtx.lineTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale) + localBVar * dkScale, centerY - ((dkA / 2) * dkScale) - 25);
            dkCtx.lineTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale) + localBVar * dkScale, centerY - ((dkA / 2) * dkScale));
            dkCtx.moveTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale), centerY - ((dkA / 2) * dkScale) - 25);
            dkCtx.lineTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale) + 5, centerY - ((dkA / 2) * dkScale) - 30);
            dkCtx.lineTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale) - 5, centerY - ((dkA / 2) * dkScale) - 20);
            dkCtx.moveTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale), centerY - ((dkA / 2) * dkScale) - 25);
            dkCtx.lineTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale), centerY - ((dkA / 2) * dkScale) - 30);
            dkCtx.moveTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale), centerY - ((dkA / 2) * dkScale) - 25);
            dkCtx.lineTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale) - 5, centerY - ((dkA / 2) * dkScale) - 25);
            dkCtx.moveTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale) + localBVar * dkScale, centerY - ((dkA / 2) * dkScale) - 25);
            dkCtx.lineTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale) + localBVar * dkScale + 5, centerY - ((dkA / 2) * dkScale) - 30);
            dkCtx.lineTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale) + localBVar * dkScale - 5, centerY - ((dkA / 2) * dkScale) - 20);
            dkCtx.moveTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale) + localBVar * dkScale, centerY - ((dkA / 2) * dkScale) - 25);
            dkCtx.lineTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale) + localBVar * dkScale, centerY - ((dkA / 2) * dkScale) - 30);
            dkCtx.moveTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale) + localBVar * dkScale, centerY - ((dkA / 2) * dkScale) - 25);
            dkCtx.lineTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale) + localBVar * dkScale + 5, centerY - ((dkA / 2) * dkScale) - 25);
            dkCtx.moveTo((w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale) + localBVar * dkScale / 2, centerY - ((dkA / 2) * dkScale) - 25);
            dkCtx.font = 'bold 12px GOST A';
            dkCtx.fillStyle = 'black';
            dkCtx.textAlign = 'center';
            dkCtx.fillText('b=' + String(localBVar).replaceAll('.', ','), (w * localBVar * dkScale) + centerX - ((dkB / 2) * dkScale) + localBVar * dkScale / 2, centerY - ((dkA / 2) * dkScale) - 35);
            dkCtx.stroke();
        }
    
        for (var r = 0; r < nA2; r++) {
            dkCtx.moveTo(centerX - ((dkB / 2) * dkScale), (r * localAVar * dkScale) + centerY - ((dkA / 2) * dkScale));
            dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 25, (r * localAVar * dkScale) + centerY - ((dkA / 2) * dkScale));
            dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 25, (r * localAVar * dkScale) + centerY - ((dkA / 2) * dkScale) + localAVar * dkScale);
            dkCtx.lineTo(centerX - ((dkB / 2) * dkScale), (r * localAVar * dkScale) + centerY - ((dkA / 2) * dkScale) + localAVar * dkScale);
            dkCtx.moveTo(centerX - ((dkB / 2) * dkScale) - 25, (r * localAVar * dkScale) + centerY - ((dkA / 2) * dkScale));
            dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 20, (r * localAVar * dkScale) + centerY - ((dkA / 2) * dkScale) + 5);
            dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 30, (r * localAVar * dkScale) + centerY - ((dkA / 2) * dkScale) - 5);
            dkCtx.moveTo(centerX - ((dkB / 2) * dkScale) - 25, (r * localAVar * dkScale) + centerY - ((dkA / 2) * dkScale));
            dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 25, (r * localAVar * dkScale) + centerY - ((dkA / 2) * dkScale) - 5);
            dkCtx.moveTo(centerX - ((dkB / 2) * dkScale) - 25, (r * localAVar * dkScale) + centerY - ((dkA / 2) * dkScale) + localAVar * dkScale);
            dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 20, (r * localAVar * dkScale) + centerY - ((dkA / 2) * dkScale) + localAVar * dkScale + 5);
            dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 30, (r * localAVar * dkScale) + centerY - ((dkA / 2) * dkScale) + localAVar * dkScale - 5);
            dkCtx.moveTo(centerX - ((dkB / 2) * dkScale) - 25, (r * localAVar * dkScale) + centerY - ((dkA / 2) * dkScale) + localAVar * dkScale);
            dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 25, (r * localAVar * dkScale) + centerY - ((dkA / 2) * dkScale) + localAVar * dkScale + 5);
            dkCtx.save();
            dkCtx.font = 'bold 12px GOST A';
            dkCtx.textAlign = 'right';
            dkCtx.textBaseline = 'middle';
            dkCtx.translate(centerX - ((dkB / 2) * dkScale) - 30, (r * localAVar * dkScale) + centerY - ((dkA / 2) * dkScale) + localAVar * dkScale / 2);
            dkCtx.fillText('a=' + String(localAVar).replaceAll('.', ','), 0, 0);
            dkCtx.restore();
            dkCtx.stroke();
        }
    
        dkCtx.lineWidth = 1;
        dkCtx.moveTo(centerX - ((dkB / 2) * dkScale), centerY - ((dkA / 2) * dkScale));
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 65, centerY - ((dkA / 2) * dkScale));
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 65, centerY - ((dkA / 2) * dkScale) + dkA * dkScale);
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale), centerY - ((dkA / 2) * dkScale) + dkA * dkScale);
        dkCtx.moveTo(centerX - ((dkB / 2) * dkScale) - 65, centerY - ((dkA / 2) * dkScale));
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 60, centerY - ((dkA / 2) * dkScale) + 5);
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 70, centerY - ((dkA / 2) * dkScale) - 5);
        dkCtx.moveTo(centerX - ((dkB / 2) * dkScale) - 65, centerY - ((dkA / 2) * dkScale));
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 65, centerY - ((dkA / 2) * dkScale) - 5);
        dkCtx.moveTo(centerX - ((dkB / 2) * dkScale) - 65, centerY - ((dkA / 2) * dkScale) + dkA * dkScale);
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 60, centerY - ((dkA / 2) * dkScale) + dkA * dkScale + 5);
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 70, centerY - ((dkA / 2) * dkScale) + dkA * dkScale - 5);
        dkCtx.moveTo(centerX - ((dkB / 2) * dkScale) - 65, centerY - ((dkA / 2) * dkScale) + dkA * dkScale);
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 65, centerY - ((dkA / 2) * dkScale) + dkA * dkScale + 5);
        dkCtx.save();
        dkCtx.font = 'bold 14px GOST A';
        dkCtx.textAlign = 'right';
        dkCtx.textBaseline = 'middle';
        dkCtx.translate(centerX - ((dkB / 2) * dkScale) - 70, centerY - ((dkA / 2) * dkScale) + dkA * dkScale / 2);
        dkCtx.fillText('l=' + String(dkA).replaceAll('.', ','), 0, 0);
        dkCtx.restore();
        dkCtx.stroke();
    
        dkCtx.moveTo(centerX - ((dkB / 2) * dkScale), centerY - ((dkA / 2) * dkScale));
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale), centerY - ((dkA / 2) * dkScale) - 55);
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) + dkB * dkScale, centerY - ((dkA / 2) * dkScale) - 55);
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) + dkB * dkScale, centerY - ((dkA / 2) * dkScale));
        dkCtx.moveTo(centerX - ((dkB / 2) * dkScale), centerY - ((dkA / 2) * dkScale) - 55);
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) + 5, centerY - ((dkA / 2) * dkScale) - 60);
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 5, centerY - ((dkA / 2) * dkScale) - 50);
        dkCtx.moveTo(centerX - ((dkB / 2) * dkScale), centerY - ((dkA / 2) * dkScale) - 55);
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale), centerY - ((dkA / 2) * dkScale) - 60);
        dkCtx.moveTo(centerX - ((dkB / 2) * dkScale), centerY - ((dkA / 2) * dkScale) - 55);
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) - 5, centerY - ((dkA / 2) * dkScale) - 55);
        dkCtx.moveTo(centerX - ((dkB / 2) * dkScale) + dkB * dkScale, centerY - ((dkA / 2) * dkScale) - 55);
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) + dkB * dkScale + 5, centerY - ((dkA / 2) * dkScale) - 60);
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) + dkB * dkScale - 5, centerY - ((dkA / 2) * dkScale) - 50);
        dkCtx.moveTo(centerX - ((dkB / 2) * dkScale) + dkB * dkScale, centerY - ((dkA / 2) * dkScale) - 55);
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) + dkB * dkScale, centerY - ((dkA / 2) * dkScale) - 60);
        dkCtx.moveTo(centerX - ((dkB / 2) * dkScale) + dkB * dkScale, centerY - ((dkA / 2) * dkScale) - 55);
        dkCtx.lineTo(centerX - ((dkB / 2) * dkScale) + dkB * dkScale + 5, centerY - ((dkA / 2) * dkScale) - 55);
        dkCtx.moveTo(centerX - ((dkB / 2) * dkScale) + dkB * dkScale / 2, centerY - ((dkA / 2) * dkScale) - 55);
        dkCtx.font = 'bold 14px GOST A';
        dkCtx.fillStyle = 'black';
        dkCtx.textAlign = 'center';
        dkCtx.fillText('L=' + String(dkB).replaceAll('.', ','), centerX, centerY - ((dkA / 2) * dkScale) - 60);
        dkCtx.stroke();
        
        dkCtx.lineWidth = 2;
        let nB1 = dkB / localBVar;
        let nA1 = dkA / localAVar;

        let wo = localBVar * dkScale;
        let h = localAVar * dkScale;
        let x, y;
        if (nB1 % 2 == 0) {
            x = centerX - localBVar * dkScale;
        } else {
            x = centerX - localBVar / 2 * dkScale;
        }
        if (nA1 % 2 == 0) {
            y = centerY - localAVar * dkScale;
        } else {
            y = centerY - localAVar / 2 * dkScale;
        }
        
        dkCtx.save();
        dkCtx.strokeRect(x, y, wo, h);
        dkCtx.beginPath();
        dkCtx.rect(x, y, wo, h);
        dkCtx.clip();
        
        dkCtx.strokeStyle = '#000000';
        dkCtx.lineWidth = 1;
        dkCtx.beginPath();
        for (let i = -h; i < wo; i += 10) {
            dkCtx.moveTo(x + i, y);
            dkCtx.lineTo(x + i + h, y + h);
        }
        dkCtx.stroke();
        dkCtx.restore();
    }
}
nextBtn.addEventListener("click", () => {
    dkDrawEveryVar(numvaro);
    calcThikness()
});

dkDrawEveryVar(numvaro);

// let decking_varo = decker.shadowRoot.getElementById('decking_varo')

decking_varo.addEventListener("click", () => {
    changeDeckVar()
});

function changeDeckVar() {
    if (decking_varo.value == 1) {
        numvaro = 1
        dkDrawEveryVar(numvaro);
        calcThikness()
    } else if (decking_varo.value == 2) {
        numvaro = 2
        dkDrawEveryVar(numvaro);
        calcThikness()
    } else if (decking_varo.value == 3) {
        numvaro = 3
        dkDrawEveryVar(numvaro);
        calcThikness()
    }
}
