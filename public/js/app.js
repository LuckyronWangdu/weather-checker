console.log('client side javscript is loaded!!')

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherform = document.querySelector('form')
const searchelement = document.querySelector('input')
const para1 = document.querySelector('#para1')
const para2 = document.querySelector('#para2')

// para1.textContent = 'Hello There!'
// para2.textContent = 'This is second paragraph'
weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchelement.value

    para1.textContent='Wait while we are fetching data..'

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                para1.textContent = data.error

            } else {
                // console.log(data.location)
                para1.textContent ='Showing data for ' + data.location
                // console.log(data.forecast)
                para2.textContent = data.forecast
            }
        })
    })

})