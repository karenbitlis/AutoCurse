// let roofChildren = [];

// let dataInB = {
//     taskNum: init.shadowRoot.getElementById('taskNum').value,
//     paramL: init.shadowRoot.getElementById('paramL').value,
//     param_l: init.shadowRoot.getElementById('param_l').value,
//     paramH: init.shadowRoot.getElementById('paramH').value,
//     payload: init.shadowRoot.getElementById('payload').value,
//     concrete: init.shadowRoot.getElementById('concrete').value,
//     columns: init.shadowRoot.getElementById('columns').value,
//     joints: init.shadowRoot.getElementById('joints').value,
//     floorType: init.shadowRoot.getElementById('floorType').value,
//     note: init.shadowRoot.getElementById('note').value
// };
// let RoofBeamTable;
// let deck_thickness = 14;
// let varus1A = 1;

// let usefullLoad = parseFloat(dataInB.payload);
// let roofType = parseFloat(dataInB.floorType);

// let deck_load = 7850 * deck_thickness / 1000 * 10 / 1000;
// let deck_load_real = deck_load * 1.05;
// let mainest_beam = usefullLoad * 1.05 + 1.33 * 1.3 + deck_load_real;
// let mainest_beam2 = (usefullLoad * 1.05) + (0.7 * 1.3) + deck_load_real;
// let maine_beam = usefullLoad + 1.33 + deck_load;
// let maine_beam2 = usefullLoad + 0.7 + deck_load;

// let maine, mainest;

// let qe_calculation 

// let q_liner 
// let q_real_linear
// let ry_equation

// const roof_beam1 = document.getElementById('roof-beam1')
// const rbCanvas = roof_beam1.shadowRoot.getElementById("canvasRoof");
// const rbCtx = rbCanvas.getContext("2d");
// const rbCtnr = roof_beam1.shadowRoot.getElementById("canvas-containerRoof");

// const rbCssWidth = rbCtnr.offsetWidth - 8;
// const rbCssHeight = 340;
// const rbDpi = 10;

// rbCanvas.width = rbCssWidth * rbDpi;
// rbCanvas.height = rbCssHeight * rbDpi;

// rbCanvas.style.width = rbCssWidth + "px";
// rbCanvas.style.height = rbCssHeight + "px";

// rbCtx.scale(rbDpi, rbDpi);

// let rbZoom = 1
// let rbA = dataIn.param_l
// let rbB = dataIn.paramL
// let rbScale = 35
// const rbMove = 3 * rbB * rbScale / 2;

// const tableBorders = {
//     top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
//     bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
//     left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
//     right: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
//     insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
//     insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
// };

// function createCell(textContent, alignment = AlignmentType.CENTER, columnSpan = 1) {
//     const children = Array.isArray(textContent) 
//         ? textContent.map(t => new Paragraph({ children: [t], alignment }))
//         : [new Paragraph({ text: textContent, alignment })];

//     return new TableCell({
//         children: children,
//         columnSpan: columnSpan,
//         margins: { top: 100, bottom: 100, left: 150, right: 150 },
//     });
// }

// const oMath = new XmlComponent("m:oMath");
// oMath.root.push(createMathSub("q", "n"));
// oMath.root.push(createMathRun(", "));
// const numerator = createMathRun("кН");
// const denominator = createMathSup("м", "2");
// const fraction = createMathFraction(numerator, denominator);
// oMath.root.push(fraction);

// const oMatho = new XmlComponent("m:oMath");
// oMatho.root.push(createMathRun("q"));
// oMatho.root.push(createMathRun(", "));
// oMatho.root.push(fraction);

// const gammaF = new XmlComponent("m:oMath");
// gammaF.root.push(createMathSub("γ", "f"));

// function createMathRun(text) {
//     const r = new XmlComponent("m:r");
//     const t = new XmlComponent("m:t");
//     t.root.push(text);
//     r.root.push(t);
//     return r;
// }
// function createMathSup(baseText, supText) {
//     const sSup = new XmlComponent("m:sSup");
//     const e = new XmlComponent("m:e");
//     const j = new XmlComponent("m:sup");
//     e.root.push(createMathRun(baseText));
//     j.root.push(createMathRun(supText));
//     sSup.root.push(e);
//     sSup.root.push(j);
//     return sSup;
// }
// function createMathSub(baseText, subText) {
//     const sSub = new XmlComponent("m:sSub");
//     const e = new XmlComponent("m:e");
//     const sub = new XmlComponent("m:sub");
//     e.root.push(createMathRun(baseText));
//     sub.root.push(createMathRun(subText));
//     sSub.root.push(e);
//     sSub.root.push(sub);
//     return sSub;
// }
// function createMathFraction(numComponent, denComponent) {
//     const f = new XmlComponent("m:f");
//     const num = new XmlComponent("m:num");
//     const den = new XmlComponent("m:den");
//     num.root.push(numComponent);
//     den.root.push(denComponent);
//     f.root.push(num);
//     f.root.push(den);
//     return f;
// }

