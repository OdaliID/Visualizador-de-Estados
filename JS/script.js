async function carregarDados() {
  try {
    const response = await fetch('/json/estados.json')
    const lista = await response.json()
    return lista
  } catch (erro) {
    alert(erro)
  }
}

async function apresentarLista() {
  const estados = await carregarDados()
  ul = document.querySelector('#lista')

  estados.forEach(estado => {
    li = document.createElement('li')
    li.innerHTML = `${estado.uf} - ${estado.nome}`
    ul.appendChild(li)
  })
}
async function criarMapa() {
  const mapa = new google.maps.Map(document.querySelector('#map'), {
    zoom: 4,
    center: { lat: -14.2400732, lng: -53.1805017 } //Brasil
  })

  const estados = await carregarDados()
  estados.forEach(estado => {
    const marcador = new google.maps.Marker({
      position: { lat: estado.latitude, lng: estado.longitude },
      map: mapa
    })
  })
}

document.addEventListener('DOMContentLoaded', apresentarLista())
