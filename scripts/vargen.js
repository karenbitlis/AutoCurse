let A = 5
let B = 10
let kratnoA = []
let kratnoB = []

let a = 100*A
let b = 100*B
let aVar
let bVar
let dist
let vargenChildren = []

const eps = 1e-7
const allButtons = document.querySelectorAll('button, input[type="submit"], input[type="button"], input[type="reset"]');

let zoom = 0
let scale = 10
let move = 0
let pos = 0

const docxLib = window.docx;
const { Document, Packer, Paragraph, ImageRun, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, PageBreak, textParagraphs } = docxLib;

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

function generateVariant() {
	for (var i = 1; i < a; i++) {
		if (A % (i/100) == 0 || Math.abs((i/100) - (A % (i/100))) <= eps) {
			if (i/100 >= 0.6 && i/100 <= 1.6) {
				kratnoA.push(i/100)
			}
		}
	}
	for (var g = 1; g < b; g++) {
		if (B % (g/100) == 0 || Math.abs((g/100) - (B % (g/100))) <= eps) {
			if (g/100 >= 2 && g/100 < 5) {
				kratnoB.push(g/100)
			}
		}
	}
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ctnr = document.getElementById("canvas-container");

const cssWidth = ctnr.offsetWidth-8;
const cssHeight = 300;
const dpi = 10;

canvas.width = cssWidth * dpi;
canvas.height = cssHeight * dpi;

canvas.style.width = cssWidth + "px";
canvas.style.height = cssHeight + "px";

ctx.scale(dpi, dpi);

let but = document.getElementById('varGen')
let clear = document.getElementById('varDel')
let load1 = document.getElementById('varLoad1')
let load = document.getElementById('varLoad')
let zoomo1 = document.getElementById('varZoom1')
let zoomo2 = document.getElementById('varZoom2')
let zoomo3 = document.getElementById('varZoom3')

// printVar()
drawVar()

function printVar() {
	generateVariant()

	let variant1A = kratnoA[Math.floor(Math.random() * kratnoA.length)]
	let variant1B = kratnoB[Math.floor(Math.random() * kratnoB.length)]
	
	let variant2A = kratnoA[Math.floor(Math.random() * kratnoA.length)]
	let variant2B = kratnoB[Math.floor(Math.random() * kratnoB.length)]
	
	while (variant1A == variant2A && variant1B == variant2B) {
		variant2A = kratnoA[Math.floor(Math.random() * kratnoA.length)]
		variant2B = kratnoB[Math.floor(Math.random() * kratnoB.length)]
	}
	
	let variant3A = kratnoA[Math.floor(Math.random() * kratnoA.length)]
	let variant3B = kratnoB[Math.floor(Math.random() * kratnoB.length)]
	
	while ((variant3A == variant2A && variant3B == variant2B) || (variant3A == variant1A && variant3B == variant1B)) {
		variant3A = kratnoA[Math.floor(Math.random() * kratnoA.length)]
		variant3B = kratnoB[Math.floor(Math.random() * kratnoB.length)]
	}
	
	document.getElementById('variant1A').value = variant1A
	document.getElementById('variant1B').value = variant1B
	document.getElementById('variant2A').value = variant2A
	document.getElementById('variant2B').value = variant2B
	document.getElementById('variant3A').value = variant3A
	document.getElementById('variant3B').value = variant3B

	variant1A = parseFloat(variant1A) 
	variant1B = parseFloat(variant1B)
	variant2A = parseFloat(variant2A)
	variant2B = parseFloat(variant2B)
	variant3A = parseFloat(variant3A)
	variant3B = parseFloat(variant3B)

	drawVar()
	zoomo1.innerHTML = 'Зум В1'
	zoomo1.style.backgroundColor = '#3498db'
	zoomo3.innerHTML = 'Зум В3'
	zoomo3.style.backgroundColor = '#3498db'
	if (zoom == 1) {
		pos = 2
		zoomo2.innerHTML = 'Анзум'
		zoomo2.style.backgroundColor = 'green'
	}
}
function delVar() {
	variant1A = ''
	variant1B = ''
	variant2A = ''
	variant2B = ''
	variant3A = ''
	variant3B = ''
	document.getElementById('variant1A').value = variant1A
	document.getElementById('variant1B').value = variant1B
	document.getElementById('variant2A').value = variant2A
	document.getElementById('variant2B').value = variant2B
	document.getElementById('variant3A').value = variant3A
	document.getElementById('variant3B').value = variant3B
	drawVar()
}
function drawEveryVar(num) {
	ctx.shadowColor = 'transparent';
	ctx.strokeStyle = 'black';
	variant1A = parseFloat(document.getElementById('variant1A').value) 
	variant1B = parseFloat(document.getElementById('variant1B').value)
	variant2A = parseFloat(document.getElementById('variant2A').value)
	variant2B = parseFloat(document.getElementById('variant2B').value)
	variant3A = parseFloat(document.getElementById('variant3A').value)
	variant3B = parseFloat(document.getElementById('variant3B').value)

	
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
	}
}
function drawVar() {
	ctx.fillStyle = "white"
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = "black"
	drawEveryVar(1)
	drawEveryVar(2)
	drawEveryVar(3)
}
function moving1() {
	if (move < 3*B*scale/2) {
		move += 3*B*scale/2/15
	} else {
		move = 0
		allButtons.forEach(button => {
			button.disabled = false;
		});
		return
	}
	drawVar()
	requestAnimationFrame(moving1)
}
function moving3() {
	if (move > -3*B*scale/2) {
		move -= 3*B*scale/2/15
	} else {
		move = 0
		allButtons.forEach(button => {
    		button.disabled = false;
		});
		return
	}
	drawVar()
	requestAnimationFrame(moving3)
}
function movingBig3() {
	if (move > -3*B*scale/2) {
		move -= 3*B*scale/2/15
	} else {
		move = 0
		allButtons.forEach(button => {
    		button.disabled = false;
		});
		return
	}
	drawVar()
	requestAnimationFrame(moving3)
}
function zooming1() {
	if (zoom == 0) {
		if (scale != 35){
			scale += 0.5
			drawVar()
		} else {
			zoom = 1
			drawVar()
			return moving1()
		}
	requestAnimationFrame(zooming1)
	} else {
		smalling()
		return
	}
}
function zooming2() {
	if (zoom == 0) {
		if (scale != 35){
			scale += 0.5
			drawVar()
		} else {
			zoom = 1
			drawVar()
			allButtons.forEach(button => {
    			button.disabled = false;
			});
			return
		}
	requestAnimationFrame(zooming2)
	} else {
		smalling()
		return
	}
}
function zooming3() {
	if (zoom == 0) {
		if (scale != 35){
			scale += 0.5
			drawVar()
		} else {
			zoom = 1
			drawVar()
			return moving3()
		}
	requestAnimationFrame(zooming3)
	} else {
		smalling()
		return
	}
}
function smalling() {
	zoomo1.innerHTML = 'Зум В1'
	zoomo1.style.backgroundColor = '#3498db'
	zoomo2.innerHTML = 'Зум В2'
	zoomo2.style.backgroundColor = '#3498db'
	zoomo3.innerHTML = 'Зум В3'
	zoomo3.style.backgroundColor = '#3498db'
	drawVar()
	zoom = 0
	if (scale != 10){
		scale -= 0.5
		drawVar()
	} else {
		pos = 0
		zoom = 0
		allButtons.forEach(button => {
    		button.disabled = false;
		});
		return
	}
	requestAnimationFrame(smalling)
}

