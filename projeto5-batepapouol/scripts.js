let header = document.querySelector('header')
let main = document.querySelector('main')
let footer = document.querySelector('footer')
let section = document.querySelector('section')
let input1 = document.querySelector('.textE')
let objetoNome = {
  name: '' //objetoNome.name = input.value
}
console.log(objetoNome)

function promtNome() {
  //se eu coloco input.value ele fica bugado
  objetoNome.name = prompt('qual seu nome?')
  let response = axios.post(
    'https://mock-api.driven.com.br/api/v4/uol/participants ',
    objetoNome
  )

  response.then(EntradaLiberada)
  response.catch(entradaFechada) //AQUI NESSA ESTRUTURA ,EU TENTEI POR UM IF PRA RODAR O INPUT VALUE , MAS N RODOU PQ ELE FICA COM O CATCH ATE O FIM DOS TEMPOS E DAI , NEM DA PRA ESCREVER
  /*if() */
}
promtNome()

function EntradaLiberada(resposta) {
  header.classList.remove('selecionar')
  main.classList.remove('selecionar')
  footer.classList.remove('selecionar')
  section.classList.add('selecionar')

  console.log(resposta)
}
function entradaFechada(erro) {
  alert(
    'Status code: ' +
      erro.response.status +
      ',' +
      ' Mensagem de erro: ' +
      erro.response.data +
      ' , ' +
      ' por favor , digite outro nome para ter acesso '
  )
  promtNome()
}

function inputMensage() {
  let input2 = document.querySelector('.texto2').value
  if (input2 !== '') {
    porMensagensNoServidor()
  } else {
    window.location.reload()
  }
}

function porMensagensNoServidor() {
  let input2 = document.querySelector('.texto2').value
  let objetoPorNoServidor = {
    from: objetoNome.name,
    to: 'Todos',
    text: input2,
    type: 'message' // ou "private_message" para o bônus
  }
  console.log(objetoPorNoServidor)
  let porMensagem = axios.post(
    'https://mock-api.driven.com.br/api/v4/uol/messages',
    objetoPorNoServidor
  )
}

function pegarMensagensServidor() {
  let pegarMensagem = axios.get(
    'https://mock-api.driven.com.br/api/v4/uol/messages'
  )
  pegarMensagem.then(GetMensagens)
}

function GetMensagens(pegar) {
  main.innerHTML = ``

  //aqui é onde as mensagens serão postas
  let array = pegar.data
  for (let i = 0; i < array.length; i++) {
    main.innerHTML += `
    
  <div class="mensagem ${array[i].type}" data-identifier="message">
        <p><small>(${array[i].time})</small> <strong>${array[i].from}</strong> : ${array[i].text}</p>
      </div>

  `
  }

  let mensagem = document.querySelector('.mensagem').scrollIntoView
}
//aqui é pra pegar as mensagens de 3 em 3 seg
setInterval(pegarMensagensServidor, 3000)

function avisarServidorDeUsuario() {
  if (objetoNome.name) {
    //se o objeto.name é true então ele faz tal coisa
    let response = axios.post(
      'https://mock-api.driven.com.br/api/v4/uol/participants ',
      objetoNome
    )
  } else {
    //se n ele é considerado fora do bate papo
  }
}
setTimeout(avisarServidorDeUsuario, 5000)

//lógica da sidebar
function AsideClick() {
  //aqui tenho dificuldade de colocar pra funcionar ... pegar o status de outro lugar me buga
  let aside = document.querySelector('aside')
  aside.classList.remove('selecionar')
}
function pickAFriend() {
  /*AQUI É PRA DINAMIZAR AS PESSOAS QUE ESTÃO NO CHAT*/
  // essa parte .. no caso tem que ter uma array com todos os participantes ( a api , pensei em dar um get nela e por numa array oq ela enviar ... será que tá certo? e bom , depois rodar um for dessa array[i] e dai fazer addicionar esse innerHtml Abaixo pra cada pessoa existente no bate-papo)
  aside.innerHTML += `
  <div class="aside">
  <ion-icon class="pessoaA" name="person-circle"></ion-icon>
  <p>${objeto.name}</p>
  <div class="vec">
    <img class="vector" src="vector (1).png" alt="o check verdinho" />
  </div>
</div>
  `
}
/*aqui era pra selecionar privado ou n  */
function sidePrivateOrNOt(GetMensagens) {
  let aberto = document.querySelector('.aberto')
  let fechado = document.querySelector('.fechado')
  if (array[i].type == 'private_message') {
    fechado.classList.add('selecionar')
  } else {
    aberto.classList.add('selecionar')
  }
}
