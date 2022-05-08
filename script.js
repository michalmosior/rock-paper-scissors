const rulesBtn = document.querySelector('.rules-btn');
const rulesContainer = document.querySelector('.rules');
const optionBtns = document.querySelectorAll('.option-container__btn');
const optionContainer = document.querySelector('.option-container');
const gameButtons = document.querySelectorAll('.button');
const human = document.querySelector('.human');
const cpu = document.querySelector('.cpu');
const weaponChoice = document.querySelector('.weapon-choice');
const gameField = document.querySelector('.game-field');
let playerOneChoice;

const chooseEnemy = (e) => {
	optionContainer.classList.add('started');

	e.target.classList.add('choosen-option');
	if (e.target.matches('span')) {
		e.target.parentElement.classList.add('choosen-option');
	}
	if (human.classList.contains('choosen-option')) {
		human.classList.add('right');
		cpu.classList.add('none');
	} else if (cpu.classList.contains('choosen-option')) {
		cpu.classList.add('left');
		human.classList.add('none-left');
		vsCpu();
	}
};

const weaponSelection = () => {
	const weapon = (e) => {
		weaponChoice.classList.add('small');
		if (e.target === gameButtons[0]) {
			weaponChoice.innerHTML = `<div class="paper shadow player-one" data-weapon="paper">
			<button class="paper__btn button"></button>
		</div>`;
		} else if (e.target === gameButtons[1]) {
			weaponChoice.innerHTML = `<div class="scissors shadow player-one" data-weapon="scissors">
			<button class="scissors__btn button"></button>
		</div>`;
		} else if (e.target === gameButtons[2]) {
			weaponChoice.innerHTML = `<div class="rock shadow player-one" data-weapon="rock">
			<button class="rock__btn button"></button>
		</div>`;
		}
	};
	gameButtons.forEach((el) => {
		el.addEventListener('click', weapon);
	});
};
const vsCpu = () => {
	weaponSelection();
	cpuArr = [
		`<div class="paper shadow player-two" data-weapon="paper">
	<button class="paper__btn button"></button>
</div>`,
		`<div class="scissors shadow player-two" data-weapon="scissors">
<button class="scissors__btn button"></button>
</div>`,
		`<div class="rock shadow player-two" data-weapon="rock">
<button class="rock__btn button"></button>
</div>`,
	];
	const changeGameField = () => {
		if (weaponChoice.innerHTML !== '') {
			gameField.innerHTML = `<div class="cpu__container">
			<button class="cpu__btn"></button></div>`;
			const stopDraw = () => {
				let index = Math.floor(Math.random() * 3);
				gameField.innerHTML = '';
				weaponChoice.innerHTML += cpuArr[index];
				showResult();
			};
			setTimeout(stopDraw, 1500);
		}
	};
	const delay = () => {
		setTimeout(changeGameField, 800);
	};
	gameButtons.forEach((el) => {
		el.addEventListener('click', delay);
	});
};
const showResult = () => {
	const playerOne = document.querySelector('.player-one');
	const playerTwo = document.querySelector('.player-two');
	if (playerOne.dataset.weapon === playerTwo.dataset.weapon) {
		gameField.innerHTML = `<p class="result">draw</p>`;
	} else if (
		playerOne.dataset.weapon === 'paper' &&
		playerTwo.dataset.weapon === 'scissors'
	) {
		gameField.innerHTML = `<p class="result">Cpu win</p>`;
	} else if (
		playerOne.dataset.weapon === 'paper' &&
		playerTwo.dataset.weapon === 'rock'
	) {
		gameField.innerHTML = `<p class="result">you win</p>`;
	} else if (
		playerOne.dataset.weapon === 'scissors' &&
		playerTwo.dataset.weapon === 'paper'
	) {
		gameField.innerHTML = `<p class="result">you win</p>`;
	} else if (
		playerOne.dataset.weapon === 'scissors' &&
		playerTwo.dataset.weapon === 'rock'
	) {
		gameField.innerHTML = `<p class="result">cpu win</p>`;
	} else if (
		playerOne.dataset.weapon === 'rock' &&
		playerTwo.dataset.weapon === 'paper'
	) {
		gameField.innerHTML = `<p class="result">cpu win</p>`;
	} else if (
		playerOne.dataset.weapon === 'rock' &&
		playerTwo.dataset.weapon === 'scissors'
	) {
		gameField.innerHTML = `<p class="result">you win</p>`;
	}
};
const showRules = () => {
	const closeBtn = document.querySelector('.rules__close-btn');
	rulesContainer.classList.add('active');
	closeBtn.addEventListener('click', function () {
		rulesContainer.classList.remove('active');
	});
};

rulesBtn.addEventListener('click', showRules);
optionBtns.forEach((el) => {
	el.addEventListener('click', chooseEnemy);
});
