const Base_url= "https://api.currencyapi.com/v3/latest?apikey=cur_live_sN83v2HEcogzsfuLORNXelIrG9HPP55N5Kj03ld4";
const selects=document.querySelectorAll(".dropdown select");
const img1=document.querySelectorAll(".dropdown img");
let btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".To select");
let msg=document.querySelector(".msg");

for(let opt of selects){
    for(let code in countryList){
        let newoption=document.createElement("option");
        newoption.value=code;
        newoption.innerText=code;
        if(opt.name==="from" && newoption.value==="USD"){
            newoption.selected="selected";
        }
        else if(opt.name==="to" && newoption.value==="INR"){
            newoption.selected="selected";
        }
        opt.append(newoption);
    }
    opt.addEventListener("change",(evnt)=>{
        updateFlag(evnt.target);
    })
}
const updateFlag=(element)=>{
    let codeval=element.value;
    let codeval2=countryList[codeval];
    let newimg=`https://flagsapi.com/${codeval2}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newimg;
}

btn.addEventListener("click",async (evnt)=>{
    evnt.preventDefault();
    let amount=document.querySelector(".amount input");
    console.log(amount.value);
    if(amount.value==1 || amount.value<1){
        amount.value="1"
    }
    let response=await fetch(Base_url);
    let data=await response.json();
    let data1=data.data;
    let rate = data1[toCurr.value];
    let rate1=rate.value;
    let finalAmount = amount.value * rate1;
    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})

