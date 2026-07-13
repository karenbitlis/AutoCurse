let secondaryBeamChildren = []

let sescale = 65
let F = sest_beam*aVar*bVar
let F_n = seco_beam*aVar*bVar
let normality = 0

let M_max = Mcalc(kof())
let biQ = q_real_linear * A / 2

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

const rEpuro = document.getElementById('sec-epure1')

const seCanvas = rEpuro.shadowRoot.getElementById("canvas");
const seCtx = seCanvas.getContext("2d");

let sedataUrl = seCanvas.toDataURL("image/png");
let sesnapshot = [];
({ sepdata } = sedataURLtoUint8Array(sedataUrl))

const sectnr = rEpuro.shadowRoot.getElementById("canvas-container");

const secssWidth = sectnr.offsetWidth-8;
const secssHeight = 450;
const sedpi = 10;

seCanvas.width = secssWidth * sedpi;
seCanvas.height = secssHeight * sedpi;

seCanvas.style.width = secssWidth + "px";
seCanvas.style.height = secssHeight + "px";

seCtx.scale(sedpi, sedpi);

let centerX = seCanvas.width / (2*sedpi);
let centerY = seCanvas.height / (2*sedpi) + 250;

let Msescaler = 700
let Qsescaler = 300

if (A >= 5) {
    Msescaler = 800
    Qsescaler = 600
}

drawSocondBeamEpure()

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
let sec_beamchey = sectBeamByWx(Math.ceil(Mcalc(kof())/0.24*1000)/1000);
let sec_roof_parameters = mFormula(
    mSub('I', 'x'), mEq(), String(sec_beamchey.Ix).replace('.',','), mText(' '), mSup('см', '4'),
    mText('; '), 
    mSub('S', 'x'), mEq(), String(sec_beamchey.Sx).replace('.',','), mText(' '), mSup('см', '3'),
    mText('; '),
    mText('Масса на 1м'), mEq(), String(sec_beamchey.weight).replace('.',','), mText(' кг')
);
let sec_power_check =  mFormula(
    mText('σ'), mEq(),
    mFrac(
        mSub('M', 'max'),
        mText('W')
    ),
    ' ≤ ',
    mGroup(mSub('R', 'y'), mMul(), mSub('γ', 'c'))
);
let sec_power_check_сalc = mFormula(
    mFrac(
        mSub('M', 'max'),
        mSub('W', 'x')
    ),
    mEq(), 
    mFrac(
        mGroup(String(Math.ceil(Mcalc(kof())*1000)/1000).replace('.',','), mMul(), '100'),
        (String(Math.ceil(sec_beamchey.Wx*1000)/1000).replace('.',','))
    ),
    mEq(), 
    String(Math.ceil(Mcalc(kof())*100/sec_beamchey.Wx*1000)/1000).replace('.',','), 
    mText(' '),
    mFrac(
        'кН',
        mGroup(mSup('см', '2'))
    )
);
let sec_power_check_end = mFormula(
	String(Math.ceil(Mcalc(kof())*100/sec_beamchey.Wx*1000)/1000).replace('.',','),
	mText(' '), // Пробел перед единицами
	mFrac('кН', mSup('см', '2')), // Дробь кН/см²
	
	' < ',      // Знак неравенства
	
	'24',
	mText(' '),
	mFrac('кН', mSup('см', '2'))  // Та же дробь кН/см²
);
let Wneedsec = mFormula(
    mSub("W", "тр"),
    mEq(),

    mFrac(
        mSub("M", "max"),
        mGroup(
            mSub("R", "y"),
            mSub("γ", "c")
        )
    ),

    mEq(),

    mFrac(
        mGroup(
            String(Math.ceil(Mcalc(kof())*1000)/1000).replace('.',','),
            mMul(),
            "100"
        ),
        "24"
    ),

    mEq(),

    String(Math.ceil(Mcalc(kof())*1000*100/24)/1000).replace('.',',') +" см³"
)
let sec_deflection_formula = mFormula(
    mFrac(
        mSub('f', 'вб'),
        mSub('l', 'вб')
    ),
    mEq(), 
    mFrac('5', '48'),
    mMul(),
    mFrac(
        mGroup(
            mSub(mSup('M', 'н'), 'max'), 
            mMul(), 
            mGroup(mSub('l', 'вб'))
        ),
        mGroup('E', mMul(), mSub('I', 'x'))
    ),
    ' ≤ ',

    mSquareParen(mFrac('f', 'l')),);

F = seco_beam*aVar*bVar

let roof_deflection_answ = (5/48)*(Mcalc(kof())*(10**(2))*(A*100))/(2.06*(10**4)*sec_beamchey.Ix)
let roof_deflection_calc = mFormula(
    mFrac('5', '48'),
    mMul(),
    mFrac(
        mGroup(
            String(Math.ceil(Mcalc(kof())*1000)/1000).replace('.',','),
            mText('·'), 
            mSup('10','2'),
            mText('·'),
            mGroup(String(Math.ceil(A*100*1000)/1000).replace('.',','))
        ),
        mGroup(
            '2,06', mText('·'),  mSup('10','4'), // 2,06·10^4
            mText('·'),
            String(Math.ceil(sec_beamchey.Ix*1000)/1000).replace('.',',')
        )
    ),
    mEq(),
    String(Math.ceil(roof_deflection_answ*100000)/100000).replace('.',','),
    ' < ',
    '0,005');

let M_max_eqo = mFormula(
    mSub("M", "max"),
    mEq(),
    String(Math.ceil(M_max*1000)/1000).replace('.',','),
    " кНм"
)

F = sest_beam*aVar*bVar
let Hvb = sec_beamchey.R + sec_beamchey.t
let sec_loc_param1 = mFormula(
    mSub("H", "вб"),
    mEq(),
    "R",
    mPlus(),
    "t",
    mEq(),

 	String(Math.ceil(sec_beamchey.R*100)/1000).replace('.',','),
    mPlus(),

    String(Math.ceil(sec_beamchey.t*100)/1000).replace('.',','),
    mEq(),
    
    String(Math.ceil(Hvb*100)/1000).replace('.',',') + ' см',);
let sec_loc_param2 = mFormula(
	mSub("b","вб"),
	mEq(),
	String(Math.ceil(sec_beamchey.b*100)/1000).replace('.',',') + ' см',)
let Lef = sec_beamchey.b + (2 * Hvb)
let sec_loc_param3 = mFormula(
    mSub("l", "ef"),
    mEq(),
    mSub("b", "бн"),
    mPlus(),
    "2",
    mSub("H", "вб"),
    mEq(),

    String(Math.ceil(sec_beamchey.b*100)/1000).replace('.',','),

    mPlus(),

    "2",
    mMul(),

    String(Math.ceil(Hvb*100)/1000).replace('.',','),
    mEq(),

    String(Math.ceil(Lef*100)/1000).replace('.',',') + ' см',)
