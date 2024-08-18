fetch('allProsData.json')
    .then(response => response.json())
    .then(d => {
        let employers = document.querySelector(".employers");
        let employersInfo = d.data.taskers;

        function renderTaskers(taskers) {
            employers.innerHTML = ''; 
            taskers.forEach(tasker => {

                let taskersStartDate = new Date(tasker.startDate);
                let threeMonthsAgo = new Date();
                threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
                let isNewPro = taskersStartDate >= threeMonthsAgo;
                let profDegree = '';
                
                if (tasker.eliteTasker) {
                    profDegree = 'Top Pro';
                } else if (isNewPro) {
                    profDegree = 'New Pro';
                }

                employers.innerHTML += `
                <div class="employer">
                    <div class="nameImg">
                        <img src="${tasker.user.profile_picture.publicUrl}" class="personImg">
                        <div class="namePart">
                            <p>${tasker.user.name} ${tasker.user.surname} <span class="prof">(${tasker.supervisor ? 'Supervisor' : 'Tasker'})</span></p>
                            <div class="rating">
                                <div class="stars">
                                    ${[...Array(5)].map((_, idx) => `
                                        <img class="starImg" src="images/${idx < tasker.averageRating ? 'yellowStar' : 'grayStar'}.png">
                                    `).join('')}
                                </div>
                                <p class="ratingNum">${tasker.averageRating}</p>
                                <p class="ratingCount">(${tasker.completedTasks})</p>
                            </div>
                        </div>
                    </div>  
                    <div class="sortingParameters">
                        <div class="tasks">
                            <img src="images/Verified.svg">
                            <p class="taskNum">${tasker.completedTasks} Tasks</p>
                        </div>
                        <div class="proff">
                            <img src="images/Hashtag.svg">
                            <p class="profDegree">${profDegree}</p>
                        </div>
                    </div> 
                    <div class="introduction">
                        <p>${tasker.bio}</p>
                    </div>
                    <div class="controls">
                        <p class="view">View Profile</p>
                        <div>
                            <p class="price">$35</p>
                            <button class="booking">Book Now</button>
                        </div>
                    </div>
                </div>
                `;
            });
        }

        let sortedTaskers = [...employersInfo];

        function sortingBYRate(order = 'descending') {
            if (order === 'descending') {
                sortedTaskers.sort((a, b) => b.averageRating - a.averageRating);
            } else if (order === 'ascending') {
                sortedTaskers.sort((a, b) => a.averageRating - b.averageRating);
            }
            renderTaskers(sortedTaskers);
        }

        function sortingByTask(taskOrder) {
            if (taskOrder === "descending") {
                sortedTaskers.sort((a, b) => b.completedTasks - a.completedTasks);
            } else if (taskOrder === "ascending") {
                sortedTaskers.sort((a, b) => a.completedTasks - b.completedTasks);
            }
            renderTaskers(sortedTaskers);
        }

        function filtering() {
            let topPros = document.getElementById("top").checked;
            let newPros = document.getElementById("new").checked;

            let filteredTaskers = [...sortedTaskers];

            if (topPros) {
                filteredTaskers = filteredTaskers.filter(tasker => tasker.eliteTasker);
            } 
            if (newPros) {
                let threeMonthsAgo = new Date();
                threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
                filteredTaskers = filteredTaskers.filter(tasker => new Date(tasker.startDate) >= threeMonthsAgo);
            }

            renderTaskers(filteredTaskers);
        }
        document.getElementById("top").addEventListener("change", function(){
            if(this.checked){
                document.getElementById("new").checked =false;
            }
        });
        document.getElementById("new").addEventListener("change", function(){
            if(this.checked){
                document.getElementById("top").checked =false;
            }
        });

        document.getElementById("rating").addEventListener("change", function() {
            let order = this.value === "Ascending" ? "ascending" : "descending";
            sortingBYRate(order);
        });

        document.querySelector("#taskSelect").addEventListener('change', function() {
            let taskOrder = this.value === "Ascending" ? "ascending" : "descending";
            sortingByTask(taskOrder);
        });

        document.getElementById("top").addEventListener("change", filtering);
        document.getElementById("new").addEventListener("change", filtering);

        renderTaskers(sortedTaskers);
    });
