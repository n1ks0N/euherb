const $ = jQuery;
const getProps = window.location.search; 
const id = Number(getProps.split('=')[1]); // ?id=0 --> 0

document.addEventListener('DOMContentLoaded', () => fetchProduct());

const fetchProduct = () => {
  fetch('http://showcase.monstatis.com/api/products?page=1')
    .then(response => response.json())
    .then(result => {
    result.items.map(data => {
      if (data.id === id) {
        console.log(data.id, id, result.items[3])
        $('.entry-title').text(data.name)
        $('.description').append(data.description)
      }
    })
    })
}