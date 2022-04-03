window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_element = document.querySelector("#tasks");

	var playButton = document.getElementById("play-music-button");
	var audio = document.getElementById("music");

	playButton.addEventListener("click", function() {
		if (audio.paused) {
			audio.play();
			playButton.innerHTML = '<i class="fa fa-pause"></i>';
		} else {
			audio.pause();
			playButton.innerHTML = '<i class="fa fa-play"></i>';
		}
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;

		const task_element = document.createElement('div');
		task_element.classList.add('task');

		const task_content_element = document.createElement('div');
		task_content_element.classList.add('content');

		task_element.appendChild(task_content_element);

		const task_input_element = document.createElement('input');
		task_input_element.classList.add('text');
		task_input_element.type = 'text';
		task_input_element.value = task;
		task_input_element.setAttribute('readonly', 'readonly');

		task_content_element.appendChild(task_input_element);

		const task_actions_element = document.createElement('div');
		task_actions_element.classList.add('actions');
		
		const task_edit_element = document.createElement('button');
		task_edit_element.classList.add('edit');
		task_edit_element.innerText = 'Edit';

		const task_delete_element = document.createElement('button');
		task_delete_element.classList.add('delete');
		task_delete_element.innerText = 'Delete';

		const task_timer_element = document.createElement('button');
		task_timer_element.classList.add('timer');
		task_timer_element.innerText = 'Timer';

		task_actions_element.appendChild(task_edit_element);
		task_actions_element.appendChild(task_delete_element);
		task_actions_element.appendChild(task_timer_element);

		task_element.appendChild(task_actions_element);

		list_element.appendChild(task_element);

		input.value = '';

		task_edit_element.addEventListener('click', (e) => {
			if (task_edit_element.innerText.toLowerCase() == "edit") {
				task_edit_element.innerText = "Save";
				task_input_element.removeAttribute("readonly");
				task_input_element.focus();
			} 
			else {
				task_edit_element.innerText = "Edit";
				task_input_element.setAttribute("readonly", "readonly");
			}
			
		});

		task_delete_element.addEventListener('click', (e) => {
			list_element.removeChild(task_element);
			timer_element.removeChild(timer_display);
			timer_element.removeChild(timer_actions);
		});

		task_timer_element.addEventListener('click', (e) => {
			const timer_element = document.createElement('div');
			timer_element.classList.add('timer');
			var ding = new Audio("timer.mp3");
			function startTimer(duration, display) {
			    var timer = duration, minutes, seconds;
			    setInterval(function () {
			        minutes = parseInt(timer / 60, 10);
			        seconds = parseInt(timer % 60, 10);

			        minutes = minutes < 10 ? "0" + minutes : minutes;
			        seconds = seconds < 10 ? "0" + seconds : seconds;

			        display.textContent = minutes + ":" + seconds;
			        if (--timer < 0) {
						timer_element.removeChild(timer_display);
						timer_element.removeChild(timer_actions);
						ding.play();
						alert("Time's up!");

			        }

			    }, 1000);
			}
			const timer_display = document.createElement('div');
			timer_display.classList.add('timer-display');
			timer_display.innerText = '00:00';
			timer_element.appendChild(timer_display);
			const timer_actions = document.createElement('div');
			timer_actions.classList.add('timer-actions');
			const timer_stop = document.createElement('button');
			timer_stop.classList.add('timer-stop');
			timer_stop.innerText = 'Stop';
			const timer_text = document.createElement('div');
			timer_text.classList.add('timer-text');
			timer_text.innerText = 'Click on Start to set timer';
			const timer_start = document.createElement('button');
			timer_start.classList.add('timer-start');
			timer_start.innerText = 'Start';
			timer_actions.appendChild(timer_stop);
			timer_actions.appendChild(timer_text);
			timer_actions.appendChild(timer_start);
			
			timer_element.appendChild(timer_actions);
			list_element.appendChild(timer_element);
			timer_start.addEventListener('click', (e) => {
				const time = prompt("Enter a time in the format mm:ss");
				const time_array = time.split(':');
				const minutes = parseInt(time_array[0]);
				const seconds = parseInt(time_array[1]);
				const total_seconds = minutes * 60 + seconds;	
				startTimer(total_seconds, timer_display);
				
			});
			
			timer_stop.addEventListener('click', (e) => {
				timer_element.removeChild(timer_display);
				timer_element.removeChild(timer_actions);
			});
			// timer_start.addEventListener('click', (e) => {
			// 	timer_element.removeChild(timer_display);
			// 	timer_element.removeChild(timer_actions);
			// 	startTimer(60, timer_display);
			// });

		});
			
			task_element.appendChild(timer_element);
	});
});