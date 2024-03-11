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
const loginContainerEle = document.querySelector('.loginBxContainer');
const loginBtn = document.querySelector('.login-btn');
const shareProfileContainerEle = document.querySelector('.shareProfileContainer')
// const closeShareSideBar = document.querySelector('.close-share-sidebar');
const filterCheckBoxes = document.querySelectorAll('input[name="filter-checkbox"]');


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
          localStorage.setItem('candidatesData', JSON.stringify(fetchData.data.data));
     })
     .catch((err) => {
          console.log(err);
     });
}

fetchDataFromFile("./data.json");

// Render candidates data to UI
const renderDataToUI = (data) => {    
     let result = data || JSON.parse(localStorage.getItem('candidatesData')) || [];  
     candidatesCardContainerEle.innerHTML = '';
     
     result.forEach((data) => {
          let cardDiv = document.createElement('div');
          cardDiv.classList.add('cardBx');
          cardDiv.innerHTML = `
               <div class="topBar">
                    <div class="imgBx userImgBx">
                         <img src=${data.attributes.image_url} alt="">
                    </div>
                    <div class="contentBx">
                         <h2 class="name">${data.attributes.name}</h2>
                         <p><i class="fa-solid fa-briefcase"></i> <span>${data.attributes.role}</span>
                         </p>
                         <p><i class="fa-solid fa-location-dot"></i> <span>${data.attributes.city}</span></p>
                    </div>
               </div>
               <div class="bottomBar company-transition-bx">
                    <div class="leftBx">
                         <p class="secondary-heading">Pre Scaler</p>
                         <p>
                             ${data.attributes.pre_academy_company}  
                         </p>
                    </div>
                    <div class="rightBx">
                         <img src="./imgs/arrow.svg" alt="">
                         <div>
                              <p class="secondary-heading">Post Scaler</p>
                              <p>
                                   <img class="company-icon" src=${data.attributes.company_logo_url}
                                        alt="">
                              </p>
                         </div>

                    </div>
               </div>
               <a href="#" class="connect-btn">Connect to know Salary Hike</a>
               <a href="javascript:void(0)" data-id=${data.attributes.user_id} class="view-profile-btn">View Profile <span><i class="fa-solid fa-chevron-right"></i></span></a>
          `;

          // Append html to UI
          candidatesCardContainerEle.appendChild(cardDiv);
     });
}

renderDataToUI();

// Show Share POPup when user clicks on view-profile-btn
setTimeout(() => {
     document.querySelectorAll('.view-profile-btn').forEach((btn, ind) => {
          let result = JSON.parse(localStorage.getItem('candidatesData')) || [];  
          
          btn.addEventListener('click', (e) => {
               let userId = Number.parseInt(e.target.dataset.id);
               // console.log(userId)
               let studentData = result.filter((item, ind) => item.attributes.user_id === userId);
               shareProfileContainerEle.innerHTML = `
               <div class="topBx">
                    <a href="#" class="share-link-btn">
                         <i class="fa-solid fa-arrow-up-from-bracket"></i>
                         Share
                    </a>
                    <span><i class="fa-solid fa-xmark close-share-sidebar"></i></span>
               </div>
               <div class="topBar">
                    <div class="imgBx userImgBx">
                         <img src=${studentData[0].attributes.image_url} alt="">
                    </div>
                    <div class="contentBx">
                         <h2 class="name">${studentData[0].attributes.name}</h2>
                         <p><i class="fa-solid fa-briefcase"></i> <span>${studentData[0].attributes.role}</span>
                         </p>
                         <p><i class="fa-solid fa-location-dot"></i> <span>${studentData[0].attributes.city}</span></p>
                         <button class="share-btn">
                              <img src="./imgs/companies-icons/linkedin.svg" alt="">
                              <span>Connect</span>
                         </button>
                    </div>

               </div>
               ${studentData[0].attributes.eligible_for_qna ? `
                    <div class="qnaBx">
                         <h2>Ask Questions</h2>
                         <p>Now you can get a private Q&A . This will help you get career advice, industry insights, and more.</p>
                         <div>
                              <span>
                                   <img src="./imgs/star.svg" alt="">
                                   <b>Know their Journey</b>
                              </span>
                              <span>
                                   <img src="./imgs/people.svg" alt="">
                                   <b>Build your network</b>
                              </span>
                         </div>
                         <button class="chat-btn">
                              <img src="./imgs/chatIcon.svg" alt="">
                              <span>Start Private Q&A</span>
                         </button>
                    </div>
               ` : ``}

               <div class="bottomBar company-transition-bx">
                    <div class="leftBx">
                         <p class="secondary-heading">Pre Scaler</p>
                         <p>Adobe</p>
                         <span>${studentData[0].attributes.pre_scaler_role}</span>
                    </div>
                    <div class="rightBx">
                         <img src="./imgs/arrow.svg" alt="">
                         <div>
                              <p class="secondary-heading">Post Scaler</p>
                              <p>
                                   <img class="company-icon" src=${studentData[0].attributes.company_logo_url}
                                        alt="">
                              </p>
                              <p>${studentData[0].attributes.role}</p>
                         </div>
                    </div>
               </div>

               <div class="reviewBx">
                    <h2>Reviews and Blogs</h2>
                    <p>One of the decisions I take pride in is investing in myself. I am sure you can relate when I say that you actually don’t feel like spending hefty amounts when it comes to yourself. At least that was the case for me when I came across this opportunity of an amazing (but of course, expensive) course of Scaler. But I am so glad that I invested in it and ultimately in my own growth....</p>
                    <button class="share-btn">
                         <img src="./imgs/companies-icons/linkedin.svg" alt="">
                         <span>Read reviews on LinkedIn</span>
                    </button>
               </div>
               `;
               
               document.body.classList.add('active');
               shareProfileContainerEle.style.left = '0%';
               setTimeout(() => {
                    window.scrollTo({
                         top: 0,
                         behavior: 'smooth'
                    });
               }, 0);

          });
     })
     
}, 0);

