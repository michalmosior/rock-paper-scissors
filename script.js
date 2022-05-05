const rulesBtn = document.querySelector('.rules-btn');
const rulesContainer = document.querySelector('.rules');
const optionBtns = document.querySelectorAll('.option-container__btn');
const optionContainer = document.querySelector('.option-container');

const startGame = () => {
	optionContainer.classList.add('started');
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
	el.addEventListener('click', startGame);
});
