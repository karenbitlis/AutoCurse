let roofBeamChildren = []

const docxLib = window.docx;
const { Document, Packer, ImageRun, LineRuleType, XmlComponent, Paragraph, ommlXmlText, BorderStyle, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, PageBreak, textParagraphs } = docxLib;
let usefullLoad = 30
let roofType = 1
let roofTable
let deck_thickness = 14
let varus1A = 1
let varus1B = 2
let scale = 75

let q_normal = 70 //32.429
let q_real = 34.383

let q_normal_linear = q_normal*varus1A
let q_real_linear = q_real*varus1A

let M_max = q_real_linear*(varus1B**2)/8
let biQ = q_real_linear * varus1B / 2

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let dataUrl = canvas.toDataURL("image/png");
let snapshot = []
let { data } = dataURLtoUint8Array(dataUrl);

const ctnr = document.getElementById("canvas-container");

const cssWidth = ctnr.offsetWidth-8;
const cssHeight = 450;
const dpi = 10;

canvas.width = cssWidth * dpi;
canvas.height = cssHeight * dpi;

canvas.style.width = cssWidth + "px";
canvas.style.height = cssHeight + "px";

ctx.scale(dpi, dpi);

let centerX = canvas.width / (2*dpi);
let centerY = canvas.height / (2*dpi);

let Mscale = 50

if (varus1B > 3) {
	Mscale = 110
    if (varus1B > 4) {
        Mscale = 200
    }
}

let p1 = { x: centerX-varus1B/2*scale, y: centerY/7+2*scale };
let p3 = { x: centerX+(varus1B/2)*scale, y: centerY/7+2*scale };
let p2 = { x: centerX, y: centerY/7+2*scale+M_max/Mscale*scale };

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

drawRoofBeamEpure()

