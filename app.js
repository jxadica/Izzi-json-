fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const services = data.data.services;
        let output = '';

        services.forEach(service => {
            let subServicesOutput = '';
            service.subServices.forEach(subService => {
                subServicesOutput += `<p>${subService.title_en}</p><hr>`;
            });

            output += `
                <div class="service">
                    <div class="serviceMain">
                        <img src="${service.cover_img.publicUrl}" class="serviceImg">
                        <div class="serviceInfo">
                            <p class="serviceName">${service.title_en}</p>
                            <p class="cost"><img src="images/money.png"> Starts from 20$/h</p>
                        </div>
                    </div>
                    <div class="subServices" style="display: none;">
                        ${subServicesOutput}
                    </div>
                </div>
            `;
        });

        document.querySelector('.services').innerHTML = output;

        document.querySelectorAll('.service').forEach(serviceDiv => {
            serviceDiv.addEventListener('click', function() {
                const subServiceDiv = serviceDiv.querySelector('.subServices');
                if (subServiceDiv.style.display === 'none' || subServiceDiv.style.display === '') {
                    subServiceDiv.style.display = 'flex';
                } else {
                    subServiceDiv.style.display = 'none';
                }
            });
        });
    })
    .catch(error => console.error('Error fetching data:', error));
