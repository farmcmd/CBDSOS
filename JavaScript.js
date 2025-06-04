function populateHabitatOptions() {
            const selectElement = document.getElementById('neededHabitatCard');
            if (!selectElement) return;
            // Clear existing options except the first one
            while (selectElement.options.length > 1) {
                selectElement.remove(1);
            }
            cardData.habitat.forEach(habitat => {
                const option = document.createElement('option');
                option.value = habitat.name;
                option.textContent = `${habitat.name} (${habitat.emoji})`;
                selectElement.appendChild(option);
            });
        }
        // Call this on page load (or when cardData is available)
        window.onload = function() {
            populateHabitatOptions();
            populateCharacterTeamOptions(); // Assuming this is also needed
            populateDesiredSolutionOptions(); // Assuming this is also needed
             // Initialize event listeners for tests
            const desiredSolutionSelect = document.getElementById('desiredSolutionCard');
            const test1Section = document.getElementById('test1Section');
            const test1Input = document.getElementById('test1UnEcoItem');
            const test1Error = document.getElementById('test1UnEcoItemError');
            const test2Section = document.getElementById('test2Section');
            const test2Input = document.getElementById('test2UnEcoReason');
            const test2Error = document.getElementById('test2UnEcoReasonError');
            const solutionConfirmation = document.getElementById('solutionConfirmationMessage');

            if (desiredSolutionSelect) {
                desiredSolutionSelect.addEventListener('change', function() {
                    if (this.value) {
                        test1Section.classList.remove('hidden');
                        test2Section.classList.add('hidden');
                        solutionConfirmation.classList.add('hidden');
                        test1Input.value = ''; 
                        test2Input.value = '';
                        test1Error.classList.add('hidden');
                        test2Error.classList.add('hidden');
                    } else {
                        test1Section.classList.add('hidden');
                        test2Section.classList.add('hidden');
                        solutionConfirmation.classList.add('hidden');
                    }
                });
            }

            if (test1Input) {
                test1Input.addEventListener('input', function() {
                    if (this.value.length > 2) {
                        test2Section.classList.remove('hidden');
                        test1Error.classList.add('hidden');
                    } else {
                        test2Section.classList.add('hidden');
                        solutionConfirmation.classList.add('hidden');
                        if (this.value.length > 0 && this.value.length <=2) {
                             test1Error.classList.remove('hidden');
                        } else {
                            test1Error.classList.add('hidden');
                        }
                    }
                });
            }

            if (test2Input) {
                test2Input.addEventListener('input', function() {
                    if (this.value.length > 5) {
                        solutionConfirmation.classList.remove('hidden');
                        const selectedSolutionText = desiredSolutionSelect.options[desiredSolutionSelect.selectedIndex].text;
                        solutionConfirmation.textContent = `恭喜！您已通過考驗，成功鎖定解方：${selectedSolutionText}！`;
                        test2Error.classList.add('hidden');
                    } else {
                        solutionConfirmation.classList.add('hidden');
                         if (this.value.length > 0 && this.value.length <=5) {
                            test2Error.classList.remove('hidden');
                        } else {
                            test2Error.classList.add('hidden');
                        }
                    }
                });
            }
        };