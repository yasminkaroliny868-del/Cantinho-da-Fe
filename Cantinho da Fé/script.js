
// Produtos da loja
const produtos = [
    {
        nome: "Terço",
        preco: 25,
        imagem: "imagens/terco.jpg"
    },
    {
        nome: "Bíblia Sagrada",
        preco: 45,
        imagem: "imagens/biblia.jfif"
    },
    {
        nome: "Crucifixo",
        preco: 30,
        imagem: "imagens/crucifixo.jfif"
    },
    {
        nome: "Medalha de Nossa Senhora",
        preco: 20,
        imagem: "imagens/medalha.jfif"
    },
    {
        nome: "Imagem de Santos",
        preco: 50,
        imagem: "imagens/santos.jfif"
    }
];

// Criar os produtos na tela
const lista = document.getElementById("lista-produtos");

for (let produto of produtos) {
    lista.innerHTML += `
        <div class="produto">
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p class="preco">
                R$ ${produto.preco.toFixed(2).replace(".", ",")}
            </p>
            <button onclick="selecionarProduto('${produto.nome}')">
                Comprar
            </button>
        </div>
    `;
}

// Produto selecionado
let produtoSelecionado = null;

// Carrinho de compras
let carrinho = [];

// Selecionar produto
function selecionarProduto(nome) {
    produtoSelecionado = produtos.find(item => item.nome === nome);

    document.getElementById("resultado").textContent =
        nome + " selecionado! Escolha a quantidade.";

    document.getElementById("pedido").scrollIntoView();
}

// Atualizar carrinho
function atualizarCarrinho() {
    const area = document.getElementById("carrinho");
    let total = 0;

    if (carrinho.length === 0) {
        area.innerHTML = "Seu carrinho está vazio.";
    } else {
        area.innerHTML = "";

        for (let item of carrinho) {
            area.innerHTML += `
                <p>${item.quantidade}x ${item.nome} - 
                R$ ${(item.preco * item.quantidade).toFixed(2).replace(".", ",")}</p>
            `;

            total += item.preco * item.quantidade;
        }
    }

    document.getElementById("total").textContent =
        "Total: R$ " + total.toFixed(2).replace(".", ",");
}

// Finalizar pedido
function finalizarPedido() {
    const quantidadeTexto =
        document.getElementById("quantidade").value.trim();

    const resultado = document.getElementById("resultado");

    if (produtoSelecionado === null) {
        resultado.textContent = "Primeiro escolha um produto!";
        return;
    }

    if (!/^[0-9]+$/.test(quantidadeTexto)) {
        resultado.textContent = "Digite uma quantidade válida!";
        return;
    }

    const quantidade = Number(quantidadeTexto);

    if (quantidade < 1 || quantidade > 100) {
        resultado.textContent = "Escolha uma quantidade entre 1 e 100!";
        return;
    }

    const itemExistente = carrinho.find(
        item => item.nome === produtoSelecionado.nome
    );

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({
            nome: produtoSelecionado.nome,
            preco: produtoSelecionado.preco,
            quantidade: quantidade
        });
    }

    atualizarCarrinho();

    localStorage.setItem("ultimoPedido", JSON.stringify(carrinho));

    resultado.textContent = "Produto adicionado ao carrinho! 💙";

    document.getElementById("quantidade").value = "";

    produtoSelecionado = null;

    mostrarUltimoPedido();
}

// Mostrar último pedido salvo
function mostrarUltimoPedido() {
    const salvo = localStorage.getItem("ultimoPedido");

    if (salvo) {
        const pedidos = JSON.parse(salvo);

        if (pedidos.length > 0) {
            document.getElementById("ultimo-pedido").textContent =
                "Seu último pedido foi salvo com sucesso!";
        }
    }
}

// Verificar horário de funcionamento
const hora = new Date().getHours();

if (hora >= 8 && hora < 18) {
    document.getElementById("status").innerText =
        "Estamos abertos! Seja bem-vindo(a) 💙";
} else {
    document.getElementById("status").innerText =
        "No momento estamos fechados. Volte em breve! 💙";
}
// Recuperar carrinho salvo
const pedidoSalvo = localStorage.getItem("ultimoPedido");

if (pedidoSalvo) {
    carrinho = JSON.parse(pedidoSalvo);
    atualizarCarrinho();
    mostrarUltimoPedido();
}

