const { ipcRenderer } = require('electron');

const formulario = document.querySelector('form');
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const tempo = document.querySelector('#tempo').value;

    ipcRenderer.send('agendar-desligamento', tempo);
});

const botaoCancelar = document.querySelector('#cancelar');
botaoCancelar.addEventListener('click', () => {
    ipcRenderer.send('cancelar-desligamento');
});