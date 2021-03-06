const axios =require('axios')
const queryString =require('query-string')
const baseUrl = 'https://cnodejs.org/api/v1'
module.exports = function (req,res,next) {
    const path = req.path
    console.log(path)
    const user = req.session.user || {}
    const needAccessToken  = req.query.neddAccessToken
    if(needAccessToken && !user.accessToken){
        res.status(401).send({
            success:false,
            msg:'need login'
        })
    }

    const query = Object.assign({},req.query)
    if(query.needAccessToken) delete query.needAccessToken

    axios(`${baseUrl}${path}`,{
        method:req.method,
        params:query,
        data:queryString.stringify(Object.assign({},req.query,{
            accesstoken:user.accessToken
        })),
        header:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    }).then(resp=>{
        if(resp.status ==200){
            res.send(resp.data)
        }else{
            res.status(resp.status).send(resp.data)
        }
    })
        .catch(err=>{
            if(err.response){
                res.status(500).send(err.response.data)
            }else{
                res.status(500).send({
                    success:false,
                    msg:'未知错误'
                })
            }
        })
}

