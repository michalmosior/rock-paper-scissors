const rulesBtn = document.querySelector('.rules-btn');
const rulesContainer = document.querySelector('.rules');
const optionBtns = document.querySelectorAll('.option-container__btn');
const optionContainer = document.querySelector('.option-container');
const gameButtons = document.querySelectorAll('.button');
const weaponChoice = document.querySelector('.weapon-choice');
const gameField = document.querySelector('.game-field');
let playerOneChoice;

const chooseEnemy = (e) => {
	optionContainer.classList.add('started');
	const human = document.querySelector('.human');
	const cpu = document.querySelector('.cpu');
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
		console.log(e.target);
		if (e.target === gameButtons[0]) {
			weaponChoice.innerHTML = `<div class="paper small">
			<button class="paper__btn button"></button>
		</div>`;
		} else if (e.target === gameButtons[1]) {
			weaponChoice.innerHTML = `<div class="scissors small">
			<button class="scissors__btn button"></button>
		</div>`;
		} else if (e.target === gameButtons[2]) {
			weaponChoice.innerHTML = `<div class="rock small">
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
