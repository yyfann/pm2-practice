const qiniu = require('qiniu')
const fs = require('fs')
const path = require('path')


// -------------- 上传一个文件 --------------
/**
 * file：要上传文件的绝对路径
 * key: 上传的文件在空间中的命名, 用文件名就行
 */
const doUpload = (file, key) => {

  // 生成一个上传器
  const config = new qiniu.conf.Config()
  // 创建空间时指定的地域, 具体可参考文档
  config.zone = qiniu.zone.Zone_z0
  const formUploader = new qiniu.form_up.FormUploader(config)

  // 根据空间的密钥生成一个uploadToken令牌
  const { bucket, ak, sk } = {
    // 空间名
    bucket: 'vue-node',
    // 密钥对
    ak: '8Fb1ry7Oe3gsvgF4WhhMnWAanvEEMpR_kIl11GWL',
    sk: 'YeK4_Us507n_MqHORkAGC7jXkRXeC9ugxKPwY2nh',
  }
  const options = {
    scope: bucket + ':' + key
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const mac = new qiniu.auth.digest.Mac(ak, sk)
  const uploadToken = putPolicy.uploadToken(mac)

  // 表单的额外信息
  const putExtra = new qiniu.form_up.PutExtra()

  // 上传操作
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
      if (err) {
        return reject(err)
      }
      if (info.statusCode == 200) {
        resolve(body)
      } else {
        reject(body)
      }
    })
  })
}

// -------------- 递归上传一个文件夹的操作 --------------
const uploadAll = (dir) => {
  const files = fs.readdirSync(dir)
  files.forEach((filename) => {
    // 如果是文件夹则递归执行
    const filePath = path.join(dir, filename)
    if (fs.lstatSync(filePath).isDirectory()) {
      return uploadAll(filePath)
    }
    // 如果是文件则上传, 把文件名当成key
    doUpload(filePath, filename)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  })
}

// 上传public下的文件
const publicPath = path.join(__dirname, '../public')
uploadAll(publicPath)