let sec_sigma_loc = F/(sec_beamchey.s/10*Lef/10)
let sec_loc_check = mFormula(
    mSub("σ", "loc"),
    mEq(),

    mFrac(
        mSub("F", "вб"),
        mGroup(
            mSub("l", "ef"),
            "s"
        )
    ),

    " ≤ ",

    mGroup(
        mSub("R", "s"),
        mSub("γ", "C")
    ),

    "  ⇒  ",

    mSub("σ", "loc"),
    mEq(),

    mFrac(
        String(Math.ceil(F*1000)/1000).replace('.',','),
        mGroup(
            String(Math.ceil(Lef*100)/1000).replace('.',','),
            mMul(),
            String(Math.ceil(sec_beamchey.s*100)/1000).replace('.',',')
        )
    ),

    mEq(),

    String(Math.ceil(sec_sigma_loc*1000)/1000).replace('.',','),
    mFrac('кН', mSup('см', '2')),

    " ≤ ",
    '24',
    mText(' '),
    mFrac('кН', mSup('см', '2')))
let sec_overall_feat = mFormula(
    mSub(
        mBar("λ"),
        "ub"
    ),
    mEq(),
    "0,41",
    mPlus(),
    "0,0052",
    mFrac(
        "b",
        "t"
    ),
    mPlus(),
    mParen(
        "0,73",
        mMinus(),
        "0,016",
        mFrac(
            "b",
            "t"
        )
    ),
    mFrac(
        "b",
        mSup('h','*')
    ))
let h_between_twos = sec_beamchey.h - (2*sec_beamchey.t)
let h_form_count = mFormula(
	mSup('h','*'),
	mEq(),
	'h',
	mMinus(),
	'2',
	mMul(),
	't',
	mEq(),
	String(Math.ceil(sec_beamchey.h*100)/1000).replace('.',','),
	mMinus(),
	'2',
	mMul(),
	String(Math.ceil(sec_beamchey.t*100)/1000).replace('.',','),
	mEq(),
	String(Math.ceil(h_between_twos*100)/1000).replace('.',',') + ' см')
let lambdaUb 	= 0.41 + 0.0052 * 15 + (0.73 - 0.016 * 15) * (sec_beamchey.b / h_between_twos);
let sec_overall_calc = mFormula(
    mSub(
        mBar("λ"),
        "ub"
    ),
    mEq(),
    "0,41",
    mPlus(),
    "0,0052",
    mMul(),
    "15",
    mPlus(),
    mParen(
        "0,73",
        mMinus(),
        "0,016",
        mMul(),
        "15"
    ),
    mFrac(
        String(Math.ceil(sec_beamchey.b*100)/1000).replace('.',','),
        String(Math.ceil(h_between_twos*100)/1000).replace('.',',')

    ),
    mEq(),
    String(Math.ceil(lambdaUb*1000)/1000).replace('.',','))
let sec_some_sigma_res = Mcalc(kof())*100/sec_beamchey.Wx
let sec_some_sigma = mFormula(
    "σ",
    mEq(),
    mFrac(
        mSub("M", "max"),
        mGroup(
            mSub("W", "x"),
            mSub("γ", "c"),
        )
    ),
    mEq(),
    mFrac(
        mGroup(
			String(Math.ceil(Mcalc(kof())*1000)/1000).replace('.',','),
            mMul(),
            "100"
        ),
        mGroup(
            String(Math.ceil(sec_beamchey.Wx*1000)/1000).replace('.',','),
            mMul(),
            "1"
        )
    ),
    mEq(),
    String(Math.ceil(sec_some_sigma_res*1000)/1000).replace('.',','),
    mFrac(
        "кН",
        mSup(
            "см",
            "2"
        )
    ))
let lambdaUbFixed = lambdaUb * Math.sqrt(24 / sec_some_sigma_res);
let lambdaUber = mFormula(
    mSub(
        mBar("λ"),
        "ub"
    ),
    mMul(),
    mSqrt(
        mFrac(
            mSub("R", "y"),
            "σ"
        )
    ),
    mEq(),
    String(Math.ceil(lambdaUb*1000)/1000).replace('.',','),
    mMul(),

    mSqrt(
        mFrac(
            "24",
            String(Math.ceil(sec_some_sigma_res*1000)/1000).replace('.',','),
        )
    ),
    mEq(),
    String(Math.ceil(lambdaUbFixed*1000)/1000).replace('.',','),)
let lambdaDefault_res = ((aVar * 100) / (sec_beamchey.b/10)) * Math.sqrt(24 / (2.06 * 10 ** 4));
let lambdaDefault = mFormula(
    mSub(
        mBar("λ"),
        "b"
    ),
    mEq(),
    mFrac(
        mBar(mSub("l", "ef")),
        "b"
    ),
    mSqrt(
        mFrac(
            mSub("R", "y"),
            "E"
        )
    ),
    mEq(),
    mFrac(
        String(Math.ceil(aVar*100*1000)/1000).replace('.',','),
        String(Math.ceil(sec_beamchey.b*100)/1000).replace('.',','),
    ),
    mSqrt(
        mFrac(
            "24",
            mGroup(
                "2,06",
                mMul(),
                mSup(
                    "10",
                    "4"
                )
            )
        )
    ),
    mEq(),
	String(Math.ceil(lambdaDefault_res*1000)/1000).replace('.',','))
rEpuro.shadowRoot.getElementById('sEpure-result').innerText = 'Назначен двутавр №' + sec_beamchey.number

