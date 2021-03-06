# Desafio Pedido Pago - Vaga front-end

Esse projeto foi proposto como desafio da Pedido Pago para os candidatos à vaga de desenvolvedor front-end.

## O desafio

O desafio proposto pode ser visto clicando [aqui](https://github.com/gmorang/pp-challenge).

Nele são requeridas as seguintes funcionalidades:

- Login de usuário (user: admin, password: admin),
- CRUD de categorias utilizando os endpoints,
- As telas de categorias devem ter rotas privadas, solicitando o login,

Utilizando as seguintes tecnologias:

- React,
- Material-UI,
- Axios,
- React-Router-Dom.

Também foi enviado o link do figma com a UI da Pedido Pago para ter como exemplo.

## Resultados

### Visualizando a aplicação

Ao clonar o repositório será necessário instalar as dependências:

### `yarn`

Após concluir esse processo, para iniciar o projeto:

### `yarn start`

Para visualizar a aplicação entre em [http://localhost:3000](http://localhost:3000).

### Utilizando a aplicação

O login se encontra na [rota raiz](http://localhost:3000). Para acessar, entrar com as credenciais:
- email/usuário: admin
- senha: admin

Com o login concluído é possível acessar a [página de categorias](http://localhost:3000/categories), onde estão listadas todas as categorias existentes e ações que podem ser feitas pelo usuário, como:
- Cadastrar nova categoria;
- Alterar a visibilidade de uma categoria;
- Deletar uma categoria;
- Atualizar os dados de uma categoria;

Ao clicar no botão de cadatrar uma nova categoria o usuário será direcionado para a página [/new-category](http://localhost:3000/new-category), onde precisará preencher alguns dados necessários para o cadastro da mesma.

Ao clicar no botão de alterar visibilidade um modal será aberto onde o usuário poderá alterar a visibilidade da categoria em questão (de acordo com a UI fornecida no figma) ou desistir da ação.

Ao clicar em deletar uma categoria o usuário poderá excluir permanentemente aquela categoria ou desistir da ação.

Ao clicar em editar o usuário será direcionado para a página [/category/:id](http://localhost:3000/category/id), onde poderá visualizar os dados da categoria, fazer alterações no nome da categoria, por exemplo, dentre outros atributos, ou desistir da ação.

Caso o usuário tente acessar qualquer rota que não uma das mencionadas acima, aparecerá uma página 404.

A UI da aplicação foi feita com base na UI fornecida.
