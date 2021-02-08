const $ = jQuery;


// работа с url
const protocol = window.location.protocol;
const params = new URLSearchParams(window.location.search);
let paramObj = {};
for (let value of params.keys()) {
  paramObj[value] = params.get(value);
}

$(document).ready(() => {
  paramObj.id ? getProduct(paramObj.id) : getProduct(2);
});

const getProduct = (id) => {
  // данные основного товара для заполнения карточки товара
  fetch(`${protocol}//showcase.monstatis.com/api/products/${id}`)
    .then(response => response.json())
    .then(result => {
      $('.ourprice').text(result.price);
      $('.entry-title').text(result.name);
      $('.description').append(result.description);
      $('.wp-block-image').html(`
        <figure class="alignleft is-resized">
          <img src="${result.imageFile}" alt="Product" class="wp-image-6342 zoooom" width="489" height="326" />
          <figcaption><strong>*Best Price Guaranteed</strong></figcaption>
        </figure>
      `);
      document.title = `${result.name} — EuLift`;
    });

  // данные дополнительных товаров для раздела featured
  fetch(`${protocol}//showcase.monstatis.com/api/products?page=1`)
    .then(response => response.json())
    .then(result => {
      let count = 0; // счётчик для трёх товаров
      result.items.map((data) => {
        if (data.id !== id && count < 3) {
          count++;
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
                          href="product.html?id=${data.id}"></a></div>
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
                    <h3 class="article-title article-title-1"> <a href="product.html?id=${data.id}">${data.name}</a></h3>
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
          );
        }
      });
    });
};

$('.btn__click').click(() => {
  // получение query string значений
  // example.com?a=1&b=2 => {a: '1', b: '2'}
  let query = `?name=${$('#name').val()}&phone=${$('#phone').val()}`;
  for (let value of params.keys()) {
    query += `&params[${value}]=${params.get(value)}`;
  }

  // отправка данных и редирект
  fetch(`${protocol}//showcase.monstatis.com/api/products/${paramObj.id}/order${query}`)
    .then(res => res.ok ? res : Promise.reject(res))
    .then(() => window.location.replace(`thank-you.html${query}`))
    .catch(() => window.location.replace(`thank-you.html${query}`));
});