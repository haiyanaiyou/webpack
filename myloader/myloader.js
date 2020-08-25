
module.exports = function (source){
    let content = source

    console.log(this.query.name)
    // 异步处理
    const callback = this.async();
    setTimeout(()=>{
        const result = source.replace('loader','my_loader')
        return callback(null,result)
    },1000)

    // return  content
}