const config = {
  messageDuration: 5000
}

let bindToGlobal = (obj, key) => {
  if (typeof window[key] === 'undefined') {
    window[key] = {};
  }

  for (let i in obj) {
    window[key][i] = obj[i]
  }
}
bindToGlobal(config,'_const')