function doingSecEpures() {
	sescale = 65
	F = sest_beam*aVar*bVar
	F_n = seco_beam*aVar*bVar
	normality = 0
	M_max = Mcalc(kof())
	biQ = q_real_linear * A / 2
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
	
	centerX = seCanvas.width / (2*sedpi);
	centerY = seCanvas.height / (2*sedpi) + 250;
	Msescaler = 700
	Qsescaler = 300
	
	if (A >= 5) {
	    Msescaler = 800
	    Qsescaler = 600
	}
	
	drawSocondBeamEpure()
	
	Wneed = mFormula(
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
	    String(Math.ceil(M_max/0.24*1000)/1000).replace('.',','), mSup('см', '3'));
	sec_beamchey = sectBeamByWx(Math.ceil(Mcalc(kof())/0.24*1000)/1000);
	sec_roof_parameters = mFormula(
	    mSub('I', 'x'), mEq(), String(sec_beamchey.Ix).replace('.',','), mText(' '), mSup('см', '4'),
	    mText('; '), 
	    mSub('S', 'x'), mEq(), String(sec_beamchey.Sx).replace('.',','), mText(' '), mSup('см', '3'),
	    mText('; '),
	    mText('Масса на 1м'), mEq(), String(sec_beamchey.weight).replace('.',','), mText(' кг'));
	sec_power_check =  mFormula(
	    mText('σ'), mEq(),
	    mFrac(
	        mSub('M', 'max'),
	        mText('W')
	    ),
	    ' ≤ ',
	    mGroup(mSub('R', 'y'), mMul(), mSub('γ', 'c')));
	sec_power_check_сalc = mFormula(
	    mFrac(
	        mSub('M', 'max'),
	        mSub('W', 'x')
	    ),
	    mEq(), 
	    mFrac(
	        mGroup(String(Math.ceil(Mcalc(kof())*1000)/1000).replace('.',','), mMul(), '100'),
	        (String(Math.ceil(sec_beamchey.Wx*1000)/1000).replace('.',','))
	    ),
	    mEq(), 
	    String(Math.ceil(Mcalc(kof())*100/sec_beamchey.Wx*1000)/1000).replace('.',','), 
	    mText(' '),
	    mFrac(
	        'кН',
	        mGroup(mSup('см', '2'))
	    )
	);
	sec_power_check_end = mFormula(
		String(Math.ceil(Mcalc(kof())*100/sec_beamchey.Wx*1000)/1000).replace('.',','),
		mText(' '), // Пробел перед единицами
		mFrac('кН', mSup('см', '2')), // Дробь кН/см²
		
		' < ',      // Знак неравенства
		
		'24',
		mText(' '),
		mFrac('кН', mSup('см', '2')));
	Wneedsec = mFormula(
	    mSub("W", "тр"),
	    mEq(),
	
	    mFrac(
	        mSub("M", "max"),
	        mGroup(
	            mSub("R", "y"),
	            mSub("γ", "c")
	        )
	    ),
	
	    mEq(),
	
	    mFrac(
	        mGroup(
	            String(Math.ceil(Mcalc(kof())*1000)/1000).replace('.',','),
	            mMul(),
	            "100"
	        ),
	        "24"
	    ),
	
	    mEq(),
	
	    String(Math.ceil(Mcalc(kof())*1000*100/24)/1000).replace('.',',') +" см³")
	sec_deflection_formula = mFormula(
	    mFrac(
	        mSub('f', 'вб'),
	        mSub('l', 'вб')
	    ),
	    mEq(), 
	    mFrac('5', '48'),
	    mMul(),
	    mFrac(
	        mGroup(
	            mSub(mSup('M', 'н'), 'max'), 
	            mMul(), 
	            mGroup(mSub('l', 'вб'))
	        ),
	        mGroup('E', mMul(), mSub('I', 'x'))
	    ),
	    ' ≤ ',
	
	    mSquareParen(mFrac('f', 'l')),);
	F = seco_beam*aVar*bVar
	roof_deflection_answ = (5/48)*(Mcalc(kof())*(10**(2))*(A*100))/(2.06*(10**4)*sec_beamchey.Ix)
	roof_deflection_calc = mFormula(
	    mFrac('5', '48'),
	    mMul(),
	    mFrac(
	        mGroup(
	            String(Math.ceil(Mcalc(kof())*1000)/1000).replace('.',','),
	            mText('·'), 
	            mSup('10','2'),
	            mText('·'),
	            mGroup(String(Math.ceil(A*100*1000)/1000).replace('.',','))
	        ),
	        mGroup(
	            '2,06', mText('·'),  mSup('10','4'), // 2,06·10^4
	            mText('·'),
	            String(Math.ceil(sec_beamchey.Ix*1000)/1000).replace('.',',')
	        )
	    ),
	    mEq(),
	    String(Math.ceil(roof_deflection_answ*100000)/100000).replace('.',','),
	    ' < ',
	    '0,005');
	M_max_eqo = mFormula(
	    mSub("M", "max"),
	    mEq(),
	    String(Math.ceil(M_max*1000)/1000).replace('.',','),
	    " кНм")
	
	F = sest_beam*aVar*bVar
	Hvb = sec_beamchey.R + sec_beamchey.t
	sec_loc_param1 = mFormula(
	    mSub("H", "вб"),
	    mEq(),
	    "R",
	    mPlus(),
	    "t",
	    mEq(),
	
	 	String(Math.ceil(sec_beamchey.R*100)/1000).replace('.',','),
	    mPlus(),
	
	    String(Math.ceil(sec_beamchey.t*100)/1000).replace('.',','),
	    mEq(),
	    
	    String(Math.ceil(Hvb*100)/1000).replace('.',',') + ' см',);
	sec_loc_param2 = mFormula(
		mSub("b","вб"),
		mEq(),
		String(Math.ceil(sec_beamchey.b*100)/1000).replace('.',',') + ' см',)
	Lef = sec_beamchey.b + (2 * Hvb)
	sec_loc_param3 = mFormula(
	    mSub("l", "ef"),
	    mEq(),
	    mSub("b", "бн"),
	    mPlus(),
	    "2",
	    mSub("H", "вб"),
	    mEq(),
	
	    String(Math.ceil(sec_beamchey.b*100)/1000).replace('.',','),
	
	    mPlus(),
	
	    "2",
	    mMul(),
	
	    String(Math.ceil(Hvb*100)/1000).replace('.',','),
	    mEq(),
	
	    String(Math.ceil(Lef*100)/1000).replace('.',',') + ' см',)
	sec_sigma_loc = F/(sec_beamchey.s/10*Lef/10)
	sec_loc_check = mFormula(
	    mSub("σ", "loc"),
	    mEq(),
	
	    mFrac(
	        mSub("F", "вб"),
	        mGroup(
	            mSub("l", "ef"),
	            "s"
	        )
	    ),
	
	    " ≤ ",
	
	    mGroup(
	        mSub("R", "s"),
	        mSub("γ", "C")
	    ),
	
	    "  ⇒  ",
	
	    mSub("σ", "loc"),
	    mEq(),
	
	    mFrac(
	        String(Math.ceil(F*1000)/1000).replace('.',','),
	        mGroup(
	            String(Math.ceil(Lef*100)/1000).replace('.',','),
	            mMul(),
	            String(Math.ceil(sec_beamchey.s*100)/1000).replace('.',',')
	        )
	    ),
	
	    mEq(),
	
	    String(Math.ceil(sec_sigma_loc*1000)/1000).replace('.',','),
	    mFrac('кН', mSup('см', '2')),
	
	    " ≤ ",
	    '24',
	    mText(' '),
	    mFrac('кН', mSup('см', '2')))
	sec_overall_feat = mFormula(
	    mSub(
	        mBar("λ"),
	        "ub"
	    ),
	    mEq(),
	    "0,41",
	    mPlus(),
	    "0,0052",
	    mFrac(
	        "b",
	        "t"
	    ),
	    mPlus(),
	    mParen(
	        "0,73",
	        mMinus(),
	        "0,016",
	        mFrac(
	            "b",
	            "t"
	        )
	    ),
	    mFrac(
	        "b",
	        mSup('h','*')
	    ))
	h_between_twos = sec_beamchey.h - (2*sec_beamchey.t)
	h_form_count = mFormula(
		mSup('h','*'),
		mEq(),
		'h',
		mMinus(),
		'2',
		mMul(),
		't',
		mEq(),
		String(Math.ceil(sec_beamchey.h*100)/1000).replace('.',','),
		mMinus(),
		'2',
		mMul(),
		String(Math.ceil(sec_beamchey.t*100)/1000).replace('.',','),
		mEq(),
		String(Math.ceil(h_between_twos*100)/1000).replace('.',',') + ' см')
	lambdaUb 	= 0.41 + 0.0052 * 15 + (0.73 - 0.016 * 15) * (sec_beamchey.b / h_between_twos);
	sec_overall_calc = mFormula(
	    mSub(
	        mBar("λ"),
	        "ub"
	    ),
	    mEq(),
	    "0,41",
	    mPlus(),
	    "0,0052",
	    mMul(),
	    "15",
	    mPlus(),
	    mParen(
	        "0,73",
	        mMinus(),
	        "0,016",
	        mMul(),
	        "15"
	    ),
	    mFrac(
	        String(Math.ceil(sec_beamchey.b*100)/1000).replace('.',','),
	        String(Math.ceil(h_between_twos*100)/1000).replace('.',',')
	
	    ),
	    mEq(),
	    String(Math.ceil(lambdaUb*1000)/1000).replace('.',','))
	sec_some_sigma_res = Mcalc(kof())*100/sec_beamchey.Wx
	sec_some_sigma = mFormula(
	    "σ",
	    mEq(),
	    mFrac(
	        mSub("M", "max"),
	        mGroup(
	            mSub("W", "x"),
	            mSub("γ", "c"),
	        )
	    ),
	    mEq(),
	    mFrac(
	        mGroup(
				String(Math.ceil(Mcalc(kof())*1000)/1000).replace('.',','),
	            mMul(),
	            "100"
	        ),
	        mGroup(
	            String(Math.ceil(sec_beamchey.Wx*1000)/1000).replace('.',','),
	            mMul(),
	            "1"
	        )
	    ),
	    mEq(),
	    String(Math.ceil(sec_some_sigma_res*1000)/1000).replace('.',','),
	    mFrac(
	        "кН",
	        mSup(
	            "см",
	            "2"
	        )
	    ))
	lambdaUbFixed = lambdaUb * Math.sqrt(24 / sec_some_sigma_res);
	lambdaUber = mFormula(
	    mSub(
	        mBar("λ"),
	        "ub"
	    ),
	    mMul(),
	    mSqrt(
	        mFrac(
	            mSub("R", "y"),
	            "σ"
	        )
	    ),
	    mEq(),
	    String(Math.ceil(lambdaUb*1000)/1000).replace('.',','),
	    mMul(),
	
	    mSqrt(
	        mFrac(
	            "24",
	            String(Math.ceil(sec_some_sigma_res*1000)/1000).replace('.',','),
	        )
	    ),
	
	    mEq(),
	
	    String(Math.ceil(lambdaUbFixed*1000)/1000).replace('.',','),)
	lambdaDefault_res = ((aVar * 100) / (sec_beamchey.b/10)) * Math.sqrt(24 / (2.06 * 10 ** 4));
	lambdaDefault = mFormula(
	    mSub(
	        mBar("λ"),
	        "b"
	    ),
	    mEq(),
	    mFrac(
	        mBar(mSub("l", "ef")),
	        "b"
	    ),
	    mSqrt(
	        mFrac(
	            mSub("R", "y"),
	            "E"
	        )
	    ),
	    mEq(),
	    mFrac(
	        String(Math.ceil(aVar*100*1000)/1000).replace('.',','),
	        String(Math.ceil(sec_beamchey.b*100)/1000).replace('.',','),
	    ),
	    mSqrt(
	        mFrac(
	            "24",
	            mGroup(
	                "2,06",
	                mMul(),
	                mSup(
	                    "10",
	                    "4"
	                )
	            )
	        )
	    ),
	
	    mEq(),
	
	    String(Math.ceil(lambdaDefault_res*1000)/1000).replace('.',','))
	rEpuro.shadowRoot.getElementById('sEpure-result').innerText = 'Назначен двутавр №' + sec_beamchey.number
}


