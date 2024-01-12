window.onload = function () {
    // 현재 화면의 넓이
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // 현재 화면의 높이
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // 캔버스 생성
    var canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = windowWidth;
    canvas.height = windowHeight;

    document.body.appendChild(canvas);

    // 랜덤한 x,y 좌표를 구하는 함수
    function randomValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 공 생성 함수
    function makeBall() {
        this.x = randomValue(0, windowWidth);
        this.y = randomValue(0, windowHeight);
        this.radius = 20; // 초기 원의 반지름
        this.opacity = 1.0; // 초기 투명도
        this.growthRate = 0.18; // 원의 성장 속도
        this.opacityReductionRate = 1 / 300; // 투명도 감소 속도

        this.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`; // 빨간색 공
            ctx.fill();
            ctx.closePath();
        };

        this.update = function () {
            // 커지면서 투명도가 감소하도록 업데이트 로직 작성
            if (this.radius < 100) {
                this.radius += this.growthRate;
                this.opacity -= this.opacityReductionRate;
            } else {
                // 공이 특정 크기에 도달하면 초기화하고 다른 공 생성
                this.init();
            }
        };

        this.init = function () {
            this.x = randomValue(0, windowWidth);
            this.y = randomValue(0, windowHeight);
            this.radius = 20; // 초기 원의 반지름
            this.opacity = 1.0; // 초기 투명도
        };

        // 최초 생성시 초기화 호출
        this.init();
    }

    // 초기 공 생성
    const ball = new makeBall();

    function animate() {
        // 캔버스 클리어
        ctx.clearRect(0, 0, windowWidth, windowHeight);

        // 공 그리기
        ball.draw();

        // 공 업데이트
        ball.update();

        // 다음 프레임 요청
        requestAnimationFrame(animate);
    }

    // resize 이벤트로 화면의 크기 변화에 따라 캔버스 크기 다시 설정
    window.addEventListener('resize', function () {
        windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        canvas.width = windowWidth;
        canvas.height = windowHeight;
    });

    // 애니메이션 시작
    animate();
};
