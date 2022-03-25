var found;
function dfs(i,j,dx,dy,x,v,path1,path2)
{   
    if(found==true)
    {   
        return;}
    var dir=[[0,1],[1,0],[-1,0],[0,-1]];
    var d,e,m,n;
    if (i==dx && j==dy)
        {
            found=true;
            return;
        }
    m=x.length;n=x[0].length;
    for(var g=0;g<4;g++)
    {
        d=i+dir[g][0];e=j+dir[g][1];
        if(d>=0 && e>= 0 && d<m && e<n && v[d][e]==0  && x[d][e]==0)
        {
            v[d][e]=1;
            path1[d][e]=1;
            path2.push([d,e])
            dfs(d,e,dx,dy,x,v,path1,path2);
            if(found==true){                 
                break;}
            path1[d][e]=0;
        }
    }
}
function bfs(i,j,dx,dy,x,v,path1,path2)
{
    var sx=i,sy=j;
    var y= initialize_array();
    var q=[[i,j]]
    var dir=[[0,1],[1,0],[0,-1],[-1,0]];
    var d,e,m,n,c;
    var reach=false;
    m=x.length;n=x[0].length;
    while (q.length>0)   
    {
        c=q.shift()
        i=c[0];j=c[1]
        if (i==dx && j==dy) 
        {
            reach=true;
            break;
        }
            
        for(var g=0;g<4;g++)
    {
        d=i+dir[g][0];e=j+dir[g][1];
        if(d>=0 && e>= 0 && d<m && e<n && v[d][e]==0  && x[d][e]==0)
        {
            v[d][e]=1;
            y[d][e]=[i,j];
            q.push([d,e])
            path2.push([d,e])
        }
    }    
    }
    i=dx;j=dy;
    if(!reach) return;
    while (!(i==sx && j==sy))
    {
        path1[i][j]=1;
        c=y[i][j];
        if (c==undefined) break;
        i=c[0];j=c[1];
    } 
}
function traverse(sx,sy,dx,dy,x,v)
{
    found=false;
    v[sx][sy]=1;
    var path1=initialize_array(),path2=new Array();
    var alg= document.getElementById('alg');
    var el= alg.options[alg.selectedIndex].value;
    path1[sx][sy]=1;
    path2.push([sx,sy]);
    switch(el)
    {
        case '1':bfs(sx,sy,dx,dy,x,v,path1,path2);break;
        case '2':dfs(sx,sy,dx,dy,x,v,path1,path2);break;
        case '3':astar(sx,sy,dx,dy,x,v,path1,path2,0);break;
        case '4':astar(sx,sy,dx,dy,x,v,path1,path2,1);break;
    }
 //console.log(path1,path2);
colorpath(path1,path2);
}
function colorpath(path1,path2)
{
    var index=0;
    var id=setInterval(colo,10/speed);
    function colo()
    {
        if (index>=path2.length)
        clearInterval(id);
        else{
            var c=path2[index][0],d=path2[index][1];
            if (path1[c][d]==1)
            {
                setcolor(c,d,'path');   
                
            }
            else 
            {
                setcolor(c,d,'blue','path');
            }
            
        index+=1;
        }   
    }
}    
function setcolor(i,j,color,rem='blue')
{
    var cell= document.getElementById(i+','+j);
    cell.classList.remove(rem);
    cell.classList.add(color);
}