but.addEventListener("click", () => { printVar() })

clear.addEventListener("click", () => {
	delVar()
})

load1.addEventListener("click", () => {
	exportCanvas()
})

zoomo1.addEventListener("click", () => {
	allButtons.forEach(button => {
    	button.disabled = true;});
	zoomo2.innerHTML = 'Зум В2'
	zoomo2.style.backgroundColor = '#3498db'
	zoomo3.innerHTML = 'Зум В3'
	zoomo3.style.backgroundColor = '#3498db'
	if (pos == 1) {
		pos = 0
		zoomo1.innerHTML = 'Зум В1'
		zoomo1.style.backgroundColor = '#3498db'
		zooming1()
	} else if (pos == 2) {
		pos = 1
		zoomo1.style.backgroundColor = 'green'
		zoomo1.innerHTML = 'Анзум'
		moving1()
	} else if (pos == 3) {
		pos = 1
		zoomo1.style.backgroundColor = 'green'
		zoomo1.innerHTML = 'Анзум'
		move = -3*B*scale/2
		moving1()
	} else {
		pos = 1
		zoomo1.style.backgroundColor = 'green'
		zoomo1.innerHTML = 'Анзум'
		zooming1()
	}	
})

zoomo2.addEventListener("click", () => {
	allButtons.forEach(button => {
    	button.disabled = true;});
	zoomo1.innerHTML = 'Зум В1'
	zoomo1.style.backgroundColor = '#3498db'
	zoomo3.innerHTML = 'Зум В3'
	zoomo3.style.backgroundColor = '#3498db'
	if (pos == 2) {
		pos = 0
		zoomo2.innerHTML = 'Зум В2'
		zoomo2.style.backgroundColor = '#3498db'
		zooming2()
	} else if (pos == 1) {
		pos = 2
		zoomo2.style.backgroundColor = 'green'
		zoomo2.innerHTML = 'Анзум'
		moving3()
	} else if (pos == 3) {
		pos = 2
		zoomo2.style.backgroundColor = 'green'
		zoomo2.innerHTML = 'Анзум'
		moving1()
	} else {
		pos = 2
		zoomo2.style.backgroundColor = 'green'
		zoomo2.innerHTML = 'Анзум'
		zooming2()
	}
})

