const apiKey = '6f447e0e94adc9a4e8af203c'



let baseCurrency = 'AZN'




let toInput = document.querySelector("#inTo")
let lefts = document.querySelectorAll(".naLevo")
let rights = document.querySelectorAll(".naPravo")
let fromInput = document.querySelector("#svod")

fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('no connection')
        }
        return response.json()
    })
    .then(data => data["conversion_rates"])
    .then(data => {
        const usdRate = data["USD"]
        document.querySelector("#from-rate").innerHTML = (1 / usdRate).toFixed(4)
        document.querySelector("#to-rate").innerHTML = usdRate.toFixed(4)
    })
    .catch(error => {
        errorMessage.style.display = 'block'
    })

document.querySelectorAll('.first-part .naLevo').forEach((option) => {
    option.addEventListener('click', (event) => {
        const selectedCurrency = event.target.textContent

        document.querySelectorAll('.first-part .naLevo').forEach((opt) => {
            opt.classList.remove('fiol')
        })

        event.target.classList.add('fiol')
    })
})

document.querySelectorAll('.vtoroy .naPravo').forEach((option) => {
    option.addEventListener('click', (event) => {
        const selectedCurrency = event.target.textContent

        document.querySelectorAll('.vtoroy .naPravo').forEach((opt) => {
            opt.classList.remove('fiol')
        })

        event.target.classList.add('fiol')
    })
})

lefts.forEach(item => item.addEventListener("click", function () {
    let activeCurrencyRight = document.querySelector(".pravo>.fiol")

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${this.innerHTML}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('no connection')
            }
            return response.json()
        })
        .then(data => data["conversion_rates"])
        .then(data => {
            console.log(data[activeCurrencyRight.innerHTML])
            toInput.value = (data[activeCurrencyRight.innerHTML] * fromInput.value).toFixed(4)
            document.querySelector("#from-rate").innerHTML = data[activeCurrencyRight.innerHTML].toFixed(4)
            document.querySelector("#to-rate").innerHTML = (1 / data[activeCurrencyRight.innerHTML]).toFixed(4)
        })
        .catch(error => {
            errorMessage.style.display = 'block'
        })

        document.querySelector("#tosvod").innerHTML = activeCurrencyRight.innerHTML
        document.querySelector("#otceli").innerHTML = activeCurrencyRight.innerHTML
        document.querySelector("#isvod").innerHTML = this.innerHTML
    document.querySelector("#kceli").innerHTML = this.innerHTML
}))

rights.forEach(item => item.addEventListener("click", function () {
    let activeCurrencyLeft = document.querySelector(".levo>.fiol")

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${this.innerHTML}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('no connection')
            }
            return response.json()
        })
        .then(data => data["conversion_rates"])
        .then(data => {
            console.log(data[activeCurrencyLeft.innerHTML])
            fromInput.value = (data[activeCurrencyLeft.innerHTML] * toInput.value).toFixed(4)
            document.querySelector("#to-rate").innerHTML = data[activeCurrencyLeft.innerHTML].toFixed(4)
            document.querySelector("#from-rate").innerHTML = (1 / data[activeCurrencyLeft.innerHTML]).toFixed(4)
        })
        .catch(error => {
            errorMessage.style.display = 'block'
        })

        document.querySelector("#isvod").innerHTML = activeCurrencyLeft.innerHTML
        document.querySelector("#kceli").innerHTML = activeCurrencyLeft.innerHTML
        document.querySelector("#tosvod").innerHTML = this.innerHTML
    document.querySelector("#otceli").innerHTML = this.innerHTML
}))

fromInput.addEventListener("input", function () {

    this.value = this.value.replace(/[^0-9.]/g, '') 

    const dots = this.value.match(/\./g) || []
    if (dots.length > 1) {
        this.value = this.value.slice(0, -1)
    }

    let activeCurrency = document.querySelector(".levo>.fiol")
    let activeCurrencyRight = document.querySelector(".pravo>.fiol")

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${activeCurrency.innerHTML}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('no connection')
            }
            return response.json()
        })
        .then(data => data["conversion_rates"])
        .then(data => {
            console.log(data[activeCurrencyRight.innerHTML])
            toInput.value = (data[activeCurrencyRight.innerHTML] * fromInput.value).toFixed(4)
        })
        .catch(error => {
            errorMessage.style.display = 'block'
        })
})

toInput.addEventListener("input", function () {
    
    this.value = this.value.replace(/[^0-9.]/g, '') 

    const dots = this.value.match(/\./g) || []
    if (dots.length > 1) {
        this.value = this.value.slice(0, -1)
    }

    let activeCurrency = document.querySelector(".pravo>.fiol")
    let activeCurrencyLeft = document.querySelector(".levo>.fiol")

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${activeCurrency.innerHTML}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('no connection')
            }
            return response.json()
        })
        .then(data => data["conversion_rates"])
        .then(data => {
            console.log(data[activeCurrencyLeft.innerHTML])
            fromInput.value = (data[activeCurrencyLeft.innerHTML] * toInput.value).toFixed(4)
        })
        .catch(error => {
            errorMessage.style.display = 'block'
        })
})
