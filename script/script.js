
let lastIndex = 0
window.onload = function () {
  function reset(){
    console.log(lastIndex)
    let words = document.querySelector(".words")
    let index = Math.round(Math.random()*(dbs.length-1))
    if(index == lastIndex){
      index = Math.round(Math.random()*(dbs.length-1))
      words.innerText=dbs[index]
      lastIndex = index
      new AnimateText('.words',{
        time:(dbs[index].length)*60,
        spanClassName: 'char'
      })
    }else{
      words.innerText=dbs[index]
      lastIndex = index
      new AnimateText('.words',{
        time:(dbs[index].length)*60,
        spanClassName: 'char'
      })
    }
  }

  let btn = document.querySelector(".btn")
  btn.onclick = reset
  reset()
}
