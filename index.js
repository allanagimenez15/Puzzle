function mover(ev) {

    if (blockMoviment == true) {
        return;
    }

    // conta os cliques
    countPosition++;
    
    // Atualiza o contador no HTML
    document.getElementById('contador-movimentos').textContent = 'Movimentos: ' + countPosition;

    console.log(countPosition);

    let bt = Number(ev.target.id.slice(1)); // armazena número do botão (0 a 15)
    let lin = Math.floor(bt / 4); // calcula a linha da matriz
    let col = bt % 4; // calcula a coluna da matriz
    
    // verifica se o botão pressionado é vizinho do espaço vazio (valor igual a 0)
    let viz = false;
    let linvz, colvz; // linha e coluna do espaço vazio

    // calcula posição do espaço vazio
    if (lin - 1 > -1 && matriz[lin - 1][col] == 0) { // acima
        linvz = lin - 1;
        colvz = col;
        viz = true;
    } else if (col + 1 < 4 && matriz[lin][col + 1] == 0) { // direita
        linvz = lin;
        colvz = col + 1;
        viz = true;
    } else if (lin + 1 < 4 && matriz[lin + 1][col] == 0) { // abaixo
        linvz = lin + 1;
        colvz = col;
        viz = true;
    } else if (col - 1 > -1 && matriz[lin][col - 1] == 0) { // esquerda
        linvz = lin;
        colvz = col - 1;
        viz = true;
    }

    if (viz) {
        som(sndclick, 1, 1.2);

        // movimento do botão pressionado para o espaço vazio
        let aux = matriz[lin][col];
        matriz[lin][col] = matriz[linvz][colvz];
        matriz[linvz][colvz] = aux;
        desenhar();
    }

    // verifica se é final de jogo
    if (JSON.stringify(matriz) === JSON.stringify(gameOver)) {
        blockMoviment = true;
        console.log("Fim de jogo")
        alert("Parabéns! Você completou o quebra-cabeça em " + countPosition + " movimentos!");
    }
}

function desenhar() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let p = i * 4 + j;
            let button = document.getElementById('b' + p);
            
            if (matriz[i][j] == 0) {
                button.hidden = true;
            } else {
                button.hidden = false;
                // Remove todas as classes de peça
                button.className = 'puzzle-piece';
                // Adiciona a classe específica para esta peça
                button.classList.add('piece-' + matriz[i][j]);
            }
        }
    }
}
/*
function desenhar() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let p = i * 4 + j; // transforma i e j em um valor de 0 a 15
            document.getElementById('b' + p).hidden = false;
            if (matriz[i][j] == 0) // esconde o botão de valor zero
                document.getElementById('b' + p).hidden = true;
            else
                document.getElementById('b' + p).innerHTML = matriz[i][j]; // mostra o valor do botão
        }
    }
}
*/
function som(som, vol, vel) {
	let snd = new Audio(som);
    snd.volume = vol;
	snd.playbackRate = vel;
	snd.play();
}

// código executado ao abrir ou atualizar a página

const sndclick = 'click.mp3';

// declaração da variável para contador
let countPosition = 0;
const gameOver = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];
let blockMoviment = false;


// define o evento 'click' para os botões (partes)
const bts = document.getElementById('partes');
bts.addEventListener('click', mover);

// gera aleatórios distintos de 0 a 15
let vals = []; // lista vazia
for (let i = 0; i < 16; i++) { 
    let v;
    do {
        v = Math.floor(Math.random() * 16); // gera aleatório entre 0 e 15
    } while (vals.includes(v)); // se já foi incluído, gera outro valor
    vals.push(v); // insere valor na lista 'vals'
}

// insere aleatórios na matriz do jogo
let matriz = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
for (let i = 0; i < 4; i++) { // percorre as linhas da matriz
    for (let j = 0; j < 4; j++) { // percorre as colunas da matriz
        let p = i * 4 + j; // posição da lista aleatória que será inserida
        matriz[i][j] = vals[p]; // posição i,j recebe o valor aleatório    
    }
}
matriz = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 0, 15]];
desenhar();
