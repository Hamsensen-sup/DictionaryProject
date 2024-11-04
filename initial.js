const fetchInitialWord = async () => {
    const word = document.getElementById("word")
    try{
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/dictionary`)
        const json = await response.json()

        json.forEach((element, index) => {
            const wordMeaning = element.meanings
            const h1 = document.createElement("h1")
            h1.classList.add("word")
            h1.textContent = `${index + 1}.${element.word.toUpperCase()}`
            word.appendChild(h1)

            wordMeaning.forEach((element) => {
                const wordDefinitions = element.definitions
                const h2 = document.createElement("h2")
                h2.classList.add("part-of-speech")
                h2.textContent = `PART OF SPEECH: ${element.partOfSpeech.toUpperCase()}`
                word.appendChild(h2)

                wordDefinitions.forEach((element, index) => {
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

fetchInitialWord()