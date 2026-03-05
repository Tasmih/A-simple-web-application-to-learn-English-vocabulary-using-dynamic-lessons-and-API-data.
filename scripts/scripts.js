
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