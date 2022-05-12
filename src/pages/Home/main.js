export default  () => {
  const postContainer =  document.createElement('div') 
  postContainer.classList.add('posts-container');
  const loading = document.querySelector('.loader');
  const container = document.createElement('div');
  container.classList.add('container');
  const row = document.createElement('div');
  row.classList.add('row');
  postContainer.appendChild(container)
  container.appendChild(row)

  let limit = 5;
  let page = 1;

  async function getPosts () {
    const res = await fetch(
      `https://portal.hml.b2bstack.com.br/api/v1/products?limit=${limit}&page=${page}`
    );
    const data = await res.json();
    console.log(data)
    return data;
  }
  
  async function showPosts() {
    const posts = await getPosts()
    posts.forEach(post => {
      const content = document.createElement('div');
      content.classList.add('col-lg-12')
      content.innerHTML = `
        <div class="card my-4 py-4 px-2">
          <div class="d-flex ">
            <div class="mr-2">
              <img class="logos" src=${post.imagePath} alt= imagem do ${post.name}/>
            </div>
            <div>
              <h3>${post.name}</h3>
              <p class="m-0">NPS ${post.average_note}</p>
              <p class="m-0">Avaliação ${post.reviews_counter}</p>
              <p class="m-0">média ${post.rating}</p>
            </div>
          </div>
        </div>
      `;
      row.appendChild(content)
    });
    
  }
  
showPosts()
  function showLoading() {
    loading.classList.add('show');
  
    setTimeout(() => {
      loading.classList.remove('show')
  
      setTimeout(() => {
        page++;
        showPosts();
      }, 300);
    }, 1000)
  }
  
  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
    if (scrollTop + clientHeight >= scrollHeight -5) {
      showLoading()
    }
  });
  

  return postContainer
}
