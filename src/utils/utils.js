export function isBottom(wrapper, content) {
  if (content <= wrapper) {
    return true
  } else {
    return false
  }
}

// 手机号效验
export function isPoneAvailable(that, str) {
  let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
    that.$message.error('手机号有误！')
    return false;
  }
}
// 获取url里的参数
export function getURLParams(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
