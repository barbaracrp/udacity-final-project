// import {  } from "module";
import { handleSubmit } from './js/formHandler'
// import './styles/resets.scss'
// import './styles/base.scss'
// import './styles/footer.scss'
// import './styles/form.scss'
// import './styles/header.scss'
import './styles/style.scss'

const searchButton = document.getElementById('search');
searchButton.addEventListener('click', function listener(event) {
  handleSubmit(event);
});

export {
  handleSubmit
}
