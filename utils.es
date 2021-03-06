// enumFromTo(x,y) = [x,x+1,x+2...y]
// only guarantee to work on increasing sequences
const enumFromTo = (frm,to,succ=(x => x+1)) => {
  const arr = []
  for (let i=frm; i<=to; i=succ(i))
    arr.push( i )
  return arr
}

const warn = function () {
  return console.warn.apply(this, arguments)
}

const error = function () {
  return console.error.apply(this, arguments)
}

const valMap = obj => f => {
  const ret = {}
  Object.keys(obj).map( k => ret[k] = f(obj[k]) )
  return ret
}

// "const" function that simply ignores
// its second list of arguments and returns the first argument.
// the funny spell is due to the fact that "const" is a keyword.
const konst = x => (...args) => x

// usage: "ignore(a,b,c)" to fool eslint to believe that "a", "b" and "c"
// are somehow being used, it serves as an explicit annotation to say that they actually don't
const ignore = konst

// "modifyArray(index,f)(xs)" keeps "xs" intact and returns a new array
// whose element on "index" is modified by feeding original value to "f".
// if "index" is out of range, "xs" itself is returned.
const modifyArray = (index, f) => {
  if (typeof index !== "number")
    error("index is not a number")
  if (typeof f !== "function")
    error("modifier is not a function")
  return xs => {
    if (index < 0 || index >= xs.length)
      return xs
    const ys = [...xs]
    const v = ys[index]
    ys[index] = f(v)
    return ys
  }
}

const not = x => !x

export {
  enumFromTo,
  valMap,
  konst,
  ignore,
  not,
  modifyArray,

  warn,
  error,
}
