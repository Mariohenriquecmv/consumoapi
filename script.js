// Função para abrir o formulário
function abrirFormulario() {
  document.getElementById("modalCadastroProduto").style.display = "block";
}

// Função para fechar o formulário
function fecharFormulario() {
  document.getElementById("modalCadastroProduto").style.display = "none";
}

// Fechar o modal se o usuário clicar fora da caixa de conteúdo
window.onclick = function (evento) {
  if (evento.target == document.getElementById("modalCadastroProduto")) {
    fecharFormulario();
  }
};



async function carregarProdutos(filtro=''){ // definir por padrão filtro vazio
  const url = 'https://675b512e9ce247eb1936449d.mockapi.io/Uvas'
  const resposta = await fetch(url)
  const dadosProdutos = await resposta.json()

  const produtosFiltrados = dadosProdutos.filter(produto => produto.nome.toLowerCase().includes(filtro.toLowerCase()))


  const main = document.querySelector('#produtos-galeria')
  main.innerHTML = ''
  produtosFiltrados.forEach(produto => {
      const estruturaHtmlProduto = `
      <section class="cartao-item">z
          <img src="${produto.imagem}" alt="Item 1" />
          <h3>${produto.nome}</h3>
          <p class="preco-item">R$ ${produto.preco}</p>
          <button class="botao-comprar">Comprar</button>
      </section>
      `
      main.innerHTML += estruturaHtmlProduto
})

}


async function adicionarProduto(){
  try{
    const nomeDigitado = document.querySelector('#nomeProduto').value
    const precoDigitado = document.querySelector('#precoProduto').value
    const urlImagem = document.querySelector('#imagemProduto').value

    if(!nomeDigitado){  // opção de uso do OU = pipi -> if(!nomeDigitado || !precoDigitado || !imagemProduto
      throw new Error("O nome não foi preenchido.") 
    }
    if(!precoDigitado){
      throw new Error("O preço não foi digitado.")
    }
    if(!imagemProduto){
      throw new Error("A imagem não foi adicionada.")
    }


    const dadosProduto = {
        nome: nomeDigitado,
        preco: precoDigitado,
        imagem: urlImagem
    }
    
    const url = `https://675b512e9ce247eb1936449d.mockapi.io/Uvas`
    const resposta = await fetch(url,{
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(dadosProduto)
    })

    if(!resposta.ok){
      throw new Error("erro ao add na api.", resposta.statusText)
    }

    alert('Produto adicionado com sucesso')
    carregarProdutos()
    fecharFormulario()
  } catch(erro){
    console.error("Erro ao cadastrar produto.", erro.message)
  }

}

const inputBarraPesquisar = document.querySelector('#pesquisar')
inputBarraPesquisar.addEventListener("input",(evento) => {
  const produtoDigitado = inputBarraPesquisar.value
  carregarProdutos(produtoDigitado)
})
carregarProdutos()
