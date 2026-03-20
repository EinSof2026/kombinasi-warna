es.Add = res.Add || []; res.Add[i] = Math.min(255, c1 + c2);
            res.Multiply = res.Multiply || []; res.Multiply[i] = (c1 * c2) / 255;
            res.Screen = res.Screen || []; res.Screen[i] = 255 - ((255 - c1) * (255 - c2) / 255);
            res.Darken = res.Darken || []; res.Darken[i] = Math.min(c1, c2);
            res.Lighten = res.Lighten || []; res.Lighten[i] = Math.max(c1, c2);
            res.Difference = res.Difference || []; res.Difference[i] = Math.abs(c1 - c2);
            res.Exclusion = res.Exclusion || []; res.Exclusion[i] = c1 + c2 - 2 * c1 * c2 / 255;
            res.Overlay = res.Overlay || []; 
            res.Overlay[i] = c1 < 128 ? (2 * c1 * c2 / 255) : (255 - 2 * (255 - c1) * (255 - c2) / 255);
            res.HardLight = res.HardLight || []; 
            res.HardLight[i] = c2 < 128 ? (2 * c1 * c2 / 255) : (255 - 2 * (255 - c1) * (255 - c2) / 255);
            res.ColorDodge = res.ColorDodge || []; res.ColorDodge[i] = c2 === 255 ? 255 : Math.min(255, (c1 << 8) / (255 - c2));
            res.ColorBurn = res.ColorBurn || []; res.ColorBurn[i] = c2 === 0 ? 0 : Math.max(0, 255 - ((255 - c1) << 8) / c2);
            res.SoftLight = res.SoftLight || [];
            res.SoftLight[i] = ((255 - c2) * c1 * c2 / 255 + c2 * (255 - (255 - c1) * (255 - c2) / 255)) / 255;
        }

        res.Hue = hslToRgb(hslB[0], hslA[1], hslA[2]);
        res.Color = hslToRgb(hslB[0], hslB[1], hslA[2]);
        res.Luminosity = hslToRgb(hslA[0], hslA[1], hslB[2]);

        modes.forEach(tipe => {
            const hex = rgbToHex(res[tipe][0], res[tipe][1], res[tipe][2]);
            const box = document.getElementById('box' + tipe);
            const kode = document.getElementById('kode' + tipe) || document.getElementById('teks' + tipe);
            if (box) {
                box.style.backgroundColor = hex;
                box.style.color = getInvertColor(hex.replace('#',''));
            }
            if (kode) kode.innerText = hex;
        });
    } else {
        modes.forEach(tipe => {
            const box = document.getElementById('box' + tipe);
            const kode = document.getElementById('kode' + tipe) || document.getElementById('teks' + tipe);
            if (box) {
                box.style.backgroundColor = ""; 
                box.style.color = "";
            }
            if (kode) kode.innerText = "#FFFFFF";
        });
    }
}

function tukar() {
    const i1 = document.getElementById('input1'), i2 = document.getElementById('input2');
    const temp = i1.value;
    i1.value = i2.value;
    i2.value = temp;
    hitungWarna();
}

let touchStartX = 0;
let touchEndX = 0;
let currentKamar = 0;
const totalKamar = 4;
const slider = document.querySelector('.slider-container');

slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, {passive: true});

function handleSwipe() {
    const threshold = slider.offsetWidth * 0.45; 
    const jarakUsap = touchStartX - touchEndX;

    if (Math.abs(jarakUsap) > threshold) {
        if (jarakUsap > 0 && currentKamar < totalKamar - 1) {
            currentKamar++;
        } else if (jarakUsap < 0 && currentKamar > 0) {
            currentKamar--;
        }
    }
    updateSliderPosition();
}

function updateSliderPosition() {
    const width = slider.offsetWidth;
    slider.scrollTo({
        left: width * currentKamar,
        behavior: 'smooth'
    });
}

window.addEventListener('resize', updateSliderPosition);

function v(){
  var penjelasan = document.getElementById("penjelasan");
  penjelasan.style.visibility = "visible";
  penjelasan.style.opacity = "1";
  penjelasan.style.top = "0";
  penjelasan.style.left = "0";
  penjelasan.style.transform = "scale(1)";
  penjelasan.style.transition = "0.8s";
  document.getElementById("vevet").style.visibility = "visible";
  document.getElementById("v").style.visibility = "hidden";
  var v1 = document.getElementById("v1");
  v1.style.transform = "rotateX(180deg) scaleX(2.5)";
  v1.style.top = "28px";
}

