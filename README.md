# Dashboard Web de Ferramentas Multimédia com IA

**Disciplina:** Oficina de Multimédia — 12.º Ano — CRSI  
**Ano letivo:** 2026/2027  
**Autor:** José Gonçalo Quitério de Oliveira Redondo  
**Turma:** B  
**Link da aplicação web:** https://daaascat.github.io/Dashboard_Multimedia/projeto_final_multimedia.html 
**Proposta escolhida:** Proposta 1

## 1. Visão geral do projeto

Este projeto é composto por três ferramentas diferentes colocadas numa única página: um analisador de textos poéticos, um validador de especificações multimédia e um jogo Tetris. O objetivo é criar uma aplicação simples de utilizar, com um menu inicial que permite escolher entre o dashboard dos Widgets 1 e 2 e o Widget 3.

A página que reúne os três trabalhos é o ficheiro `projeto_final_multimedia.html`. Foi construída com HTML, CSS e JavaScript. O projeto inclui também uma versão desenvolvida com Python e Flask para o Analisador Poético/Semântico.

## 2. Estrutura do código e funcionalidades integradas

### Widget 1 — Analisador Poético e Semântico com IA

O utilizador pode escrever ou colar um texto e obter várias informações: número total de palavras e caracteres, quantidade de palavras diferentes e as dez palavras mais frequentes. A ferramenta também apresenta uma nuvem de palavras e pode recorrer ao Gemini para identificar o significado geral, os temas, o tom emocional, as palavras-chave e uma interpretação do texto.

Este widget parte de conteúdos trabalhados na primeira ficha de Python, nomeadamente a utilização de strings, listas, conjuntos, dicionários e contagem de frequências. Na versão Flask, essa lógica está no ficheiro `app.py`, que também utiliza a biblioteca WordCloud para criar a imagem. Na página integrada, a interface e a lógica do analisador estão incluídas em `projeto_final_multimedia.html` e são executadas no navegador. A análise com Gemini depende de uma chave de API válida.

### Widget 2 — Validador de Especificações Multimédia e Formatos

O validador permite introduzir a largura e a altura de uma imagem ou vídeo para verificar a resolução e a proporção. Apresenta referências para HD, Full HD e 4K UHD e identifica proporções comuns, como 16:9, 4:3 e 1:1. Inclui ainda uma área para validar códigos de cor HEX, aceitando os formatos de três ou seis caracteres e apresentando a respetiva amostra de cor e valor RGB.

### Widget 3 — Tetris

O terceiro widget é um jogo Tetris com as sete peças clássicas. Inclui movimentos para a esquerda e para a direita, rotação, queda automática, descida acelerada e queda rápida. Também tem deteção de colisões, eliminação de linhas completas, pontuação, contador de linhas, níveis com dificuldade crescente, pré-visualização da próxima peça, pausa, continuação, reinício e ecrã de fim de jogo.

O jogo pode ser controlado pelas setas do teclado, pela barra de espaço e pela tecla P. Existem também botões no ecrã para controlar as peças em dispositivos táteis. A dificuldade aumenta à medida que são completadas linhas: o nível sobe a cada dez linhas e a velocidade de queda aumenta progressivamente.

O Tetris foi desenvolvido como uma funcionalidade nova, com apoio de ferramentas de Inteligência Artificial. A lógica do jogo está escrita em JavaScript; o HTML define a estrutura e o CSS controla o aspeto visual. O jogo não utiliza Python para os movimentos ou para as regras do Tetris.

 O Tetris é uma alternativa do projeto proposto no widget, construída a com a ajuda das ferramentas de IA.

## 3. Registo de utilização da Inteligência Artificial

Durante o desenvolvimento foram utilizadas diferentes tipos de AI. O Claude foi utilizado no trabalho de estruturação e desenvolvimento dos Widgets 1 e 2 e na organização dos ficheiros. A Knowie foi utilizada para o desenvolvimento do Tetris.O Chatgpt foi utilizado para criar prompts para auxiliar as restantes AI. O Gemini é utilizado pelo Analisador quando se pretende obter uma interpretação automática do texto.

### 3.1. Pedidos para conversão e organização em Web/HTML

No Widget 1, pedi que o código fosse apresentado por partes, identificando as bibliotecas, o servidor Python, a estrutura HTML, a página inicial, o analisador e o CSS. No Widget 2, pedi que o código fosse separado por ficheiros e que fosse possível visualizar uma versão em HTML no Visual Studio Code. Mais tarde, também pedi para reunir os trabalhos numa página com um menu inicial que permitisse escolher qual dos projetos abrir.

### 3.2. Pedidos para ampliar e construir funcionalidades

Para o Widget 2, solicitei um validador que verificasse resoluções, proporções e códigos de cor HEX, mantendo os restantes elementos do projeto.

Para o Tetris, o pedido à Knowie foi criar o seu código base especificando as caracteristicas que desejava, com as peças clássicas, movimentos, rotação, colisões, eliminação de linhas, pontuação níveis e controlos de teclado e de ecrã tátil. Também pedi uma área que mostrasse a próxima peça, para ser possível preparar a jogada seguinte e um botão de pausa e de reinício para parar ou reiniciar o jogo se necessário.

### 3.3. Dificuldades e erros tratados com apoio da IA

