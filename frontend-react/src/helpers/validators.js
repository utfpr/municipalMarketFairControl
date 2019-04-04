

const CPF_BLACKLIST = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    '12345678909',
];


const verifierDigitCPF = value => {
    const numbers = value
        .split('')
        .map(number => Number(number));
    const modulus = numbers.length + 1;
    const multiplied = numbers.map((number, index) => number * (modulus - index));
    const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;
    return (mod < 2 ? 0 : 11 - mod);
};

export const validateCPF = (rule, value, callback) => {

    if (value && value.length === 11 && CPF_BLACKLIST.indexOf(value) === -1) {
        let numbers = value.substr(0, 9);
        numbers += verifierDigitCPF(numbers);
        numbers += verifierDigitCPF(numbers);

        if (numbers.substr(-2) === value.substr(-2)) {
            
            return callback();
        }
    }
    callback('Digite um CPF válido!');
};