function sedataURLtoUint8Array(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return { sepdata: u8arr, mime };
}

function drawSocondBeamEpure() {
    seCtx.fillStyle = "white"
    seCtx.fillRect(0, 0, seCanvas.width, seCanvas.height)
//beam
	seCtx.beginPath()
		seCtx.lineWidth = 4
		seCtx.moveTo(centerX, centerY)
		seCtx.moveTo(centerX, centerY/7)
		seCtx.moveTo(centerX-A/2*sescale+0.1*sescale, centerY/7)
		seCtx.lineTo(centerX+(A/2)*sescale-0.1*sescale, centerY/7)
		seCtx.moveTo(centerX-A/2*sescale, centerY/7)
		seCtx.lineTo(centerX-A/2*sescale+0.15*sescale, centerY/7+0.3*sescale)
		seCtx.moveTo(centerX-A/2*sescale, centerY/7)
		seCtx.lineTo(centerX-A/2*sescale-0.15*sescale, centerY/7+0.3*sescale)
		seCtx.lineTo(centerX-A/2*sescale+0.15*sescale, centerY/7+0.3*sescale)
		seCtx.closePath()
		seCtx.stroke()

	seCtx.beginPath()
		seCtx.lineWidth = 4
		seCtx.moveTo(centerX+A/2*sescale, centerY/7)
		seCtx.lineTo(centerX+A/2*sescale, centerY/7+0.3*sescale)
		seCtx.closePath()
		seCtx.stroke()
// ground
	seCtx.beginPath()
		seCtx.lineWidth = 4
		seCtx.moveTo(centerX+A/2*sescale, centerY/7+0.3*sescale+0.1*sescale)
		seCtx.moveTo(centerX+A/2*sescale+0.3*sescale, centerY/7+0.3*sescale+0.1*sescale)
		seCtx.lineTo(centerX+A/2*sescale-0.3*sescale, centerY/7+0.3*sescale+0.1*sescale)
		seCtx.stroke()
	seCtx.beginPath()
		seCtx.lineWidth = 4
		seCtx.moveTo(centerX-A/2*sescale, centerY/7+0.3*sescale+0.1*sescale)
		seCtx.moveTo(centerX-A/2*sescale+0.3*sescale, centerY/7+0.3*sescale+0.1*sescale)
		seCtx.lineTo(centerX-A/2*sescale-0.3*sescale, centerY/7+0.3*sescale+0.1*sescale)
		seCtx.stroke()
	seCtx.beginPath()
		seCtx.lineWidth = 4
		seCtx.moveTo(-0.05 * sescale + centerX-A/2*sescale-0.3*sescale+0.1*sescale, centerY/7+0.3*sescale+0.1*sescale)
		seCtx.lineTo(-0.05 * sescale + centerX-A/2*sescale-0.3*sescale+0.1*sescale+0.1*sescale, centerY/7+0.3*sescale+0.1*sescale+0.1*sescale)
		seCtx.moveTo(-0.05 * sescale + centerX-A/2*sescale-0.3*sescale+0.3*sescale, centerY/7+0.3*sescale+0.1*sescale)
		seCtx.lineTo(-0.05 * sescale + centerX-A/2*sescale-0.3*sescale+0.3*sescale+0.1*sescale, centerY/7+0.3*sescale+0.1*sescale+0.1*sescale)
		seCtx.moveTo(-0.05 * sescale + centerX-A/2*sescale-0.3*sescale+0.5*sescale, centerY/7+0.3*sescale+0.1*sescale)
		seCtx.lineTo(-0.05 * sescale + centerX-A/2*sescale-0.3*sescale+0.5*sescale+0.1*sescale, centerY/7+0.3*sescale+0.1*sescale+0.1*sescale)
		seCtx.stroke()
	seCtx.beginPath()
		seCtx.lineWidth = 4
		seCtx.moveTo(-0.05 * sescale + centerX+A/2*sescale-0.3*sescale+0.1*sescale, centerY/7+0.3*sescale+0.1*sescale)
		seCtx.lineTo(-0.05 * sescale + centerX+A/2*sescale-0.3*sescale+0.1*sescale+0.1*sescale, centerY/7+0.3*sescale+0.1*sescale+0.1*sescale)
		seCtx.moveTo(-0.05 * sescale + centerX+A/2*sescale-0.3*sescale+0.3*sescale, centerY/7+0.3*sescale+0.1*sescale)
		seCtx.lineTo(-0.05 * sescale + centerX+A/2*sescale-0.3*sescale+0.3*sescale+0.1*sescale, centerY/7+0.3*sescale+0.1*sescale+0.1*sescale)
		seCtx.moveTo(-0.05 * sescale + centerX+A/2*sescale-0.3*sescale+0.5*sescale, centerY/7+0.3*sescale+0.1*sescale)
		seCtx.lineTo(-0.05 * sescale + centerX+A/2*sescale-0.3*sescale+0.5*sescale+0.1*sescale, centerY/7+0.3*sescale+0.1*sescale+0.1*sescale)
		seCtx.stroke()
// ramalines
	seCtx.beginPath()
		seCtx.lineWidth = 2.5
		seCtx.moveTo(centerX+A/2*sescale, centerY/7+0.3*sescale)
		seCtx.lineTo(centerX+A/2*sescale, centerY/7+4*sescale)
		seCtx.closePath()
		seCtx.stroke()
	seCtx.beginPath()
		seCtx.lineWidth = 2.5
		seCtx.moveTo(centerX-A/2*sescale, centerY/7+0.3*sescale)
		seCtx.lineTo(centerX-A/2*sescale, centerY/7+4*sescale)
		seCtx.closePath()
		seCtx.stroke()
	seCtx.beginPath()
		seCtx.lineWidth = 4
		seCtx.moveTo(centerX-A/2*sescale, centerY/7+1.5*sescale)
		seCtx.lineTo(centerX+(A/2)*sescale, centerY/7+1.5*sescale)
		seCtx.closePath()
		seCtx.stroke()
	seCtx.beginPath()
		seCtx.lineWidth = 2
		seCtx.moveTo(centerX-A/2*sescale, centerY/7+1*sescale)
		seCtx.lineTo(centerX+(A/2)*sescale, centerY/7+1*sescale)
		seCtx.closePath()
		seCtx.stroke()
    seCtx.beginPath()
        seCtx.font = 'bold 24px GOST A';
        seCtx.fillStyle = 'black';
        seCtx.textAlign = 'center';
        seCtx.fillText('Q', centerX-A/2*sescale-0.2*sescale, centerY/7+4*sescale)
        seCtx.fillText('M', centerX-A/2*sescale-0.2*sescale, centerY/7+1.5*sescale)

        seCtx.stroke()
//size_arrows
	seCtx.beginPath()
		seCtx.lineWidth = 2
		seCtx.moveTo(centerX-A/2*sescale, centerY/7+1*sescale)
		seCtx.lineTo(centerX-A/2*sescale+0.1*sescale, centerY/7+1*sescale+0.1*sescale)
		seCtx.moveTo(centerX-A/2*sescale, centerY/7+1*sescale)
		seCtx.lineTo(centerX-A/2*sescale+0.1*sescale, centerY/7+1*sescale-0.1*sescale)
		seCtx.closePath()
		seCtx.stroke()
	seCtx.beginPath()
		seCtx.lineWidth = 2
		seCtx.moveTo(centerX+A/2*sescale, centerY/7+1*sescale)
		seCtx.lineTo(centerX+A/2*sescale-0.1*sescale, centerY/7+1*sescale-0.1*sescale)
		seCtx.moveTo(centerX+A/2*sescale, centerY/7+1*sescale)
		seCtx.lineTo(centerX+A/2*sescale-0.1*sescale, centerY/7+1*sescale+0.1*sescale)
		seCtx.closePath()
		seCtx.stroke()
// 2m
	seCtx.beginPath()
		seCtx.lineWidth = 2
		seCtx.font = 'bold 22px GOST A';
		seCtx.fillStyle = 'black';
		seCtx.textAlign = 'center';
		seCtx.fillText(String(A).replaceAll('.', ',')+' м', centerX, centerY/7+1*sescale-0.05*sescale)
		seCtx.stroke()
		seCtx.closePath()
		seCtx.stroke()
// load_arrows
	seCtx.beginPath()
		seCtx.lineWidth = 2
		// seCtx.moveTo(centerX-2*sescale, centerY/7-0.4*sescale)
		// seCtx.lineTo(centerX+(2)*sescale, centerY/7-0.4*sescale)
		for (let cvb = 1; cvb <= A/aVar-1; cvb++) {
			seCtx.moveTo(centerX-A/2*sescale + cvb*aVar*sescale, centerY/7-0.7*sescale)
			seCtx.lineTo(centerX-A/2*sescale + cvb*aVar*sescale, centerY/7)
			seCtx.moveTo(centerX-A/2*sescale + cvb*aVar*sescale, centerY/7)
			seCtx.lineTo(centerX-A/2*sescale + cvb*aVar*sescale-0.08*sescale, centerY/7-0.08*sescale)
			seCtx.moveTo(centerX-A/2*sescale + cvb*aVar*sescale, centerY/7)
			seCtx.lineTo(centerX-A/2*sescale + cvb*aVar*sescale+0.08*sescale, centerY/7-0.08*sescale)
			seCtx.font = 'bold 22px GOST A';
			seCtx.fillStyle = 'black';
			seCtx.textAlign = 'center';
			seCtx.fillText('F', centerX-A/2*sescale + cvb*aVar*sescale-0.2*sescale, centerY/7-0.4*sescale)
		}
		

		seCtx.closePath()
		seCtx.stroke()
// circles
	seCtx.beginPath()
		seCtx.arc(centerX-A/2*sescale+0.15*sescale, centerY/7+0.3*sescale, 0.1*sescale, 0, 2 * Math.PI, false);
		seCtx.fillStyle = "white"
		seCtx.fill()
		seCtx.lineWidth = 4
		seCtx.strokeStyle = 'black';
		seCtx.stroke()
	seCtx.beginPath()
		seCtx.arc(centerX-A/2*sescale-0.15*sescale, centerY/7+0.3*sescale, 0.1*sescale, 0, 2 * Math.PI, false);
		seCtx.fillStyle = "white"
		seCtx.fill()
		seCtx.lineWidth = 4
		seCtx.strokeStyle = 'black';
		seCtx.stroke()
	seCtx.beginPath()
		seCtx.arc(centerX-A/2*sescale, centerY/7, 0.1*sescale, 0, 2 * Math.PI, false);
		seCtx.fillStyle = "white"
		seCtx.fill()
		seCtx.lineWidth = 4
		seCtx.strokeStyle = 'black';
		seCtx.stroke()
	seCtx.beginPath()
		seCtx.arc(centerX+A/2*sescale, centerY/7, 0.1*sescale, 0, 2 * Math.PI, false);
		seCtx.fillStyle = "white"
		seCtx.fill()
		seCtx.lineWidth = 4
		seCtx.strokeStyle = 'black';
		seCtx.stroke()
	seCtx.beginPath()
		seCtx.arc(centerX-A/2*sescale+0.3*sescale, centerY/7+0.3*sescale, 0, 2 * Math.PI, false);
		seCtx.fillStyle = "white"
		seCtx.fill()
		seCtx.lineWidth = 4
		seCtx.strokeStyle = 'black';
		seCtx.stroke()
	seCtx.beginPath()
		seCtx.arc(centerX+A/2*sescale, centerY/7+0.3*sescale, 0.1*sescale, 0, 2 * Math.PI, false);
		seCtx.fillStyle = "white"
		seCtx.fill()
		seCtx.lineWidth = 4
		seCtx.strokeStyle = 'black';
		seCtx.stroke()
// Q epure
    seCtx.beginPath()
    seCtx.lineWidth = 4
    seCtx.moveTo(centerX-A/2*sescale,                           centerY/7+ 4*sescale)
    seCtx.lineTo(centerX-A/2*sescale,                           centerY/7+ 4*sescale-re()/Qsescaler*sescale)
    seCtx.stroke()
    for (let i = 0; i <= kof()-1; i++) {
        seCtx.beginPath()
        seCtx.lineWidth = 4
        seCtx.moveTo(centerX-A/2*sescale+aVar*sescale*i,                  centerY/7+ 4*sescale-re()/Qsescaler*sescale+i*F/Qsescaler*sescale)
        seCtx.lineTo(centerX-(A/2)*sescale+aVar*sescale+aVar*sescale*i,  centerY/7+ 4*sescale-re()/Qsescaler*sescale+i*F/Qsescaler*sescale)

        seCtx.font = 'bold 12px GOST A';
        seCtx.fillStyle = 'black';
        seCtx.textAlign = 'center';
        seCtx.fillText(String(Math.ceil((re()-i*F)*1000)/1000).replace('.',',')+'кН', centerX-(A/2)*sescale+aVar*sescale/2+aVar*sescale*i, centerY/7+ 4*sescale-re()/Qsescaler*sescale+i*F/Qsescaler*sescale-10)

        seCtx.moveTo(centerX-A/2*sescale+aVar*sescale+aVar*sescale*i,    centerY/7+ 4*sescale-re()/Qsescaler*sescale+i*F/Qsescaler*sescale)
        seCtx.lineTo(centerX-A/2*sescale+aVar*sescale+aVar*sescale*i,    centerY/7+ 4*sescale-re()/Qsescaler*sescale+(i+1)*F/Qsescaler*sescale)
        seCtx.closePath()
        seCtx.stroke()

        for (let ino = 0; ino < 5; ino++) {
            seCtx.beginPath()
            seCtx.lineWidth = 2
            seCtx.moveTo(centerX-A/2*sescale+aVar*sescale*i+ino*aVar/5*sescale,    centerY/7+ 4*sescale-re()/Qsescaler*sescale+i*F/Qsescaler*sescale)
            seCtx.lineTo(centerX-A/2*sescale+aVar*sescale*i+ino*aVar/5*sescale,    centerY/7+ 4*sescale)
            seCtx.closePath()
            seCtx.stroke()
        }

        for (let ino = 0; ino < 5; ino++) {
            seCtx.beginPath()
            seCtx.lineWidth = 2
            seCtx.moveTo(centerX+A/2*sescale-aVar*sescale*(i+1)+ino*aVar/5*sescale,    centerY/7+ 4*sescale+re()/Qsescaler*sescale-i*F/Qsescaler*sescale)
            seCtx.lineTo(centerX+A/2*sescale-aVar*sescale*(i+1)+ino*aVar/5*sescale,    centerY/7+ 4*sescale)
            seCtx.closePath()
            seCtx.stroke()
        }
        seCtx.beginPath()
        seCtx.lineWidth = 4
        seCtx.moveTo(centerX+A/2*sescale-aVar*sescale*i,                       centerY/7+ 4*sescale+re()/Qsescaler*sescale-i*F/Qsescaler*sescale)
        seCtx.lineTo(centerX+(A/2)*sescale-aVar*sescale-aVar*sescale*i,       centerY/7+ 4*sescale+re()/Qsescaler*sescale-i*F/Qsescaler*sescale)

        seCtx.font = 'bold 12px GOST A';
        seCtx.fillStyle = 'black';
        seCtx.textAlign = 'center';
        seCtx.fillText('-'+String(Math.ceil((re()-i*F)*1000)/1000).replace('.',',')+'кН', centerX+(A/2)*sescale-aVar*sescale/2-aVar*sescale*i, centerY/7+ 4*sescale+re()/Qsescaler*sescale-i*F/Qsescaler*sescale+25)
        seCtx.moveTo(centerX+(A/2)*sescale-aVar*sescale-aVar*sescale*i,       centerY/7+ 4*sescale+re()/Qsescaler*sescale-i*F/Qsescaler*sescale)
        seCtx.lineTo(centerX+A/2*sescale-aVar*sescale*(i+1),                   centerY/7+ 4*sescale+re()/Qsescaler*sescale-(i+1)*F/Qsescaler*sescale)
        seCtx.closePath()
        seCtx.stroke()
    }
    seCtx.beginPath()
    seCtx.moveTo(centerX+A/2*sescale,       centerY/7+ 4*sescale)
    seCtx.lineTo(centerX+A/2*sescale,       centerY/7+ 4*sescale+re()/Qsescaler*sescale)
    seCtx.moveTo(centerX-A/2*sescale,       centerY/7+4*sescale)
    seCtx.lineTo(centerX+(A/2)*sescale,     centerY/7+4*sescale)
    seCtx.closePath()
    seCtx.stroke()
// M epure
    if ((A/aVar) % 2 != 0) {
        for (let iw = 0; iw <= 2*kof(); iw++) {
            seCtx.beginPath()
            seCtx.lineWidth = 4
            seCtx.moveTo(centerX-A/2*sescale+aVar*sescale*iw,                  centerY/7+ 1.5*sescale+Mcalc(iw)/Msescaler*sescale)
            seCtx.lineTo(centerX-(A/2)*sescale+aVar*sescale+aVar*sescale*iw+1,  centerY/7+ 1.5*sescale+Mcalc(iw+1)/Msescaler*sescale)
            seCtx.font = 'bold 12px GOST A';
            seCtx.fillStyle = 'black';
            seCtx.textAlign = 'center';
            if (iw != 0) {
                seCtx.fillText(String(Math.ceil(Mcalc(iw)*1000)/1000).replace('.',',')+'кН', centerX-(A/2)*sescale+aVar*sescale*iw, centerY/7+ 1.5*sescale+Mcalc(iw)/Msescaler*sescale+25)
                seCtx.arc(centerX-(A/2)*sescale+aVar*sescale*iw, centerY/7+ 1.5*sescale+Mcalc(iw)/Msescaler*sescale, 0.04*sescale, 0, 2 * Math.PI, false);
            }

            seCtx.stroke()
            for (let ivi = 0; ivi < 5; ivi++) {
                seCtx.beginPath()
                seCtx.lineWidth = 2
                seCtx.moveTo(centerX-A/2*sescale+aVar*sescale*iw + aVar/5*ivi*sescale, centerY/7+ 1.5*sescale)
                seCtx.lineTo(centerX-A/2*sescale+aVar*sescale*iw + aVar/5*ivi*sescale,  centerY/7+ 1.5*sescale+Mcalc(iw)/Msescaler*sescale+(Mcalc(iw+1)-Mcalc(iw))/5/Msescaler*sescale*ivi)
                seCtx.stroke()
            }
        }
    } else {
        for (let iw = 0; iw <= 2*kof()-1; iw++) {
            if (iw != 0) {
                seCtx.beginPath()
                seCtx.fillText(String(Math.ceil(Mcalc(iw)*1000)/1000).replace('.',',')+'кН', centerX-(A/2)*sescale+aVar*sescale*iw, centerY/7+ 1.5*sescale+Mcalc(iw)/Msescaler*sescale+25)
                seCtx.arc(centerX-(A/2)*sescale+aVar*sescale*iw, centerY/7+ 1.5*sescale+Mcalc(iw)/Msescaler*sescale, 0.04*sescale, 0, 2 * Math.PI, false);
                seCtx.stroke()

            }
            for (let ivi = 0; ivi < 5; ivi++) {
                seCtx.beginPath()
                seCtx.lineWidth = 2
                seCtx.moveTo(centerX-A/2*sescale+aVar*sescale*iw + aVar/5*ivi*sescale, centerY/7+ 1.5*sescale)
                seCtx.lineTo(centerX-A/2*sescale+aVar*sescale*iw + aVar/5*ivi*sescale,  centerY/7+ 1.5*sescale+Mcalc(iw)/Msescaler*sescale+(Mcalc(iw+1)-Mcalc(iw))/5/Msescaler*sescale*ivi)
                seCtx.stroke()
            }
            seCtx.beginPath()
            seCtx.lineWidth = 4
            seCtx.moveTo(centerX-A/2*sescale+aVar*sescale*iw,                  centerY/7+ 1.5*sescale+Mcalc(iw)/Msescaler*sescale)
            seCtx.lineTo(centerX-(A/2)*sescale+aVar*sescale+aVar*sescale*iw+1,  centerY/7+ 1.5*sescale+Mcalc(iw+1)/Msescaler*sescale)
            seCtx.font = 'bold 12px GOST A';
            seCtx.fillStyle = 'black';
            seCtx.textAlign = 'center';
            seCtx.stroke()
        }
    }
}

