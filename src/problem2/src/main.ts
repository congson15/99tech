import { state } from './state';
import { fetchPrices } from './services/prices';
import { formatNumber } from './utils/format';
import { renderDropdowns } from './components/dropdown';
import { MAX_INPUT_LENGTH } from './constants';

const elements = {
  inputAmount: document.getElementById('inputAmount') as HTMLInputElement,
  outputAmount: document.getElementById('outputAmount') as HTMLInputElement,
  swapButton: document.getElementById('swapButton') as HTMLButtonElement,
  buttonText: document.querySelector('.button-text') as HTMLSpanElement,
  spinner: document.querySelector('.spinner') as HTMLSpanElement,
  errorMessage: document.getElementById('error') as HTMLParagraphElement,
  reverseButton: document.getElementById('reverseButton') as HTMLButtonElement,
  exchangeRate: document.getElementById('exchangeRate') as HTMLParagraphElement,
};
function updateExchangeRateLabel() {
  const { from, to } = state.selected;
  const fromPrice = state.prices[from];
  const toPrice = state.prices[to];

  if (!from || !to || !fromPrice || !toPrice || from === to) {
    elements.exchangeRate.textContent = '';
    return;
  }

  const rate = fromPrice / toPrice;
  elements.exchangeRate.textContent = `1 ${from} ≈ ${formatNumber(rate)} ${to}`;
}

function handleReverse() {
  [state.selected.from, state.selected.to] = [state.selected.to, state.selected.from];
  renderDropdowns(updateExchangeRateLabel);
}

function handleInputLimit() {
  if (elements.inputAmount.value.length > MAX_INPUT_LENGTH) {
    elements.inputAmount.value = elements.inputAmount.value.slice(0, MAX_INPUT_LENGTH);
  }
}

function handleSwap() {
  const amount = parseFloat(elements.inputAmount.value);
  elements.errorMessage.textContent = '';
  elements.outputAmount.value = '';

  const { from, to } = state.selected;

  if (!from || !to || isNaN(amount) || amount <= 0) {
    elements.errorMessage.textContent = 'Please select tokens and enter a valid amount.';
    return;
  }

  if (from === to) {
    elements.errorMessage.textContent = 'Cannot swap the same token.';
    return;
  }

  const fromPrice = state.prices[from];
  const toPrice = state.prices[to];

  if (!fromPrice || !toPrice) {
    elements.errorMessage.textContent = 'Price information missing for selected tokens.';
    return;
  }

  elements.swapButton.disabled = true;
  elements.buttonText.textContent = 'Processing...';
  elements.spinner.classList.remove('hidden');

  setTimeout(() => {
    const result = (amount * fromPrice) / toPrice;
    elements.outputAmount.value = formatNumber(result);
    elements.swapButton.disabled = false;
    elements.buttonText.textContent = 'Exchange';
    elements.spinner.classList.add('hidden');
  }, 1000);
}

elements.reverseButton.addEventListener('click', handleReverse);
elements.inputAmount.addEventListener('input', handleInputLimit);
elements.swapButton.addEventListener('click', handleSwap);

fetchPrices().then(prices => {
  state.prices = prices;
  state.tokens = Object.keys(prices);
  renderDropdowns(updateExchangeRateLabel);
});
