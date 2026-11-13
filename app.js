'use strict';

const Character_GROUPS =
    {
        lower: 'abcdefghijklmnopqrstuvwxyz',
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!?@#%&*'
    };


function secureIndex(max){
if (!Number.isInteger(max) || max < 1 || max > 0x100000000) {
    throw new RangeError('Invalid range');
}

const buffer = new Uint32Array(1);
crypto.getRandomValues(buffer);

// do i need to do rejection sampling? check up on modulo bias

return buffer[0] % max;
}

function generatePassword(length, selectedGroups) {
    if (!Number.isInteger(length) || length < 8 || length > 24) {
        throw new RangeError('Length must be between 8 and 24')
    }

    if (selectedGroups.length == 0) {
        throw new RangeError('Select at least one character type');
    }

    const groups = selectedGroups.map(key => Character_GROUPS[key]);
    const alphabet = groups.join('');
    const chars = groups.map(group=>group[secureIndex(group.length)]);

    while (chars.length < length) {
        chars.push(alphabet[secureIndex(alphabet.length)]);
    }

    // shuffle with fisher-yates algorithm
    // if fisher-yates shuffle isn't performed, first 4 characters follow the same pattern
    for (let i = chars.length - 1; i > 0; i--) {
        const j = secureIndex(i + 1);
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('');
}

const generatedInput = document.querySelector('#generated')
const lengthSlider = document.querySelector('#length')
const lengthValue = document.querySelector('#length-value')

lengthValue.textContent = lengthSlider.value;
lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

const optionIds = ['lower', 'upper', 'numbers', 'symbols'];
document.querySelector('#generate').addEventListener('click', () => {
    generatedInput.value = '';
    generatedInput.type = 'password';


    const selected = optionIds.filter(id => document.getElementById(id).checked);

    if (selected.length == 0) {
        alert('Please choose at least one character type');
        return;
    }

    try {
        generatedInput.value = generatePassword(
            Number(lengthSlider.value),
            selected
        );
    } catch {
        alert('Could not generate password');
    }

})