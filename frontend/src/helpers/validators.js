

const CPF_BLACKLIST = [
    '000.000.000-00',
    '111.111.111-11',
    '222.222.222-22',
    '333.333.333-33',
    '444.444.444-44',
    '555.555.555-55',
    '666.666.666-66',
    '777.777.777-77',
    '888.888.888-88',
    '999.999.999-99',
    '123.456.789-09',
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

    if (value && value.length === 14 && CPF_BLACKLIST.indexOf(value) === -1) {
        let numbers = value.substr(0, 11);
        numbers = numbers.replace(/\D+/g, '');
        numbers += verifierDigitCPF(numbers);
        numbers += verifierDigitCPF(numbers);

        if (numbers.substr(-2) === value.substr(-2)) {

            return callback();
        }
    }
    callback('Digite um CPF válido!');
};
