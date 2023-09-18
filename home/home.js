
      // Função para realizar a pesquisa
      function searchProducts(query) {
        const productsContainer = document.getElementById("productsContainer");
        const searchResults = document.getElementById("searchResults");

        // Limpa os resultados anteriores
        productsContainer.innerHTML = "";
        searchResults.innerHTML = "";

        fetch("../dados/products.json")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Erro ao buscar produtos: " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            const lowerCaseQuery = query.toLowerCase();

            // Filtra os produtos com base na pesquisa
            const filteredProducts = data.produtos.filter((product) => {
              const lowerCaseName = product.nome.toLowerCase();
              return lowerCaseName.includes(lowerCaseQuery);
            });

            // Exibe os resultados da pesquisa
            filteredProducts.forEach((product) => {
              const productDiv = document.createElement("div");
              productDiv.classList.add(
                "bg-white",
                "p-4",
                "mb-4",
                "shadow-md",
                "flex"
              );

              // Adicione a imagem ao produto
              const productImage = document.createElement("img");
              productImage.setAttribute("src", product.imagem_url);
              productImage.setAttribute("alt", product.nome);
              productImage.classList.add(
                "my-2",
                "mx-auto",
                "ml-16",
                "h-48",
                "w-48"
              );

              // Crie a seção de informações do produto
              const productInfo = document.createElement("div");
              productInfo.classList.add("w-3/4", "pl-4");

              // Preencha as informações do produto
              const productName = document.createElement("h2");
              productName.classList.add("text-xl", "font-semibold", "mb-2");
              productName.textContent = product.nome;

              const productDescription = document.createElement("p");
              productDescription.classList.add("text-gray-700", "mb-2");
              productDescription.textContent = product.descricao;

              const productPrice = document.createElement("p");
              productPrice.classList.add("text-blue-600", "font-semibold");
              productPrice.textContent = `R$ ${product.preco.toFixed(2)}`;

              // Adicione todas as informações ao produto
              productInfo.appendChild(productName);
              productInfo.appendChild(productDescription);
              productInfo.appendChild(productPrice);

              productDiv.appendChild(productImage);
              productDiv.appendChild(productInfo);

              productsContainer.appendChild(productDiv);
            });

            // Se não houver resultados, exibe uma mensagem
            if (filteredProducts.length === 0) {
              const noResultsMessage = document.createElement("p");
              noResultsMessage.textContent = "Nenhum resultado encontrado.";
              searchResults.appendChild(noResultsMessage);
            }
          })
          .catch((error) => {
            console.error(error.message);
          });
      }

      // Monitora o evento de entrada no campo de pesquisa
      const searchInput = document.getElementById("searchInput");
      searchInput.addEventListener("input", function () {
        const query = searchInput.value;
        searchProducts(query);
      });

      // Chama a função de pesquisa inicialmente para mostrar todos os produtos
      searchProducts("");