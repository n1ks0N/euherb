const $ = jQuery;
const getProps = window.location.search;
const idProduct = Number(getProps.split('=')[1]); // ?id=0 --> 0

document.addEventListener('DOMContentLoaded', () => {
  if (idProduct) {
    getProduct(idProduct)
  } else {
    getProduct(2)
  }
});

const getProduct = (id) => {
  fetch('http://showcase.monstatis.com/api/products?page=1')
    .then(response => response.json())
    .then(result => {
      let count = 0;
      result.items.map(data => {
        if (count < 3) { // вывод трёх товаров в раздел futured в карточке товара
          count++
          $('.em-reated-posts > .row > .row').append(
            `<article id="${data.id}"
        class="col-lg-4 col-sm-4 col-md-4 latest-posts-grid post type-post status-publish format-standard has-post-thumbnail hentry category-50-off category-health-beauty"
        data-mh="archive-layout-grid">
        <div class="align-items-center">
          <div class="spotlight-post" id="${data.id}">
            <figure class="categorised-article inside-img">
              <div class="categorised-article-wrapper">
                <div class="data-bg-hover data-bg data-bg-categorised"
                  data-background="${data.imageFile}" style="background-image: url(${data.imageFile})"> <a
                    href="index-10.html?id=${data.id}"></a></div>
                <div class="figure-categories figure-categories-bg">
                  <ul class="cat-links">
                    <li class="meta-category"> <a class="covernews-categories category-color-2" href="#"
                        alt="View all posts in 50% OFF"> 50% OFF </a></li>
                    <li class="meta-category"> <a class="covernews-categories category-color-1" href="#"
                        alt="View all posts in Health &amp; Beauty"> Health &amp; Beauty
                      </a></li>
                  </ul>
                </div>
              </div>
            </figure>
            <figcaption>
              <h3 class="article-title article-title-1"> <a href="index-10.html?id=${data.id}">${data.name}</a></h3>
              <div class="grid-item-metadata"> <span class="author-links"> </span></div>
              <div class="full-item-discription">
                <div class="post-description">
                  <p></p>
                </div>
              </div>
            </figcaption>
          </div>
        </div>
      </article>`
          )
        }
        if (data.id === id) { // вывод нужной информации в карточку товара
          $('.ourprice').text(data.price)
          $('.entry-title').text(data.name)
          $('.description').append(data.description)
          $('.wp-block-image').html(`
            <figure class="alignleft is-resized"><img src="${data.imageFile}" alt="Product"
                class="wp-image-6342 zoooom" width="489" height="326" />
              <figcaption><strong>*Best Price Guaranteed</strong></figcaption>
            </figure>
          `)
          document.title = `${data.name}`
        }
      })
    })
}

$('.btn__click').click(() => {

  // получение query string значений
  // example.com?a=1&b=2 => {a: '1', b: '2'}
  const params = new URLSearchParams(getProps);
  let paramObj = {};
  for (let value of params.keys()) {
    paramObj[value] = params.get(value);
  }

  // отправка данных post-запросом

  const url = `http://showcase.monstatis.com/api/products/${idProduct}/order`
  const data = {
    phone: $('#phone').val(),
    name: $('#name').val(),
    params: paramObj
  };

  fetch('url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
    });
    window.location.replace(`thank-you.html?n=${data.name}&ph=${data.phone}&p=${getProps}`)
})