function redrawSocondBeamEpure() {
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


	if (normality) {
		F = sest_beam*aVar*bVar
		drawSocondBeamEpure()
		rEpuro.shadowRoot.getElementById('sec_epure_sw').style.backgroundColor = '#52CC76'
		rEpuro.shadowRoot.getElementById('sec_epure_sw').innerText = 'Построить\nнормативные эпюры'
		normality--
	} else {
		F = seco_beam*aVar*bVar
		drawSocondBeamEpure()
		rEpuro.shadowRoot.getElementById('sec_epure_sw').style.backgroundColor = '#CC5289'
		rEpuro.shadowRoot.getElementById('sec_epure_sw').innerText = 'Построить\nрасчетные эпюры'
		normality++
	}
}

rEpuro.shadowRoot.getElementById('sec_epuring').addEventListener("click", () => {
    generateSecEpure()})
rEpuro.shadowRoot.getElementById('sec_epure_only').addEventListener("click", () => {
    exportSecEpure()})
rEpuro.shadowRoot.getElementById('sec_epure_sw').addEventListener("click", () => {
    redrawSocondBeamEpure()})

function exportSecEpure() {
    const a = document.createElement("a");
    a.href = seCanvas.toDataURL("image/jpg");
    a.download = "secondary_beam_epure.jpg";
    a.click();
}