function vevet(){
  var penjelasan = document.getElementById("penjelasan");
  penjelasan.style.visibility = "";
  penjelasan.style.opacity = "";
  penjelasan.style.top = "";
  penjelasan.style.left = "";
  penjelasan.style.transform = "";
  penjelasan.style.transition = "0.8s";
  document.getElementById("vevet").style.visibility = "hidden";
  document.getElementById("v").style.visibility = "visible";
  var v1 = document.getElementById("v1");
  v1.style.transform = "";
  v1.style.top = "";
    }    else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1; if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [r * 255, g * 255, b * 255];
}

function hitungWarna() {
    const in1 = document.getElementById('input1'), in2 = document.getElementById('input2');
    const p1 = document.getElementById('pagarr1'), p2 = document.getElementById('pagarr2');
    const v1 = in1.value, v2 = in2.value;

    [ [in1, p1, v1], [in2, p2, v2] ].forEach(([el, pag, val]) => {
        if (val.length === 6) {
            const inv = getInvertColor(val);
            const rgb = hexToRgb(val);
            el.style.backgroundColor = pag.style.backgroundColor = '#' + val;
            el.style.color = pag.style.color = inv;
            el.style.boxShadow = pag.style.boxShadow = `0 10px 16px rgba(${rgb.join(',')}, 0.5)`;
        } else {
            el.style.backgroundColor = pag.style.backgroundColor = "";
            el.style.color = pag.style.color = "";
            el.style.boxShadow = pag.style.boxShadow = "";
        }
    });

    const modes = ["Normal", "Add", "Multiply", "Screen", "Darken", "Lighten", "ColorDodge", "ColorBurn", "HardLight", "SoftLight", "Difference", "Exclusion", "Hue", "Color", "Luminosity", "Overlay"];

    if (v1.length === 6 && v2.length === 6) {
        const a = hexToRgb(v1), b = hexToRgb(v2);
        const hslA = rgbToHsl(a[0], a[1], a[2]), hslB = rgbToHsl(b[0], b[1], b[2]);
        const res = {};

        for (let i = 0; i < 3; i++) {
            const c1 = a[i], c2 = b[i];
            res.Normal = res.Normal || []; res.Normal[i] = (c1 + c2) / 2;
            res.Add = res.Add || []; res.Add[i] = Math.min(255, c1 + c2);
            res.Multiply = res.Multiply || []; res.Multiply[i] = (c1 * c2) / 255;
            res.Screen = res.Screen || []; res.Screen[i] = 255 - ((255 - c1) * (255 - c2) / 255);
            res.Darken = res.Darken || []; res.Darken[i] = Math.min(c1, c2);
            res.Lighten = res.Lighten || []; res.Lighten[i] = Math.max(c1, c2);
            res.Difference = res.Difference || []; res.Difference[i] = Math.abs(c1 - c2);
            res.Exclusion = res.Exclusion || []; res.Exclusion[i] = c1 + c2 - 2 * c1 * c2 / 255;
            res.Overlay = res.Overlay || []; 
            res.Overlay[i] = c1 < 128 ? (2 * c1 * c2 / 255) : (255 - 2 * (255 - c1) * (255 - c2) / 255);
            res.HardLight = res.HardLight || []; 
            res.HardLight[i] = c2 < 128 ? (2 * c1 * c2 / 255) : (255 - 2 * (255 - c1) * (255 - c2) / 255);
            res.ColorDodge = res.ColorDodge || []; res.ColorDodge[i] = c2 === 255 ? 255 : Math.min(255, (c1 << 8) / (255 - c2));
            res.ColorBurn = res.ColorBurn || []; res.ColorBurn[i] = c2 === 0 ? 0 : Math.max(0, 255 - ((255 - c1) << 8) / c2);
            res.SoftLight = res.SoftLight || [];
            res.SoftLight[i] = ((255 - c2) * c1 * c2 / 255 + c2 * (255 - (255 - c1) * (255 - c2) / 255)) / 255;
        }

        res.Hue = hslToRgb(hslB[0], hslA[1], hslA[2]);
        res.Color = hslToRgb(hslB[0], hslB[1], hslA[2]);
        res.Luminosity = hslToRgb(hslA[0], hslA[1], hslB[2]);

        modes.forEach(tipe => {
            const hex = rgbToHex(res[tipe][0], res[tipe][1], res[tipe][2]);
            const box = document.getElementById('box' + tipe);
            const kode = document.getElementById('kode' + tipe) || document.getElementById('teks' + tipe);
            if (box) {
                box.style.backgroundColor = hex;
                box.style.color = getInvertColor(hex.replace('#',''));
            }
            if (kode) kode.innerText = hex;
        });
    } else {
        modes.forEach(tipe => {
            const box = document.getElementById('box' + tipe);
            const kode = document.getElementById('kode' + tipe) || document.getElementById('teks' + tipe);
            if (box) {
                box.style.backgroundColor = ""; 
                box.style.color = "";
            }
            if (kode) kode.innerText = "#FFFFFF";
        });
    }
}

