/* 
   1. 저장공간 배열을 만들기

    2. addEventListender

    3. localstorage 에 키 - 값 형태인 json 형태로 리스트가 저장되어 displayTasks 호출시 값을 불러온다.
*/

// 1. 저장 공간 배열을 만들기
// task 라는 키 저장된 데이터를 불러옴
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


// 2. Add Event Listener
// 사용자가 Enter 키를 누를 때 이벤트 리스너 추가
const addTask = document.getElementById('input');
addTask.addEventListener('keydown', function (event) {
    /*
   한글만 중복해서 목록에 추가되는 상황이 발생하였다.
   
   - 찾아본 결과
   IME(Input Method Editor)는 영어가 아닌 한글, 일본어, 중국어와 같은 언어를 다양한 브라우저에서 지원하도록 언어를 변환시켜주기 위한 OS 단계의 어플리케이션을 말한다.
   그러나 IME 과정에서 keydown 이벤트가 발생하면, OS와 브라우저에서 해당 이벤트를 모두 처리하기 때문에 keydown 이벤트가 중복으로 발생하게 되는 것이다.

   즉, IME를 통해 한글, 일본어, 중국어 등을 변환하는 과정(composition)에서 keydown 이벤트는 OS 뿐만 아니라 브라우저에서도 처리되기 때문에 중복 발생된다.

   이로인해 KeyboardEvent.isComposing 이라는 프로퍼티를 사용한다.
   KeyboardEvent.isComposing은 입력한 문자가 조합문자인지 아닌지를 판단한다.
   한글은 자음 + 모음의 조합으로 음절이 만들어지는 조합문자이고 영어는 조합문자가 아니다. 따라서 
   한글의 특성으로 인해 조합이 끝난 상태인지 아닌지 판별하기 어려워진다. 그렇기에 한글사용시에만 오류가 발생하는 것이다

   - 해결방법 
   if(event.isComposing) return; 
   isComposing이 참인 순간은 아직 IME에 의한 composition 단계이므로, 이 단계에서 이벤트가 발생하지 않도록 return 해준다.
   방법을 사용할 수 있다.
   
   */
    if (event.isComposing) return;

    const taskInput = document.getElementById('input');
    const inputValue = taskInput.value.trim();

    if (event.key === 'Enter') {
        if (inputValue) {
            // 중복 할일 체크
            if (!tasks.includes(inputValue)) {

                // 배열에 할일 추가
                tasks.push(inputValue);
                // 로컬 스토리지에 저장
                localStorage.setItem('tasks', JSON.stringify(tasks));
                // 화면에 할일 목록 추가
                displayTasks();
            } else {
                alert("중복된 내용입니다")
            }
            // 입력 필드 비우기
            taskInput.value = '';
        }
    }
});


// 3. localstorage에서 할일 불러오고 화면에 표시
function displayTasks() {
    const taskList = document.getElementById('todo_list');
    taskList.innerHTML = '';

    tasks.forEach(function (task, index) {
        // 새로운 li 요소를 생성후 클래스이름 설정
        const li = document.createElement('li');
        li.className = `list_item`;
        // 체크박스 추가
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = `checkbox`;
        li.appendChild(checkbox);


        // 할일 텍스트 추가
        const taskText = document.createElement('span');
        taskText.textContent = task;
        li.appendChild(taskText);

        // 삭제 버튼
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';

        deleteButton.addEventListener('click', function () {
            // 배열에서 할일 삭제
            tasks.splice(index, 1);
            // 로컬 스토리지 업데이트
            localStorage.setItem('tasks', JSON.stringify(tasks));
            // 화면에서 할일 제거
            displayTasks();
        });

        // 체크박스 
        // 선택시 토글을 주어서 css 스타일을 변화
        checkbox.addEventListener('click', () => {
            li.classList.toggle('complete');
        });


        li.appendChild(deleteButton);
        taskList.appendChild(li);

    });
}


// 초기 화면 렌더링
displayTasks();