// function rBcounting() {
//     dataInB = {
//         taskNum: init.shadowRoot.getElementById('taskNum').value,
//         paramL: init.shadowRoot.getElementById('paramL').value,
//         param_l: init.shadowRoot.getElementById('param_l').value,
//         paramH: init.shadowRoot.getElementById('paramH').value,
//         payload: init.shadowRoot.getElementById('payload').value,
//         concrete: init.shadowRoot.getElementById('concrete').value,
//         columns: init.shadowRoot.getElementById('columns').value,
//         joints: init.shadowRoot.getElementById('joints').value,
//         floorType: init.shadowRoot.getElementById('floorType').value,
//         note: init.shadowRoot.getElementById('note').value
//     };

//     usefullLoad = parseFloat(dataInB.payload);
//     roofType = parseFloat(dataInB.floorType);

//     deck_load = 7850 * deck_thickness / 1000 * 10 / 1000;
//     deck_load_real = deck_load * 1.05;
//     mainest_beam = usefullLoad * 1.05 + 1.33 * 1.3 + deck_load_real;
//     mainest_beam2 = (usefullLoad * 1.05) + (0.7 * 1.3) + deck_load_real;
//     maine_beam = usefullLoad + 1.33 + deck_load;
//     maine_beam2 = usefullLoad + 0.7 + deck_load;
    
//     deck_load = Math.ceil(deck_load * 1000) / 1000;
//     deck_load_real = Math.ceil(deck_load * 1000 * 1.05) / 1000; 
//     mainest_beam = Math.ceil(mainest_beam * 1000) / 1000;
//     mainest_beam2 = Math.ceil(mainest_beam2 * 1000) / 1000;
//     maine_beam = Math.ceil(maine_beam * 1000) / 1000;
//     maine_beam2 = Math.ceil(maine_beam2 * 1000) / 1000;

//     qe_calculation = mFormula(
//         mSup(mSub("g", "ст.н"), "н"),
//         mEq(),
//         mFrac(mGroup(mSub("ρ", "ст"), mSub("t", "н"), mMul(), "10"), "1000"),
//         mEq(),
//         mFrac(mGroup("7850", mMul(), String(deck_thickness / 1000).replace('.', ','), mMul(), "10"), "1000"),
//         mEq(),
//         String(deck_load).replace('.', ','),
//         mFrac("кН", mSup("м", "2"))
//     );
    
//     if (roofType == 1) {
//         maine = maine_beam;
//         mainest = mainest_beam;
//     } else if (roofType == 2) {
//         maine = maine_beam2;
//         mainest = mainest_beam2;
//     }
    
//     q_liner = mFormula(
//         mSup("q", "н"),
//         mEq(),
//         mGroup(mSub("g", "н"), mMul(), "a"),
//         mEq(),
//         mGroup(String(maine).replace('.', ','), mMul(), String(varus1A).replace('.', ',')),
//         mEq(),
//         String(maine * varus1A).replace('.', ','),
//         mFrac("кН", "м")
//     );
    
//     q_real_linear = mFormula(
//         "q",
//         mEq(),
//         mGroup("g", mMul(), "a"),
//         mEq(),
//         mGroup(String(mainest).replace('.', ','), mMul(), String(varus1A).replace('.', ',')),
//         mEq(),
//         String(mainest * varus1A).replace('.', ','),
//         mFrac("кН", "м")
//     );
    
//     ry_equation = mFormula(
//         mSub("R", "y"),
//         mEq(),
//         "240",
//         mFrac("Н", mSup("мм", "2")),
//         mEq(),
//         "24",
//         mFrac("кН", mSup("см", "2"))
//     );
//     roof_beam1.shadowRoot.getElementById('roof_beam').innerText = 'Расчетная нагрузка на балку настила составляет ' + String(mainest * varus1A).replace('.', ',') + ' кН/м.';

