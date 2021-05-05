function consultaAPI(data = "") {

  var informacoes = $('#informacoes');
  var imagem = $('#imagem');

  informacoes.empty();
  imagem.empty();

  var apiKey = 'VYMTvUkCpIOPUcfDkzGSPjTdgmfgWYJKFD83oBMO';

  $.ajax({
    url: `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${data}`,
    dataType: 'JSON',

    success: resposta => {

      informacoes.append(`<center><h1>${resposta.title}</h1></center>`);
        if (resposta.copyright) {
        informacoes.append(`<center><h2>${resposta.copyright}</h2></center>`);
      }
      informacoes.append(`<center><p>${resposta.explanation}</p></center>`);
        if (resposta.media_type == 'image') {
        imagem.append(`<center><img width="580" height="580" src="${resposta.url}" /></center>`);
      } else if (resposta.media_type == 'video') {
        imagem.append(`<center><iframe width="560" height="315" src="${resposta.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center>`)
      } else {
        imagem.append('<h1>Formato da mídia inválida.</h1>');
      }
    },

    error: erro => {
      alert('Ocorreu um erro ao consultar a API do APOD. Tente novamente com outra data.')
    }
  });
}

consultaAPI();

$('#consulta').on('submit', function (evento) {

  evento.preventDefault();

  var data = $('#data').val();

  consultaAPI(data);
});