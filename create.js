document.addEventListener("DOMContentLoaded", () => {
  const nextButtons = document.querySelectorAll('.btn.next');
  const backButtons = document.querySelectorAll('.btn.back');
  const steps = document.querySelectorAll('.form-step');
  const progressBar = document.getElementById('progress-bar');
  const stepLabels = document.querySelectorAll('.progress-steps .step');
  const sourceButtons = document.querySelectorAll('.source-option');
  const sourcesContainer = document.querySelector('.sources-options');
  const generateBtn = document.querySelector('.btn.generate');
  const loadingModal = document.getElementById('loadingModal');
  const loadingFill = document.getElementById('progress-fill');
  const loadingText = document.getElementById('loading-percentage');

  const courseSelect = document.getElementById('course');
  const unitSelect = document.getElementById('unit');
  const lessonSelect = document.getElementById('lesson');

  let currentStep = 0;

  const courseStructure = {
    Science: {
      Physics: ['Mechanics', 'Optics', 'Thermodynamics'],
      Chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Acids and Bases'],
      Biology: ['Genetics', 'Cell Structure', 'Evolution']
    },
    Math: {
      Algebra: ['Linear Equations', 'Quadratic Equations'],
      Geometry: ['Triangles', 'Circles', 'Coordinate Geometry'],
      Calculus: ['Limits', 'Derivatives', 'Integrals']
    },
    English: {
      Grammar: ['Tenses', 'Parts of Speech', 'Punctuation'],
      Literature: ['Poetry', 'Short Stories', 'Drama'],
      Writing: ['Essays', 'Letters', 'Articles']
    },
    Computer: {
      Programming: ['JavaScript Basics', 'Python Syntax', 'Loops'],
      Networking: ['OSI Model', 'IP Addressing'],
      Databases: ['SQL Queries', 'Database Design']
    }
  };

  Object.keys(courseStructure).forEach(course => {
    const opt = document.createElement('option');
    opt.value = course;
    opt.textContent = course;
    courseSelect.appendChild(opt);
  });

  courseSelect.addEventListener('change', () => {
    const selectedCourse = courseSelect.value;
    unitSelect.innerHTML = '<option disabled selected>Select a unit</option>';
    lessonSelect.innerHTML = '<option disabled selected>Select a lesson</option>';

    if (selectedCourse && courseStructure[selectedCourse]) {
      const units = Object.keys(courseStructure[selectedCourse]);
      units.forEach(unit => {
        const opt = document.createElement('option');
        opt.value = unit;
        opt.textContent = unit;
        unitSelect.appendChild(opt);
      });
      unitSelect.disabled = false;
      lessonSelect.disabled = true;
    }
  });

  unitSelect.addEventListener('change', () => {
    const selectedCourse = courseSelect.value;
    const selectedUnit = unitSelect.value;
    lessonSelect.innerHTML = '<option disabled selected>Select a lesson</option>';

    if (courseStructure[selectedCourse] && courseStructure[selectedCourse][selectedUnit]) {
      courseStructure[selectedCourse][selectedUnit].forEach(lesson => {
        const opt = document.createElement('option');
        opt.value = lesson;
        opt.textContent = lesson;
        lessonSelect.appendChild(opt);
      });
      lessonSelect.disabled = false;
    }
  });

  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      const nextStep = parseInt(button.dataset.next.split('-')[1]);
      if (validateStep(currentStep)) {
        updateStep(nextStep - 1);
      }
    });
  });

  backButtons.forEach(button => {
    button.addEventListener('click', () => {
      const backStep = parseInt(button.dataset.back.split('-')[1]);
      updateStep(backStep - 1);
    });
  });

  function updateStep(newStep) {
    steps[currentStep].classList.remove('active');
    steps[newStep].classList.add('active');
    currentStep = newStep;
    updateProgressBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateProgressBar() {
    const progress = ((currentStep) / (steps.length - 1)) * 100;
    progressBar.style.width = `${progress}%`;
    stepLabels.forEach((label, index) => {
      label.classList.toggle('active', index <= currentStep);
    });
  }

  function validateStep(stepIndex) {
    if (stepIndex === 0) {
      if (
        !courseSelect.value ||
        courseSelect.selectedIndex === 0 ||
        !unitSelect.value ||
        unitSelect.selectedIndex === 0 ||
        !lessonSelect.value ||
        lessonSelect.selectedIndex === 0
      ) {
        alert('Please complete all fields before continuing.');
        return false;
      }
    }

    if (stepIndex === 1) {
      const resourceDropdown = document.getElementById('resource');
      if (!resourceDropdown || resourceDropdown.selectedIndex === 0) {
        alert('Please select a resource to continue.');
        return false;
      }
    }

    return true;
  }

  sourceButtons.forEach(button => {
    button.addEventListener('click', () => {
      sourceButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');

      let existingSelect = document.getElementById('resource');
      if (!existingSelect) {
        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'form-group';

        const label = document.createElement('label');
        label.textContent = 'Select a resource you previously created on MagicSheets';
        selectWrapper.appendChild(label);

        const select = document.createElement('select');
        select.id = 'resource';

        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Select a resource';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        select.appendChild(defaultOption);

        const resources = [
          'Mechanics in Physics | Created on 2025/03/26',
          'Grammar Review | Created on 2025/03/22',
          'Algebra Basics | Created on 2025/03/18'
        ];

        resources.forEach(resource => {
          const opt = document.createElement('option');
          opt.textContent = resource;
          select.appendChild(opt);
        });

        selectWrapper.appendChild(select);
        sourcesContainer.insertAdjacentElement('afterend', selectWrapper);
      }
    });
  });

  function showLoadingModal() {
    loadingModal.classList.remove('hidden');
    let percentage = 0;
    const interval = setInterval(() => {
      percentage++;
      loadingFill.style.width = `${percentage}%`;
      loadingText.textContent = `${percentage}%`;
      if (percentage >= 100) {
        clearInterval(interval);
        loadingText.textContent = '✅ Worksheet Ready!';
        setTimeout(() => {
          loadingModal.classList.add('hidden');

          // ✅ Save form values to localStorage
          const worksheetData = {
            course: courseSelect.value,
            unit: unitSelect.value,
            lesson: lessonSelect.value,
            grade: document.getElementById("gradeLevel").value,
            difficulty: document.getElementById("difficulty").value,
            trueFalse: trueFalseInput.value,
            fillBlank: fillBlankInput.value,
            multipleChoice: multipleChoiceInput.value,
            shortAnswer: shortAnswerInput.value,
            includeAnswer: document.querySelector('input[name="includeAnswer"]:checked')?.value,
            isPublic: document.querySelector('input[name="isPublic"]:checked')?.value,
            instructions: document.getElementById("instructions").value
          };
          localStorage.setItem("worksheetData", JSON.stringify(worksheetData));

          // 🚀 Redirect to generate page
          window.location.href = "generate.html";
        }, 1000);
      }
    }, 40); 
  } 

  // ✅ Add click listener to Generate button
  generateBtn.addEventListener('click', () => {
    if (validateStep(2)) {
      showLoadingModal();
    }
  });


  // Question total logic
  const trueFalseInput = document.getElementById("trueFalse");
  const fillBlankInput = document.getElementById("fillBlank");
  const multipleChoiceInput = document.getElementById("multipleChoice");
  const shortAnswerInput = document.getElementById("shortAnswer");
  const totalCountSpan = document.getElementById("totalCount");
  const questionWarning = document.getElementById("questionWarning");
  const questionProgress = document.getElementById("questionProgress");

  function updateTotalCount() {
    const tf = parseInt(trueFalseInput.value) || 0;
    const fb = parseInt(fillBlankInput.value) || 0;
    const mc = parseInt(multipleChoiceInput.value) || 0;
    const sa = parseInt(shortAnswerInput.value) || 0;

    const total = tf + fb + mc + sa;
    totalCountSpan.textContent = total;

    const percentage = Math.min((total / 25) * 100, 100);
    questionProgress.style.width = percentage + "%";

    if (total > 25) {
      questionWarning.textContent = "⚠️ You’ve exceeded the 25-question limit.";
      questionWarning.style.display = "block";
      totalCountSpan.style.color = "#ff4d4f";
      generateBtn.disabled = true;
      generateBtn.style.opacity = "0.5";
      generateBtn.style.cursor = "not-allowed";
    } else {
      questionWarning.style.display = "none";
      totalCountSpan.style.color = "#ccc";
      generateBtn.disabled = false;
      generateBtn.style.opacity = "1";
      generateBtn.style.cursor = "pointer";
    }
  }

  [trueFalseInput, fillBlankInput, multipleChoiceInput, shortAnswerInput].forEach(input => {
    input.addEventListener("input", updateTotalCount);
  });
});
