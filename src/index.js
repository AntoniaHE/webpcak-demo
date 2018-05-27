
import less from './css/base.less';
import scss from './css/scss.scss';
import css from './css/index.css';

import lib from './lib/index.js'
// import $ from 'jquery'

console.log('new webpack 4.0 is so easy');
console.log('嗯哼');
console.log('啊哈');
console.log('233333');
	
document.getElementById('title').innerHTML='Hello Webpack'

// $('#title').click(() => {
//   console.log('你点击了title')
// })

function getElementById(node, id){
  if(!node) return null;
  if(node.id === id) return node;
  for(var i = 0; i < node.childNodes.length; i++){
      var found = getElementById(node.childNodes[i], id);
      if(found) return found;
  }
  return null;
}
const doc = getElementById(document, "j-txt");
console.log(doc)

// 实现getElementsByClassName
let arr = []
function getElementsByClass(node, className){
  if (!node) return
  if (node.className === className) {
    arr.push(node)
  }
  for(let i = 0; i < node.childNodes.length; i++) {
    getElementsByClass(node.childNodes[i], className)
  }
}
getElementsByClass(document, "txt");
// console.log(arr)
console.log(document.getElementsByClassName('txt'))

const newArr = lib.arry.arrUnique([ 1, 2, 1, 2, '1', '11'])
console.log(newArr)