function pushSecEpure() {
	sedataUrl = seCanvas.toDataURL("image/png");
	sesnapshot = [];
	({ sepdata } = sedataURLtoUint8Array(sedataUrl))
    sesnapshot = sedataURLtoUint8Array(sedataUrl).sepdata;
}


function tr(a) {
    let triangle = 0
    for (let i = 1; i <= a; i++) {
        triangle += i
    }
    return triangle
}
function re() {
    let f = A/aVar - 1
    let R = f*F/2
    return R
}
function kof() {
    let x = A/aVar
    let n
    if (x % 2 == 0) {
        n = x/2
    } else {
        n = (x-1)/2
    }
    return n
}
function Mcalc(i) {
    let M_o
    M_o = (re()*i*aVar) - (tr(i-1)*F*aVar)
    return M_o
}

function createSecEpure() {
	secondaryBeamChildren = []
	if (normality) {
		redrawSocondBeamEpure()
	}
    pushSecEpure()
    secondaryBeamChildren.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new ImageRun({
                    data: sesnapshot,
                    transformation: {
                        width:  550, // Ширина в пикселях в документе
                        height: 450, // Высота в пикселях в документе
                    },
                    size: 28,
                }),
            ],
        })
    )
	if (secep_varo.value == 1) {
		secondaryBeamChildren.push(
			new Paragraph({
				alignment: AlignmentType.CENTER,
				spacing: {
					line: 360, // Полуторный интервал для ВСЕГО документа
					before: 0,
					after: 0,
				},
				children: [
					new TextRun({
						text: 'Рис.6 - Расчетная схема второстепенной балки (В1)'
					}),
				]
			}),
			new Paragraph({}),
		)
    } else if (secep_varo.value == 2) {
		secondaryBeamChildren.push(
			new Paragraph({
				alignment: AlignmentType.CENTER,
				spacing: {
					line: 360, // Полуторный интервал для ВСЕГО документа
					before: 0,
					after: 0,
				},
				children: [
					new TextRun({
						text: 'Рис.12 - Расчетная схема второстепенной балки (В2)'
					}),
				]
			}),
			new Paragraph({}),
		)
	} else if (secep_varo.value == 3) {
		secondaryBeamChildren.push(
			new Paragraph({
				alignment: AlignmentType.CENTER,
				spacing: {
					line: 360, // Полуторный интервал для ВСЕГО документа
					before: 0,
					after: 0,
				},
				children: [
					new TextRun({
						text: 'Рис.18 - Расчетная схема второстепенной балки (В3)'
					}),
				]
			}),
			new Paragraph({}),
		)
	}
    
	secondaryBeamChildren.push(
        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                M_max_eqo, 
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
                    text: 'Требуемый момент сопротивления определяется по формуле:'
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
                Wneedsec, 
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
                    text: 'По ГОСТ 26020-83 выбирается двутавр №' + sec_beamchey.number + '  '
                }),
                mFormula(
                    mParen(mSub('W', 'x'), mEq(),
                    String(Math.ceil(sec_beamchey.Wx*1000)/1000).replace('.',','), mSup('см', '3'))
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
                sec_roof_parameters, 
                new TextRun({
                    text: '.'
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
                sec_power_check, 
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
                sec_power_check_сalc, 
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
                sec_power_check_end,
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
	)
	redrawSocondBeamEpure()
	let M_n_maxo_eqo = mFormula(
    	mSup(
    	    mSub("M", "max"),
    	    "н"
    	),
    	mEq(),
    	String(Math.ceil(Mcalc(kof())*1000)/1000).replace('.',','),
    	" кНм"
	)
	pushSecEpure()

	redrawSocondBeamEpure()
	secondaryBeamChildren.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new ImageRun({
                    data: sesnapshot,
                    transformation: {
                        width:  550, // Ширина в пикселях в документе
                        height: 450, // Высота в пикселях в документе
                    },
                    size: 28,
                }),
            ],
        })
	)
	if (secep_varo.value == 1) {
		secondaryBeamChildren.push(
        	new Paragraph({
        	    alignment: AlignmentType.CENTER,
        	    spacing: {
        	        line: 360, // Полуторный интервал для ВСЕГО документа
        	        before: 0,
        	        after: 0,
        	    },
        	    children: [
        	        new TextRun({
        	            text: 'Рис.7 - Нормативная схема балки настила (В1)'
        	        }),
        	    ]
        	}),
        	new Paragraph({}),
		)
	} else if (secep_varo.value == 2) {
		secondaryBeamChildren.push(
        	new Paragraph({
        	    alignment: AlignmentType.CENTER,
        	    spacing: {
        	        line: 360, // Полуторный интервал для ВСЕГО документа
        	        before: 0,
        	        after: 0,
        	    },
        	    children: [
        	        new TextRun({
        	            text: 'Рис.13 - Нормативная схема балки настила (В2)'
        	        }),
        	    ]
        	}),
        	new Paragraph({}),
		)
	} else if (secep_varo.value == 3) {
		secondaryBeamChildren.push(
        	new Paragraph({
        	    alignment: AlignmentType.CENTER,
        	    spacing: {
        	        line: 360, // Полуторный интервал для ВСЕГО документа
        	        before: 0,
        	        after: 0,
        	    },
        	    children: [
        	        new TextRun({
        	            text: 'Рис.19 - Нормативная схема балки настила (В3)'
        	        }),
        	    ]
        	}),
        	new Paragraph({}),
		)
	}
	
	secondaryBeamChildren.push(
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
                before: 0,
                after: 120,
                line: 360,
                lineRule: LineRuleType.AUTO,
            },
            indent: {
                firstLine: 709,
            },
            children: [
                new TextRun("Предельный относительный прогиб второстепенной балки принят равным 1/200 в соответствии с эстетико-психологическими требованиями.")
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
                sec_deflection_formula, 
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
                line: 360,
                before: 0,
                after: 0,
            },
            children: [
                M_n_maxo_eqo, 
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
            children: [
                mFormula(mSub('l','вб')),
                new TextRun(" — пролёт второстепенной балки,")
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
                new TextRun(" — момент инерции сечения второстепенной балки,")
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
	secondaryBeamChildren.push(
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
	secondaryBeamChildren.push(
		new Paragraph({
		    alignment: AlignmentType.CENTER,
		    spacing: {
		        line: 360, // Полуторный интервал для ВСЕГО документа
		        before: 0,
		        after: 0,
		    },
		    children: [
		        new TextRun({
		             text: 'Проверка на прочность от местного давления:', bold: true
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
		        mFormula(mSub("H", "вб")), 
		        new TextRun({
		            text: ' — расстояние от нагруженной грани полки до начала внутреннего закругления стенки;'
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
		        sec_loc_param1, 
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
		        sec_loc_param2, 
		        new TextRun({
		            text: ' — ширина полки второстепенной балки;'
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
		        mFormula(mSub("l", "ef"),), 
		        new TextRun({
		            text: ' — условная длина распределения нагрузки;  '
		        }),
		        mFormula("s"), 
		        new TextRun({
		            text: ' — толщина стенки;'
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
		        sec_loc_param3, 
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
		        sec_loc_check, 
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
			        text: 'Условие прочности от местного давления выполняется.'
			    })
			]
		})
	)
	secondaryBeamChildren.push(
		new Paragraph({
			alignment: AlignmentType.CENTER,
			spacing: {
				line: 360,
				before: 0,
				after: 0,
			},
			children: [
				new TextRun({
					text: 'Проверка общей устойчивости балки:', bold: true
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
			indent: {
				firstLine: 709,
			},
			children: [
				new TextRun({
					text: 'Согласно п. 8.4.4 и табл. 11 из СП 16.13330, проверка общей устойчивости балки не требуется если выполняется условие '
				}),
				mFormula(
					mSub(mBar("λ"), "b"),
					" < ",
					mSub(mBar("λ"), "ub"),
				),
				new TextRun({
					text: '.'
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
				sec_overall_feat,
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
				mFormula('h'), 
				new TextRun({
					text: ' — высота профиля;  '
				}),
				mFormula(mSup('h','*')), 
				new TextRun({
					text: ' — расстояние между внутренними гранями;'
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
				mFormula('b'), 
				new TextRun({
					text: ' — ширина сжатого пояса;  '
				}),
				mFormula('t'), 
				new TextRun({
					text: ' — толщина сжатого пояса;'
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
				h_form_count,
				new TextRun({
					text: ';   '
				}),
				mFormula(mFrac('b','t'), mEq(), String(Math.ceil(sec_beamchey.b/sec_beamchey.t*1000)/1000).replace('.',',')),
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
			indent: {
				firstLine: 709,
			},
			children: [
				new TextRun({
					text: 'Для балок соотношением '
				}),
				mFormula(mFrac('b','t'), ' < ', '15'),
				new TextRun({
					text: ' в формулах таблицы 11'
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
				new TextRun({
					text: ' из СП 16.13330.2017 следует принимать '
				}),
				mFormula(mFrac('b','t'), mEq(), '15.')
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
				sec_overall_calc, 
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
			indent: {
				firstLine: 709,
			},
			children: [
				new TextRun({
					text: 'Значения '
				}),
				mFormula(
					mSub(mBar("λ"), "ub") 
				),
				new TextRun({
					text: ' умножаются на коэффициент '
				}),
				mFormula(
				    mSqrt(
				        mFrac(
				            mSub("R", "y"),
				            "σ"
				        ),
				    ),
				    ","
				),
				new TextRun({
					text: '  где  '
				}),
				mFormula(
				    "σ",
				    mEq(),
				    mFrac(
				        mSub("W", "max"),
				        mGroup(
				            mSub("W", "x"),
				            mSub("γ", "c")
				        )
				    )
				),
				new TextRun({
					text: '.'
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
				sec_some_sigma, 
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
				lambdaUber, 
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
				lambdaDefault, 
				new TextRun({
					text: ' '
				})
			]
		}),
	)
	if (lambdaDefault_res < lambdaUbFixed) {
		secondaryBeamChildren.push(
			new Paragraph({
				alignment: AlignmentType.JUSTIFIED,
				spacing: {
					line: 360,
					before: 0,
					after: 0,
				},
				children: [
					mFormula(
						String(Math.ceil(lambdaDefault_res*1000)/1000).replace('.',','),
						" < ",
						String(Math.ceil(lambdaUbFixed*1000)/1000).replace('.',','),
					), 
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
				        text: 'Условие общей устойчивости выполняется.'
				    }),
				    new PageBreak()
				]
			})
		)
	}
}

function generateSecEpure() {
    createSecEpure()
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
                children: secondaryBeamChildren
            },
        ],
    });
    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "Secondary_epure.docx");
    });
    secondaryBeamChildren = []
}



const secep_varo = rEpuro.shadowRoot.getElementById('secep_varo')
// secep_varo.addEventListener("click", () => {
//     changeSecEpureVar()
// });


init.shadowRoot.addEventListener('input', (event) => {
	doingSecEpures();
});
floor.shadowRoot.addEventListener('input', (event) => {
	doingSecEpures();
});
vargen.shadowRoot.addEventListener('input', (event) => {
	doingSecEpures();
});
vargen.shadowRoot.getElementById('varGen').addEventListener("click", () => {
	doingSecEpures();
});


function changeSecEpureVar() {
	if (secep_varo.value == 1) {
		secvaro = 1
		doingSecEpures()
	} else if (secep_varo.value == 2) {
		secvaro = 2
		doingSecEpures()
	} else if (secep_varo.value == 3) {
		secvaro = 3
		doingSecEpures()
	}
}
