function generateLevel() {
    bros.length = 0;

    switch (level) {
        case 0: {
            const dist = 16;
            var candidates = [E_MARIO,E_LUIGI,E_WARIO,E_YOSHI];
            Helpers.scrambleArray(candidates);

            bros.push(new Bro(W/2 - dist, SH/2 - dist, 0, candidates[0], 0));
            bros.push(new Bro(W/2 + dist, SH/2 - dist, 0, candidates[1], 0));
            bros.push(new Bro(W/2 - dist, SH/2 + dist, 0, candidates[2], 0));
            bros.push(new Bro(W/2 + dist, SH/2 + dist, 0, candidates[3], 0));
            break;
        } 
        case 1:
        case 2: {
            const dist = 32;
            var w, h;
            if (level === 1) {
                w = 4;
                h = 4;
            }
            else {
                w = 8;
                h = 6;
            }

            for (var x = 0; x < w; x++)
                for (var y = 0; y < h; y++)
                    bros.push(new Bro(W/2 + dist * (x - w/2 + 0.5), SH/2 + dist * (y - h/2 + 0.5), 0, getRandomUnwantedBroType(), 0));

            var i = Helpers.randInt(0, bros.length-1);
            bros[i].bro = wantedbro;

            break;
        }
        default: {
            generateLevel_stillcrowd();
            break;
        }
    }

    wantedbroi = 0;
    while (wantedbroi < bros.length) {
        if (bros[wantedbroi].bro === wantedbro)
            break;
        wantedbroi++;
    }
}

var holes = 40;
// 13x9
function generateLevel_stillcrowd() {
    const w = 13;
    const h = 9;
    const paddingx = 8;
    const paddingy = 16;
    const offset = 2;

    for (var x = 0; x < w; x++) {
        var xx = x/(w - 1) * (W - paddingx*2) + paddingx;
        for (var y = 0; y < h; y++) {
            var yy = y/(h - 1) * (SH - paddingy*2) + paddingy;
            bros.push(new Bro(xx + Helpers.randInt(-offset,offset), yy + Helpers.randInt(-offset,offset), Helpers.randInt(1,4), getRandomUnwantedBroType(), 0));
        }
    }

    for (var i = 0; i < Math.round(holes); i++)
        bros.splice(Helpers.randInt(0, bros.length-1), 1);

    var wantedi = Helpers.randInt(0, bros.length-1);
    bros[wantedi].bro = wantedbro;

    if (level < 5)
        bros[wantedi].z = 5;
    else
        bros[wantedi].z = 0;

    holes += (17 - holes) * 0.2; // 0.25
}