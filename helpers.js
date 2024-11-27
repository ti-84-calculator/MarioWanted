class Helpers {
    constructor(engine, canvas) {};

    // math
    static randInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min+1)) + min;
    }
    static randNum(min, max) {
        return Math.random() * (max - min) + min;
    }
    static scrambleArray(array) {
        for (var i = 0; i < array.length; i++) {
            var other = this.randInt(i, array.length-1);
            var otherval = array[other];
            array[other] = array[i];
            array[i] = otherval;
        }
    }


    // direct drawing -- seperate from the framebuffer
    static drawBg(ctx) {
        ctx.fillStyle = '#eeeeee';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    static drawText(ctx, lines) {
        const textsize = 20;

        ctx.font = textsize + 'px arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#333333';

        for (var i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], canvas.width/2, canvas.height/2 - lines.length*textsize/2 + i*textsize);
        }
    }
    static drawLoadingBar(ctx, range, w=80) {
        const width = w;
        const height = 14;
        const offset = 15;

        ctx.fillStyle = '#00ff00';
        ctx.strokeStyle = '#333333';

        ctx.fillRect(canvas.width/2 - width/2, canvas.height/2 - height/2 + offset, width * range, height);
        ctx.strokeRect(canvas.width/2 - width/2 - 0.5, canvas.height/2 - height/2 + offset - 0.5, width, height);
    }
}