// }

// function getTheRoof() {
//     rBcounting()
//     if (roofType == 1) {
//         floorTable = new Table({
//             borders: tableBorders,
//             width: { size: 100, type: WidthType.PERCENTAGE },
//             columnWidths: [8, 42, 16, 16, 18], 
//             rows: [
//                 new TableRow({
//                     tableHeader: true,
//                     children: [
//                         createCell("№ п.п"),
//                         createCell("Вид нагрузки", AlignmentType.LEFT),
//                         createCell([new TextRun({ children: [oMath] })]),
//                         createCell([new TextRun({ children: [gammaF] })]),
//                         createCell([new TextRun({ children: [oMatho] })]),
//                     ],
//                 }),
//                 new TableRow({ children: [createCell("1"), createCell("Металлоцементный раствор 30мм", AlignmentType.LEFT), createCell("0,75"), createCell("1,3"), createCell("0,975")] }),
//                 new TableRow({ children: [createCell("2"), createCell("Гидроизоляция два слоя рубероида на мастике", AlignmentType.LEFT), createCell("0,1"), createCell("1,3"), createCell("0,13")] }),
//                 new TableRow({ children: [createCell("3"), createCell("Теплоизоляция-шлакобетон 40мм", AlignmentType.LEFT), createCell("0,48"), createCell("1,3"), createCell("0,624")] }),
//                 new TableRow({ children: [createCell("4"), createCell("Стальной настил", AlignmentType.LEFT), createCell(String(deck_load).replace(/\./g, ",")), createCell("1,05"), createCell(String(deck_load_real).replace(/\./g, ","))] }),
//                 new TableRow({ children: [createCell("5"), createCell("Полезная нагрузка", AlignmentType.LEFT), createCell(String(usefullLoad).replace(/\./g, ",")), createCell("1,05"), createCell(String(usefullLoad * 1.05).replace(/\./g, ","))] }),
//                 new TableRow({ children: [createCell("Итого:", AlignmentType.LEFT, 2), createCell(String(maine_beam).replace(/\./g, ",")), createCell(""), createCell(String(mainest_beam).replace(/\./g, ","))] }),
//             ],
//         });
//     } else if (roofType == 2) {
//         floorTable = new Table({
//             borders: tableBorders,
//             width: { size: 100, type: WidthType.PERCENTAGE },
//             columnWidths: [8, 42, 16, 16, 18], 
//             rows: [
//                 new TableRow({
//                     tableHeader: true,
//                     children: [
//                         createCell("№ п.п"),
//                         createCell("Вид нагрузки", AlignmentType.LEFT),
//                         createCell([new TextRun({ children: [oMath] })]),
//                         createCell([new TextRun({ children: [gammaF] })]),
//                         createCell([new TextRun({ children: [oMatho] })]),
//                     ],
//                 }),
//                 new TableRow({ children: [createCell("1"), createCell("Кислотоупорные керам. плитки 15мм", AlignmentType.LEFT), createCell("0,45"), createCell("1,3"), createCell("0,585")] }),
//                 new TableRow({ children: [createCell("2"), createCell("Битумная мастика 8мм", AlignmentType.LEFT), createCell("0,15"), createCell("1,3"), createCell("0,195")] }),
//                 new TableRow({ children: [createCell("3"), createCell("Гидроизоляция два слоя рубероида на мастике", AlignmentType.LEFT), createCell("0,1"), createCell("1,3"), createCell("0,13")] }),
//                 new TableRow({ children: [createCell("4"), createCell("Стальной настил", AlignmentType.LEFT), createCell(String(deck_load).replace(/\./g, ",")), createCell("1,05"), createCell(String(deck_load_real).replace(/\./g, ","))] }),
//                 new TableRow({ children: [createCell("5"), createCell("Полезная нагрузка", AlignmentType.LEFT), createCell(String(usefullLoad).replace(/\./g, ",")), createCell("1,05"), createCell(String(usefullLoad * 1.05).replace(/\./g, ","))] }),
//                 new TableRow({ children: [createCell("Итого:", AlignmentType.LEFT, 2), createCell(String(maine_beam2).replace(/\./g, ",")), createCell(""), createCell(String(mainest_beam2).replace(/\./g, ","))] }),
//             ],
//         });
//     }
// }