function drawRoofBeamEpure() {
//beam
	ctx.beginPath()
		ctx.lineWidth = 4
		ctx.moveTo(centerX, centerY)
		ctx.moveTo(centerX, centerY/7)
		ctx.moveTo(centerX-varus1B/2*scale+0.1*scale, centerY/7)
		ctx.lineTo(centerX+(varus1B/2)*scale-0.1*scale, centerY/7)
		ctx.moveTo(centerX-varus1B/2*scale, centerY/7)
		ctx.lineTo(centerX-varus1B/2*scale+0.15*scale, centerY/7+0.3*scale)
		ctx.moveTo(centerX-varus1B/2*scale, centerY/7)
		ctx.lineTo(centerX-varus1B/2*scale-0.15*scale, centerY/7+0.3*scale)
		ctx.lineTo(centerX-varus1B/2*scale+0.15*scale, centerY/7+0.3*scale)
		ctx.closePath()
		ctx.stroke()

	ctx.beginPath()
		ctx.lineWidth = 4
		ctx.moveTo(centerX+varus1B/2*scale, centerY/7)
		ctx.lineTo(centerX+varus1B/2*scale, centerY/7+0.3*scale)
		ctx.closePath()
		ctx.stroke()
// ground
	ctx.beginPath()
		ctx.lineWidth = 4
		ctx.moveTo(centerX+varus1B/2*scale, centerY/7+0.3*scale+0.1*scale)
		ctx.moveTo(centerX+varus1B/2*scale+0.3*scale, centerY/7+0.3*scale+0.1*scale)
		ctx.lineTo(centerX+varus1B/2*scale-0.3*scale, centerY/7+0.3*scale+0.1*scale)
		ctx.stroke()
	ctx.beginPath()
		ctx.lineWidth = 4
		ctx.moveTo(centerX-varus1B/2*scale, centerY/7+0.3*scale+0.1*scale)
		ctx.moveTo(centerX-varus1B/2*scale+0.3*scale, centerY/7+0.3*scale+0.1*scale)
		ctx.lineTo(centerX-varus1B/2*scale-0.3*scale, centerY/7+0.3*scale+0.1*scale)
		ctx.stroke()
	ctx.beginPath()
		ctx.lineWidth = 4
		ctx.moveTo(-0.05 * scale + centerX-varus1B/2*scale-0.3*scale+0.1*scale, centerY/7+0.3*scale+0.1*scale)
		ctx.lineTo(-0.05 * scale + centerX-varus1B/2*scale-0.3*scale+0.1*scale+0.1*scale, centerY/7+0.3*scale+0.1*scale+0.1*scale)
		ctx.moveTo(-0.05 * scale + centerX-varus1B/2*scale-0.3*scale+0.3*scale, centerY/7+0.3*scale+0.1*scale)
		ctx.lineTo(-0.05 * scale + centerX-varus1B/2*scale-0.3*scale+0.3*scale+0.1*scale, centerY/7+0.3*scale+0.1*scale+0.1*scale)
		ctx.moveTo(-0.05 * scale + centerX-varus1B/2*scale-0.3*scale+0.5*scale, centerY/7+0.3*scale+0.1*scale)
		ctx.lineTo(-0.05 * scale + centerX-varus1B/2*scale-0.3*scale+0.5*scale+0.1*scale, centerY/7+0.3*scale+0.1*scale+0.1*scale)
		ctx.stroke()
	ctx.beginPath()
		ctx.lineWidth = 4
		ctx.moveTo(-0.05 * scale + centerX+varus1B/2*scale-0.3*scale+0.1*scale, centerY/7+0.3*scale+0.1*scale)
		ctx.lineTo(-0.05 * scale + centerX+varus1B/2*scale-0.3*scale+0.1*scale+0.1*scale, centerY/7+0.3*scale+0.1*scale+0.1*scale)
		ctx.moveTo(-0.05 * scale + centerX+varus1B/2*scale-0.3*scale+0.3*scale, centerY/7+0.3*scale+0.1*scale)
		ctx.lineTo(-0.05 * scale + centerX+varus1B/2*scale-0.3*scale+0.3*scale+0.1*scale, centerY/7+0.3*scale+0.1*scale+0.1*scale)
		ctx.moveTo(-0.05 * scale + centerX+varus1B/2*scale-0.3*scale+0.5*scale, centerY/7+0.3*scale+0.1*scale)
		ctx.lineTo(-0.05 * scale + centerX+varus1B/2*scale-0.3*scale+0.5*scale+0.1*scale, centerY/7+0.3*scale+0.1*scale+0.1*scale)
		ctx.stroke()
// ramalines
	ctx.beginPath()
		ctx.lineWidth = 2.5
		ctx.moveTo(centerX+varus1B/2*scale, centerY/7+0.3*scale)
		ctx.lineTo(centerX+varus1B/2*scale, centerY/7+4*scale)
		ctx.closePath()
		ctx.stroke()
	ctx.beginPath()
		ctx.lineWidth = 2.5
		ctx.moveTo(centerX-varus1B/2*scale, centerY/7+0.3*scale)
		ctx.lineTo(centerX-varus1B/2*scale, centerY/7+4*scale)
		ctx.closePath()
		ctx.stroke()
	ctx.beginPath()
		ctx.lineWidth = 3
		ctx.moveTo(centerX-varus1B/2*scale, centerY/7+4*scale)
		ctx.lineTo(centerX+(varus1B/2)*scale, centerY/7+4*scale)
		ctx.closePath()
		ctx.stroke()
	ctx.beginPath()
		ctx.lineWidth = 3
		ctx.moveTo(centerX-varus1B/2*scale, centerY/7+2*scale)
		ctx.lineTo(centerX+(varus1B/2)*scale, centerY/7+2*scale)
		ctx.closePath()
		ctx.stroke()
	ctx.beginPath()
		ctx.lineWidth = 2
		ctx.moveTo(centerX-varus1B/2*scale, centerY/7+1*scale)
		ctx.lineTo(centerX+(varus1B/2)*scale, centerY/7+1*scale)
		ctx.closePath()
		ctx.stroke()
//size_arrows
	ctx.beginPath()
		ctx.lineWidth = 2
		ctx.moveTo(centerX-varus1B/2*scale, centerY/7+1*scale)
		ctx.lineTo(centerX-varus1B/2*scale+0.1*scale, centerY/7+1*scale+0.1*scale)
		ctx.moveTo(centerX-varus1B/2*scale, centerY/7+1*scale)
		ctx.lineTo(centerX-varus1B/2*scale+0.1*scale, centerY/7+1*scale-0.1*scale)
		ctx.closePath()
		ctx.stroke()
	ctx.beginPath()
		ctx.lineWidth = 2
		ctx.moveTo(centerX+varus1B/2*scale, centerY/7+1*scale)
		ctx.lineTo(centerX+varus1B/2*scale-0.1*scale, centerY/7+1*scale-0.1*scale)
		ctx.moveTo(centerX+varus1B/2*scale, centerY/7+1*scale)
		ctx.lineTo(centerX+varus1B/2*scale-0.1*scale, centerY/7+1*scale+0.1*scale)
		ctx.closePath()
		ctx.stroke()
// 2m
	ctx.beginPath()
		ctx.lineWidth = 2
		ctx.font = 'bold 22px GOST A';
		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
		ctx.fillText(String(varus1B).replaceAll('.', ',')+' м', centerX, centerY/7+1*scale-0.05*scale)
		ctx.stroke()
		ctx.closePath()
		ctx.stroke()
// circles
	ctx.beginPath()
		ctx.arc(centerX-varus1B/2*scale+0.15*scale, centerY/7+0.3*scale, 0.1*scale, 0, 2 * Math.PI, false);
		ctx.fillStyle = "white"
		ctx.fill()
		ctx.lineWidth = 4
		ctx.strokeStyle = 'black';
		ctx.stroke()
	ctx.beginPath()
		ctx.arc(centerX-varus1B/2*scale-0.15*scale, centerY/7+0.3*scale, 0.1*scale, 0, 2 * Math.PI, false);
		ctx.fillStyle = "white"
		ctx.fill()
		ctx.lineWidth = 4
		ctx.strokeStyle = 'black';
		ctx.stroke()
	ctx.beginPath()
		ctx.arc(centerX-varus1B/2*scale, centerY/7, 0.1*scale, 0, 2 * Math.PI, false);
		ctx.fillStyle = "white"
		ctx.fill()
		ctx.lineWidth = 4
		ctx.strokeStyle = 'black';
		ctx.stroke()
	ctx.beginPath()
		ctx.arc(centerX+varus1B/2*scale, centerY/7, 0.1*scale, 0, 2 * Math.PI, false);
		ctx.fillStyle = "white"
		ctx.fill()
		ctx.lineWidth = 4
		ctx.strokeStyle = 'black';
		ctx.stroke()
	ctx.beginPath()
		ctx.arc(centerX-varus1B/2*scale+0.3*scale, centerY/7+0.3*scale, 0, 2 * Math.PI, false);
		ctx.fillStyle = "white"
		ctx.fill()
		ctx.lineWidth = 4
		ctx.strokeStyle = 'black';
		ctx.stroke()
	ctx.beginPath()
		ctx.arc(centerX+varus1B/2*scale, centerY/7+0.3*scale, 0.1*scale, 0, 2 * Math.PI, false);
		ctx.fillStyle = "white"
		ctx.fill()
		ctx.lineWidth = 4
		ctx.strokeStyle = 'black';
		ctx.stroke()
// momentum
	const cx = p2.x;
    const cy = 2 * p2.y - (p1.y + p3.y) / 2;

    // Определяем границы параболы для штриховки
    const minX_m = p1.x;
    const maxX_m = p3.x;
    const minY_m = p2.y; // Вершина параболы (самая верхняя точка в Canvas)
    const maxY_m = p1.y; // Основание (нижняя граница)
    
    const spacingM = 10; // Плотность штриховки для момента




    // ШАГ А: Создаем замкнутый путь для параболы, чтобы сделать clip()
    ctx.beginPath();
    ctx.moveTo(centerX-varus1B/2*scale, centerY/7+4*scale)
    ctx.font = 'bold 22px GOST A';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('M', centerX-varus1B/2*scale-0.2*scale, centerY/7+2*scale)
    ctx.moveTo(p1.x, p1.y);
    ctx.quadraticCurveTo(cx, cy, p3.x, p3.y);
    // ВАЖНО: Замыкаем контур прямой линией обратно к началу, иначе clip не сработает корректно
    
    ctx.font = 'bold 18px GOST A';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(String(Math.ceil(M_max*1000)/1000).replace('.', ',') + 'кНм', centerX, centerY/7+2*scale+M_max/Mscale*scale+0.3*scale)
        

    ctx.lineTo(p1.x, p1.y); 
    ctx.closePath();

    ctx.save(); // Сохраняем текущее состояние
    ctx.clip(); // Теперь всё, что рисуем, будет только ВНУТРИ параболы

    // ШАГ Б: Рисуем вертикальную штриховку внутри параболы
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    
    for (let x = minX_m; x <= maxX_m; x += spacingM) {
        ctx.beginPath();

        ctx.moveTo(x, minY_m); 
        ctx.lineTo(x, maxY_m);
        ctx.stroke();
    }
    
    ctx.restore();

    ctx.lineWidth = 4;
    ctx.strokeStyle = '#000';
    
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.quadraticCurveTo(cx, cy, p3.x, p3.y);

    ctx.stroke();

    ctx.beginPath()
    ctx.arc(centerX, centerY/7+2*scale+M_max/Mscale*scale, 0.02*scale, 0, 2 * Math.PI, false);
        ctx.lineWidth = 4
        ctx.strokeStyle = 'black';
        ctx.stroke()
// big Q power
	ctx.lineWidth = 4;
	ctx.beginPath()
	ctx.moveTo(centerX-varus1B/2*scale, centerY/7+4*scale)
    ctx.font = 'bold 22px GOST A';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('Q', centerX-varus1B/2*scale-0.2*scale, centerY/7+4*scale)

	ctx.lineTo(centerX-varus1B/2*scale, centerY/7+4*scale-biQ/100*scale)
	ctx.lineTo(centerX+varus1B/2*scale, centerY/7+4*scale+biQ/100*scale)
	ctx.lineTo(centerX+varus1B/2*scale, centerY/7+4*scale)
	ctx.closePath()
	ctx.stroke()

	const leftX = centerX - (varus1B / 2) * scale;
	const rightX = centerX + (varus1B / 2) * scale;
	
	const baseY = (centerY/7) + (4 * scale);
	const topLeftY = baseY - (biQ / 100) * scale;
	const bottomRightY = baseY + (biQ / 100) * scale;

	const minX = leftX;
	const maxX = rightX;
	const minY = topLeftY; 
	const maxY = bottomRightY;

	const spacing = 10;
	const strokeColor = '#000';
	const lineWidth = 1;

	ctx.beginPath();
	ctx.moveTo(leftX, baseY);              
	ctx.lineTo(leftX, topLeftY);           
	ctx.lineTo(rightX, bottomRightY);      
	ctx.lineTo(rightX, baseY);             
	ctx.closePath();

    ctx.save()
	ctx.clip();

	ctx.strokeStyle = strokeColor;
	ctx.lineWidth = lineWidth;

	for (let x = minX; x <= maxX; x += spacing) {
	    ctx.beginPath();
	    ctx.moveTo(x, minY); 
	    ctx.lineTo(x, maxY);
	    ctx.stroke();
	}

	ctx.restore();

	ctx.lineWidth = 4;
	ctx.strokeStyle = '#000';
	ctx.fillStyle = 'transparent';

	ctx.beginPath();
	ctx.moveTo(leftX, baseY);
	ctx.lineTo(leftX, topLeftY);
	ctx.lineTo(rightX, bottomRightY);
	ctx.lineTo(rightX, baseY);
	ctx.closePath();
	ctx.stroke();

    ctx.beginPath()
    ctx.font = 'bold 18px GOST A';
    ctx.fillStyle = 'black';
    ctx.fillText(String('+'+Math.ceil(biQ*1000)/1000).replace('.',',')+'кН', centerX-varus1B/2*scale + 0.5*scale, centerY/7+4*scale-(biQ/100)*scale - 0.1*scale)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.font = 'bold 18px GOST A';
    ctx.fillStyle = 'black';
    ctx.fillText(String('-'+Math.ceil(biQ*1000)/1000).replace('.',',')+'кН', centerX+varus1B/2*scale - 0.5*scale, centerY/7+4*scale+(biQ/100)*scale + 0.3*scale)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(centerX+varus1B/2*scale, centerY/7+4*scale+(biQ/100)*scale, 0.02*scale, 0, 2 * Math.PI, false);
        ctx.lineWidth = 4
        ctx.strokeStyle = 'black';
        ctx.stroke()
    ctx.beginPath()
    ctx.arc(centerX-varus1B/2*scale, centerY/7+4*scale-(biQ/100)*scale, 0.02*scale, 0, 2 * Math.PI, false);
        ctx.lineWidth = 4
        ctx.strokeStyle = 'black';
        ctx.stroke()
}

