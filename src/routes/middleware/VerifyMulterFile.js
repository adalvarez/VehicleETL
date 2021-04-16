export default (req, res, next)=>{
  if(req.file){
    next();
  }else{
    return res.sendStatus(400);
  }
};