// function rbDataURLtoUint8Array(dataurl) {
//     const arr = dataurl.split(',');
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) {
//         u8arr[n] = bstr.charCodeAt(n);
//     }
//     return { data: u8arr, mime };
// }

// roof_beam1.shadowRoot.getElementById("roofing").addEventListener("click", () => {
//     generateRoof();
// });

// let rbDataUrl = rbCanvas.toDataURL("image/png");
// let { data: rbBinaryData } = rbDataURLtoUint8Array(rbDataUrl);
// let snapshot;


// function pushRoof() {
//     rbDataUrl = rbCanvas.toDataURL("image/png");
//     snapshot = rbDataURLtoUint8Array(rbDataUrl).data;
//     roofChildren.push(
//         new Paragraph({
//             alignment: AlignmentType.CENTER,
//             children: [
//                 new ImageRun({
//                     data: snapshot,
//                     transformation: { width: 450, height: 270 },
//                     size: 28,
//                 }),
//             ],
//         })
//     );
// }

// function createRoof() {
//     roofChildren = [];
//     roofChildren.push(
//         new Paragraph({
//             alignment: AlignmentType.CENTER,
//             spacing: { after: 60 },
//             children: [new TextRun({ text: "1.1.2 Расчёт балки настила", bold: true, size: 28, font: "Times New Roman" })],
//         }),
//         new Paragraph({
//             alignment: AlignmentType.CENTER,
//             spacing: { after: 60 },
//             children: [new TextRun({ text: "Сбор нагрузок для балок настила", bold: true, size: 28, font: "Times New Roman" })],
//         }),
//         new Paragraph({ text: "" }),
//         floorTable,
//     );
//     pushRoof();
//     roofChildren.push(
//         new Paragraph({
//             alignment: AlignmentType.CENTER,
//             spacing: { after: 60 },
//             children: [new TextRun({ text: 'Рис.3 - Грузовая площадь балки настила' })],
//         }),
//         new Paragraph({}),
//         new Paragraph({ alignment: AlignmentType.JUSTIFIED, children: [qe_calculation, new TextRun({ text: ' ' })] }),
//         new Paragraph({ alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: 'Погонная нагрузка на балку настила:' })] }),
//         new Paragraph({ alignment: AlignmentType.JUSTIFIED, children: [q_liner, new TextRun({ text: ' ' })] }),
//         new Paragraph({ alignment: AlignmentType.JUSTIFIED, children: [q_real_linear, new TextRun({ text: ' ' })] }),
//         new Paragraph({ alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: 'Принимаем сталь C245:   ' }), ry_equation] }),
//         new Paragraph({ alignment: AlignmentType.JUSTIFIED, children: [mFormula(mSub("R", "y")), new TextRun({ text: ' — расчётное сопротивление материала по пределу текучести.' }), new PageBreak()] }),
//     );
// }

// function generateRoof() {
//     getTheRoof();
//     createRoof();
//     const doc = new Document({
//         styles: {
//             paragraphStyles: [
//                 {
//                     id: "customItalicStyle",
//                     name: "Custom Italic Style",
//                     basedOn: "Normal",
//                     next: "Normal",
//                     run: { font: "Times New Roman", size: 28, italics: true }
//                 },
//                 {
//                     id: "Normal",
//                     name: "Normal",
//                     run: { font: "Times New Roman", size: 28 }
//                 }
//             ]
//         },
//         sections: [{ children: roofChildren }],
//     });

//     Packer.toBlob(doc).then(blob => {
//         saveAs(blob, "Roof_beam.docx");
//     }).catch(err => {
//         console.error(err);
//         alert("Произошла ошибка, детали в консоли.");
//     });
// }

// function drawEveryVarRoof(num) {
//         rbCtx.shadowColor = 'transparent';
//         rbCtx.strokeStyle = 'black';
//         let variant1A = 1;
//         let variant1B = 2;
//         let variant2A = 1.25;
//         let variant2B = 2;
//         let variant3A = 1;
//         let variant3B = 2.5;
        
//         let aVar, bVar, dist;
//         if (num == 1) {
//             aVar = variant1A;
//             bVar = variant1B;
//             dist = -3 * rbB * rbScale / 2;
//         } else if (num == 2) {
//             aVar = variant2A;
//             bVar = variant2B;
//             dist = 0;
//         } else if (num == 3) {
//             aVar = variant3A;
//             bVar = variant3B;
//             dist = 3 * rbB * rbScale / 2;
//         }

//         let centerX = rbCanvas.width / (2 * rbDpi) + rbScale + dist + rbMove;
//         let centerY = rbCanvas.height / (2 * rbDpi) + rbScale;

//         rbCtx.lineWidth = 3;
//         rbCtx.strokeRect(centerX - (rbB / 2) * rbScale, centerY - (rbA / 2) * rbScale, rbB * rbScale, rbA * rbScale);

//         let nA2 = parseInt(rbA / aVar);
//         let nB2 = parseInt(rbB / bVar);

//         for (var i = 0; i < nA2; i++) {
//             for (var q = 0; q < nB2; q++) {
//                 rbCtx.strokeRect(centerX - ((rbB / 2) - (q * bVar)) * rbScale, centerY - ((rbA / 2) - (i * aVar)) * rbScale, bVar * rbScale, aVar * rbScale);
//             }
//         }

//         rbCtx.lineWidth = 2;
        
//         rbCtx.strokeRect(centerX - ((rbB / 2) * rbScale) - 5, centerY - ((rbA / 2) * rbScale) - 5, 10, 10);
//         rbCtx.strokeRect(centerX + ((rbB / 2) * rbScale) - 5, centerY + ((rbA / 2) * rbScale) - 5, 10, 10);
//         rbCtx.strokeRect(centerX + ((rbB / 2) * rbScale) - 5, centerY - ((rbA / 2) * rbScale) - 5, 10, 10);
//         rbCtx.strokeRect(centerX - ((rbB / 2) * rbScale) - 5, centerY + ((rbA / 2) * rbScale) - 5, 10, 10);

//         if (rbZoom == 1) {
//             rbCtx.beginPath();
//             for (var w = 0; w < nB2; w++) {
//                 rbCtx.lineWidth = 1;
//                 rbCtx.moveTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale), centerY - ((rbA / 2) * rbScale));
//                 rbCtx.lineTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale), centerY - ((rbA / 2) * rbScale) - 25);
//                 rbCtx.lineTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale) + bVar * rbScale, centerY - ((rbA / 2) * rbScale) - 25);
//                 rbCtx.lineTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale) + bVar * rbScale, centerY - ((rbA / 2) * rbScale));
//                 rbCtx.moveTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale), centerY - ((rbA / 2) * rbScale) - 25);
//                 rbCtx.lineTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale) + 5, centerY - ((rbA / 2) * rbScale) - 30);
//                 rbCtx.lineTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale) - 5, centerY - ((rbA / 2) * rbScale) - 20);
//                 rbCtx.moveTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale), centerY - ((rbA / 2) * rbScale) - 25);
//                 rbCtx.lineTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale), centerY - ((rbA / 2) * rbScale) - 30);
//                 rbCtx.moveTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale), centerY - ((rbA / 2) * rbScale) - 25);
//                 rbCtx.lineTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale) - 5, centerY - ((rbA / 2) * rbScale) - 25);
//                 rbCtx.moveTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale) + bVar * rbScale, centerY - ((rbA / 2) * rbScale) - 25);
//                 rbCtx.lineTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale) + bVar * rbScale + 5, centerY - ((rbA / 2) * rbScale) - 30);
//                 rbCtx.lineTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale) + bVar * rbScale - 5, centerY - ((rbA / 2) * rbScale) - 20);
//                 rbCtx.moveTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale) + bVar * rbScale, centerY - ((rbA / 2) * rbScale) - 25);
//                 rbCtx.lineTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale) + bVar * rbScale, centerY - ((rbA / 2) * rbScale) - 30);
//                 rbCtx.moveTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale) + bVar * rbScale, centerY - ((rbA / 2) * rbScale) - 25);
//                 rbCtx.lineTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale) + bVar * rbScale + 5, centerY - ((rbA / 2) * rbScale) - 25);
//                 rbCtx.moveTo((w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale) + bVar * rbScale / 2, centerY - ((rbA / 2) * rbScale) - 25);
//                 rbCtx.font = 'bold 12px GOST A';
//                 rbCtx.fillStyle = 'black';
//                 rbCtx.textAlign = 'center';
//                 rbCtx.fillText('b=' + String(bVar).replaceAll('.', ','), (w * bVar * rbScale) + centerX - ((rbB / 2) * rbScale) + bVar * rbScale / 2, centerY - ((rbA / 2) * rbScale) - 35);
//                 rbCtx.stroke();
//             }
        
//             for (var r = 0; r < nA2; r++) {
//                 rbCtx.moveTo(centerX - ((rbB / 2) * rbScale), (r * aVar * rbScale) + centerY - ((rbA / 2) * rbScale));
//                 rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 25, (r * aVar * rbScale) + centerY - ((rbA / 2) * rbScale));
//                 rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 25, (r * aVar * rbScale) + centerY - ((rbA / 2) * rbScale) + aVar * rbScale);
//                 rbCtx.lineTo(centerX - ((rbB / 2) * rbScale), (r * aVar * rbScale) + centerY - ((rbA / 2) * rbScale) + aVar * rbScale);
//                 rbCtx.moveTo(centerX - ((rbB / 2) * rbScale) - 25, (r * aVar * rbScale) + centerY - ((rbA / 2) * rbScale));
//                 rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 20, (r * aVar * rbScale) + centerY - ((rbA / 2) * rbScale) + 5);
//                 rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 30, (r * aVar * rbScale) + centerY - ((rbA / 2) * rbScale) - 5);
//                 rbCtx.moveTo(centerX - ((rbB / 2) * rbScale) - 25, (r * aVar * rbScale) + centerY - ((rbA / 2) * rbScale));
//                 rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 25, (r * aVar * rbScale) + centerY - ((rbA / 2) * rbScale) - 5);
//                 rbCtx.moveTo(centerX - ((rbB / 2) * rbScale) - 25, (r * aVar * rbScale) + centerY - ((rbA / 2) * rbScale) + aVar * rbScale);
//                 rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 20, (r * aVar * rbScale) + centerY - ((rbA / 2) * rbScale) + aVar * rbScale + 5);
//                 rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 30, (r * aVar * rbScale) + centerY - ((rbA / 2) * rbScale) + aVar * rbScale - 5);
//                 rbCtx.moveTo(centerX - ((rbB / 2) * rbScale) - 25, (r * aVar * rbScale) + centerY - ((rbA / 2) * rbScale) + aVar * rbScale);
//                 rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 25, (r * aVar * rbScale) + centerY - ((rbA / 2) * rbScale) + aVar * rbScale + 5);
//                 rbCtx.save();
//                 rbCtx.font = 'bold 12px GOST A';
//                 rbCtx.textAlign = 'right';
//                 rbCtx.textBaseline = 'middle';
//                 rbCtx.translate(centerX - ((rbB / 2) * rbScale) - 30, (r * aVar * rbScale) + centerY - ((rbA / 2) * rbScale) + aVar * rbScale / 2);
//                 rbCtx.fillText('a=' + String(aVar).replaceAll('.', ','), 0, 0);
//                 rbCtx.restore();
//                 rbCtx.stroke();
//             }
        
//             rbCtx.lineWidth = 1;
//             rbCtx.moveTo(centerX - ((rbB / 2) * rbScale), centerY - ((rbA / 2) * rbScale));
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 65, centerY - ((rbA / 2) * rbScale));
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 65, centerY - ((rbA / 2) * rbScale) + rbA * rbScale);
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale), centerY - ((rbA / 2) * rbScale) + rbA * rbScale);
//             rbCtx.moveTo(centerX - ((rbB / 2) * rbScale) - 65, centerY - ((rbA / 2) * rbScale));
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 60, centerY - ((rbA / 2) * rbScale) + 5);
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 70, centerY - ((rbA / 2) * rbScale) - 5);
//             rbCtx.moveTo(centerX - ((rbB / 2) * rbScale) - 65, centerY - ((rbA / 2) * rbScale));
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 65, centerY - ((rbA / 2) * rbScale) - 5);
//             rbCtx.moveTo(centerX - ((rbB / 2) * rbScale) - 65, centerY - ((rbA / 2) * rbScale) + rbA * rbScale);
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 60, centerY - ((rbA / 2) * rbScale) + rbA * rbScale + 5);
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 70, centerY - ((rbA / 2) * rbScale) + rbA * rbScale - 5);
//             rbCtx.moveTo(centerX - ((rbB / 2) * rbScale) - 65, centerY - ((rbA / 2) * rbScale) + rbA * rbScale);
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 65, centerY - ((rbA / 2) * rbScale) + rbA * rbScale + 5);
//             rbCtx.save();
//             rbCtx.font = 'bold 14px GOST A';
//             rbCtx.textAlign = 'right';
//             rbCtx.textBaseline = 'middle';
//             rbCtx.translate(centerX - ((rbB / 2) * rbScale) - 70, centerY - ((rbA / 2) * rbScale) + rbA * rbScale / 2);
//             rbCtx.fillText('l=' + String(rbA).replaceAll('.', ','), 0, 0);
//             rbCtx.restore();
//             rbCtx.stroke();
        