document.getElementById('epuring').addEventListener("click", () => {
    generateRoofEpure()})

function pushRoofEpure() {
    dataUrl = canvas.toDataURL("image/png");
    snapshot = dataURLtoUint8Array(dataUrl).data;
}

let Wneed = mFormula(
    // σ = M_max / W  ≤  R_y · γ_c
    mText('σ'), mEq(),
    mFrac(mSub('M', 'max'), mText('W')),
    ' ≤ ',
    mGroup(mSub('R', 'y'), mMul(), mSub('γ', 'c')),

    // ⇒ W_тр = M_max / (R_y · γ_c)
    mText(' ⇒ '),
    mSub('W', 'тр'), mEq(),
    mFrac(
        mSub('M', 'max'),
        mGroup(mSub('R', 'y'), mMul(), mSub('γ', 'c'))
    ),
    // = (36,7717 · 100) / 24 = 153,215 см³
    mEq(),
    mFrac(
        mGroup(String(Math.ceil(M_max*1000)/1000).replace('.',',')),
        '0,24'
    ),
    mEq(),
    String(Math.ceil(M_max/0.24*1000)/1000).replace('.',','), mSup('см', '3')
);
let roof_beamchey = selectBeamByWx(Math.ceil(M_max/0.24*1000)/1000);
let beam_roof_parameters = mFormula(
    mSub('I', 'x'), mEq(), String(roof_beamchey.Ix).replace('.',','), mText(' '), mSup('см', '4'),
    mText('; '), 
    mSub('S', 'x'), mEq(), String(roof_beamchey.Sx).replace('.',','), mText(' '), mSup('см', '3'),
    mText('; '),
    mText('Масса на 1м'), mEq(), String(roof_beamchey.weight).replace('.',','), mText(' кг')
);
let roof_power_check =  mFormula(
    mText('σ'), mEq(),
    mFrac(
        mSub('M', 'max'),
        mText('W')
    ),
    ' ≤ ',
    mGroup(mSub('R', 'y'), mMul(), mSub('γ', 'c'))
);
let roof_power_check_сalc = mFormula(
    mFrac(
        mSub('M', 'max'),
        mSub('W', 'x')
    ),
    mEq(), 
    mFrac(
        mGroup(String(Math.ceil(M_max*1000)/1000).replace('.',','), mMul(), '100'),
        (String(Math.ceil(roof_beamchey.Wx*1000)/1000).replace('.',','))
    ),
    mEq(), 
    String(Math.ceil(M_max*100/roof_beamchey.Wx*1000)/1000).replace('.',','), 
    mText(' '),
    mFrac(
        'кН',
        mGroup(mSup('см', '2'))
    )
);
let roof_power_check_end = mFormula(
    String(Math.ceil(M_max*100/roof_beamchey.Wx*1000)/1000).replace('.',','),
    mText(' '), // Пробел перед единицами
    mFrac('кН', mSup('см', '2')), // Дробь кН/см²
    
    ' < ',      // Знак неравенства
    
    '24',
    mText(' '),
    mFrac('кН', mSup('см', '2'))  // Та же дробь кН/см²
);
let roof_tau_check = mFormula(
    mSub('τ', 'max'), mEq(),
    mFrac(mGroup(mSub('Q', 'max'), mMul(), mSub('S', 'x')), mGroup(mSub('I', 'x'), mMul(), 't')),
    ' ≤ ',
    mGroup(mSub('R', 's'), mMul(), mSub('γ', 'c')),
    mText(' (где '), mSub('R', 's'), mEq(), '0,58', mMul(), mSub('R', 'y'), mText(')')
);

