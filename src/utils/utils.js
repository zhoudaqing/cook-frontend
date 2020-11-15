/**
 * 格式化数字：给数字加逗号，保留指定小数位数
 * @param str 数字值
 * @param toFixed 保留的位数，默认保留2位小数
 * @returns {string}
 */
export const formatNum = (str, toFixed = 3) => {
  let newStr = "";
  let count = 0;

  if (str) {
    str = str.toString();
    // 当数字是整数
    if (str.indexOf(".") === -1) {
      for (let i = str.length - 1; i >= 0; i--) {
        if (str.charAt(i) !== "-" && count % 3 === 0 && count !== 0) {
          newStr = str.charAt(i) + "," + newStr;
        } else {
          newStr = str.charAt(i) + newStr;
        }
        count++;
      }
      str = newStr + ".00"; //自动补小数点后两位
      return str;
    }
    // 当数字带有小数
    else {
      for (let i = str.indexOf(".") - 1; i >= 0; i--) {
        if (str.charAt(i) !== "-" && count % 3 === 0 && count !== 0) {
          newStr = str.charAt(i) + "," + newStr;
        } else {
          newStr = str.charAt(i) + newStr; //逐个字符相接起来
        }
        count++;
      }
      str = newStr + (str + "00").substr((str + "00").indexOf("."), toFixed);
      return str;
    }
  }
};