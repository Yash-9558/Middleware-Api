function isarray(i,s)
{
    let first_tag = "";
    i++;
    while(s[i] != '>')
    {
        first_tag += s[i];
        i++;
    }
    i++;
    let n = s.length;
    let l = first_tag.length;
    while(i < n)
    {
        let done = false;
        if(s[i] == '<' && s[i+1] == '/')
        {
            i+=2;
            if((i + l) < n)
            {
                let tmp = s.substr(i,l);
                if(tmp == first_tag)
                {
                    done = true;
                    i += l;
                    break;
                }
            }
        }
        else
        i++;
    }
    if(i < n && s[i] =='>')
    i++;
    if(i < n && s[i] == '<')
    i++;

    let cur = "";
    while(i < n && s[i] != '>')
    {
        cur += s[i];
        i++;
    }
    if(cur == first_tag)
    return true;

    return false;
}

function getLastId(i,s)
{
    let j = i;
    let first_tag = "";
    i++;
    while(s[i] != '>')
    {
        first_tag += s[i];
        i++;
    }
    i++;
    let n = s.length;
    let l = first_tag.length;
    //(first_tag);

    let open = false;
    for( ; j < n;)
    {
        if(!open && s[j] == '<')
        {
            let check = "x";
            if(j+1+l <= n)
            {
            check = s.substr(j+1,l);
            if(check != first_tag)
            return j;
            }
        }

        if(s[j] == '<' && s[j+1] != '/')
        {
            if((j+1+l) <= n && s.substr(j+1,l) == first_tag)
            {
                // //.log(s.substr(j));
                j += (l+1+1);
                open = true;
                continue;
            }
            else
            j++;
        }
        else if(s[j] == '<' && s[j+1] == '/')
        {
            if((j+2+l) <= n && s.substr(j+2,l) == first_tag)
            {
                // //.log(s.substr(j+2,l));
                j += (l+2+1);
                open = false;
                continue;
            }
            else
            j++;
        }
        else
        j++;
    }
    return -1;
}

function isobj(i,s)
{
    i++;
    while(s[i] != '>')
    i++;
    i++;
    if(s[i] == '<')
    return true;

    return false;
}
function getJson(s,mp)
{
    var n = s.length;
    let ans = "";
    var i = 0;
    ans += '{';
    for( ; i < n; )
    {
        //console.log(s.substr(i));
        if(isarray(i,s))
        {
            if(i > 0)
            ans += ',';
            var objj = isobj(i,s);
            var last = getLastId(i,s);
            if(last == -1)
            last = n;
            var cur_tag = "";
            var k = i;
            k++;
            while(s[k] != '>')
            {
                cur_tag += s[k];
                k++;
            }
            k++;
            ans += '"';
            ans += cur_tag;
            ans += '"';
            ans += ':';
            ans += '[';
    
            var l = cur_tag.length;
            for(var j = i; j < last; )
            {
                var stt;
                if(s[j] == '<' && s[j+1] != '/' && s.substr(j+1,l) == cur_tag)
                {
                    if(j > i)
                    ans += ',';
    
                    if(objj)
                    ans += '{';
    
                    j++;
                    j += cur_tag.length;
                    j++;
                    stt = j;
                    continue;
                }
                if(s[j] == '<' && s[j+1] == '/' && s.substr(j+2,l) == cur_tag)
                {
                    if(objj)
                    ans += '}';
                    j+=2;
                    j += cur_tag.length;
                    j++;
                    continue;
                }
    
                if(!objj)
                {
                    if(!mp.has(cur_tag))
                    ans += '"';
                    while(j < n && s[j] != '<')
                    {
                        ans += s[j];
                        j++;
                    }
                    if(!mp.has(cur_tag))
                    ans += '"';
                }
                else
                {
                    if(j > stt)
                    ans += ',';
                    var arr_obj_tag = "";
                    j++;
                    while(s[j] != '>')
                    {
                        arr_obj_tag += s[j];
                        j++;
                    }
                    j++;
                    ans += '"';
                    ans += arr_obj_tag;
                    ans += '"';
                    ans += ':';
                    ans += '"';
                    while(s[j] != '<')
                    {
                        ans += s[j];
                        j++;
                    }
                    ans += '"';
                    while(s[j] != '>')
                    j++;
                    j++;
                }
            }
            ans += ']';
            i = j;
        }
        else
        {
            if(i > 0)
            ans += ',';
            var otag = "";
            var j = i;
            j++;
            while(s[j] != '>')
            {
                otag += s[j];
                j++;
            }
            j++;
            ans += '"';
            ans += otag;
            ans += '"';
            ans += ':';
            var purp = j;
            var ln = otag.length;
            if(s[j] == '<')
            {
                // for array
                if(isarray(j,s))
                {
                   var objj = isobj(i,s);
                   var last = getLastId(i,s);
                   if(last == -1)
                   last = n;
    
                   console.log(last);
                   var cur_tag = "";
                   var k = j;
                   k++;
                   while(s[k] != '>')
                   {
                       cur_tag += s[k];
                       k++;
                   }
                   k++;
                   ans += '"';
                   ans += cur_tag;
                   ans += '"';
                   ans += ':';
                   ans += '[';
                   for(; j < last; )
                   {
                       if(s[j] == '<' && s[j+1] != '/')
                       {
                           if(j > k)
                           ans += ',';
           
           
                           j++;
                           j += cur_tag.length;
                           j++;
                           continue;
                       }
                       if(s[j] == '<' && s[j+1] == '/')
                       {
                           j+=2;
                           j += cur_tag.length;
                           j++;
                           continue;
                       }

                        if(!mp.has(cur_tag))
                        ans += '"';
                        while(j < n && s[j] != '<')
                        {
                            ans += s[j];
                            j++;
                        }
                        if(!mp.has(cur_tag))
                        ans += '"';
                   }
                   ans += ']';
                   i = j;
                   continue;
                }
    
    
                ans += '{';
                while(1)
                {
                    if(s[j] == '<' && s[j+1] == '/' && s.substr(j+2,ln) == otag)
                    {
                        j += 2;
                        j += ln;
                        j++;
                        break;
                    }
    
                    if(j > purp)
                    ans += ',';
                    var in_tag = "";
                    j++;
                    while(s[j] != '>')
                    {
                        in_tag += s[j];
                        j++;
                    }
                    j++;
                    ans += '"';
                    ans += in_tag;
                    ans += '"';
                    ans += ':';

                    if(!mp.has(in_tag))
                    ans += '"';
                    while(s[j] != '<')
                    {
                        ans += s[j];
                        j++;
                    }
                    if(!mp.has(in_tag))
                    ans += '"';
                    while(j < n && s[j] != '>')
                    j++;
    
                    j++;
                }
                ans += '}';
                i = j;
            }
            else
            {
                if(!mp.has(otag))
                ans += '"';
                while(s[j] != '<')
                {
                    ans += s[j];
                    j++;
                }
                if(!mp.has(otag))
                ans += '"';
                j++;
                while(j < n && s[j] != '>')
                j++;
    
                j++;
                i = j;
            }
        }
    }
    
    ans += '}';
    console.log(ans);
    return ans;
}
const xml_to_json = (dataXML) => {
    const arr = dataXML.split(/[\r\n]/);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim();
    }
    let op = "";
    arr.forEach(element => {
        op += element;
    });
    const l = op.length;
    const s = op;
    console.log(s);
    var mp = new Map();
    const ans = JSON.parse(getJson(s,mp));
    return ans;
}
module.exports = xml_to_json;