let tau_max_roof = (biQ*roof_beamchey.Sx)/(roof_beamchey.Ix*roof_beamchey.t/10)
let roof_tau_check_calc = mFormula(
    mSub('τ', 'max'), mEq(),
    mFrac(
        mGroup(mSub('Q', 'max'), mMul(), mSub('S', 'x')),
        mGroup(mSub('I', 'x'), mMul(), 't')
    ),
    mEq(),
    mFrac(
        mGroup(String(Math.ceil(biQ*1000)/1000).replace('.',','), mMul(), String(Math.ceil(roof_beamchey.Sx*1000)/1000).replace('.',',')),
        mGroup(String(Math.ceil(roof_beamchey.Ix*1000)/1000).replace('.',','), mMul(), String(Math.ceil(roof_beamchey.t/10*1000)/1000).replace('.',','))
    ),
    mEq(),
    String(Math.ceil(tau_max_roof*1000)/1000).replace('.',','), 
    mText(' '), 
    mFrac('кН', mSup('см', '2')));
let roof_tau_check_unequ1 = mFormula(
    String(Math.ceil(tau_max_roof*1000)/1000).replace('.',','),
    mText(' '),
    mFrac('кН', mSup('см', '2')),
    ' ≤ ',
    '0,58',
    mMul(),
    '24',
    mText(' '),
    mFrac('кН', mSup('см', '2')));
