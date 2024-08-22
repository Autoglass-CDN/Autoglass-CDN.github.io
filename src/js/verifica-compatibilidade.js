
  $(document).ready(function(){
    // Cria o HTML do botão como string
    var buttonHTML = '<button class="botao-compatibilidade">Clique aqui</button>';

    // Adiciona o botão dentro da <div> com a classe 'container-titulo-lateral-prateleira'
    $('.container-titulo-lateral-prateleira').append(buttonHTML);

    // Adiciona um evento de clique ao botão usando jQuery
    $('.botao-compatibilidade').on('click', function() {
        alert('Funcionou!');
    });
  });

