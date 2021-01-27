const $ = jQuery;

const store = [];
const main = (store) => {
  fetch('http://showcase.monstatis.com/api/products?page=1')
    .then(response => response.json())
    .then(result => {
      store = result
      console.log(store)
      store.items.map(data => {
        $('.site-main > .row').append(
          `<article id="${data.id}"
      class="col-lg-4 col-sm-4 col-md-4 latest-posts-grid post type-post status-publish format-standard has-post-thumbnail hentry category-50-off category-health-beauty"
      data-mh="archive-layout-grid">
      <div class="align-items-center">
        <div class="spotlight-post" id="${data.id}">
          <figure class="categorised-article inside-img">
            <div class="categorised-article-wrapper">
              <div class="data-bg-hover data-bg data-bg-categorised"
                data-background="${data.imageFile}" style="background-image: url(${data.imageFile})"> <a
                  href="index-10.html"></a></div>
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
            <h3 class="article-title article-title-1"> <a href="index-10.html">${data.name}</a></h3>
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
        return 0
      })
    })

}
document.addEventListener('DOMContentLoaded', () => {
  if (typeof store != 'undefined') {
    main(store);
  } else {
    const store = {

    };
    main(store);
  }
});

$('.row').on('click', 'div.spotlight-post', (e) => {
  console.log('CLICK', e.currentTarget.id)
})