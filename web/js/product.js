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
  fetch(`http://showcase.monstatis.com/api/products/${idProduct}`)
    .then(response => response.json())
    .then(result => {
      $('.ourprice').text(result.price)
      $('.entry-title').text(result.name)
      $('.description').append(result.description)
      $('.wp-block-image').html(`
            <figure class="alignleft is-resized"><img src="${result.imageFile}" alt="Product"
                class="wp-image-6342 zoooom" width="489" height="326" />
              <figcaption><strong>*Best Price Guaranteed</strong></figcaption>
            </figure>
          `)
      document.title = `${result.name} — EuLift`
    })
  for (let i = 2; i < 5; i++) {
    fetch(`http://showcase.monstatis.com/api/products/${i}`)
      .then(response => response.json())
      .then(result => {
        $('.em-reated-posts > .row > .row').append(
          `<article id="${result.id}"
    class="col-lg-4 col-sm-4 col-md-4 latest-posts-grid post type-post status-publish format-standard has-post-thumbnail hentry category-50-off category-health-beauty"
    data-mh="archive-layout-grid">
    <div class="align-items-center">
      <div class="spotlight-post" id="${result.id}">
        <figure class="categorised-article inside-img">
          <div class="categorised-article-wrapper">
            <div class="data-bg-hover data-bg data-bg-categorised"
              data-background="${result.imageFile}" style="background-image: url(${result.imageFile})"> <a
                href="product.html?id=${result.id}"></a></div>
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
          <h3 class="article-title article-title-1"> <a href="product.html?id=${result.id}">${result.name}</a></h3>
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
      })
  }
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

  fetch(url, {
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
      window.location.replace(`thank-you.html?name=${data.name}&phone=${data.phone}&params=${getProps}&id=${idProduct}`)
    });
})