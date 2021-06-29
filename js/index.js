document.querySelector("#button-container").addEventListener("click", () => {
  let text = document.getElementById("filter-job").value;
  getJobs().then((jobs) => {
    let filteredJobs = filterJobs(jobs, text);
    showJobs(filteredJobs);
  });
});

function getJobs() {
  return fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

function filterJobs(jobs, searchText) {
  if (searchText) {
    let filteredJobs = jobs.filter((job) => {
      if (
        job.roleName.toLowerCase().includes(searchText) ||
        job.type.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.requirements.content.toLowerCase().includes(searchText)
      ) {
        return true;
      } else {
        return false;
      }
    });
    return filteredJobs;
  } else {
    return jobs;
  }
}

function showJobs(jobs) {
  let jobsContainer = document.querySelector(".jobs-container");
  let jobsList = document.querySelector(".jobss");
  let jobsHTML = "";
  let count = 0;
  let countHTML = "";
  jobs.forEach((job) => {
    jobsHTML += `
            <div id="job-tile">
                <div class="top">
                    <img src="${job.logo}" />
                    <span class="material-icons more_horiz">more_horiz</span>
                </div>
                <div class="rolename">
                    <span>${job.roleName}</span>
                </div>
                <div class="description">
                    <span>${job.requirements.content}</span>
                </div>
                <div class="buttons">
                    <div class="button apply-now">
                        Apply Now
                    </div>
                    <div class="button">
                        Message
                    </div>
                </div>                
            </div>

        `;
    count++;
  });
  countHTML = `<h1>Showing ${count} Jobs</h1>`;
  jobsList.innerHTML = countHTML;
  jobsContainer.innerHTML = jobsHTML;
}

// when the application is loaded
getJobs().then((data) => {
  showJobs(data);
});

// const search = document.getElementById("search-container");
// const body = document.querySelector("body");
// const header = document.querySelector("header");
// const toggle = document.getElementById("toggle");
// const button = document.getElementById("button-container");
// const joblist = document.querySelector(".jobs-list");
// const jobcon = document.querySelector(".jobs-container");

// toggle.onclick = function () {
//   toggle.classList.toggle("active");
//   body.classList.toggle("active");
//   header.classList.toggle("active");
//   search.classList.toggle("active");
//   button.classList.toggle("active");
//   joblist.classList.toggle("active");
//   jobcon.classList.toggle("active");
// };