//             rbCtx.moveTo(centerX - ((rbB / 2) * rbScale), centerY - ((rbA / 2) * rbScale));
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale), centerY - ((rbA / 2) * rbScale) - 55);
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) + rbB * rbScale, centerY - ((rbA / 2) * rbScale) - 55);
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) + rbB * rbScale, centerY - ((rbA / 2) * rbScale));
//             rbCtx.moveTo(centerX - ((rbB / 2) * rbScale), centerY - ((rbA / 2) * rbScale) - 55);
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) + 5, centerY - ((rbA / 2) * rbScale) - 60);
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 5, centerY - ((rbA / 2) * rbScale) - 50);
//             rbCtx.moveTo(centerX - ((rbB / 2) * rbScale), centerY - ((rbA / 2) * rbScale) - 55);
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale), centerY - ((rbA / 2) * rbScale) - 60);
//             rbCtx.moveTo(centerX - ((rbB / 2) * rbScale), centerY - ((rbA / 2) * rbScale) - 55);
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) - 5, centerY - ((rbA / 2) * rbScale) - 55);
//             rbCtx.moveTo(centerX - ((rbB / 2) * rbScale) + rbB * rbScale, centerY - ((rbA / 2) * rbScale) - 55);
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) + rbB * rbScale + 5, centerY - ((rbA / 2) * rbScale) - 60);
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) + rbB * rbScale - 5, centerY - ((rbA / 2) * rbScale) - 50);
//             rbCtx.moveTo(centerX - ((rbB / 2) * rbScale) + rbB * rbScale, centerY - ((rbA / 2) * rbScale) - 55);
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) + rbB * rbScale, centerY - ((rbA / 2) * rbScale) - 60);
//             rbCtx.moveTo(centerX - ((rbB / 2) * rbScale) + rbB * rbScale, centerY - ((rbA / 2) * rbScale) - 55);
//             rbCtx.lineTo(centerX - ((rbB / 2) * rbScale) + rbB * rbScale + 5, centerY - ((rbA / 2) * rbScale) - 55);
//             rbCtx.moveTo(centerX - ((rbB / 2) * rbScale) + rbB * rbScale / 2, centerY - ((rbA / 2) * rbScale) - 55);
//             rbCtx.font = 'bold 14px GOST A';
//             rbCtx.fillStyle = 'black';
//             rbCtx.textAlign = 'center';
//             rbCtx.fillText('L=' + String(rbB).replaceAll('.', ','), centerX - ((rbB / 2) * rbScale) + rbB * rbScale / 2, centerY - ((rbA / 2) * rbScale) - 60);
//             rbCtx.stroke();
            
//             rbCtx.lineWidth = 2;
//             let nB1 = rbB / variant1B;
//             let nA1 = rbA / variant1A;
//             let wo = variant1B * rbScale;
//             let h = variant1A * rbScale;
//             let x = nB1 % 2 == 0 ? centerX - variant1B * rbScale : centerX - variant1B / 2 * rbScale;
//             let y = nA1 % 2 == 0 ? centerY - variant1A / 2 * rbScale : centerY - variant1A * rbScale;
            
//             rbCtx.save();
//             rbCtx.strokeRect(x, y, wo, h);
//             rbCtx.beginPath();
//             rbCtx.rect(x, y, wo, h);
//             rbCtx.clip();
            
//             rbCtx.strokeStyle = '#000000';
//             rbCtx.lineWidth = 1;
//             rbCtx.beginPath();
//             for (let i = -h; i < wo; i += 10) {
//                 rbCtx.moveTo(x + i, y);
//                 rbCtx.lineTo(x + i + h, y + h);
//             }
//             rbCtx.stroke();
//             rbCtx.restore();
//         }
// }
// rBcounting()
// drawEveryVarRoof(1);

// nextBtn.addEventListener("click", () => { rBcounting() })