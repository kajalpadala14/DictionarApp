document.getElementById("btn").addEventListener("click", function () {
  const word = document.getElementById("wordEntered").value.trim();

  if (word === "") {
    alert("Please enter a word.");
    return;
  }

   wordFind(word);
});
function wordFind(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then((data) => {
      displayWordInLeftSection(word, data);
    })
    .catch((error) => {
      console.error(error);
      const resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML = `
        <p style="color: red;">Word not found. Please try again.</p>
        <button id="tryAgainBtn">Try Again</button>
      `;
      resultContainer.style.display = "block";  

      document.getElementById("tryAgainBtn").addEventListener("click", function () {
        location.reload();  
      });
    });
}


function displayWordInLeftSection(word, data) {
  const wordData = data[0];
  const meanings = wordData.meanings;

  const definition = meanings[0]?.definitions[0]?.definition || "No definition available.";
  const partOfSpeech = meanings[0]?.partOfSpeech || "N/A";
  const example = meanings[0]?.definitions[0]?.example || "No example available.";
  const synonyms = meanings[0]?.synonyms?.join(", ") || "No synonyms available.";
  const antonyms = meanings[0]?.antonyms?.join(", ") || "No antonyms available.";

  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = `
    <h2>Word: ${word}</h2>
    <div class="result-item">
      <i class="fas fa-book icon"></i>
      <p><strong>Definition:</strong> ${definition}</p>
    </div>
    <div class="result-item">
      <i class="fas fa-user-graduate icon"></i>
      <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
    </div>
    <div class="result-item">
      <i class="fas fa-lightbulb icon"></i>
      <p><strong>Example:</strong> ${example}</p>
    </div>
    <div class="result-item">
      <i class="fas fa-synagogue icon"></i>
      <p><strong>Synonyms:</strong> ${synonyms}</p>
    </div>
    <div class="result-item">
      <i class="fas fa-ban icon"></i>
      <p><strong>Antonyms:</strong> ${antonyms}</p>
    </div>
    `;

  resultContainer.style.display = "block";

 
}

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

themeToggle.addEventListener("click", (event) => {
    event.preventDefault(); 
    body.classList.toggle("light-mode");
    const icon = themeToggle.querySelector("i");
    if (body.classList.contains("light-mode")) {
        icon.classList.replace("fa-sun", "fa-moon");
    } else {
        icon.classList.replace("fa-moon", "fa-sun");
    }
});


