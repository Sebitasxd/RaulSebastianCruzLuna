const responses = {
    1: [
        "Hola, me encantó tu sonrisa cuando te vi. ¿Podemos conocernos mejor?",
        "¡Ey! Perdona que te moleste, pero no podía irme sin decirte que tienes una energía increíble.",
        
    ],
    2: [
        "Ni en clase de matemáticas me perdía tanto como en tu mirada",
        " Con esos ojos mirándome, ya no me hace falta la luz del sol",
        " Eres de esa clase de personas por las cuales a las estrellas se les piden deseos"
    ],
    3: [
        "¿Te gustaría tomar un café algún día? Sin presión, es con buena intencion .",
        "Hay un lugar genial que descubrí recientemente. ¿Te animas a conocerlo conmigo?",
        
    ],
    4: [
        "Cada vez que hablamos, siento que el mundo se detiene un poco. Me encanta eso.",
        "No soy poeta, pero cuando estoy contigo encuentro las palabras más bonitas.",
        "Sabes que puedes ser tú misma conmigo, porque es exactamente esa persona la que me gusta."
    ]
};

const reactions = {
    1: ["😊", "Parece interesada!", 20],
    2: ["😍", "Le gustó tu comentario!", 40],
    3: ["🤔", "Está considerando tu invitación...", 60],
    4: ["❤️", "¡Le encantó tu sinceridad!", 80]
};

let interestLevel = 0;

function showResponse(type) {
    const responseArea = document.getElementById('responseArea');
    const responseText = document.getElementById('responseText');
    const typingIndicator = document.getElementById('typingIndicator');
    const interestMeter = document.getElementById('interestMeter');
    const interestBar = document.getElementById('interestBar');
    const interestText = document.getElementById('interestText');
    const interestValue = document.getElementById('interestValue');
    
    
    responseArea.style.display = 'block';
    typingIndicator.style.display = 'block';
    responseText.innerHTML = '';
    
    
    interestMeter.style.display = 'none';
    interestText.style.display = 'none';
    
    
    setTimeout(() => {
        typingIndicator.style.display = 'none';
        
        const randomResponse = responses[type][Math.floor(Math.random() * responses[type].length)];
        const reaction = reactions[type];
        
        responseText.innerHTML = `<p><strong>Tú:</strong> ${randomResponse}</p>
                                <p class="mt-3"><strong>Ella:</strong> ${reaction[0]} <em>${reaction[1]}</em></p>`;
        
        
        interestLevel = Math.min(interestLevel + reaction[2], 100);
        interestBar.style.width = `${interestLevel}%`;
        interestValue.textContent = interestLevel;
        
      
        interestMeter.style.display = 'block';
        interestText.style.display = 'block';
        
       
        if (interestLevel >= 100) {
            responseText.innerHTML += `<p class="mt-3 text-success fw-bold">¡Felicidades! ¡Le gustas! ¿Cuándo es la primera cita?</p>`;
            document.querySelector('.heart').innerHTML = '❤️❤️❤️';
        }
    }, 2000);
}