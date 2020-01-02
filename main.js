document.onload = function() {
    WebFont.load({
        google: {
            families: ["Roboto"]
        }
    });
};

main();

function main() {
    const canvas = document.getElementById("canvas");
    const spinBtn = document.getElementById("startBtn");
    const restartBtn = document.getElementById("restartBtn");
    const alert = document.getElementById("alert");
    const ctx = canvas.getContext("2d");

    if (window.innerWidth > window.innerHeight) {
        canvas.width = window.innerHeight - (window.innerHeight / 100) * 10;
        canvas.height = window.innerHeight - (window.innerHeight / 100) * 10;
    } else {
        canvas.width = window.innerWidth - (window.innerWidth / 100) * 10;
        canvas.height = window.innerWidth - (window.innerWidth / 100) * 10;
    }

    let slicesList = [
        { label: "Еще раз", color: "#ff9d76" },
        { label: "Кушать", color: "#ffdbc5" },
        { label: "Цьом", color: "#51eaea" },
        { label: "Кусь", color: "#ff9d76" },
        { label: "Массаж", color: "#ffdbc5" },
        { label: "Водичка", color: "#ff9d76" },
        { label: "Бах", color: "#ef4339" },
        { label: "Желание", color: "#ffdbc5" }
    ];

    let slices = slicesList.length;
    let sliceDeg = 360 / slices;
    let deg = rand(0, 360);
    let speed = 0;
    let slowDownRand = 0;
    let width = canvas.width;
    let center = width / 2;
    let isStopped = true;
    let lock = false;
    let first = true;

    

    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    function deg2rad(deg) {
        return (deg * Math.PI) / 180;
    }

    function drawSlice(deg, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(center, center);
        ctx.arc(
            center,
            center,
            width / 2,
            deg2rad(deg),
            deg2rad(deg + sliceDeg)
        );
        ctx.lineTo(center, center);
        ctx.fill();
    }

    function drawText(deg, text) {
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(deg2rad(deg));
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.font = `bold ${canvas.width / 20}px Roboto`;
        ctx.fillText(text, canvas.width / 3, 10);
        ctx.restore();
    }

    function drawImg() {
        ctx.clearRect(0, 0, width, width);
        for (let i = 0; i < slices; i++) {
            drawSlice(deg, slicesList[i].color);
            drawText(deg + sliceDeg / 2, slicesList[i].label);
            deg += sliceDeg;
        }
    }

    (function anim() {
        deg += speed;
        deg %= 360;

        if (!isStopped && speed < 3) {
            speed = speed + 1 * 0.3;
        }

        if (isStopped) {
            if (!lock) {
                lock = true;
                slowDownRand = rand(0.994, 0.998);
            }
            speed = speed > 0.2 ? (speed *= slowDownRand) : 0;
        }

        if (lock && !speed && isStopped) {
            let ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg);
            ai = (slices + ai) % slices;
            document.getElementById("alertText").innerHTML = slicesList[ai].label;
            
            spinBtn.disabled = false;

            if (!first) {
                alert.style.top = 0;
            }
        }

        drawImg();
        window.requestAnimationFrame(anim);
    })();

    function spin() {
        isStopped = false;
        first = false;
        spinBtn.disabled = true;
        alert.style.top = "-100%";
        setTimeout(() => {
            isStopped = true;
        }, 1000)
    }

    restartBtn.addEventListener(
        "mousedown",
        spin,
        false
    );

    spinBtn.addEventListener(
        "mousedown",
        spin,
        false
    );
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js', { scope: '/' }).then(() => {
          console.log('Service Worker registered successfully.');
        }).catch(error => {
          console.log('Service Worker registration failed:', error);
        });
      }
    }
