const { ipcRenderer } = require('electron');



console.log('realmente da console log em algum render?')
const formulario = document.querySelector('form');

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const tempo = document.querySelector('#tempo').value;

    ipcRenderer.send('agendar-desligamento', tempo);
});


function cancelarDesligamento() {
    ipcRenderer.send('cancelar-desligamento');
}

function definirTemporizador() {
    const contador = document.querySelector('#contador')
    console.log('ola mundoooooooooooooo')


    ipcRenderer.send('carregamento-concluido')
    ipcRenderer.on('atualizar-temporizador', (event, tempo) => {
        console.log('recebeu evento' + tempo)
        let segundosRestantes = tempo * 60
        let intervaloContador = setInterval(() => {
            segundosRestantes--
            contador.innerText = segundosRestantes
            if (segundosRestantes <= 0) {
                clearInterval(intervaloContador)
                window.close()
            }
        }, 1000)
    })



}








