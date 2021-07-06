const { Observable } = rxjs
const { map } = rxjs.operators

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
                suscriber.next(inputBox)
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
    .pipe(
        map(data => data.split("")),
        map(data => data.reverse()),
        map(data => data.join(""))
    )
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