Uma das dificuldades foi organizar o código, porque os widgets foram desenvolvidos em momentos diferentes e nem todos tinham inicialmente a mesma estrutura. Foi necessário distinguir os ficheiros HTML, CSS, JavaScript e Python e perceber qual era a função de cada um. No caso do Tetris, também foi preciso separar o código que estava inicialmente reunido numa página HTML pelos ficheiros `tetris.html`, `tetris.css` e `tetris.js`.

Ao nível das funcionalidades, o código inclui verificações para situações como a submissão de um texto vazio ou demasiado comprido, falhas na comunicação com a API Gemini, dimensões inválidas e códigos HEX incorretos. No Tetris, foram incluídas verificações de colisão para impedir que as peças ultrapassem os limites do tabuleiro ou se sobreponham às peças já colocadas.

### 3.4. Otimização do layout

Pedi uma interface mais cuidada e profissional, mantendo uma linha visual semelhante entre os trabalhos. Foram utilizados fundos escuros, tons de roxo e azul, cartões com cantos arredondados, botões destacados e espaçamento entre as diferentes áreas. No Tetris, pedi ainda que o tabuleiro ficasse bem visível, que a pontuação e o nível fossem fáceis de consultar e que os controlos se adaptassem a ecrãs mais pequenos.

Também pedi alterações aos textos do menu: o título passou a ser “Dashboard Web de Ferramentas Multimédia com IA”, o primeiro cartão passou a identificar os Widgets 1 e 2 e o segundo passou a apresentar o Widget 3 — Tetris.

## 4. Estrutura de ficheiros do repositório

A pasta do projeto contém os seguintes ficheiros principais:

- `projeto_final_multimedia.html` — página autónoma com o menu inicial, o dashboard dos Widgets 1 e 2 e o jogo Tetris.
- `widget_1e2.html` — versão autónoma dos Widgets 1 e 2.
- `widget_3tetris.html` — versão autónoma do Tetris.
- `app.py` — aplicação Flask e lógica Python do Analisador Poético/Semântico.
- `requirements.txt` — bibliotecas Python necessárias à versão Flask.
- `templates/` — páginas HTML utilizadas pela aplicação Flask.
- `static/css/style.css` — estilos gerais da versão Flask.
- `static/css/tetris.css` — estilos do Tetris separado.
- `static/js/tetris.js` — lógica JavaScript do Tetris separado.
- `README.md` — este documento, com a descrição do projeto e do processo de desenvolvimento.
- `.gitignore` — indica ficheiros e pastas que não devem ser enviados para o repositório Git.

## 5. Reflexão crítica e aprendizagem

Ao longo deste projeto, fui percebendo que criar uma aplicação com vários widgets não era apenas desenvolver cada um deles separadamente. Também foi preciso pensar na forma como tudo iria funcionar em conjunto, organizar os ficheiros e perceber como as diferentes linguagens se complementavam. Uma das partes que me deu mais trabalho foi juntar os vários códigos numa só interface, principalmente porque alguns estavam preparados para funcionar de forma autónoma e outros para serem utilizados com Flask.

A Inteligência Artificial ajudou-me a avançar mais depressa, a encontrar formas de implementar funcionalidades e a compreender partes do código que não conhecia tão bem. Ao mesmo tempo, percebi que não basta copiar aquilo que uma ferramenta gera: é importante ler o código, perceber o que cada ficheiro faz e confirmar se as funcionalidades correspondem ao que foi pedido. Este trabalho permitiu-me ganhar mais prática a trabalhar com diferentes linguagens e perceber melhor a importância de testar e rever uma aplicação antes de a considerar terminada.


# Prompts utilizados no desenvolvimento do trabalho

## Widget 1 — Analisador Poético e Semântico com IA

.Claude

«Apresente os ficheiros um a um.»

«Qual é que é o código das bibliotecas?»

«E o código Python do servidor?»

«E o código HTML da estrutura?»

«E o código da página inicial?»

«E o código do analisador?»

«E todo o código CSS que enviaste anteriormente?»



## Widget 2 — Validador de Especificações Multimédia

.Claude

«Dá cada tipo de código em ficheiros separados.»

«Não utilizes JavaScript.»

«Agora coloca tudo no formato HTML para conseguir visualizar no VS Code.»



## Widget 3 — Jogo Tetris

.Claude e Knowie

«Faz uma continuação do código que mostre a próxima peça. Faz em HTML, de forma a que possa copiar e colar diretamente no código anterior.»

### Prompt de desenvolvimento do Tetris:

«Criar Widget 3 — Jogo Tetris quero que desenvolvas um jogo de Tetris funcional para integrar num projeto escolar chamado "Dashboard de Ferramentas Multimédia com IA", desenvolvido em Python, HTML, CSS e JavaScript, utilizando Flask e que possoa estas caracteristicaseliminação de linhas completas,sistema de pontuação,aumento progressivo da dificuldade,botão para iniciar o jogo,botão para pausar e continuar,botão para reiniciar,ecrã de fim de jogo.



### Dashboard — Interface e integração dos trabalhos

.Claude

«Pôr a interface um pouco mais bonita e profissional.»

### Alterações solicitadas nos textos da interface

Alterar o título para «Dashboard Web de Ferramentas Multimédia com IA».

Alterar «Trabalho 01» para «Widget 1 e 2».

Alterar o primeiro cartão para «Analisador Poético e Semântico com IA e Validador de Especificações Multimédia & Formatos».

Alterar «Trabalho 02» para «Widget 3».