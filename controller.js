class Controller {
    constructor(canvas) {
        var controller = this;

        // pub
        this.x = 0;
        this.y = 0;
        this.clicking = false;

        this.mouseenabled = false;

        // pub
        this.enableMouse = function() {
            if (this.mouseenabled)
                return;
            this.mouseenabled = true;

            document.addEventListener('mousemove', onMouseMove);
            canvas.addEventListener('mousedown', onMouseDown);
            document.addEventListener('mouseup', onMouseUp);

            canvas.addEventListener('touchmove', onTouchMove);
            canvas.addEventListener('touchstart', onTouchDown);
            canvas.addEventListener('touchend', onTouchUp);
        };
        this.disableMouse = function() {
            if (!this.mouseenabled)
                return;
            this.mouseenabled = false;

            document.removeEventListener('mousemove', onMouseMove);
            canvas.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);

            canvas.removeEventListener('touchmove', onTouchMove);
            canvas.removeEventListener('touchstart', onTouchDown);
            canvas.removeEventListener('touchend', onTouchUp);
        };

        // priv
        this.setXY = function(pageX, pageY) {
            const rect = canvas.getBoundingClientRect();
            const scalemulx = canvas.width / rect.width;
            const scalemuly = canvas.height / rect.height;

            const x = scalemulx * (pageX - rect.left);
            const y = scalemuly * (pageY - rect.top);

            controller.x = x;
            controller.y = y;
        };

        function onMouseMove(e) {
            controller.setXY(e.x, e.y);
        }
        function onMouseDown(e) {
            controller.clicking = true;
            controller.firstclick = true;
            controller.setXY(e.x, e.y);
        }
        function onMouseUp(e) {
            controller.clicking = false;
        }

        function onTouchMove(e) {
            controller.setXY(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
            e.preventDefault();
        }
        function onTouchDown(e) {
            controller.firstclick = !controller.touching;
            controller.touching = true;
            controller.clicking = true;
            onTouchMove(e);
            e.preventDefault();
        }
        function onTouchUp(e) {
            controller.touching = false;
            controller.clicking = false;
            e.preventDefault();
        }
    };
}