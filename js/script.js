//parte principal
let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')

//parte lateral
let lateral = document.querySelector('.d-1-right')
let reinicio = document.querySelector('.reiniciar img')
let listas =document.querySelector('.lista img')

//numeros
let numeros = document.querySelector('.d-1-3')


//controle de ambiente

let etapaAtual = 0
let numero = ''
let votoBranco = false
let votos = []

//funções
function comecarEtapa() {
    new Audio('audio/se2.mp3').play()

    let etapa = etapas[etapaAtual]
    let numeroHtml = ''
    numero = ''
    votoBranco = false

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
            numeroHtml += '<div class="numero"></div>'
        }

    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
    reinicio.style.display = 'none'

}

function atulizaInterface() {

    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true
        } else {
            return false
        }
    })
    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido} `

        let fotosHtml = ''
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`

            } else {
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }
        }

        lateral.innerHTML = fotosHtml
    } else {
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = `<div class = "aviso-grande pisca">VOTO NULO<div/> `
    }



}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca')
    if (elNumero !== null) {
        elNumero.innerHTML = n
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca')
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atulizaInterface()
        }
        (new Audio('audio/se1.mp3')).play()


    }

}

function branco() {
    if (numero === '') {
        votoBranco = true
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        numeros.innerHTML = ''
        descricao.innerHTML = `<div class = "aviso-grande pisca">VOTO BRANCO<div/> `

    } else {
        alert('Para Vota em Branco nao pode ter digitado nenhum numero')
    }
    (new Audio('audio/se1.mp3')).play()

}

function corrige() {
    (new Audio('audio/se2.mp3')).play()
    comecarEtapa()


}

function confirma() {

    let etapa = etapas[etapaAtual]
    let votoConfirmado = false



    if (votoBranco === true) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if (votoConfirmado) {
        etapaAtual++
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa()
        } else {
            (new Audio('audio/se3.mp3')).play()
            document.querySelector('.tela').innerHTML = `<div class = "aviso-gigante pisca">FIM<div/> `
            document.querySelector('.reiniciar').innerHTML = `<img src="images/reiniciar.png" alt="REINICIAR">`
            listas.style.display = 'none'
            console.log(votos)
        }
    }
}

function reiniciar(){
    document.location.reload();
}

function listar(){
    alert(`Candidatos a Vereador

    SAKURA - 38111
    HINATA - 38234
    YAMCHA - 38234
    BILLS - 84666
    BULMA - 84789
    
    Candidatos a Prefeito
    
    GOKU - 84
    NARUTO - 38`)
}


comecarEtapa()