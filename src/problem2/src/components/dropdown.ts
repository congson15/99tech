import { ICON_URL } from '../constants';
import { state } from '../state';

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-list').forEach(el => el.classList.add('hidden'));
}

function createDropdown(container: HTMLDivElement, type: 'from' | 'to', onChange?: () => void) {
    container.innerHTML = '';
    const selectedValue = state.selected[type];
    const otherType = type === 'from' ? 'to' : 'from';

    const selected = document.createElement('div');
    selected.className = 'dropdown-selected';
    selected.setAttribute('tabindex', '0');
    selected.setAttribute('role', 'button');
    selected.setAttribute('aria-label', `Select ${type} token`);
    selected.innerHTML = selectedValue
        ? `<img src="${ICON_URL(selectedValue)}" /><span>${selectedValue}</span>`
        : 'Select Token';
    container.appendChild(selected);

    const list = document.createElement('div');
    list.className = 'dropdown-list hidden';

    const search = document.createElement('input');
    search.className = 'dropdown-search';
    search.placeholder = 'Search token...';
    list.appendChild(search);

    const itemsContainer = document.createElement('div');
    list.appendChild(itemsContainer);

    function renderList(filter = '') {
        itemsContainer.innerHTML = '';
        state.tokens
            .filter(token => token !== state.selected[otherType])
            .filter(token => token.toLowerCase().includes(filter.toLowerCase()))
            .forEach(token => {
                const option = document.createElement('div');
                option.className = 'dropdown-item';
                option.setAttribute('tabindex', '0');
                option.innerHTML = `<img src="${ICON_URL(token)}" /><span>${token}</span>`;
                if (token === selectedValue) {
                    option.classList.add('selected');
                }
                option.addEventListener('click', () => {
                    state.selected[type] = token;
                    renderDropdowns(onChange);
                    list.classList.add('hidden');
                });

                option.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        state.selected[type] = token;
                        renderDropdowns(onChange);
                        list.classList.add('hidden');
                    }
                });
                itemsContainer.appendChild(option);
            });
    }

    selected.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllDropdowns();
        list.classList.toggle('hidden');
        renderList();
        search.value = '';
        search.focus();
    });

    search.addEventListener('input', () => renderList(search.value));

    document.addEventListener('click', (e) => {
        if (!container.contains(e.target as Node)) {
            list.classList.add('hidden');
        }
    });

    container.appendChild(list);
}

export function renderDropdowns(onChange?: () => void) {
    createDropdown(document.getElementById('fromToken') as HTMLDivElement, 'from', onChange);
    createDropdown(document.getElementById('toToken') as HTMLDivElement, 'to', onChange);
    onChange?.();
}