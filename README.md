# Buscador de Cupons Promocionais

Olá, seja bem!
Este sistema foi desenvolvido em um bootcamp da RocketSeat, ele tem a finalidade de falicitar a busca por cupons promocionais. Ele esta disponivel para clonagem, siga os passos e o adapte de acordo com a sua realidade

## Visão Geral

O Buscador de Cupons Promocionais é um aplicativo desenvolvido para simplificar a busca e utilização de cupons promocionais de lojas parceiras. Ele oferece aos usuários uma maneira prática e rápida de acessar descontos exclusivos, promovendo economia e conveniência. A aplicação é voltada tanto para consumidores que desejam aproveitar ofertas promocionais quanto para lojistas que buscam aumentar o engajamento e fidelização de clientes.

Com funcionalidades como leitura de QR Codes e exibição de lojas próximas ao usuário, o sistema oferece uma experiência fluida e intuitiva. Este projeto está disponível para clonagem e personalização, permitindo sua adaptação conforme as necessidades do desenvolvedor.


## Funcionalidades

- **Listagem de lojas parceiras:** Tras a listagem de todas lojas parceiras do sistema.
- **Leitura de QrCode:** É possivel ler o QrCode promocional nas lojas parceiras e utilizar os cupons disponíveis.

## Tecnologias Utilizadas

- **React-native:** Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript:** Superset de JavaScript que adiciona tipos estáticos ao código.
- **ExpoGo:** Utilizado para testes de desenvolvimento.


## Instalação

Para rodar este projeto localmente, siga os passos abaixo:
Atenção, o backend atual deste aplicativo e muito simples e sem segurança pois foi desenvolvido somente para testar as funcionalidades do frontend.
Fique a vontade para desenvolver seu proprio backend com os niveis de segurança que achar necessário.


### FrontEnd

1. Clone o repositório:
   ```bash
   git clone https://github.com/JosueCosta2023/nlw-mobile.git

2. Instale as dependências
    ```bash
    npm install

3. Na pasta `services/api`, altere o valor do baseUrl para o ip local de sua maquina.
    
    ```bash
   baseURL: "http://localhost:3333"

4. Inicie o frontend do aplicativo
    ```bash
    npx expo start --clear  

### Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/JosueCosta2023/api.git

2. Instale as dependências
    ```bash
    npm install


3. Inicie o frontend do aplicativo
    ```bash
    npx start   

### Ilustração
<div style="display:flex, justifyContent: center, width: 1024px">

![Imagem](/src/assets/figma.png)
</div>


## Uso
O sistema irá exibir as lojas cadastradas de acordo com a sua localização, ao clicar sobre a loja você será direcionado a pagina de detalhes onde sera possivel ler o qrcode promocional e regastar seus cupons promocionais.

## Estrutura do Projeto
* `src/app/start`: Pagina inicial, contém um breve tutorial de como utilizar o aplicativo. 
* `src/app/home`: Exibe o mapa da localização do usuario, aqui é possivel encontrar as lojas que fazem parte do sistema na sua região.
* `src/app/market` : Exibe a lista de lojas 
* `src/app/market/[id].tsx` : Detalhes da loja selecionada


## Author
### Josué Ocanha Costa
### Paceiros de Desenvolvimento - Bootcamp RocketSeat
#### FrontEnd Developer
#### Redes Sociais

- Linkedin - [JosueOcanhaCosta](https://www.linkedin.com/in/josue-ocanha-costa/)
- Github - [JosueCosta2023](https://github.com/JosueCosta2023)
- Twitter - [@JosueOcanhaCosta](https://twitter.com/josue_ocanha)
- Facebook - [JosueCosta](https://www.facebook.com/JosueOcanhaCosta2023)
- Whatsapp - [Josue2023](https://wa.me/5565996408371?text=Ol%C3%A1%2C+encontrei+seu+whatsapp+no+Github.+Gostaria+de+falar+sobre+seus+projetos.)

# "Vida longa e próspera. 🖖🖖🖖"
Feito com o ❤️ por Josué Ocanha Costa
## [Realize testes](Necessaria Instalação Local)
### [Acesse o repositório](https://github.com/JosueCosta2023/nlw-mobile)