const { Observable } = rxjs

function reverseString(s){
    return s.split("").reverse().join("");
}

function mirrorInput (){
    return new Observable(suscriber =>{

        function handleInput () {
            let inputBox = document.getElementById('input').value;
            
            if(inputBox == 'error'){
                    suscriber.error('Error')
            }
            else if( inputBox == 'complete'){
                    suscriber.complete()
            }
            else{
                let mirrorResult = reverseString(inputBox)
                suscriber.next(mirrorResult)
            }
        }

        document.getElementById('input').addEventListener('input', handleInput)

        return ()=>{
            document.getElementById('input').removeEventListener('input', handleInput)
            document.getElementById('input').disabled  = true
            document.getElementById('input').value  = ''
            document.getElementById('div').innerText= ''
        }
        })
    }

    let mirroring = mirrorInput()
    .subscribe(
        data =>{
        document.getElementById('div').innerText = data
    },
        err => console.error(err),
        () => console.warn('Completed mirroring')
    )

    setTimeout(()=>{
        console.warn('Unsubscribing...')
        mirroring.unsubscribe()
    },30000)

    