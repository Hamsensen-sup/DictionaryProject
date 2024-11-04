const fetchApi = async () => {
    const inputEl = document.getElementById("input-element")
    // const outputEl = document.getElementById("output-element")
    const word = document.getElementById("word")
    word.textContent = ""

    if(inputEl.value === ""){
        word.textContent = "Please type a word :>"
        return
    }

    try{
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputEl.value}`)

        if (!response.ok) {
            word.textContent = "Word not found :<"
            return
        }

        const json = await response.json()

        json.forEach((element, index) => {
            const allDefinitions = element.meanings
            const h1 = document.createElement("h1")
            h1.classList.add("word")
            h1.textContent = `${index + 1}.${element.word.toUpperCase()}`
            word.appendChild(h1)

            allDefinitions.forEach((element) => {
                const newDefinition = element.definitions
                const h2 = document.createElement("h2")
                h2.classList.add("part-of-speech")
                h2.textContent = `PART OF SPEECH: ${element.partOfSpeech.toUpperCase()}`
                word.appendChild(h2)

                newDefinition.forEach((element, index) => {
                    const paragraph = document.createElement("p")
                    paragraph.classList.add("words")
                    paragraph.textContent = `${index + 1}. ${element.definition}`
                    word.appendChild(paragraph)
                })
            })
        })
        
        
    }
    catch(error){
        console.log(error)
    }
}

const submit = document.getElementById("submit-button")
submit.addEventListener("click", fetchApi)



const inputEl = document.getElementById("input-element")
inputEl.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        fetchApi()
    }
})