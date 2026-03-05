


function loadLevelWord(id) {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();// remove all active class
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            // console.log(clickBtn);
            clickBtn.classList.add("active");// add active class
            displayLevelWord(data.data);
        });
}
// {
//     "word": "Abundant",
//     "meaning": null,
//     "pronunciation": "অবানডান্ট",
//     "level": 3,
//     "sentence": "Water is abundant in rainy seasons.",
//     "points": 3,
//     "synonyms": [],
//     "id": 1
// }
const loadWordDetail =async(id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    console.log(url);
    const res =await fetch(url);
    const details =await res.json();
    displayWordDetails(details.data);
};
const displayWordDetails =(word)=>{
    console.log(word);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    <div class="">
    <h2 class="text-2xl font-bold">
      ${word.word}(<i class="fa-solid fa-microphone-lines"></i>     :${word.pronunciation}</h2>
   </div>
    <div class="">
    <h2 class="font-bold">Meaning</h2>
    <p>${word.meaning}</p>
   </div>
    <div class="">
    <h2 class="font-bold">Example</h2>
    <p>${word.sentence}</p>
   </div>
    <div class="">
       <h2 class="font-bold">Synonym</h2>
    <div class="">${createElements(word.synonyms)}</div>
   <div class="modal-action"></div>
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
   </div>`;


    document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) =>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML="";
    if (words.length==0){
        wordContainer.innerHTML=`
      <div class="font-bangla text-center col-span-full rounded-xl py-10 space-y-6">
      <img class="mx-auto" src="./assets/alert-error.png"/>
      <p class="text-xl font-medium text-gray-400">
      এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
      </p>
      
      <h2 class="font-bold text-4xl">
      নেক্সট Lesson এ যান |
      </h2>
      </div>
      `;
        manageSpinner(false);
        return;
    }
    words.forEach((word) =>{
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">

      <h2 class="font-bold text-2xl">${word.word ? word.word : "shobdo nei"}</h2>
      <p class="font-semibold">Meaning /pronunciation</p>
      <div class=" font-bangla text-2xl font-semibold">${word.meaning ? word.meaning: "orttho pawa jaini"}/${word.pronunciation ? word.pronunciation:"pronounciation ne"}</div>
      <div class="flex justify-between items-center">
         <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
         <button onclick="pronounceWord('${word.word}')" class="btn  bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button></div>

     </div>
        `;
        wordContainer.append(card);
    });
    manageSpinner(false);
};
displayLesson=(lessons)=>{
   //1.get the container & empty

   const levelContainer =document.getElementById("level-container");
   levelContainer.innerHTML="";
   //2.get into every lessons
   for (let lesson of lessons){ 
    console.log(lesson);  
    //3. create Element
    const btnDiv= document.createElement("div");
    btnDiv.innerHTML = `
     <button id="lesson-btn-${lesson.level_no}"onclick="loadLevelWord(${lesson.level_no})"class="btn btn-outline btn-primary lesson-btn">
         <i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}
     </button>
    `;
   //4. append into container
   levelContainer.append(btnDiv);
   }

};
 loadLesson();