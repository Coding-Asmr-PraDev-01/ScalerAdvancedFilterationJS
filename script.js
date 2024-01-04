// Grab Elements
const menuTogglerEle = document.querySelector('.menu-toggler');
const sideBarEle = document.querySelector('.sidebarMenu');
const closeMenuEle = document.querySelector('.close-menu');
const viewMoreBtn = document.querySelectorAll('.view-btn')[0];
const viewLessBtn = document.querySelectorAll('.view-btn')[1];
const hiddenFiltersBxEle = document.querySelector('.hiddenFiltersBx');
const advancedFilterBtn = document.querySelector(`[data-btn="adv-filter-toggler"]`);
const advancedFilterCloseBtn = document.querySelector(`[data-btn="adv-filter-close"]`);
const advancedFilterBxEle = document.querySelector('.advancedFilterBx');
const candidatesCardContainerEle = document.querySelector('.candidatesCardContainer');
const tabEles = document.querySelectorAll('.tab > p');
const tabContentEles = document.querySelectorAll('.tabContent');

const spanOne = menuTogglerEle.querySelector(`span:nth-child(1)`);
const spanTwo = menuTogglerEle.querySelector(`span:nth-child(2)`);
const spanThree = menuTogglerEle.querySelector(`span:nth-child(3)`);

menuTogglerEle.addEventListener('click', () => {
     spanOne.style.transform = `rotate(45deg)`;
     spanThree.style.transform = `rotate(-45deg)`;
     sideBarEle.classList.toggle('active');

     // Add greyscale to body with slight opacity
     document.body.classList.add('active');
});

// when close menu clicks hide the sidebar
closeMenuEle.addEventListener('click', () => {
     spanOne.style.transform = `rotate(0)`;
     spanThree.style.transform = `rotate(0)`;
     sideBarEle.classList.remove('active');

     // remove greyscale from body 
     document.body.classList.remove('active');
});

// View More filter Functionality
viewMoreBtn.addEventListener('click', () => {
     hiddenFiltersBxEle.style.display = 'block';
     viewMoreBtn.style.display = 'none';
});

viewLessBtn.addEventListener('click', () => {
     hiddenFiltersBxEle.style.display = 'none';
     viewMoreBtn.style.display = 'block';
});

// If advanced filter clicked
let isAdvancedFilterActive = false;
advancedFilterBtn.addEventListener('click', () => {
     if(!isAdvancedFilterActive){
          advancedFilterBtn.classList.add('active');
          advancedFilterBxEle.style.display = 'flex';
     }else{
          advancedFilterBtn.classList.remove('active');
          advancedFilterBxEle.style.display = 'none';
     }
     isAdvancedFilterActive = !isAdvancedFilterActive;
});


// If user clicks on Close button of Advanced filter Box
advancedFilterCloseBtn.addEventListener('click', () => {
     advancedFilterBtn.classList.remove('active');
     advancedFilterBxEle.style.display = 'none';
});

// Fetch data from file
const fetchDataFromFile = (filePath) => {
     return fetch(filePath)
     .then((response) => response.json())
     .then((data) => data)
     .then((fetchData) => {
          // Store data inside localStorage
          localStorage.setItem('candidatesData', JSON.stringify(fetchData));
     })
     .catch((err) => {
          console.log(err);
     });
}

fetchDataFromFile("./data.json");

// Render candidates data to UI
const renderDataToUI = () => {
     let result = JSON.parse(localStorage.getItem('candidatesData')) || [];  
     
     result.forEach((data) => {
          let cardDiv = document.createElement('div');
          cardDiv.classList.add('cardBx');
          cardDiv.innerHTML = `
               <div class="topBar">
                    <div class="imgBx">
                         <img src=${data.img} alt="">
                    </div>
                    <div class="contentBx">
                         <h2 class="name">${data.name}</h2>
                         <p><i class="fa-solid fa-briefcase"></i> <span>${data.role}</span>
                         </p>
                         <p><i class="fa-solid fa-location-dot"></i> <span>${data.location}</span></p>
                    </div>
               </div>
               <div class="bottomBar">
                    <div class="leftBx">
                         <p class="secondary-heading">Pre Scaler</p>
                         <p>Adobe</p>
                    </div>
                    <div class="rightBx">
                         <img src="./imgs/arrow.svg" alt="">
                         <div>
                              <p class="secondary-heading">Post Scaler</p>
                              <p>
                                   <img class="company-icon" src=${data.fromCompany}
                                        alt="">
                              </p>
                         </div>

                    </div>
               </div>
               <a href="#" class="connect-btn">Connect to know Salary Hike</a>
               <a href="javascript:void(0)" data-id=${data.id} class="view-profile-btn">View Profile <span><i class="fa-solid fa-chevron-right"></i></span></a>
          `;
          // Append html to UI
          candidatesCardContainerEle.appendChild(cardDiv);
     });
}

renderDataToUI();

// Show Share POPup when user clicks on view-profile-btn
setTimeout(() => {
     document.querySelectorAll('.view-profile-btn').forEach((btn, ind) => {
          btn.addEventListener('click', (e) => {
               
          });
     })
     
}, 0);

const showTabContent = (e) => {
     let generateId = e.target.textContent.split(" ").map((word, ind) => word.charAt(0).toLowerCase() + word.slice(1)).join("_");
     // generateId = generateId.replace(new RegExp('-', 'g'), '');
     
     // Hide all previous tabContent 
     for(let i = 0; i < tabContentEles.length; i++){
          tabContentEles[i].style.display = 'none';
     } 

     // Remove all previous active class
     for(let i = 0; i < tabEles.length; i++){
          tabEles[i].parentElement.className = tabEles[i].parentElement.className.replace('active', '');
     }

     // Add active class to clicked tab
     e.target.parentElement.classList.add('active');

     // Show the content of clicked tab
     document.getElementById(`${generateId}`).style.display = 'flex';
}

for(let i = 0; i < tabEles.length; i++){
     tabEles[i].addEventListener('click', showTabContent);
}

