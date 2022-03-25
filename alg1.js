function push(x,mi,i,j)
{
    var ind,par;
    x.push([mi,i,j])
    ind=x.length-1;

    par= Math.floor((ind-1)/2);
    while (par>=0)
    {
    	
        if(x[par][0]>x[ind][0])
        {
            [x[par],x[ind]]=[x[ind],x[par]];
            ind=par;
        }
        else break;
        par= Math.floor((ind-1)/2);
    }
}
function heapify(x,ind)
{
	
    var smallest=x[ind][0],
    next=ind,l=x.length,left=2*ind+1,right=2*ind+2;
    if(left<l && smallest>x[left][0])
    {
        smallest=x[left][0];next=left;
    }
    if(right<l && smallest>x[right][0])
    {   
        smallest=x[right][0];next=right;
    }
    [x[ind],x[next]]=[x[next],x[ind]]
    
    if(next!=ind)
    {
        heapify(x,next);    
    }
}
function pop(x)
{
    var z,l=x.length;
    z=x[0];
    x[0]=x[l-1];
    x.pop();
    if (x.length>0)
    heapify(x,0);
    return z;
}
function astar(i,j,dx,dy,x,v,path1,path2,decide)
{
    var sx=i,sy=j;
    var mi;
    var y= initialize_array();
    var q=[[0,i,j]]
    var dir=[[0,1],[1,0],[0,-1],[-1,0]];
    var d,e,m,n,c;
    var reach=false;
    m=x.length;n=x[0].length;
    while (q.length>0)   
    {
        c=pop(q);
        mi=c[0];i=c[1];j=c[2];
        if (i==dx && j==dy) 
        {
            console.log('yes');
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
            
            var hueristic= Math.abs(dx-d)+Math.abs(dy-e);
            if (decide==0)
            push(q,mi+1+hueristic,d,e)
            else
            push(q,hueristic,d,e)
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


