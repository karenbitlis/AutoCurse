let reBeamChildren = []


let rEpure = document.getElementById("roof-epure1")
let reCanvas = rEpure.shadowRoot.getElementById("canvas");
let reCtx = reCanvas.getContext("2d");
let reCtnr = rEpure.shadowRoot.getElementById("canvas-container");
let reScale = 75
let reMscale = 50
let reRoofTable

let reDataUrl = reCanvas.toDataURL("image/png");
let reSnapshot = [];
let { data: reInitialData } = reDataURLtoUint8Array(reDataUrl)
let reMMax
let reBiQ 

const reCssWidth = reCtnr.offsetWidth - 8;
const reCssHeight = 450;
const reDpi = 10;

let reCenterX
let reCenterY

let reP1
let reP3
let reP2

let reWneed
let reRoofBeamchey
let reBeamRoofParameters
let reRoofPowerCheck
let reRoofPowerCheckCalc
let reRoofPowerCheckEnd
let reRoofTauCheck
let reTauMaxRoof
let reRoofTauCheckCalc
let reRoofTauCheckUnequ1
let reRoofTauCheckUnequ2
let reRoofDeflectionFormula
let reRoofDeflectionAnsw 
let reRoofDeflectionCalc

function doingEpures() {
	reBeamChildren = [];
	varus1A = parseFloat(vargen.shadowRoot.getElementById('variant1A').value);
	varus1B = parseFloat(vargen.shadowRoot.getElementById('variant1B').value);
	varus2A = parseFloat(vargen.shadowRoot.getElementById('variant2A').value);
	varus2B = parseFloat(vargen.shadowRoot.getElementById('variant2B').value);
	varus3A = parseFloat(vargen.shadowRoot.getElementById('variant3A').value);
	varus3B = parseFloat(vargen.shadowRoot.getElementById('variant3B').value);
	
	dataInB = {
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
	
	reUsefullLoad = usefullLoad
	reRoofType = roofType
	reDeckThickness = deck_thickness
	
	if (roofvaro == 1) {
	    aVarRb = varus1A;
	    bVarRb = varus1B;
	    dist = -3 * rbB * rbScale / 2;
	} else if (roofvaro == 2) {
	    aVarRb = varus2A;
	    bVarRb = varus2B;
	    dist = -3 * rbB * rbScale / 2;
	} else if (roofvaro == 3) {
	    aVarRb = varus3A;
	    bVarRb = varus3B;
	    dist = -3 * rbB * rbScale / 2;
	}
	
	reVarus1A = aVarRb
	reVarus1B = bVarRb
	reScale = 75
	
	reQNormal = maine * aVarRb
	reQReal = mainest * aVarRb
	
	reQNormalLinear = reQNormal * reVarus1A
	reQRealLinear = reQReal * reVarus1A
	
	reMMax = reQRealLinear * (reVarus1B ** 2) / 8;
	reBiQ = reQRealLinear * reVarus1B / 2;
	
	reDataUrl = reCanvas.toDataURL("image/png");
	reSnapshot = [];
	({ data: reInitialData } = reDataURLtoUint8Array(reDataUrl));;
	
	reCanvas.width = reCssWidth * reDpi;
	reCanvas.height = reCssHeight * reDpi;
	
	reCanvas.style.width = reCssWidth + "px";
	reCanvas.style.height = reCssHeight + "px";
	
	reCtx.scale(reDpi, reDpi);
	
	reCenterX = reCanvas.width / (2 * reDpi);
	reCenterY = reCanvas.height / (2 * reDpi) + 300;
	
	reMscale = 50
	
	if (reVarus1B > 3) {
	    reMscale = 110;
	    if (reVarus1B > 4) {
	        reMscale = 200;
	    }
	}
	
	reP1 = { x: reCenterX - reVarus1B / 2 * reScale, y: reCenterY / 7 + 2 * reScale };
	reP3 = { x: reCenterX + (reVarus1B / 2) * reScale, y: reCenterY / 7 + 2 * reScale };
	reP2 = { x: reCenterX, y: reCenterY / 7 + 2 * reScale + reMMax / reMscale * reScale };

	drawRoofBeamEpure();
	reWneed = mFormula(
	    mText('σ'), mEq(),
	    mFrac(mSub('M', 'max'), mText('W')),
	    ' ≤ ',
	    mGroup(mSub('R', 'y'), mMul(), mSub('γ', 'c')),
	
	    mText(' ⇒ '),
	    mSub('W', 'тр'), mEq(),
	    mFrac(
	        mSub('M', 'max'),
	        mGroup(mSub('R', 'y'), mMul(), mSub('γ', 'c'))
	    ),
	    mEq(),
	    mFrac(
	        mGroup(String(Math.ceil(reMMax * 1000) / 1000).replace('.', ',')),
	        '0,24'
	    ),
	    mEq(),
	    String(Math.ceil(reMMax / 0.24 * 1000) / 1000).replace('.', ','), mSup('см', '3'));
	reRoofBeamchey = selectBeamByWx(Math.ceil(reMMax / 0.24 * 1000) / 1000);
	reBeamRoofParameters = mFormula(
	    mSub('I', 'x'), mEq(), String(reRoofBeamchey.Ix).replace('.', ','), mText(' '), mSup('см', '4'),
	    mText('; '), 
	    mSub('S', 'x'), mEq(), String(reRoofBeamchey.Sx).replace('.', ','), mText(' '), mSup('см', '3'),
	    mText('; '),
	    mText('Масса на 1м'), mEq(), String(reRoofBeamchey.weight).replace('.', ','), mText(' кг'));
	reRoofPowerCheck = mFormula(
	    mText('σ'), mEq(),
	    mFrac(
	        mSub('M', 'max'),
	        mText('W')
	    ),
	    ' ≤ ',
	    mGroup(mSub('R', 'y'), mMul(), mSub('γ', 'c')));
	reRoofPowerCheckCalc = mFormula(
	    mFrac(
	        mSub('M', 'max'),
	        mSub('W', 'x')
	    ),
	    mEq(), 
	    mFrac(
	        mGroup(String(Math.ceil(reMMax * 1000) / 1000).replace('.', ','), mMul(), '100'),
	        (String(Math.ceil(reRoofBeamchey.Wx * 1000) / 1000).replace('.', ','))
	    ),
	    mEq(), 
	    String(Math.ceil(reMMax * 100 / reRoofBeamchey.Wx * 1000) / 1000).replace('.', ','), 
	    mText(' '),
	    mFrac(
	        'кН',
	        mGroup(mSup('см', '2'))
	    ));
	reRoofPowerCheckEnd = mFormula(
	    String(Math.ceil(reMMax * 100 / reRoofBeamchey.Wx * 1000) / 1000).replace('.', ','),
	    mText(' '),
	    mFrac('кН', mSup('см', '2')),
	    ' < ',
	    '24',
	    mText(' '),
	    mFrac('кН', mSup('см', '2')));
	reRoofTauCheck = mFormula(
	    mSub('τ', 'max'), mEq(),
	    mFrac(mGroup(mSub('Q', 'max'), mMul(), mSub('S', 'x')), mGroup(mSub('I', 'x'), mMul(), 't')),
	    ' ≤ ',
	    mGroup(mSub('R', 's'), mMul(), mSub('γ', 'c')),
	    mText(' (где '), mSub('R', 's'), mEq(), '0,58', mMul(), mSub('R', 'y'), mText(')'));
	reTauMaxRoof = (reBiQ * reRoofBeamchey.Sx) / (reRoofBeamchey.Ix * reRoofBeamchey.t / 10);
	reRoofTauCheckCalc = mFormula(
	    mSub('τ', 'max'), mEq(),
	    mFrac(
	        mGroup(mSub('Q', 'max'), mMul(), mSub('S', 'x')),
	        mGroup(mSub('I', 'x'), mMul(), 't')
	    ),
	    mEq(),
	    mFrac(
	        mGroup(String(Math.ceil(reBiQ * 1000) / 1000).replace('.', ','), mMul(), String(Math.ceil(reRoofBeamchey.Sx * 1000) / 1000).replace('.', ',')),
	        mGroup(String(Math.ceil(reRoofBeamchey.Ix * 1000) / 1000).replace('.', ','), mMul(), String(Math.ceil(reRoofBeamchey.t / 10 * 1000) / 1000).replace('.', ','))
	    ),
	    mEq(),
	    String(Math.ceil(reTauMaxRoof * 1000) / 1000).replace('.', ','), 
	    mText(' '), 
	    mFrac('кН', mSup('см', '2')));
	reRoofTauCheckUnequ1 = mFormula(
	    String(Math.ceil(reTauMaxRoof * 1000) / 1000).replace('.', ','),
	    mText(' '),
	    mFrac('кН', mSup('см', '2')),
	    ' ≤ ',
	    '0,58',
	    mMul(),
	    '24',
	    mText(' '),
	    mFrac('кН', mSup('см', '2')));
	reRoofTauCheckUnequ2 = mFormula(
	    String(Math.ceil(reTauMaxRoof * 1000) / 1000).replace('.', ','),
	    mText(' '),
	    mFrac('кН', mSup('см', '2')),
	    ' ≤ ',
	    '13,92',
	    mText(' '),
	    mFrac('кН', mSup('см', '2')));
	reRoofDeflectionFormula = mFormula(
	    mFrac(
	        mSub('f', 'бн'),
	        mSub('l', 'бн')
	    ),
	    mEq(), 
	    mFrac('5', '384'),
	    mMul(),
	    mFrac(
			mGroup(
				mSub('q', 'н'), 
				mMul(), 
				mGroup(mSup(mSub('l', 'бн'), '3'))
			),
			mGroup('E', mMul(), mSub('I', 'x'))
		),
		' ≤ ',
		mSquareParen(mFrac('f', 'l')));
	reRoofDeflectionAnsw = (5 / 384) * ((reQNormal) * (10 ** (-2)) * ((reVarus1B * 100) ** 3)) / (2.06 * (10 ** 4) * reRoofBeamchey.Ix);
	reRoofDeflectionCalc = mFormula(
		mFrac('5', '384'),
		mMul(),
		mFrac(
			mGroup(
				String(Math.ceil(reQNormal * 1000) / 1000).replace('.', ','),
				mText('·'), 
				mSup('10', '-2'),
				mText('·'),
				mGroup(mSup(String(Math.ceil(reVarus1B * 100 * 1000) / 1000).replace('.', ','), '3'))
			),
			mGroup(
				'2,06', mText('·'),  mSup('10', '4'),
				mText('·'),
				String(Math.ceil(reRoofBeamchey.Ix * 1000) / 1000).replace('.', ',')
			)
		),
		mEq(),
		String(Math.ceil(reRoofDeflectionAnsw * 100000) / 100000).replace('.', ','),
		' < ',
		'0,0066');
	rEpure.shadowRoot.getElementById('rEpure-result').innerText = 'Назначен двутавр №' + reRoofBeamchey.number
}

function pushRoofEpure() {
    reDataUrl = reCanvas.toDataURL("image/png");
    reSnapshot = reDataURLtoUint8Array(reDataUrl).data;
}

let roofe_varo = rEpure.shadowRoot.getElementById('roofe_varo')

const reEpureOnly = rEpure.shadowRoot.getElementById('epure_only');
reEpureOnly.addEventListener("click", () => {
	exportRoof();
});
rEpure.shadowRoot.getElementById('epuring').addEventListener("click", () => {
		generateRoofEpure();
	});
roofe_varo.addEventListener("click", () => {
    changerEpureVar()
});

doingEpures()

function changerEpureVar() {
	if (roofe_varo.value == 1) {
		roofvaro = 1
		doingEpures()
	} else if (roofe_varo.value == 2) {
		roofvaro = 2
		doingEpures()
	} else if (roofe_varo.value == 3) {
		roofvaro = 3
		doingEpures()
	}
}

function exportRoof() {
    const a = document.createElement("a");
    a.href = reCanvas.toDataURL("image/jpg");
    a.download = "roof_beam_epure.jpg";
    a.click();
}

function reDataURLtoUint8Array(dataurl) {
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

function createRoofEpure() {
		pushRoofEpure();
	    reBeamChildren.push(
	        new Paragraph({
	            alignment: AlignmentType.CENTER,
	            children: [
	                new ImageRun({
	                    data: reSnapshot,
	                    transformation: { width: 550, height: 450 },
	                    size: 28,
	                }),
	            ],
	        })
	    );
	    if (roofvaro == 1) {
	    	reBeamChildren.push(
	        	new Paragraph({
	        	    alignment: AlignmentType.CENTER,
	        	    spacing: { line: 360, before: 0, after: 0 },
	        	    children: [
	        	        new TextRun({ text: 'Рис.4 - Расчетная схема балки настила (В1)' }),
	        	    ]
	        	}),
	        	new Paragraph({}),
	    	);
	    } else if (roofvaro == 2) {
	    	reBeamChildren.push(
	        	new Paragraph({
	        	    alignment: AlignmentType.CENTER,
	        	    spacing: { line: 360, before: 0, after: 0 },
	        	    children: [
	        	        new TextRun({ text: 'Рис.10 - Расчетная схема балки настила (В2)' }),
	        	    ]
	        	}),
	        	new Paragraph({}),
	    	);
	    } else if (roofvaro == 3) {
	    	reBeamChildren.push(
	        	new Paragraph({
	        	    alignment: AlignmentType.CENTER,
	        	    spacing: { line: 360, before: 0, after: 0 },
	        	    children: [
	        	        new TextRun({ text: 'Рис.16 - Расчетная схема балки настила (В3)' }),
	        	    ]
	        	}),
	        	new Paragraph({}),
	    	);
	    }
	    
	    reBeamChildren.push(
	        new Paragraph({
	            alignment: AlignmentType.CENTER,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [
	                new TextRun({ text: 'Определение требуемого момента сопротивления балки настила:', bold: true }),
	            ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [ reWneed, new TextRun({ text: ' ' }) ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [
	                new TextRun({ text: 'Согласно ГОСТ 8239-89 выбирается двутавр №' + reRoofBeamchey.number + '  ' }),
	                mFormula(
	                    mParen(mSub('W', 'x'), mEq(),
	                    String(Math.ceil(reRoofBeamchey.Wx * 1000) / 1000).replace('.', ','), mSup('см', '3'))
	                ),
	            ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [ reBeamRoofParameters, new TextRun({ text: '.' }) ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
	            indent: { firstLine: 709 },
	            children: [
	                new TextRun({ text: 'Для определения фактических напряжений, возникающих в балке настила, применяются действительные геометрические характеристики:' })
	            ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.CENTER,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [
	                new TextRun({ text: 'Проверка прочности по нормальным напряжениям:', bold: true }),
	            ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [ reRoofPowerCheck, new TextRun({ text: ' ' }) ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [ reRoofPowerCheckCalc, new TextRun({ text: ' ' }) ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [ reRoofPowerCheckEnd, new TextRun({ text: ' ' }) ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.CENTER,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [
	                new TextRun({ underline: true, text: 'Условие прочности по нормальным напряжениям выполняется.' }),
	                new PageBreak(),
	            ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.CENTER,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [
	                new TextRun({ text: 'Проверка прочности по касательным напряжениям:', bold: true }),
	            ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [ reRoofTauCheck, new TextRun({ text: ' ' }) ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [
	                new TextRun({ text: 'Толщина стенки двутавра t =' + String(Math.ceil(reRoofBeamchey.t * 1000) / 1000).replace('.', ',') + 'мм.' })
	            ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [ reRoofTauCheckCalc, new TextRun({ text: ' ' }) ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [ reRoofTauCheckUnequ1, new TextRun({ text: ' ' }) ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [ reRoofTauCheckUnequ2, new TextRun({ text: ' ' }) ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.CENTER,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [
	                new TextRun({ underline: true, text: 'Условие прочности по касательным напряжениям выполняется.' }),
	            ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.CENTER,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [
	                new TextRun({ text: 'Проверка жесткости балки:', bold: true }),
	            ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [ reRoofDeflectionFormula, new TextRun({ text: ' ' }) ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
	            indent: { firstLine: 709 },
	            children: [
	                new TextRun({ text: "где", size: 28, font: "Times New Roman" }), 
	            ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
	            children: [
	                mFormula(mSub('q', 'н')),
	                new TextRun(" — нормативная погонная нагрузка,")
	            ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
	            children: [
	                mFormula(mSub('l', 'бн')),
	                new TextRun(" — пролёт балки настила,")
	            ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
	            children: [
	                mFormula(mSub('I', 'x')),
	                new TextRun(" — момент инерции сечения балки настила,")
	            ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.JUSTIFIED,
	            spacing: { before: 0, after: 120, line: 360, lineRule: LineRuleType.AUTO },
	            indent: { firstLine: 709 },
	            children: [
	                new TextRun("Предельный относительный прогиб балки настила принят равным 1/150 в соответствии с эстетико-психологическими требованиями.")
	            ]
	        }),
	        new Paragraph({
	            alignment: AlignmentType.CENTER,
	            spacing: { line: 360, before: 0, after: 0 },
	            children: [ reRoofDeflectionCalc ]
	        }),
	    );
	
	    if (reRoofDeflectionAnsw > (1 / 150)) {
	        reBeamChildren.push(
	            new Paragraph({
	                alignment: AlignmentType.CENTER,
	                spacing: { line: 360, before: 0, after: 0 },
	                children: [
	                    new TextRun({ underline: true, text: 'Необходимо увеличить сечение.' }),
	                    new PageBreak()
	                ]
	            })
	        );
	        reRoofBeamchey = selectBeamByWx(reRoofBeamchey.Wx + 0.1);
	        reRoofDeflectionAnsw = (5 / 384) * ((reQNormal) * (10 ** (-2)) * ((reVarus1B * 100) ** 3)) / (2.06 * (10 ** 4) * reRoofBeamchey.Ix);
	        reRoofDeflectionCalc = mFormula(
	            mFrac('5', '384'),
	            mMul(),
	            mFrac(
	                mGroup(
	                    String(Math.ceil(reQNormal * 1000) / 1000).replace('.', ','),
	                    mText('·'), 
	                    mSup('10', '-2'),
	                    mText('·'),
	                    mGroup(mSup(String(Math.ceil(reVarus1B * 100 * 1000) / 1000).replace('.', ','), '3'))
	                ),
	                mGroup(
	                    '2,06', mText('·'),  mSup('10', '4'),
	                    mText('·'),
	                    String(Math.ceil(reRoofBeamchey.Ix * 1000) / 1000).replace('.', ',')
	                )
	            ),
	            mEq(),
	            String(Math.ceil(reRoofDeflectionAnsw * 100000) / 100000).replace('.', ','),
	            ' < ',
	            '0,0066'
	        );
	        createRoofEpure();
	    } else {
	        reBeamChildren.push(
	            new Paragraph({
	                alignment: AlignmentType.CENTER,
	                spacing: { line: 360, before: 0, after: 0 },
	                children: [
	                    new TextRun({ underline: true, text: 'Условие жесткости выполняется.' }),
	                    new PageBreak()
	                ]
	            })
	        );
	    }
}

function generateRoofEpure() {
	    createRoofEpure();
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
	        sections: [
	            {
	                properties: {
	                    page: { margin: { top: 1134, bottom: 1134, left: 1700, right: 1700 } }
	                },
	                children: reBeamChildren
	            },
	        ],
	    });
	    Packer.toBlob(doc).then((blob) => {
	        saveAs(blob, "Roof_epure.docx");
	    });
	    reBeamChildren = [];
}

function drawRoofBeamEpure() {
	    reCtx.fillStyle = "white";
	    reCtx.fillRect(0, 0, reCanvas.width, reCanvas.height);
	
	// beam
	    reCtx.beginPath();
	    reCtx.lineWidth = 4;
	    reCtx.moveTo(reCenterX, reCenterY);
	    reCtx.moveTo(reCenterX, reCenterY / 7);
	    reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale + 0.1 * reScale, reCenterY / 7);
	    reCtx.lineTo(reCenterX + (reVarus1B / 2) * reScale - 0.1 * reScale, reCenterY / 7);
	    reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale, reCenterY / 7);
	    reCtx.lineTo(reCenterX - reVarus1B / 2 * reScale + 0.15 * reScale, reCenterY / 7 + 0.3 * reScale);
	    reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale, reCenterY / 7);
	    reCtx.lineTo(reCenterX - reVarus1B / 2 * reScale - 0.15 * reScale, reCenterY / 7 + 0.3 * reScale);
	    reCtx.lineTo(reCenterX - reVarus1B / 2 * reScale + 0.15 * reScale, reCenterY / 7 + 0.3 * reScale);
	    reCtx.closePath();
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.lineWidth = 4;
	    reCtx.moveTo(reCenterX + reVarus1B / 2 * reScale, reCenterY / 7);
	    reCtx.lineTo(reCenterX + reVarus1B / 2 * reScale, reCenterY / 7 + 0.3 * reScale);
	    reCtx.closePath();
	    reCtx.stroke();
	// ground
	    reCtx.beginPath();
	    reCtx.lineWidth = 4;
	    reCtx.moveTo(reCenterX + reVarus1B / 2 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale);
	    reCtx.moveTo(reCenterX + reVarus1B / 2 * reScale + 0.3 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale);
	    reCtx.lineTo(reCenterX + reVarus1B / 2 * reScale - 0.3 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale);
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.lineWidth = 4;
	    reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale);
	    reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale + 0.3 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale);
	    reCtx.lineTo(reCenterX - reVarus1B / 2 * reScale - 0.3 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale);
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.lineWidth = 4;
	    reCtx.moveTo(-0.05 * reScale + reCenterX - reVarus1B / 2 * reScale - 0.3 * reScale + 0.1 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale);
	    reCtx.lineTo(-0.05 * reScale + reCenterX - reVarus1B / 2 * reScale - 0.3 * reScale + 0.1 * reScale + 0.1 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale + 0.1 * reScale);
	    reCtx.moveTo(-0.05 * reScale + reCenterX - reVarus1B / 2 * reScale - 0.3 * reScale + 0.3 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale);
	    reCtx.lineTo(-0.05 * reScale + reCenterX - reVarus1B / 2 * reScale - 0.3 * reScale + 0.3 * reScale + 0.1 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale + 0.1 * reScale);
	    reCtx.moveTo(-0.05 * reScale + reCenterX - reVarus1B / 2 * reScale - 0.3 * reScale + 0.5 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale);
	    reCtx.lineTo(-0.05 * reScale + reCenterX - reVarus1B / 2 * reScale - 0.3 * reScale + 0.5 * reScale + 0.1 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale + 0.1 * reScale);
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.lineWidth = 4;
	    reCtx.moveTo(-0.05 * reScale + reCenterX + reVarus1B / 2 * reScale - 0.3 * reScale + 0.1 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale);
	    reCtx.lineTo(-0.05 * reScale + reCenterX + reVarus1B / 2 * reScale - 0.3 * reScale + 0.1 * reScale + 0.1 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale + 0.1 * reScale);
	    reCtx.moveTo(-0.05 * reScale + reCenterX + reVarus1B / 2 * reScale - 0.3 * reScale + 0.3 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale);
	    reCtx.lineTo(-0.05 * reScale + reCenterX + reVarus1B / 2 * reScale - 0.3 * reScale + 0.3 * reScale + 0.1 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale + 0.1 * reScale);
	    reCtx.moveTo(-0.05 * reScale + reCenterX + reVarus1B / 2 * reScale - 0.3 * reScale + 0.5 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale);
	    reCtx.lineTo(-0.05 * reScale + reCenterX + reVarus1B / 2 * reScale - 0.3 * reScale + 0.5 * reScale + 0.1 * reScale, reCenterY / 7 + 0.3 * reScale + 0.1 * reScale + 0.1 * reScale);
	    reCtx.stroke();
	// ramalines
	    reCtx.beginPath();
	    reCtx.lineWidth = 2.5;
	    reCtx.moveTo(reCenterX + reVarus1B / 2 * reScale, reCenterY / 7 + 0.3 * reScale);
	    reCtx.lineTo(reCenterX + reVarus1B / 2 * reScale, reCenterY / 7 + 4 * reScale);
	    reCtx.closePath();
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.lineWidth = 2.5;
	    reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale, reCenterY / 7 + 0.3 * reScale);
	    reCtx.lineTo(reCenterX - reVarus1B / 2 * reScale, reCenterY / 7 + 4 * reScale);
	    reCtx.closePath();
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.lineWidth = 3;
	    reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale, reCenterY / 7 + 4 * reScale);
	    reCtx.lineTo(reCenterX + (reVarus1B / 2) * reScale, reCenterY / 7 + 4 * reScale);
	    reCtx.closePath();
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.lineWidth = 3;
	    reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale, reCenterY / 7 + 2 * reScale);
	    reCtx.lineTo(reCenterX + (reVarus1B / 2) * reScale, reCenterY / 7 + 2 * reScale);
	    reCtx.closePath();
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.lineWidth = 2;
	    reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale, reCenterY / 7 + 1 * reScale);
	    reCtx.lineTo(reCenterX + (reVarus1B / 2) * reScale, reCenterY / 7 + 1 * reScale);
	    reCtx.closePath();
	    reCtx.stroke();
	
	    // size_arrows
	    reCtx.beginPath();
	    reCtx.lineWidth = 2;
	    reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale, reCenterY / 7 + 1 * reScale);
	    reCtx.lineTo(reCenterX - reVarus1B / 2 * reScale + 0.1 * reScale, reCenterY / 7 + 1 * reScale + 0.1 * reScale);
	    reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale, reCenterY / 7 + 1 * reScale);
	    reCtx.lineTo(reCenterX - reVarus1B / 2 * reScale + 0.1 * reScale, reCenterY / 7 + 1 * reScale - 0.1 * reScale);
	    reCtx.closePath();
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.lineWidth = 2;
	    reCtx.moveTo(reCenterX + reVarus1B / 2 * reScale, reCenterY / 7 + 1 * reScale);
	    reCtx.lineTo(reCenterX + reVarus1B / 2 * reScale - 0.1 * reScale, reCenterY / 7 + 1 * reScale - 0.1 * reScale);
	    reCtx.moveTo(reCenterX + reVarus1B / 2 * reScale, reCenterY / 7 + 1 * reScale);
	    reCtx.lineTo(reCenterX + reVarus1B / 2 * reScale - 0.1 * reScale, reCenterY / 7 + 1 * reScale + 0.1 * reScale);
	    reCtx.closePath();
	    reCtx.stroke();
	// 2m
	    reCtx.beginPath();
	    reCtx.lineWidth = 2;
	    reCtx.font = 'bold 22px GOST A';
	    reCtx.fillStyle = 'black';
	    reCtx.textAlign = 'center';
	    reCtx.fillText(String(reVarus1B).replaceAll('.', ',') + ' м', reCenterX, reCenterY / 7 + 1 * reScale - 0.05 * reScale);
	    reCtx.stroke();
	    reCtx.closePath();
	    reCtx.stroke();
	// load_arrows
	    reCtx.beginPath();
	    reCtx.lineWidth = 2;
	    reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale, reCenterY / 7 - 0.4 * reScale);
	    reCtx.lineTo(reCenterX + (reVarus1B / 2) * reScale, reCenterY / 7 - 0.4 * reScale);
	    for (let cvb = 0; cvb <= 7; cvb++) {
	        reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale + cvb * reVarus1B / 7 * reScale, reCenterY / 7 - 0.4 * reScale);
	        reCtx.lineTo(reCenterX - reVarus1B / 2 * reScale + cvb * reVarus1B / 7 * reScale, reCenterY / 7);
	        reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale + cvb * reVarus1B / 7 * reScale, reCenterY / 7);
	        reCtx.lineTo(reCenterX - reVarus1B / 2 * reScale + cvb * reVarus1B / 7 * reScale - 0.08 * reScale, reCenterY / 7 - 0.08 * reScale);
	        reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale + cvb * reVarus1B / 7 * reScale, reCenterY / 7);
	        reCtx.lineTo(reCenterX - reVarus1B / 2 * reScale + cvb * reVarus1B / 7 * reScale + 0.08 * reScale, reCenterY / 7 - 0.08 * reScale);
	    }
	    
	    reCtx.font = 'bold 22px GOST A';
	    reCtx.fillStyle = 'black';
	    reCtx.textAlign = 'center';
	    reCtx.fillText('q', reCenterX, reCenterY / 7 - 0.5 * reScale);
	
	    reCtx.closePath();
	    reCtx.stroke();
	// circles
	    reCtx.beginPath();
	    reCtx.arc(reCenterX - reVarus1B / 2 * reScale + 0.15 * reScale, reCenterY / 7 + 0.3 * reScale, 0.1 * reScale, 0, 2 * Math.PI, false);
	    reCtx.fillStyle = "white";
	    reCtx.fill();
	    reCtx.lineWidth = 4;
	    reCtx.strokeStyle = 'black';
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.arc(reCenterX - reVarus1B / 2 * reScale - 0.15 * reScale, reCenterY / 7 + 0.3 * reScale, 0.1 * reScale, 0, 2 * Math.PI, false);
	    reCtx.fillStyle = "white";
	    reCtx.fill();
	    reCtx.lineWidth = 4;
	    reCtx.strokeStyle = 'black';
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.arc(reCenterX - reVarus1B / 2 * reScale, reCenterY / 7, 0.1 * reScale, 0, 2 * Math.PI, false);
	    reCtx.fillStyle = "white";
	    reCtx.fill();
	    reCtx.lineWidth = 4;
	    reCtx.strokeStyle = 'black';
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.arc(reCenterX + reVarus1B / 2 * reScale, reCenterY / 7, 0.1 * reScale, 0, 2 * Math.PI, false);
	    reCtx.fillStyle = "white";
	    reCtx.fill();
	    reCtx.lineWidth = 4;
	    reCtx.strokeStyle = 'black';
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.arc(reCenterX - reVarus1B / 2 * reScale + 0.3 * reScale, reCenterY / 7 + 0.3 * reScale, 0, 2 * Math.PI, false);
	    reCtx.fillStyle = "white";
	    reCtx.fill();
	    reCtx.lineWidth = 4;
	    reCtx.strokeStyle = 'black';
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.arc(reCenterX + reVarus1B / 2 * reScale, reCenterY / 7 + 0.3 * reScale, 0.1 * reScale, 0, 2 * Math.PI, false);
	    reCtx.fillStyle = "white";
	    reCtx.fill();
	    reCtx.lineWidth = 4;
	    reCtx.strokeStyle = 'black';
	    reCtx.stroke();
	
	// momentum
	    const reCx = reP2.x;
	    const reCy = 2 * reP2.y - (reP1.y + reP3.y) / 2;
	
	    const reMinX_m = reP1.x;
	    const reMaxX_m = reP3.x;
	    const reMinY_m = reP2.y;
	    const reMaxY_m = reP1.y;
	    
	    const reSpacingM = 10;
	
	    reCtx.beginPath();
	    reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale, reCenterY / 7 + 4 * reScale);
	    reCtx.font = 'bold 22px GOST A';
	    reCtx.fillStyle = 'black';
	    reCtx.textAlign = 'center';
	    reCtx.fillText('M', reCenterX - reVarus1B / 2 * reScale - 0.2 * reScale, reCenterY / 7 + 2 * reScale);
	    reCtx.moveTo(reP1.x, reP1.y);
	    reCtx.quadraticCurveTo(reCx, reCy, reP3.x, reP3.y);
	    
	    reCtx.font = 'bold 18px GOST A';
	    reCtx.fillStyle = 'black';
	    reCtx.textAlign = 'center';
	    reCtx.fillText(String(Math.ceil(reMMax * 1000) / 1000).replace('.', ',') + 'кНм', reCenterX, reCenterY / 7 + 2 * reScale + reMMax / reMscale * reScale + 0.3 * reScale);
	
	    reCtx.lineTo(reP1.x, reP1.y); 
	    reCtx.closePath();
	
	    reCtx.save();
	    reCtx.clip();
	
	    reCtx.strokeStyle = '#000';
	    reCtx.lineWidth = 1;
	    
	    for (let x = reMinX_m; x <= reMaxX_m; x += reSpacingM) {
	        reCtx.beginPath();
	        reCtx.moveTo(x, reMinY_m); 
	        reCtx.lineTo(x, reMaxY_m);
	        reCtx.stroke();
	    }
	    
	    reCtx.restore();
	
	    reCtx.lineWidth = 4;
	    reCtx.strokeStyle = '#000';
	    
	    reCtx.beginPath();
	    reCtx.moveTo(reP1.x, reP1.y);
	    reCtx.quadraticCurveTo(reCx, reCy, reP3.x, reP3.y);
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.arc(reCenterX, reCenterY / 7 + 2 * reScale + reMMax / reMscale * reScale, 0.02 * reScale, 0, 2 * Math.PI, false);
	    reCtx.lineWidth = 4;
	    reCtx.strokeStyle = 'black';
	    reCtx.stroke();
	
	    // big Q power
	    reCtx.lineWidth = 4;
	    reCtx.beginPath();
	    reCtx.moveTo(reCenterX - reVarus1B / 2 * reScale, reCenterY / 7 + 4 * reScale);
	    reCtx.font = 'bold 22px GOST A';
	    reCtx.fillStyle = 'black';
	    reCtx.textAlign = 'center';
	    reCtx.fillText('Q', reCenterX - reVarus1B / 2 * reScale - 0.2 * reScale, reCenterY / 7 + 4 * reScale);
	
	    reCtx.lineTo(reCenterX - reVarus1B / 2 * reScale, reCenterY / 7 + 4 * reScale - reBiQ / 150 * reScale);
	    reCtx.lineTo(reCenterX + reVarus1B / 2 * reScale, reCenterY / 7 + 4 * reScale + reBiQ / 150 * reScale);
	    reCtx.lineTo(reCenterX + reVarus1B / 2 * reScale, reCenterY / 7 + 4 * reScale);
	    reCtx.closePath();
	    reCtx.stroke();
	
	    const reLeftX = reCenterX - (reVarus1B / 2) * reScale;
	    const reRightX = reCenterX + (reVarus1B / 2) * reScale;
	    
	    const reBaseY = (reCenterY / 7) + (4 * reScale);
	    const reTopLeftY = reBaseY - (reBiQ / 150) * reScale;
	    const reBottomRightY = reBaseY + (reBiQ / 150) * reScale;
	
	    const reMinX = reLeftX;
	    const reMaxX = reRightX;
	    const reMinY = reTopLeftY; 
	    const reMaxY = reBottomRightY;
	
	    const reSpacing = 10;
	    const reStrokeColor = '#000';
	    const reLineWidth = 1;
	
	    reCtx.beginPath();
	    reCtx.moveTo(reLeftX, reBaseY);              
	    reCtx.lineTo(reLeftX, reTopLeftY);           
	    reCtx.lineTo(reRightX, reBottomRightY);      
	    reCtx.lineTo(reRightX, reBaseY);             
	    reCtx.closePath();
	
	    reCtx.save();
	    reCtx.clip();
	
	    reCtx.strokeStyle = reStrokeColor;
	    reCtx.lineWidth = reLineWidth;
	
	    for (let x = reMinX; x <= reMaxX; x += reSpacing) {
	        reCtx.beginPath();
	        reCtx.moveTo(x, reMinY); 
	        reCtx.lineTo(x, reMaxY);
	        reCtx.stroke();
	    }
	
	    reCtx.restore();
	
	    reCtx.lineWidth = 4;
	    reCtx.strokeStyle = '#000';
	    reCtx.fillStyle = 'transparent';
	
	    reCtx.beginPath();
	    reCtx.moveTo(reLeftX, reBaseY);
	    reCtx.lineTo(reLeftX, reTopLeftY);
	    reCtx.lineTo(reRightX, reBottomRightY);
	    reCtx.lineTo(reRightX, reBaseY);
	    reCtx.closePath();
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.font = 'bold 18px GOST A';
	    reCtx.fillStyle = 'black';
	    reCtx.fillText(String('+' + Math.ceil(reBiQ * 1000) / 1000).replace('.', ',') + 'кН', reCenterX - reVarus1B / 2 * reScale + 0.5 * reScale, reCenterY / 7 + 4 * reScale - (reBiQ / 150) * reScale - 0.1 * reScale);
	    reCtx.closePath();
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.font = 'bold 18px GOST A';
	    reCtx.fillStyle = 'black';
	    reCtx.fillText(String('-' + Math.ceil(reBiQ * 1000) / 1000).replace('.', ',') + 'кН', reCenterX + reVarus1B / 2 * reScale - 0.5 * reScale, reCenterY / 7 + 4 * reScale + (reBiQ / 150) * reScale + 0.3 * reScale);
	    reCtx.closePath();
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.arc(reCenterX + reVarus1B / 2 * reScale, reCenterY / 7 + 4 * reScale + (reBiQ / 150) * reScale, 0.02 * reScale, 0, 2 * Math.PI, false);
	    reCtx.lineWidth = 4;
	    reCtx.strokeStyle = 'black';
	    reCtx.stroke();
	
	    reCtx.beginPath();
	    reCtx.arc(reCenterX - reVarus1B / 2 * reScale, reCenterY / 7 + 4 * reScale - (reBiQ / 150) * reScale, 0.02 * reScale, 0, 2 * Math.PI, false);
	    reCtx.lineWidth = 4;
	    reCtx.strokeStyle = 'black';
	    reCtx.stroke();
}