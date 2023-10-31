const inputElement = document.getElementById("todoInput");
        const todoList = document.getElementById("todolist");

        inputElement.addEventListener("keydown", function (event) {
            if (event.key === "Enter" && inputElement.value.trim() !== "") {
                const newTodo = document.createElement("li");
                newTodo.textContent = inputElement.value;
                todoList.appendChild(newTodo);
                inputElement.value = ""; // Clear the input field
            }
        });