// Função para realizar a pesquisa
async function search(query) {
    const data = await items(); // Aguarda a conclusão da função items
    const produtos = data.produtos; // Cria um array com os produtos
    const nomes = produtos.map((item) => item.nome); // Cria um array com os nomes dos itens
    console.log(nomes);
    const results = nomes.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    return results;
  }
  
  // Função para exibir os resultados da pesquisa
  function displayResults(results) {
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";
  
    if (results.length === 0) {
      searchResults.innerHTML = "Nenhum resultado encontrado.";
      return;
    }
  
    const ul = document.createElement("ul");
    results.forEach((result) => {
      const li = document.createElement("li");
      li.textContent = result;
      ul.appendChild(li);
    });
  
    searchResults.appendChild(ul);
  }
  
  // Evento de digitação no campo de pesquisa
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", async () => {
    const query = searchInput.value;
    const results = await search(query); // Aguarda a conclusão da função search
    displayResults(results);
  });
  
  // Simule uma lista de itens para pesquisa (pode ser substituída por uma solicitação HTTP real)
  async function items() {
    // Suponha que "products.json" seja um arquivo JSON no mesmo diretório
    const response = await fetch("../dados/products.json"); // Use fetch para carregar o arquivo JSON
    const data = await response.json(); // Parse o JSON
    return data;
  }
  