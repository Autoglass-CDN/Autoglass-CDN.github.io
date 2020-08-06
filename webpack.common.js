const path = require('path');

module.exports = {
  entry: {
    'js/B2C-02-detalhe-produto': path.resolve(__dirname, 'src', 'js', 'B2C-02-detalhe-produto.dev.js'),
    'js/B2C-02-filtro-busca': path.resolve(__dirname, 'src', 'js', 'B2C-02-filtro-busca.dev.js'),
    'js/consulta-agendamento': path.resolve(__dirname, 'src', 'js', 'consulta-agendamento.dev.js'),
    'js/jquery-ui.datepicker': path.resolve(__dirname, 'src', 'js', 'jquery-ui.datepicker.js'),
    'js/JS.aut.far.functions.base.min': path.resolve(__dirname, 'src', 'js', 'JS.aut.far.functions.base.dev.js'),
  }
}