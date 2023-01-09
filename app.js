const wrapper = document.querySelector('.wrapper');
const form = document.querySelector('form');
const fileInp = form.querySelector('input');
const infoText = form.querySelector('p');
const closeBtn = wrapper.querySelector('.close');
const copyBtn = wrapper.querySelector('.copy');



function fetchRequest(formData, file){
    infoText.innerText = 'Scanning QR Code...'
    fetch('https://api.qrserver.com/v1/read-qr-code/', {method:'POST', body:formData
    }).then(res=>res.json()).then(result =>{
        result = result[0].symbol[0].data;
        infoText.innerText = result? 'Upload QR Code to Scan':"Couldn't Scan QR Code";
        if(!result)return;
        wrapper.querySelector('textarea').innerText = result;
        form.querySelector('img').src = URL.createObjectURL(file);
        wrapper.classList.add('active');
    }).catch(()=>{
        infoText.innerText = "Couldn't Scan QR Code";
    }
    )
}

fileInp.addEventListener('change', e=>{
    e.preventDefault();
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(formData, file);
})

copyBtn.addEventListener('click', ()=>{
    let text = wrapper.querySelector('textarea').textContent;
    navigator.clipboard.writeText(text);
})

form.addEventListener('click', ()=>fileInp.click());
closeBtn.addEventListener('click',()=>{
    wrapper.classList.remove('active');
})

