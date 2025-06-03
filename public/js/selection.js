const buildingCategory = document.getElementById("buildingCategory")
const inquiryCategory = document.getElementById("inquiryCategory")
const chevron_down = document.getElementById("chevron_down")
const engiBtn = document.getElementById("engiBtn")
const collBtn = document.getElementById("collBtn")
const mainBtn = document.getElementById("mainBtn")
const annexBtn = document.getElementById("annexBtn")
const engiCategory = document.getElementById("engineeringCategory")
const collCategory = document.getElementById("collegeCategory")
const mainCategory = document.getElementById("smcmainCategory")
const annexCategory = document.getElementById("annexCategory")
const selectBtn1 = document.getElementById("selectBtn1")
const selectBtn2 = document.getElementById("selectBtn2")
const selectBtn3 = document.getElementById("selectBtn3")
const selectBtn4 = document.getElementById("selectBtn4")
const selectBtn5 = document.getElementById("selectBtn5")
const selectBtn6 = document.getElementById("selectBtn6")
const selectBtn7 = document.getElementById("selectBtn7")
const selectBtn8 = document.getElementById("selectBtn8")

engiBtn.addEventListener("click", function(event){
    addBuildParam('b1')
    buildingCategory.classList.remove("d-flex")
    buildingCategory.classList.add("d-none")
    inquiryCategory.classList.remove("d-none")
    inquiryCategory.classList.add("d-block")
    chevron_down.classList.remove("d-none")
    chevron_down.classList.add("d-block")
    engiCategory.classList.remove("d-none")
    engiCategory.classList.add("d-flex")
   
})

collBtn.addEventListener("click", function(event){
    addBuildParam('b2')
    buildingCategory.classList.remove("d-flex")
    buildingCategory.classList.add("d-none")
    inquiryCategory.classList.remove("d-none")
    inquiryCategory.classList.add("d-block")
    chevron_down.classList.remove("d-none")
    chevron_down.classList.add("d-block")
    collCategory.classList.remove("d-none")
    collCategory.classList.add("d-flex")
   
})

mainBtn.addEventListener("click", function(event){
    addBuildParam('b3')
    buildingCategory.classList.remove("d-flex")
    buildingCategory.classList.add("d-none")
    inquiryCategory.classList.remove("d-none")
    inquiryCategory.classList.add("d-block")
    chevron_down.classList.remove("d-none")
    chevron_down.classList.add("d-block")
    mainCategory.classList.remove("d-none")
    mainCategory.classList.add("d-flex")
})

annexBtn.addEventListener("click", function(event){
    addBuildParam('b4')
    buildingCategory.classList.remove("d-flex")
    buildingCategory.classList.add("d-none")
    inquiryCategory.classList.remove("d-none")
    inquiryCategory.classList.add("d-block")
    chevron_down.classList.remove("d-none")
    chevron_down.classList.add("d-block")
    annexCategory.classList.remove("d-none")
    annexCategory.classList.add("d-flex")
})

document.getElementById("closeBtn1").addEventListener("click", function(e){
    buildingCategory.classList.remove("d-none")
    buildingCategory.classList.add("d-flex")
    inquiryCategory.classList.remove("d-block")
    inquiryCategory.classList.add("d-none")
    chevron_down.classList.remove("d-block")
    chevron_down.classList.add("d-none")
    engiCategory.classList.remove("d-flex")
    engiCategory.classList.add("d-none")
})
document.getElementById("closeBtn2").addEventListener("click", function(e){
    buildingCategory.classList.remove("d-none")
    buildingCategory.classList.add("d-flex")
    inquiryCategory.classList.remove("d-block")
    inquiryCategory.classList.add("d-none")
    chevron_down.classList.remove("d-block")
    chevron_down.classList.add("d-none")
    collCategory.classList.remove("d-flex")
    collCategory.classList.add("d-none")
})
document.getElementById("closeBtn3").addEventListener("click", function(e){
    buildingCategory.classList.remove("d-none")
    buildingCategory.classList.add("d-flex")
    inquiryCategory.classList.remove("d-block")
    inquiryCategory.classList.add("d-none")
    chevron_down.classList.remove("d-block")
    chevron_down.classList.add("d-none")
    mainCategory.classList.remove("d-flex")
    mainCategory.classList.add("d-none")
})
document.getElementById("closeBtn4").addEventListener("click", function(e){
    buildingCategory.classList.remove("d-none")
    buildingCategory.classList.add("d-flex")
    inquiryCategory.classList.remove("d-block")
    inquiryCategory.classList.add("d-none")
    chevron_down.classList.remove("d-block")
    chevron_down.classList.add("d-none")
    annexCategory.classList.remove("d-flex")
    annexCategory.classList.add("d-none")
})

function addBuildParam(build) {
    const url = new URL(window.location);
    url.searchParams.set('building', `${build}`);
    window.history.pushState({}, '', url); // Updates URL without reload
}

selectBtn1.addEventListener("click", function(event){
    const params = new URLSearchParams(window.location.search);
    const build = params.get('building');
    window.location.href = "/smc-webassist/ticket-form?"+"building="+build+"&category=1";
})
selectBtn2.addEventListener("click", function(event){
    const params = new URLSearchParams(window.location.search);
    const build = params.get('building');
    window.location.href = "/smc-webassist/ticket-form?"+"building="+build+"&category=2";
})
selectBtn3.addEventListener("click", function(event){
    const params = new URLSearchParams(window.location.search);
    const build = params.get('building');
    window.location.href = "/smc-webassist/ticket-form?"+"building="+build+"&category=3";
})
selectBtn4.addEventListener("click", function(event){
    const params = new URLSearchParams(window.location.search);
    const build = params.get('building');
    window.location.href = "/smc-webassist/ticket-form?"+"building="+build+"&category=4";
})
selectBtn5.addEventListener("click", function(event){
    const params = new URLSearchParams(window.location.search);
    const build = params.get('building');
    window.location.href = "/smc-webassist/ticket-form?"+"building="+build+"&category=5";
})
selectBtn6.addEventListener("click", function(event){
    const params = new URLSearchParams(window.location.search);
    const build = params.get('building');
    window.location.href = "/smc-webassist/ticket-form?"+"building="+build+"&category=6";
})
selectBtn7.addEventListener("click", function(event){
    const params = new URLSearchParams(window.location.search);
    const build = params.get('building');
    window.location.href = "/smc-webassist/ticket-form?"+"building="+build+"&category=7";
})
selectBtn8.addEventListener("click", function(event){
    const params = new URLSearchParams(window.location.search);
    const build = params.get('building');
    window.location.href = "/smc-webassist/ticket-form?"+"building="+build+"&category=8";
})