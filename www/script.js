function configurarEnvioFormulario() {
    const formulario = document.getElementById("formularioChaveAcesso");

    formulario.onsubmit = function (evento) {
        evento.preventDefault();

        const chaveAcesso = document.getElementById("chaveAcesso").value;

        window.location.href = `imagem_aleatoria.html?chaveAcesso=${encodeURIComponent(chaveAcesso)}`;
    }
}


function obterChaveAcessoDaURL() {
    const parametrosURL = new URLSearchParams(window.location.search);
    return parametrosURL.get('chaveAcesso');
}



function buscarImagemAleatoria() {
    const chaveAcesso = obterChaveAcessoDaURL();
    const urlAPI = `https://api.unsplash.com/photos/random?count=1&client_id=${chaveAcesso}`;

    requisicao = new XMLHttpRequest();

    requisicao.open("GET", urlAPI, true);

    requisicao.onload = function () {
        if (requisicao.status === 200) {
            const resposta = JSON.parse(requisicao.responseText);
            const imagem = resposta[0];

            document.getElementById("imagemAleatoria").src = imagem.urls.small_s3;
            document.getElementById("visualizacoes").textContent = imagem.views || "Não disponível";
            document.getElementById("descricao").textContent = imagem.description || "Sem descrição";
            document.getElementById("descricaoAlternativa").textContent = imagem.alternative_slugs.pt || "Sem descrição alternativa";
        } else {
            alert("Chave de acesso não fornecida ou invalida");
        }
    };

    requisicao.onerror = function () {
        alert("Erro na requisição.");
    };

    requisicao.send();
}

function inicializarPagina() {
    paginaAtual = window.location.pathname;

    if (paginaAtual.endsWith("index.html") || paginaAtual === "/") {
        configurarEnvioFormulario();
    } else if (paginaAtual.endsWith("imagem_aleatoria.html")) {
        buscarImagemAleatoria();
    }
}

// Executa a inicialização ao carregar a página
window.onload = inicializarPagina();
