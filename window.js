window.onload = function () {
    class TaskManager {
        constructor() {
            // localStorage에서 tasks 데이터를 가져오고, 없으면 빈 배열로 초기화
            this.tasks = JSON.parse(localStorage.getItem('task')) || [];
            this.taskList = document.getElementById('todo_list');
            this.addTaskInput = document.getElementById('input');

            this.addTaskInput.addEventListener('keydown', this.handleKeyDown.bind(this));
            this.displayTasks();
        }

        handleKeyDown(event) {
            // IME 이슈 방지
            if (event.isComposing) return;

            const inputValue = this.addTaskInput.value.trim();

            if (event.key === 'Enter' && inputValue) {
                if (!this.tasks.some(task => task.text === inputValue)) {
                    this.tasks.push({ text: inputValue, completed: false });
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                    this.displayTasks();
                } else {
                    alert("중복된 내용입니다");
                }
                this.addTaskInput.value = '';
            }
        }

        displayTasks() {
            this.taskList.innerHTML = '';

            this.tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.className = 'list_item';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'checkbox';
                checkbox.name = 'checkbox';
                checkbox.checked = task.completed;
                li.appendChild(checkbox);

                const taskText = document.createElement('span');
                taskText.textContent = task.text;
                li.appendChild(taskText);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'X';

                deleteButton.addEventListener('click', () => {
                    this.tasks.splice(index, 1);
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                    this.displayTasks();
                });

                checkbox.addEventListener('change', () => {
                    task.completed = checkbox.checked;
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                    this.displayTasks();
                });

                li.appendChild(deleteButton);
                this.taskList.appendChild(li);

                if (task.completed) {
                    li.classList.add('complete');
                }
            });
        }
    }

    const taskManager = new TaskManager();

    // 배경화면----------------------------------------------------------------------------------------------------------
    function getRandomPastelColor() {
        // 파스텔 톤의 색상 배열
        const pastelColors = [
            [245, 250, 112], // 연 노랑
            [112, 146, 250], // 연 파랑
            [121, 250, 112], // 연 녹색
            [204, 112, 250], // 연 보라
            [250, 112, 112], // 연 주황
        ];

        // 랜덤한 색상 선택
        const randomIndex = Math.floor(Math.random() * pastelColors.length);
        return pastelColors[randomIndex];
    }



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
        // this.radius = 0; // 초기 원의 반지름
        // this.opacity = 1.0; // 초기 투명도
        this.growthRate = 0.23; // 원의 성장 속도
        this.opacityReductionRate = 1 / 600; // 투명도 감소 속도

        this.init = function () {
            this.x = randomValue(0, windowWidth);
            this.y = randomValue(0, windowHeight);
            this.radius = 10; // 초기 원의 반지름
            this.opacity = 1.0; // 초기 투명도

            // 랜덤한 파스텔 톤 색상 얻기
            this.color = getRandomPastelColor(); // 랜덤한 파스텔 톤 색상 초기화
        };

        this.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color.join(', ')}, ${this.opacity})`; // 저장된 색상 사용
            ctx.fill();
            ctx.closePath();
        };

        this.update = function () {
            // 커지면서 투명도가 감소하도록 업데이트 로직 작성
            if (this.radius < 150) {
                this.radius += this.growthRate;
                this.opacity -= this.opacityReductionRate;
            } else {
                // 공이 특정 크기에 도달하면 초기화하고 다른 공 생성
                this.init();
            }
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





}