document.body.addEventListener('click', (e) => {
     let target = e.target;
     if(target.classList.contains('close-share-sidebar')){
          closeShareSideBar();
     }
});

// When user closes the share Profile Container
function closeShareSideBar() {
     console.log('closing....')
     document.body.classList.remove('active')
     shareProfileContainerEle.style.left = '-100%';
};

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

const handleCheckboxChanges = () => {
     let results = JSON.parse(localStorage.getItem('candidatesData')) || [];

     // Club filter checkboxes input which are checked into an array  
     const selectedFilters = Array.from(filterCheckBoxes).filter((checkbox, ind) => {
          return checkbox.checked
     }).map((checkbox) => {
          return checkbox.dataset.filtervalue.replace(/-/g, ' ');
     });

     // Check if any candidate matches filter criteria
     console.log(selectedFilters)
     const filterCandidates = results.filter((candidate, ind) => {
          const {experience, post_academy_segment, eligible_for_qna} = candidate.attributes;
          
          let juniorExp; 
          let seniorExp;
          let isAvailableForQnA;
          // let serviceToStartup;
          
          if(selectedFilters.includes('experience 0 3')){
               juniorExp = (experience >= 1 && experience <= 3);
          }

          if(selectedFilters.includes('experience 4 7')){
               seniorExp = (experience >= 4 && experience <= 7);
          }

          if(selectedFilters.includes('qna')){
               isAvailableForQnA = eligible_for_qna; 
          }

          // let indexOfStartup = post_academy_segment.split(" ").indexOf('Startups');
          // console.log(indexOfStartup)
          // serviceToStartup = selectedFilters.includes(post_academy_segment.split(" ")[indexOfStartup]?.toLowerCase());

          return (
               selectedFilters.includes(post_academy_segment.toLowerCase()) 
                    || juniorExp 
                    || seniorExp 
                    // || serviceToStartup 
                    || isAvailableForQnA
               );
     });
     if(filterCandidates.length === 0){
          renderDataToUI(JSON.parse(localStorage.getItem('candidatesData')));
     }
     renderDataToUI(filterCandidates);
}

// Handle user Checkboxes click
filterCheckBoxes.forEach((inputCheckBox, ind) => {
     inputCheckBox.addEventListener('change', handleCheckboxChanges);
});

// Open Login Sidebar when user clicks on login button
loginBtn.addEventListener('click', (e) => {
     loginContainerEle.style.right = "0%";
     document.body.classList.add('active');
});

document.querySelector('.close-login-form').addEventListener('click', () => {
     loginContainerEle.style.right = '-100%';
     document.body.classList.remove('active');
});
