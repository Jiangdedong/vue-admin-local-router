/*
 * @Descripttion: 加密解密方法
 * @version: 1.0
 * @Author: JDD
 * @Date: 2019-12-15 17:01:04
 * @LastEditors: JDD
 * @LastEditTime: 2019-12-15 17:38:14
 */
const CryptoJS = require('crypto-js') // 引用AES源码js

const key = CryptoJS.enc.Utf8.parse('JDD1234567891234') // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('1234567891234JDD') // 十六位十六进制数作为密钥偏移量

// 解密方法
export function Decrypt(word) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

// 加密方法
export function Encrypt(word) {
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString().toUpperCase()
}
