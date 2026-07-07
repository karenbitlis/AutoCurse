function mText(text) {
    const r = new XmlComponent("m:r");
    const t = new XmlComponent("m:t");

    t.root.push(text);
    r.root.push(t);

    return r;
}

function mNormalize(item) {

    if (item == null)
        return [];

    if (Array.isArray(item))
        return item.flatMap(mNormalize);

    if (typeof item === "string")
        return [mText(item)];

    return [item];
}

function mGroup(...items) {
    return items.flatMap(mNormalize);
}


// ---------- ИНДЕКСЫ ----------

function mSub(base, sub) {

    const obj = new XmlComponent("m:sSub");

    const e = new XmlComponent("m:e");
    const s = new XmlComponent("m:sub");

    e.root.push(...mGroup(base));
    s.root.push(...mGroup(sub));

    obj.root.push(e);
    obj.root.push(s);

    return obj;
}

function mSup(base, sup) {

    const obj = new XmlComponent("m:sSup");

    const e = new XmlComponent("m:e");
    const s = new XmlComponent("m:sup");

    e.root.push(...mGroup(base));
    s.root.push(...mGroup(sup));

    obj.root.push(e);
    obj.root.push(s);

    return obj;
}


// ---------- ДРОБЬ ----------

function mFrac(num, den) {

    const obj = new XmlComponent("m:f");

    const n = new XmlComponent("m:num");
    const d = new XmlComponent("m:den");

    n.root.push(...mGroup(num));
    d.root.push(...mGroup(den));

    obj.root.push(n);
    obj.root.push(d);

    return obj;
}


// ---------- СКОБКИ ----------

function mParen(...content) {

    const obj = new XmlComponent("m:d");

    const e = new XmlComponent("m:e");

    e.root.push(...mGroup(...content));

    obj.root.push(e);

    return obj;
}


// ---------- ФОРМУЛА ----------

function mFormula(...content) {

    const obj = new XmlComponent("m:oMath");

    obj.root.push(...mGroup(...content));

    return obj;
}

function mSquareParen(...content) {

    const obj = new XmlComponent("m:d");

    const dPr = new XmlComponent("m:dPr");

    const begChr = new XmlComponent("m:begChr");
    begChr.root.push({
        _attr: {
            "m:val": "["
        }
    });

    const endChr = new XmlComponent("m:endChr");
    endChr.root.push({
        _attr: {
            "m:val": "]"
        }
    });

    dPr.root.push(begChr, endChr);

    const e = new XmlComponent("m:e");
    e.root.push(...mGroup(...content));

    obj.root.push(dPr, e);

    return obj;
}

// ---------- СОКРАЩЕНИЯ ----------

function mEq() {
    return " = ";
}

function mPlus() {
    return " + ";
}

function mMinus() {
    return " − ";
}

function mMul() {
    return "·";
}

function mComma() {
    return ", ";
}