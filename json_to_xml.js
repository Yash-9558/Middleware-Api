// "use strict";
// const dataJson = require('./eg.json');
const json_to_xml = (dataJson) => {
      let str = JSON.stringify(dataJson);

let cnt = 0;
let temp = "";

const map = new Map();

// map.set(1,2);
// map.set(2,3);
// console.log(map.get(1));

// map.delete(1);
// console.log(map.get(1));

const arr = new Array();

for(let i = 0;i<str.length;i++){
      if(str[i] === ','){
            temp = temp.replaceAll('"','');
            if(temp.length > 0) arr.push(temp);
            console.log(temp);
            temp = "";
            arr.push(`</item${cnt}>`);
            // console.log(`</item${cnt}>`);
            arr.push(`<item${cnt}>`);
            // console.log(`<item${cnt}>`);
      }
      else if(str[i] === '{' || str[i] === '['){
            cnt++;
            temp = temp.replaceAll('"','');
            if(temp.length > 0) arr.push(temp);
            // console.log(temp);
            temp = "";
            arr.push(`<item${cnt}>`);
            // console.log(`<item${cnt}>`);
      }
      else if(str[i] === '}' || str[i] === ']'){
            temp = temp.replaceAll('"','');
            if(temp.length > 0) arr.push(temp);
            // console.log(temp);
            temp="";
            arr.push(`</item${cnt}>`);
            // console.log(`</item${cnt}>`);
            cnt--;
      }
      else{
            temp += str[i];
      }
}

for(let i = 0;i<arr.length;i++){
      if(arr[i].slice(1,6) === "/item"){
            let op="";
            //123
            for(let j=6;j<arr[i].length-1;j++){
                  op+=arr[i][j];
            }

            let st = map.get(op);
            arr[i] = '</';
            for(let j = 0;j<st.length;j++){
                  arr[i] += st[j];
            }
            arr[i] +='>';
      }
      else if(arr[i].slice(1,5) === "item"){
            if(arr[i+1].slice(1,5) !== "item"){
                  let op="";
                  //123
                  for(let j=5;j<arr[i].length-1;j++){
                        op+=arr[i][j];
                  }
                  let st = "";
                  let j;
                  for(j=0;j<arr[i+1].length;j++){
                        if(arr[i+1][j] === ':') break;
                        st += arr[i+1][j];
                  }
                  map.set(op,st);
                  arr[i] = "<";
                  for(let k = 0;k<st.length;k++){
                        arr[i] += st[k];
                  }
                  arr[i] += '>';
                  j++;

                  st = "";
                  for(;j<arr[i+1].length;j++){
                        st += arr[i+1][j];
                  }
                  arr[i+1] = st;
            }
            else{
                  let op="";
                  //123
                  for(let j=5;j<arr[i].length-1;j++){
                        op+=arr[i][j];
                  }

                  let st = "item";
                  map.set(op,st);
                  arr[i] = '<'+st+'>';
            }
      }
      // console.log(arr);
}

let op="";
arr.forEach(element => {
    op+=element;
    op+='\n';  
});
return op;
}
module.exports=json_to_xml;