function tukar() {
    const i1 = document.getElementById('input1'), i2 = document.getElementById('input2');
    const temp = i1.value;
    i1.value = i2.value;
    i2.value = temp;
    hitungWarna();
}

let touchStartX = 0;
let touchEndX = 0;
let currentKamar = 0;
const totalKamar = 4;
const slider = document.querySelector('.slider-container');

slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, {passive: true});

function handleSwipe() {
    const threshold = slider.offsetWidth * 0.45; 
    const jarakUsap = touchStartX - touchEndX;

    if (Math.abs(jarakUsap) > threshold) {
        if (jarakUsap > 0 && currentKamar < totalKamar - 1) {
            currentKamar++;
        } else if (jarakUsap < 0 && currentKamar > 0) {
            currentKamar--;
        }
    }
    updateSliderPosition();
}

function updateSliderPosition() {
    const width = slider.offsetWidth;
    slider.scrollTo({
        left: width * currentKamar,
        behavior: 'smooth'
    });
}

window.addEventListener('resize', updateSliderPosition);
function hexToRgb(hex) {
    let bigint = parseInt(hex, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToHex(r, g, b) {
    r = Math.max(0, Math.min(255, Math.round(r)));
    g = Math.max(0, Math.min(255, Math.round(g)));
    b = Math.max(0, Math.min(255, Math.round(b)));
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
}

function getInvertColor(hex) {
    let rgb = hexToRgb(hex);
    return rgbToHex(255 - rgb[0], 255 - rgb[1], 255 - rgb[2]);
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; } 
    else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h /= 6;
    }
    return [h, s, l];
}

function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) { r = g = b = l; } 
    else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1; if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [r * 255, g * 255, b * 255];
}

