
module.exports = function (plop) {
    // create your generators here
    plop.setHelper('toUpperCase', function (text) {
        return text.charAt(0).toUpperCase() + text.slice(1)
    });
    plop.setGenerator('React component generator', {
        description: 'A generator for React components',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Component name',
            },
            {
                type: 'input',
                name: 'path',
                message: 'Component Path',
            },
            {
                type: 'input',
                name: 'tag',
                message: 'Component Tag',
            },
        ],
        actions: [
            {
                type: 'addMany',
                destination: './src/{{path}}/{{name}}',
                base: `./plop/template/component/`,
                templateFiles: './plop/template/component/*'
            },
        ],
    });
}
