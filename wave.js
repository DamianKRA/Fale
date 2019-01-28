class Wave {
    constructor(yPosition, ilePodzialow, kolor) {
        //pierwsze dwa to center point x,y
        //kolejne dwa to handler normalny x,y
        //kolejne dwa to handler odbity x,y
        this.tabKontrolek = [];
        this.speed = []; //tablica kolejnych liczb calkowitych od zera do ilosc waveow
        this.yPosition = yPosition;
        this.ilePodzialow = ilePodzialow;
        this.offset = 50; //initWave() zmienia ta wartosc
        this.kolor = kolor;
        this.random = randomNumber(150, 200); //randomowa liczba okreslajaca wysuniecei w gore i dół od punktu
        this.randomStart = randomNumber(1, 5);
        this.top = yPosition - this.random;
        this.bottom = yPosition + this.random;
        this.randomRColor = randomNumber(0, 100);
        this.randomGColor = randomNumber(0, 100);
        this.randomBColor = randomNumber(100, 255);
    }

    initWave() {
        let odleglosc = canvasWidth / this.ilePodzialow; //odleglosc miedzy punktami
        this.offset = odleglosc / 2; //to mozna zmieniac 
        for (let i = 0; i <= this.ilePodzialow; i++) {
            let randomY = randomNumber(this.top, this.bottom); //handler normalny
            let odbicie = replace(i * odleglosc - this.offset, randomY, i * odleglosc, this.yPosition);
            this.tabKontrolek.push([
                [odleglosc * i, this.yPosition],
                [odleglosc * i - this.offset, randomY],
                [odbicie[0], odbicie[1]]
            ]);
            this.speed.push(i);
        }
    };

    get gradient() {
        let grd = ctx.createLinearGradient(0, this.top, 0, canvasHeight);
        grd.addColorStop(0, "rgb(" + this.randomRColor + ", " + this.randomGColor + ", " + this.randomBColor + ")");
        grd.addColorStop(1, "rgb(80, 80, 80)");
        return grd;
    };

    drawPath() {
        ctx.fillStyle = this.gradient;

        ctx.shadowBlur = 40;
        ctx.shadowColor = "rgb(" + this.randomRColor + ", " + this.randomGColor + ", " + this.randomBColor + ")";
        ctx.beginPath();
        ctx.moveTo(this.tabKontrolek[0][0][0], this.tabKontrolek[0][0][1]);
        for (let x = 0; x < this.tabKontrolek.length - 1; x++) {
            ctx.bezierCurveTo(
                this.tabKontrolek[x][2][0],
                this.tabKontrolek[x][2][1],
                this.tabKontrolek[x + 1][1][0],
                this.tabKontrolek[x + 1][1][1],
                this.tabKontrolek[x + 1][0][0],
                this.tabKontrolek[x + 1][0][1]);
        }
        // ctx.lineTo(
        //     this.tabKontrolek[this.tabKontrolek.length - 1][0][0] + 10,
        //     this.tabKontrolek[this.tabKontrolek.length - 1][0][1]
        // );
        ctx.lineTo(canvasWidth, canvasHeight + 10);
        ctx.lineTo(0, canvasHeight);
        ctx.closePath();
        ctx.lineWidth = 5;
        //ctx.stroke();
        ctx.fill();

        // rysowanie pomocniczych uchwytów do scierzek i punktów takich tam xddd
        // for (let i in this.tabKontrolek) {
        //     ctx.beginPath();
        //     ctx.arc(this.tabKontrolek[i][0][0], this.tabKontrolek[i][0][1], 2, 0, Math.PI * 2);
        //     ctx.stroke();
        // }

        // for (let i of this.tabKontrolek) {
        //     ctx.beginPath();
        //     ctx.arc(i[1][0], i[1][1], 6, 0, Math.PI * 2);
        //     ctx.stroke();

        //     ctx.beginPath();
        //     ctx.arc(i[2][0], i[2][1], 4, 0, Math.PI * 2);
        //     ctx.stroke();
        // }
    };

    updatePath() {
        for (let i in this.tabKontrolek) {
            this.tabKontrolek[i][1][1] = map(Math.sin(frames + this.speed[i] + this.randomStart), -1, 1, this.top, this.bottom);
            let mirror = replace(
                this.tabKontrolek[i][1][0],
                this.tabKontrolek[i][1][1],
                this.tabKontrolek[i][0][0],
                this.tabKontrolek[i][0][1]
            );
            this.tabKontrolek[i][2][0] = mirror[0];
            this.tabKontrolek[i][2][1] = mirror[1];
        }
    };
}