function hitungWarna() {
    const in1 = document.getElementById('input1'), in2 = document.getElementById('input2');
    const p1 = document.getElementById('pagarr1'), p2 = document.getElementById('pagarr2');
    const v1 = in1.value, v2 = in2.value;

    [ [in1, p1, v1], [in2, p2, v2] ].forEach(([el, pag, val]) => {
        if (val.length === 6) {
            const inv = getInvertColor(val);
            const rgb = hexToRgb(val);
            el.style.backgroundColor = pag.style.backgroundColor = '#' + val;
            el.style.color = pag.style.color = inv;
            el.style.boxShadow = pag.style.boxShadow = `0 10px 16px rgba(${rgb.join(',')}, 0.5)`;
        } else {
            el.style.backgroundColor = pag.style.backgroundColor = "";
            el.style.color = pag.style.color = "";
            el.style.boxShadow = pag.style.boxShadow = "";
        }
    });

    const modes = ["Normal", "Add", "Multiply", "Screen", "Darken", "Lighten", "ColorDodge", "ColorBurn", "HardLight", "SoftLight", "Difference", "Exclusion", "Hue", "Color", "Luminosity", "Overlay"];

    if (v1.length === 6 && v2.length === 6) {
        const a = hexToRgb(v1), b = hexToRgb(v2);
        const hslA = rgbToHsl(a[0], a[1], a[2]), hslB = rgbToHsl(b[0], b[1], b[2]);
        const res = {};

        for (let i = 0; i < 3; i++) {
            const c1 = a[i], c2 = b[i];
            res.Normal = res.Normal || []; res.Normal[i] = (c1 + c2) / 2;
            res.Add = res.Add || []; res.Add[i] = Math.min(255, c1 + c2);
            res.Multiply = res.Multiply || []; res.Multiply[i] = (c1 * c2) / 255;
            res.Screen = res.Screen || []; res.Screen[i] = 255 - ((255 - c1) * (255 - c2) / 255);
            res.Darken = res.Darken || []; res.Darken[i] = Math.min(c1, c2);
            res.Lighten = res.Lighten || []; res.Lighten[i] = Math.max(c1, c2);
            res.Difference = res.Difference || []; res.Difference[i] = Math.abs(c1 - c2);
            res.Exclusion = res.Exclusion || []; res.Exclusion[i] = c1 + c2 - 2 * c1 * c2 / 255;
            res.Overlay = res.Overlay || []; 
            res.Overlay[i] = c1 < 128 ? (2 * c1 * c2 / 255) : (255 - 2 * (255 - c1) * (255 - c2) / 255);
            res.HardLight = res.HardLight || []; 
            res.HardLight[i] = c2 < 128 ? (2 * c1 * c2 / 255) : (255 - 2 * (255 - c1) * (255 - c2) / 255);
            res.ColorDodge = res.ColorDodge || []; res.ColorDodge[i] = c2 === 255 ? 255 : Math.min(255, (c1 << 8) / (255 - c2));
            res.ColorBurn = res.ColorBurn || []; res.ColorBurn[i] = c2 === 0 ? 0 : Math.max(0, 255 - ((255 - c1) << 8) / c2);
            res.SoftLight = res.SoftLight || [];
            res.SoftLight[i] = ((255 - c2) * c1 * c2 / 255 + c2 * (255 - (255 - c1) * (255 - c2) / 255)) / 255;
        }

        res.Hue = hslToRgb(hslB[0], hslA[1], hslA[2]);
        res.Color = hslToRgb(hslB[0], hslB[1], hslA[2]);
        res.Luminosity = hslToRgb(hslA[0], hslA[1], hslB[2]);

        modes.forEach(tipe => {
            const hex = rgbToHex(res[tipe][0], res[tipe][1], res[tipe][2]);
            const box = document.getElementById('box' + tipe);
            const kode = document.getElementById('kode' + tipe) || document.getElementById('teks' + tipe);
            if (box) {
                box.style.backgroundColor = hex;
                box.style.color = getInvertColor(hex.replace('#',''));
            }
            if (kode) kode.innerText = hex;
        });
    } else {
        modes.forEach(tipe => {
            const box = document.getElementById('box' + tipe);
            const kode = document.getElementById('kode' + tipe) || document.getElementById('teks' + tipe);
            if (box) {
                box.style.backgroundColor = ""; 
                box.style.color = "";
            }
            if (kode) kode.innerText = "#FFFFFF";
        });
    }
}

function tukar() {
    const i1 = document.getElementById('input1'), i2 = document.getElementById('input2');
    const temp = i1.value;
    i1.value = i2.value;
    i2.value = temp;
    hitungWarna();
}

let touchStartX = 0;
let touchEndX = 0;
let currentKamar = 0;
const totalKamar = 4;
const slider = document.querySelector('.slider-container');

slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, {passive: true});

function handleSwipe() {
    const threshold = slider.offsetWidth * 0.45; 
    const jarakUsap = touchStartX - touchEndX;

    if (Math.abs(jarakUsap) > threshold) {
        if (jarakUsap > 0 && currentKamar < totalKamar - 1) {
            currentKamar++;
        } else if (jarakUsap < 0 && currentKamar > 0) {
            currentKamar--;
        }
    }
    updateSliderPosition();
}

function updateSliderPosition() {
    const width = slider.offsetWidth;
    slider.scrollTo({
        left: width * currentKamar,
        behavior: 'smooth'
    });
}

window.addEventListener('resize', updateSliderPosition);

function v(){
  var penjelasan = document.getElementById("penjelasan");
  penjelasan.style.visibility = "visible";
  penjelasan.style.opacity = "1";
  penjelasan.style.top = "0";
  penjelasan.style.left = "0";
  penjelasan.style.transform = "scale(1)";
  penjelasan.style.transition = "0.8s";
  document.getElementById("vevet").style.visibility = "visible";
  document.getElementById("v").style.visibility = "hidden";
  var v1 = document.getElementById("v1");
  v1.style.transform = "rotateX(180deg) scaleX(2.5)";
  v1.style.top = "28px";
}

function vevet(){
  var penjelasan = document.getElementById("penjelasan");
  penjelasan.style.visibility = "";
  penjelasan.style.opacity = "";
  penjelasan.style.top = "";
  penjelasan.style.left = "";
  penjelasan.style.transform = "";
  penjelasan.style.transition = "0.8s";
  document.getElementById("vevet").style.visibility = "hidden";
  document.getElementById("v").style.visibility = "visible";
  var v1 = document.getElementById("v1");
  v1.style.transform = "";
  v1.style.top = "";
            }
