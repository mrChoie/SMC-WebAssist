const buildingCategory = document.getElementById("buildingCategory")
const engiBtn = document.getElementById("engiBtn")
const collBtn = document.getElementById("collBtn")
const mainBtn = document.getElementById("mainBtn")
const annexBtn = document.getElementById("annexBtn")
const engiCategory = document.getElementById("engineeringCategory")
const collCategory = document.getElementById("collegeCategory")
const mainCategory = document.getElementById("smcmainCategory")
const annexCategory = document.getElementById("annexCategory")

engiBtn.addEventListener("click", function(event){
    buildingCategory.classList.remove("d-flex")
    buildingCategory.classList.add("d-none")
    engiCategory.classList.remove("d-none")
    engiCategory.classList.add("d-flex")
   
})
collBtn.addEventListener("click", function(event){
    buildingCategory.classList.remove("d-flex")
    buildingCategory.classList.add("d-none")
    collCategory.classList.remove("d-none")
    collCategory.classList.add("d-flex")
   
})
mainBtn.addEventListener("click", function(event){
    buildingCategory.classList.remove("d-flex")
    buildingCategory.classList.add("d-none")
    mainCategory.classList.remove("d-none")
    mainCategory.classList.add("d-flex")
   
})
annexBtn.addEventListener("click", function(event){
    buildingCategory.classList.remove("d-flex")
    buildingCategory.classList.add("d-none")
    annexCategory.classList.remove("d-none")
    annexCategory.classList.add("d-flex")
   
})

document.getElementById("closeBtn1").addEventListener("click", function(e){
    buildingCategory.classList.remove("d-none")
    buildingCategory.classList.add("d-flex")
    engiCategory.classList.remove("d-flex")
    engiCategory.classList.add("d-none")
})
document.getElementById("closeBtn2").addEventListener("click", function(e){
    buildingCategory.classList.remove("d-none")
    buildingCategory.classList.add("d-flex")
    collCategory.classList.remove("d-flex")
    collCategory.classList.add("d-none")
})
document.getElementById("closeBtn3").addEventListener("click", function(e){
    buildingCategory.classList.remove("d-none")
    buildingCategory.classList.add("d-flex")
    mainCategory.classList.remove("d-flex")
    mainCategory.classList.add("d-none")
})
document.getElementById("closeBtn4").addEventListener("click", function(e){
    buildingCategory.classList.remove("d-none")
    buildingCategory.classList.add("d-flex")
    annexCategory.classList.remove("d-flex")
    annexCategory.classList.add("d-none")
})