function countWords(str) {
    return str.trim().split(/\s+/).length;
}

function showText(text,callback,time=1000){
    console.log('\x1b[36m%s\x1b[0m', text)
    setTimeout(callback,time)
}

function showResult (){

    let counter = 0;
    let words = ['El último hombre sobre la tierra estaba sentado solo en una habitación.', 'De repente...', 'TOCAN LA PUERTA.']
    
    for(let i= 0; i<words.length; i++){
        counter += countWords(words[i])
    }

    console.log("\n")

    showText(words[0],
        ()=>showText(words[1],
            ()=>showText(words[2],
              ()=> console.log('\x1b[33m%s\x1b[0m',`\nProceso completo. \nTotal de palabras : ${counter}`)
              ,2500)
        ,4000)
    ,3000) 
}

showResult()


