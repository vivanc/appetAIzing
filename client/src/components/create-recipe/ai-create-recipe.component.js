import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { OpenAI } from 'openai';
import { useState } from 'react';
import { useEffect } from 'react';
import UserCreateRecipe from './user-create-recipe.coponent';
import axios from 'axios';




const AICreateRecipe = () => {
    console.log("ai recipe is rendring")
    const [urlFromUser, setUrlFromUser] = useState('')
    const [aiRecipe, setAIRecipe] = useState({name: '', ingredients: [], steps: []})

    

    // Function to handle input change
    const handleInputChange = (e) => {
        // Update the state with the new input value
        setUrlFromUser(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5001/api/summerize_url', {url: urlFromUser})
        .then((res) => {
            console.log('response data', res.data)
            const {name, ingredients, steps} = res.data
            setAIRecipe({name, ingredients, steps})
        })
        .catch((error) => console.log(error))
        // console.log("event", e.target)
        // const prompt = `Summarize this url and break them into name, ingredients, and steps in JSON format: ${urlFromUser}`
        // console.log("prompt", prompt)
        //         // console.log('AI return result', aiReturnRecipeStr)
        //         const matches = testInputData.match(/\{([^}]+)\}/g);
        //         console.log('matches', matches)
        //         const {name, ingredients, steps} = JSON.parse(matches[0])
        //         setAIRecipe({name, ingredients, steps})
        //         console.log('ai recipe content', aiRecipe)
        // anyscale.chat.completions.create({
        //     model: "meta-llama/Llama-2-7b-chat-hf",
        //     messages: [{ role: "user", content: prompt }],
        //     // temperature: 0.7
        // })
        //     .then((completion) => {
        //         // const aiReturnRecipeStr = completion.choices[0].message.content;
                
        //         console.log('AI return result', aiReturnRecipeStr)
        //         const matches = aiReturnRecipeStr.match(/\{([^}]+)\}/g);
        //         console.log('matches', matches)
        //         // const {name, ingredients, steps} = JSON.parse(aiReturnRecipeStr)
        //         // setAIRecipe({name, ingredients, steps})
        //         // console.log('ai recipe content', aiRecipe)

        //     })
    }

    return (
        <>
            <form className="mb-3" onSubmit={handleSubmit}>
                <label>Create a Recipe by AI</label>
                <input
                    type="text"
                    placeholder="https://..."
                    name="urlFromUser"
                    value={urlFromUser}
                    onChange={handleInputChange}
                />
                <button type="submit"
                    className="btn btn-primary">Submit URL</button>
            </form>
            <UserCreateRecipe aiRecipe={aiRecipe}/>

        </>
    )

    

}

export default AICreateRecipe;