const redis  = require('redis');
const express = require('express');

const redisClient  = redis.createClient();
const app = express();

function saveLink (id,auther,title,year,score)
{
    redisClient.hmset("link:"+id,"author",auther,"title",title,"year",year,"score",score);
};
function showLink (id)
{
    redisClient.hgetall("link:"+id,function(err,response){
        console.log(response);
    });
}

function scoreUP(id)
{
    redisClient.hincrby("link:"+id,"score",1);
}
function scoreDown(id)
{
    redisClient.hincrby("link:"+id,"score",-1);
}



//saveLink(1,"junaid","first Title",1992,0);
saveLink(2,"amamr","second Title",2002,10);

scoreUP(1);
scoreUP(1);
scoreUP(1);

showLink(1);

showLink(2);
app.listen(3000,function(){
    console.log('server start  ....');
});