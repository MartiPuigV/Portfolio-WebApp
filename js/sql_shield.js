export function filter_input(input) { // Add more safety and filters, even though we use prepared statements
    return input.replace("'", '').replace(';', '').replace('"', '').replace('=', '');
}