let roof_tau_check_unequ2 = mFormula(
    String(Math.ceil(tau_max_roof*1000)/1000).replace('.',','),
    mText(' '),
    mFrac('кН', mSup('см', '2')),
    ' ≤ ',
    '13,92',
    mText(' '),
    mFrac('кН', mSup('см', '2')));
let roof_deflection_formula = mFormula(
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

    mSquareParen(mFrac('f', 'l')),);
let roof_deflection_answ = (5/384)*((q_normal)*(10**(-2))*((varus1B*100)**3))/(2.06*(10**4)*roof_beamchey.Ix)
let roof_deflection_calc = mFormula(
    mFrac('5', '384'),
    mMul(),
    mFrac(
        mGroup(
            String(Math.ceil(q_normal*1000)/1000).replace('.',','),
            mText('·'), 
            mSup('10','-2'),
            mText('·'),
            mGroup(mSup(String(Math.ceil(varus1B*100*1000)/1000).replace('.',','),'3'))
        ),
        mGroup(
            '2,06', mText('·'),  mSup('10','4'), // 2,06·10^4
            mText('·'),
            String(Math.ceil(roof_beamchey.Ix*1000)/1000).replace('.',',')
        )
    ),
    mEq(),
    String(Math.ceil(roof_deflection_answ*100000)/100000).replace('.',','),
    ' < ',
    '0,0066');

