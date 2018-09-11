var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

var indexBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    rv[x[key]] = x
    return rv
  }, {})
}

export {groupBy, indexBy}