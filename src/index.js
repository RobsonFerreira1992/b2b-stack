import routes from './routes.js'


const main =  document.querySelector('#root');

const init = () =>{
  window.addEventListener('hashchange', renderPage);
}
const Hash = (hash) => hash === "" ? 'home' : hash.replace('#', '')


const renderPage = () =>{
  const page = Hash(window.location.hash);
  main.innerHTML = '';
  main.appendChild(routes[page]);
}
window.addEventListener('load', ()=> {
  renderPage();
  init();
});