function createRoofEpure() {
    roofBeamChildren.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
                line: 360, // Полуторный интервал для ВСЕГО документа
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: 'Определение требуемого момента сопротивления балки настила:', bold: true
                }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                Wneed, 
                new TextRun({
                    text: ' '
                })
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: 'Согласно ГОСТ 8239-89 выбирается двутавр №' + roof_beamchey.number + '  '
                }),
                mFormula(
                    mParen(mSub('W', 'x'), mEq(),
                    String(Math.ceil(roof_beamchey.Wx*1000)/1000).replace('.',','), mSup('см', '3'))
                ),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                beam_roof_parameters, 
                new TextRun({
                    text: '.'
                })
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
                new TextRun({
                    text: 'Для определения фактических напряжений, возникающих в балке настила, применяются действительные геометрические характеристики:'
                })
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
                line: 360, // Полуторный интервал для ВСЕГО документа
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: 'Проверка прочности по нормальным напряжениям:', bold: true
                }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                roof_power_check, 
                new TextRun({
                    text: ' '
                })
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                roof_power_check_сalc, 
                new TextRun({
                    text: ' '
                })
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                roof_power_check_end,
                new TextRun({
                    text: ' '
                })
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    underline: true,
                    text: 'Условие прочности по нормальным напряжениям выполняется.'
                }),
                new PageBreak(),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
                line: 360, // Полуторный интервал для ВСЕГО документа
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: 'Проверка прочности по касательным напряжениям:', bold: true
                }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                roof_tau_check, 
                new TextRun({
                    text: ' '
                })
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: 'Толщина стенки двутавра t ='+String(Math.ceil(roof_beamchey.t*1000)/1000).replace('.',',')+'мм.'
                })
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                roof_tau_check_calc, 
                new TextRun({
                    text: ' '
                })
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                roof_tau_check_unequ1, 
                new TextRun({
                    text: ' '
                })
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                roof_tau_check_unequ2, 
                new TextRun({
                    text: ' '
                })
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    underline: true,
                    text: 'Условие прочности по касательным напряжениям выполняется.'
                }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
                line: 360, // Полуторный интервал для ВСЕГО документа
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: 'Проверка жесткости балки:', bold: true
                }),
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                roof_deflection_formula, 
                new TextRun({
                    text: ' '
                })
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
                mFormula(mSub('q','н')),
                new TextRun(" — нормативная погонная нагрузка,")
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
                mFormula(mSub('l','бн')),
                new TextRun(" — пролёт балки настила,")
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
                mFormula(mSub('I','x')),
                new TextRun(" — момент инерции сечения балки настила,")
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
                firstLine: 709,
            },
            children: [
                new TextRun("Предельный относительный прогиб балки настила принят равным 1/150 в соответствии с эстетико-психологическими требованиями.")
            ]
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                roof_deflection_calc, 
            ]
        }),
    )
    if (roof_deflection_answ > (1/150)) {
        roofBeamChildren.push(
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: {
                    line: 360,
                    before: 0,
                    after: 0,
                },
                children: [
                    new TextRun({
                        underline: true,
                        text: 'Необходимо увеличить сечение.'
                    }),
                    new PageBreak()
                ]
            })
        )
        roof_beamchey = selectBeamByWx(roof_beamchey.Wx+0.1)
        roof_deflection_answ = (5/384)*((q_normal)*(10**(-2))*((varus1B*100)**3))/(2.06*(10**4)*roof_beamchey.Ix)
        roof_deflection_calc = mFormula(
            mFrac('5', '384'),
            mMul(),
            mFrac(
                mGroup(
                    String(Math.ceil(q_normal*1000)/1000).replace('.',','),
                    mText('·'), 
                    mSup('10','-2'),
                    mText('·'),
                    mGroup(mSup(String(Math.ceil(varus1B*100*1000)/1000).replace('.',','),'3'))
                ),
                mGroup(
                    '2,06', mText('·'),  mSup('10','4'), // 2,06·10^4
                    mText('·'),
                    String(Math.ceil(roof_beamchey.Ix*1000)/1000).replace('.',',')
                )
            ),
            mEq(),
            String(Math.ceil(roof_deflection_answ*100000)/100000).replace('.',','),
            ' < ',
            '0,0066'
        )
        createRoofEpure()
    } else {
        roofBeamChildren.push(
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: {
                    line: 360,
                    before: 0,
                    after: 0,
                },
                children: [
                    new TextRun({
                        underline: true,
                        text: 'Условие жесткости выполняется.'
                    }),
                    new PageBreak
                ]
            })
        )
        
    }
}

function generateRoofEpure() {
    pushRoofEpure()
    roofBeamChildren.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new ImageRun({
                    data: snapshot,
                    transformation: {
                        width:  550, // Ширина в пикселях в документе
                        height: 450, // Высота в пикселях в документе
                    },
                    size: 28,
                }),
            ],
        })
    )
    roofBeamChildren.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
                line: 360, // Полуторный интервал для ВСЕГО документа
                before: 0,
                after: 0,
            },
            children: [
                new TextRun({
                    text: 'Рис.4 - Расчетная схема балки настила'
                }),
            ]
        }),
        new Paragraph({}),
    )
    createRoofEpure()
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
                children: roofBeamChildren
            },
        ],
    });
    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "Roof_epure.docx");
    });
    roofBeamChildren = []
}