zoomo3.addEventListener("click", () => {
	allButtons.forEach(button => {
    	button.disabled = true;});
	zoomo1.innerHTML = 'Зум В1'
	zoomo1.style.backgroundColor = '#3498db'
	zoomo2.innerHTML = 'Зум В2'
	zoomo2.style.backgroundColor = '#3498db'
	if (pos == 3) {
		pos = 0
		zoomo3.innerHTML = 'Зум В3'
		zoomo3.style.backgroundColor = '#3498db'
		zooming3()
	} else if (pos == 1) {
		pos = 3
		zoomo3.style.backgroundColor = 'green'
		zoomo3.innerHTML = 'Анзум'
		move = 3*B*scale/2
		moving3()
	} else if (pos == 2) {
		pos = 3
		zoomo3.style.backgroundColor = 'green'
		zoomo3.innerHTML = 'Анзум'
		moving3()
	} else {
		pos = 3
		zoomo3.style.backgroundColor = 'green'
		zoomo3.innerHTML = 'Анзум'
		zooming3()
	}
})

function exportCanvas() {
	const a = document.createElement("a");
	a.href = canvas.toDataURL("image/jpg");
	a.download = "canvas.jpg";
	a.click();
}

document.addEventListener('input', (event) => {
	smalling()
	drawVar()
});

let dataUrl = canvas.toDataURL("image/png");
let { data } = dataURLtoUint8Array(dataUrl);
let snapshots = []
function pushScreen(nom) {
	dataUrl = canvas.toDataURL("image/png");
	vargenChildren.push(
		new Paragraph({
			alignment: AlignmentType.CENTER,
			children: [
				new TextRun({
					text: "Вариант " + nom, font: "Times New Roman", size: 28 
				}),
			]
		}),
		new Paragraph({
			alignment: AlignmentType.CENTER,
			children: [
				new ImageRun({
					data: snapshots[nom-1],
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

function createVargen() {
	// `При проектировании балочной клетки задача сводится к тому, чтобы путем технико-экономического сравнения различных вариантов найти наиболее экономичную конструкцию балочной клетки по расходу материала на 1 м2 площади перекрытия. Учитывая, что наибольший расход стали в балочных клетках идет на стальной настил, толщина которого зависит от расстояния между балками настила, следует стремиться к такому расположению балок настила, а также вспомогательных балок, чтобы суммарный расход стали этих конструкций на 1 м2 площади перекрытия был наименьшим. С этой целью следует составить два-три варианта расположения вспомогательных балок и балок настила. После статического конструктивного расчетов настила и балок для всех вариантов производят их сравнение по расходу стали на квадратный метр площади перекрытия балочной клетки и количеству монтажных единиц.`
	snapshots = []
	vargenChildren = []
	vargenChildren.push(
		new Paragraph({
			alignment: AlignmentType.CENTER,
			spacing: {
				line: 360, // Полуторный интервал для ВСЕГО документа
				before: 0,
				after: 0,
			},
			children: [
				new TextRun({
					text: "1. Выбор варианта ячеек балочной клетки", bold: true, font: "Times New Roman", size: 28 
				}),
			]
		}),
		new Paragraph({size: 28, bold: false}),
	)
	allButtons.forEach(button => {
	button.disabled = true;});
	zoomo1.innerHTML = 'Анзум'
	zoomo1.style.backgroundColor = 'green'
	zoomo2.innerHTML = 'Зум В2'
	zoomo2.style.backgroundColor = '#3498db'
	zoomo3.innerHTML = 'Зум В3'
	zoomo3.style.backgroundColor = '#3498db'
	pos = 1
	zoom = 1
	scale = 35
	move = 3*B*scale/2
	drawVar()
	dataUrl = canvas.toDataURL("image/png");
	snapshots.push(dataURLtoUint8Array(dataUrl).data); 
	pushScreen(1)
	zoomo1.innerHTML = 'Зум В1'
	zoomo1.style.backgroundColor = '#3498db'
	zoomo2.innerHTML = 'Анзум'
	zoomo2.style.backgroundColor = 'green'
	zoomo3.innerHTML = 'Зум В3'
	zoomo3.style.backgroundColor = '#3498db'
	pos = 2
	zoom = 1
	scale = 35
	move = 0
	drawVar()
	dataUrl = canvas.toDataURL("image/png");
	snapshots.push(dataURLtoUint8Array(dataUrl).data); 
	pushScreen(2)
	zoomo1.innerHTML = 'Зум В1'
	zoomo1.style.backgroundColor = '#3498db'
	zoomo2.innerHTML = 'Зум В2'
	zoomo2.style.backgroundColor = '#3498db'
	zoomo3.innerHTML = 'Анзум'
	zoomo3.style.backgroundColor = 'green'
	pos = 3
	zoom = 1
	scale = 35
	move = -3*B*scale/2
	drawVar()
	dataUrl = canvas.toDataURL("image/png");
	snapshots.push(dataURLtoUint8Array(dataUrl).data); 
	pushScreen(3)
	vargenChildren.push(
		new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 60 },
            children: [new PageBreak()]
        }),
	)
	move = 0

	smalling()
}

function exportCanvasToDocx() {
	createVargen()
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
				children: vargenChildren
			},
		],
	});
	Packer.toBlob(doc).then((blob) => {
		saveAs(blob, "canvas-screenshot.docx");
	});
}

load.addEventListener("click", () => {
	exportCanvasToDocx()
})
