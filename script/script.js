
let lastIndex = 0

  function reset() {
    console.log(lastIndex)
    let words = document.querySelector("#words")
    let index = Math.round(Math.random() * (dbs.length - 1))
    if (index == lastIndex) {
      index = Math.round(Math.random() * (dbs.length - 1))
      words.innerHTML = Splitting.html({ content: dbs[index], by: 'chars' })
      lastIndex = index
      Splitting()
    } else {
      words.innerHTML = Splitting.html({ content: dbs[index], by: 'chars' })
      lastIndex = index
      Splitting()
    }
  }

  let btn = document.querySelector(".btn")
  btn.addEventListener('click', function () {
    // document.querySelector('#words').classList.remove("chars")
    reset()
  }
  )
  // btn.onclick = reset
  reset()

